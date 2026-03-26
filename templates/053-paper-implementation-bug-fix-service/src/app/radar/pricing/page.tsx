import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | Radar",
  description: "Fixed-scope pricing for paper implementation bug fixes. Pay only when the fix works.",
};

const tiers = [
  {
    name: "Quick Fix",
    price: "$500",
    turnaround: "1-2 days",
    scope: "Single isolated bug with clear reproduction steps.",
    includes: [
      "Root cause analysis",
      "Code fix with inline comments",
      "Plain-English explanation",
      "1 validation test",
      "1 round of revision",
    ],
    examples: [
      "Tensor shape mismatch",
      "Wrong activation function",
      "Incorrect loss computation",
      "Off-by-one indexing errors",
      "Wrong initialization scheme",
    ],
  },
  {
    name: "Deep Diagnosis",
    price: "$2,000",
    turnaround: "3-5 days",
    scope: "Complex bug spanning multiple components or requiring deep paper analysis.",
    popular: true,
    includes: [
      "Everything in Quick Fix",
      "Multi-component investigation",
      "Paper-to-code alignment report",
      "3 validation tests",
      "2 rounds of revision",
      "30-min walkthrough call",
    ],
    examples: [
      "Training instability / divergence",
      "Numerical precision issues",
      "Architecture misalignment with paper",
      "Incorrect gradient flow",
      "Data pipeline discrepancies",
    ],
  },
  {
    name: "Full Pipeline Review",
    price: "$5,000",
    turnaround: "1-2 weeks",
    scope: "End-to-end audit of your entire paper implementation.",
    includes: [
      "Everything in Deep Diagnosis",
      "Full codebase review",
      "Section-by-section paper alignment",
      "Comprehensive test suite",
      "Performance optimization notes",
      "Unlimited revisions (2 weeks)",
      "60-min walkthrough call",
    ],
    examples: [
      "Complete implementation validation",
      "Production readiness assessment",
      "Multi-paper pipeline audit",
      "Benchmark reproduction",
      "Performance gap investigation",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h1>
      <p className="text-muted mb-4 max-w-xl">
        Fixed-scope pricing based on bug complexity. No hourly billing, no surprises.
      </p>
      <p className="text-sm text-muted mb-16 max-w-xl">
        Payment is due after you validate the fix works. If we can&apos;t fix it, you don&apos;t pay.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl border p-8 flex flex-col ${
              tier.popular ? "border-accent bg-accent/5" : "border-border bg-surface"
            }`}
          >
            {tier.popular && (
              <span className="self-start text-[10px] uppercase tracking-wider font-semibold text-accent mb-3">
                Most popular
              </span>
            )}
            <h2 className="text-xl font-semibold mb-1">{tier.name}</h2>
            <div className="text-4xl font-bold mb-1">{tier.price}</div>
            <div className="text-xs text-muted mb-6">{tier.turnaround} turnaround</div>
            <p className="text-sm text-muted mb-6 leading-relaxed">{tier.scope}</p>

            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Includes
            </h3>
            <ul className="text-sm text-muted space-y-2 mb-6">
              {tier.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Example bugs
            </h3>
            <ul className="text-sm text-muted space-y-1 mb-8 flex-1">
              {tier.examples.map((ex) => (
                <li key={ex} className="text-xs">
                  &middot; {ex}
                </li>
              ))}
            </ul>

            <Link
              href="/radar/book"
              className={`text-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                tier.popular
                  ? "bg-accent text-white hover:bg-accent-hover"
                  : "border border-border text-muted hover:text-foreground hover:border-foreground/20"
              }`}
            >
              Get Started
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-border bg-surface p-8">
        <h2 className="text-lg font-semibold mb-4">Enterprise &amp; Custom</h2>
        <p className="text-sm text-muted leading-relaxed mb-4">
          Need ongoing support for your ML team? We offer retainer agreements for teams that regularly implement research papers. Includes priority turnaround, dedicated engineer, and bulk pricing.
        </p>
        <Link
          href="/radar/book"
          className="text-sm text-accent hover:underline"
        >
          Contact us for custom pricing &rarr;
        </Link>
      </div>
    </div>
  );
}
