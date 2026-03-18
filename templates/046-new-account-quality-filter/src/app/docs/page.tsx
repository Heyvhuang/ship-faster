import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "API Docs — Radar",
  description: "Integrate Radar's account quality scoring into your community platform.",
};

const endpoints = [
  {
    method: "POST",
    path: "/api/v1/score",
    desc: "Score a single account",
    body: `{
  "username": "new_user_123",
  "platform": "reddit",
  "account_age_days": 2,
  "karma": 5,
  "post_count": 1
}`,
    response: `{
  "username": "new_user_123",
  "score": 12,
  "status": "blocked",
  "reasons": [
    "Account age below threshold (2 days)",
    "Karma score critically low (5)"
  ],
  "checked_at": "2026-03-18T10:30:00Z"
}`,
  },
  {
    method: "GET",
    path: "/api/v1/score/:username",
    desc: "Get cached score for a username",
    body: null,
    response: `{
  "username": "community_vet",
  "score": 94,
  "status": "approved",
  "reasons": [],
  "cached": true,
  "checked_at": "2026-03-17T08:15:00Z"
}`,
  },
  {
    method: "POST",
    path: "/api/v1/webhook",
    desc: "Register a webhook for real-time filtering",
    body: `{
  "url": "https://your-app.com/webhook",
  "events": ["account.blocked", "account.approved"],
  "community_id": "comm_abc123"
}`,
    response: `{
  "id": "wh_xyz789",
  "url": "https://your-app.com/webhook",
  "events": ["account.blocked", "account.approved"],
  "active": true,
  "created_at": "2026-03-18T10:30:00Z"
}`,
  },
  {
    method: "GET",
    path: "/api/v1/blocklist",
    desc: "Get the shared blocklist of known bad actors",
    body: null,
    response: `{
  "count": 4823,
  "updated_at": "2026-03-18T00:00:00Z",
  "sample": [
    { "username": "spam_king_99", "added": "2026-03-15" },
    { "username": "bot_net_node", "added": "2026-03-14" }
  ]
}`,
  },
];

function MethodBadge({ method }: { method: string }) {
  const colors = method === "POST" ? "bg-blue-500/10 text-blue-400" : "bg-emerald-500/10 text-emerald-400";
  return <span className={`rounded px-2 py-0.5 text-xs font-mono font-medium ${colors}`}>{method}</span>;
}

export default function Docs() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-emerald-400">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500 text-xs text-black">R</span>
              RADAR
            </Link>
            <span className="text-xs text-zinc-500">API Documentation</span>
          </div>
          <Link href="/dashboard" className="rounded-md bg-emerald-600 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
            Dashboard
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold text-white">API Reference</h1>
        <p className="mt-3 text-zinc-400 max-w-2xl">
          Integrate Radar into your community platform with a simple REST API. All requests require an API key passed via the <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-emerald-400">Authorization</code> header.
        </p>

        {/* Quick start */}
        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <h2 className="text-lg font-semibold text-white">Quick Start</h2>
          <div className="mt-4 rounded-lg bg-zinc-950 p-4 overflow-x-auto">
            <pre className="text-sm text-zinc-300 font-mono leading-relaxed">{`curl -X POST https://api.radarfilter.io/v1/score \\
  -H "Authorization: Bearer rdr_live_sk_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{"username": "new_user", "platform": "reddit", "account_age_days": 2, "karma": 5}'`}</pre>
          </div>
        </div>

        {/* Auth */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-white">Authentication</h2>
          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
            Include your API key in the <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-emerald-400">Authorization</code> header as a Bearer token. Get your key from the <Link href="/dashboard" className="text-emerald-400 hover:underline">dashboard</Link>.
          </p>
          <div className="mt-4 rounded-lg bg-zinc-950 p-4">
            <pre className="text-sm text-zinc-300 font-mono">Authorization: Bearer rdr_live_sk_your_key_here</pre>
          </div>
        </div>

        {/* Endpoints */}
        <div className="mt-12 space-y-10">
          <h2 className="text-lg font-semibold text-white">Endpoints</h2>
          {endpoints.map((ep) => (
            <div key={ep.path} className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
              <div className="border-b border-zinc-800 px-6 py-4">
                <div className="flex items-center gap-3">
                  <MethodBadge method={ep.method} />
                  <code className="text-sm text-zinc-200 font-mono">{ep.path}</code>
                </div>
                <p className="mt-2 text-sm text-zinc-400">{ep.desc}</p>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                {ep.body && (
                  <div className="p-4">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Request Body</p>
                    <pre className="text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap">{ep.body}</pre>
                  </div>
                )}
                <div className={`p-4 ${!ep.body ? "md:col-span-2" : ""}`}>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Response</p>
                  <pre className="text-xs text-emerald-300/80 font-mono leading-relaxed whitespace-pre-wrap">{ep.response}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rate Limits */}
        <div className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <h2 className="text-lg font-semibold text-white">Rate Limits</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500 uppercase tracking-wider">
                  <th className="pb-3 pr-8 font-medium">Plan</th>
                  <th className="pb-3 pr-8 font-medium">Requests/min</th>
                  <th className="pb-3 font-medium">Monthly limit</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3 pr-8">Free</td>
                  <td className="py-3 pr-8 font-mono">60</td>
                  <td className="py-3 font-mono">500</td>
                </tr>
                <tr>
                  <td className="py-3 pr-8">Pro</td>
                  <td className="py-3 pr-8 font-mono">600</td>
                  <td className="py-3 font-mono">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
