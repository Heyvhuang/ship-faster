import { pricingPlans, faqItems } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Paper Reproducibility Cloud",
  description: "Simple, transparent pricing. Pay per paper or go unlimited.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-mono text-3xl font-bold sm:text-4xl">Simple, transparent pricing</h1>
        <p className="mt-3 text-sm text-zinc-500">
          No hidden fees. GPU time included. Cancel anytime.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-6 ${
              plan.highlighted
                ? "border-emerald-500/50 bg-emerald-500/5"
                : "border-zinc-800 bg-zinc-900/50"
            }`}
          >
            {plan.highlighted && (
              <span className="mb-4 inline-block rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                Most Popular
              </span>
            )}
            <h3 className="font-mono text-lg font-semibold">{plan.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-sm text-zinc-500">/{plan.unit}</span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">{plan.description}</p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-zinc-300">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`mt-6 w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                plan.highlighted
                  ? "bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                  : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="text-center font-mono text-2xl font-bold">Frequently asked questions</h2>
        <div className="mt-8 space-y-6 mx-auto max-w-3xl">
          {faqItems.map((item) => (
            <div key={item.question} className="border-b border-zinc-800 pb-6">
              <h3 className="text-sm font-semibold text-zinc-100">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
