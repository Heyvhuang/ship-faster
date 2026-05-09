import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — DREAM Eval",
  description:
    "Flexible per-evaluation pricing for AI research agent benchmarking. From quick assessments to full enterprise evaluations.",
};

const tiers = [
  {
    name: "Quick Eval",
    price: "$500",
    per: "per agent",
    desc: "Fast assessment against core DREAM metrics with a standard task suite.",
    features: [
      "10 evaluation scenarios",
      "5 DREAM metric scores",
      "Summary report (PDF)",
      "24-hour turnaround",
      "1 agent per evaluation",
    ],
    cta: "Start Quick Eval",
    highlight: false,
  },
  {
    name: "Standard Eval",
    price: "$1,200",
    per: "per agent",
    desc: "Comprehensive evaluation with reasoning traces and domain-specific suites.",
    features: [
      "25 evaluation scenarios",
      "5 DREAM metric scores + sub-metrics",
      "Reasoning trace visualization",
      "Domain-specific task suites",
      "Side-by-side comparison (up to 3 agents)",
      "Interactive dashboard + PDF + JSON",
      "Improvement recommendations",
    ],
    cta: "Start Standard Eval",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$2,000+",
    per: "per agent",
    desc: "Full-depth evaluation with custom scenarios, dedicated support, and API access.",
    features: [
      "50+ custom scenarios",
      "Custom metric weighting",
      "API access for CI/CD integration",
      "Unlimited agent comparisons",
      "Dedicated evaluation engineer",
      "Priority 12-hour turnaround",
      "Custom reporting & white-label",
      "SOC 2 compliant infrastructure",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What counts as one evaluation?",
    a: "One evaluation covers a single agent version run through a complete task suite. Re-runs of the same agent version with different parameters count as separate evaluations.",
  },
  {
    q: "Can I evaluate my agent via API?",
    a: "Yes. Our REST API supports programmatic agent submission, evaluation triggering, and result retrieval. API access is included in Enterprise and available as an add-on for Standard.",
  },
  {
    q: "What frameworks do you support?",
    a: "We support any agent accessible via HTTP endpoint. We have native integrations for LangChain, AutoGen, CrewAI, and custom Python agents. Bring-your-own-trace upload is also supported.",
  },
  {
    q: "How are DREAM scores calibrated?",
    a: "DREAM metrics are calibrated against expert human judgments with inter-annotator agreement κ = 0.87. We continuously validate scoring rubrics against a held-out dataset of 500+ expert-annotated research tasks.",
  },
  {
    q: "Do you offer volume discounts?",
    a: "Yes. Teams evaluating 5+ agents per month receive 20% off. Annual commitments include additional savings. Contact sales for custom pricing.",
  },
];

export default function Pricing() {
  return (
    <div className="pt-28 pb-20">
      <section className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Pricing</h1>
        <p className="mt-4 text-lg text-muted">
          Per-evaluation pricing. No subscriptions. Pay only when you benchmark.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-xl border p-6 transition ${
                t.highlight
                  ? "border-accent bg-card shadow-lg shadow-accent/5"
                  : "border-card-border bg-card hover:border-accent/40"
              }`}
            >
              {t.highlight && (
                <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent-bright">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <div className="mt-2">
                <span className="font-mono text-4xl font-bold">{t.price}</span>
                <span className="ml-1 text-sm text-muted">{t.per}</span>
              </div>
              <p className="mt-3 text-sm text-muted">{t.desc}</p>
              <ul className="mt-6 flex flex-col gap-2">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 text-accent">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 block rounded-lg px-6 py-2.5 text-center text-sm font-medium transition ${
                  t.highlight
                    ? "bg-accent text-white hover:bg-accent-bright"
                    : "border border-card-border text-muted hover:border-accent hover:text-foreground"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto mt-24 max-w-3xl px-6">
        <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-6">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-lg border border-card-border bg-card p-5">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
