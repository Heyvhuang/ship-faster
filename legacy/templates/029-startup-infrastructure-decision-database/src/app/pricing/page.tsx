import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — InfraRegrets",
  description: "Free search, premium features for teams.",
};

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Simple Pricing</h1>
        <p className="text-lg text-slate-500">
          Search for free. Go Pro for unlimited submissions and alerts.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Free */}
        <div className="border border-slate-200 rounded-2xl p-6 bg-white">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Free</h2>
          <div className="text-3xl font-bold text-slate-900 mb-4">
            $0<span className="text-base font-normal text-slate-500">/mo</span>
          </div>
          <ul className="space-y-3 text-sm text-slate-600 mb-6">
            {[
              "Unlimited search & browsing",
              "View all decision details",
              "3 submissions per month",
              "Upvote helpful decisions",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <a
            href="/submit"
            className="block text-center w-full py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Pro */}
        <div className="border-2 border-slate-900 rounded-2xl p-6 bg-white relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-medium px-3 py-1 rounded-full">
            Popular
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">Pro</h2>
          <div className="text-3xl font-bold text-slate-900 mb-4">
            $29<span className="text-base font-normal text-slate-500">/mo</span>
          </div>
          <ul className="space-y-3 text-sm text-slate-600 mb-6">
            {[
              "Everything in Free",
              "Unlimited submissions",
              "Export data as CSV/JSON",
              "Email alerts for new decisions",
              "Priority support",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <button className="block text-center w-full py-2.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
}
