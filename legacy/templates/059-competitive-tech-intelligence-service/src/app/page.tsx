import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  {
    num: "01",
    title: "Select Competitors",
    desc: "Tell us which companies in your vertical to track. We monitor up to 10 organizations per engagement.",
  },
  {
    num: "02",
    title: "We Analyze GitHub Activity",
    desc: "Our analysts map employee commits, starred repos, and dependency changes to build a technology adoption timeline.",
  },
  {
    num: "03",
    title: "Receive Actionable Intelligence",
    desc: "Get a monthly PDF report with stack breakdowns, trend signals, and strategic recommendations.",
  },
];

const insights = [
  {
    company: "Company A",
    signal: "Migrating from REST to gRPC",
    evidence: "14 new .proto files across 3 repos in last 30 days",
    impact: "High",
  },
  {
    company: "Company B",
    signal: "Adopting Rust for core services",
    evidence: "New Cargo.toml files; 6 engineers starring tokio/axum",
    impact: "Medium",
  },
  {
    company: "Company C",
    signal: "Evaluating OpenTelemetry",
    evidence: "OTel SDK added to 2 services; 4 team members forked otel-collector",
    impact: "Low",
  },
  {
    company: "Company D",
    signal: "Dropping Redux for Zustand",
    evidence: "zustand added to package.json in 5 frontend repos; redux removed in 3",
    impact: "Medium",
  },
];

const testimonials = [
  {
    quote: "Radar showed us our competitor was adopting Kubernetes three months before they announced it. We accelerated our own migration timeline.",
    name: "Sarah Chen",
    role: "VP Engineering, Series B SaaS",
  },
  {
    quote: "The monthly reports replaced hours of manual competitive research. Worth every dollar.",
    name: "Marcus Johnson",
    role: "CTO, DevTools Startup",
  },
  {
    quote: "We spotted a competitor evaluating the same ML framework we were considering — it confirmed our bet and saved us months of validation.",
    name: "Priya Patel",
    role: "Head of Product, AI Platform",
  },
];

const impactColor: Record<string, string> = {
  High: "text-red-400 bg-red-400/10",
  Medium: "text-yellow-400 bg-yellow-400/10",
  Low: "text-green-400 bg-green-400/10",
};

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08)_0%,_transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-block rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 font-mono text-xs text-accent">
            Competitive Tech Intelligence
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Know what your competitors{" "}
            <span className="text-accent">are building</span>
            <br />
            before they ship it
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Monthly intelligence reports revealing competitor technology stack decisions
            through GitHub activity analysis. Built for PMs and CTOs who need to stay
            ahead.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="w-full rounded-lg bg-accent px-8 py-3 text-center font-medium text-white transition-colors hover:bg-accent-hover sm:w-auto"
            >
              Book a Call
            </Link>
            <Link
              href="/sample-report"
              className="w-full rounded-lg border border-border px-8 py-3 text-center font-medium text-foreground transition-colors hover:bg-surface sm:w-auto"
            >
              View Sample Report
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">Starting at $1,000/month per report</p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-border bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted">
            Three steps to competitive intelligence you can actually act on.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.num}
                className="group rounded-xl border border-border bg-background p-8 transition-colors hover:border-accent/40"
              >
                <span className="font-mono text-3xl font-bold text-accent/40 group-hover:text-accent transition-colors">
                  {s.num}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Insights Teaser */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Sample Intelligence
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted">
            Anonymized snapshot from a recent B2B SaaS vertical report.
          </p>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left font-mono text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted">
                  <th className="py-3 pr-4">Target</th>
                  <th className="py-3 pr-4">Signal</th>
                  <th className="py-3 pr-4">Evidence</th>
                  <th className="py-3">Impact</th>
                </tr>
              </thead>
              <tbody>
                {insights.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-surface/60 transition-colors">
                    <td className="py-4 pr-4 font-semibold">{row.company}</td>
                    <td className="py-4 pr-4">{row.signal}</td>
                    <td className="py-4 pr-4 text-muted">{row.evidence}</td>
                    <td className="py-4">
                      <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${impactColor[row.impact]}`}>
                        {row.impact}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/sample-report"
              className="text-sm text-accent hover:text-accent-hover transition-colors"
            >
              View full sample report &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="border-t border-border bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            What Every Report Includes
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Stack Breakdown", desc: "Languages, frameworks, and libraries for each competitor — mapped from actual commits." },
              { title: "Adoption Timeline", desc: "When each technology was introduced, scaled, or deprecated across tracked repos." },
              { title: "Trend Signals", desc: "Emerging tools and patterns your competitors are evaluating before they go mainstream." },
              { title: "Executive Summary", desc: "1-page overview with key findings and strategic implications for your team." },
              { title: "Raw Data Export", desc: "CSV export of all data points for your own analysis and internal tooling." },
              { title: "Quarterly Strategy Call", desc: "45-minute deep dive with an analyst to discuss findings and next moves." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-background p-6 transition-colors hover:border-accent/30"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by Technical Leaders
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-8">
                <p className="text-sm leading-relaxed text-foreground/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to see what your competitors are building?
          </h2>
          <p className="mt-4 text-muted">
            Get your first competitive intelligence report within 7 days.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="w-full rounded-lg bg-accent px-8 py-3 text-center font-medium text-white transition-colors hover:bg-accent-hover sm:w-auto"
            >
              Book a Call
            </Link>
            <Link
              href="/pricing"
              className="w-full rounded-lg border border-border px-8 py-3 text-center font-medium text-foreground transition-colors hover:bg-background sm:w-auto"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
