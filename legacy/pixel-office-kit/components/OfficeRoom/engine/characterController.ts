import type { AgentEntity, Direction, OfficeAgentState } from './types';
import { TILE_SIZE, COMMON_AREAS } from './roomData';
import { bfs, findRandomWalkable, tileToPixel } from './pathfinding';

const WALK_SPEED = 48;
const WALK_FRAME_MS = 150;
const TYPE_FRAME_MS = 300;
const WALK_FRAME_SEQ = [0, 1, 2, 1];
const SIT_OFFSET_Y = 6;

type IdleAction = 'work' | 'coffee' | 'lounge' | 'talk' | 'wander' | 'celebrate';

const WANDER_PROFILE = {
  movesMin: 3, movesMax: 6,
  restMin: 60000, restMax: 150000,
  radius: 10,
  pauseMin: 800, pauseMax: 2000,
};

function rand(a: number, b: number): number { return a + Math.random() * (b - a); }
function pick<T>(arr: readonly T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function calcDir(dx: number, dy: number): Direction {
  return Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
}

function pickIdleAction(): IdleAction {
  const weights: [IdleAction, number][] = [
    ['work', 2.0],
    ['coffee', 1.2],
    ['lounge', 0.8],
    ['talk', 1.5],
    ['wander', 2.5],
    ['celebrate', 0.5],
  ];
  const total = weights.reduce((s, [, w]) => s + w, 0);
  const roll = Math.random() * total;
  let cumulative = 0;
  for (const [action, w] of weights) {
    cumulative += w;
    if (roll <= cumulative) return action;
  }
  return 'wander';
}

export function tickMovement(agent: AgentEntity, dtMs: number): void {
  if (agent.pathQueue.length === 0) return;

  agent.moveProgress += (WALK_SPEED * dtMs / 1000) / TILE_SIZE;

  if (agent.moveProgress >= 1.0) {
    agent.moveProgress = 0;
    agent.tileCol = agent.moveToCol;
    agent.tileRow = agent.moveToRow;
    const px = tileToPixel(agent.tileCol, agent.tileRow, TILE_SIZE);
    agent.x = px.x;
    agent.y = px.y;

    agent.pathQueue.shift();

    if (agent.pathQueue.length > 0) {
      const next = agent.pathQueue[0];
      agent.moveFromCol = agent.tileCol;
      agent.moveFromRow = agent.tileRow;
      agent.moveToCol = next.col;
      agent.moveToRow = next.row;
      agent.direction = calcDir(next.col - agent.tileCol, next.row - agent.tileRow);
    } else {
      agent.charPhase = agent.arriveState === 'work' || agent.arriveState === 'deepfocus' ? 'sit' : 'stand';
      if (agent.arriveState) {
        agent.state = agent.arriveState;
      }
      updateSitOffset(agent);
    }
  } else {
    const fromPx = tileToPixel(agent.moveFromCol, agent.moveFromRow, TILE_SIZE);
    const toPx = tileToPixel(agent.moveToCol, agent.moveToRow, TILE_SIZE);
    agent.x = fromPx.x + (toPx.x - fromPx.x) * agent.moveProgress;
    agent.y = fromPx.y + (toPx.y - fromPx.y) * agent.moveProgress;
  }

  agent.walkFrameTimer += dtMs;
  if (agent.walkFrameTimer >= WALK_FRAME_MS) {
    agent.walkFrameTimer -= WALK_FRAME_MS;
    agent.walkFrame = (agent.walkFrame + 1) % WALK_FRAME_SEQ.length;
  }
}

export function tickTypeAnimation(agent: AgentEntity, dtMs: number): void {
  if (agent.state !== 'work' && agent.state !== 'deepfocus') return;
  agent.typeFrameTimer += dtMs;
  if (agent.typeFrameTimer >= TYPE_FRAME_MS) {
    agent.typeFrameTimer -= TYPE_FRAME_MS;
    agent.typeFrame = agent.typeFrame === 0 ? 1 : 0;
  }
}

function updateSitOffset(agent: AgentEntity): void {
  const sitStates: OfficeAgentState[] = ['work', 'deepfocus', 'slack'];
  agent.sitOffsetY = sitStates.includes(agent.state) && agent.pathQueue.length === 0 ? SIT_OFFSET_Y : 0;
}

function navigateTo(
  agent: AgentEntity,
  goalCol: number,
  goalRow: number,
  walkable: boolean[][],
  arriveState: OfficeAgentState | null = null,
): boolean {
  if (agent.cachedGoalCol === goalCol && agent.cachedGoalRow === goalRow && agent.pathQueue.length > 0) {
    return true;
  }

  const start = { col: agent.tileCol, row: agent.tileRow };
  const goal = { col: goalCol, row: goalRow };
  const path = bfs(walkable, start, goal);

  if (path.length === 0) return false;

  agent.pathQueue = path;
  agent.cachedGoalCol = goalCol;
  agent.cachedGoalRow = goalRow;
  agent.moveFromCol = agent.tileCol;
  agent.moveFromRow = agent.tileRow;
  agent.moveToCol = path[0].col;
  agent.moveToRow = path[0].row;
  agent.moveProgress = 0;
  agent.charPhase = 'walk';
  agent.state = 'walk';
  agent.arriveState = arriveState;
  agent.sitOffsetY = 0;
  agent.direction = calcDir(path[0].col - agent.tileCol, path[0].row - agent.tileRow);

  return true;
}

function navigateToSeat(agent: AgentEntity, walkable: boolean[][], arriveState: OfficeAgentState = 'work'): boolean {
  return navigateTo(agent, agent.seatCol, agent.seatRow, walkable, arriveState);
}

function startWanderCycle(agent: AgentEntity): void {
  agent.wanderMovesLeft = Math.floor(rand(WANDER_PROFILE.movesMin, WANDER_PROFILE.movesMax + 1));
  agent.wanderRestTimer = 0;
  agent.isInWanderCycle = true;
}

function tickWander(agent: AgentEntity, _dtMs: number, walkable: boolean[][]): void {
  if (!agent.isInWanderCycle) return;
  if (agent.pathQueue.length > 0) return;

  if (agent.wanderMovesLeft <= 0) {
    agent.isInWanderCycle = false;
    agent.wanderRestTimer = rand(WANDER_PROFILE.restMin, WANDER_PROFILE.restMax);
    navigateToSeat(agent, walkable, 'work');
    return;
  }

  if (agent.dwellUntil > Date.now()) return;

  const target = findRandomWalkable(walkable, agent.tileCol, agent.tileRow, WANDER_PROFILE.radius);
  if (target) {
    const path = bfs(walkable, { col: agent.tileCol, row: agent.tileRow }, target);
    if (path.length > 0) {
      agent.pathQueue = path;
      agent.moveFromCol = agent.tileCol;
      agent.moveFromRow = agent.tileRow;
      agent.moveToCol = path[0].col;
      agent.moveToRow = path[0].row;
      agent.moveProgress = 0;
      agent.charPhase = 'walk';
      agent.state = 'walk';
      agent.arriveState = 'idle';
      agent.sitOffsetY = 0;
      agent.direction = calcDir(path[0].col - agent.tileCol, path[0].row - agent.tileRow);
      agent.wanderMovesLeft--;
      agent.dwellUntil = Date.now() + rand(WANDER_PROFILE.pauseMin, WANDER_PROFILE.pauseMax);
    }
  }
}

export function tickBehavior(
  agent: AgentEntity,
  dtMs: number,
  walkable: boolean[][],
  activityLevel: number,
  allAgents: AgentEntity[],
  conversationMap: Map<string, { text: string; replyText: string | null; phase: number; timer: number }>,
  commandsRef: { agentId: string; action: OfficeAgentState; message?: string; targetAgentId?: string }[],
  workMsgs: Record<string, string[]>,
  personalityBanter: Record<string, string[]>,
  coffeeMsgs: string[],
  celebrateMsgs: Record<string, string[]>,
  loungeMsgs: Record<string, string[]>,
): void {
  agent.stateAge += dtMs;

  if (agent.pathQueue.length > 0) return;

  const convState = conversationMap.get(agent.id);
  if (convState) {
    convState.timer -= dtMs / 120;
    if (convState.timer <= 0) {
      if (convState.phase === 0) {
        const targetAgent = allAgents.find(a => a.id === agent.talkingTo);
        if (targetAgent) {
          targetAgent.message = convState.replyText ?? 'Got it!';
          targetAgent.state = 'talk';
          targetAgent.arriveState = 'talk';
          targetAgent.emotion = 'happy';
          targetAgent.replyFrom = agent.id;
          targetAgent.direction = calcDir(agent.x - targetAgent.x, agent.y - targetAgent.y);
        }
        convState.phase = 1;
        convState.timer = 12;
      } else {
        conversationMap.delete(agent.id);
        agent.message = null;
        agent.talkingTo = null;
        agent.emotion = null;
        agent.sentiment = null;
        agent.arriveState = null;
        const targetAgent = allAgents.find(a => a.replyFrom === agent.id);
        if (targetAgent) {
          targetAgent.message = null;
          targetAgent.replyFrom = null;
          targetAgent.emotion = null;
          targetAgent.sentiment = null;
          targetAgent.arriveState = null;
        }
      }
    }
    return;
  }

  if (agent.replyFrom) return;

  if (agent.dwellUntil && Date.now() < agent.dwellUntil) return;

  if (agent.isInWanderCycle) {
    tickWander(agent, dtMs, walkable);
    return;
  }

  if (agent.wanderRestTimer > 0) {
    agent.wanderRestTimer -= dtMs;
    updateSitOffset(agent);
    return;
  }

  const lookTempo = activityLevel > 20 ? 0.0020 : activityLevel > 5 ? 0.0013 : 0.0007;
  if (agent.state !== 'walk' && Math.random() < lookTempo * dtMs) {
    const dirs: Direction[] = ['up', 'right', 'down', 'left'];
    agent.direction = pick(dirs.filter(d => d !== agent.direction) as Direction[]);
    return;
  }

  const cmd = commandsRef.find(c => c.agentId === agent.id);
  if (cmd) {
    const isManual = (cmd as { manual?: boolean }).manual;
    const shouldExec = isManual || (agent.state !== 'walk' && Math.random() < 0.004 * dtMs);
    if (shouldExec) {
      agent.isInWanderCycle = false;
      agent.wanderRestTimer = 0;
      agent.replyFrom = null;
      conversationMap.delete(agent.id);

      const targetAgent = cmd.targetAgentId ? allAgents.find(a => a.id === cmd.targetAgentId) : undefined;
      if (cmd.action === 'work') {
        navigateToSeat(agent, walkable, 'work');
        agent.message = cmd.message?.slice(0, 30) ?? pick(workMsgs[agent.id] ?? ['Working...']);
        agent.talkingTo = null;
        agent.emotion = null;
        agent.dwellUntil = Date.now() + 1500;
      } else if (cmd.action === 'coffee') {
        const coffee = COMMON_AREAS.find(a => a.name === 'coffee')!;
        navigateTo(agent, coffee.col + Math.floor(rand(-1, 1)), coffee.row + Math.floor(rand(0, 2)), walkable, 'coffee');
        agent.message = cmd.message?.slice(0, 30) ?? pick(coffeeMsgs);
        agent.talkingTo = null;
        agent.emotion = null;
        agent.dwellUntil = Date.now() + 1200;
      } else if (cmd.action === 'lounge') {
        const lounge = COMMON_AREAS.find(a => a.name === 'lounge')!;
        navigateTo(agent, lounge.col + Math.floor(rand(-1, 2)), lounge.row + Math.floor(rand(1, 3)), walkable, 'lounge');
        agent.message = cmd.message?.slice(0, 30) ?? pick(loungeMsgs[agent.id] ?? ['Relaxing...']);
        agent.talkingTo = null;
        agent.emotion = 'happy';
        agent.dwellUntil = Date.now() + 1500;
      } else if (cmd.action === 'celebrate') {
        agent.state = 'celebrate';
        agent.arriveState = 'celebrate';
        agent.message = cmd.message?.slice(0, 30) ?? pick(celebrateMsgs[agent.id] ?? ['Woohoo!']);
        agent.emotion = 'excited';
        agent.talkingTo = null;
        agent.dwellUntil = Date.now() + 900;
      } else if (cmd.action === 'talk' && targetAgent) {
        navigateTo(agent, targetAgent.tileCol + (agent.tileCol > targetAgent.tileCol ? 1 : -1), targetAgent.tileRow, walkable, 'talk');
        agent.message = cmd.message?.slice(0, 30) || 'Hey!';
        agent.talkingTo = targetAgent.id;
        agent.emotion = 'happy';
        agent.dwellUntil = Date.now() + 1000;
      } else {
        agent.state = cmd.action;
        agent.arriveState = cmd.action;
        agent.message = cmd.message?.slice(0, 30) ?? null;
        agent.emotion = cmd.action === 'think' ? 'thinking' : null;
        agent.talkingTo = null;
        agent.dwellUntil = Date.now() + 1000;
      }
      if (isManual) {
        const idx = commandsRef.indexOf(cmd);
        if (idx !== -1) commandsRef.splice(idx, 1);
      }
      return;
    }
  }

  const tempo = activityLevel > 20 ? 0.0020 : activityLevel > 5 ? 0.0010 : 0.0005;
  if (Math.random() < tempo * dtMs) {
    const idle = pickIdleAction();

    if (idle === 'work') {
      navigateToSeat(agent, walkable, 'work');
      agent.message = pick(workMsgs[agent.id] ?? ['Working...']);
      agent.talkingTo = null;
      agent.emotion = null;
      agent.sentiment = null;
      agent.dwellUntil = Date.now() + 1500;
    } else if (idle === 'talk') {
      const candidates = allAgents.filter(a =>
        a.id !== agent.id && !a.talkingTo && !a.replyFrom
        && a.state !== 'walk' && a.state !== 'talk'
        && !conversationMap.has(a.id)
      );
      if (candidates.length > 0) {
        const partner = pick(candidates);
        const askText = pick(personalityBanter[agent.id] ?? ['Hey there!']);
        const replyText = pick(personalityBanter[partner.id] ?? ['Sure!']);
        const roll = Math.random();
        const convStyle: OfficeAgentState = roll < 0.08 ? 'argue' : roll < 0.25 ? 'gossip' : 'wave';
        navigateTo(agent, partner.tileCol + (agent.tileCol > partner.tileCol ? 1 : -1), partner.tileRow, walkable, convStyle);
        agent.message = askText;
        agent.talkingTo = partner.id;
        agent.emotion = 'happy';
        agent.sentiment = null;
        agent.dwellUntil = Date.now() + 1500;
        conversationMap.set(agent.id, { text: askText, replyText, phase: 0, timer: 18 });
      } else {
        navigateToSeat(agent, walkable, 'work');
        agent.message = pick(personalityBanter[agent.id] ?? ['Thinking...']);
        agent.talkingTo = null;
        agent.emotion = null;
        agent.sentiment = null;
        agent.dwellUntil = Date.now() + 1500;
      }
    } else if (idle === 'coffee') {
      const coffee = COMMON_AREAS.find(a => a.name === 'coffee')!;
      navigateTo(agent, coffee.col + Math.floor(rand(-1, 1)), coffee.row + Math.floor(rand(0, 2)), walkable, 'coffee');
      agent.message = pick(coffeeMsgs);
      agent.talkingTo = null;
      agent.emotion = null;
      agent.sentiment = null;
      agent.dwellUntil = Date.now() + 1200;
    } else if (idle === 'lounge') {
      const lounge = COMMON_AREAS.find(a => a.name === 'lounge')!;
      navigateTo(agent, lounge.col + Math.floor(rand(-1, 2)), lounge.row + Math.floor(rand(1, 3)), walkable, 'lounge');
      agent.message = pick(loungeMsgs[agent.id] ?? ['Relaxing...']);
      agent.talkingTo = null;
      agent.emotion = 'happy';
      agent.sentiment = null;
      agent.dwellUntil = Date.now() + 1500;
    } else if (idle === 'celebrate') {
      agent.state = 'celebrate';
      agent.arriveState = 'celebrate';
      agent.message = pick(celebrateMsgs[agent.id] ?? ['Woohoo!']);
      agent.emotion = 'excited';
      agent.talkingTo = null;
      agent.sentiment = null;
      agent.dwellUntil = Date.now() + 900;
    } else {
      startWanderCycle(agent);
    }
  }
}

export function createAgentEntity(
  id: string,
  name: string,
  color: string,
  avatar: string,
  seatCol: number,
  seatRow: number,
  seatPx: { x: number; y: number },
  workStyle: string,
): AgentEntity {
  return {
    id, name, color, avatar,
    x: seatPx.x, y: seatPx.y,
    tileCol: seatCol, tileRow: seatRow,
    moveFromCol: seatCol, moveFromRow: seatRow,
    moveToCol: seatCol, moveToRow: seatRow,
    moveProgress: 0,
    pathQueue: [],
    cachedGoalCol: -1, cachedGoalRow: -1,
    seatCol, seatRow, seatPx,
    walkFrame: 0, walkFrameTimer: 0,
    typeFrame: 0, typeFrameTimer: 0,
    state: 'idle',
    charPhase: 'idle',
    direction: 'down',
    stateAge: 0,
    message: null, talkingTo: null, replyFrom: null,
    emotion: null, sentiment: null,
    arriveState: null,
    dwellUntil: Date.now() + rand(500, 1500),
    missionBadge: null,
    workStyle, affect: 'neutral',
    wanderMovesLeft: 0, wanderRestTimer: 0, isInWanderCycle: false,
    conversationPhase: 0, conversationTimer: 0,
    sitOffsetY: 0,
  };
}
