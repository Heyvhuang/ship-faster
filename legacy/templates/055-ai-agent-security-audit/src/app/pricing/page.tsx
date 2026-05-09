import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — AgentShield",
  description: "Simple, transparent pricing for AI agent security audits. Per-audit and subscription plans available.",
};

const plans = [
  {
    name: "Single Audit",
    price: "$2,500",
    period: "per audit",
    description: "Perfect for pre-launch security validation of a single AI agent.",
    features: [
      "50+ automated attack vectors",
      "Manual expert review",
      "Detailed PDF report",
      "Severity-rated findings",
      "Remediation guidance",
      "30-minute consultation call",
      "One free re-test within 30 days",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Continuous",
    price: "$1,800",
    period: "per month",
    description: "Ongoing security monitoring for teams shipping AI features regularly.",
    features: [
      "Everything in Single Audit",
      "Monthly automated scans",
      "Unlimited re-testing",
      "Priority 24h report delivery",
      "Dedicated security advisor",
      "Slack/email alert integration",
      "Up to 3 agents covered",
      "Quarterly trend reports",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual contract",
    description: "For organizations with multiple agents and compliance requirements.",
    features: [
      "Everything in Continuous",
      "Unlimited agents",
      "Custom attack vector development",
      "Compliance documentation (SOC 2, ISO 27001)",
      "On-site security training",
      "SLA-backed response times",
      "Dedicated account manager",
      "API access for CI/CD integration",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What kind of AI agents do you audit?",
    a: "We audit any AI agent — customer service chatbots, internal copilots, autonomous coding agents, retrieval-augmented generation systems, and more. If it takes natural language input and produces actions or responses, we can test it.",
  },
  {
    q: "How long does an audit take?",
    a: "Automated scanning completes in 2-4 hours. With manual expert review and report generation, you'll receive your full report within 24 hours (48 hours max for complex multi-agent systems).",
  },
  {
    q: "Do you need access to our source code?",
    a: "No. We test from the outside, just like an attacker would. We only need an API endpoint or accessible demo URL. However, if you'd like a deeper white-box audit, we can work with source code access as well.",
  },
  {
    q: "What happens if you find critical vulnerabilities?",
    a: "We immediately notify your team via your preferred channel (Slack, email, or phone) with a preliminary finding. The full report follows within 24 hours with detailed remediation steps.",
  },
];

export default function PricingPage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-white">Simple, Transparent Pricing</h1>
          <p className="mt-4 text-lg text-slate-400">
            Secure your AI agents before they go live. No hidden fees.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-8 ${
                plan.highlight
                  ? "border-blue-500 bg-[#111827] ring-1 ring-blue-500/50"
                  : "border-[#1e293b] bg-[#111827]"
              }`}
            >
              {plan.highlight && (
                <div className="mb-4 text-xs font-bold uppercase tracking-wider text-blue-400">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="ml-2 text-slate-500">/ {plan.period}</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">{plan.description}</p>
              <Link
                href="/contact"
                className={`mt-6 block rounded-lg py-3 text-center text-sm font-medium transition-colors ${
                  plan.highlight
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "border border-[#1e293b] text-slate-300 hover:border-slate-500"
                }`}
              >
                {plan.cta}
              </Link>
              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="mt-0.5 text-green-500">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-24 max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-[#1e293b] bg-[#111827] p-6">
                <h3 className="font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-sm text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
