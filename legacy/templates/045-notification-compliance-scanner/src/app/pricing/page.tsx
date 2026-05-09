import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — NotifyScan",
  description: "Simple pricing for notification compliance scanning. Start free, pay per audit.",
};

const plans = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    desc: "Try the scanner on a single app",
    features: [
      "1 IPA scan",
      "Basic pass/fail results",
      "3 regulation checks",
      "Summary score",
    ],
    cta: "Start Free Scan",
    href: "/scan",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "per app",
    desc: "Full audit with actionable fixes",
    features: [
      "Unlimited scans per app",
      "12 compliance checks (GDPR, CCPA, Apple)",
      "Detailed fix recommendations",
      "Exportable PDF report",
      "Regulation citation references",
      "Email support",
    ],
    cta: "Get Full Report",
    href: "/scan",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$199",
    period: "per month",
    desc: "For teams managing multiple apps",
    features: [
      "Everything in Pro",
      "Batch scan up to 25 apps",
      "Consolidated dashboard",
      "Regulation change alerts",
      "Priority support",
      "Custom compliance rules",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What file formats do you support?",
    a: "Currently we support iOS .ipa files. Android .apk support is on our roadmap for Q3 2026.",
  },
  {
    q: "Is my app binary secure?",
    a: "Yes. IPA files are processed entirely in your browser using WebAssembly. We only extract notification-related metadata—no binary data is transmitted to our servers.",
  },
  {
    q: "How current are your compliance rules?",
    a: "Our rule engine is updated within 48 hours of any GDPR, CCPA, or Apple guideline changes. Agency plan subscribers receive real-time email alerts.",
  },
  {
    q: "Can I use the PDF report for legal purposes?",
    a: "Our reports are designed to support your compliance documentation. While they don't constitute legal advice, they provide the technical evidence legal teams need for compliance assessments.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Nav />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="text-center text-3xl font-bold md:text-4xl">Simple, Transparent Pricing</h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-zinc-400">
            Start with a free scan. Pay only when you need the full compliance report.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg border p-6 ${
                  plan.highlight
                    ? "border-green-500/40 bg-green-500/5"
                    : "border-zinc-800 bg-zinc-900"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-3 py-0.5 text-xs font-semibold text-zinc-950">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-sm text-zinc-500">{plan.period}</span>}
                </div>
                <p className="mt-2 text-sm text-zinc-400">{plan.desc}</p>
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="mt-0.5 text-green-400">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-6 block rounded-md py-2.5 text-center text-sm font-medium transition-colors ${
                    plan.highlight
                      ? "bg-green-500 text-zinc-950 hover:bg-green-400"
                      : "border border-zinc-700 text-zinc-300 hover:border-zinc-500"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <h2 className="text-center text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
                  <h3 className="font-semibold">{faq.q}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
