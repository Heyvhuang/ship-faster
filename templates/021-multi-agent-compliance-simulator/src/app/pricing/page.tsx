import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — AgentGuard",
  description: "Pilot-to-production pricing designed to bypass lengthy procurement. Start with pay-per-simulation credits.",
};

const plans = [
  {
    name: "Pilot",
    price: "$0",
    unit: "for 14 days",
    description: "Prove SEC-risk reduction before any commitment",
    highlight: false,
    features: [
      "Up to 3 agents per simulation",
      "500 simulation credits",
      "Reg SHO + Reg NMS rule engines",
      "Basic audit trail export (PDF)",
      "Email support",
      "On-premise Docker deployment",
    ],
    cta: "Start Free Pilot",
  },
  {
    name: "Professional",
    price: "$2,400",
    unit: "/month",
    description: "For teams actively testing AI trading agents",
    highlight: true,
    features: [
      "Up to 15 agents per simulation",
      "10,000 simulation credits/mo",
      "All regulation rule engines",
      "Full audit trail (PDF, JSON, API)",
      "Violation replay mode",
      "Priority support + Slack channel",
      "SOC 2 Type II compliance",
      "Custom agent framework support",
    ],
    cta: "Start Professional",
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "",
    description: "For regulated institutions at scale",
    highlight: false,
    features: [
      "50+ agents per simulation",
      "Unlimited simulation credits",
      "Custom rule engine configuration",
      "Direct GRC platform integration",
      "Dedicated compliance engineer",
      "SLA-backed 99.9% uptime",
      "Air-gapped deployment option",
      "Regulatory submission support",
    ],
    cta: "Contact Sales",
  },
];

const addons = [
  { name: "Additional Simulation Credits", price: "$0.12/credit", desc: "Pay-per-simulation for burst testing" },
  { name: "Custom Rule Engine", price: "$800/mo", desc: "Jurisdiction-specific compliance rules" },
  { name: "Compliance Engineer Hours", price: "$300/hr", desc: "Expert review of simulation results" },
];

export default function PricingPage() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-1.5">
            <span className="font-mono text-xs text-emerald">NO PROCUREMENT REQUIRED</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pilot-to-production pricing
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Start with a free on-premise pilot. Pay only after AgentGuard proves SEC-risk reduction
            for your trading agents. Usage-based billing starts at first detected violation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-8 ${
                plan.highlight
                  ? "border-crimson bg-crimson/5 relative"
                  : "border-card-border bg-card"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-crimson px-3 py-1 text-xs font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}
              <h2 className="font-mono text-sm text-muted mb-2">{plan.name}</h2>
              <div className="mb-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.unit && <span className="text-muted ml-1">{plan.unit}</span>}
              </div>
              <p className="text-sm text-muted mb-6">{plan.description}</p>
              <Link
                href="/simulator"
                className={`block w-full rounded-lg px-4 py-3 text-center text-sm font-medium transition-colors mb-8 ${
                  plan.highlight
                    ? "bg-crimson text-white hover:bg-crimson/90"
                    : "border border-card-border text-foreground hover:bg-card"
                }`}
              >
                {plan.cta}
              </Link>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg
                      className="mt-0.5 shrink-0 text-emerald"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 8l3 3 7-7" />
                    </svg>
                    <span className="text-muted">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-8 text-center">Add-ons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {addons.map((addon) => (
              <div key={addon.name} className="rounded-xl border border-card-border bg-card p-6">
                <h3 className="font-semibold mb-1">{addon.name}</h3>
                <p className="font-mono text-sm text-crimson mb-2">{addon.price}</p>
                <p className="text-xs text-muted">{addon.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Volume Discounts */}
        <div className="rounded-xl border border-card-border bg-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Annual licensing available</h2>
          <p className="text-muted max-w-xl mx-auto mb-6">
            Lock in pricing with an annual license triggered only after your pilot proves
            SEC-risk reduction. Save 20% compared to monthly billing.
          </p>
          <Link
            href="/simulator"
            className="inline-block rounded-lg border border-card-border px-6 py-3 text-sm font-medium hover:bg-card transition-colors"
          >
            Talk to Sales
          </Link>
        </div>
      </div>
    </div>
  );
}
