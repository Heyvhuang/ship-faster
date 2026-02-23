import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Demo — DevGap Skill Gap Analysis",
  description:
    "See a sample skill gap analysis showing how DevGap compares your team against trending languages.",
};

const teamLangs = [
  { lang: "TypeScript", pct: 42 },
  { lang: "Python", pct: 28 },
  { lang: "JavaScript", pct: 15 },
  { lang: "Go", pct: 8 },
  { lang: "Shell", pct: 4 },
  { lang: "Rust", pct: 2 },
  { lang: "Java", pct: 1 },
];

const trendingLangs = [
  { lang: "TypeScript", adoption: 68, trend: "stable" },
  { lang: "Python", adoption: 72, trend: "up" },
  { lang: "Rust", adoption: 34, trend: "up" },
  { lang: "Go", adoption: 45, trend: "up" },
  { lang: "Kotlin", adoption: 28, trend: "up" },
  { lang: "Swift", adoption: 22, trend: "stable" },
  { lang: "Zig", adoption: 12, trend: "up" },
];

const gaps = [
  { skill: "Rust", status: "red" as const, note: "2% team usage vs 34% market adoption — critical gap" },
  { skill: "Go", status: "yellow" as const, note: "8% team usage vs 45% market adoption — emerging gap" },
  { skill: "Kotlin", status: "red" as const, note: "0% team usage vs 28% market adoption — no coverage" },
  { skill: "Python", status: "green" as const, note: "28% team usage vs 72% market — strong foundation" },
  { skill: "TypeScript", status: "green" as const, note: "42% team usage vs 68% market — well covered" },
];

const statusColors = {
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
};

const statusLabels = {
  red: "Gap",
  yellow: "Emerging",
  green: "Strong",
};

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-green-400">
          Sample Analysis
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">
          Skill Gap Report: <span className="text-green-400">Acme Corp</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-400">
          This sample report shows a typical analysis for a 12-person
          engineering team at a Series A startup.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Team language breakdown */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="mb-4 text-lg font-semibold">Team Language Usage</h2>
          <p className="mb-4 text-xs text-gray-500">Based on 6 months of commit history (2,847 commits)</p>
          <div className="space-y-3">
            {teamLangs.map((l) => (
              <div key={l.lang}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{l.lang}</span>
                  <span className="text-gray-400">{l.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-800">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${l.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending languages */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <h2 className="mb-4 text-lg font-semibold">Market Adoption Trends</h2>
          <p className="mb-4 text-xs text-gray-500">Adoption % among similar-stage startups (Series A, 10-50 eng)</p>
          <div className="space-y-3">
            {trendingLangs.map((l) => (
              <div key={l.lang}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>
                    {l.lang}{" "}
                    {l.trend === "up" && (
                      <span className="text-green-400">&#8593;</span>
                    )}
                  </span>
                  <span className="text-gray-400">{l.adoption}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-800">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${l.adoption}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gap analysis */}
      <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-4 text-lg font-semibold">Skill Gap Analysis</h2>
        <div className="space-y-3">
          {gaps.map((g) => (
            <div
              key={g.skill}
              className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900 p-4"
            >
              <div className="flex items-center gap-2 min-w-[100px]">
                <div className={`h-3 w-3 rounded-full ${statusColors[g.status]}`} />
                <span className="text-xs font-medium text-gray-400">
                  {statusLabels[g.status]}
                </span>
              </div>
              <div>
                <p className="font-medium">{g.skill}</p>
                <p className="text-sm text-gray-400">{g.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="mb-4 text-gray-400">
          Want to see this analysis for your team?
        </p>
        <Link
          href="/results"
          className="inline-block rounded-lg bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-500"
        >
          Analyze Your Team
        </Link>
      </div>
    </div>
  );
}
