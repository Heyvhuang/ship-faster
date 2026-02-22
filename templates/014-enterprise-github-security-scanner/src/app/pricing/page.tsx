import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "ShieldWatch subscription plans for weekly GitHub security intelligence briefings. Plans starting at $497/month.",
};

const plans = [
  {
    name: "Startup",
    price: "$497",
    period: "/month",
    desc: "For teams up to 25 developers",
    features: [
      "Weekly trending repo security briefing",
      "Top 25 repos scanned",
      "1 industry vertical",
      "Email delivery (PDF)",
      "Standard severity scoring",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$997",
    period: "/month",
    desc: "For teams of 25–100 developers",
    features: [
      "Weekly trending repo security briefing",
      "Top 50 repos scanned",
      "Up to 3 industry verticals",
      "Email + Slack delivery",
      "Custom severity thresholds",
      "Developer communication templates",
      "Quarterly threat landscape review",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations 100+ developers",
    features: [
      "Everything in Growth, plus:",
      "Unlimited industry verticals",
      "Custom repo watchlists",
      "API access for internal tooling",
      "On-call security analyst",
      "Executive threat briefings",
      "SOC 2 compliance reporting",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
          Choose the plan that matches your team size. All plans include a 2-week free trial with full access.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-6 md:p-8 border flex flex-col ${
              plan.highlight
                ? "border-primary bg-primary/5 ring-1 ring-primary/30 relative"
                : "border-border bg-surface"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h2 className="text-xl font-bold text-white">{plan.name}</h2>
            <p className="text-foreground/50 text-sm mt-1 mb-4">{plan.desc}</p>
            <p className="text-4xl font-bold text-white">
              {plan.price}
              <span className="text-base font-normal text-foreground/40">{plan.period}</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground/70 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/#signup"
              className={`mt-8 block text-center py-3 rounded-lg font-semibold transition ${
                plan.highlight
                  ? "bg-primary hover:bg-primary-dark text-white"
                  : "border border-border hover:border-foreground/30 text-foreground"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mt-20">
        <h2 className="text-2xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { q: "What happens during the free trial?", a: "You receive two full weekly briefings with the same depth and quality as paid subscribers. No credit card required to start." },
            { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade at any time. Changes take effect on your next billing cycle." },
            { q: "What industries do you cover?", a: "We currently specialize in fintech, healthcare, SaaS, e-commerce, and infrastructure. Enterprise plans can add custom verticals." },
            { q: "How is this different from Dependabot or Snyk?", a: "Those tools scan code already in your repositories. ShieldWatch monitors trending repos proactively — catching threats before your developers even discover them." },
            { q: "Do you offer annual billing?", a: "Yes. Annual plans receive a 20% discount. Contact us for details." },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-border pb-6">
              <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
              <p className="text-foreground/60 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
