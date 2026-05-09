import Link from "next/link";

const experts = [
  {
    name: "Sarah Chen",
    title: "Ex-Stripe PM, 3x Founder",
    domain: "Fintech / SaaS",
    validated: 127,
    avatar: "SC",
    rating: 4.9,
  },
  {
    name: "Marcus Johnson",
    title: "YC W21, Sold for $12M",
    domain: "Marketplace / Consumer",
    validated: 89,
    avatar: "MJ",
    rating: 4.8,
  },
  {
    name: "Priya Patel",
    title: "Ex-Google, AI Startup Advisor",
    domain: "AI / Developer Tools",
    validated: 156,
    avatar: "PP",
    rating: 5.0,
  },
  {
    name: "David Kim",
    title: "Serial Founder, Angel Investor",
    domain: "E-commerce / D2C",
    validated: 94,
    avatar: "DK",
    rating: 4.7,
  },
];

const testimonials = [
  {
    quote:
      "Radar saved me 6 months and $40K. The validation report showed my market was 10x smaller than I thought — and pointed me to an adjacent opportunity that actually worked.",
    name: "Alex Rivera",
    role: "Founder, ShipFast",
    company: "YC S23",
  },
  {
    quote:
      "The competitor data analysis alone was worth the price. My expert found 3 direct competitors I had completely missed, plus showed me the gap none of them were filling.",
    name: "Emma Zhao",
    role: "CEO, DataPulse",
    company: "Techstars '23",
  },
  {
    quote:
      "I was about to quit my job for a bad idea. The Radar report was honest, data-backed, and gave me a clear pivot direction that I'm now pursuing with paying customers.",
    name: "James Okafor",
    role: "Founder, Veltro",
    company: "Indie Hacker",
  },
];

const reportSections = [
  { icon: "📊", title: "Market Size Analysis", desc: "TAM/SAM/SOM with sourced data points" },
  { icon: "🏆", title: "Competitor Landscape", desc: "Direct & indirect competitors mapped" },
  { icon: "🎯", title: "Target User Validation", desc: "ICP definition & demand signals" },
  { icon: "🚩", title: "Red Flags & Risks", desc: "Honest assessment of blockers" },
  { icon: "✅", title: "Go/No-Go Recommendation", desc: "Clear verdict with reasoning" },
  { icon: "🗺️", title: "Next Steps Roadmap", desc: "Actionable plan if you proceed" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg text-slate-900">Radar</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-900 transition">
              How it Works
            </a>
            <a href="#experts" className="hover:text-slate-900 transition">
              Experts
            </a>
            <a href="#pricing" className="hover:text-slate-900 transition">
              Pricing
            </a>
            <a href="#report" className="hover:text-slate-900 transition">
              Sample Report
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/quiz"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Free Assessment
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
            >
              Submit Idea
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Trusted by 400+ founders
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Validate your startup idea with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                expert analysis + competitor data
              </span>{" "}
              in 48 hours
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Stop guessing. Get a data-backed validation report from experienced founders
              who analyze real market data and competitor intelligence for your idea.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/25 transition"
              >
                Take Free 2-Min Assessment
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="#report"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                See Sample Report
              </a>
            </div>
            <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                48-hour turnaround
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Money-back guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                1 revision included
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-slate-500 mb-6">Validated by founders from</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-slate-400 font-semibold text-lg">
            {["Y Combinator", "Techstars", "500 Global", "On Deck", "Indie Hackers", "Product Hunt"].map((name) => (
              <span key={name} className="opacity-40 hover:opacity-70 transition">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How it works</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              From vague idea to structured validation report in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "1",
                title: "Submit Your Idea",
                desc: "Fill out our structured form: market, target users, competitors you know, and your core hypothesis. Takes 10 minutes.",
                color: "from-blue-500 to-blue-600",
              },
              {
                step: "2",
                title: "Expert Reviews + Data",
                desc: "A matched expert analyzes your idea using real competitor data from product platforms, market research, and their own experience.",
                color: "from-emerald-500 to-emerald-600",
              },
              {
                step: "3",
                title: "Get Your Report",
                desc: "Receive a detailed validation report with market sizing, competitor mapping, red flags, and a clear go/no-go recommendation.",
                color: "from-violet-500 to-violet-600",
              },
            ].map((item) => (
              <div key={item.step} className="relative p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-sm mb-5`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Report Preview */}
      <section id="report" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              What you get in your validation report
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Every report includes 6 critical sections backed by real data
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportSections.map((section) => (
              <div
                key={section.title}
                className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm"
              >
                <span className="text-2xl">{section.icon}</span>
                <h3 className="mt-3 font-semibold text-slate-900">{section.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{section.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/report-sample"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
            >
              View Full Sample Report
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Experts */}
      <section id="experts" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Meet our expert validators</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Experienced founders and operators who&apos;ve built, sold, and scaled real companies
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experts.map((expert) => (
              <div
                key={expert.name}
                className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg mx-auto">
                  {expert.avatar}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{expert.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{expert.title}</p>
                <span className="inline-block mt-3 px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full">
                  {expert.domain}
                </span>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
                  <span className="text-amber-500">★ {expert.rating}</span>
                  <span>·</span>
                  <span>{expert.validated} validated</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Simple, transparent pricing</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Choose the depth of validation you need. All plans include our money-back guarantee.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "$97",
                desc: "Quick market sanity check",
                features: [
                  "Market size estimate",
                  "Top 5 competitor overview",
                  "Basic red flag analysis",
                  "Go/No-Go recommendation",
                  "48-hour delivery",
                ],
                cta: "Get Basic Validation",
                popular: false,
              },
              {
                name: "Full",
                price: "$197",
                desc: "Complete validation report",
                features: [
                  "Everything in Basic",
                  "Deep competitor data analysis",
                  "Target user validation",
                  "Revenue model assessment",
                  "Detailed next-steps roadmap",
                  "1 round of revisions",
                ],
                cta: "Get Full Validation",
                popular: true,
              },
              {
                name: "Premium",
                price: "$297",
                desc: "Full report + expert call",
                features: [
                  "Everything in Full",
                  "45-min strategy call with expert",
                  "Custom competitive positioning",
                  "Go-to-market suggestions",
                  "2 rounds of revisions",
                  "Priority 24-hour delivery",
                ],
                cta: "Get Premium Validation",
                popular: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl border shadow-sm ${
                  plan.popular
                    ? "bg-white border-blue-200 shadow-blue-100/50 ring-1 ring-blue-200"
                    : "bg-white border-slate-100"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 ml-1">one-time</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">{plan.desc}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/submit"
                  className={`mt-8 w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl transition ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Founders trust Radar
            </h2>
            <p className="mt-4 text-lg text-slate-600">Real feedback from real founders</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-blue-600 to-emerald-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Stop building on assumptions
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
            Get your startup idea validated with real data and expert analysis before you invest months and thousands of dollars.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition shadow-lg"
            >
              Start Free Assessment
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition"
            >
              Submit Your Idea Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">R</span>
                </div>
                <span className="font-semibold text-white">Radar</span>
              </div>
              <p className="text-sm leading-relaxed">
                Data-backed startup idea validation by experienced founders.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-white transition">How it Works</a></li>
                <li><Link href="/report-sample" className="hover:text-white transition">Sample Report</Link></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#experts" className="hover:text-white transition">Our Experts</a></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-3">Get Started</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/quiz" className="hover:text-white transition">Free Assessment</Link></li>
                <li><Link href="/submit" className="hover:text-white transition">Submit an Idea</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-slate-800 text-sm text-center">
            © 2026 Radar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
