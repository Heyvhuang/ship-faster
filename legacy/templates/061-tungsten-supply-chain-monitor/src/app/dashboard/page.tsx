import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dashboard | Tungsten Supply Chain Monitor",
  description: "Live tungsten pricing, supplier risk scores, and availability alerts.",
};

const priceHistory = [
  { week: "Mar 3", apt: 308.1, ferro: 41.2, carbide: 39.1 },
  { week: "Mar 10", apt: 310.5, ferro: 41.8, carbide: 38.8 },
  { week: "Mar 17", apt: 307.2, ferro: 42.1, carbide: 38.5 },
  { week: "Mar 24", apt: 312.8, ferro: 42.5, carbide: 38.9 },
  { week: "Mar 31", apt: 315.2, ferro: 42.8, carbide: 38.5 },
];

const alerts = [
  { id: 1, type: "warning", message: "APT prices up 3.2% week-over-week — highest since Nov 2025", time: "2h ago" },
  { id: 2, type: "danger", message: "Supplier Jiangxi Tungsten flagged: delayed shipments to 3 customers", time: "5h ago" },
  { id: 3, type: "info", message: "New quarterly market outlook report available for download", time: "1d ago" },
  { id: 4, type: "success", message: "Your inventory threshold alert: Carbide powder stock above 90-day buffer", time: "1d ago" },
  { id: 5, type: "warning", message: "China export policy review scheduled for Q2 — potential impact on APT supply", time: "2d ago" },
];

const supplierData = [
  { name: "Xiamen Tungsten Co.", country: "China", risk: 32, reliability: 94, capacity: 78, grade: "APT, Concentrate" },
  { name: "Global Tungsten & Powders", country: "USA", risk: 18, reliability: 97, capacity: 65, grade: "Carbide, AMT" },
  { name: "H.C. Starck", country: "Germany", risk: 24, reliability: 96, capacity: 72, grade: "Ferro-W, Carbide" },
  { name: "Sandvik AB", country: "Sweden", risk: 41, reliability: 89, capacity: 82, grade: "Carbide, Tools" },
  { name: "Wolfram Bergbau", country: "Austria", risk: 22, reliability: 95, capacity: 58, grade: "APT, Concentrate" },
  { name: "China Molybdenum Co.", country: "China", risk: 55, reliability: 82, capacity: 91, grade: "Concentrate" },
  { name: "Kennametal Inc.", country: "USA", risk: 15, reliability: 98, capacity: 60, grade: "Carbide" },
  { name: "Plansee Group", country: "Austria", risk: 20, reliability: 96, capacity: 70, grade: "Ferro-W, AMT" },
];

function RiskBadge({ risk }: { risk: number }) {
  const color = risk < 30 ? "text-success" : risk < 50 ? "text-warning" : "text-danger";
  const label = risk < 30 ? "Low" : risk < 50 ? "Medium" : "High";
  return <span className={`text-xs font-semibold ${color}`}>{label} ({risk})</span>;
}

function AlertIcon({ type }: { type: string }) {
  const colors: Record<string, string> = { warning: "bg-warning", danger: "bg-danger", info: "bg-accent", success: "bg-success" };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[type] || "bg-steel"}`} />;
}

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Tungsten Intelligence Dashboard</h1>
              <p className="text-sm text-steel-light mt-1">Week of March 31, 2026 · Data refreshed 4 min ago</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-success/10 text-success px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" /> Live
              </span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "APT Price (88.5% WO₃)", value: "$315.20/MTU", change: "+2.4%", up: true },
              { label: "Ferro-Tungsten", value: "$42.80/kg", change: "+1.1%", up: true },
              { label: "Suppliers Monitored", value: "52", change: "3 flagged", up: false },
              { label: "Active Alerts", value: "5", change: "2 critical", up: false },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-card border border-card-border rounded-xl p-5">
                <p className="text-xs text-steel font-medium mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className={`text-xs mt-1 ${kpi.up ? "text-success" : "text-warning"}`}>{kpi.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Price Trend Table */}
            <div className="lg:col-span-2 bg-card border border-card-border rounded-xl">
              <div className="px-6 py-4 border-b border-card-border">
                <h2 className="font-semibold">Weekly Price Trend (5 Weeks)</h2>
              </div>
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-steel text-left border-b border-card-border">
                      <th className="pb-3 font-medium">Week</th>
                      <th className="pb-3 font-medium text-right">APT ($/MTU)</th>
                      <th className="pb-3 font-medium text-right">Ferro-W ($/kg)</th>
                      <th className="pb-3 font-medium text-right">Carbide ($/kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceHistory.map((row, i) => (
                      <tr key={row.week} className="border-b border-card-border/50">
                        <td className="py-2.5">{row.week}</td>
                        <td className={`py-2.5 text-right font-mono ${i === priceHistory.length - 1 ? "text-success font-semibold" : ""}`}>
                          {row.apt.toFixed(1)}
                        </td>
                        <td className={`py-2.5 text-right font-mono ${i === priceHistory.length - 1 ? "text-success font-semibold" : ""}`}>
                          {row.ferro.toFixed(1)}
                        </td>
                        <td className={`py-2.5 text-right font-mono ${i === priceHistory.length - 1 ? "text-danger font-semibold" : ""}`}>
                          {row.carbide.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Simplified bar chart */}
                <div className="mt-6">
                  <p className="text-xs text-steel mb-3">APT Price Trend ($/MTU)</p>
                  <div className="flex items-end gap-2 h-24">
                    {priceHistory.map((row) => (
                      <div key={row.week} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-accent/80 rounded-t"
                          style={{ height: `${((row.apt - 305) / 15) * 100}%` }}
                        />
                        <span className="text-[10px] text-steel">{row.week.split(" ")[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-card border border-card-border rounded-xl">
              <div className="px-6 py-4 border-b border-card-border">
                <h2 className="font-semibold">Recent Alerts</h2>
              </div>
              <div className="p-4 space-y-3">
                {alerts.map((a) => (
                  <div key={a.id} className="flex items-start gap-3 p-3 bg-navy-light/50 rounded-lg">
                    <AlertIcon type={a.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs leading-relaxed">{a.message}</p>
                      <p className="text-[10px] text-steel mt-1">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Supplier Risk Table */}
          <div className="bg-card border border-card-border rounded-xl">
            <div className="px-6 py-4 border-b border-card-border">
              <h2 className="font-semibold">Supplier Risk Monitor</h2>
              <p className="text-xs text-steel mt-1">52 suppliers tracked · 8 shown</p>
            </div>
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-steel text-left border-b border-card-border">
                    <th className="pb-3 font-medium">Supplier</th>
                    <th className="pb-3 font-medium">Country</th>
                    <th className="pb-3 font-medium">Grades</th>
                    <th className="pb-3 font-medium text-right">Risk Score</th>
                    <th className="pb-3 font-medium text-right">Reliability</th>
                    <th className="pb-3 font-medium text-right">Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierData.map((s) => (
                    <tr key={s.name} className="border-b border-card-border/50 hover:bg-navy-light/30 transition">
                      <td className="py-3 font-medium">{s.name}</td>
                      <td className="py-3 text-steel-light">{s.country}</td>
                      <td className="py-3 text-steel-light text-xs">{s.grade}</td>
                      <td className="py-3 text-right"><RiskBadge risk={s.risk} /></td>
                      <td className="py-3 text-right font-mono">{s.reliability}%</td>
                      <td className="py-3 text-right">
                        <div className="inline-flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-navy-light rounded-full overflow-hidden">
                            <div className="h-full bg-accent rounded-full" style={{ width: `${s.capacity}%` }} />
                          </div>
                          <span className="text-xs text-steel">{s.capacity}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
