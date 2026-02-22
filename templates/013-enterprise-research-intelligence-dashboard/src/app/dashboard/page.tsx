import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard Preview",
  description:
    "Preview the ResearchPulse competitor tracking dashboard with publication timelines, regulatory alerts, and trend analysis.",
};

const competitors = [
  { name: "Google Health", papers: 47, patents: 12, trend: "+18%", alert: true },
  { name: "Tempus Labs", papers: 31, patents: 8, trend: "+24%", alert: true },
  { name: "PathAI", papers: 22, patents: 5, trend: "+9%", alert: false },
  { name: "Viz.ai", papers: 14, patents: 3, trend: "+31%", alert: false },
  { name: "Butterfly Network", papers: 11, patents: 6, trend: "-5%", alert: false },
  { name: "Aidoc", papers: 18, patents: 4, trend: "+12%", alert: true },
];

const recentAlerts = [
  {
    type: "Regulatory",
    typeColor: "bg-red-500",
    title: "FDA Draft Guidance: AI-Enabled Clinical Decision Support",
    time: "2 hours ago",
  },
  {
    type: "Patent",
    typeColor: "bg-purple-500",
    title: "Tempus Labs — Multi-Modal Biomarker Discovery Platform",
    time: "1 day ago",
  },
  {
    type: "Publication",
    typeColor: "bg-amber-500",
    title: "Google Health — Chest X-Ray Foundation Model Validation",
    time: "2 days ago",
  },
  {
    type: "Regulatory",
    typeColor: "bg-red-500",
    title: "CMS Proposes AI-Assisted Diagnostic Reimbursement Codes",
    time: "5 days ago",
  },
  {
    type: "Publication",
    typeColor: "bg-amber-500",
    title: "PathAI — AI-Guided Therapy Selection Phase II Results",
    time: "6 days ago",
  },
];

const keywords = [
  { keyword: "federated learning", mentions: 142, change: "+340%" },
  { keyword: "FDA SaMD guidance", mentions: 87, change: "+45%" },
  { keyword: "foundation models radiology", mentions: 64, change: "+120%" },
  { keyword: "digital pathology AI", mentions: 53, change: "+28%" },
  { keyword: "clinical decision support", mentions: 41, change: "+62%" },
];

const weeklyVolume = [
  { week: "Jan 6", papers: 2341 },
  { week: "Jan 13", papers: 2567 },
  { week: "Jan 20", papers: 2489 },
  { week: "Jan 27", papers: 2712 },
  { week: "Feb 3", papers: 2654 },
  { week: "Feb 10", papers: 2847 },
];

export default function DashboardPage() {
  const maxPapers = Math.max(...weeklyVolume.map((w) => w.papers));

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                  PREVIEW
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Healthcare AI competitive intelligence overview
              </p>
            </div>
            <Link
              href="/demo"
              className="rounded-lg bg-blue-700 px-6 py-2 text-center text-sm font-semibold text-white hover:bg-blue-800"
            >
              Get Full Access
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Papers This Week", value: "2,847", change: "+7.3%", up: true },
            { label: "Active Alerts", value: "12", change: "+3", up: true },
            { label: "Tracked Competitors", value: "6", change: "—", up: false },
            { label: "Regulatory Signals", value: "4", change: "+2", up: true },
          ].map((card) => (
            <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium text-slate-500">{card.label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{card.value}</p>
              {card.change !== "—" && (
                <p className={`mt-1 text-xs font-semibold ${card.up ? "text-emerald-600" : "text-slate-400"}`}>
                  {card.change} vs last week
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Publication Volume Chart */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Weekly Scan Volume</h2>
              <div className="mt-4 flex items-end gap-3" style={{ height: 160 }}>
                {weeklyVolume.map((w) => (
                  <div key={w.week} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-xs font-medium text-slate-600">{w.papers.toLocaleString()}</span>
                    <div
                      className="w-full rounded-t bg-blue-600"
                      style={{ height: `${(w.papers / maxPapers) * 120}px` }}
                    />
                    <span className="text-xs text-slate-400">{w.week}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitor Table */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-sm font-semibold text-slate-900">Competitor Publication Tracker</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs font-medium text-slate-500">
                      <th className="px-6 py-3">Company</th>
                      <th className="px-6 py-3">Papers (YTD)</th>
                      <th className="px-6 py-3">Patents (YTD)</th>
                      <th className="px-6 py-3">Trend</th>
                      <th className="px-6 py-3">Alert</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((c) => (
                      <tr key={c.name} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="px-6 py-3 font-medium text-slate-900">{c.name}</td>
                        <td className="px-6 py-3 text-slate-600">{c.papers}</td>
                        <td className="px-6 py-3 text-slate-600">{c.patents}</td>
                        <td className={`px-6 py-3 font-semibold ${c.trend.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>
                          {c.trend}
                        </td>
                        <td className="px-6 py-3">
                          {c.alert && (
                            <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Alerts */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-sm font-semibold text-slate-900">Recent Alerts</h2>
              </div>
              <div className="divide-y divide-slate-50">
                {recentAlerts.map((alert) => (
                  <div key={alert.title} className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${alert.typeColor}`} />
                      <span className="text-xs font-medium text-slate-500">{alert.type}</span>
                      <span className="ml-auto text-xs text-slate-400">{alert.time}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-slate-700">{alert.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Keywords */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-sm font-semibold text-slate-900">Trending Keywords</h2>
              </div>
              <div className="divide-y divide-slate-50">
                {keywords.map((kw) => (
                  <div key={kw.keyword} className="flex items-center justify-between px-6 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{kw.keyword}</p>
                      <p className="text-xs text-slate-400">{kw.mentions} mentions</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">{kw.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-800 to-blue-900 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Unlock Your Full Dashboard</h2>
          <p className="mt-2 text-blue-200">
            This is a preview. Get real-time data tailored to your competitors and research areas.
          </p>
          <Link
            href="/demo"
            className="mt-6 inline-block rounded-lg bg-sky-500 px-8 py-3 text-sm font-semibold text-white hover:bg-sky-400"
          >
            Request a Demo
          </Link>
        </div>
      </section>
    </>
  );
}
