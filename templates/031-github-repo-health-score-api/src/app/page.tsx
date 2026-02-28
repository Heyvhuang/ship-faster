"use client";

import { useState } from "react";

const MOCK_SCORES: Record<
  string,
  {
    score: number;
    grade: string;
    activity: number;
    maintenance: number;
    security: number;
    community: number;
    details: {
      commitsLast30: number;
      contributors: number;
      issueResponseHrs: number;
      lastRelease: string;
      prMergeRate: number;
      depUpdateFreq: string;
      vulnerabilities: number;
      archived: boolean;
      stars: number;
      openIssues: number;
      forks: number;
      license: string;
    };
  }
> = {
  "facebook/react": {
    score: 92,
    grade: "A",
    activity: 95,
    maintenance: 90,
    security: 88,
    community: 96,
    details: {
      commitsLast30: 147,
      contributors: 1672,
      issueResponseHrs: 4,
      lastRelease: "2 days ago",
      prMergeRate: 87,
      depUpdateFreq: "Weekly",
      vulnerabilities: 0,
      archived: false,
      stars: 225000,
      openIssues: 842,
      forks: 46100,
      license: "MIT",
    },
  },
  "vercel/next.js": {
    score: 88,
    grade: "B+",
    activity: 92,
    maintenance: 85,
    security: 86,
    community: 90,
    details: {
      commitsLast30: 203,
      contributors: 3104,
      issueResponseHrs: 8,
      lastRelease: "5 days ago",
      prMergeRate: 78,
      depUpdateFreq: "Weekly",
      vulnerabilities: 1,
      archived: false,
      stars: 127000,
      openIssues: 2841,
      forks: 27000,
      license: "MIT",
    },
  },
  "expressjs/express": {
    score: 61,
    grade: "C",
    activity: 42,
    maintenance: 58,
    security: 75,
    community: 70,
    details: {
      commitsLast30: 8,
      contributors: 294,
      issueResponseHrs: 72,
      lastRelease: "3 months ago",
      prMergeRate: 45,
      depUpdateFreq: "Quarterly",
      vulnerabilities: 2,
      archived: false,
      stars: 65400,
      openIssues: 178,
      forks: 15800,
      license: "MIT",
    },
  },
  "lodash/lodash": {
    score: 38,
    grade: "D",
    activity: 12,
    maintenance: 25,
    security: 68,
    community: 48,
    details: {
      commitsLast30: 0,
      contributors: 338,
      issueResponseHrs: 720,
      lastRelease: "2 years ago",
      prMergeRate: 12,
      depUpdateFreq: "None",
      vulnerabilities: 3,
      archived: false,
      stars: 59700,
      openIssues: 421,
      forks: 7000,
      license: "MIT",
    },
  },
};

function getScoreColor(score: number) {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
}

function getScoreBg(score: number) {
  if (score >= 80) return "bg-green-500/10 border-green-500/20";
  if (score >= 60) return "bg-yellow-500/10 border-yellow-500/20";
  return "bg-red-500/10 border-red-500/20";
}

function getGradeColor(grade: string) {
  if (grade.startsWith("A")) return "text-green-500";
  if (grade.startsWith("B")) return "text-yellow-500";
  if (grade.startsWith("C")) return "text-yellow-500";
  return "text-red-500";
}

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color =
    score >= 80 ? "#22c55e" : score >= 60 ? "#eab308" : "#ef4444";

  return (
    <svg width={size} height={size} className="drop-shadow-lg">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#27272a"
        strokeWidth="8"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all duration-1000 ease-out"
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-foreground font-mono text-3xl font-bold"
        fontSize={size * 0.28}
      >
        {score}
      </text>
    </svg>
  );
}

function BreakdownCard({
  label,
  score,
  icon,
  items,
}: {
  label: string;
  score: number;
  icon: string;
  items: { label: string; value: string }[];
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${getScoreBg(score)} transition-all hover:scale-[1.02]`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-medium text-zinc-400">{label}</span>
        </div>
        <span className={`font-mono text-xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-zinc-500">{item.label}</span>
            <span className="font-mono text-zinc-300">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const POPULAR_REPOS = [
  "facebook/react",
  "vercel/next.js",
  "expressjs/express",
  "lodash/lodash",
];

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<(typeof MOCK_SCORES)[string] | null>(
    null
  );
  const [repoName, setRepoName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  function parseRepo(raw: string): string {
    const s = raw.trim().replace(/\/$/, "");
    const gh = s.replace(/^https?:\/\/(www\.)?github\.com\//, "");
    return gh;
  }

  function handleScore(repo?: string) {
    const key = parseRepo(repo ?? input);
    setLoading(true);
    setRepoName(key);
    setTimeout(() => {
      setResult(
        MOCK_SCORES[key] ?? {
          score: 74,
          grade: "B",
          activity: 70,
          maintenance: 78,
          security: 80,
          community: 68,
          details: {
            commitsLast30: 34,
            contributors: 56,
            issueResponseHrs: 18,
            lastRelease: "3 weeks ago",
            prMergeRate: 72,
            depUpdateFreq: "Monthly",
            vulnerabilities: 0,
            archived: false,
            stars: 4200,
            openIssues: 31,
            forks: 890,
            license: "MIT",
          },
        }
      );
      setLoading(false);
    }, 800);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* Nav */}
      <nav className="border-b border-zinc-800/50 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm font-mono">
              RS
            </div>
            <span className="font-semibold text-lg">RepoScore</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="/docs" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              API Docs
            </a>
            <a href="/pricing" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              Pricing
            </a>
            <button
              onClick={() => setShowApiKey(true)}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 transition-colors"
            >
              Get API Key
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs text-zinc-400">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Now scoring 2M+ repositories
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
            How healthy is your{" "}
            <span className="text-emerald-400">dependency?</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-400">
            Get a 0-100 health score for any GitHub repo. Check maintenance,
            security, and activity before you <code className="font-mono text-emerald-400/80 text-base">npm install</code>.
          </p>
          <div className="mx-auto flex max-w-xl gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScore()}
              placeholder="github.com/user/repo"
              className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3.5 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all"
            />
            <button
              onClick={() => handleScore()}
              disabled={loading}
              className="rounded-xl bg-emerald-500 px-7 py-3.5 font-medium text-black hover:bg-emerald-400 disabled:opacity-50 transition-colors whitespace-nowrap"
            >
              {loading ? "Scoring…" : "Get Score"}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-zinc-600">
            <span>Try:</span>
            {POPULAR_REPOS.map((r) => (
              <button
                key={r}
                onClick={() => {
                  setInput(r);
                  handleScore(r);
                }}
                className="font-mono text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="px-6 pb-16 animate-in fade-in">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
              <ScoreRing score={result.score} />
              <div className="text-center sm:text-left">
                <h2 className="font-mono text-xl text-zinc-300">{repoName}</h2>
                <div className="mt-1 flex items-center gap-3">
                  <span
                    className={`text-4xl font-bold ${getGradeColor(result.grade)}`}
                  >
                    Grade {result.grade}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-500 font-mono">
                  <span>★ {result.details.stars.toLocaleString()}</span>
                  <span>{result.details.forks.toLocaleString()} forks</span>
                  <span>{result.details.license}</span>
                  {result.details.archived && (
                    <span className="text-red-500">ARCHIVED</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <BreakdownCard
                label="Activity"
                score={result.activity}
                icon="⚡"
                items={[
                  {
                    label: "Commits (30d)",
                    value: String(result.details.commitsLast30),
                  },
                  {
                    label: "Contributors",
                    value: String(result.details.contributors),
                  },
                  {
                    label: "Issue response",
                    value: `${result.details.issueResponseHrs}h avg`,
                  },
                ]}
              />
              <BreakdownCard
                label="Maintenance"
                score={result.maintenance}
                icon="🔧"
                items={[
                  { label: "Last release", value: result.details.lastRelease },
                  {
                    label: "PR merge rate",
                    value: `${result.details.prMergeRate}%`,
                  },
                  {
                    label: "Dep updates",
                    value: result.details.depUpdateFreq,
                  },
                ]}
              />
              <BreakdownCard
                label="Security"
                score={result.security}
                icon="🛡️"
                items={[
                  {
                    label: "Vulnerabilities",
                    value: String(result.details.vulnerabilities),
                  },
                  {
                    label: "Archived",
                    value: result.details.archived ? "Yes" : "No",
                  },
                  {
                    label: "Open issues",
                    value: String(result.details.openIssues),
                  },
                ]}
              />
              <BreakdownCard
                label="Community"
                score={result.community}
                icon="👥"
                items={[
                  {
                    label: "Stars",
                    value: result.details.stars.toLocaleString(),
                  },
                  {
                    label: "Forks",
                    value: result.details.forks.toLocaleString(),
                  },
                  { label: "License", value: result.details.license },
                ]}
              />
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setShowApiKey(true)}
                className="rounded-xl bg-zinc-800 border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
              >
                Get API Key for programmatic access →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      {!result && (
        <section className="px-6 py-16 border-t border-zinc-800/50">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-center text-2xl font-bold">
              One API call. One score.
            </h2>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 font-mono text-sm">
              <div className="text-zinc-500 mb-2">$ curl request</div>
              <pre className="text-emerald-400 overflow-x-auto">
{`GET /api/v1/score/facebook/react

{
  "score": 92,
  "grade": "A",
  "breakdown": {
    "activity": 95,
    "maintenance": 90,
    "security": 88,
    "community": 96
  }
}`}
              </pre>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-xl">
                  ⚡
                </div>
                <h3 className="mb-2 font-semibold">Fast</h3>
                <p className="text-sm text-zinc-500">
                  Scores computed in under 2 seconds. No waiting for complex
                  analysis.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-xl">
                  🔌
                </div>
                <h3 className="mb-2 font-semibold">Simple API</h3>
                <p className="text-sm text-zinc-500">
                  One endpoint, one score. Integrate into CI/CD, scripts, or
                  dashboards.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-xl">
                  📊
                </div>
                <h3 className="mb-2 font-semibold">Comprehensive</h3>
                <p className="text-sm text-zinc-500">
                  Activity, maintenance, security, and community — all in one
                  number.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section className="px-6 py-16 border-t border-zinc-800/50" id="pricing">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-2xl font-bold">Pricing</h2>
          <p className="mb-10 text-center text-zinc-500">
            Start free. Scale when you need to.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                name: "Free",
                price: "$0",
                period: "/month",
                checks: "100 checks/mo",
                features: [
                  "Single repo scoring",
                  "Full breakdown",
                  "Community support",
                ],
                cta: "Get Started",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$29",
                period: "/month",
                checks: "1,000 checks/mo",
                features: [
                  "Batch endpoint",
                  "Webhook integration",
                  "Priority support",
                  "Score history",
                ],
                cta: "Start Pro Trial",
                highlight: true,
              },
              {
                name: "Team",
                price: "$99",
                period: "/month",
                checks: "Unlimited checks",
                features: [
                  "Everything in Pro",
                  "CI/CD webhook",
                  "Bulk reports",
                  "SLA guarantee",
                  "Dedicated support",
                ],
                cta: "Contact Sales",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 ${
                  plan.highlight
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-zinc-800 bg-zinc-900/30"
                }`}
              >
                {plan.highlight && (
                  <div className="mb-4 text-xs font-medium text-emerald-400">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-2 mb-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-zinc-500">{plan.period}</span>
                </div>
                <p className="mb-6 text-sm text-zinc-500">{plan.checks}</p>
                <ul className="mb-6 space-y-2 text-sm text-zinc-400">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowApiKey(true)}
                  className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
                    plan.highlight
                      ? "bg-emerald-500 text-black hover:bg-emerald-400"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] font-mono">
              RS
            </div>
            <span>RepoScore</span>
            <span className="text-zinc-700">·</span>
            <span>© 2025</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="/docs" className="hover:text-zinc-300 transition-colors">
              API Docs
            </a>
            <a href="/pricing" className="hover:text-zinc-300 transition-colors">
              Pricing
            </a>
            <a
              href="https://github.com/reposcore"
              className="hover:text-zinc-300 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      {showApiKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h3 className="mb-2 text-xl font-bold">Your API Key</h3>
            <p className="mb-6 text-sm text-zinc-500">
              Use this key to authenticate API requests. Keep it secret.
            </p>
            <div className="mb-6 rounded-lg bg-zinc-950 border border-zinc-800 p-4 font-mono text-sm text-emerald-400 break-all">
              rs_live_k8x2mP9qR4wN7vJ3tL6yH1bF0dA5sG
            </div>
            <div className="rounded-lg bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs text-zinc-400 mb-6 overflow-x-auto">
              <pre>{`curl -H "Authorization: Bearer rs_live_k8x..." \\
  https://api.reposcore.dev/v1/score/facebook/react`}</pre>
            </div>
            <button
              onClick={() => setShowApiKey(false)}
              className="w-full rounded-lg bg-zinc-800 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
