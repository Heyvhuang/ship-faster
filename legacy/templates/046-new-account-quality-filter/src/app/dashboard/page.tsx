import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard — Radar",
  description: "Monitor your community's account quality filtering in real-time.",
};

const stats = [
  { label: "Accounts Scanned", value: "12,847", change: "+342 today" },
  { label: "Blocked", value: "1,203", change: "9.4% rate" },
  { label: "Approved", value: "11,644", change: "90.6% rate" },
  { label: "Avg Score", value: "67.2", change: "+2.1 this week" },
];

const recentAccounts = [
  { id: 1, username: "throwaway_0318", platform: "Reddit", age: "0d", karma: 0, posts: 0, score: 4, status: "blocked" as const, reason: "New account, zero history" },
  { id: 2, username: "dev_sarah_k", platform: "Discord", age: "2y", karma: 3200, posts: 145, score: 91, status: "approved" as const, reason: "Established member" },
  { id: 3, username: "crypto_promo_12", platform: "Reddit", age: "1d", karma: 2, posts: 47, score: 8, status: "blocked" as const, reason: "Spam pattern detected" },
  { id: 4, username: "helpful_newbie", platform: "Custom", age: "7d", karma: 15, posts: 3, score: 52, status: "approved" as const, reason: "Low but passing threshold" },
  { id: 5, username: "bot_net_node", platform: "Reddit", age: "0d", karma: 0, posts: 200, score: 2, status: "blocked" as const, reason: "Known bad actor list" },
  { id: 6, username: "long_time_lurker", platform: "Discord", age: "5y", karma: 89, posts: 12, score: 72, status: "approved" as const, reason: "High account age" },
  { id: 7, username: "promo_account", platform: "Reddit", age: "3d", karma: 1, posts: 15, score: 11, status: "blocked" as const, reason: "Promotional patterns" },
  { id: 8, username: "genuine_user_22", platform: "Custom", age: "1y", karma: 540, posts: 67, score: 84, status: "approved" as const, reason: "Good history" },
];

const communities = [
  { name: "r/IndieGameDev", platform: "Reddit", members: "34.2k", threshold: 40, blocked7d: 89 },
  { name: "DevChat", platform: "Discord", members: "12.8k", threshold: 35, blocked7d: 42 },
  { name: "TechForum", platform: "Custom", members: "8.1k", threshold: 50, blocked7d: 67 },
];

function StatusBadge({ status }: { status: "blocked" | "approved" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
      status === "blocked" ? "bg-red-900/50 text-red-400" : "bg-emerald-900/50 text-emerald-400"
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "blocked" ? "bg-red-400" : "bg-emerald-400"}`} />
      {status === "blocked" ? "Blocked" : "Approved"}
    </span>
  );
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 60 ? "bg-emerald-500" : score >= 30 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 rounded-full bg-zinc-800">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-mono text-zinc-400">{score}</span>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-emerald-400">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500 text-xs text-black">R</span>
              RADAR
            </Link>
            <span className="text-xs text-zinc-500">Dashboard</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/docs" className="text-zinc-400 hover:text-white transition-colors">API Docs</Link>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-medium text-white">A</div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
              <p className="text-xs text-zinc-500 uppercase tracking-wider">{s.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">{s.value}</p>
              <p className="mt-1 text-xs text-zinc-400">{s.change}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main table */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                <h2 className="text-sm font-semibold text-white">Recent Submissions</h2>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500 uppercase tracking-wider">
                      <th className="px-5 py-3 font-medium">Account</th>
                      <th className="px-5 py-3 font-medium hidden sm:table-cell">Platform</th>
                      <th className="px-5 py-3 font-medium hidden md:table-cell">Age</th>
                      <th className="px-5 py-3 font-medium">Score</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {recentAccounts.map((acc) => (
                      <tr key={acc.id} className="hover:bg-zinc-800/20 transition-colors">
                        <td className="px-5 py-3">
                          <p className="font-mono text-zinc-200">{acc.username}</p>
                          <p className="text-xs text-zinc-500 mt-0.5">{acc.reason}</p>
                        </td>
                        <td className="px-5 py-3 text-zinc-400 hidden sm:table-cell">{acc.platform}</td>
                        <td className="px-5 py-3 text-zinc-400 font-mono hidden md:table-cell">{acc.age}</td>
                        <td className="px-5 py-3"><ScoreBar score={acc.score} /></td>
                        <td className="px-5 py-3"><StatusBadge status={acc.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Communities */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Your Communities</h3>
              <div className="space-y-4">
                {communities.map((c) => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-200">{c.name}</p>
                      <p className="text-xs text-zinc-500">{c.members} members · Threshold: {c.threshold}</p>
                    </div>
                    <span className="text-xs text-red-400 font-mono">{c.blocked7d} blocked</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded-lg border border-zinc-700 py-2 text-xs text-zinc-400 hover:border-zinc-600 hover:text-white transition-colors">
                + Add Community
              </button>
            </div>

            {/* Quality Thresholds */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Quality Thresholds</h3>
              <div className="space-y-4">
                {[
                  { label: "Account Age Weight", value: 40 },
                  { label: "Karma Weight", value: 30 },
                  { label: "Post History Weight", value: 20 },
                  { label: "Min Score to Pass", value: 35 },
                ].map((slider) => (
                  <div key={slider.label}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-zinc-400">{slider.label}</span>
                      <span className="text-zinc-300 font-mono">{slider.value}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-800">
                      <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${slider.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* API Key */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
              <h3 className="text-sm font-semibold text-white mb-3">API Key</h3>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-zinc-800 px-3 py-2 text-xs text-zinc-400 font-mono truncate">
                  rdr_live_sk_7f3a...x9k2
                </code>
                <button className="rounded bg-zinc-800 px-3 py-2 text-xs text-zinc-400 hover:text-white transition-colors">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
