import Link from "next/link";

const stats = [
  { label: "Papers Analyzed Weekly", value: "12,000+" },
  { label: "Healthcare AI Companies Served", value: "85+" },
  { label: "Regulatory Signals Detected", value: "340+" },
  { label: "Average Time Saved per Week", value: "18 hrs" },
];

const features = [
  {
    title: "Weekly Research Digests",
    description:
      "AI-curated summaries of the most relevant papers from arXiv, PubMed, and patent databases, delivered every Friday.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Competitor Publication Tracking",
    description:
      "Real-time monitoring of publications from specific companies, labs, and researchers you care about most.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Regulatory Relevance Scoring",
    description:
      "Every paper scored for FDA, EMA, and NMPA regulatory implications so you never miss a compliance-critical finding.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Business Impact Summaries",
    description:
      "Technical research translated into executive-ready insights with market implications and recommended actions.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Custom Keyword Monitoring",
    description:
      "Set up alerts for specific technologies, drug targets, disease areas, or regulatory terms relevant to your pipeline.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
  {
    title: "Patent Filing Alerts",
    description:
      "Track competitor patent applications and grants across USPTO, EPO, and WIPO to stay ahead of IP developments.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote:
      "ResearchPulse caught an FDA guidance change three weeks before our regulatory team. That early warning alone justified the annual subscription.",
    name: "Dr. Sarah Chen",
    role: "VP of Regulatory Affairs",
    company: "MedAI Therapeutics",
  },
  {
    quote:
      "We replaced two full-time analysts with ResearchPulse and got better coverage. The business impact summaries save our executives hours every week.",
    name: "James Rodriguez",
    role: "Director of Competitive Intelligence",
    company: "NeuralHealth Inc.",
  },
  {
    quote:
      "The competitor publication tracking helped us identify a patent conflict before we filed our own application. Saved us an estimated $2M in legal fees.",
    name: "Dr. Priya Patel",
    role: "Chief Science Officer",
    company: "BioVision AI",
  },
];

const sampleInsights = [
  {
    tag: "Regulatory Signal",
    tagColor: "bg-red-100 text-red-700",
    title: "FDA Draft Guidance on AI-Enabled Diagnostic Devices",
    source: "Federal Register • Feb 14, 2026",
    impact: "High",
    impactColor: "text-red-600",
    summary:
      "New draft guidance proposes updated validation requirements for AI/ML-based diagnostic software. Comments due by April 15. Affects all SaMD submissions in 2026.",
  },
  {
    tag: "Competitor Alert",
    tagColor: "bg-amber-100 text-amber-700",
    title: "DeepMind Health Publishes Retinal Disease Detection at Scale",
    source: "Nature Medicine • Feb 12, 2026",
    impact: "Medium",
    impactColor: "text-amber-600",
    summary:
      "Study validates AI model across 14 hospital systems with 97.3% sensitivity. Direct competitive threat to companies in ophthalmic AI space.",
  },
  {
    tag: "Market Opportunity",
    tagColor: "bg-emerald-100 text-emerald-700",
    title: "Gap Identified in Pediatric Radiology AI Literature",
    source: "arXiv Analysis • Feb 10, 2026",
    impact: "Medium",
    impactColor: "text-amber-600",
    summary:
      "Only 3 papers published on pediatric-specific radiology AI in Q1 2026. Underserved market with growing demand from children&apos;s hospitals.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-blue-700/50 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-200">
              Healthcare AI Research Intelligence
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Turn Academic Research into{" "}
              <span className="text-sky-400">Competitive Advantage</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-blue-100">
              Weekly AI-curated digests that flag FDA-relevant studies, competitor patent filings,
              and emerging trends — so your R&amp;D team never misses a critical insight.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="w-full rounded-lg bg-sky-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-sky-400 sm:w-auto"
              >
                Request a Demo
              </Link>
              <Link
                href="/digest"
                className="w-full rounded-lg border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                View Sample Digest
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="-mt-10 relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-extrabold text-blue-800 sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-slate-500 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Insights Preview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            This Week&apos;s Healthcare AI Highlights
          </h2>
          <p className="mt-3 text-slate-500">
            A preview of the actionable insights delivered in every digest.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {sampleInsights.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${item.tagColor}`}>
                  {item.tag}
                </span>
                <span className={`text-xs font-bold ${item.impactColor}`}>
                  {item.impact} Impact
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-xs text-slate-400">{item.source}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/digest" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
            View full sample digest &rarr;
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Everything Your R&amp;D Team Needs
            </h2>
            <p className="mt-3 text-slate-500">
              From paper analysis to patent alerts, we cover the full intelligence lifecycle.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">How It Works</h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { step: "1", title: "Submit Focus Areas", desc: "Tell us your research topics, competitor list, and keywords." },
            { step: "2", title: "Automated Scanning", desc: "We scan arXiv, PubMed, and patent databases daily." },
            { step: "3", title: "AI Filtering", desc: "ML models score relevance and regulatory impact." },
            { step: "4", title: "Expert Curation", desc: "Analysts add business context to top findings." },
            { step: "5", title: "Friday Delivery", desc: "Your digest arrives with action items ready to go." },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-lg font-bold text-white">
                {s.step}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Trusted by Healthcare AI Leaders</h2>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl bg-white/10 p-6 backdrop-blur">
                <p className="text-sm leading-relaxed text-blue-100">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-blue-300">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Stop Missing Critical Research</h2>
        <p className="mt-4 text-lg text-slate-500">
          Join 85+ healthcare AI companies already using ResearchPulse to stay ahead of competitors and regulatory changes.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/demo"
            className="w-full rounded-lg bg-blue-700 px-8 py-3.5 text-sm font-semibold text-white shadow hover:bg-blue-800 sm:w-auto"
          >
            Request a Demo
          </Link>
          <Link
            href="/pricing"
            className="w-full rounded-lg border border-slate-300 px-8 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto"
          >
            View Pricing
          </Link>
        </div>
      </section>
    </>
  );
}
