import Link from "next/link";
import { RiskBadge, RiskScore } from "@/components/risk-badge";

const demoPackages = [
  { name: "jsonwebtoken", score: 92, level: "critical" as const },
  { name: "lodash", score: 74, level: "high" as const },
  { name: "axios", score: 45, level: "medium" as const },
  { name: "express", score: 38, level: "medium" as const },
  { name: "bcrypt", score: 15, level: "low" as const },
];

const stats = [
  { value: "14,000+", label: "Dependencies Monitored" },
  { value: "2.3M", label: "Trending Repos Analyzed" },
  { value: "48h", label: "Avg. Early Warning Lead" },
  { value: "99.7%", label: "Alert Accuracy" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-zinc-950 to-zinc-950" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm text-red-400 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            3 critical alerts detected today
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Know about dependency risks{" "}
            <span className="text-red-500">before</span> they break production
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
            DepRadar monitors trending GitHub repositories to detect breaking changes, security vulnerabilities, and deprecations in your dependencies — days before official CVE announcements.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/onboarding" className="w-full sm:w-auto rounded-lg bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 transition-colors">
              Start Monitoring Free
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto rounded-lg border border-zinc-700 px-8 py-3 text-base font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
              View Demo Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Risk Calculator Demo */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">Dependency Risk Calculator</h2>
            <p className="mt-3 text-zinc-400">See how your stack scores against emerging threats</p>
          </div>
          <div className="mx-auto max-w-2xl rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            <div className="border-b border-zinc-800 px-6 py-4 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="ml-2 text-sm text-zinc-500 font-mono">package.json — risk analysis</span>
            </div>
            <div className="divide-y divide-zinc-800/50">
              {demoPackages.map((pkg) => (
                <div key={pkg.name} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <code className="text-sm font-mono text-zinc-200">{pkg.name}</code>
                    <RiskBadge level={pkg.level} />
                  </div>
                  <RiskScore score={pkg.score} />
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-800 bg-red-500/5 px-6 py-4 flex items-center justify-between">
              <span className="text-sm text-zinc-400">Overall Stack Risk</span>
              <span className="text-lg font-bold font-mono text-red-500">High — 2 critical issues</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">How DepRadar Works</h2>
          <p className="mt-3 text-center text-zinc-400">Proactive monitoring, not reactive patching</p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Add Dependencies", desc: "Input your production package.json or connect your repository. We identify your critical dependency surface." },
              { step: "02", title: "Monitor Trends", desc: "Our engine continuously scans trending GitHub repos, discussions, and security channels for signals about your dependencies." },
              { step: "03", title: "Score Risks", desc: "Our algorithm weighs trending velocity, exploit maturity, and your dependency depth to produce actionable risk scores." },
              { step: "04", title: "Alert Your Team", desc: "Get instant alerts via Slack or email with severity levels, context, and remediation steps — days before official advisories." },
            ].map((item) => (
              <div key={item.step} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <span className="text-3xl font-bold text-zinc-700 font-mono">{item.step}</span>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-zinc-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why different */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Why Not Just Use Dependabot?</h2>
          <p className="mt-3 text-center text-zinc-400 max-w-2xl mx-auto">
            Traditional tools alert you after a CVE is published. DepRadar catches issues when they first surface in trending code — averaging 48 hours earlier.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Trending Signal Detection", desc: "We monitor GitHub trending, security discussions, and exploit PoCs as they go viral — not just the NVD database." },
              { title: "Breaking Change Forecasting", desc: "Track upcoming major version changes and migration-breaking patterns before they land in stable releases." },
              { title: "Risk Context, Not Just CVEs", desc: "Each alert includes trending velocity, exploit maturity, and team-specific impact analysis." },
              { title: "48h Average Lead Time", desc: "Our users patch vulnerabilities an average of 48 hours before official advisory publication." },
              { title: "Team-Aware Scoring", desc: "Risk scores factor in your specific dependency tree depth, usage patterns, and deployment context." },
              { title: "Zero False Positive Guarantee", desc: "Human-verified alerts ensure every notification is actionable. We refund your month if we send a false positive." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-zinc-800 p-6">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800 bg-zinc-900/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Stop finding out last</h2>
          <p className="mt-3 text-zinc-400">Join 200+ engineering teams who get early warnings on dependency risks.</p>
          <Link href="/onboarding" className="mt-8 inline-block rounded-lg bg-red-600 px-8 py-3 font-medium text-white hover:bg-red-700 transition-colors">
            Start Monitoring — Free for 14 Days
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <span className="text-sm text-zinc-500">&copy; 2025 DepRadar. All rights reserved.</span>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/pricing" className="hover:text-zinc-300">Pricing</Link>
            <Link href="/dashboard" className="hover:text-zinc-300">Dashboard</Link>
            <span className="hover:text-zinc-300 cursor-pointer">Privacy</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
