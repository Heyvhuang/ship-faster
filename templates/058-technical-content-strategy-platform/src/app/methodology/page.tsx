import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Methodology — Radar",
  description: "How Radar identifies trending technologies and content opportunities for developer marketing teams.",
};

const dataSources = [
  {
    name: "GitHub Activity",
    desc: "We track stars, forks, issues, pull requests, and contributor growth across 10,000+ repositories daily. Velocity matters more than absolute numbers — a repo gaining 200 stars/week from 2k total signals stronger than one gaining 200/week from 100k.",
    metrics: ["Star velocity", "Fork-to-star ratio", "Issue activity", "Contributor growth", "Release cadence"],
  },
  {
    name: "Community Signals",
    desc: "Developer discussions on Reddit, Hacker News, Dev.to, and Stack Overflow are monitored for sentiment and volume. We weight recent mentions more heavily and filter out promotional content.",
    metrics: ["Discussion volume", "Sentiment analysis", "Question frequency", "Cross-platform mentions"],
  },
  {
    name: "Search Intelligence",
    desc: "Google search trends, keyword volumes, and SERP analysis reveal what developers are actively looking for. We identify gaps where demand exists but quality content doesn't.",
    metrics: ["Keyword volume trends", "SERP competition", "Content freshness", "Featured snippet gaps"],
  },
  {
    name: "Content Saturation Audit",
    desc: "We crawl the top 50 results for each target keyword and assess content quality, freshness, and depth. High-volume keywords with thin or outdated content represent prime opportunities.",
    metrics: ["Article count", "Content age", "Depth score", "Authority distribution"],
  },
];

export default function Methodology() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Our methodology</h1>
            <p className="text-muted max-w-2xl leading-relaxed">
              Radar combines multiple data sources into a single opportunity score that tells you
              exactly where to focus your content efforts.
            </p>
          </div>

          {/* Scoring */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">The Opportunity Score</h2>
            <div className="bg-surface border border-border rounded-xl p-6 mb-8">
              <p className="text-sm text-muted leading-relaxed mb-6">
                Every technology receives a composite score from 0-100 based on three weighted dimensions:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: "Momentum", weight: "40%", desc: "How fast is interest growing? Measured by GitHub velocity, search trend slope, and community mention frequency." },
                  { label: "Content Gap", weight: "35%", desc: "How saturated is the existing content landscape? Low saturation + high demand = high opportunity." },
                  { label: "Rankability", weight: "25%", desc: "How feasible is it to rank? Based on keyword difficulty, domain authority requirements, and SERP features." },
                ].map((d) => (
                  <div key={d.label} className="bg-background border border-border rounded-lg p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{d.label}</h3>
                      <span className="font-mono text-teal text-sm">{d.weight}</span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Data Sources */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Data sources</h2>
            <div className="space-y-6">
              {dataSources.map((src, i) => (
                <div key={src.name} className="bg-surface border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-teal font-mono text-sm">0{i + 1}</span>
                    <h3 className="font-semibold text-lg">{src.name}</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-4">{src.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {src.metrics.map((m) => (
                      <span key={m} className="text-xs bg-background border border-border rounded-full px-3 py-1 text-muted">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Monthly process</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { step: "Week 1", title: "Data Collection", desc: "Aggregate signals from all sources for your target verticals." },
                { step: "Week 2", title: "Analysis", desc: "Score and rank technologies. Identify emerging trends and declining ones." },
                { step: "Week 3", title: "Content Strategy", desc: "Map opportunities to specific content angles, formats, and keywords." },
                { step: "Week 4", title: "Report Delivery", desc: "Polished PDF with executive summary, data tables, and action items." },
              ].map((s) => (
                <div key={s.step} className="bg-surface border border-border rounded-xl p-5">
                  <div className="text-teal font-mono text-xs mb-2">{s.step}</div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-surface border border-border rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">See the methodology in action</h2>
            <p className="text-muted text-sm mb-6 max-w-lg mx-auto">
              Check out a real sample report or book a demo to discuss your specific verticals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sample-report"
                className="border border-border hover:border-muted text-foreground font-medium px-6 py-3 rounded-lg transition-colors text-sm"
              >
                View Sample Report
              </Link>
              <Link
                href="/demo"
                className="bg-teal hover:bg-teal-dark text-background font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
              >
                Book a Demo
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
