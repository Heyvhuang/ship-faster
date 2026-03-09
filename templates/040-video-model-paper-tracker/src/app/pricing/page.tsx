import { SubscribeForm } from "../components/SubscribeForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — VideoModelWeekly",
  description:
    "Free weekly digest or $5/month Pro with full archive access and early delivery.",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Everything you need to stay current on video AI research.",
      features: [
        "Weekly digest every Tuesday",
        "5–10 curated papers per issue",
        "Benchmark score tables",
        "Direct model repo links",
        "One-sentence summaries",
        "Filter by generation / editing",
      ],
      cta: "subscribe",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$5",
      period: "/month",
      description:
        "Full archive access, early delivery, and exclusive extras for power users.",
      features: [
        "Everything in Free, plus:",
        "Full archive access (all past issues)",
        "Early delivery (Monday evening)",
        "Model release calendar",
        "Searchable paper database",
        "Priority feature requests",
      ],
      cta: "upgrade",
      highlighted: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Simple, transparent pricing
        </h1>
        <p className="text-base" style={{ color: "var(--muted)" }}>
          The weekly digest is always free. Upgrade for archive access and
          extras.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-xl border p-6 sm:p-8 flex flex-col"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: plan.highlighted
                ? "var(--primary)"
                : "var(--card-border)",
              borderWidth: plan.highlighted ? "2px" : "1px",
            }}
          >
            {plan.highlighted && (
              <span
                className="text-xs font-medium px-3 py-1 rounded-full self-start mb-4"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "#fff",
                }}
              >
                Most Popular
              </span>
            )}
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <div className="flex items-baseline gap-1 mt-2 mb-3">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-sm" style={{ color: "var(--muted)" }}>
                {plan.period}
              </span>
            </div>
            <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
              {plan.description}
            </p>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <span style={{ color: "var(--accent)" }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {plan.cta === "subscribe" ? (
              <div id="subscribe">
                <SubscribeForm />
              </div>
            ) : (
              <button
                className="w-full px-6 py-3 rounded-lg text-white font-medium text-sm cursor-pointer"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Start Pro — $5/month
              </button>
            )}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes. Cancel with one click and you'll keep access until the end of your billing period.",
            },
            {
              q: "What's in the free tier?",
              a: "You get every weekly digest with all papers, benchmarks, and model links. Free tier sees the latest 3 archived issues.",
            },
            {
              q: "How is this different from Papers With Code?",
              a: "We focus exclusively on video generation and editing models. Every paper is hand-picked with video-specific benchmarks like VBench and FVD.",
            },
            {
              q: "When do issues arrive?",
              a: "Free tier receives issues Tuesday morning. Pro subscribers get early access Monday evening.",
            },
          ].map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold mb-1">{faq.q}</h3>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Not sure yet?{" "}
          <Link
            href="/archive"
            className="underline hover:opacity-70 transition-opacity"
            style={{ color: "var(--primary)" }}
          >
            Browse the archive
          </Link>{" "}
          to see what you&apos;ll get.
        </p>
      </div>
    </div>
  );
}
