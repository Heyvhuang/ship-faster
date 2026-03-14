import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — HN Account Age Filter",
  description: "Free preset thresholds forever. Unlock custom thresholds and filtered list export for $2/month.",
};

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need for basic filtering.",
    features: [
      "7 / 30 / 90-day presets",
      "Grey out or hide filtered posts",
      "One-click toggle",
      "Post count indicator",
      "Persistent preferences",
      "Privacy-first local processing",
    ],
    cta: "Install Free",
    ctaLink: "/download",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$2",
    period: "/month",
    desc: "For power users who want full control.",
    features: [
      "Everything in Free",
      "Custom day threshold (any number)",
      "Filtered list CSV export",
      "Per-page filter statistics",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Start Free Trial",
    ctaLink: "/download",
    highlighted: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#ff6600] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-white text-lg tracking-tight">HN Age Filter</Link>
          <div className="hidden sm:flex items-center gap-3 text-sm text-white/90">
            <Link href="/features" className="hover:text-white">Features</Link>
            <Link href="/pricing" className="text-white font-semibold">Pricing</Link>
            <Link href="/faq" className="hover:text-white">FAQ</Link>
          </div>
        </div>
        <Link href="/download" className="bg-white text-[#ff6600] text-sm font-semibold px-4 py-1.5 rounded hover:bg-orange-50 transition">
          Install Free
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-4 pt-16 pb-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 text-center">Simple Pricing</h1>
        <p className="text-gray-600 text-center max-w-md mx-auto mb-12">
          Start free with preset thresholds. Upgrade to Pro for custom controls and export.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 flex flex-col ${
                plan.highlighted
                  ? "border-[#ff6600] shadow-lg shadow-orange-100 relative"
                  : "border-gray-200"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff6600] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Popular
                </div>
              )}
              <h3 className="font-bold text-xl text-gray-900">{plan.name}</h3>
              <div className="mt-2 mb-1">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-600 mb-6">{plan.desc}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-[#ff6600] mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.ctaLink}
                className={`text-center py-2.5 rounded-lg font-semibold text-sm transition ${
                  plan.highlighted
                    ? "bg-[#ff6600] text-white hover:bg-orange-600"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Pro includes a 7-day free trial. Cancel anytime. No questions asked.
        </p>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2026 HN Account Age Filter</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <Link href="/features" className="hover:text-gray-700">Features</Link>
            <Link href="/faq" className="hover:text-gray-700">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
