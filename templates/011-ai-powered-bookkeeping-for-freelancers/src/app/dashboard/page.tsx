"use client";

import { useState } from "react";
import Link from "next/link";

const transactions = [
  { id: 1, date: "Feb 18, 2026", desc: "Adobe Creative Cloud", category: "Software", amount: -54.99, status: "auto", confidence: 99 },
  { id: 2, date: "Feb 17, 2026", desc: "YouTube AdSense Payout", category: "Income", amount: 3241.87, status: "auto", confidence: 100 },
  { id: 3, date: "Feb 15, 2026", desc: "Amazon - Ring Light Kit", category: "Equipment", amount: -129.99, status: "auto", confidence: 94 },
  { id: 4, date: "Feb 14, 2026", desc: "Patreon Creator Payout", category: "Income", amount: 1847.50, status: "auto", confidence: 100 },
  { id: 5, date: "Feb 12, 2026", desc: "Starbucks", category: "Meals", amount: -6.45, status: "review", confidence: 62 },
  { id: 6, date: "Feb 11, 2026", desc: "Epidemic Sound Subscription", category: "Software", amount: -15.00, status: "auto", confidence: 97 },
  { id: 7, date: "Feb 10, 2026", desc: "Sponsorship - NordVPN", category: "Income", amount: 2500.00, status: "auto", confidence: 100 },
  { id: 8, date: "Feb 9, 2026", desc: "Home Office Internet (30%)", category: "Utilities", amount: -26.70, status: "auto", confidence: 91 },
  { id: 9, date: "Feb 7, 2026", desc: "B&H Photo - SD Cards", category: "Equipment", amount: -45.99, status: "auto", confidence: 96 },
  { id: 10, date: "Feb 5, 2026", desc: "Stripe Payout - Course Sales", category: "Income", amount: 892.00, status: "auto", confidence: 100 },
];

const incomeByPlatform = [
  { name: "YouTube AdSense", amount: 38420, pct: 44 },
  { name: "Patreon", amount: 22170, pct: 25 },
  { name: "Sponsorships", amount: 18500, pct: 21 },
  { name: "Stripe / Courses", amount: 8342, pct: 10 },
];

const categoryColors: Record<string, string> = {
  Income: "bg-green-500/10 text-green-400",
  Software: "bg-blue-500/10 text-blue-400",
  Equipment: "bg-purple-500/10 text-purple-400",
  Meals: "bg-yellow-500/10 text-yellow-500",
  Utilities: "bg-slate-500/10 text-slate-400",
};

export default function Dashboard() {
  const [tab, setTab] = useState<"transactions" | "income" | "taxes">("transactions");

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-800 lg:block">
          <div className="sticky top-0 flex h-screen flex-col p-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold px-3 py-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 text-xs font-bold text-white">L</span>
              Ledger<span className="text-blue-400">AI</span>
            </Link>
            <nav className="mt-6 flex flex-col gap-1">
              {[
                { label: "Dashboard", active: true, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" },
                { label: "Transactions", active: false, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
                { label: "Receipts", active: false, icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" },
                { label: "Tax Estimates", active: false, icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
                { label: "1099s", active: false, icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
                { label: "Schedule C", active: false, icon: "M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${item.active ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"}`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto rounded-lg border border-slate-700 bg-slate-800/50 p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">SC</div>
                <div>
                  <div className="text-sm font-medium">Sarah Chen</div>
                  <div className="text-xs text-slate-500">Pro Plan</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Mobile header */}
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 text-xs font-bold text-white">L</span>
              Ledger<span className="text-blue-400">AI</span>
            </Link>
            <Link href="/" className="text-sm text-slate-400">Back to Home</Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-slate-400">Welcome back, Sarah. Here&apos;s your financial overview.</p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total Income (YTD)", value: "$87,432", change: "+12%", up: true },
              { label: "Deductions Found", value: "$14,891", change: "32 items", up: true },
              { label: "Est. Q1 Tax", value: "$4,218", change: "Due Apr 15", up: false },
              { label: "Missing Receipts", value: "3", change: "Action needed", up: false },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-slate-700 bg-slate-800/30 p-5">
                <p className="text-xs text-slate-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                <p className={`mt-1 text-xs ${stat.up ? "text-green-400" : "text-yellow-500"}`}>{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-8 flex gap-1 rounded-lg border border-slate-700 bg-slate-800/30 p-1 w-fit">
            {(["transactions", "income", "taxes"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-md px-4 py-2 text-sm capitalize transition ${tab === t ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Transactions Tab */}
          {tab === "transactions" && (
            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Category</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-400">Amount</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-slate-400">AI Confidence</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-slate-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{tx.date}</td>
                      <td className="px-4 py-3 text-slate-200 whitespace-nowrap">{tx.desc}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[tx.category] || "bg-slate-700 text-slate-300"}`}>
                          {tx.category}
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-right font-medium whitespace-nowrap ${tx.amount > 0 ? "text-green-400" : "text-slate-300"}`}>
                        {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-700">
                            <div
                              className={`h-full rounded-full ${tx.confidence >= 90 ? "bg-green-500" : tx.confidence >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{ width: `${tx.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500">{tx.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {tx.status === "review" ? (
                          <button className="rounded-md bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-500 hover:bg-yellow-500/20">
                            Review
                          </button>
                        ) : (
                          <span className="text-xs text-green-500">Approved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Income Tab */}
          {tab === "income" && (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
                <h3 className="font-semibold">Income by Platform</h3>
                <div className="mt-4 space-y-4">
                  {incomeByPlatform.map((p) => (
                    <div key={p.name}>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">{p.name}</span>
                        <span className="font-medium">${p.amount.toLocaleString()}</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-700">
                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
                <h3 className="font-semibold">1099 Status</h3>
                <div className="mt-4 space-y-3">
                  {[
                    { platform: "YouTube / Google", status: "Received", received: true },
                    { platform: "Patreon", status: "Received", received: true },
                    { platform: "Stripe", status: "Received", received: true },
                    { platform: "PayPal", status: "Pending", received: false },
                  ].map((item) => (
                    <div key={item.platform} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
                      <span className="text-sm text-slate-300">{item.platform}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${item.received ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-500"}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Taxes Tab */}
          {tab === "taxes" && (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
                <h3 className="font-semibold">Quarterly Estimated Taxes</h3>
                <div className="mt-4 space-y-3">
                  {[
                    { q: "Q1 2026", due: "Apr 15", amount: "$4,218", status: "upcoming" },
                    { q: "Q2 2026", due: "Jun 15", amount: "$4,100", status: "projected" },
                    { q: "Q3 2026", due: "Sep 15", amount: "$4,100", status: "projected" },
                    { q: "Q4 2025", due: "Jan 15", amount: "$3,980", status: "paid" },
                  ].map((q) => (
                    <div key={q.q} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
                      <div>
                        <div className="text-sm font-medium text-slate-200">{q.q}</div>
                        <div className="text-xs text-slate-500">Due {q.due}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{q.amount}</div>
                        <span className={`text-xs ${q.status === "paid" ? "text-green-400" : q.status === "upcoming" ? "text-yellow-500" : "text-slate-500"}`}>
                          {q.status === "paid" ? "Paid" : q.status === "upcoming" ? "Due Soon" : "Projected"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
                <h3 className="font-semibold">Deduction Summary</h3>
                <div className="mt-4 space-y-3">
                  {[
                    { cat: "Equipment & Gear", amount: "$4,890" },
                    { cat: "Software & Subscriptions", amount: "$2,340" },
                    { cat: "Home Office (30%)", amount: "$3,600" },
                    { cat: "Travel & Meals", amount: "$1,420" },
                    { cat: "Professional Services", amount: "$2,641" },
                  ].map((d) => (
                    <div key={d.cat} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
                      <span className="text-sm text-slate-300">{d.cat}</span>
                      <span className="text-sm font-medium text-blue-400">{d.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-4">
                  <span className="font-semibold">Total Deductions</span>
                  <span className="text-lg font-bold text-blue-400">$14,891</span>
                </div>
              </div>
            </div>
          )}

          {/* Export bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border border-slate-700 bg-slate-800/30 p-4">
            <span className="text-sm text-slate-400">Export:</span>
            {["Schedule C (PDF)", "TurboTax (.tax)", "CSV", "Send to Accountant"].map((exp) => (
              <button key={exp} className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 transition hover:border-blue-500 hover:text-blue-400">
                {exp}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
