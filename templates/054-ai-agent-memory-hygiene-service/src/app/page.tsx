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

const checklistItems = [
  { q: "Can you locate every PII instance across all agent conversation logs?", risk: "GDPR Art. 15 — Right of Access" },
  { q: "Can you delete a specific user's data from agent memory within 30 days?", risk: "GDPR Art. 17 — Right to Erasure" },
  { q: "Do you have an audit trail proving what was deleted and when?", risk: "GDPR Art. 5(2) — Accountability" },
  { q: "Are agent memory stores included in your data processing records?", risk: "GDPR Art. 30 — Records of Processing" },
  { q: "Can you export all PII an agent has collected about a single user?", risk: "GDPR Art. 20 — Data Portability" },
  { q: "Do you scrub PII from agent context windows before they reach the LLM?", risk: "Data minimization risk" },
  { q: "Is your scrubbing process automated, or does it depend on manual review?", risk: "Operational scalability risk" },
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
                GDPR-safe memory hygiene for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  AI agents
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">
                Your AI coworkers store PII in every conversation. MemoryGuard continuously detects, scrubs, and proves deletion — so you pass audits without manual log searches.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors text-base"
                >
                  Start free trial — 1 agent included
                </Link>
                <Link
                  href="#compliance-checklist"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-card-hover transition-colors text-base"
                >
                  Check your GDPR readiness
                </Link>
              </div>
              <p className="mt-3 text-sm text-muted">No credit card required. First hygiene report in under 5 minutes.</p>
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

        {/* Before / After evidence */}
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                See what a scrub actually does
              </h2>
              <p className="mt-4 text-lg text-muted">
                MemoryGuard preserves agent capability while removing every PII trace. Here&apos;s real output from a support agent&apos;s memory.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Before */}
              <div className="rounded-2xl border border-red-200 bg-red-50/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-red-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-sm font-semibold text-red-600">Before — Raw agent memory</span>
                </div>
                <div className="p-5 font-mono text-sm leading-relaxed text-foreground space-y-3">
                  <p>User <mark className="bg-red-200/60 rounded px-0.5">John Martinez</mark> called about order #4821. Email: <mark className="bg-red-200/60 rounded px-0.5">john.m@acmecorp.com</mark>. Phone: <mark className="bg-red-200/60 rounded px-0.5">+1 (415) 555-0173</mark>. Shipping to <mark className="bg-red-200/60 rounded px-0.5">742 Evergreen Terrace, Springfield IL 62704</mark>.</p>
                  <p>Resolved: refund issued for defective item. User prefers email follow-up.</p>
                </div>
              </div>

              {/* After */}
              <div className="rounded-2xl border border-accent/30 bg-emerald-50/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-accent/30 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm font-semibold text-accent">After — Scrubbed memory</span>
                </div>
                <div className="p-5 font-mono text-sm leading-relaxed text-foreground space-y-3">
                  <p>User <span className="px-1 py-0.5 rounded bg-accent/15 text-accent font-semibold">[REDACTED]</span> called about order #4821. Email: <span className="px-1 py-0.5 rounded bg-accent/15 text-accent font-semibold">[REDACTED]</span>. Phone: <span className="px-1 py-0.5 rounded bg-accent/15 text-accent font-semibold">[REDACTED]</span>. Shipping to <span className="px-1 py-0.5 rounded bg-accent/15 text-accent font-semibold">[REDACTED]</span>.</p>
                  <p>Resolved: refund issued for defective item. User prefers email follow-up.</p>
                </div>
                <div className="px-5 py-3 border-t border-accent/30 flex flex-wrap gap-3 text-xs text-muted">
                  <span>4 PII fields scrubbed</span>
                  <span className="text-border">|</span>
                  <span>Business context preserved</span>
                  <span className="text-border">|</span>
                  <span>Audit log generated</span>
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
            <div className="mt-12 text-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors text-base"
              >
                Start free trial — connect your first agent
              </Link>
            </div>
          </div>
        </section>

        {/* GDPR Readiness Checklist */}
        <section id="compliance-checklist" className="py-20 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Is your AI agent stack GDPR-ready?
              </h2>
              <p className="mt-4 text-lg text-muted">
                7 questions compliance teams ask before an audit. If you can&apos;t answer &ldquo;yes&rdquo; to all of them, you have a gap.
              </p>
            </div>
            <ol className="space-y-4">
              {checklistItems.map((item, i) => (
                <li key={i} className="flex gap-4 items-start bg-white rounded-xl border border-border p-5">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-foreground font-medium leading-snug">{item.q}</p>
                    <p className="text-sm text-muted mt-1">{item.risk}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-xl bg-primary/5 border border-primary/20 p-6 text-center">
              <p className="text-foreground font-medium">MemoryGuard automates all 7 — connect one agent and see your readiness score in minutes.</p>
              <Link
                href="/dashboard"
                className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors text-base"
              >
                Run a free compliance scan
              </Link>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-20 sm:py-24 bg-white">
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
        <section className="py-20 sm:py-24">
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
                  cta: "Request compliance demo",
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
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Enterprise-grade security and compliance
              </h2>
              <p className="text-lg text-muted">
                Audit-ready from day one. Every scrub is logged, every deletion is verifiable.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {badges.map((b) => (
                <div key={b.name} className="flex items-center gap-3 px-6 py-4 rounded-xl border border-border bg-white">
                  <span className="text-2xl">{b.icon}</span>
                  <span className="font-semibold text-foreground">{b.name}</span>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Immutable audit logs",
                  desc: "Every scrub, scan, and deletion is recorded with timestamps, agent IDs, and PII categories — exportable as PDF or CSV for auditors.",
                },
                {
                  title: "Zero data retention",
                  desc: "MemoryGuard processes memory in-stream. PII is identified and scrubbed without storing raw conversation data on our servers.",
                },
                {
                  title: "Deletion certificates",
                  desc: "Generate per-user deletion certificates that prove GDPR Art. 17 compliance — ready to share with DPOs and regulators.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-background rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
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
                See your first compliance report in 5 minutes
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                Connect one agent, run the scan, and get a full PII audit with deletion proof. No credit card required.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
                >
                  Start free trial
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Request compliance demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
