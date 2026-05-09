import type { Metadata } from "next";
import Link from "next/link";
import { dependencies, alerts, riskDotColors } from "@/lib/data";
import { RiskBadge, RiskScore } from "@/components/risk-badge";

export const metadata: Metadata = {
  title: "Dashboard — DepRadar",
  description: "Monitor your production dependencies and risk levels in real-time.",
};

export default function DashboardPage() {
  const critCount = dependencies.filter((d) => d.riskLevel === "critical").length;
  const highCount = dependencies.filter((d) => d.riskLevel === "high").length;
  const totalIssues = dependencies.reduce((sum, d) => sum + d.issues.length, 0);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Risk Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-400">Monitoring 8 dependencies across 4 categories</p>
          </div>
          <Link href="/onboarding" className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700 transition-colors">
            + Add Dependencies
          </Link>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { label: "Critical Risks", value: critCount, color: "text-red-500" },
            { label: "High Risks", value: highCount, color: "text-orange-500" },
            { label: "Active Issues", value: totalIssues, color: "text-yellow-500" },
            { label: "Dependencies", value: dependencies.length, color: "text-zinc-100" },
          ].map((c) => (
            <div key={c.label} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="text-sm text-zinc-400">{c.label}</div>
              <div className={`mt-1 text-2xl font-bold font-mono ${c.color}`}>{c.value}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Dependencies table */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-zinc-800 overflow-hidden">
              <div className="border-b border-zinc-800 bg-zinc-900/50 px-6 py-4">
                <h2 className="font-semibold">Monitored Dependencies</h2>
              </div>
              <div className="divide-y divide-zinc-800/50">
                {dependencies.map((dep) => (
                  <div key={dep.name} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`h-2 w-2 rounded-full shrink-0 ${riskDotColors[dep.riskLevel]}`} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="text-sm font-mono font-medium">{dep.name}</code>
                          <span className="text-xs text-zinc-500">v{dep.version}</span>
                          <RiskBadge level={dep.riskLevel} />
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5">{dep.category} · {dep.trendingMentions} trending mentions · Checked {dep.lastChecked}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <RiskScore score={dep.riskScore} />
                      {dep.issues.length > 0 && (
                        <span className="text-xs text-zinc-400">{dep.issues.length} issue{dep.issues.length > 1 ? "s" : ""}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent alerts */}
          <div>
            <div className="rounded-xl border border-zinc-800 overflow-hidden">
              <div className="border-b border-zinc-800 bg-zinc-900/50 px-6 py-4">
                <h2 className="font-semibold">Recent Alerts</h2>
              </div>
              <div className="divide-y divide-zinc-800/50">
                {alerts.map((alert) => (
                  <Link key={alert.id} href={`/alerts/${alert.id}`} className="block px-6 py-4 hover:bg-zinc-800/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <RiskBadge level={alert.severity} />
                      {alert.status === "new" && (
                        <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-medium text-blue-400">NEW</span>
                      )}
                    </div>
                    <h3 className="text-sm font-medium leading-snug">{alert.title}</h3>
                    <p className="mt-1 text-xs text-zinc-500">{alert.detectedAt} · {alert.trendingRepo}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Risk Timeline mini */}
            <div className="mt-4 rounded-xl border border-zinc-800 p-6">
              <h2 className="font-semibold mb-4">Risk Timeline (7d)</h2>
              <div className="flex items-end gap-1 h-24">
                {[18, 22, 35, 42, 38, 67, 92].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-sm ${v >= 80 ? "bg-red-500" : v >= 50 ? "bg-orange-500" : v >= 30 ? "bg-yellow-500" : "bg-emerald-500"}`}
                      style={{ height: `${v}%` }}
                    />
                    <span className="text-[10px] text-zinc-600">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
