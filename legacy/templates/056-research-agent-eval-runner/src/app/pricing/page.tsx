import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Radar",
  description: "Simple pay-per-evaluation pricing for AI research benchmarks.",
};

const tiers = [
  {
    name: "Starter",
    price: "$49",
    evals: "100 evals",
    per: "$0.49/eval",
    features: [
      "All 5 ResearchGym benchmarks",
      "JSON result export",
      "2 concurrent evals",
      "Email notifications",
      "7-day result retention",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$199",
    evals: "500 evals",
    per: "$0.40/eval",
    features: [
      "Everything in Starter",
      "Webhook notifications",
      "10 concurrent evals",
      "Reasoning trace export",
      "30-day result retention",
      "Priority queue",
    ],
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Lab",
    price: "$349",
    evals: "1,000 evals",
    per: "$0.35/eval",
    features: [
      "Everything in Pro",
      "Custom benchmark requests",
      "Unlimited concurrent evals",
      "90-day result retention",
      "Dedicated Slack support",
      "Team API keys",
    ],
    cta: "Contact Us",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What counts as one evaluation?",
    a: "One evaluation = running your agent against all tasks in a single benchmark. Running against rgym-001 (12 tasks) counts as 1 eval.",
  },
  {
    q: "Can I run a subset of tasks?",
    a: "Yes. You can specify individual task IDs in the API call. A partial run still counts as 1 eval.",
  },
  {
    q: "Do credits expire?",
    a: "Credits are valid for 12 months from purchase date. Unused credits are non-refundable.",
  },
  {
    q: "Is there a free tier?",
    a: "Yes. Every account gets 5 free evals to test the platform. No credit card required.",
  },
  {
    q: "Can I request custom benchmarks?",
    a: "Lab tier customers can request benchmarks from specific papers. We aim to add new benchmarks within 2 weeks.",
  },
];

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-neon font-bold text-lg tracking-tight">
          ◈ radar
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted">
          <Link href="/docs" className="hover:text-foreground transition">
            API Docs
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-foreground transition"
          >
            Dashboard
          </Link>
          <span className="text-foreground">Pricing</span>
        </div>
      </nav>

      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Pay per evaluation
          </h1>
          <p className="text-muted max-w-md mx-auto">
            No subscriptions. Buy eval credits, use them when you need them.
            Start with 5 free evals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg p-6 border flex flex-col ${
                tier.highlight
                  ? "border-neon/50 bg-neon/5 relative"
                  : "border-border bg-surface"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-neon text-black px-3 py-0.5 rounded-full font-bold">
                  Most Popular
                </span>
              )}
              <div className="text-sm text-muted mb-1">{tier.name}</div>
              <div className="text-4xl font-bold mb-1">{tier.price}</div>
              <div className="text-sm text-muted mb-1">{tier.evals}</div>
              <div className="text-xs text-neon mb-6">{tier.per}</div>
              <ul className="space-y-2 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="text-sm text-muted flex items-start gap-2">
                    <span className="text-neon mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className={`text-center py-2.5 rounded font-medium text-sm transition ${
                  tier.highlight
                    ? "bg-neon text-black hover:bg-neon-dim"
                    : "border border-border text-muted hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">FAQ</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-border pb-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
