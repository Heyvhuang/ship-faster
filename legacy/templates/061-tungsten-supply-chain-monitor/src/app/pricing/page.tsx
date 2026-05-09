import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing | Tungsten Supply Chain Monitor",
  description: "Transparent pricing for tungsten supply chain monitoring. Plans from $500/mo.",
};

const tiers = [
  {
    name: "Basic",
    price: "$500",
    period: "/month",
    desc: "Essential tungsten price tracking for small teams.",
    features: [
      "Weekly price index — all grades & regions",
      "5 supplier risk profiles",
      "Email availability alerts",
      "12-month price history",
      "Monthly market summary PDF",
      "Standard email support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    price: "$1,200",
    period: "/month",
    desc: "Advanced analytics and custom alerting for growing teams.",
    features: [
      "Everything in Basic",
      "25 supplier risk profiles",
      "Real-time SMS & email alerts",
      "Custom grade & region tracking",
      "Quarterly market outlook report",
      "API access for ERP integration",
      "Exportable CSV/PDF reports",
      "Priority support (4hr SLA)",
    ],
    popular: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Full-service supply chain intelligence with a dedicated team.",
    features: [
      "Everything in Pro",
      "50+ supplier risk profiles",
      "Dedicated account manager",
      "Custom reporting & analytics",
      "Supply chain disruption modeling",
      "Quarterly business reviews",
      "Onboarding & training sessions",
      "99.9% SLA guarantee",
      "SOC 2 & ITAR compliance",
    ],
    cta: "Contact Sales",
  },
];

const faqs = [
  { q: "How long is the free trial?", a: "Basic and Pro plans include a 14-day free trial with full feature access. No credit card required." },
  { q: "Can I switch plans later?", a: "Yes. You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle." },
  { q: "Do you offer annual discounts?", a: "Yes — annual plans receive a 15% discount. Enterprise plans can be customized for multi-year contracts." },
  { q: "What data sources do you use?", a: "We aggregate data from metal exchanges, proprietary trade data, customs records, and direct supplier relationships." },
  { q: "Is the API RESTful?", a: "Yes. Our REST API returns JSON and supports webhook callbacks for real-time alert delivery." },
  { q: "Do you support ITAR/export compliance?", a: "Enterprise plans include ITAR-aware data handling and SOC 2 Type II certified infrastructure." },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-steel-light max-w-xl mx-auto">
              No hidden fees. No long-term contracts required. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-card border rounded-xl p-6 flex flex-col ${
                  tier.popular ? "border-accent ring-1 ring-accent" : "border-card-border"
                }`}
              >
                {tier.popular && (
                  <span className="self-start text-xs font-semibold bg-accent text-white px-2.5 py-0.5 rounded mb-3">
                    Most Popular
                  </span>
                )}
                <h2 className="text-xl font-bold">{tier.name}</h2>
                <p className="text-sm text-steel-light mb-4">{tier.desc}</p>
                <p className="text-4xl font-bold mb-1">
                  {tier.price}
                  <span className="text-base font-normal text-steel">{tier.period}</span>
                </p>
                {tier.price !== "Custom" && (
                  <p className="text-xs text-steel mb-4">Billed monthly · 15% off annual</p>
                )}
                <ul className="mt-4 space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-steel-light">
                      <span className="text-success mt-0.5 shrink-0">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className={`mt-6 text-center py-3 rounded-lg font-medium text-sm transition ${
                    tier.popular
                      ? "bg-accent hover:bg-accent-hover text-white"
                      : "border border-card-border hover:border-steel text-steel-light hover:text-white"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-card border border-card-border rounded-xl p-5">
                  <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                  <p className="text-sm text-steel-light">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
