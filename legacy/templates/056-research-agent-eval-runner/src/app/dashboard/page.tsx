import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Radar",
  description: "View your evaluation history and API usage.",
};

const apiKey = "sk_live_REDACTED_PUBLIC_EXAMPLE";

const evals = [
  {
    id: "eval_7xk9m2",
    benchmark: "rgym-001",
    benchmarkName: "Literature Survey Synthesis",
    status: "completed",
    score: 0.847,
    passed: 10,
    failed: 2,
    created: "2024-12-15T10:30:00Z",
    duration: "2m 14s",
  },
  {
    id: "eval_3bR5nT",
    benchmark: "rgym-003",
    benchmarkName: "Result Interpretation",
    status: "completed",
    score: 0.933,
    passed: 14,
    failed: 1,
    created: "2024-12-15T09:12:00Z",
    duration: "1m 48s",
  },
  {
    id: "eval_9pL2mK",
    benchmark: "rgym-002",
    benchmarkName: "Experiment Design",
    status: "completed",
    score: 0.625,
    passed: 5,
    failed: 3,
    created: "2024-12-14T16:45:00Z",
    duration: "3m 02s",
  },
  {
    id: "eval_1qW8jF",
    benchmark: "rgym-004",
    benchmarkName: "Code-to-Paper Alignment",
    status: "running",
    score: null,
    passed: null,
    failed: null,
    created: "2024-12-15T11:02:00Z",
    duration: null,
  },
  {
    id: "eval_5tY3vH",
    benchmark: "rgym-005",
    benchmarkName: "Novelty Detection",
    status: "failed",
    score: null,
    passed: 0,
    failed: 6,
    created: "2024-12-13T08:20:00Z",
    duration: "0m 32s",
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed: "text-neon bg-neon/10 border-neon/20",
    running: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    failed: "text-red-400 bg-red-400/10 border-red-400/20",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded border font-mono ${styles[status] || ""}`}
    >
      {status === "running" && "● "}
      {status}
    </span>
  );
}

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-neon font-bold text-lg tracking-tight">
          ◈ radar
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted">
          <Link href="/docs" className="hover:text-foreground transition">
            API Docs
          </Link>
          <span className="text-foreground">Dashboard</span>
        </div>
      </nav>

      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Evals", value: "47" },
            { label: "Avg Score", value: "0.802" },
            { label: "Credits Left", value: "453" },
            { label: "This Month", value: "12" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-surface border border-border rounded-lg p-4"
            >
              <div className="text-xs text-muted mb-1">{s.label}</div>
              <div className="text-2xl font-bold">{s.value}</div>
            </div>
          ))}
        </div>

        {/* API Key */}
        <div className="bg-surface border border-border rounded-lg p-4 mb-10">
          <div className="text-xs text-muted mb-2">Your API Key</div>
          <div className="flex items-center gap-3">
            <code className="text-sm text-neon bg-black px-3 py-1.5 rounded border border-border flex-1 overflow-x-auto">
              {apiKey}
            </code>
            <button className="text-xs text-muted border border-border px-3 py-1.5 rounded hover:text-foreground transition">
              Copy
            </button>
          </div>
        </div>

        {/* Evaluations */}
        <h2 className="text-lg font-bold mb-4">Recent Evaluations</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface text-xs text-muted border-b border-border">
                  <th className="text-left px-4 py-3 font-medium">Eval ID</th>
                  <th className="text-left px-4 py-3 font-medium">
                    Benchmark
                  </th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Score</th>
                  <th className="text-left px-4 py-3 font-medium">
                    Pass/Fail
                  </th>
                  <th className="text-left px-4 py-3 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody>
                {evals.map((e) => (
                  <tr
                    key={e.id}
                    className="border-b border-border hover:bg-surface-2 transition"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-neon">
                      {e.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs">{e.benchmarkName}</div>
                      <div className="text-xs text-muted">{e.benchmark}</div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={e.status} />
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {e.score !== null ? e.score.toFixed(3) : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {e.passed !== null ? (
                        <>
                          <span className="text-neon">{e.passed}✓</span>{" "}
                          <span className="text-red-400">{e.failed}✗</span>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {e.duration || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export */}
        <div className="mt-6 flex gap-3">
          <button className="text-xs border border-border px-4 py-2 rounded hover:border-neon/30 transition text-muted hover:text-foreground">
            Export JSON
          </button>
          <button className="text-xs border border-border px-4 py-2 rounded hover:border-neon/30 transition text-muted hover:text-foreground">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
