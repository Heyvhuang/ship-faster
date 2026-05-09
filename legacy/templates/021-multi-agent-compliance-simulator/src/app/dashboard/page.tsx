"use client";

import { useState } from "react";

const recentSimulations = [
  { id: "SIM-2026-0224-001", date: "Feb 24, 2026", agents: 3, scenarios: 1000, violations: 2, risks: 3, status: "complete" },
  { id: "SIM-2026-0223-004", date: "Feb 23, 2026", agents: 5, scenarios: 5000, violations: 7, risks: 12, status: "complete" },
  { id: "SIM-2026-0223-003", date: "Feb 23, 2026", agents: 3, scenarios: 1000, violations: 0, risks: 1, status: "complete" },
  { id: "SIM-2026-0222-002", date: "Feb 22, 2026", agents: 8, scenarios: 10000, violations: 14, risks: 23, status: "complete" },
  { id: "SIM-2026-0222-001", date: "Feb 22, 2026", agents: 3, scenarios: 2000, violations: 1, risks: 4, status: "complete" },
  { id: "SIM-2026-0221-001", date: "Feb 21, 2026", agents: 4, scenarios: 3000, violations: 3, risks: 8, status: "complete" },
];

const violations = [
  {
    id: "V-001",
    type: "Spoofing",
    severity: "critical",
    rule: "Reg SHO §242.200(a)",
    agents: ["Agent-Alpha", "Agent-Beta"],
    timestamp: "2026-02-24 14:15:22",
    description: "Agent-Alpha placing and canceling orders at 94% rate when Agent-Beta is active in the same instrument.",
  },
  {
    id: "V-002",
    type: "Layering",
    severity: "critical",
    rule: "Reg NMS Rule 610",
    agents: ["Agent-Alpha", "Agent-Beta", "Agent-Gamma"],
    timestamp: "2026-02-24 14:23:11",
    description: "Coordinated multi-level order placement across three agents creating artificial depth illusion.",
  },
  {
    id: "V-003",
    type: "Front-Running",
    severity: "high",
    rule: "SEC Rule 10b-5",
    agents: ["Agent-Gamma"],
    timestamp: "2026-02-23 09:45:33",
    description: "Agent-Gamma consistently executing trades 200ms before large orders from Agent-Alpha arrive.",
  },
  {
    id: "V-004",
    type: "Wash Trading",
    severity: "critical",
    rule: "CEA §4c(a)",
    agents: ["Agent-Delta", "Agent-Epsilon"],
    timestamp: "2026-02-22 16:12:08",
    description: "Circular trading pattern between two agents with no economic purpose, inflating volume by 340%.",
  },
  {
    id: "V-005",
    type: "Quote Stuffing",
    severity: "high",
    rule: "Reg NMS Rule 611",
    agents: ["Agent-Beta"],
    timestamp: "2026-02-22 11:38:55",
    description: "Agent-Beta submitting 50,000+ quotes/second to overwhelm competing market makers.",
  },
];

const auditEntries = [
  { time: "14:23:11.847", agent: "Agent-Alpha", action: "PLACE_ORDER", details: "BUY 500 AAPL @ 187.32 (limit)", flag: "none" },
  { time: "14:23:11.849", agent: "Agent-Beta", action: "PLACE_ORDER", details: "BUY 300 AAPL @ 187.35 (limit)", flag: "none" },
  { time: "14:23:11.851", agent: "Agent-Alpha", action: "CANCEL_ORDER", details: "CANCEL BUY 500 AAPL @ 187.32", flag: "warning" },
  { time: "14:23:11.853", agent: "Agent-Gamma", action: "PLACE_ORDER", details: "SELL 200 AAPL @ 187.30 (market)", flag: "violation" },
  { time: "14:23:11.855", agent: "Agent-Beta", action: "MODIFY_ORDER", details: "MOD BUY 300→800 AAPL @ 187.35", flag: "warning" },
  { time: "14:23:11.857", agent: "Agent-Alpha", action: "PLACE_ORDER", details: "BUY 1000 AAPL @ 187.28 (limit)", flag: "none" },
  { time: "14:23:11.860", agent: "Agent-Alpha", action: "CANCEL_ORDER", details: "CANCEL BUY 1000 AAPL @ 187.28", flag: "violation" },
  { time: "14:23:11.862", agent: "Agent-Gamma", action: "PLACE_ORDER", details: "SELL 500 AAPL @ 187.25 (market)", flag: "violation" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "violations" | "audit">("overview");

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Compliance Dashboard</h1>
            <p className="text-muted text-sm">Real-time monitoring of multi-agent compliance status</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
            <span className="font-mono text-xs text-emerald">MONITORING ACTIVE</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Simulations", value: "1,247", change: "+23 today", color: "text-foreground" },
            { label: "Violations Detected", value: "89", change: "+2 today", color: "text-crimson" },
            { label: "Risk Warnings", value: "312", change: "+8 today", color: "text-amber" },
            { label: "Compliance Score", value: "94.2%", change: "+1.3% this week", color: "text-emerald" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-card-border bg-card p-6">
              <p className="text-xs text-muted mb-2">{stat.label}</p>
              <p className={`font-mono text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-card-border">
          {(["overview", "violations", "audit"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-crimson text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Chart placeholder */}
            <div className="rounded-xl border border-card-border bg-card p-6">
              <h2 className="font-mono text-sm text-muted mb-6">VIOLATIONS OVER TIME (7 DAYS)</h2>
              <div className="flex items-end gap-2 h-40">
                {[3, 1, 5, 2, 7, 4, 2].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-sm bg-crimson/70 transition-all"
                      style={{ height: `${(v / 7) * 100}%` }}
                    />
                    <span className="text-xs text-muted">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent simulations */}
            <div className="rounded-xl border border-card-border bg-card overflow-hidden">
              <div className="px-6 py-4 border-b border-card-border">
                <h2 className="font-mono text-sm text-muted">RECENT SIMULATIONS</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-card-border text-left">
                      <th className="px-6 py-3 text-xs text-muted font-mono">ID</th>
                      <th className="px-6 py-3 text-xs text-muted font-mono">Date</th>
                      <th className="px-6 py-3 text-xs text-muted font-mono">Agents</th>
                      <th className="px-6 py-3 text-xs text-muted font-mono">Scenarios</th>
                      <th className="px-6 py-3 text-xs text-muted font-mono">Violations</th>
                      <th className="px-6 py-3 text-xs text-muted font-mono">Risks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSimulations.map((sim) => (
                      <tr key={sim.id} className="border-b border-card-border/50 hover:bg-card-border/20">
                        <td className="px-6 py-3 font-mono text-sm text-cyan">{sim.id}</td>
                        <td className="px-6 py-3 text-sm text-muted">{sim.date}</td>
                        <td className="px-6 py-3 text-sm">{sim.agents}</td>
                        <td className="px-6 py-3 font-mono text-sm">{sim.scenarios.toLocaleString()}</td>
                        <td className="px-6 py-3">
                          <span className={`font-mono text-sm ${sim.violations > 0 ? "text-crimson" : "text-emerald"}`}>
                            {sim.violations}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <span className="font-mono text-sm text-amber">{sim.risks}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Violations */}
        {activeTab === "violations" && (
          <div className="space-y-4">
            {violations.map((v) => (
              <div
                key={v.id}
                className={`rounded-xl border p-6 ${
                  v.severity === "critical"
                    ? "border-crimson/40 bg-crimson/5"
                    : "border-amber/40 bg-amber/5"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-mono font-bold ${
                        v.severity === "critical"
                          ? "bg-crimson/20 text-crimson"
                          : "bg-amber/20 text-amber"
                      }`}
                    >
                      {v.severity.toUpperCase()}
                    </span>
                    <span className="font-semibold">{v.type}</span>
                    <span className="font-mono text-xs text-muted">{v.id}</span>
                  </div>
                  <span className="font-mono text-xs text-muted">{v.timestamp}</span>
                </div>
                <p className="text-sm text-muted mb-3">{v.description}</p>
                <div className="flex flex-wrap gap-4 text-xs">
                  <span className="text-muted">
                    Rule: <span className="text-foreground font-mono">{v.rule}</span>
                  </span>
                  <span className="text-muted">
                    Agents: <span className="text-foreground font-mono">{v.agents.join(", ")}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Audit Trail */}
        {activeTab === "audit" && (
          <div className="rounded-xl border border-card-border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-card-border flex items-center justify-between">
              <h2 className="font-mono text-sm text-muted">AUDIT TRAIL — SIM-2026-0224-001</h2>
              <button className="rounded-lg bg-emerald/20 border border-emerald/40 px-3 py-1 font-mono text-xs text-emerald">
                Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-card-border text-left">
                    <th className="px-6 py-3 text-xs text-muted font-mono">Timestamp</th>
                    <th className="px-6 py-3 text-xs text-muted font-mono">Agent</th>
                    <th className="px-6 py-3 text-xs text-muted font-mono">Action</th>
                    <th className="px-6 py-3 text-xs text-muted font-mono">Details</th>
                    <th className="px-6 py-3 text-xs text-muted font-mono">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {auditEntries.map((entry, i) => (
                    <tr
                      key={i}
                      className={`border-b border-card-border/50 ${
                        entry.flag === "violation"
                          ? "bg-crimson/5"
                          : entry.flag === "warning"
                          ? "bg-amber/5"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-3 font-mono text-xs text-muted">{entry.time}</td>
                      <td className="px-6 py-3 font-mono text-xs text-cyan">{entry.agent}</td>
                      <td className="px-6 py-3 font-mono text-xs">{entry.action}</td>
                      <td className="px-6 py-3 font-mono text-xs text-muted">{entry.details}</td>
                      <td className="px-6 py-3">
                        {entry.flag !== "none" && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-mono ${
                              entry.flag === "violation"
                                ? "bg-crimson/20 text-crimson"
                                : "bg-amber/20 text-amber"
                            }`}
                          >
                            {entry.flag}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
