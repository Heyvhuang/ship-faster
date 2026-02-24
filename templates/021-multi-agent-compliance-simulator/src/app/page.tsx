import Link from "next/link";
import { SimulationDemo } from "@/components/simulation-demo";
import { RiskCalculator } from "@/components/risk-calculator";

const logos = [
  "Citadel Securities",
  "Two Sigma",
  "Jane Street",
  "DE Shaw",
  "Bridgewater",
  "Point72",
];

const quotes = [
  {
    text: "AgentGuard caught a spoofing pattern our internal QA missed entirely. We avoided a potential $12M fine.",
    author: "Sarah Chen",
    role: "Chief Compliance Officer",
    company: "Apex Capital Partners",
  },
  {
    text: "The multi-agent simulation revealed collusion behaviors we never would have anticipated. Essential for SEC readiness.",
    author: "Michael Torres",
    role: "VP of Regulatory Affairs",
    company: "Quantum Trading Systems",
  },
  {
    text: "We went from 6 months of manual compliance testing to 2 weeks. The audit trail output is exactly what regulators want.",
    author: "Dr. Priya Sharma",
    role: "Head of AI Risk",
    company: "NovaBridge Financial",
  },
];

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Multi-Agent Sandbox",
    description: "Configure 3+ agents with custom trading strategies, risk tolerances, and decision logic to simulate real market conditions.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Emergent Behavior Detection",
    description: "Proprietary algorithms detect market manipulation patterns including spoofing, layering, and coordinated wash trading.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
    title: "SEC Rule Engine",
    description: "Pre-loaded with Reg SHO, Reg NMS, MAR, and latest SEC trading compliance requirements. Updated within 48 hours of rule changes.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    title: "Audit Trail Generation",
    description: "Auto-generate compliance reports formatted for regulatory submission. Every agent decision is logged and traceable.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    title: "Violation Replay Mode",
    description: "Step through exact moments when agents deviated from compliance. Frame-by-frame analysis of emergent violations.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Thousands of Scenarios",
    description: "Run simulations across thousands of multi-agent interaction scenarios in parallel. Results in minutes, not months.",
  },
];

const faqs = [
  {
    q: "How does the on-premise pilot avoid legal review delays?",
    a: "Our pilot program runs entirely within your infrastructure using Docker containers. No data leaves your network, which means your legal team doesn't need to review data processing agreements. Most teams go from first call to running simulations in under 5 business days.",
  },
  {
    q: "What types of emergent behaviors can AgentGuard detect?",
    a: "Our detection algorithms cover spoofing, layering, wash trading, quote stuffing, momentum ignition, and coordinated front-running. We also detect novel patterns through anomaly detection that flags behaviors not yet classified by regulators.",
  },
  {
    q: "How does this differ from single-agent testing tools?",
    a: "Existing tools test agents in isolation. But compliance violations often emerge only when multiple agents interact — Agent A's legitimate strategy combined with Agent B's creates a pattern that looks like market manipulation. AgentGuard is the only tool that simulates these multi-agent dynamics.",
  },
  {
    q: "What format are the audit reports in?",
    a: "Reports are generated in SEC-standard format including OATS-compatible timestamps, full decision tree logs, and CAT-reportable event sequences. Export as PDF, JSON, or directly to your GRC platform via API.",
  },
  {
    q: "Can we use our own agent configurations?",
    a: "Yes. Upload your agent prompts, decision logic parameters, and trading strategy configurations directly. We support all major LLM frameworks including LangChain, AutoGen, CrewAI, and custom implementations.",
  },
  {
    q: "What's the minimum simulation size?",
    a: "You can simulate from 2 to 50+ agents simultaneously. We recommend starting with 3-agent scenarios that mirror your production setup, then scaling to stress-test with larger agent populations.",
  },
];

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,38,38,0.15)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-crimson animate-pulse-glow" />
              <span className="font-mono text-xs text-crimson">COMPLIANCE THREAT DETECTED</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Stop emergent AI violations{" "}
              <span className="text-crimson">before the SEC does</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl mb-10">
              Simulate multi-agent AI societies to detect compliance violations
              before production deployment. The pre-deployment safety layer for
              regulated enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/simulator"
                className="rounded-lg bg-crimson px-6 py-3 text-center font-medium text-white hover:bg-crimson/90 transition-colors"
              >
                Launch Free Simulation
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg border border-card-border px-6 py-3 text-center font-medium text-foreground hover:bg-card transition-colors"
              >
                View Live Dashboard
              </Link>
            </div>
          </div>

          {/* Terminal preview */}
          <div className="mt-16 rounded-xl border border-card-border bg-card p-1">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-card-border">
              <span className="h-3 w-3 rounded-full bg-crimson/60" />
              <span className="h-3 w-3 rounded-full bg-amber/60" />
              <span className="h-3 w-3 rounded-full bg-emerald/60" />
              <span className="ml-4 font-mono text-xs text-muted">agentguard — simulation-output</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-2 overflow-x-auto">
              <p className="text-emerald">[00:00:01] Initializing 3-agent trading simulation...</p>
              <p className="text-muted">[00:00:02] Agent-Alpha: Market maker strategy loaded (spread: 0.02%)</p>
              <p className="text-muted">[00:00:02] Agent-Beta: Momentum strategy loaded (window: 5min)</p>
              <p className="text-muted">[00:00:02] Agent-Gamma: Arbitrage strategy loaded (threshold: 0.1%)</p>
              <p className="text-emerald">[00:00:03] SEC Rule Engine v3.2.1 — 847 rules loaded</p>
              <p className="text-emerald">[00:00:05] Running scenario batch 1/1000...</p>
              <p className="text-amber">[00:12:34] ⚠ RISK: Agent-Alpha and Agent-Beta showing correlated order patterns (r=0.87)</p>
              <p className="text-crimson">[00:15:22] ✖ VIOLATION: Emergent spoofing pattern detected — Reg SHO §242.200(a)</p>
              <p className="text-crimson">[00:15:22] ✖ Agent-Alpha placing and canceling orders at 94% rate when Agent-Beta is active</p>
              <p className="text-amber">[00:18:45] ⚠ RISK: Agent-Gamma front-running detected via information leakage (confidence: 78%)</p>
              <p className="text-crimson">[00:23:11] ✖ VIOLATION: Coordinated layering pattern — Reg NMS Rule 610</p>
              <p className="text-muted">[00:30:00] Simulation complete. 2 violations, 2 risks across 1000 scenarios.</p>
              <p className="text-emerald">[00:30:01] Audit report generated: /reports/sim-2026-02-24-001.pdf</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-card-border bg-card/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-center text-sm text-muted mb-8">
            Trusted by compliance teams at leading quantitative trading firms
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {logos.map((logo) => (
              <span key={logo} className="font-mono text-sm text-muted/60 whitespace-nowrap">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {quotes.map((q) => (
            <div
              key={q.author}
              className="rounded-xl border border-card-border bg-card p-8"
            >
              <p className="text-sm text-foreground/90 mb-6 leading-relaxed">
                &ldquo;{q.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold">{q.author}</p>
                <p className="text-xs text-muted">{q.role}</p>
                <p className="text-xs text-muted">{q.company}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="border-y border-card-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See collusion detection in real-time
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Watch a 3-agent simulation detect emergent market manipulation.
              Each node represents an agent; red connections indicate violation patterns.
            </p>
          </div>
          <SimulationDemo />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for multi-agent compliance
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Purpose-built for regulated enterprises deploying AI trading agents.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-card-border bg-card p-8 hover:border-crimson/30 transition-colors"
            >
              <div className="text-crimson mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* User Flow */}
      <section className="border-y border-card-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From upload to compliance report in 5 steps
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: "01", title: "Upload", desc: "Import agent prompts and decision logic parameters" },
              { step: "02", title: "Configure", desc: "Set regulatory constraints for SEC trading rules" },
              { step: "03", title: "Simulate", desc: "Run thousands of multi-agent interaction scenarios" },
              { step: "04", title: "Review", desc: "Examine flagged violations in timeline view" },
              { step: "05", title: "Export", desc: "Generate compliance reports for legal review" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-crimson/40 bg-crimson/10">
                  <span className="font-mono text-sm text-crimson font-bold">{s.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-xs text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Calculator */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Calculate your compliance risk exposure
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Quantify the cost of post-deployment compliance failure for your AI trading systems.
          </p>
        </div>
        <RiskCalculator />
      </section>

      {/* FAQ */}
      <section className="border-t border-card-border bg-card/30">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-card-border bg-card p-6"
              >
                <h3 className="font-semibold mb-3">{faq.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-2xl border border-crimson/30 bg-crimson/5 p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don&apos;t wait for the SEC to find your violations
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            Start your free pilot simulation today. No procurement required.
            On-premise deployment available.
          </p>
          <Link
            href="/simulator"
            className="inline-block rounded-lg bg-crimson px-8 py-3 font-medium text-white hover:bg-crimson/90 transition-colors"
          >
            Start Free Simulation
          </Link>
        </div>
      </section>
    </div>
  );
}
