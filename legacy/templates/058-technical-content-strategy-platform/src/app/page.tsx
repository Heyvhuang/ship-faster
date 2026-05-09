import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const trendData = [
  { tech: "Bun", category: "Runtime", score: 94, saturation: "Low", delta: "+18%", opportunity: "High" },
  { tech: "HTMX", category: "Frontend", score: 89, saturation: "Low", delta: "+32%", opportunity: "High" },
  { tech: "Drizzle ORM", category: "Database", score: 86, saturation: "Very Low", delta: "+45%", opportunity: "Very High" },
  { tech: "Effect-TS", category: "Language", score: 82, saturation: "Very Low", delta: "+28%", opportunity: "Very High" },
  { tech: "Astro", category: "Framework", score: 78, saturation: "Medium", delta: "+12%", opportunity: "Medium" },
  { tech: "Deno 2", category: "Runtime", score: 76, saturation: "Low", delta: "+22%", opportunity: "High" },
];

const testimonials = [
  {
    quote: "Radar's monthly reports helped us publish content on Bun and HTMX weeks before our competitors even started writing drafts.",
    name: "Sarah Chen",
    title: "Head of Developer Marketing, StreamDev",
  },
  {
    quote: "We used to spend days researching what to write about. Now Radar delivers the insights and we just execute.",
    name: "Marcus Rivera",
    title: "Content Lead, APIForge",
  },
  {
    quote: "The opportunity scoring is incredibly accurate. We've seen 3x more organic traffic on Radar-recommended topics.",
    name: "Priya Patel",
    title: "VP Marketing, CloudNative Labs",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-fade-in-up">
              <span className="inline-block text-xs font-mono tracking-widest uppercase text-teal mb-6 border border-teal/30 rounded-full px-4 py-1.5">
                Technical Content Intelligence
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
                Know what developers want to read{" "}
                <span className="text-teal">before your competitors do</span>
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
                Data-driven content strategy for developer marketing teams. We analyze GitHub trends,
                community signals, and content gaps to deliver monthly opportunity reports.
              </p>
            </div>
            <div className="animate-fade-in-up animate-delay-200 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-teal hover:bg-teal-dark text-background font-semibold px-8 py-3.5 rounded-lg transition-colors text-base"
              >
                Book a Demo
              </Link>
              <Link
                href="/sample-report"
                className="border border-border hover:border-muted text-foreground font-medium px-8 py-3.5 rounded-lg transition-colors text-base"
              >
                View Sample Report
              </Link>
            </div>
            <p className="text-xs text-muted mt-4 animate-fade-in-up animate-delay-300">
              Early-bird pricing: $800/month per vertical • Limited availability
            </p>
          </div>
        </section>

        {/* Problem */}
        <section className="py-20 px-6 border-t border-border">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The content saturation problem</h2>
              <p className="text-muted max-w-2xl mx-auto">
                By the time most teams identify a trending technology, the top search positions are already claimed.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "📉",
                  title: "Late to the trend",
                  desc: "Manual research means you're writing about topics after they've peaked. Your content fights for scraps of organic traffic.",
                },
                {
                  icon: "🔍",
                  title: "Guesswork over data",
                  desc: "Most dev marketing teams rely on gut feel and Twitter chatter instead of systematic trend analysis.",
                },
                {
                  icon: "⏱️",
                  title: "Wasted cycles",
                  desc: "Your team spends 20+ hours monthly on research that could be automated — time better spent creating content.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-surface border border-border rounded-xl p-6 hover:border-teal/30 transition-colors"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution preview */}
        <section className="py-20 px-6 bg-surface border-y border-border">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Live trend data preview</h2>
              <p className="text-muted max-w-2xl mx-auto">
                A snapshot from this month&apos;s report. Full reports include 25+ technologies with detailed analysis.
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted text-left">
                    <th className="px-5 py-3 font-medium">Technology</th>
                    <th className="px-5 py-3 font-medium">Category</th>
                    <th className="px-5 py-3 font-medium font-mono">Score</th>
                    <th className="px-5 py-3 font-medium">Saturation</th>
                    <th className="px-5 py-3 font-medium font-mono">30d Δ</th>
                    <th className="px-5 py-3 font-medium">Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  {trendData.map((row) => (
                    <tr key={row.tech} className="border-b border-border/50 hover:bg-surface-light/50 transition-colors">
                      <td className="px-5 py-3.5 font-semibold">{row.tech}</td>
                      <td className="px-5 py-3.5 text-muted">{row.category}</td>
                      <td className="px-5 py-3.5 font-mono text-teal">{row.score}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            row.saturation === "Very Low"
                              ? "bg-teal/10 text-teal"
                              : row.saturation === "Low"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {row.saturation}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-green-400">{row.delta}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-xs font-semibold ${
                            row.opportunity === "Very High"
                              ? "text-teal"
                              : row.opportunity === "High"
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {row.opportunity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/sample-report"
                className="text-teal hover:text-teal-dark font-medium text-sm transition-colors"
              >
                View full sample report →
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What you get every month</h2>
              <p className="text-muted max-w-2xl mx-auto">
                Each report is tailored to your target verticals and competitive landscape.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Trend Identification", desc: "25+ technologies scored and ranked by momentum, community growth, and search interest." },
                { title: "Opportunity Scoring", desc: "Content saturation analysis so you know where gaps exist and where it's too late." },
                { title: "Content Angles", desc: "Specific article ideas with recommended formats, angles, and optimal publish timing." },
                { title: "Competitor Gap Analysis", desc: "See what your competitors are writing about — and more importantly, what they're missing." },
                { title: "Keyword Difficulty", desc: "Technical keyword analysis so you target terms you can actually rank for." },
                { title: "Strategy Consultation", desc: "Quarterly 1:1 call to review performance and adjust your content calendar." },
              ].map((f) => (
                <div key={f.title} className="bg-surface border border-border rounded-xl p-6 hover:border-teal/30 transition-colors">
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6 bg-surface border-y border-border">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
              <p className="text-muted max-w-2xl mx-auto">
                One vertical, one report, one price. Scale as you grow.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-background border border-border rounded-xl p-8">
                <div className="text-sm text-muted mb-1">Starter</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold font-mono">$800</span>
                  <span className="text-muted">/mo</span>
                </div>
                <p className="text-xs text-teal mb-6">Early-bird pricing</p>
                <ul className="space-y-3 text-sm text-muted mb-8">
                  {[
                    "1 technology vertical",
                    "Monthly trend report (PDF)",
                    "25+ technologies scored",
                    "Content angle recommendations",
                    "Keyword difficulty analysis",
                    "Email support",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-teal">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className="block text-center bg-teal hover:bg-teal-dark text-background font-semibold py-3 rounded-lg transition-colors"
                >
                  Get Started
                </Link>
              </div>
              <div className="bg-background border-2 border-teal rounded-xl p-8 relative">
                <span className="absolute -top-3 left-6 bg-teal text-background text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
                <div className="text-sm text-muted mb-1">Enterprise</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold font-mono">$2,400</span>
                  <span className="text-muted">/mo</span>
                </div>
                <p className="text-xs text-muted mb-6">Billed annually</p>
                <ul className="space-y-3 text-sm text-muted mb-8">
                  {[
                    "Up to 5 technology verticals",
                    "Weekly trend updates",
                    "50+ technologies scored",
                    "Competitor content gap analysis",
                    "Quarterly strategy consultation",
                    "Slack channel integration",
                    "Priority support",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-teal">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className="block text-center bg-teal hover:bg-teal-dark text-background font-semibold py-3 rounded-lg transition-colors"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center">
              Trusted by developer marketing teams
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-surface border border-border rounded-xl p-6">
                  <p className="text-sm leading-relaxed text-muted mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted">{t.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-20 px-6 bg-surface border-y border-border">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our methodology</h2>
            <p className="text-muted max-w-2xl mx-auto mb-12">
              We combine multiple data sources into a single opportunity score.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
              {[
                { step: "01", title: "Signal Collection", desc: "GitHub stars, forks, issues, and contributor activity across 10,000+ repositories." },
                { step: "02", title: "Content Audit", desc: "Crawl existing articles, tutorials, and docs to measure saturation per topic." },
                { step: "03", title: "Search Analysis", desc: "Keyword volume, difficulty, and intent signals for technical search queries." },
                { step: "04", title: "Opportunity Score", desc: "Weighted composite score combining momentum, gap size, and rankability." },
              ].map((s) => (
                <div key={s.step}>
                  <div className="text-teal font-mono text-sm mb-2">{s.step}</div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <Link
              href="/methodology"
              className="inline-block mt-10 text-teal hover:text-teal-dark font-medium text-sm transition-colors"
            >
              Learn more about our methodology →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stop guessing. Start leading.
            </h2>
            <p className="text-muted mb-8">
              Join the developer marketing teams using Radar to publish the right content at the right time.
            </p>
            <Link
              href="/demo"
              className="inline-block bg-teal hover:bg-teal-dark text-background font-semibold px-10 py-4 rounded-lg transition-colors text-lg"
            >
              Book Your Demo
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
