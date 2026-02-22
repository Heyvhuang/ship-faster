import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for enterprise research intelligence. Starting at $500/month for weekly custom digests.",
};

const plans = [
  {
    name: "Starter",
    price: "$500",
    period: "/month",
    description: "Perfect for early-stage healthcare AI companies getting started with research intelligence.",
    features: [
      "Weekly research digest (up to 3 focus areas)",
      "Competitor tracking (up to 5 companies)",
      "Regulatory relevance scoring",
      "Business impact summaries",
      "Email delivery every Friday",
      "30-day archive access",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$1,200",
    period: "/month",
    description: "For growing R&D teams that need comprehensive coverage and deeper insights.",
    features: [
      "Everything in Starter, plus:",
      "Unlimited focus areas",
      "Competitor tracking (up to 20 companies)",
      "Patent filing alerts (USPTO, EPO)",
      "Custom keyword monitoring",
      "Dashboard access with search",
      "Quarterly trend reports",
      "Dedicated analyst support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations requiring white-label solutions and API access.",
    features: [
      "Everything in Professional, plus:",
      "Unlimited competitor tracking",
      "Global patent coverage (WIPO, CNIPA)",
      "White-label digest branding",
      "API access for integration",
      "Custom delivery schedules",
      "Priority analyst team",
      "SOC 2 compliance documentation",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "How does the free trial work?",
    a: "Start with a 14-day free trial on any plan. We'll deliver your first custom digest within 3 business days so you can evaluate the quality before committing.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "What sources do you cover?",
    a: "We scan arXiv, PubMed, bioRxiv, medRxiv, USPTO, EPO, WIPO, ClinicalTrials.gov, and FDA databases. Enterprise plans can add custom sources.",
  },
  {
    q: "Is there an annual discount?",
    a: "Yes — annual plans receive a 20% discount. Contact our sales team for details.",
  },
  {
    q: "How is regulatory relevance scored?",
    a: "Our ML models are trained on historical FDA approvals, 510(k) clearances, and guidance documents to score each paper's regulatory implications on a 1-10 scale.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-lg text-slate-500">
              Start with a 14-day free trial. No credit card required.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? "bg-blue-800 text-white ring-4 ring-blue-400 shadow-2xl scale-[1.02]"
                    : "bg-white ring-1 ring-slate-200 shadow-sm"
                }`}
              >
                {plan.highlighted && (
                  <span className="inline-block rounded-full bg-sky-400 px-3 py-0.5 text-xs font-bold text-blue-900">
                    Most Popular
                  </span>
                )}
                <h2 className={`mt-2 text-2xl font-bold ${plan.highlighted ? "" : "text-slate-900"}`}>
                  {plan.name}
                </h2>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${plan.highlighted ? "" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.highlighted ? "text-blue-200" : "text-slate-500"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`mt-3 text-sm ${plan.highlighted ? "text-blue-100" : "text-slate-500"}`}>
                  {plan.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <svg
                        className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? "text-sky-300" : "text-blue-600"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.highlighted ? "text-blue-100" : "text-slate-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className={`mt-8 block rounded-lg py-3 text-center text-sm font-semibold ${
                    plan.highlighted
                      ? "bg-white text-blue-800 hover:bg-blue-50"
                      : "bg-blue-700 text-white hover:bg-blue-800"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
        <dl className="mt-12 space-y-8">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="text-base font-semibold text-slate-900">{faq.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-500">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
