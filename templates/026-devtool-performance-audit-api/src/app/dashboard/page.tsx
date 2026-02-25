"use client";

import type { Metadata } from "next";
import { useState } from "react";

const builds = [
  { id: "bld_9k3m", commit: "a1b2c3d", branch: "main", duration: "8m 47s", speedup: "39.4%", savings: "$1.84", status: "optimized", date: "2 hours ago" },
  { id: "bld_8j2l", commit: "e4f5g6h", branch: "feature/auth", duration: "12m 03s", speedup: "17.2%", savings: "$0.72", status: "optimized", date: "4 hours ago" },
  { id: "bld_7x2k", commit: "i7j8k9l", branch: "main", duration: "14m 32s", speedup: "—", savings: "—", status: "baseline", date: "6 hours ago" },
  { id: "bld_6w1j", commit: "m0n1o2p", branch: "fix/memory", duration: "9m 15s", speedup: "36.1%", savings: "$1.52", status: "optimized", date: "Yesterday" },
  { id: "bld_5v0i", commit: "q3r4s5t", branch: "main", duration: "10m 44s", speedup: "26.0%", savings: "$1.09", status: "regression", date: "Yesterday" },
];

const recommendations = [
  { severity: "high", task: "Ld MyApp", current: "P2", suggested: "E0", reason: "Linker is I/O bound, not compute bound. Moving to E-core frees P2 for Swift compilation." },
  { severity: "high", task: "CompileAssetCatalog", current: "P0", suggested: "E1", reason: "Asset catalog compilation is sequential and I/O heavy. E-core handles this efficiently." },
  { severity: "medium", task: "CopySwiftLibs", current: "P1", suggested: "E2", reason: "File copy operations don't benefit from P-core frequency. Use E-core to reduce P-core contention." },
  { severity: "medium", task: "CodeSign", current: "P3", suggested: "E0", reason: "Code signing is crypto-bound but single-threaded. E-core crypto units handle this without P-core waste." },
  { severity: "low", task: "ProcessInfoPlist", current: "P1", suggested: "E3", reason: "Trivial I/O operation currently occupying a P-core timeslice." },
];

const coreUtilization = [
  { core: "P0", current: 98, optimized: 72, type: "p" },
  { core: "P1", current: 95, optimized: 68, type: "p" },
  { core: "P2", current: 87, optimized: 65, type: "p" },
  { core: "P3", current: 91, optimized: 70, type: "p" },
  { core: "E0", current: 12, optimized: 89, type: "e" },
  { core: "E1", current: 8, optimized: 85, type: "e" },
  { core: "E2", current: 5, optimized: 78, type: "e" },
  { core: "E3", current: 3, optimized: 82, type: "e" },
];

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    high: "bg-red-500/20 text-red-400",
    medium: "bg-amber-500/20 text-amber-400",
    low: "bg-zinc-700 text-zinc-400",
  };
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-bold ${colors[severity]}`}>
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    optimized: "bg-green-500/20 text-green-400",
    baseline: "bg-zinc-700 text-zinc-400",
    regression: "bg-red-500/20 text-red-400",
  };
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const [tab, setTab] = useState<"overview" | "recommendations" | "history">("overview");

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black">Dashboard</h1>
            <p className="text-sm text-zinc-500">MyApp · Apple M4 Pro · 8P + 4E cores</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-xs text-zinc-500">Agent connected · Last build 2h ago</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Avg Build Time", value: "9m 12s", change: "-39%", positive: true },
            { label: "Monthly Savings", value: "$847", change: "+$320", positive: true },
            { label: "Builds Analyzed", value: "423", change: "+52", positive: true },
            { label: "Active Regressions", value: "1", change: "+1", positive: false },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
              <div className="text-xs text-zinc-500">{stat.label}</div>
              <div className="mt-1 text-2xl font-black">{stat.value}</div>
              <div className={`mt-1 text-xs font-medium ${stat.positive ? "text-green-400" : "text-red-400"}`}>
                {stat.change} this month
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 border-b border-zinc-800">
          {(["overview", "recommendations", "history"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`border-b-2 px-4 py-2 text-sm font-medium capitalize transition-colors ${
                tab === t ? "border-green-400 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {tab === "overview" && (
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Core Utilization */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="mb-4 text-sm font-semibold text-zinc-300">Core Utilization — Latest Build</h3>
                <div className="space-y-2">
                  {coreUtilization.map((core) => (
                    <div key={core.core} className="flex items-center gap-3 text-xs">
                      <span className="w-6 text-zinc-500">{core.core}</span>
                      <div className="h-4 flex-1 rounded-sm bg-zinc-800">
                        <div className="relative h-full">
                          <div
                            className={`absolute inset-y-0 left-0 rounded-sm ${core.type === "p" ? "bg-red-500/30" : "bg-green-500/30"}`}
                            style={{ width: `${core.current}%` }}
                          />
                          <div
                            className={`absolute inset-y-0 left-0 rounded-sm ${core.type === "p" ? "bg-blue-500/60" : "bg-green-500/60"}`}
                            style={{ width: `${core.optimized}%` }}
                          />
                        </div>
                      </div>
                      <span className="w-16 text-right text-zinc-600">{core.current}→{core.optimized}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-4 text-[10px] text-zinc-600">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-500/30" /> Current (P)</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-blue-500/60" /> Optimized</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-green-500/60" /> E-core target</span>
                </div>
              </div>

              {/* Build Timeline */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="mb-4 text-sm font-semibold text-zinc-300">Build Duration Trend</h3>
                <div className="flex h-40 items-end gap-2">
                  {[14.5, 13.2, 12.0, 10.7, 9.2, 9.1, 8.8].map((mins, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1">
                      <span className="text-[9px] text-zinc-600">{mins}m</span>
                      <div
                        className={`w-full rounded-t-sm ${i >= 4 ? "bg-green-500/60" : "bg-zinc-600"}`}
                        style={{ height: `${(mins / 15) * 100}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[9px] text-zinc-600">
                  <span>7 builds ago</span>
                  <span>Latest</span>
                </div>
              </div>
            </div>
          )}

          {tab === "recommendations" && (
            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div key={rec.task} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <SeverityBadge severity={rec.severity} />
                    <span className="font-semibold">{rec.task}</span>
                    <span className="text-xs text-zinc-600">
                      {rec.current} → {rec.suggested}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-500">{rec.reason}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "history" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500">
                    <th className="pb-2 pr-4">Build</th>
                    <th className="pb-2 pr-4">Branch</th>
                    <th className="pb-2 pr-4">Duration</th>
                    <th className="pb-2 pr-4">Speedup</th>
                    <th className="pb-2 pr-4">Savings</th>
                    <th className="pb-2 pr-4">Status</th>
                    <th className="pb-2">When</th>
                  </tr>
                </thead>
                <tbody>
                  {builds.map((build) => (
                    <tr key={build.id} className="border-b border-zinc-800/50">
                      <td className="py-3 pr-4">
                        <code className="text-green-400">{build.id}</code>
                        <span className="ml-2 text-xs text-zinc-600">{build.commit}</span>
                      </td>
                      <td className="py-3 pr-4 text-zinc-400">{build.branch}</td>
                      <td className="py-3 pr-4">{build.duration}</td>
                      <td className="py-3 pr-4 text-green-400">{build.speedup}</td>
                      <td className="py-3 pr-4 text-green-400">{build.savings}</td>
                      <td className="py-3 pr-4"><StatusBadge status={build.status} /></td>
                      <td className="py-3 text-zinc-500">{build.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
