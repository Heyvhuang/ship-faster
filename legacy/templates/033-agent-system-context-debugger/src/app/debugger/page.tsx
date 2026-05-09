"use client";

import Link from "next/link";
import { useState } from "react";
import { sessions, systemPromptExample } from "@/lib/mock-data";
import type { Session } from "@/lib/mock-data";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </div>
      <span className="font-mono font-bold text-sm text-foreground">ContextLens</span>
    </Link>
  );
}

function StatusDot({ status }: { status: string }) {
  const color = status === "critical" ? "bg-red" : status === "warning" ? "bg-yellow" : "bg-green";
  return <span className={`w-2 h-2 rounded-full ${color} shrink-0`} />;
}

function TokenBar({ session }: { session: Session }) {
  const pct = Math.round((session.usedTokens / session.maxTokens) * 100);
  const color = pct > 75 ? "bg-red" : pct > 50 ? "bg-yellow" : "bg-green";
  return (
    <div>
      <div className="flex justify-between text-xs font-mono mb-1.5">
        <span className="text-muted">Token Usage</span>
        <span className={pct > 75 ? "text-red" : pct > 50 ? "text-yellow" : "text-green"}>
          {session.usedTokens.toLocaleString()} / {session.maxTokens.toLocaleString()} ({pct}%)
        </span>
      </div>
      <div className="h-3 bg-surface-2 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function SegmentVisualizer({ session }: { session: Session }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  return (
    <div>
      <h3 className="text-xs font-mono text-muted mb-3 uppercase tracking-wider">Context Segments</h3>
      <div className="flex gap-1 mb-4 h-14 items-end">
        {session.segments.map((seg) => {
          const pct = (seg.tokens / session.usedTokens) * 100;
          return (
            <div
              key={seg.id}
              className="relative group cursor-pointer transition-all rounded-sm"
              style={{
                width: `${Math.max(pct, 3)}%`,
                height: hoveredId === seg.id ? "100%" : "80%",
                backgroundColor: seg.color,
                opacity: hoveredId && hoveredId !== seg.id ? 0.4 : 0.85,
              }}
              onMouseEnter={() => setHoveredId(seg.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-2 border border-border rounded px-2 py-1 text-xs font-mono whitespace-nowrap z-20">
                {seg.label}: {seg.tokens.toLocaleString()} tokens
              </div>
            </div>
          );
        })}
      </div>
      <div className="space-y-2">
        {session.segments.map((seg) => {
          const pct = ((seg.tokens / session.usedTokens) * 100).toFixed(1);
          return (
            <div key={seg.id} className="flex items-center gap-3 text-sm group hover:bg-surface-2/50 rounded px-2 py-1.5 -mx-2">
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="text-foreground flex-1">{seg.label}</span>
              <span className="font-mono text-xs text-muted">{seg.tokens.toLocaleString()}</span>
              <span className="font-mono text-xs text-muted w-12 text-right">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AlertsPanel({ session }: { session: Session }) {
  return (
    <div>
      <h3 className="text-xs font-mono text-muted mb-3 uppercase tracking-wider">Alerts</h3>
      <div className="space-y-2">
        {session.alerts.map((alert) => {
          const border = alert.type === "critical" ? "border-red/30" : alert.type === "warning" ? "border-yellow/30" : "border-border";
          const icon = alert.type === "critical" ? "🔴" : alert.type === "warning" ? "🟡" : "🔵";
          return (
            <div key={alert.id} className={`border ${border} bg-surface-2/50 rounded-lg p-3`}>
              <div className="flex items-start gap-2">
                <span className="text-xs mt-0.5">{icon}</span>
                <div>
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <span className="text-xs font-mono text-muted">{alert.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PromptInspector() {
  const lines = systemPromptExample.split("\n");
  const charCount = systemPromptExample.length;
  const wordCount = systemPromptExample.split(/\s+/).length;
  const estimatedTokens = Math.round(wordCount * 1.3);

  return (
    <div>
      <h3 className="text-xs font-mono text-muted mb-3 uppercase tracking-wider">System Prompt Inspector</h3>
      <div className="flex gap-4 mb-3 text-xs font-mono">
        <span className="text-muted">{charCount} chars</span>
        <span className="text-muted">{wordCount} words</span>
        <span className="text-muted">~{estimatedTokens} tokens</span>
        <span className="text-muted">{lines.length} lines</span>
      </div>
      <div className="bg-surface-2 border border-border rounded-lg p-4 max-h-64 overflow-y-auto">
        <pre className="text-xs font-mono text-foreground whitespace-pre-wrap leading-relaxed">{systemPromptExample}</pre>
      </div>
    </div>
  );
}

export default function DebuggerPage() {
  const [selectedId, setSelectedId] = useState(sessions[0].id);
  const [showPrompt, setShowPrompt] = useState(false);
  const session = sessions.find((s) => s.id === selectedId)!;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top bar */}
      <div className="h-12 border-b border-border flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-xs text-muted font-mono hidden sm:inline">/ debugger</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-xs font-mono text-muted hover:text-foreground border border-border rounded px-2.5 py-1 transition-colors">
            Export JSON
          </button>
          <Link href="/" className="text-xs text-muted hover:text-foreground transition-colors">
            Home
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - session list */}
        <div className="w-64 border-r border-border overflow-y-auto shrink-0 hidden md:block">
          <div className="p-3">
            <h2 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Sessions</h2>
            <div className="space-y-1">
              {sessions.map((s) => {
                const pct = Math.round((s.usedTokens / s.maxTokens) * 100);
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedId(s.id)}
                    className={`w-full text-left rounded-lg p-3 transition-colors ${
                      selectedId === s.id ? "bg-surface-2 border border-border" : "hover:bg-surface-2/50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <StatusDot status={s.status} />
                      <span className="text-sm font-medium text-foreground truncate">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className="text-xs font-mono text-muted">{s.model}</span>
                      <span className="text-xs font-mono text-muted ml-auto">{pct}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center panel - visualizer */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Mobile session selector */}
          <div className="md:hidden mb-4">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground font-mono"
            >
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="max-w-3xl">
            {/* Session header */}
            <div className="flex items-center gap-3 mb-1">
              <StatusDot status={session.status} />
              <h1 className="text-xl font-bold text-foreground">{session.name}</h1>
              <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                session.status === "critical" ? "bg-red/10 text-red" : session.status === "warning" ? "bg-yellow/10 text-yellow" : "bg-green/10 text-green"
              }`}>{session.status}</span>
            </div>
            <div className="flex gap-4 text-xs font-mono text-muted mb-6">
              <span>{session.model}</span>
              <span>{session.timestamp}</span>
            </div>

            {/* Token bar */}
            <div className="mb-8">
              <TokenBar session={session} />
            </div>

            {/* Segment visualizer */}
            <div className="mb-8">
              <SegmentVisualizer session={session} />
            </div>

            {/* Tabs: Alerts / Prompt Inspector */}
            <div className="flex gap-4 border-b border-border mb-4">
              <button
                onClick={() => setShowPrompt(false)}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  !showPrompt ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                Alerts ({session.alerts.length})
              </button>
              <button
                onClick={() => setShowPrompt(true)}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  showPrompt ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                System Prompt
              </button>
            </div>

            {showPrompt ? <PromptInspector /> : <AlertsPanel session={session} />}
          </div>
        </div>

        {/* Right panel - token meter */}
        <div className="w-72 border-l border-border overflow-y-auto shrink-0 p-4 hidden lg:block">
          <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">Token Breakdown</h3>

          {/* Donut-style stats */}
          <div className="bg-surface-2 border border-border rounded-lg p-4 mb-4">
            <div className="text-center mb-3">
              <div className="text-3xl font-mono font-bold text-foreground">
                {Math.round((session.usedTokens / session.maxTokens) * 100)}%
              </div>
              <div className="text-xs text-muted">of {session.maxTokens.toLocaleString()} max</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-background rounded p-2">
                <div className="text-sm font-mono font-bold text-foreground">{session.usedTokens.toLocaleString()}</div>
                <div className="text-xs text-muted">Used</div>
              </div>
              <div className="bg-background rounded p-2">
                <div className="text-sm font-mono font-bold text-green">{(session.maxTokens - session.usedTokens).toLocaleString()}</div>
                <div className="text-xs text-muted">Available</div>
              </div>
            </div>
          </div>

          {/* Segment details */}
          <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Segments</h3>
          <div className="space-y-3">
            {session.segments.map((seg) => {
              const pct = ((seg.tokens / session.maxTokens) * 100).toFixed(1);
              return (
                <div key={seg.id} className="bg-surface-2 border border-border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: seg.color }} />
                    <span className="text-sm font-medium text-foreground">{seg.label}</span>
                  </div>
                  <p className="text-xs text-muted mb-2 ml-4.5">{seg.description}</p>
                  <div className="flex justify-between items-center ml-4.5">
                    <span className="text-xs font-mono text-muted">{seg.tokens.toLocaleString()} tokens</span>
                    <span className="text-xs font-mono text-muted">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
