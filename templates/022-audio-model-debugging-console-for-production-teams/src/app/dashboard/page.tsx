import ConsoleLayout from "@/components/ConsoleLayout";

const stats = [
  { label: "Total Predictions", value: "1,284,392", change: "+12.3%", up: true },
  { label: "Failure Rate", value: "2.41%", change: "+0.3%", up: true, alert: true },
  { label: "Active Models", value: "3", change: "0", up: false },
  { label: "Alerts Today", value: "7", change: "-2", up: false },
];

const hourlyFailures = [
  3, 2, 4, 3, 5, 8, 12, 9, 6, 4, 3, 2, 3, 5, 7, 4, 3, 2, 2, 3, 4, 6, 5, 3,
];

const models = [
  { name: "whisper-large-v3", status: "healthy", rate: "1.8%", reqs: "542K", latency: "234ms" },
  { name: "hubert-base-ls960", status: "degraded", rate: "4.2%", reqs: "389K", latency: "187ms" },
  { name: "whisper-medium-en", status: "healthy", rate: "1.1%", reqs: "353K", latency: "156ms" },
];

const recentFailures = [
  { id: "F-29481", time: "2 min ago", model: "hubert-base-ls960", type: "Misclassification", conf: "0.34", feature: "background_noise_level" },
  { id: "F-29480", time: "5 min ago", model: "whisper-large-v3", type: "Hallucination", conf: "0.12", feature: "low_snr_segment" },
  { id: "F-29479", time: "8 min ago", model: "hubert-base-ls960", type: "Timeout", conf: "—", feature: "long_silence_padding" },
  { id: "F-29478", time: "11 min ago", model: "whisper-large-v3", type: "Wrong language", conf: "0.67", feature: "accent_pattern_mismatch" },
  { id: "F-29477", time: "14 min ago", model: "whisper-medium-en", type: "Truncation", conf: "0.45", feature: "clipping_distortion" },
];

export default function Dashboard() {
  return (
    <ConsoleLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted">Real-time model health overview</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-2 text-accent-green">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse-dot" />
              Live
            </span>
            <span className="text-muted">Last 24 hours</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-card-border rounded-xl p-4">
              <div className="text-xs text-muted mb-1">{s.label}</div>
              <div className={`text-2xl font-bold font-mono ${s.alert ? "text-accent-orange" : ""}`}>
                {s.value}
              </div>
              <div className={`text-xs mt-1 ${s.up ? (s.alert ? "text-accent-red" : "text-accent-green") : "text-muted"}`}>
                {s.change} vs yesterday
              </div>
            </div>
          ))}
        </div>

        {/* Failure rate chart */}
        <div className="bg-card border border-card-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-sm">Failure Rate</h2>
              <p className="text-xs text-muted">Hourly breakdown — last 24h</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-accent-blue/50" /> Normal</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-accent-orange" /> Warning</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-accent-red" /> Critical</span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-32">
            {hourlyFailures.map((v, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm transition-all ${
                  v > 10 ? "bg-accent-red" : v > 5 ? "bg-accent-orange" : "bg-accent-blue/50"
                }`}
                style={{ height: `${(v / 14) * 100}%` }}
                title={`${v}% failures at ${String(i).padStart(2, "0")}:00`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted mt-2">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Model Status */}
          <div className="bg-card border border-card-border rounded-xl p-5">
            <h2 className="font-semibold text-sm mb-4">Model Status</h2>
            <div className="space-y-3">
              {models.map((m) => (
                <div key={m.name} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${m.status === "healthy" ? "bg-accent-green" : "bg-accent-orange animate-pulse-dot"}`} />
                    <div>
                      <div className="font-mono text-sm">{m.name}</div>
                      <div className="text-xs text-muted">{m.reqs} requests · {m.latency} avg</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-mono ${m.status === "degraded" ? "text-accent-orange" : "text-accent-green"}`}>
                      {m.rate}
                    </div>
                    <div className="text-xs text-muted">failure rate</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent failures */}
          <div className="bg-card border border-card-border rounded-xl p-5">
            <h2 className="font-semibold text-sm mb-4">Recent Failures</h2>
            <div className="space-y-2">
              {recentFailures.map((f) => (
                <div key={f.id} className="flex items-center justify-between p-3 bg-background rounded-lg text-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-accent-red text-xs">●</span>
                    <div className="min-w-0">
                      <div className="font-mono text-xs">
                        {f.id} · <span className="text-muted">{f.time}</span>
                      </div>
                      <div className="text-xs text-muted truncate">
                        {f.model} — {f.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-accent-purple shrink-0 ml-2">
                    {f.feature}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
