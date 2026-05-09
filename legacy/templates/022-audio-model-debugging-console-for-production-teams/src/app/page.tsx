import Link from "next/link";

const features = [
  {
    title: "Real-Time Failure Detection",
    desc: "Monitor your audio models in production. Instantly detect when Whisper or HuBERT predictions fail or degrade.",
    icon: "◉",
  },
  {
    title: "SAE Feature Analysis",
    desc: "Interpretable Sparse Autoencoder features explain exactly why your model failed — no more black-box debugging.",
    icon: "⚙",
  },
  {
    title: "Audio Playback + Annotations",
    desc: "Listen to failed audio samples with visual overlays showing precisely where and why failures occurred.",
    icon: "♫",
  },
  {
    title: "Webhook Alerts",
    desc: "Get notified via Slack, PagerDuty, or email when failure rates exceed your configured thresholds.",
    icon: "🔔",
  },
  {
    title: "Failure Pattern Trends",
    desc: "Identify recurring patterns across failures. Categorize issues by audio characteristics, model version, and environment.",
    icon: "📊",
  },
  {
    title: "Team Reports",
    desc: "Download detailed failure reports with SAE feature breakdowns for team debugging sessions and post-mortems.",
    icon: "📄",
  },
];

const logos = ["Whisper", "HuBERT", "Wav2Vec", "SpeechBrain", "NVIDIA NeMo"];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-card-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-accent-blue flex items-center justify-center text-white font-bold text-sm">
              A
            </span>
            <span className="font-bold">AudioSAE Console</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <Link
            href="/dashboard"
            className="bg-accent-blue hover:bg-accent-blue/90 text-white text-sm px-4 py-2 rounded-md transition-colors"
          >
            Open Console
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-36 text-center">
        <div className="inline-block bg-accent-red/10 text-accent-red text-xs font-medium px-3 py-1 rounded-full mb-6">
          Production Audio Model Debugging
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
          Stop guessing why your
          <br />
          <span className="text-accent-blue">audio models fail</span>
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
          The first debugging console built for production audio ML teams.
          Interpretable SAE features tell you exactly what went wrong — in
          real-time.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="bg-accent-blue hover:bg-accent-blue/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Try the Live Demo →
          </Link>
          <a
            href="#how"
            className="border border-card-border text-foreground px-6 py-3 rounded-md font-medium hover:bg-white/5 transition-colors"
          >
            See How It Works
          </a>
        </div>
        {/* Mock dashboard preview */}
        <div className="mt-16 rounded-xl border border-card-border bg-card p-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-accent-red" />
            <span className="w-3 h-3 rounded-full bg-accent-orange" />
            <span className="w-3 h-3 rounded-full bg-accent-green" />
            <span className="text-xs text-muted ml-2 font-mono">
              audiosae.console — dashboard
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {[
              { label: "Failure Rate", value: "2.4%", color: "text-accent-orange" },
              { label: "Models Active", value: "3", color: "text-accent-green" },
              { label: "Alerts Today", value: "7", color: "text-accent-red" },
            ].map((s) => (
              <div key={s.label} className="bg-background rounded-lg p-3 text-center">
                <div className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-background rounded-lg p-3">
            <div className="text-xs text-muted mb-2 font-mono">failure_rate — last 24h</div>
            <div className="flex items-end gap-1 h-16">
              {[3, 2, 4, 3, 5, 8, 12, 9, 6, 4, 3, 2, 3, 5, 7, 4, 3, 2, 2, 3, 4, 6, 5, 3].map(
                (v, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm ${v > 7 ? "bg-accent-red" : v > 4 ? "bg-accent-orange" : "bg-accent-blue/50"}`}
                    style={{ height: `${(v / 12) * 100}%` }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-y border-card-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-muted text-sm">
          <span className="text-xs uppercase tracking-wider">Works with</span>
          {logos.map((l) => (
            <span key={l} className="font-mono opacity-60">
              {l}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-4">
          Everything you need to debug audio models
        </h2>
        <p className="text-muted text-center mb-16 max-w-xl mx-auto">
          Purpose-built for teams running Whisper, HuBERT, and other audio
          models in production.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="border border-card-border rounded-xl bg-card p-6 hover:border-accent-blue/40 transition-colors"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-card-border py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect your model API",
                desc: "Point AudioSAE at your Whisper, HuBERT, or custom audio model endpoint. Takes under 5 minutes.",
              },
              {
                step: "2",
                title: "Monitor in real-time",
                desc: "We analyze every prediction, detect failures, and run SAE feature decomposition on failed samples automatically.",
              },
              {
                step: "3",
                title: "Debug with clarity",
                desc: "See exactly which audio features caused the failure — background noise, accent patterns, frequency anomalies, and more.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-accent-blue/20 text-accent-blue font-bold flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-card-border py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted text-center mb-16">
            Start free. Upgrade when your team needs it.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                desc: "For individual developers testing audio models",
                features: ["1 model endpoint", "100 analyses/day", "7-day retention", "Email alerts"],
                cta: "Get Started",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$99/mo",
                desc: "For production teams debugging audio pipelines",
                features: [
                  "10 model endpoints",
                  "10,000 analyses/day",
                  "90-day retention",
                  "Slack + PagerDuty alerts",
                  "Team reports",
                  "Priority support",
                ],
                cta: "Start Free Trial",
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                desc: "For large-scale audio infrastructure teams",
                features: [
                  "Unlimited endpoints",
                  "Unlimited analyses",
                  "Custom retention",
                  "SSO + RBAC",
                  "Dedicated support",
                  "On-prem deployment",
                ],
                cta: "Contact Sales",
                highlight: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border p-6 flex flex-col ${
                  p.highlight
                    ? "border-accent-blue bg-accent-blue/5"
                    : "border-card-border bg-card"
                }`}
              >
                <h3 className="font-semibold mb-1">{p.name}</h3>
                <div className="text-3xl font-bold mb-2">{p.price}</div>
                <p className="text-sm text-muted mb-6">{p.desc}</p>
                <ul className="text-sm space-y-2 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-accent-green">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${
                    p.highlight
                      ? "bg-accent-blue text-white hover:bg-accent-blue/90"
                      : "border border-card-border hover:bg-white/5"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-card-border py-24 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">
            Ready to debug your audio models?
          </h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">
            Join teams already using AudioSAE Console to ship reliable audio
            features with confidence.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-accent-blue hover:bg-accent-blue/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Open the Console →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-card-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted gap-4">
          <span>© 2026 AudioSAE Console. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
