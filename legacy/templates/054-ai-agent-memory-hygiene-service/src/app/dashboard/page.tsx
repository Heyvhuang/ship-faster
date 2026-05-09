"use client";

import Link from "next/link";
import { useState } from "react";

const agents = [
  { name: "Support Agent #1", framework: "LangChain", memory: "2.4 GB", pii: 342, score: 91, lastRun: "2h ago", status: "healthy" },
  { name: "Support Agent #2", framework: "LangChain", memory: "1.8 GB", pii: 189, score: 95, lastRun: "2h ago", status: "healthy" },
  { name: "Sales Agent #1", framework: "AutoGen", memory: "3.1 GB", pii: 567, score: 78, lastRun: "6h ago", status: "warning" },
  { name: "Onboarding Agent", framework: "Custom GPT", memory: "0.9 GB", pii: 45, score: 98, lastRun: "1h ago", status: "healthy" },
  { name: "HR Assistant", framework: "Semantic Kernel", memory: "1.2 GB", pii: 891, score: 62, lastRun: "24h ago", status: "critical" },
];

const recentActivity = [
  { time: "14:32", action: "PII scrubbed", detail: "127 records from Support Agent #1", type: "scrub" },
  { time: "14:28", action: "Scan completed", detail: "Sales Agent #1 — 23 new PII detected", type: "scan" },
  { time: "14:15", action: "GDPR request", detail: "Deletion request for user@example.com", type: "gdpr" },
  { time: "13:55", action: "Memory compressed", detail: "Onboarding Agent — 34% reduction", type: "compress" },
  { time: "13:40", action: "Rule updated", detail: "Custom SSN pattern added by admin", type: "config" },
  { time: "13:22", action: "Alert resolved", detail: "HR Assistant manual review complete", type: "alert" },
];

const piiBreakdown = [
  { type: "Email", count: 892, pct: 35 },
  { type: "Name", count: 634, pct: 25 },
  { type: "Phone", count: 508, pct: 20 },
  { type: "Address", count: 254, pct: 10 },
  { type: "SSN/ID", count: 127, pct: 5 },
  { type: "Other", count: 127, pct: 5 },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "agents" | "activity">("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="font-semibold text-foreground">MemoryGuard</span>
            </Link>
            <span className="text-muted text-sm">/</span>
            <span className="text-sm text-foreground font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
              A
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border">
          {(["overview", "agents", "activity"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Hygiene Score", value: "87/100", sub: "+3 this week", color: "text-accent" },
                { label: "Total PII Detected", value: "2,542", sub: "Last 30 days", color: "text-amber-500" },
                { label: "Auto-Scrubbed", value: "2,419", sub: "95.2% auto-resolved", color: "text-primary" },
                { label: "Memory Saved", value: "4.2 GB", sub: "43% avg reduction", color: "text-accent" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl border border-border p-5">
                  <div className="text-xs text-muted font-medium mb-1">{s.label}</div>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted mt-1">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* PII Breakdown */}
              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">PII Breakdown</h3>
                <div className="space-y-3">
                  {piiBreakdown.map((item) => (
                    <div key={item.type}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-foreground">{item.type}</span>
                        <span className="text-muted">{item.count}</span>
                      </div>
                      <div className="h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-xs text-muted font-mono w-12 shrink-0 pt-0.5">{item.time}</span>
                      <div>
                        <span className="font-medium text-foreground">{item.action}</span>
                        <span className="text-muted ml-1">— {item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "agents" && (
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left px-5 py-3 font-medium text-muted">Agent</th>
                    <th className="text-left px-5 py-3 font-medium text-muted">Framework</th>
                    <th className="text-left px-5 py-3 font-medium text-muted">Memory</th>
                    <th className="text-left px-5 py-3 font-medium text-muted">PII Found</th>
                    <th className="text-left px-5 py-3 font-medium text-muted">Score</th>
                    <th className="text-left px-5 py-3 font-medium text-muted">Last Run</th>
                    <th className="text-left px-5 py-3 font-medium text-muted">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((a) => (
                    <tr key={a.name} className="border-b border-border last:border-0 hover:bg-card-hover transition-colors">
                      <td className="px-5 py-4 font-medium text-foreground">{a.name}</td>
                      <td className="px-5 py-4 text-muted">{a.framework}</td>
                      <td className="px-5 py-4 text-muted font-mono">{a.memory}</td>
                      <td className="px-5 py-4 text-muted">{a.pii}</td>
                      <td className="px-5 py-4">
                        <span className={`font-semibold ${a.score >= 90 ? "text-accent" : a.score >= 70 ? "text-amber-500" : "text-red-500"}`}>
                          {a.score}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-muted">{a.lastRun}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                          a.status === "healthy" ? "bg-accent/10 text-accent" :
                          a.status === "warning" ? "bg-amber-100 text-amber-600" :
                          "bg-red-100 text-red-600"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            a.status === "healthy" ? "bg-accent" :
                            a.status === "warning" ? "bg-amber-500" :
                            "bg-red-500"
                          }`} />
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Full Activity Log</h3>
            <div className="space-y-4">
              {[...recentActivity, ...recentActivity].map((item, i) => (
                <div key={i} className="flex items-start gap-4 text-sm py-3 border-b border-border last:border-0">
                  <span className="text-xs text-muted font-mono w-12 shrink-0 pt-0.5">{item.time}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 ${
                    item.type === "scrub" ? "bg-accent/10 text-accent" :
                    item.type === "scan" ? "bg-primary/10 text-primary" :
                    item.type === "gdpr" ? "bg-purple-100 text-purple-600" :
                    item.type === "compress" ? "bg-blue-100 text-blue-600" :
                    item.type === "config" ? "bg-gray-100 text-gray-600" :
                    "bg-amber-100 text-amber-600"
                  }`}>
                    {item.type}
                  </span>
                  <div>
                    <span className="font-medium text-foreground">{item.action}</span>
                    <span className="text-muted ml-1">— {item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
