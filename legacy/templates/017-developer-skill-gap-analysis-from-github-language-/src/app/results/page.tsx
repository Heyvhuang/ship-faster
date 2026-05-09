import type { Metadata } from "next";
import Link from "next/link";
import { CommitGrid } from "@/components/CommitGrid";

export const metadata: Metadata = {
  title: "Analysis Results — DevGap",
  description: "Skill gap analysis results and hiring recommendations for your engineering team.",
};

const orgInfo = {
  name: "acme-corp",
  members: 12,
  repos: 23,
  commits: 2847,
  period: "Aug 2025 – Jan 2026",
};

const teamMembers = [
  { name: "Sarah Chen", role: "Staff Engineer", langs: ["TypeScript", "Go", "Python"], score: 92 },
  { name: "Marcus Johnson", role: "Senior Engineer", langs: ["TypeScript", "Python"], score: 78 },
  { name: "Priya Patel", role: "Senior Engineer", langs: ["Python", "TypeScript", "Rust"], score: 85 },
  { name: "Alex Kim", role: "Engineer", langs: ["TypeScript", "JavaScript"], score: 64 },
  { name: "Jordan Lee", role: "Engineer", langs: ["Python", "Shell"], score: 58 },
  { name: "Taylor Wright", role: "Junior Engineer", langs: ["JavaScript", "TypeScript"], score: 52 },
];

const langBreakdown = [
  { lang: "TypeScript", team: 42, market: 68, color: "bg-blue-500" },
  { lang: "Python", team: 28, market: 72, color: "bg-yellow-500" },
  { lang: "JavaScript", team: 15, market: 55, color: "bg-amber-500" },
  { lang: "Go", team: 8, market: 45, color: "bg-cyan-500" },
  { lang: "Rust", team: 2, market: 34, color: "bg-orange-500" },
  { lang: "Kotlin", team: 0, market: 28, color: "bg-purple-500" },
  { lang: "Shell", team: 4, market: 18, color: "bg-gray-500" },
];

const recommendations = [
  {
    priority: "High",
    color: "text-red-400 bg-red-950 border-red-800",
    action: "Hire 1-2 Rust engineers",
    reason: "60% of similar startups have adopted Rust for performance-critical services. Your team has near-zero Rust experience.",
  },
  {
    priority: "High",
    color: "text-red-400 bg-red-950 border-red-800",
    action: "Hire 1 Go engineer or upskill existing team",
    reason: "Go adoption is at 45% among peers. Your 8% usage indicates early adoption but not enough depth for infrastructure work.",
  },
  {
    priority: "Medium",
    color: "text-yellow-400 bg-yellow-950 border-yellow-800",
    action: "Invest in Kotlin training for mobile",
    reason: "28% of similar companies use Kotlin. If mobile is on your roadmap, this gap will be critical within 6 months.",
  },
  {
    priority: "Low",
    color: "text-green-400 bg-green-950 border-green-800",
    action: "Deepen Python ML/AI capabilities",
    reason: "Strong Python foundation but limited to web/scripting. Consider ML training to stay competitive.",
  },
];

const monthlyTrends = [
  { month: "Aug", ts: 45, py: 25, go: 5, rust: 1 },
  { month: "Sep", ts: 44, py: 26, go: 6, rust: 1 },
  { month: "Oct", ts: 43, py: 27, go: 7, rust: 2 },
  { month: "Nov", ts: 42, py: 28, go: 7, rust: 2 },
  { month: "Dec", ts: 40, py: 29, go: 8, rust: 2 },
  { month: "Jan", ts: 42, py: 28, go: 8, rust: 2 },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400";
  return <span className={`font-mono font-bold ${color}`}>{score}</span>;
}

export default function ResultsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-lg">
              🏢
            </div>
            <div>
              <h1 className="text-2xl font-bold">{orgInfo.name}</h1>
              <p className="text-sm text-gray-400">
                {orgInfo.members} members · {orgInfo.repos} repos · {orgInfo.commits} commits · {orgInfo.period}
              </p>
            </div>
          </div>
        </div>
        <Link
          href="/pricing"
          className="rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-500"
        >
          Upgrade for Monthly Reports
        </Link>
      </div>

      {/* Overview cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        {[
          { label: "Overall Score", value: "68/100", sub: "Moderate gaps detected" },
          { label: "Critical Gaps", value: "2", sub: "Rust, Go" },
          { label: "Emerging Gaps", value: "1", sub: "Kotlin" },
          { label: "Strong Areas", value: "3", sub: "TS, Python, JS" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
            <p className="text-xs text-gray-500">{card.label}</p>
            <p className="mt-1 text-2xl font-bold">{card.value}</p>
            <p className="text-xs text-gray-500">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Language comparison */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 lg:col-span-2">
          <h2 className="mb-1 text-lg font-semibold">Team vs Market Comparison</h2>
          <p className="mb-4 text-xs text-gray-500">Your team usage vs adoption among similar-stage startups</p>
          <div className="space-y-4">
            {langBreakdown.map((l) => (
              <div key={l.lang}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{l.lang}</span>
                  <span className="text-xs text-gray-500">
                    Team {l.team}% · Market {l.market}%
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="h-3 flex-1 rounded-l bg-gray-800">
                    <div className="h-3 rounded-l bg-green-500" style={{ width: `${l.team}%` }} />
                  </div>
                  <div className="h-3 flex-1 rounded-r bg-gray-800">
                    <div className="h-3 rounded-r bg-blue-500/60" style={{ width: `${l.market}%` }} />
                  </div>
                </div>
                <div className="mt-0.5 flex justify-between text-[10px] text-gray-600">
                  <span>Your team</span>
                  <span>Market</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team members */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="mb-4 text-lg font-semibold">Team Skill Scores</h2>
          <div className="space-y-3">
            {teamMembers.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 p-3"
              >
                <div>
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.role}</p>
                  <div className="mt-1 flex gap-1">
                    {m.langs.map((l) => (
                      <span key={l} className="rounded bg-gray-800 px-1.5 py-0.5 text-[10px] text-gray-400">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
                <ScoreBadge score={m.score} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly trends */}
      <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-1 text-lg font-semibold">Commit Trends (6 Months)</h2>
        <p className="mb-4 text-xs text-gray-500">Percentage of commits by language over time</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-left text-xs text-gray-500">
                <th className="pb-2 pr-4">Month</th>
                <th className="pb-2 pr-4">TypeScript</th>
                <th className="pb-2 pr-4">Python</th>
                <th className="pb-2 pr-4">Go</th>
                <th className="pb-2">Rust</th>
              </tr>
            </thead>
            <tbody>
              {monthlyTrends.map((row) => (
                <tr key={row.month} className="border-b border-gray-800/50">
                  <td className="py-2 pr-4 font-medium">{row.month}</td>
                  <td className="py-2 pr-4 text-blue-400">{row.ts}%</td>
                  <td className="py-2 pr-4 text-yellow-400">{row.py}%</td>
                  <td className="py-2 pr-4 text-cyan-400">{row.go}%</td>
                  <td className="py-2 text-orange-400">{row.rust}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-1 text-lg font-semibold">Hiring & Training Recommendations</h2>
        <p className="mb-4 text-xs text-gray-500">Prioritized actions based on gap analysis</p>
        <div className="space-y-3">
          {recommendations.map((r) => (
            <div
              key={r.action}
              className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900 p-4 sm:flex-row sm:items-start sm:gap-4"
            >
              <span className={`inline-block self-start rounded-full border px-2.5 py-0.5 text-xs font-semibold ${r.color}`}>
                {r.priority}
              </span>
              <div>
                <p className="font-medium">{r.action}</p>
                <p className="mt-1 text-sm text-gray-400">{r.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity grid */}
      <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-4 text-lg font-semibold">Team Activity</h2>
        <CommitGrid />
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl border border-green-800 bg-green-950/30 p-8 text-center">
        <h3 className="text-xl font-bold">Get monthly updates as your team evolves</h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-gray-400">
          Track how your skill gaps change over time with automated monthly reports,
          individual team profiles, and real-time alerts when new gaps emerge.
        </p>
        <Link
          href="/pricing"
          className="mt-6 inline-block rounded-lg bg-green-600 px-8 py-3 text-sm font-semibold text-white hover:bg-green-500"
        >
          Start Team Plan — $299/month
        </Link>
      </div>
    </div>
  );
}
