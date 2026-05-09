import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — DepRadar",
  description: "Simple per-team pricing for dependency risk monitoring.",
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For individual developers exploring dependency risks",
    features: ["5 dependencies monitored", "Daily risk scans", "Email alerts only", "7-day alert history", "Community support"],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Team",
    price: "$49",
    period: "/month per team",
    description: "For engineering teams shipping to production",
    features: ["50 dependencies monitored", "Real-time risk scans", "Email + Slack alerts", "90-day alert history", "Breaking change forecasting", "Team risk dashboard", "Priority support", "Zero false positive guarantee"],
    cta: "Start 14-Day Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month per team",
    description: "For organizations with complex dependency trees",
    features: ["Unlimited dependencies", "Real-time risk scans", "All alert channels + Webhook", "Unlimited history", "Custom risk scoring rules", "Multi-team dashboard", "SSO / SAML", "Dedicated support + SLA", "On-premise deployment option"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold sm:text-4xl">Simple, transparent pricing</h1>
          <p className="mt-3 text-zinc-400 max-w-xl mx-auto">
            Start free, upgrade when your team needs real-time monitoring and advanced alerting.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 flex flex-col ${
                plan.highlight
                  ? "border-red-500/50 bg-red-500/5 ring-1 ring-red-500/20"
                  : "border-zinc-800 bg-zinc-900/30"
              }`}
            >
              {plan.highlight && (
                <span className="inline-flex self-start rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-medium text-red-400 mb-4">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-sm text-zinc-400">{plan.period}</span>}
              </div>
              <p className="mt-3 text-sm text-zinc-400">{plan.description}</p>
              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0"><path d="M5 13l4 4L19 7"/></svg>
                    <span className="text-zinc-300">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className={`mt-8 block rounded-lg px-6 py-3 text-center text-sm font-medium transition-colors ${
                  plan.highlight
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How is DepRadar different from Dependabot or Snyk?", a: "Those tools alert on known CVEs after they're published. DepRadar monitors trending repositories and security discussions to detect emerging risks an average of 48 hours earlier." },
              { q: "What does the zero false positive guarantee mean?", a: "Every alert is verified by our analysis engine. If you receive an alert that turns out to be irrelevant to your stack, we'll credit your account for the entire month." },
              { q: "Can I add dependencies from private repositories?", a: "Yes. On Team and Enterprise plans, you can connect private GitHub repositories and we'll automatically detect and monitor your dependency tree." },
              { q: "Do you support languages other than JavaScript?", a: "We currently support npm/Node.js, Python/pip, Ruby/gems, and Go modules. Java/Maven and Rust/Cargo support is coming soon." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-zinc-800 p-6">
                <h3 className="font-medium">{faq.q}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
