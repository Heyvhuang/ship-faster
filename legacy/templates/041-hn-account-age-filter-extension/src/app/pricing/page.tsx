import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — HN Filter",
  description:
    "HN Filter is free for core features. Upgrade to Pro for custom presets, advanced rules, and export capabilities.",
};

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to clean up your HN feed.",
    features: [
      "Account age filter",
      "Karma threshold filter",
      "Real-time filtering",
      "Quick toggle on/off",
      "Fade or collapse mode",
      "Local data caching",
      "Zero data collection",
    ],
    cta: "Install Free",
    href: "/#install",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$3",
    period: "one-time",
    desc: "For power users who want maximum control.",
    features: [
      "Everything in Free",
      "Unlimited filter presets",
      "Per-page filter rules",
      "Karma-to-age ratio rules",
      "Username allowlist",
      "Export/import settings",
      "Priority support",
    ],
    cta: "Get Pro",
    href: "#",
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Simple, honest pricing
        </h1>
        <p className="text-center text-neutral-600 mb-14 max-w-md mx-auto">
          Start free. Upgrade to Pro for a one-time payment of $3 — no subscriptions, no recurring fees.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-8 flex flex-col ${
                plan.highlight
                  ? "border-hn-orange shadow-lg shadow-hn-orange/10"
                  : "border-neutral-200"
              }`}
            >
              <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-neutral-500 text-sm ml-1">/{plan.period}</span>
              </div>
              <p className="text-sm text-neutral-600 mb-6">{plan.desc}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="text-hn-orange mt-0.5">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`block text-center font-semibold px-6 py-3 rounded-lg transition-colors ${
                  plan.highlight
                    ? "bg-hn-orange text-white hover:bg-hn-orange-light"
                    : "border border-neutral-300 hover:border-neutral-400"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-center mb-6">
            Frequently asked about pricing
          </h3>
          <div className="divide-y divide-neutral-200">
            {[
              {
                q: "Is the free version limited?",
                a: "No. The free version includes all core filtering features with no usage limits. Pro adds power-user features like unlimited presets and advanced rules.",
              },
              {
                q: "Is Pro a subscription?",
                a: "No. Pro is a one-time $3 payment. You get all current and future Pro features with no recurring charges.",
              },
              {
                q: "Can I get a refund?",
                a: "Yes. If Pro doesn't meet your expectations, email us within 30 days for a full refund — no questions asked.",
              },
              {
                q: "Will the price increase?",
                a: "We may adjust pricing for new users, but early adopters keep their price forever.",
              },
            ].map((f) => (
              <details key={f.q} className="py-4 group">
                <summary className="cursor-pointer font-medium flex items-center justify-between text-sm">
                  {f.q}
                  <span className="ml-2 text-neutral-400 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
