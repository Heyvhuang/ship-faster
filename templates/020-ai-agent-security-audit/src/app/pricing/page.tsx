import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for AI agent security audits. Per-audit and subscription plans available.",
};

const plans = [
  {
    name: "Single Audit",
    price: "$1,499",
    period: "per audit",
    description: "Perfect for pre-launch security validation",
    features: [
      "50+ prompt injection attack vectors",
      "Data leakage detection scan",
      "Sandbox escape testing",
      "Detailed PDF security report",
      "1 free re-test after fixes",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$3,999",
    period: "per month",
    description: "For teams shipping AI agents regularly",
    features: [
      "Everything in Single Audit",
      "Up to 5 audits per month",
      "CI/CD pipeline integration",
      "Unlimited re-tests",
      "Priority 12-hour report delivery",
      "Dedicated Slack channel",
      "Monthly security briefing call",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual contract",
    description: "For organizations with complex AI deployments",
    features: [
      "Everything in Growth",
      "Unlimited audits",
      "Custom attack vector development",
      "On-premise scanner deployment",
      "SOC 2 compliance reporting",
      "Dedicated security engineer",
      "24/7 emergency response",
      "Executive security dashboard",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "What counts as one audit?",
    a: "One audit covers a single AI agent endpoint or chatbot deployment. If you have multiple agents (e.g., customer service bot and sales bot), each requires a separate audit.",
  },
  {
    q: "How long does an audit take?",
    a: "Automated scanning completes within 2-4 hours. With expert review and report generation, you'll receive your full report within 24 hours (12 hours for Growth subscribers).",
  },
  {
    q: "Do you need access to our source code?",
    a: "No. We perform black-box testing against your agent's API endpoint or public-facing interface. No source code access required, though providing it enables deeper analysis.",
  },
  {
    q: "What if we find no vulnerabilities?",
    a: "That's great! You'll still receive a full report documenting all tests performed and confirming your agent passed. This is valuable for compliance documentation.",
  },
  {
    q: "Can we cancel the subscription anytime?",
    a: "Yes, Growth subscriptions can be cancelled anytime. You'll retain access until the end of your billing period. Enterprise contracts follow the terms agreed upon.",
  },
];

export default function Pricing() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-muted">
            Pay per audit or subscribe for ongoing monitoring. No hidden fees.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-8 ${
                plan.highlighted
                  ? "border-accent-blue bg-accent-blue/5"
                  : "border-card-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-blue px-4 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="mt-1 text-sm text-muted">{plan.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="ml-2 text-sm text-muted">{plan.period}</span>
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 text-accent-green">✓</span>
                    <span className="text-muted">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 block rounded-lg py-3 text-center text-sm font-medium transition ${
                  plan.highlighted
                    ? "bg-accent-blue text-white hover:bg-accent-blue/90"
                    : "border border-card-border text-foreground hover:bg-card-border/20"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-20 max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-card-border bg-card p-6"
              >
                <h3 className="font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
