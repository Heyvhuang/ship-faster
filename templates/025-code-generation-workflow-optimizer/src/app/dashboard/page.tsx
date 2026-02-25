"use client";
import Nav from "@/components/Nav";

const teamMembers = [
  { name: "Alex Kim", role: "Senior Developer", score: 89, prompts: 342, avgTime: "1.2m", trend: "+12%" },
  { name: "Jordan Lee", role: "Full Stack Dev", score: 76, prompts: 287, avgTime: "2.1m", trend: "+8%" },
  { name: "Sam Rivera", role: "Backend Developer", score: 71, prompts: 198, avgTime: "2.4m", trend: "+15%" },
  { name: "Taylor Brooks", role: "Junior Developer", score: 58, prompts: 412, avgTime: "3.8m", trend: "+22%" },
  { name: "Casey Nguyen", role: "DevOps Engineer", score: 82, prompts: 156, avgTime: "1.5m", trend: "+5%" },
  { name: "Morgan Davis", role: "Tech Lead", score: 91, prompts: 234, avgTime: "0.9m", trend: "+3%" },
];

const bottlenecks = [
  { label: "Vague context in Django model prompts", severity: "high", impact: "23 min/day wasted", count: 47 },
  { label: "Missing type hints in Flask route generation", severity: "medium", impact: "15 min/day wasted", count: 31 },
  { label: "Redundant prompt iterations for test writing", severity: "high", impact: "19 min/day wasted", count: 38 },
  { label: "Incomplete error handling specifications", severity: "low", impact: "8 min/day wasted", count: 22 },
];

const weeklyData = [
  { day: "Mon", prompts: 142, success: 78 },
  { day: "Tue", prompts: 168, success: 85 },
  { day: "Wed", prompts: 155, success: 91 },
  { day: "Thu", prompts: 189, success: 88 },
  { day: "Fri", prompts: 134, success: 82 },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "text-green bg-green/10" : score >= 65 ? "text-yellow bg-yellow/10" : "text-red bg-red/10";
  return <span className={`${color} text-xs font-bold px-2 py-0.5 rounded-full`}>{score}</span>;
}

function SeverityDot({ severity }: { severity: string }) {
  const color = severity === "high" ? "bg-red" : severity === "medium" ? "bg-yellow" : "bg-green";
  return <span className={`w-2 h-2 rounded-full ${color} inline-block`} />;
}

export default function Dashboard() {
  const maxPrompts = Math.max(...weeklyData.map((d) => d.prompts));

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Team Dashboard</h1>
            <p className="text-sm text-muted mt-1">Acme Python Team &middot; Last 14 days</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <span className="text-xs bg-card border border-card-border px-3 py-1.5 rounded-lg text-muted">
              Feb 11 – Feb 25, 2026
            </span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Team Efficiency Score", value: "74/100", change: "+11", color: "text-yellow" },
            { label: "Avg Generation Time", value: "1.9 min", change: "-0.8", color: "text-green" },
            { label: "Prompts This Period", value: "1,629", change: "+12%", color: "text-accent" },
            { label: "Success Rate", value: "84%", change: "+6%", color: "text-green" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-card border border-card-border rounded-xl p-5">
              <div className="text-xs text-muted mb-2">{kpi.label}</div>
              <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
              <div className="text-xs text-green mt-1">{kpi.change} vs prev period</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Activity Chart */}
          <div className="lg:col-span-2 bg-card border border-card-border rounded-xl p-6">
            <h2 className="font-semibold mb-4">Weekly Prompt Activity</h2>
            <div className="flex items-end gap-3 h-40">
              {weeklyData.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center gap-0.5" style={{ height: "120px" }}>
                    <div
                      className="w-full bg-accent/20 rounded-t"
                      style={{ height: `${(d.prompts / maxPrompts) * 100}%`, marginTop: "auto" }}
                    >
                      <div
                        className="w-full bg-accent rounded-t"
                        style={{ height: `${(d.success / d.prompts) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-muted">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-xs text-muted">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-accent inline-block" /> Successful</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-accent/20 inline-block" /> Total</span>
            </div>
          </div>

          {/* Score Distribution */}
          <div className="bg-card border border-card-border rounded-xl p-6">
            <h2 className="font-semibold mb-4">Score Distribution</h2>
            <div className="space-y-3">
              {[
                { range: "90-100", count: 1, pct: 17, color: "bg-green" },
                { range: "80-89", count: 2, pct: 33, color: "bg-green/70" },
                { range: "70-79", count: 2, pct: 33, color: "bg-yellow" },
                { range: "60-69", count: 0, pct: 0, color: "bg-yellow/70" },
                { range: "< 60", count: 1, pct: 17, color: "bg-red" },
              ].map((b) => (
                <div key={b.range} className="flex items-center gap-3">
                  <span className="text-xs text-muted w-12">{b.range}</span>
                  <div className="flex-1 h-4 bg-card-border rounded overflow-hidden">
                    <div className={`h-full ${b.color} rounded`} style={{ width: `${Math.max(b.pct, 2)}%` }} />
                  </div>
                  <span className="text-xs text-muted w-6 text-right">{b.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottlenecks */}
        <div className="bg-card border border-card-border rounded-xl p-6 mb-8">
          <h2 className="font-semibold mb-4">Identified Bottlenecks</h2>
          <div className="space-y-3">
            {bottlenecks.map((b) => (
              <div key={b.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2 border-b border-card-border last:border-0">
                <div className="flex items-center gap-2 flex-1">
                  <SeverityDot severity={b.severity} />
                  <span className="text-sm">{b.label}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span>{b.count} occurrences</span>
                  <span className="text-red font-medium">{b.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Team Members</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted border-b border-card-border">
                  <th className="pb-3 font-medium">Developer</th>
                  <th className="pb-3 font-medium">Score</th>
                  <th className="pb-3 font-medium hidden sm:table-cell">Prompts</th>
                  <th className="pb-3 font-medium hidden sm:table-cell">Avg Time</th>
                  <th className="pb-3 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((m) => (
                  <tr key={m.name} className="border-b border-card-border last:border-0">
                    <td className="py-3">
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-muted">{m.role}</div>
                    </td>
                    <td className="py-3"><ScoreBadge score={m.score} /></td>
                    <td className="py-3 text-muted hidden sm:table-cell">{m.prompts}</td>
                    <td className="py-3 text-muted hidden sm:table-cell">{m.avgTime}</td>
                    <td className="py-3 text-green text-xs font-medium">{m.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
