import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing — CarbCoach",
  description: "Simple, transparent pricing for AI-powered carb counting. Start free for 7 days.",
};

const plans = [
  {
    name: "Free Trial",
    desc: "7 days or 50 photos",
    price: "$0",
    period: "",
    features: ["Photo food recognition", "Carb breakdown by ingredient", "Confidence scores", "Daily meal diary"],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Monthly",
    desc: "Full access, cancel anytime",
    price: "$29",
    period: "/month",
    features: ["Everything in Free", "Insulin dose suggestions", "Unlimited photo logs", "CGM data correlation", "Export to glucose monitors", "Carb precision reports", "Voice confirmation mode"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Annual",
    desc: "Save $149/year",
    price: "$199",
    period: "/year",
    features: ["Everything in Monthly", "Insulin pump integration", "Priority AI processing", "Endocrinologist report exports", "Dedicated support"],
    cta: "Start Free Trial",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-24 pb-16 md:pt-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black text-center mb-2">Simple, transparent pricing</h1>
          <p className="text-center text-gray-500 max-w-xl mx-auto mb-12">Start free. Upgrade when you need insulin dosing recommendations and CGM integration.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-8 ${plan.highlight ? "bg-black text-white relative shadow-xl" : "bg-white border-2 border-gray-100"}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
                )}
                <h3 className={`font-bold mb-1 ${plan.highlight ? "" : "text-black"}`}>{plan.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 text-sm">{plan.period}</span>}
                </div>
                <ul className={`space-y-3 text-sm mb-8 ${plan.highlight ? "text-gray-300" : "text-gray-600"}`}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <svg className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-green-400" : "text-green-500"}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/demo" className={`block text-center font-semibold py-3 rounded-xl transition-colors ${plan.highlight ? "bg-white text-black hover:bg-gray-100" : "bg-gray-100 text-black hover:bg-gray-200"}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-black text-center mb-8">Compare plans</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-semibold text-black">Feature</th>
                    <th className="text-center py-3 font-semibold text-black">Free</th>
                    <th className="text-center py-3 font-semibold text-black">Monthly</th>
                    <th className="text-center py-3 font-semibold text-black">Annual</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {[
                    ["Photo recognition", true, true, true],
                    ["Carb breakdown", true, true, true],
                    ["Confidence scores", true, true, true],
                    ["Insulin suggestions", false, true, true],
                    ["Unlimited photos", false, true, true],
                    ["CGM integration", false, true, true],
                    ["Pump integration", false, false, true],
                    ["Priority processing", false, false, true],
                    ["Report exports", false, true, true],
                  ].map(([feature, ...values]) => (
                    <tr key={feature as string} className="border-b border-gray-50">
                      <td className="py-3">{feature as string}</td>
                      {(values as boolean[]).map((v, i) => (
                        <td key={i} className="text-center py-3">
                          {v ? <span className="text-green-500">&#10003;</span> : <span className="text-gray-300">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
