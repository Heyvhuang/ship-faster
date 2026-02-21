import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahcreates",
    platform: "YouTube · 82K subs",
    text: "I used to spend 2 full weekends doing taxes. LedgerAI categorized 11 months of transactions in under 5 minutes. My accountant was shocked how organized everything was.",
    avatar: "SC",
  },
  {
    name: "Marcus Rivera",
    handle: "@marcusrivera",
    platform: "Patreon · 4.2K patrons",
    text: "Finally something that understands creator income. It pulled in my Patreon, YouTube, and Gumroad 1099s automatically. Quarterly estimates are dead-on accurate.",
    avatar: "MR",
  },
  {
    name: "Priya Kapoor",
    handle: "@priyaedits",
    platform: "YouTube · 210K subs",
    text: "The receipt scanner correctly tagged my camera gear, lighting kit, and even my editing chair as home office deductions. Saved me $3,200 I would have missed.",
    avatar: "PK",
  },
];

const steps = [
  {
    num: "1",
    title: "Scan & Upload",
    desc: "Snap a photo of any receipt or connect your bank. LedgerAI imports everything automatically.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "AI Categorizes",
    desc: "Our AI is trained on creator-specific expenses — cameras, software, props, home studio, and more.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.591.659H9.061a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V17a2 2 0 01-2 2H7a2 2 0 01-2-2v-2.5" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Tax Ready",
    desc: "Your estimated taxes update in real-time. Export Schedule C with one click when it's time to file.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
          <div className="relative mx-auto max-w-6xl px-6 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-sm text-slate-300">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Now in public beta — 2,400+ creators onboarded
            </div>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Stop drowning in{" "}
              <span className="text-blue-400">spreadsheets</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              LedgerAI auto-categorizes your expenses, aggregates 1099s from
              YouTube, Patreon, and Stripe, and generates your Schedule C —
              cutting 15 hours of bookkeeping down to 30 minutes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="w-full rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white transition hover:bg-blue-600 sm:w-auto"
              >
                Start Free Trial
              </Link>
              <Link
                href="/features"
                className="w-full rounded-lg border border-slate-700 px-8 py-3 font-semibold text-slate-300 transition hover:border-slate-500 sm:w-auto"
              >
                See How It Works
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              14-day free trial &middot; No credit card required
            </p>

            {/* Mock Dashboard Screenshot */}
            <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 shadow-2xl shadow-blue-500/5">
              <div className="flex items-center gap-2 border-b border-slate-700 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-green-500/70" />
                <span className="ml-4 text-xs text-slate-500">
                  app.ledgerai.com/dashboard
                </span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
                    <p className="text-xs text-slate-500">Total Income (YTD)</p>
                    <p className="mt-1 text-2xl font-bold text-green-400">
                      $87,432
                    </p>
                    <p className="mt-1 text-xs text-green-500">+12% vs last year</p>
                  </div>
                  <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
                    <p className="text-xs text-slate-500">Deductions Found</p>
                    <p className="mt-1 text-2xl font-bold text-blue-400">
                      $14,891
                    </p>
                    <p className="mt-1 text-xs text-blue-400">32 items auto-tagged</p>
                  </div>
                  <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
                    <p className="text-xs text-slate-500">Est. Tax Owed (Q1)</p>
                    <p className="mt-1 text-2xl font-bold text-yellow-500">
                      $4,218
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Due Apr 15, 2026</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { desc: "Adobe Creative Cloud", cat: "Software", amt: "-$54.99", color: "text-blue-400" },
                    { desc: "Sony A7IV Camera Body", cat: "Equipment", amt: "-$2,498.00", color: "text-purple-500" },
                    { desc: "YouTube AdSense", cat: "Income", amt: "+$3,241.87", color: "text-green-400" },
                    { desc: "Home Office Internet", cat: "Utilities", amt: "-$89.00", color: "text-blue-400" },
                  ].map((tx, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`rounded px-2 py-0.5 text-xs ${tx.color} bg-slate-700/50`}>
                          {tx.cat}
                        </span>
                        <span className="text-sm text-slate-300">{tx.desc}</span>
                      </div>
                      <span className={`text-sm font-medium ${tx.amt.startsWith("+") ? "text-green-400" : "text-slate-300"}`}>
                        {tx.amt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Agitation */}
        <section className="border-t border-slate-800 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                You&apos;re losing <span className="text-red-500">15 hours every month</span> to manual bookkeeping
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                Categorizing transactions by hand, hunting down receipts, and
                guessing at quarterly estimates. Sound familiar?
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { time: "6 hrs", task: "Manual transaction categorization", pain: "Copy-pasting from bank statements into spreadsheets" },
                { time: "5 hrs", task: "Receipt tracking & matching", pain: "Digging through email for digital receipts you forgot to save" },
                { time: "4 hrs", task: "Tax estimate calculations", pain: "Googling safe harbor rules and hoping your math is right" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
                  <div className="text-3xl font-bold text-red-500">{item.time}</div>
                  <div className="mt-2 font-semibold text-slate-200">{item.task}</div>
                  <p className="mt-2 text-sm text-slate-500">{item.pain}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution - 3 Steps */}
        <section className="border-t border-slate-800 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              From chaos to <span className="text-blue-400">tax-ready</span> in 3 steps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              LedgerAI handles the tedious parts so you can focus on creating content.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.num} className="relative rounded-xl border border-slate-700 bg-slate-800/30 p-8">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    {step.icon}
                  </div>
                  <div className="absolute top-4 right-4 text-xs font-bold text-slate-600">
                    Step {step.num}
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-t border-slate-800 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl font-bold sm:text-4xl">
              Trusted by <span className="text-blue-400">creators</span> who hate tax season
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.handle}
                  className="rounded-xl border border-slate-700 bg-slate-800/30 p-6"
                >
                  <p className="text-sm leading-relaxed text-slate-300">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-400">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.platform}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t border-slate-800 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Less than the cost of one hour with a bookkeeper.
            </p>
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-blue-500/50 bg-slate-800/50 p-8 ring-1 ring-blue-500/20">
                <div className="text-sm font-semibold text-blue-400">
                  Monthly
                </div>
                <div className="mt-2 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">$29</span>
                  <span className="text-slate-500">/mo</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  14-day free trial included
                </p>
                <ul className="mt-6 space-y-3 text-left text-sm text-slate-300">
                  {[
                    "Unlimited transaction imports",
                    "AI expense categorization",
                    "Multi-platform 1099 aggregation",
                    "Quarterly tax estimates & reminders",
                    "Schedule C generation",
                    "Receipt scanning (unlimited)",
                    "Direct accountant export",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <svg className="h-4 w-4 shrink-0 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className="mt-8 block rounded-lg bg-blue-500 py-3 text-center font-semibold text-white transition hover:bg-blue-600"
                >
                  Start Free Trial
                </Link>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-8">
                <div className="text-sm font-semibold text-slate-400">
                  Tax Season Pass
                </div>
                <div className="mt-2 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">$99</span>
                  <span className="text-slate-500">one-time</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Pay once at filing time
                </p>
                <ul className="mt-6 space-y-3 text-left text-sm text-slate-300">
                  {[
                    "Full year transaction import",
                    "AI categorization for all expenses",
                    "1099 aggregation from all platforms",
                    "Schedule C generation",
                    "TurboTax / accountant export",
                    "Email support",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <svg className="h-4 w-4 shrink-0 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className="mt-8 block rounded-lg border border-slate-600 py-3 text-center font-semibold text-slate-300 transition hover:border-slate-400"
                >
                  Buy Tax Season Pass
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Reversal */}
        <section className="border-t border-slate-800 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Zero risk. Full control.</h2>
            <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-3">
              {[
                {
                  title: "Cancel anytime",
                  desc: "No contracts, no lock-in. Cancel from your settings with one click.",
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />,
                },
                {
                  title: "Export to TurboTax",
                  desc: "One-click export to TurboTax, H&R Block, or your accountant's preferred format.",
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />,
                },
                {
                  title: "Bank-grade security",
                  desc: "256-bit encryption, SOC 2 compliant, and read-only bank access via Plaid.",
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-700 bg-slate-800/30 p-6">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-slate-800 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to reclaim your weekends?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Join 2,400+ creators who stopped dreading tax season.
            </p>
            <Link
              href="/dashboard"
              className="mt-8 inline-block rounded-lg bg-blue-500 px-10 py-4 text-lg font-semibold text-white transition hover:bg-blue-600"
            >
              Start Your Free Trial
            </Link>
            <p className="mt-3 text-sm text-slate-500">
              14-day trial &middot; No credit card &middot; Cancel anytime
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
