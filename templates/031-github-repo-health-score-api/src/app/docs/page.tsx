import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Documentation — RepoScore",
  description:
    "Complete API reference for RepoScore. Score GitHub repositories on health, maintenance, security, and activity.",
};

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/score/:owner/:repo",
    description: "Get health score for a single repository",
    response: `{
  "score": 92,
  "grade": "A",
  "breakdown": {
    "activity": 95,
    "maintenance": 90,
    "security": 88,
    "community": 96
  },
  "details": {
    "commits_last_30d": 147,
    "contributors": 1672,
    "issue_response_hrs": 4,
    "last_release": "2025-01-15",
    "pr_merge_rate": 0.87,
    "vulnerabilities": 0,
    "archived": false,
    "stars": 225000,
    "license": "MIT"
  },
  "scored_at": "2025-01-20T12:00:00Z"
}`,
  },
  {
    method: "POST",
    path: "/api/v1/score/batch",
    description: "Score multiple repositories in one request (Pro+)",
    body: `{
  "repos": [
    "facebook/react",
    "vercel/next.js",
    "expressjs/express"
  ]
}`,
    response: `{
  "results": [
    { "repo": "facebook/react", "score": 92, "grade": "A" },
    { "repo": "vercel/next.js", "score": 88, "grade": "B+" },
    { "repo": "expressjs/express", "score": 61, "grade": "C" }
  ]
}`,
  },
  {
    method: "POST",
    path: "/api/v1/webhooks",
    description: "Register a webhook for CI/CD score checks (Team)",
    body: `{
  "url": "https://your-server.com/webhook",
  "repos": ["facebook/react"],
  "threshold": 70,
  "events": ["score_drop", "new_vulnerability"]
}`,
    response: `{
  "id": "wh_abc123",
  "status": "active",
  "created_at": "2025-01-20T12:00:00Z"
}`,
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <nav className="border-b border-zinc-800/50 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm font-mono">
              RS
            </div>
            <span className="font-semibold text-lg">RepoScore</span>
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a href="/docs" className="text-zinc-100 font-medium">
              API Docs
            </a>
            <a href="/pricing" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              Pricing
            </a>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="mb-2 text-4xl font-bold">API Reference</h1>
        <p className="mb-4 text-zinc-400">
          Base URL:{" "}
          <code className="font-mono text-emerald-400">
            https://api.reposcore.dev
          </code>
        </p>

        <div className="mb-12 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h2 className="mb-3 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
            Authentication
          </h2>
          <p className="mb-3 text-sm text-zinc-400">
            Include your API key in the Authorization header:
          </p>
          <pre className="rounded-lg bg-zinc-950 border border-zinc-800 p-4 font-mono text-sm text-emerald-400 overflow-x-auto">
            Authorization: Bearer rs_live_your_api_key
          </pre>
        </div>

        <div className="space-y-12">
          {ENDPOINTS.map((ep) => (
            <div key={ep.path}>
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`rounded px-2.5 py-1 font-mono text-xs font-bold ${
                    ep.method === "GET"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {ep.method}
                </span>
                <code className="font-mono text-sm text-zinc-300">
                  {ep.path}
                </code>
              </div>
              <p className="mb-4 text-sm text-zinc-500">{ep.description}</p>
              {"body" in ep && (
                <div className="mb-4">
                  <h4 className="mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Request Body
                  </h4>
                  <pre className="rounded-lg bg-zinc-950 border border-zinc-800 p-4 font-mono text-sm text-zinc-300 overflow-x-auto">
                    {ep.body}
                  </pre>
                </div>
              )}
              <div>
                <h4 className="mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Response
                </h4>
                <pre className="rounded-lg bg-zinc-950 border border-zinc-800 p-4 font-mono text-sm text-zinc-300 overflow-x-auto">
                  {ep.response}
                </pre>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="mb-3 text-lg font-semibold">Rate Limits</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Requests/month</th>
                  <th className="pb-3 font-medium">Batch size</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3">Free</td>
                  <td className="py-3 font-mono">100</td>
                  <td className="py-3 font-mono">—</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3">Pro</td>
                  <td className="py-3 font-mono">1,000</td>
                  <td className="py-3 font-mono">50</td>
                </tr>
                <tr>
                  <td className="py-3">Team</td>
                  <td className="py-3 font-mono">Unlimited</td>
                  <td className="py-3 font-mono">500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
