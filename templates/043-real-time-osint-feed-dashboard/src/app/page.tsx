import Link from "next/link";
import { stats } from "@/lib/data";

function StatusDot({ status }: { status: "online" | "degraded" | "offline" }) {
  const colors = { online: "bg-accent-green", degraded: "bg-accent-amber", offline: "bg-accent-red" };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status]} animate-pulse-dot`} />;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-card-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent-red rounded flex items-center justify-center text-white font-bold text-sm">R</div>
          <span className="text-lg font-bold tracking-tight">Radar</span>
          <span className="text-xs text-muted ml-2 hidden sm:inline">OSINT Feed Dashboard</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/radar/dashboard" className="text-accent-green hover:text-white transition">Dashboard</Link>
          <Link href="/radar/pricing" className="text-muted hover:text-white transition">Pricing</Link>
          <Link href="/radar/dashboard" className="bg-accent-red hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="flex items-center gap-2 mb-6">
          <StatusDot status="online" />
          <span className="text-xs text-accent-green font-mono">{stats.activeFeeds} feeds online — {stats.itemsToday.toLocaleString()} items processed today</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
          Real-time OSINT<br />
          <span className="text-accent-red">intelligence feeds</span><br />
          for researchers.
        </h1>
        <p className="text-lg text-muted max-w-2xl mb-10 leading-relaxed">
          Curated dashboard pulling from 15+ verified global feeds with custom alerting.
          Stop building your own pipeline. Start investigating.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/radar/dashboard" className="bg-accent-red hover:bg-red-600 text-white px-8 py-3 rounded font-medium text-center transition">
            Open Dashboard
          </Link>
          <Link href="/radar/pricing" className="border border-card-border hover:border-muted text-foreground px-8 py-3 rounded font-medium text-center transition">
            View Pricing
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-card-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Active Feeds", value: `${stats.activeFeeds}+`, color: "text-accent-green" },
            { label: "Items Today", value: stats.itemsToday.toLocaleString(), color: "text-accent-blue" },
            { label: "Avg Latency", value: `${stats.avgLatency}ms`, color: "text-accent-amber" },
            { label: "Uptime", value: `${stats.uptime}%`, color: "text-accent-green" },
          ].map((s) => (
            <div key={s.label}>
              <div className={`text-2xl md:text-3xl font-bold font-mono ${s.color}`}>{s.value}</div>
              <div className="text-sm text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold mb-12">Built for OSINT professionals</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "15+ Verified Feeds", desc: "News wires, social platforms, CVE databases, government advisories, and threat intelligence — all in one stream.", icon: "◈" },
            { title: "Real-Time Streaming", desc: "Sub-minute latency on all feeds. See intelligence as it breaks, not hours later.", icon: "⚡" },
            { title: "Custom Alerts", desc: "Keyword and regex-based alerting with email and webhook delivery. Never miss what matters.", icon: "🔔" },
            { title: "Region Filtering", desc: "Filter by geographic region, source type, or severity level. Focus on your area of interest.", icon: "◎" },
            { title: "One-Click Export", desc: "Export filtered results to JSON or CSV for further analysis in your preferred tools.", icon: "↓" },
            { title: "Feed Analytics", desc: "Volume trends, velocity metrics, and top keyword analysis across all your feeds.", icon: "📊" },
          ].map((f) => (
            <div key={f.title} className="bg-card border border-card-border rounded-lg p-6">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-card-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Start monitoring in under 60 seconds</h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">No API keys. No infrastructure. Just intelligence.</p>
          <Link href="/radar/dashboard" className="bg-accent-red hover:bg-red-600 text-white px-8 py-3 rounded font-medium inline-block transition">
            Open Dashboard →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-card-border px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-accent-red rounded flex items-center justify-center text-white text-xs font-bold">R</div>
            <span>Radar OSINT Dashboard</span>
          </div>
          <div className="flex gap-6">
            <Link href="/radar/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/radar/dashboard" className="hover:text-white transition">Dashboard</Link>
            <Link href="/radar/alerts" className="hover:text-white transition">Alerts</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
