import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — ContextLens",
  description: "Simple pricing for agent context debugging. Free for solo devs, affordable for teams.",
};

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </div>
      <span className="font-mono font-bold text-lg text-foreground">ContextLens</span>
    </Link>
  );
}

const plans = [
  {
    name: "Solo",
    price: "Free",
    period: "",
    description: "For individual agent developers",
    features: [
      "Up to 5 sessions",
      "Context segment visualizer",
      "Real-time token counter",
      "Basic bottleneck alerts",
      "System prompt inspector",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Team",
    price: "$29",
    period: "/mo",
    description: "For teams building production agents",
    features: [
      "Unlimited sessions",
      "Everything in Solo",
      "JSON export & import",
      "Session history & comparison",
      "Team sharing & collaboration",
      "Priority support",
      "Advanced optimization hints",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    description: "For teams needing API access",
    features: [
      "Everything in Team",
      "REST API access",
      "CI/CD integration",
      "Custom alert rules",
      "SSO & audit logs",
      "Dedicated support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-6">
            <Link href="/debugger" className="text-sm font-medium bg-accent hover:bg-accent/80 text-white px-4 py-1.5 rounded-md transition-colors">
              Open Debugger
            </Link>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Simple, transparent pricing</h1>
            <p className="text-lg text-muted max-w-xl mx-auto">Free for solo devs. Upgrade when your team needs collaboration and API access.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-6 border ${
                  plan.highlighted
                    ? "border-accent bg-surface shadow-lg shadow-accent/5 relative"
                    : "border-border bg-surface"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-mono px-3 py-0.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <h2 className="text-lg font-bold text-foreground mb-1">{plan.name}</h2>
                <p className="text-sm text-muted mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted">{plan.period}</span>}
                </div>
                <button
                  className={`w-full py-2.5 rounded-lg text-sm font-medium mb-6 transition-colors ${
                    plan.highlighted
                      ? "bg-accent hover:bg-accent/80 text-white"
                      : "border border-border hover:border-muted text-foreground"
                  }`}
                >
                  {plan.cta}
                </button>
                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="text-green mt-0.5 shrink-0">✓</span>
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-6">
            {[
              { q: "Which models are supported?", a: "ContextLens supports OpenAI (GPT-4, GPT-4o), Anthropic (Claude 3, Claude 4), and any model with a token-based context window. Custom model configurations are available on Team and Enterprise plans." },
              { q: "Can I use it with my existing agent framework?", a: "Yes. ContextLens works with LangChain, CrewAI, AutoGPT, and any framework that exposes API payloads. Just paste the context payload or use our API integration." },
              { q: "Is my data secure?", a: "Context data is processed client-side by default. On Team and Enterprise plans, data can optionally be stored encrypted for session history. We never train on your data." },
              { q: "Can I cancel anytime?", a: "Yes, all plans are month-to-month with no long-term contracts. Cancel anytime from your dashboard." },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-border pb-5">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <Logo />
          <div className="flex gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/debugger" className="hover:text-foreground transition-colors">Debugger</Link>
          </div>
          <span>© 2026 ContextLens. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
