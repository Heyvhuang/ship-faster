import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Reproducibility Radar",
  description: "Simple pricing for ML practitioners.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Try it out with limited access",
    features: [
      "5 paper scores per month",
      "View top-20 trending papers",
      "Basic score breakdown",
      "Community access",
    ],
    cta: "Get Started",
    ctaHref: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/mo",
    description: "For serious ML practitioners",
    features: [
      "Unlimited paper scores",
      "Full score breakdown & rationale",
      "Email alerts for high-score papers",
      "Score history & bookmarks",
      "API access (100 calls/day)",
      "Priority support",
    ],
    cta: "Start Free Trial",
    ctaHref: "/signup",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/mo",
    description: "For research teams & labs",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared bookmarks & notes",
      "API access (1,000 calls/day)",
      "Custom scoring criteria",
      "Slack integration",
    ],
    cta: "Contact Us",
    ctaHref: "/signup",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-2 text-muted text-lg">
          Start free. Upgrade when you need more.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-6 ${
              plan.highlighted
                ? "border-accent bg-accent/5"
                : "border-card-border bg-card"
            }`}
          >
            {plan.highlighted && (
              <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-black mb-4">
                Most Popular
              </span>
            )}
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <div className="mt-2">
              <span className="text-3xl font-bold font-mono">{plan.price}</span>
              <span className="text-muted text-sm">{plan.period}</span>
            </div>
            <p className="text-sm text-muted mt-1">{plan.description}</p>
            <ul className="mt-6 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href={plan.ctaHref}
              className={`mt-6 block w-full rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                plan.highlighted
                  ? "bg-accent text-black hover:bg-accent/90"
                  : "border border-card-border hover:border-muted/50"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-8">FAQ</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {[
            {
              q: "How are reproducibility scores calculated?",
              a: "We analyze the paper's linked repository for code completeness, documentation quality, dependency management, CI/CD setup, and ease of running the main experiments. Each dimension is scored 0–100 and weighted equally.",
            },
            {
              q: "Can I score any ML paper?",
              a: "We support papers from arXiv, OpenReview, ACL Anthology, and most major ML venues. Paste any paper URL and we'll attempt to find and analyze the associated code.",
            },
            {
              q: "How often are scores updated?",
              a: "Scores are refreshed weekly to account for repo updates, new releases, and community contributions. You'll see the last-scored date on each paper.",
            },
            {
              q: "What if a paper's score is wrong?",
              a: "You can submit a correction request with evidence. Our team reviews disputes within 48 hours and updates scores accordingly.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-lg border border-card-border bg-card p-4"
            >
              <h3 className="font-medium">{item.q}</h3>
              <p className="text-sm text-muted mt-2">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
