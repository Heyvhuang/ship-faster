import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Docs — Radar",
  description: "API reference for the Radar Research Agent Eval Runner.",
};

const endpoints = [
  {
    method: "POST",
    path: "/api/v1/eval",
    desc: "Start a new evaluation",
    body: `{
  "agent_url": "https://your-agent.com/run",
  "benchmark": "rgym-001",
  "tasks": "all",          // or [1, 3, 5]
  "timeout_seconds": 300,  // optional, default 300
  "webhook_url": "..."     // optional, notify on completion
}`,
    response: `{
  "eval_id": "eval_7xk9m2",
  "status": "queued",
  "benchmark": "rgym-001",
  "tasks_count": 12,
  "eta_seconds": 120,
  "created_at": "2024-12-15T10:30:00Z"
}`,
  },
  {
    method: "GET",
    path: "/api/v1/eval/:eval_id",
    desc: "Get evaluation status and results",
    body: null,
    response: `{
  "eval_id": "eval_7xk9m2",
  "status": "completed",
  "benchmark": "rgym-001",
  "score": 0.847,
  "passed": 10,
  "failed": 2,
  "tasks": [
    {
      "task_id": 1,
      "passed": true,
      "score": 0.92,
      "reasoning_trace": "Agent correctly identified..."
    }
  ],
  "duration_seconds": 134,
  "created_at": "2024-12-15T10:30:00Z",
  "completed_at": "2024-12-15T10:32:14Z"
}`,
  },
  {
    method: "GET",
    path: "/api/v1/eval",
    desc: "List all evaluations",
    body: null,
    response: `{
  "evals": [...],
  "total": 47,
  "page": 1,
  "per_page": 20
}`,
  },
  {
    method: "GET",
    path: "/api/v1/benchmarks",
    desc: "List available benchmarks",
    body: null,
    response: `{
  "benchmarks": [
    {
      "id": "rgym-001",
      "name": "Literature Survey Synthesis",
      "paper": "ResearchGym (2024)",
      "tasks_count": 12,
      "difficulty": "hard"
    }
  ]
}`,
  },
];

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "text-blue-400 bg-blue-400/10",
    POST: "text-neon bg-neon/10",
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded ${colors[method]}`}>
      {method}
    </span>
  );
}

export default function Docs() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-neon font-bold text-lg tracking-tight">
          ◈ radar
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted">
          <Link
            href="/dashboard"
            className="hover:text-foreground transition"
          >
            Dashboard
          </Link>
          <span className="text-foreground">API Docs</span>
        </div>
      </nav>

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">API Reference</h1>
        <p className="text-muted text-sm mb-10">
          Base URL:{" "}
          <code className="text-neon bg-surface px-2 py-0.5 rounded">
            https://radar.dev/api/v1
          </code>
        </p>

        {/* Auth */}
        <div className="bg-surface border border-border rounded-lg p-5 mb-10">
          <h2 className="font-bold mb-2">Authentication</h2>
          <p className="text-sm text-muted mb-3">
            Include your API key in the Authorization header:
          </p>
          <pre className="text-xs text-green-400 bg-black rounded p-3 overflow-x-auto">
            <code>Authorization: Bearer rdr_sk_live_your_key_here</code>
          </pre>
        </div>

        {/* Rate limits */}
        <div className="bg-surface border border-border rounded-lg p-5 mb-10">
          <h2 className="font-bold mb-2">Rate Limits</h2>
          <div className="text-sm text-muted space-y-1">
            <p>
              <span className="text-foreground">Free tier:</span> 10
              evals/day, 2 concurrent
            </p>
            <p>
              <span className="text-foreground">Paid tier:</span> 100
              evals/day, 10 concurrent
            </p>
          </div>
        </div>

        {/* Endpoints */}
        <h2 className="text-xl font-bold mb-6">Endpoints</h2>
        <div className="space-y-8">
          {endpoints.map((ep) => (
            <div
              key={ep.method + ep.path}
              className="border border-border rounded-lg overflow-hidden"
            >
              <div className="bg-surface px-5 py-3 border-b border-border flex items-center gap-3">
                <MethodBadge method={ep.method} />
                <code className="text-sm">{ep.path}</code>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted mb-4">{ep.desc}</p>
                {ep.body && (
                  <div className="mb-4">
                    <div className="text-xs text-muted mb-2">Request Body</div>
                    <pre className="text-xs text-green-400/80 bg-black rounded p-3 overflow-x-auto">
                      <code>{ep.body}</code>
                    </pre>
                  </div>
                )}
                <div>
                  <div className="text-xs text-muted mb-2">Response</div>
                  <pre className="text-xs text-green-400/80 bg-black rounded p-3 overflow-x-auto">
                    <code>{ep.response}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Error codes */}
        <h2 className="text-xl font-bold mt-12 mb-6">Error Codes</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-xs text-muted border-b border-border">
                <th className="text-left px-4 py-3 font-medium">Code</th>
                <th className="text-left px-4 py-3 font-medium">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["400", "Invalid request body or parameters"],
                ["401", "Missing or invalid API key"],
                ["403", "Eval quota exceeded"],
                ["404", "Eval or benchmark not found"],
                ["408", "Agent timed out during evaluation"],
                ["429", "Rate limit exceeded"],
                ["500", "Internal server error"],
              ].map(([code, meaning]) => (
                <tr
                  key={code}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 font-mono text-red-400">{code}</td>
                  <td className="px-4 py-3 text-muted">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
