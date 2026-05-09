import Link from "next/link";
import type { Metadata } from "next";
import { papers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Dashboard — PaperBridge",
  description: "Your PaperBridge dashboard. View translations, downloads, and priority requests.",
};

const downloadHistory = [
  { paper: papers[0], date: "2026-02-16", format: "PDF" },
  { paper: papers[2], date: "2026-02-14", format: "PDF" },
  { paper: papers[4], date: "2026-02-10", format: "PDF" },
  { paper: papers[6], date: "2026-02-05", format: "PDF" },
];

const priorityRequests = [
  {
    title: "KAN: Kolmogorov-Arnold Networks for Scientific Discovery",
    status: "In Translation",
    eta: "Feb 24, 2026",
  },
  {
    title: "Flow Matching for Generative Modeling with Optimal Transport",
    status: "Completed",
    eta: "Feb 18, 2026",
  },
  {
    title: "Tokenization Is More Than Compression",
    status: "Queued",
    eta: "Feb 26, 2026",
  },
];

export default function DashboardPage() {
  return (
    <div className="py-12 lg:py-16 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-dark mb-1">
              Welcome back, Dr. Zhang
            </h1>
            <p className="text-muted">Professional Plan — 3 priority requests remaining this month</p>
          </div>
          <Link
            href="/request"
            className="mt-4 sm:mt-0 bg-accent hover:bg-accent-light text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-center"
          >
            Request Translation
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Papers This Month", value: "20", sub: "All delivered" },
            { label: "Downloads", value: "47", sub: "All time" },
            { label: "Priority Requests", value: "2/5", sub: "Used this month" },
            { label: "Next Batch", value: "Mar 1", sub: "7 days away" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-border p-5">
              <div className="text-2xl font-bold text-primary-dark">{s.value}</div>
              <div className="text-sm font-medium text-foreground">{s.label}</div>
              <div className="text-xs text-muted">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* New Papers */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-primary-dark">
                February 2026 Papers
              </h2>
              <Link href="/library" className="text-sm text-accent hover:text-accent-light font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {papers.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-start justify-between gap-3 pb-3 border-b border-border last:border-0">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-primary-dark truncate">{p.titleZh}</p>
                    <p className="text-xs text-muted truncate">{p.title}</p>
                  </div>
                  <button className="text-xs text-primary hover:text-primary-light font-medium shrink-0">
                    PDF ↓
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Requests */}
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-primary-dark">
                Priority Requests
              </h2>
              <Link href="/request" className="text-sm text-accent hover:text-accent-light font-medium">
                New request →
              </Link>
            </div>
            <div className="space-y-3">
              {priorityRequests.map((r) => (
                <div key={r.title} className="pb-3 border-b border-border last:border-0">
                  <p className="text-sm font-medium text-primary-dark">{r.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        r.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : r.status === "In Translation"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {r.status}
                    </span>
                    <span className="text-xs text-muted">ETA: {r.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Download History */}
        <div className="bg-white rounded-xl border border-border p-6 mt-8">
          <h2 className="text-lg font-bold text-primary-dark mb-4">
            Recent Downloads
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-semibold text-muted">Paper</th>
                  <th className="pb-3 font-semibold text-muted">Date</th>
                  <th className="pb-3 font-semibold text-muted">Format</th>
                  <th className="pb-3 font-semibold text-muted"></th>
                </tr>
              </thead>
              <tbody>
                {downloadHistory.map((d, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-primary-dark">{d.paper.titleZh}</p>
                      <p className="text-xs text-muted truncate max-w-md">{d.paper.title}</p>
                    </td>
                    <td className="py-3 pr-4 text-muted whitespace-nowrap">{d.date}</td>
                    <td className="py-3 pr-4 text-muted">{d.format}</td>
                    <td className="py-3">
                      <button className="text-primary hover:text-primary-light font-medium text-xs">
                        Re-download
                      </button>
                    </td>
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
