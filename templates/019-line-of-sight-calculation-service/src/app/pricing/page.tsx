import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pay-per-use pricing. $0.10 per calculation with batch discounts.",
};

export default function PricingPage() {
  return (
    <div className="pt-20 px-6">
      <section className="py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold">Simple, transparent pricing</h1>
          <p className="mt-4 text-lg text-muted">
            No subscriptions. No monthly fees. Pay only for what you calculate.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Standard */}
          <div className="rounded-xl border border-card-border bg-card p-8">
            <h2 className="text-sm font-semibold text-muted uppercase tracking-wider">Standard</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-bold">$0.10</span>
              <span className="text-muted">/ calculation</span>
            </div>
            <p className="mt-3 text-sm text-muted">
              Perfect for individual professionals and small projects.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Full elevation-aware calculations",
                "Viewpoint optimization (top 3)",
                "Terrain profile data",
                "JSON response with full metadata",
                "99.9% uptime SLA",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0 text-success">
                    <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/docs"
              className="mt-8 block rounded-lg border border-card-border py-2.5 text-center font-medium hover:bg-card-border/30 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Batch */}
          <div className="relative rounded-xl border-2 border-accent bg-card p-8">
            <div className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-0.5 text-xs font-medium text-background">
              Best Value
            </div>
            <h2 className="text-sm font-semibold text-accent uppercase tracking-wider">Batch</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-bold">$0.08</span>
              <span className="text-muted">/ calculation</span>
            </div>
            <p className="mt-3 text-sm text-muted">
              20% savings for 100+ calculations per request.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Everything in Standard",
                "Up to 1,000 calculations per request",
                "Priority processing queue",
                "Downloadable CSV & GeoJSON reports",
                "Dedicated support channel",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0 text-accent">
                    <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/docs"
              className="mt-8 block rounded-lg bg-accent py-2.5 text-center font-medium text-background hover:bg-accent/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Volume table */}
      <section className="pb-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center text-xl font-bold">Volume estimates</h2>
          <div className="overflow-hidden rounded-xl border border-card-border">
            <table className="w-full text-sm">
              <thead className="bg-card">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-muted">Calculations / month</th>
                  <th className="px-6 py-3 text-left font-medium text-muted">Rate</th>
                  <th className="px-6 py-3 text-right font-medium text-muted">Monthly cost</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { qty: "100", rate: "$0.10", cost: "$10.00" },
                  { qty: "500", rate: "$0.10", cost: "$50.00" },
                  { qty: "1,000", rate: "$0.08", cost: "$80.00" },
                  { qty: "5,000", rate: "$0.08", cost: "$400.00" },
                  { qty: "10,000", rate: "$0.08", cost: "$800.00" },
                ].map((r) => (
                  <tr key={r.qty} className="border-t border-card-border">
                    <td className="px-6 py-3">{r.qty}</td>
                    <td className="px-6 py-3 text-muted">{r.rate}</td>
                    <td className="px-6 py-3 text-right font-mono">{r.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center text-xl font-bold">Frequently asked questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "How does billing work?",
                a: "You're charged immediately upon each successful calculation. Failed calculations are not billed. Add a payment method via Stripe when you create your API key.",
              },
              {
                q: "Is there a free tier?",
                a: "New accounts receive 10 free calculations to test the API. After that, standard pay-per-use pricing applies.",
              },
              {
                q: "How do batch calculations work?",
                a: "Submit an array of coordinate pairs in a single request. If the array contains 100+ pairs, the batch rate of $0.08 automatically applies to all calculations in that request.",
              },
              {
                q: "What data sources do you use?",
                a: "We use SRTM 30m resolution elevation data globally, with 10m LiDAR data available for the US. All data is pre-processed for fast lookups.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-card-border bg-card p-6">
                <h3 className="font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
