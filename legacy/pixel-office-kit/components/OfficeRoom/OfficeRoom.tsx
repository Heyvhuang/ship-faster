'use client';

import { useEffect, useRef, useState } from 'react';
import './officeroom.css';

import type { AgentEntity, GameState, OfficeAgentState } from './engine/types';
import {
  NATIVE_W, NATIVE_H, SCALE, DISPLAY_W, DISPLAY_H,
  WORKSTATIONS, TILE_SIZE,
} from './engine/roomData';
import { createGameLoop } from './engine/gameLoop';
import { renderRoom } from './engine/roomRenderer';
import { makeBodySprite } from './engine/spriteFactory';
import { buildWalkableGrid } from './engine/roomData';
import {
  createAgentEntity, tickMovement, tickTypeAnimation, tickBehavior,
} from './engine/characterController';
import type { CSSProperties } from 'react';

export interface AgentCommand {
  agentId: string;
  action: OfficeAgentState;
  message?: string;
  targetAgentId?: string;
}

export interface AgentDef {
  id: string;
  name: string;
  avatar: string;
  color: string;
  workStyle: string;
}

export interface OfficeRoomProps {
  agents: AgentDef[];
  isActive?: boolean;
  activityLevel?: number;
  agentCommands?: AgentCommand[];
  workMsgs?: Record<string, string[]>;
  personalityBanter?: Record<string, string[]>;
  coffeeMsgs?: string[];
  celebrateMsgs?: Record<string, string[]>;
  loungeMsgs?: Record<string, string[]>;
}

const DEFAULT_WORK_MSGS: Record<string, string[]> = { _default: ['Working...'] };
const DEFAULT_BANTER: Record<string, string[]> = { _default: ['Hey there!'] };
const DEFAULT_COFFEE = ['Coffee time!', 'Refueling...'];
const DEFAULT_CELEBRATE: Record<string, string[]> = { _default: ['Woohoo!'] };
const DEFAULT_LOUNGE: Record<string, string[]> = { _default: ['Relaxing...'] };

const WALK_FRAME_SEQ = [0, 1, 2, 1];

function hashToUnit(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

export function OfficeRoom({
  agents: agentsDef,
  isActive = true,
  activityLevel = 10,
  agentCommands,
  workMsgs = DEFAULT_WORK_MSGS,
  personalityBanter = DEFAULT_BANTER,
  coffeeMsgs = DEFAULT_COFFEE,
  celebrateMsgs = DEFAULT_CELEBRATE,
  loungeMsgs = DEFAULT_LOUNGE,
}: OfficeRoomProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [currentHour, setCurrentHour] = useState(() => new Date().getHours());

  const entitiesRef = useRef<AgentEntity[]>([]);
  const walkableRef = useRef<boolean[][]>([]);
  const conversationRef = useRef<Map<string, { text: string; replyText: string | null; phase: number; timer: number }>>(new Map());
  const bodySpritesRef = useRef<Record<string, string>>({});
  const loopRef = useRef<{ start: () => void; stop: () => void; resume: () => void } | null>(null);
  const hourRef = useRef(currentHour);

  const commandsRef = useRef<AgentCommand[]>([]);
  useEffect(() => { commandsRef.current = agentCommands ?? []; }, [agentCommands]);

  const [domAgents, setDomAgents] = useState<AgentEntity[]>([]);

  useEffect(() => { hourRef.current = currentHour; }, [currentHour]);

  useEffect(() => {
    const checkHour = () => {
      const h = new Date().getHours();
      setCurrentHour(prev => prev === h ? prev : h);
    };
    const id = setInterval(checkHour, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    walkableRef.current = buildWalkableGrid();

    const sprites: Record<string, string> = {};
    for (const def of agentsDef) {
      sprites[def.id] = makeBodySprite(def.color);
    }
    bodySpritesRef.current = sprites;

    const entities: AgentEntity[] = [];
    const usedStations = WORKSTATIONS.slice(0, agentsDef.length);
    for (let i = 0; i < agentsDef.length; i++) {
      const def = agentsDef[i];
      const ws = usedStations[i];
      const entity = createAgentEntity(
        def.id, def.name, def.color, def.avatar,
        ws.seatCol, ws.seatRow, ws.seatPx,
        def.workStyle,
      );
      entities.push(entity);
    }
    entitiesRef.current = entities;
    setDomAgents([...entities]);
  }, [agentsDef]);

  const MIN_SCALE = 0.28;
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const natural = Math.min(1, e.contentRect.width / DISPLAY_W);
      setScale(Math.max(natural, MIN_SCALE));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) {
      if (loopRef.current) {
        loopRef.current.stop();
        loopRef.current = null;
      }
      const entities = entitiesRef.current;
      const usedStations = WORKSTATIONS.slice(0, agentsDef.length);
      for (let i = 0; i < entities.length; i++) {
        const agent = entities[i];
        const ws = usedStations[i];
        agent.x = ws.seatPx.x;
        agent.y = ws.seatPx.y;
        agent.tileCol = ws.seatCol;
        agent.tileRow = ws.seatRow;
        agent.state = 'idle';
        agent.charPhase = 'idle';
        agent.direction = 'down';
        agent.message = null;
        agent.talkingTo = null;
        agent.emotion = null;
        agent.pathQueue = [];
        agent.sitOffsetY = 0;
      }
      conversationRef.current.clear();
      setDomAgents([...entities]);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let domFrameCounter = 0;

    const update = (gs: GameState) => {
      const entities = entitiesRef.current;
      const walkable = walkableRef.current;
      const dtMs = gs.dt;

      for (const agent of entities) {
        if (agent.pathQueue.length > 0) {
          tickMovement(agent, dtMs);
        }
        tickTypeAnimation(agent, dtMs);
        tickBehavior(
          agent, dtMs, walkable, activityLevel,
          entities, conversationRef.current,
          commandsRef.current,
          workMsgs, personalityBanter, coffeeMsgs,
          celebrateMsgs, loungeMsgs,
        );
      }

      domFrameCounter++;
      if (domFrameCounter % 4 === 0) {
        setDomAgents([...entities]);
      }
    };

    const render = (gs: GameState) => {
      renderRoom(ctx, entitiesRef.current, hourRef.current, gs.time);
    };

    const loop = createGameLoop(update, render);
    loopRef.current = loop;
    loop.start();

    const onVisibilityChange = () => {
      if (!document.hidden && loopRef.current) {
        loopRef.current.resume();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      loop.stop();
      loopRef.current = null;
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [isActive, activityLevel, agentsDef, workMsgs, personalityBanter, coffeeMsgs, celebrateMsgs, loungeMsgs]);

  const frameW = DISPLAY_W * scale;
  const frameH = DISPLAY_H * scale;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (el.scrollWidth <= el.clientWidth) {
      el.scrollLeft = 0;
      return;
    }
    el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
  }, [scale]);

  return (
    <div ref={wrapRef} className="or-wrap" style={{ height: frameH }}>
      <div className="or-frame" style={{ width: frameW, height: frameH, minWidth: frameW }}>
        <div
          className="or-room"
          style={{
            width: DISPLAY_W, height: DISPLAY_H,
            transform: `scale(${scale})`, transformOrigin: 'top left',
            position: 'relative',
          }}
        >
          <canvas
            ref={canvasRef}
            width={NATIVE_W}
            height={NATIVE_H}
            className="or-canvas"
          />

          {agentsDef.map((cfg, i) => {
            const agent = domAgents.find(a => a.id === cfg.id);
            const ws = WORKSTATIONS[i];
            if (!ws) return null;
            const isAtDesk = agent?.state === 'work' || agent?.state === 'deepfocus';
            const isFocus = agent?.state === 'deepfocus';
            const monX = ws.seatCol * TILE_SIZE - 2;
            const monY = (ws.deskRows[0] - 1) * TILE_SIZE + 6;
            const monH = TILE_SIZE + 8;
            return (
              <div
                key={`mon-${cfg.id}`}
                className={`or-monitor-screen ${isAtDesk ? 'or-monitor-active' : 'or-monitor-idle'} ${isFocus ? 'or-monitor-focus' : ''}`}
                style={{
                  left: monX * SCALE,
                  top: (monY + 2) * SCALE,
                  width: TILE_SIZE * SCALE,
                  height: (monH - 4) * SCALE,
                }}
              />
            );
          })}

          <div className="or-steam" style={{
            left: (27 * TILE_SIZE - TILE_SIZE + 6) * SCALE,
            top: (7 * TILE_SIZE - 8) * SCALE,
            width: 10 * SCALE,
            height: 8 * SCALE,
          }}>
            <span className="or-steam-p" style={{ animationDelay: '0s' }} />
            <span className="or-steam-p" style={{ animationDelay: '0.6s' }} />
            <span className="or-steam-p" style={{ animationDelay: '1.2s' }} />
          </div>

          <div className="or-fridge-light" style={{
            left: (31 * TILE_SIZE + 2 * TILE_SIZE - 6) * SCALE,
            top: (9 * TILE_SIZE + 6) * SCALE,
            width: 3 * SCALE,
            height: 3 * SCALE,
          }} />

          <svg className="or-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            {domAgents.filter(a => a.talkingTo).map(a => {
              const t = domAgents.find(x => x.id === a.talkingTo);
              if (!t) return null;
              const x1 = (a.x * SCALE / DISPLAY_W) * 100;
              const y1 = ((a.y + a.sitOffsetY) * SCALE / DISPLAY_H) * 100;
              const x2 = (t.x * SCALE / DISPLAY_W) * 100;
              const y2 = ((t.y + t.sitOffsetY) * SCALE / DISPLAY_H) * 100;
              return (
                <line key={a.id}
                  className="or-talk-line"
                  x1={`${x1}%`} y1={`${y1}%`}
                  x2={`${x2}%`} y2={`${y2}%`}
                />
              );
            })}
          </svg>

          {[...domAgents]
            .sort((a, b) => a.y - b.y)
            .map((agent) => {
              const cfg = agentsDef.find(d => d.id === agent.id);
              if (!cfg) return null;
              const emotionClass = agent.emotion ? `or-emotion-${agent.emotion}` : '';
              const isReplying = !!agent.replyFrom;
              const animSeed = hashToUnit(agent.id);
              const isWalking = agent.pathQueue.length > 0;
              const isSitting = agent.state === 'work' || agent.state === 'deepfocus' || agent.state === 'slack';

              const walkFrameIdx = WALK_FRAME_SEQ[agent.walkFrame] ?? 0;
              const bodyBgPosX = isWalking ? -(walkFrameIdx * 32) : (isSitting ? -(agent.typeFrame * 32) : 0);

              return (
                <div
                  key={agent.id}
                  className={`or-agent or-${agent.state} or-dir-${agent.direction} ${emotionClass} ${isWalking ? 'or-walk-js' : ''} ${isSitting ? 'or-sit-offset' : ''}`}
                  style={{
                    transform: `translate(${Math.round(agent.x * SCALE - 32)}px, ${Math.round((agent.y + agent.sitOffsetY) * SCALE - 32)}px)`,
                    zIndex: Math.floor(agent.y),
                  }}
                >
                  <div
                    className="or-bob"
                    style={{
                      '--or-bob-delay': `${-animSeed * 3.2}s`,
                      '--or-bob-dur': `${2.1 + animSeed * 1.6}s`,
                      '--or-bob-amp': `${0.8 + animSeed * 1.4}px`,
                    } as CSSProperties}
                  >
                    <div
                      className="or-body"
                      style={{
                        backgroundImage: `url(${bodySpritesRef.current[cfg.id]})`,
                        backgroundPositionX: `${bodyBgPosX}px`,
                      }}
                    />

                    <div className={`or-head ${isReplying ? 'or-head-reply' : ''}`} style={{ borderColor: cfg.color }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cfg.avatar} alt={cfg.name} width={24} height={24} />
                    </div>

                    {agent.emotion === 'happy' && <span className="or-emotion-icon">😊</span>}
                    {agent.emotion === 'thinking' && <span className="or-emotion-icon">🤔</span>}
                    {agent.emotion === 'excited' && <span className="or-emotion-icon">🎉</span>}

                    <div className="or-name" style={{ backgroundColor: cfg.color }}>{cfg.name}</div>

                    {agent.message && agent.state !== 'walk' && (
                      <div
                        title={agent.message}
                        className={`or-bubble ${isReplying ? 'or-bubble-reply' : ''} ${agent.state === 'celebrate' ? 'or-bubble-celebrate' : ''} ${agent.state === 'argue' ? 'or-bubble-frustrated' : ''}`}
                      >
                        {agent.message}
                      </div>
                    )}

                    {agent.state === 'wave' && <div className="or-wave-hand">👋</div>}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="or-scroll-fade" />
    </div>
  );
}
