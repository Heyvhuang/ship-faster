import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Features - LedgerAI",
  description: "Smart receipt scanning, multi-platform 1099 aggregation, quarterly tax estimates, and one-click Schedule C generation.",
};

const features = [
  {
    title: "Smart Receipt Scanning",
    desc: "Snap a photo or forward an email. Our AI reads the receipt, identifies the vendor, and auto-tags it to the right deduction category — equipment, software, home office, and more.",
    details: [
      "OCR-powered text extraction from photos and PDFs",
      "Auto-detects creator-specific purchases (cameras, mics, lighting)",
      "Links receipts to matching bank transactions",
      "Flags missing receipts for high-value deductions",
    ],
    icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
  },
  {
    title: "Multi-Platform 1099 Aggregation",
    desc: "Connect YouTube, Patreon, Stripe, PayPal, and more. LedgerAI pulls in all your 1099 data and reconciles income across platforms automatically.",
    details: [
      "Direct API integrations with major creator platforms",
      "Automatic 1099 detection and import",
      "Cross-platform income reconciliation",
      "Alerts when expected 1099s haven't arrived",
    ],
    icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    title: "Quarterly Tax Calculator",
    desc: "Never miss a quarterly payment or overpay the IRS. Real-time estimated tax calculations with safe harbor rule enforcement and auto-reminders.",
    details: [
      "Real-time tax liability estimates based on actual income",
      "Safe harbor rule calculation to avoid penalties",
      "Calendar reminders 2 weeks before each due date",
      "State + federal tax breakdown",
    ],
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    title: "AI Expense Categorization",
    desc: "Trained on thousands of creator transactions. LedgerAI knows the difference between a business camera purchase and a personal one — and learns your patterns over time.",
    details: [
      "Creator-specific ML model for 95%+ accuracy",
      "Learns your unique spending patterns over time",
      "Confidence scores on every categorization",
      "One-click approval or easy re-categorization",
    ],
    icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.591.659H9.061a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V17a2 2 0 01-2 2H7a2 2 0 01-2-2v-2.5",
  },
  {
    title: "One-Click Schedule C",
    desc: "When April comes, your Schedule C is already done. Export it as a PDF, send it to your accountant, or upload directly to TurboTax and H&R Block.",
    details: [
      "IRS-compliant Schedule C generation",
      "Pre-filled with categorized income and deductions",
      "Direct export to TurboTax, H&R Block, and TaxAct",
      "Shareable link for your accountant with read-only access",
    ],
    icon: "M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  },
];

export default function Features() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">
              Everything you need to <span className="text-blue-400">automate</span> your taxes
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Built specifically for content creators with complex 1099 income from multiple platforms.
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {features.map((f, i) => (
              <div key={f.title} className={`flex flex-col gap-8 md:flex-row md:items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="flex-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">{f.title}</h2>
                  <p className="mt-3 text-slate-400">{f.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {f.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-slate-300">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Feature mock */}
                <div className="flex-1">
                  <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
                    {i === 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/5 p-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400 text-lg">&#x2713;</div>
                          <div>
                            <div className="text-sm font-medium">Sony_A7IV_Receipt.pdf</div>
                            <div className="text-xs text-slate-500">Matched to B&H Photo charge &middot; $2,498.00 &middot; Equipment</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/5 p-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400 text-lg">&#x2713;</div>
                          <div>
                            <div className="text-sm font-medium">Adobe_Invoice_Feb.pdf</div>
                            <div className="text-xs text-slate-500">Matched to Adobe charge &middot; $54.99 &middot; Software</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500 text-lg">!</div>
                          <div>
                            <div className="text-sm font-medium">Missing receipt</div>
                            <div className="text-xs text-slate-500">Amazon &middot; $342.00 &middot; Needs receipt for deduction</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="space-y-3">
                        {["YouTube / Google", "Patreon", "Stripe", "PayPal"].map((p, j) => (
                          <div key={p} className="flex items-center justify-between rounded-lg border border-slate-700/50 p-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-700 text-xs font-bold text-slate-300">{p[0]}</div>
                              <div>
                                <div className="text-sm font-medium">{p}</div>
                                <div className="text-xs text-slate-500">1099-NEC 2025</div>
                              </div>
                            </div>
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${j < 3 ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-500"}`}>
                              {j < 3 ? "Imported" : "Pending"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 2 && (
                      <div>
                        <div className="mb-4 text-center">
                          <div className="text-xs text-slate-500">Next Quarterly Payment</div>
                          <div className="mt-1 text-3xl font-bold text-yellow-500">$4,218</div>
                          <div className="text-sm text-slate-400">Due April 15, 2026</div>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-slate-500">
                          <span>75% of quarter elapsed</span>
                          <span>23 days until due</span>
                        </div>
                      </div>
                    )}
                    {i === 3 && (
                      <div className="space-y-2">
                        {[
                          { desc: "Rode PodMic USB", cat: "Equipment", conf: 98 },
                          { desc: "Canva Pro Annual", cat: "Software", conf: 96 },
                          { desc: "Uber to Studio", cat: "Travel", conf: 87 },
                          { desc: "Target Purchase", cat: "Personal?", conf: 45 },
                        ].map((item) => (
                          <div key={item.desc} className="flex items-center justify-between rounded-lg border border-slate-700/50 p-3">
                            <div className="flex items-center gap-3">
                              <span className={`rounded px-2 py-0.5 text-xs ${item.conf >= 80 ? "bg-green-500/10 text-green-400" : item.conf >= 60 ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"}`}>
                                {item.conf}%
                              </span>
                              <span className="text-sm">{item.desc}</span>
                            </div>
                            <span className="text-xs text-slate-400">{item.cat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 4 && (
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-lg font-semibold">Schedule C Ready</div>
                        <div className="mt-1 text-sm text-slate-400">Tax Year 2025 &middot; Generated Feb 18, 2026</div>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {["Download PDF", "Send to Accountant", "Export to TurboTax"].map((btn) => (
                            <button key={btn} className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-300 hover:border-blue-500 hover:text-blue-400">
                              {btn}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold">Ready to automate your bookkeeping?</h2>
            <p className="mt-3 text-slate-400">Start your 14-day free trial. No credit card required.</p>
            <Link href="/dashboard" className="mt-6 inline-block rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white transition hover:bg-blue-600">
              Start Free Trial
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
