"use client";

import type { Metadata } from "next";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    checks: "100 checks/mo",
    features: [
      "Single repo scoring",
      "Full score breakdown",
      "Community support",
      "Public repo access",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    checks: "1,000 checks/mo",
    features: [
      "Everything in Free",
      "Batch endpoint (50 repos/call)",
      "Webhook integration",
      "Score history & trends",
      "Priority email support",
      "Private repo access",
    ],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Team",
    price: "$99",
    period: "/month",
    checks: "Unlimited checks",
    features: [
      "Everything in Pro",
      "Batch endpoint (500 repos/call)",
      "CI/CD webhook alerts",
      "Bulk PDF reports",
      "99.9% SLA guarantee",
      "Dedicated support",
      "Custom scoring weights",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <nav className="border-b border-zinc-800/50 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm font-mono">
              RS
            </div>
            <span className="font-semibold text-lg">RepoScore</span>
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a href="/docs" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              API Docs
            </a>
            <a href="/pricing" className="text-zinc-100 font-medium">
              Pricing
            </a>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="mb-2 text-center text-4xl font-bold">
          Simple, transparent pricing
        </h1>
        <p className="mb-12 text-center text-zinc-500">
          Start free. Upgrade when your team needs more.
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 ${
                plan.highlight
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : "border-zinc-800 bg-zinc-900/30"
              }`}
            >
              {plan.highlight && (
                <div className="mb-4 text-xs font-medium text-emerald-400">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="mt-2 mb-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-zinc-500">{plan.period}</span>
              </div>
              <p className="mb-6 text-sm text-zinc-500">{plan.checks}</p>
              <ul className="mb-8 space-y-2.5 text-sm text-zinc-400">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
                  plan.highlight
                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-zinc-800 bg-zinc-900/30 p-8">
          <h2 className="mb-6 text-xl font-bold">Frequently asked questions</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                q: "What counts as a check?",
                a: "Each API call to score a single repository counts as one check. Batch requests count as one check per repo in the batch.",
              },
              {
                q: "Can I score private repos?",
                a: "Yes, on Pro and Team plans. You'll need to authorize our GitHub App to access your private repositories.",
              },
              {
                q: "How is the score calculated?",
                a: "We analyze 15+ signals across activity, maintenance, security, and community using public GitHub data. Scores are weighted and normalized to 0-100.",
              },
              {
                q: "Do unused checks roll over?",
                a: "No, check counts reset each billing cycle. Upgrade to Team for unlimited checks.",
              },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="mb-1.5 text-sm font-semibold">{faq.q}</h3>
                <p className="text-sm text-zinc-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
