import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const stats = [
  { value: "2.4M+", label: "PII records scrubbed" },
  { value: "340+", label: "AI agents protected" },
  { value: "99.7%", label: "Detection accuracy" },
  { value: "< 50ms", label: "Avg scrub latency" },
];

const steps = [
  {
    num: "01",
    title: "Connect your agent memory",
    desc: "Plug into LangChain, AutoGen, custom GPTs, or any agent framework with our SDK or log export.",
  },
  {
    num: "02",
    title: "Auto-detect PII",
    desc: "Our ML-powered scanner identifies names, emails, phone numbers, addresses, and custom patterns across all conversation history.",
  },
  {
    num: "03",
    title: "Scrub on schedule",
    desc: "Set daily, weekly, or monthly hygiene runs. Download compliance reports for audits anytime.",
  },
];

const integrations = [
  "LangChain",
  "AutoGen",
  "CrewAI",
  "OpenAI Assistants",
  "Custom GPTs",
  "Haystack",
  "LlamaIndex",
  "Semantic Kernel",
];

const badges = [
  { name: "SOC 2 Type II", icon: "🛡️" },
  { name: "GDPR Compliant", icon: "🇪🇺" },
  { name: "CCPA Ready", icon: "📋" },
  { name: "HIPAA Ready", icon: "🏥" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-emerald-50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Now in public beta
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Automated PII scrubbing for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  AI agent memory
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">
                GDPR compliant in one click. Continuously detect and remove personal data from your AI coworkers&apos; conversation history without breaking agent capabilities.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors text-base"
                >
                  Start free trial — 1 agent free
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-card-hover transition-colors text-base"
                >
                  See how it works
                </Link>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-xl border border-border p-5">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{s.value}</div>
                  <div className="text-sm text-muted mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Your AI agents are collecting data you can&apos;t manually delete
              </h2>
              <p className="mt-4 text-lg text-muted">
                Every conversation adds PII to your agent&apos;s memory — names, emails, phone numbers, addresses. One GDPR deletion request and you&apos;re manually searching thousands of conversation chains.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "PII accumulation",
                  desc: "Agent memory grows unbounded with personal data buried across conversation chains that are impossible to audit manually.",
                  color: "text-red-500",
                  bg: "bg-red-50",
                },
                {
                  title: "Compliance risk",
                  desc: "GDPR Article 17 requires data deletion on request. Without tooling, you can't prove you've removed all instances of a user's data.",
                  color: "text-amber-500",
                  bg: "bg-amber-50",
                },
                {
                  title: "Memory bloat",
                  desc: "Redundant context inflates token costs and degrades agent performance. 60% of stored memory is typically unnecessary.",
                  color: "text-orange-500",
                  bg: "bg-orange-50",
                },
              ].map((item) => (
                <div key={item.title} className={`${item.bg} rounded-xl p-6 border border-border`}>
                  <div className={`text-sm font-semibold ${item.color} uppercase tracking-wide mb-2`}>
                    {item.title}
                  </div>
                  <p className="text-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Continuous memory hygiene for persistent AI coworkers
              </h2>
              <p className="mt-4 text-lg text-muted">
                MemoryGuard automatically detects and scrubs PII from agent memory while preserving the business context your agents need to function.
              </p>
            </div>

            {/* Dashboard preview */}
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="border-b border-border px-6 py-4 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-sm text-muted font-mono">app.memoryguard.io/dashboard</div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Memory Hygiene Score", value: "94/100", color: "text-accent" },
                    { label: "PII Detected Today", value: "127", color: "text-amber-500" },
                    { label: "Auto-Scrubbed", value: "124", color: "text-primary" },
                    { label: "Memory Reduction", value: "43%", color: "text-accent" },
                  ].map((m) => (
                    <div key={m.label} className="bg-background rounded-lg p-4 border border-border">
                      <div className="text-xs text-muted mb-1">{m.label}</div>
                      <div className={`text-xl font-bold ${m.color}`}>{m.value}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    { type: "Email", example: "j***@company.com", agent: "Support Agent #3", status: "Scrubbed", time: "2m ago" },
                    { type: "Phone", example: "+1 (555) ***-**42", agent: "Sales Agent #1", status: "Scrubbed", time: "5m ago" },
                    { type: "Name", example: "J*** D***", agent: "Onboarding Agent", status: "Review", time: "8m ago" },
                    { type: "Address", example: "*** Elm St, ***", agent: "Support Agent #1", status: "Scrubbed", time: "12m ago" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 rounded-lg bg-background border border-border text-sm">
                      <div className="flex items-center gap-4">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">{row.type}</span>
                        <span className="text-muted font-mono text-xs">{row.example}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-4">
                        <span className="text-muted">{row.agent}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${row.status === "Scrubbed" ? "bg-accent/10 text-accent" : "bg-amber-100 text-amber-600"}`}>
                          {row.status}
                        </span>
                        <span className="text-muted text-xs">{row.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Three steps to clean agent memory
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.num} className="relative">
                  <div className="text-5xl font-bold text-primary/15 mb-3">{step.num}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Works with your agent framework
            </h2>
            <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
              Native integrations with all major agent frameworks. Connect in under 5 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {integrations.map((name) => (
                <div key={name} className="px-5 py-3 rounded-xl border border-border bg-white text-sm font-medium text-foreground hover:border-primary/40 transition-colors">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing preview */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Simple per-agent pricing
              </h2>
              <p className="mt-4 text-lg text-muted">Start free with one agent. Scale as your fleet grows.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "Free",
                  desc: "1 agent",
                  features: ["1 agent included", "Basic PII detection", "Weekly hygiene runs", "Community support"],
                  cta: "Get started free",
                  highlight: false,
                },
                {
                  name: "Pro",
                  price: "$29",
                  desc: "per agent / month",
                  features: ["Unlimited agents", "ML-powered detection", "Custom PII rules", "Daily runs + on-demand", "Audit trail & reports", "Priority support"],
                  cta: "Start free trial",
                  highlight: true,
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  desc: "volume pricing",
                  features: ["Everything in Pro", "HIPAA BAA", "SSO & SCIM", "Dedicated support", "Custom integrations", "SLA guarantee"],
                  cta: "Contact sales",
                  highlight: false,
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border p-6 flex flex-col ${
                    plan.highlight
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 ring-1 ring-primary/20"
                      : "border-border bg-white"
                  }`}
                >
                  <div className="text-sm font-semibold text-muted uppercase tracking-wide">{plan.name}</div>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.desc !== "1 agent" && (
                      <span className="text-sm text-muted ml-1">/ {plan.desc}</span>
                    )}
                  </div>
                  {plan.desc === "1 agent" && <div className="text-sm text-muted mt-1">{plan.desc}</div>}
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.name === "Enterprise" ? "/pricing" : "/dashboard"}
                    className={`mt-6 block text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${
                      plan.highlight
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "border border-border text-foreground hover:bg-card-hover"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / Compliance */}
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Enterprise-grade security and compliance
            </h2>
            <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
              Audit-ready from day one. Every scrub is logged, every deletion is verifiable.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {badges.map((b) => (
                <div key={b.name} className="flex items-center gap-3 px-6 py-4 rounded-xl border border-border bg-white">
                  <span className="text-2xl">{b.icon}</span>
                  <span className="font-semibold text-foreground">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-br from-primary to-accent p-10 sm:p-14 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Start your free trial with a single agent
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                No credit card required. See your first hygiene report in under 5 minutes.
              </p>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
