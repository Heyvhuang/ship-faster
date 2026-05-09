'use client';

import { useEffect, useRef, useState } from 'react';
import { OfficeRoom } from './OfficeRoom/OfficeRoom';
import { ControlPanel } from './ControlPanel';
import { AGENTS, WORK_MSGS, PERSONALITY_BANTER, COFFEE_MSGS, CELEBRATE_MSGS, LOUNGE_MSGS } from '@/lib/agents';
import { useDemoSimulation } from '@/lib/mock-simulation';
import type { AgentCommand } from './OfficeRoom/OfficeRoom';

export function DemoShell() {
  const [autoMode, setAutoMode] = useState(true);
  const autoCommands = useDemoSimulation(autoMode);
  const [manualCommands, setManualCommands] = useState<AgentCommand[]>([]);
  const [activeCmd, setActiveCmd] = useState<{ agentId: string; action: string } | null>(null);
  const activeCmdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commands = autoMode ? autoCommands : manualCommands;

  const handleManualCommand = (cmd: AgentCommand) => {
    const manualCmd = { ...cmd, manual: true } as AgentCommand & { manual: boolean };
    setManualCommands(prev => [...prev, manualCmd]);
    setActiveCmd({ agentId: cmd.agentId, action: cmd.action });
    if (activeCmdTimerRef.current) clearTimeout(activeCmdTimerRef.current);
    activeCmdTimerRef.current = setTimeout(() => {
      setActiveCmd(null);
      activeCmdTimerRef.current = null;
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (activeCmdTimerRef.current) clearTimeout(activeCmdTimerRef.current);
    };
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#e5e7eb', margin: 0 }}>
          Pixel Office Kit
        </h1>
        <p style={{ color: '#9ca3af', fontSize: 14, marginTop: 4 }}>
          AI agent pixel office — watch agents work, walk, and collaborate
        </p>
        <span style={{
          display: 'inline-block',
          marginTop: 8,
          padding: '2px 10px',
          borderRadius: 12,
          background: '#1e293b',
          color: '#60a5fa',
          fontSize: 11,
          fontWeight: 600,
          border: '1px solid #334155',
        }}>
          DEMO
        </span>
      </div>

      <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #1e293b' }}>
        <OfficeRoom
          agents={AGENTS}
          isActive={true}
          activityLevel={10}
          agentCommands={commands}
          workMsgs={WORK_MSGS}
          personalityBanter={PERSONALITY_BANTER}
          coffeeMsgs={COFFEE_MSGS}
          celebrateMsgs={CELEBRATE_MSGS}
          loungeMsgs={LOUNGE_MSGS}
        />
      </div>

      <ControlPanel
        agents={AGENTS}
        autoMode={autoMode}
        onToggleAuto={() => setAutoMode(v => !v)}
        onCommand={handleManualCommand}
        activeCmd={activeCmd}
      />
    </div>
  );
}
