"use client";

import { useState } from "react";
import type { Metadata } from "next";

const mockSandboxes = [
  {
    id: "sbx_a1b2c3d4",
    name: "research-agent",
    status: "running",
    cpu: 1.2,
    cpuLimit: 2,
    memory: 1800,
    memoryLimit: 4096,
    uptime: "2h 14m",
    tokens: 124500,
    apiCalls: 342,
    policy: "default",
  },
  {
    id: "sbx_e5f6g7h8",
    name: "code-reviewer",
    status: "running",
    cpu: 0.4,
    cpuLimit: 4,
    memory: 890,
    memoryLimit: 8192,
    uptime: "45m",
    tokens: 45200,
    apiCalls: 89,
    policy: "relaxed",
  },
  {
    id: "sbx_i9j0k1l2",
    name: "data-processor",
    status: "paused",
    cpu: 0,
    cpuLimit: 2,
    memory: 0,
    memoryLimit: 4096,
    uptime: "—",
    tokens: 890100,
    apiCalls: 1205,
    policy: "default",
  },
  {
    id: "sbx_m3n4o5p6",
    name: "chat-support-v2",
    status: "stopped",
    cpu: 0,
    cpuLimit: 2,
    memory: 0,
    memoryLimit: 2048,
    uptime: "—",
    tokens: 2100000,
    apiCalls: 8934,
    policy: "custom",
  },
];

const mockLogs = [
  { time: "08:12:01", level: "info", msg: "Agent started" },
  { time: "08:12:02", level: "info", msg: "Loading model weights (gpt-4-turbo)..." },
  { time: "08:12:04", level: "info", msg: "Model loaded in 2.1s" },
  { time: "08:12:05", level: "info", msg: "Connected to task queue" },
  { time: "08:12:05", level: "info", msg: "Processing task #1: summarize-report-q4" },
  { time: "08:12:06", level: "debug", msg: "Token usage: 1,240 input / 890 output" },
  { time: "08:12:06", level: "info", msg: "✓ Task #1 completed (1.2s)" },
  { time: "08:12:07", level: "info", msg: "Processing task #2: extract-entities" },
  { time: "08:12:09", level: "warn", msg: "Rate limit approaching (80% of quota)" },
  { time: "08:12:10", level: "info", msg: "✓ Task #2 completed (2.8s)" },
  { time: "08:12:10", level: "info", msg: "Waiting for next task..." },
];

const statusColor: Record<string, string> = {
  running: "text-green",
  paused: "text-yellow-400",
  stopped: "text-muted",
};

const statusDot: Record<string, string> = {
  running: "bg-green",
  paused: "bg-yellow-400",
  stopped: "bg-muted",
};

function formatNum(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export default function DashboardPage() {
  const [selected, setSelected] = useState(mockSandboxes[0]);
  const [showDeploy, setShowDeploy] = useState(false);

  return (
    <div className="pt-16 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-mono text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted">Manage your agent sandboxes</p>
          </div>
          <button
            onClick={() => setShowDeploy(!showDeploy)}
            className="rounded-md bg-green px-4 py-2 font-mono text-sm font-medium text-background hover:brightness-110 transition"
          >
            + Deploy Agent
          </button>
        </div>

        {/* Deploy Form */}
        {showDeploy && (
          <div className="mb-8 rounded-lg border border-green/30 bg-green/5 p-6">
            <h2 className="mb-4 font-mono text-sm font-bold">Deploy New Agent</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-mono text-xs text-muted">Agent Name</label>
                <input
                  type="text"
                  placeholder="my-agent"
                  className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm focus:border-green focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs text-muted">Runtime</label>
                <select className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm focus:border-green focus:outline-none">
                  <option>Python 3.12</option>
                  <option>Node.js 20</option>
                  <option>Custom Docker</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs text-muted">CPU Cores</label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  defaultValue="2"
                  className="w-full accent-green"
                />
                <div className="flex justify-between font-mono text-xs text-muted">
                  <span>1</span><span>8</span>
                </div>
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs text-muted">Memory (GB)</label>
                <input
                  type="range"
                  min="1"
                  max="32"
                  defaultValue="4"
                  className="w-full accent-green"
                />
                <div className="flex justify-between font-mono text-xs text-muted">
                  <span>1</span><span>32</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1 block font-mono text-xs text-muted">Agent Code</label>
              <textarea
                rows={4}
                placeholder="Paste your agent code here..."
                className="w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm focus:border-green focus:outline-none"
              />
            </div>
            <div className="mt-4 flex gap-3">
              <button className="rounded-md bg-green px-4 py-2 font-mono text-sm font-medium text-background hover:brightness-110 transition">
                Deploy
              </button>
              <button
                onClick={() => setShowDeploy(false)}
                className="rounded-md border border-border px-4 py-2 font-mono text-sm text-muted hover:text-foreground transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Active Sandboxes", value: "2", color: "text-green" },
            { label: "Total Agent-Hours", value: "34.2h", color: "text-blue" },
            { label: "API Calls Today", value: "10,570", color: "text-foreground" },
            { label: "Cost (MTD)", value: "$12.40", color: "text-foreground" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-surface p-4">
              <div className="font-mono text-xs text-muted">{s.label}</div>
              <div className={`font-mono text-2xl font-bold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sandbox List */}
          <div className="lg:col-span-1">
            <h2 className="mb-3 font-mono text-sm font-semibold text-muted">SANDBOXES</h2>
            <div className="space-y-2">
              {mockSandboxes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`w-full rounded-lg border p-3 text-left transition ${
                    selected.id === s.id
                      ? "border-blue bg-blue/5"
                      : "border-border bg-surface hover:border-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-medium">{s.name}</span>
                    <span className={`flex items-center gap-1.5 text-xs ${statusColor[s.status]}`}>
                      <span className={`inline-block h-2 w-2 rounded-full ${statusDot[s.status]}`} />
                      {s.status}
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-xs text-muted">{s.id}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sandbox Info */}
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-mono text-lg font-bold">{selected.name}</h2>
                <div className="flex gap-2">
                  {selected.status === "running" && (
                    <>
                      <button className="rounded border border-border px-3 py-1 font-mono text-xs text-muted hover:text-foreground transition">
                        Pause
                      </button>
                      <button className="rounded border border-[#f85149]/30 px-3 py-1 font-mono text-xs text-[#f85149] hover:bg-[#f85149]/10 transition">
                        Stop
                      </button>
                    </>
                  )}
                  {selected.status === "paused" && (
                    <button className="rounded border border-green/30 px-3 py-1 font-mono text-xs text-green hover:bg-green/10 transition">
                      Resume
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <div className="font-mono text-xs text-muted">Status</div>
                  <div className={`font-mono text-sm font-medium ${statusColor[selected.status]}`}>{selected.status}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-muted">Uptime</div>
                  <div className="font-mono text-sm">{selected.uptime}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-muted">Policy</div>
                  <div className="font-mono text-sm">{selected.policy}</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-muted">ID</div>
                  <div className="font-mono text-sm">{selected.id}</div>
                </div>
              </div>

              {/* Resource bars */}
              {selected.status === "running" && (
                <div className="mt-6 space-y-3">
                  <div>
                    <div className="mb-1 flex justify-between font-mono text-xs text-muted">
                      <span>CPU</span>
                      <span>{selected.cpu} / {selected.cpuLimit} cores</span>
                    </div>
                    <div className="h-2 rounded-full bg-border">
                      <div
                        className="h-2 rounded-full bg-blue"
                        style={{ width: `${(selected.cpu / selected.cpuLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between font-mono text-xs text-muted">
                      <span>Memory</span>
                      <span>{selected.memory} / {selected.memoryLimit} MB</span>
                    </div>
                    <div className="h-2 rounded-full bg-border">
                      <div
                        className="h-2 rounded-full bg-green"
                        style={{ width: `${(selected.memory / selected.memoryLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded border border-border bg-background p-3">
                  <div className="font-mono text-xs text-muted">Tokens Used</div>
                  <div className="font-mono text-lg font-bold">{formatNum(selected.tokens)}</div>
                </div>
                <div className="rounded border border-border bg-background p-3">
                  <div className="font-mono text-xs text-muted">API Calls</div>
                  <div className="font-mono text-lg font-bold">{formatNum(selected.apiCalls)}</div>
                </div>
              </div>
            </div>

            {/* Logs */}
            <div className="rounded-lg border border-border bg-surface">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h3 className="font-mono text-sm font-semibold">Live Logs</h3>
                <span className="flex items-center gap-1.5 font-mono text-xs text-green">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green" />
                  streaming
                </span>
              </div>
              <pre className="max-h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
                {mockLogs.map((log, i) => (
                  <div key={i}>
                    <span className="text-muted">[{log.time}]</span>{" "}
                    <span
                      className={
                        log.level === "warn"
                          ? "text-yellow-400"
                          : log.level === "debug"
                          ? "text-muted"
                          : "text-foreground"
                      }
                    >
                      {log.msg}
                    </span>
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
