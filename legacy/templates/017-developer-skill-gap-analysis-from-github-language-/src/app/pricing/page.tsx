import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — DevGap",
  description:
    "Simple pricing for GitHub-powered skill gap analysis. $299/month per team.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    desc: "One-time analysis for public repos",
    features: [
      "1 GitHub org analysis",
      "Public repos only",
      "Basic skill gap report",
      "Top 5 language breakdown",
      "Community support",
    ],
    cta: "Get Started",
    href: "/results",
    highlight: false,
  },
  {
    name: "Team",
    price: "$299",
    period: "/month",
    desc: "Ongoing analysis for scaling teams",
    features: [
      "Unlimited analyses",
      "Private repo access",
      "Full skill gap dashboard",
      "Individual team member profiles",
      "Monthly trend reports",
      "Hiring priority recommendations",
      "Slack & email notifications",
      "Priority support",
    ],
    cta: "Start Free Trial",
    href: "/results",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For multi-team organizations",
    features: [
      "Everything in Team",
      "Multiple orgs & teams",
      "SSO & SAML",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom reporting",
    ],
    cta: "Contact Sales",
    href: "/results",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Simple, transparent pricing
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-400">
          Start free with public repos. Upgrade when you need private repo
          access and ongoing monitoring.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-6 ${
              plan.highlight
                ? "border-green-600 bg-green-950/30"
                : "border-gray-800 bg-gray-900/50"
            }`}
          >
            {plan.highlight && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-green-400">
                Most Popular
              </p>
            )}
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.period && (
                <span className="text-sm text-gray-400">{plan.period}</span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-400">{plan.desc}</p>
            <Link
              href={plan.href}
              className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-semibold ${
                plan.highlight
                  ? "bg-green-600 text-white hover:bg-green-500"
                  : "border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
              }`}
            >
              {plan.cta}
            </Link>
            <ul className="mt-6 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center">
        <h3 className="text-xl font-bold">Not sure which plan is right?</h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-gray-400">
          Start with a free analysis of your public repos. Most teams upgrade
          after seeing their first skill gap report.
        </p>
        <Link
          href="/results"
          className="mt-6 inline-block rounded-lg bg-green-600 px-8 py-3 text-sm font-semibold text-white hover:bg-green-500"
        >
          Try Free Analysis
        </Link>
      </div>
    </div>
  );
}
