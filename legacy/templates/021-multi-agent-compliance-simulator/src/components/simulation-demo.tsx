"use client";

import { useState, useEffect } from "react";

interface AgentNode {
  id: string;
  label: string;
  x: number;
  y: number;
  strategy: string;
  status: "normal" | "warning" | "violation";
}

interface Connection {
  from: string;
  to: string;
  status: "normal" | "warning" | "violation";
  label?: string;
}

interface LogEntry {
  time: string;
  message: string;
  level: "info" | "warning" | "violation";
}

const initialAgents: AgentNode[] = [
  { id: "alpha", label: "Agent-Alpha", x: 200, y: 80, strategy: "Market Maker", status: "normal" },
  { id: "beta", label: "Agent-Beta", x: 80, y: 280, strategy: "Momentum", status: "normal" },
  { id: "gamma", label: "Agent-Gamma", x: 320, y: 280, strategy: "Arbitrage", status: "normal" },
];

const initialConnections: Connection[] = [
  { from: "alpha", to: "beta", status: "normal" },
  { from: "alpha", to: "gamma", status: "normal" },
  { from: "beta", to: "gamma", status: "normal" },
];

const simulationSteps: { agents: AgentNode[]; connections: Connection[]; log: LogEntry }[] = [
  {
    agents: initialAgents,
    connections: initialConnections,
    log: { time: "00:00:01", message: "Simulation initialized with 3 agents", level: "info" },
  },
  {
    agents: initialAgents,
    connections: initialConnections,
    log: { time: "00:05:00", message: "All agents trading within normal parameters", level: "info" },
  },
  {
    agents: initialAgents.map((a) => a.id === "alpha" ? { ...a, status: "warning" as const } : a),
    connections: initialConnections.map((c) =>
      c.from === "alpha" && c.to === "beta" ? { ...c, status: "warning" as const, label: "r=0.87" } : c
    ),
    log: { time: "00:12:34", message: "Correlated order patterns detected between Alpha and Beta (r=0.87)", level: "warning" },
  },
  {
    agents: initialAgents.map((a) =>
      a.id === "alpha" || a.id === "beta" ? { ...a, status: "violation" as const } : a
    ),
    connections: initialConnections.map((c) =>
      c.from === "alpha" && c.to === "beta"
        ? { ...c, status: "violation" as const, label: "SPOOFING" }
        : c
    ),
    log: { time: "00:15:22", message: "VIOLATION: Emergent spoofing pattern — Reg SHO §242.200(a)", level: "violation" },
  },
  {
    agents: initialAgents.map((a) =>
      a.id === "alpha" || a.id === "beta"
        ? { ...a, status: "violation" as const }
        : a.id === "gamma"
        ? { ...a, status: "warning" as const }
        : a
    ),
    connections: initialConnections.map((c) => {
      if (c.from === "alpha" && c.to === "beta") return { ...c, status: "violation" as const, label: "SPOOFING" };
      if (c.from === "alpha" && c.to === "gamma") return { ...c, status: "warning" as const, label: "LEAKAGE" };
      return c;
    }),
    log: { time: "00:18:45", message: "RISK: Agent-Gamma front-running via information leakage (78%)", level: "warning" },
  },
  {
    agents: initialAgents.map((a) => ({ ...a, status: "violation" as const })),
    connections: initialConnections.map((c) => {
      if (c.from === "alpha" && c.to === "beta") return { ...c, status: "violation" as const, label: "SPOOFING" };
      if (c.from === "alpha" && c.to === "gamma") return { ...c, status: "violation" as const, label: "LAYERING" };
      if (c.from === "beta" && c.to === "gamma") return { ...c, status: "violation" as const, label: "COLLUSION" };
      return c;
    }),
    log: { time: "00:23:11", message: "VIOLATION: Coordinated layering pattern — Reg NMS Rule 610", level: "violation" },
  },
];

export function SimulationDemo() {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (step >= simulationSteps.length) {
      setRunning(false);
      return;
    }
    const timer = setTimeout(() => {
      setLogs((prev) => [...prev, simulationSteps[step].log]);
      setStep((s) => s + 1);
    }, 1500);
    return () => clearTimeout(timer);
  }, [step, running]);

  const currentData = step > 0 ? simulationSteps[step - 1] : simulationSteps[0];

  const startSimulation = () => {
    setStep(0);
    setLogs([]);
    setRunning(true);
  };

  const getColor = (status: string) => {
    if (status === "violation") return "#dc2626";
    if (status === "warning") return "#f59e0b";
    return "#6b6b80";
  };

  const getAgent = (id: string) => currentData.agents.find((a) => a.id === id)!;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Graph */}
      <div className="rounded-xl border border-card-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-muted">AGENT NETWORK TOPOLOGY</span>
          <button
            onClick={startSimulation}
            className="rounded-lg bg-crimson/20 border border-crimson/40 px-4 py-1.5 font-mono text-xs text-crimson hover:bg-crimson/30 transition-colors"
          >
            {running ? "Running..." : "Run Simulation"}
          </button>
        </div>
        <svg viewBox="0 0 400 360" className="w-full">
          {/* Connections */}
          {currentData.connections.map((conn) => {
            const from = getAgent(conn.from);
            const to = getAgent(conn.to);
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            return (
              <g key={`${conn.from}-${conn.to}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={getColor(conn.status)}
                  strokeWidth={conn.status === "normal" ? 1 : 2}
                  strokeDasharray={conn.status === "normal" ? "4,4" : "none"}
                  opacity={conn.status === "normal" ? 0.4 : 0.8}
                />
                {conn.label && (
                  <text
                    x={midX}
                    y={midY - 8}
                    textAnchor="middle"
                    fill={getColor(conn.status)}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {conn.label}
                  </text>
                )}
              </g>
            );
          })}
          {/* Nodes */}
          {currentData.agents.map((agent) => (
            <g key={agent.id}>
              {agent.status !== "normal" && (
                <circle
                  cx={agent.x}
                  cy={agent.y}
                  r="32"
                  fill={getColor(agent.status)}
                  opacity="0.15"
                  className="animate-pulse-glow"
                />
              )}
              <circle
                cx={agent.x}
                cy={agent.y}
                r="24"
                fill="#12121a"
                stroke={getColor(agent.status)}
                strokeWidth="2"
              />
              <text
                x={agent.x}
                y={agent.y - 2}
                textAnchor="middle"
                fill={getColor(agent.status)}
                fontSize="8"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {agent.id.charAt(0).toUpperCase()}
              </text>
              <text
                x={agent.x}
                y={agent.y + 8}
                textAnchor="middle"
                fill="#6b6b80"
                fontSize="6"
                fontFamily="monospace"
              >
                {agent.strategy}
              </text>
              <text
                x={agent.x}
                y={agent.y + 46}
                textAnchor="middle"
                fill="#e0e0e8"
                fontSize="10"
                fontFamily="monospace"
              >
                {agent.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Log */}
      <div className="rounded-xl border border-card-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
          <span className="font-mono text-xs text-muted">SIMULATION LOG</span>
        </div>
        <div className="h-80 overflow-y-auto space-y-2 font-mono text-xs">
          {logs.length === 0 && (
            <p className="text-muted">Click &quot;Run Simulation&quot; to start...</p>
          )}
          {logs.map((log, i) => (
            <p
              key={i}
              className={
                log.level === "violation"
                  ? "text-crimson"
                  : log.level === "warning"
                  ? "text-amber"
                  : "text-emerald"
              }
            >
              [{log.time}] {log.message}
            </p>
          ))}
          {running && (
            <p className="text-muted animate-pulse">Processing...</p>
          )}
          {!running && logs.length > 0 && (
            <p className="text-emerald mt-4">
              Simulation complete. {logs.filter((l) => l.level === "violation").length} violations,{" "}
              {logs.filter((l) => l.level === "warning").length} risks detected.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
