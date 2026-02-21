import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing - LedgerAI",
  description: "Simple, transparent pricing for content creators. $29/month or $99 one-time tax season pass.",
};

const faqs = [
  {
    q: "What happens after the 14-day trial?",
    a: "Your trial converts to the $29/month plan automatically. You can cancel anytime from your settings — no calls, no emails, one click.",
  },
  {
    q: "Can I export my data if I cancel?",
    a: "Absolutely. You can export all transactions, receipts, and tax documents as CSV, PDF, or TurboTax-compatible formats at any time.",
  },
  {
    q: "Do I need both plans?",
    a: "No. The monthly plan includes Schedule C generation. The Tax Season Pass is for creators who only need help once a year at filing time.",
  },
  {
    q: "Is my financial data secure?",
    a: "Yes. We use 256-bit SSL encryption, are SOC 2 compliant, and connect to banks via Plaid with read-only access. We never store your bank credentials.",
  },
  {
    q: "Which platforms do you support?",
    a: "YouTube AdSense, Patreon, Stripe, PayPal, Gumroad, Ko-fi, and Teachable. We're adding new integrations every month.",
  },
  {
    q: "Can my accountant access my data?",
    a: "Yes. You can generate a read-only share link for your accountant. They can view transactions, deductions, and download your Schedule C directly.",
  },
];

export default function Pricing() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">
              Simple, transparent <span className="text-blue-400">pricing</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
              Less than the cost of one hour with a bookkeeper. Cancel anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            {/* Monthly */}
            <div className="relative overflow-hidden rounded-2xl border border-blue-500/50 bg-slate-800/50 p-8 ring-1 ring-blue-500/20">
              <div className="absolute top-0 right-0 rounded-bl-xl bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </div>
              <div className="text-sm font-semibold text-blue-400">Monthly</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold">$29</span>
                <span className="text-slate-500">/month</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">14-day free trial. No credit card to start.</p>
              <Link href="/dashboard" className="mt-6 block rounded-lg bg-blue-500 py-3 text-center font-semibold text-white transition hover:bg-blue-600">
                Start Free Trial
              </Link>
              <div className="mt-6 border-t border-slate-700 pt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Everything included</p>
                <ul className="space-y-2.5">
                  {[
                    "Unlimited transaction imports",
                    "AI expense categorization",
                    "Multi-platform 1099 aggregation",
                    "Smart receipt scanning",
                    "Quarterly tax estimates & reminders",
                    "Schedule C generation",
                    "TurboTax & accountant export",
                    "Bank-grade security (SOC 2)",
                    "Priority email support",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <svg className="h-4 w-4 shrink-0 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tax Season Pass */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800/30 p-8">
              <div className="text-sm font-semibold text-slate-400">Tax Season Pass</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold">$99</span>
                <span className="text-slate-500">one-time</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">Pay once at tax filing time.</p>
              <Link href="/dashboard" className="mt-6 block rounded-lg border border-slate-600 py-3 text-center font-semibold text-slate-300 transition hover:border-slate-400">
                Buy Tax Season Pass
              </Link>
              <div className="mt-6 border-t border-slate-700 pt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Includes</p>
                <ul className="space-y-2.5">
                  {[
                    "Full year transaction import",
                    "AI categorization for all expenses",
                    "1099 aggregation from all platforms",
                    "Schedule C generation",
                    "TurboTax & accountant export",
                    "Email support",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <svg className="h-4 w-4 shrink-0 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison note */}
          <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-slate-700 bg-slate-800/30 p-6 text-center">
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-slate-200">Compare:</span> The average freelancer spends <span className="text-red-400">$1,200/year</span> on bookkeeping and tax prep. LedgerAI costs <span className="text-green-400">$348/year</span> — saving you over $850 annually.
            </p>
          </div>

          {/* FAQs */}
          <div className="mx-auto mt-20 max-w-3xl">
            <h2 className="text-center text-3xl font-bold">Frequently asked questions</h2>
            <div className="mt-10 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
                  <h3 className="font-semibold">{faq.q}</h3>
                  <p className="mt-2 text-sm text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold">Stop overpaying for bookkeeping</h2>
            <p className="mt-3 text-slate-400">Join 2,400+ creators who automated their taxes with LedgerAI.</p>
            <Link href="/dashboard" className="mt-6 inline-block rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white transition hover:bg-blue-600">
              Start Your Free Trial
            </Link>
            <p className="mt-3 text-sm text-slate-500">14-day trial &middot; No credit card &middot; Cancel anytime</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
