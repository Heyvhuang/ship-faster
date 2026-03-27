import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — MemoryGuard",
  description: "Simple per-agent pricing. Start free with one agent, scale as your fleet grows.",
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for testing with a single agent.",
    features: [
      "1 agent included",
      "Basic PII detection (regex)",
      "Weekly hygiene runs",
      "7-day audit log retention",
      "Community support",
      "Basic compliance report",
    ],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per agent / month",
    desc: "For teams running production AI agents.",
    features: [
      "Unlimited agents",
      "ML-powered PII detection",
      "Custom PII rules & regex",
      "Daily runs + on-demand",
      "90-day audit log retention",
      "GDPR deletion workflows",
      "Memory compression",
      "Priority email support",
      "API access",
    ],
    cta: "Start 14-day free trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "volume pricing",
    desc: "For organizations with compliance requirements.",
    features: [
      "Everything in Pro",
      "HIPAA BAA available",
      "SSO (SAML/OIDC) & SCIM",
      "Unlimited audit log retention",
      "Dedicated account manager",
      "Custom integrations",
      "99.99% SLA guarantee",
      "On-premise deployment option",
      "Security review & pen test reports",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What counts as an agent?",
    a: "An agent is a single persistent AI identity that maintains its own conversation memory. If you have 5 support agents each with their own memory, that's 5 agents.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Yes! Start a 14-day free trial with unlimited agents. No credit card required. You'll only be charged if you decide to continue after the trial.",
  },
  {
    q: "Can I change plans anytime?",
    a: "Absolutely. Upgrade, downgrade, or cancel at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes — annual billing saves you 20%. Pay for 10 months, get 12. Contact us for annual pricing on Enterprise plans.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Your scrubbing rules and audit logs are exported and available for 30 days after cancellation. Agent memory connections are immediately disconnected.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Simple, transparent pricing</h1>
              <p className="mt-4 text-lg text-muted">Start free with one agent. Scale as your fleet grows.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl border p-7 flex flex-col ${
                    plan.highlight
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 ring-1 ring-primary/20"
                      : "border-border bg-white"
                  }`}
                >
                  {plan.highlight && (
                    <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Most popular</div>
                  )}
                  <div className="text-sm font-semibold text-muted uppercase tracking-wide">{plan.name}</div>
                  <div className="mt-3">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-sm text-muted ml-1">/ {plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted mt-2">{plan.desc}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.name === "Enterprise" ? "#contact" : "/dashboard"}
                    className={`mt-6 block text-center py-3 rounded-lg font-medium text-sm transition-colors ${
                      plan.highlight
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "border border-border text-foreground hover:bg-card-hover"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="max-w-2xl mx-auto mt-24">
              <h2 className="text-2xl font-bold text-foreground text-center mb-10">Frequently asked questions</h2>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.q} className="border-b border-border pb-6">
                    <h3 className="text-base font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
