"use client";

import { useState } from "react";

const presetAgents = [
  { id: "alpha", name: "Agent-Alpha", strategy: "Market Maker", spread: "0.02%", risk: "Low", enabled: true },
  { id: "beta", name: "Agent-Beta", strategy: "Momentum", window: "5min", risk: "Medium", enabled: true },
  { id: "gamma", name: "Agent-Gamma", strategy: "Arbitrage", threshold: "0.1%", risk: "Low", enabled: true },
];

const regulations = [
  { id: "regsho", label: "Reg SHO — Short Sale Regulation", enabled: true },
  { id: "regnms", label: "Reg NMS — National Market System", enabled: true },
  { id: "mar", label: "MAR — Market Abuse Regulation", enabled: true },
  { id: "cat", label: "CAT — Consolidated Audit Trail", enabled: false },
  { id: "mifid", label: "MiFID II — Markets in Financial Instruments", enabled: false },
];

interface SimEvent {
  time: string;
  type: "info" | "warning" | "violation" | "success";
  message: string;
}

const simulationEvents: SimEvent[] = [
  { time: "00:00:01", type: "info", message: "Initializing simulation environment..." },
  { time: "00:00:02", type: "info", message: "Loading agent configurations (3 agents)" },
  { time: "00:00:03", type: "success", message: "SEC Rule Engine v3.2.1 loaded — 847 active rules" },
  { time: "00:00:04", type: "info", message: "Starting scenario batch 1/1000" },
  { time: "00:02:15", type: "info", message: "Batch 100/1000 complete — no violations detected" },
  { time: "00:05:30", type: "info", message: "Batch 250/1000 complete — no violations detected" },
  { time: "00:08:12", type: "warning", message: "Batch 412: Correlated order flow between Alpha-Beta (r=0.72)" },
  { time: "00:09:45", type: "info", message: "Batch 500/1000 complete — 1 risk flagged" },
  { time: "00:12:34", type: "warning", message: "Batch 623: Correlation strengthening Alpha-Beta (r=0.87)" },
  { time: "00:14:18", type: "violation", message: "Batch 687: SPOOFING DETECTED — Agent-Alpha cancel rate 94% when Beta active" },
  { time: "00:14:19", type: "violation", message: "Rule violation: Reg SHO §242.200(a) — Manipulative short selling" },
  { time: "00:16:22", type: "warning", message: "Batch 734: Agent-Gamma front-running via information leakage (78%)" },
  { time: "00:19:55", type: "violation", message: "Batch 856: LAYERING DETECTED — Coordinated multi-level order placement" },
  { time: "00:19:56", type: "violation", message: "Rule violation: Reg NMS Rule 610 — Access to quotations" },
  { time: "00:22:30", type: "info", message: "Batch 1000/1000 complete" },
  { time: "00:22:31", type: "success", message: "Simulation finished: 2 violations, 3 risks across 1000 scenarios" },
  { time: "00:22:32", type: "success", message: "Audit report generated — ready for export" },
];

export default function SimulatorPage() {
  const [agents, setAgents] = useState(presetAgents);
  const [regs, setRegs] = useState(regulations);
  const [scenarios, setScenarios] = useState(1000);
  const [running, setRunning] = useState(false);
  const [events, setEvents] = useState<SimEvent[]>([]);
  const [complete, setComplete] = useState(false);

  const toggleAgent = (id: string) =>
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)));

  const toggleReg = (id: string) =>
    setRegs((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));

  const runSimulation = () => {
    setRunning(true);
    setComplete(false);
    setEvents([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= simulationEvents.length) {
        clearInterval(interval);
        setRunning(false);
        setComplete(true);
        return;
      }
      setEvents((prev) => [...prev, simulationEvents[i]]);
      i++;
    }, 800);
  };

  const violationCount = events.filter((e) => e.type === "violation").length;
  const warningCount = events.filter((e) => e.type === "warning").length;
  const progress = running ? Math.round((events.length / simulationEvents.length) * 100) : complete ? 100 : 0;

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Multi-Agent Simulation</h1>
          <p className="text-muted">
            Configure agents, set regulatory constraints, and run compliance simulations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Config Panel */}
          <div className="space-y-6">
            {/* Agents */}
            <div className="rounded-xl border border-card-border bg-card p-6">
              <h2 className="font-mono text-sm text-muted mb-4">AGENT CONFIGURATION</h2>
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`rounded-lg border p-4 cursor-pointer transition-colors ${
                      agent.enabled
                        ? "border-crimson/40 bg-crimson/5"
                        : "border-card-border bg-card"
                    }`}
                    onClick={() => toggleAgent(agent.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm font-medium">{agent.name}</span>
                      <span
                        className={`h-3 w-3 rounded-full ${
                          agent.enabled ? "bg-emerald" : "bg-muted/30"
                        }`}
                      />
                    </div>
                    <p className="text-xs text-muted">
                      {agent.strategy} · Risk: {agent.risk}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulations */}
            <div className="rounded-xl border border-card-border bg-card p-6">
              <h2 className="font-mono text-sm text-muted mb-4">REGULATORY CONSTRAINTS</h2>
              <div className="space-y-2">
                {regs.map((reg) => (
                  <label
                    key={reg.id}
                    className="flex items-center gap-3 cursor-pointer py-1"
                  >
                    <input
                      type="checkbox"
                      checked={reg.enabled}
                      onChange={() => toggleReg(reg.id)}
                      className="accent-crimson h-4 w-4"
                    />
                    <span className="text-xs">{reg.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Scenarios */}
            <div className="rounded-xl border border-card-border bg-card p-6">
              <h2 className="font-mono text-sm text-muted mb-4">SCENARIO COUNT</h2>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={scenarios}
                onChange={(e) => setScenarios(Number(e.target.value))}
                className="w-full accent-crimson"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>100</span>
                <span className="text-crimson font-mono font-bold">{scenarios.toLocaleString()}</span>
                <span>10,000</span>
              </div>
            </div>

            <button
              onClick={runSimulation}
              disabled={running || agents.filter((a) => a.enabled).length < 2}
              className="w-full rounded-lg bg-crimson px-6 py-3 font-medium text-white hover:bg-crimson/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {running ? "Simulation Running..." : "Run Simulation"}
            </button>
          </div>

          {/* Output */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-card-border bg-card p-4 text-center">
                <p className="font-mono text-2xl font-bold text-crimson">{violationCount}</p>
                <p className="text-xs text-muted mt-1">Violations</p>
              </div>
              <div className="rounded-xl border border-card-border bg-card p-4 text-center">
                <p className="font-mono text-2xl font-bold text-amber">{warningCount}</p>
                <p className="text-xs text-muted mt-1">Risks</p>
              </div>
              <div className="rounded-xl border border-card-border bg-card p-4 text-center">
                <p className="font-mono text-2xl font-bold text-emerald">{progress}%</p>
                <p className="text-xs text-muted mt-1">Progress</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 rounded-full bg-card-border overflow-hidden">
              <div
                className="h-full bg-crimson transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Timeline */}
            <div className="rounded-xl border border-card-border bg-card p-6">
              <h2 className="font-mono text-sm text-muted mb-4">SIMULATION TIMELINE</h2>
              <div className="h-[500px] overflow-y-auto space-y-2 font-mono text-xs">
                {events.length === 0 && !running && (
                  <p className="text-muted">Configure agents and click &quot;Run Simulation&quot; to begin.</p>
                )}
                {events.map((event, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 p-2 rounded-lg ${
                      event.type === "violation"
                        ? "bg-crimson/10 border border-crimson/20"
                        : event.type === "warning"
                        ? "bg-amber/5"
                        : ""
                    }`}
                  >
                    <span className="text-muted whitespace-nowrap">[{event.time}]</span>
                    <span
                      className={
                        event.type === "violation"
                          ? "text-crimson"
                          : event.type === "warning"
                          ? "text-amber"
                          : event.type === "success"
                          ? "text-emerald"
                          : "text-foreground/80"
                      }
                    >
                      {event.message}
                    </span>
                  </div>
                ))}
                {running && (
                  <div className="flex gap-3 p-2">
                    <span className="text-muted animate-pulse">Processing scenarios...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Export */}
            {complete && (
              <div className="rounded-xl border border-emerald/30 bg-emerald/5 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-emerald">Simulation Complete</h3>
                    <p className="text-sm text-muted mt-1">
                      Audit report ready for export. {violationCount} violations require review.
                    </p>
                  </div>
                  <button className="rounded-lg bg-emerald px-4 py-2 text-sm font-medium text-white hover:bg-emerald/90 transition-colors">
                    Export Report (PDF)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
