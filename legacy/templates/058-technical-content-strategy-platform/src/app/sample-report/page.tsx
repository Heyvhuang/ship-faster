import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sample Report — Radar",
  description: "Preview a monthly technical content opportunity report from Radar.",
};

const technologies = [
  { rank: 1, tech: "Bun", category: "Runtime", score: 94, saturation: "Low", delta: "+18%", stars: "74.2k", opportunity: "High", angles: ["Migration guide from Node.js", "Bun vs Deno 2 benchmark", "Building a CLI with Bun"] },
  { rank: 2, tech: "HTMX", category: "Frontend", score: 89, saturation: "Low", delta: "+32%", stars: "41.8k", opportunity: "High", angles: ["HTMX + Go starter template", "When NOT to use HTMX", "HTMX in production: case study"] },
  { rank: 3, tech: "Drizzle ORM", category: "Database", score: 86, saturation: "Very Low", delta: "+45%", stars: "28.6k", opportunity: "Very High", angles: ["Drizzle vs Prisma deep dive", "Type-safe SQL with Drizzle", "Drizzle + Turso edge database"] },
  { rank: 4, tech: "Effect-TS", category: "Language", score: 82, saturation: "Very Low", delta: "+28%", stars: "8.4k", opportunity: "Very High", angles: ["Effect-TS for error handling", "Functional TypeScript patterns", "Effect vs fp-ts comparison"] },
  { rank: 5, tech: "Astro", category: "Framework", score: 78, saturation: "Medium", delta: "+12%", stars: "49.1k", opportunity: "Medium", angles: ["Astro 5 migration guide", "Content collections deep dive", "Astro + MDX blog setup"] },
  { rank: 6, tech: "Deno 2", category: "Runtime", score: 76, saturation: "Low", delta: "+22%", stars: "101k", opportunity: "High", angles: ["Deno 2 breaking changes", "Deno Fresh framework", "Node compat layer overview"] },
  { rank: 7, tech: "Biome", category: "Tooling", score: 74, saturation: "Very Low", delta: "+38%", stars: "16.2k", opportunity: "Very High", angles: ["Biome vs ESLint + Prettier", "Zero-config linting with Biome", "Migrating to Biome"] },
  { rank: 8, tech: "Tauri 2", category: "Desktop", score: 71, saturation: "Low", delta: "+15%", stars: "89.3k", opportunity: "High", angles: ["Tauri 2 mobile support", "Tauri vs Electron 2025", "Building a desktop app with Tauri"] },
];

const keywordData = [
  { keyword: "bun vs node", volume: "8,100/mo", difficulty: 34, intent: "Comparison" },
  { keyword: "htmx tutorial", volume: "6,600/mo", difficulty: 28, intent: "Educational" },
  { keyword: "drizzle orm", volume: "12,100/mo", difficulty: 22, intent: "Navigational" },
  { keyword: "effect typescript", volume: "2,400/mo", difficulty: 12, intent: "Educational" },
  { keyword: "astro vs next.js", volume: "5,400/mo", difficulty: 45, intent: "Comparison" },
  { keyword: "biome linter", volume: "3,200/mo", difficulty: 15, intent: "Navigational" },
];

export default function SampleReport() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <span className="text-xs font-mono tracking-widest uppercase text-teal mb-4 block">
              Sample Report • March 2026
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Monthly Trend Report: JavaScript & TypeScript Ecosystem
            </h1>
            <p className="text-muted max-w-3xl leading-relaxed">
              This is a preview of Radar&apos;s monthly deliverable. Full reports include deeper analysis,
              competitor-specific gap data, and actionable content calendar recommendations.
            </p>
          </div>

          {/* Executive Summary */}
          <section className="mb-14">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-teal font-mono text-sm">01</span> Executive Summary
            </h2>
            <div className="bg-surface border border-border rounded-xl p-6">
              <p className="text-sm text-muted leading-relaxed mb-4">
                The JavaScript ecosystem continues to see strong momentum in alternative runtimes (Bun, Deno 2)
                and lightweight frontend approaches (HTMX). The biggest content opportunities this month are in
                the <strong className="text-foreground">ORM space</strong> (Drizzle) and{" "}
                <strong className="text-foreground">functional TypeScript</strong> (Effect-TS), where developer
                interest is surging but existing content is sparse.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Technologies Analyzed", value: "47" },
                  { label: "High Opportunity", value: "12" },
                  { label: "New This Month", value: "3" },
                  { label: "Avg. Content Gap", value: "68%" },
                ].map((s) => (
                  <div key={s.label} className="bg-background rounded-lg p-4 border border-border">
                    <div className="font-mono text-2xl font-bold text-teal">{s.value}</div>
                    <div className="text-xs text-muted mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trend Table */}
          <section className="mb-14">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-teal font-mono text-sm">02</span> Top Trending Technologies
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted text-left">
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">Technology</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium font-mono">Score</th>
                    <th className="px-4 py-3 font-medium font-mono">GitHub ★</th>
                    <th className="px-4 py-3 font-medium font-mono">30d Δ</th>
                    <th className="px-4 py-3 font-medium">Saturation</th>
                    <th className="px-4 py-3 font-medium">Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  {technologies.map((row) => (
                    <tr key={row.tech} className="border-b border-border/50 hover:bg-surface-light/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-muted">{row.rank}</td>
                      <td className="px-4 py-3 font-semibold">{row.tech}</td>
                      <td className="px-4 py-3 text-muted">{row.category}</td>
                      <td className="px-4 py-3 font-mono text-teal">{row.score}</td>
                      <td className="px-4 py-3 font-mono text-muted">{row.stars}</td>
                      <td className="px-4 py-3 font-mono text-green-400">{row.delta}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          row.saturation === "Very Low" ? "bg-teal/10 text-teal"
                          : row.saturation === "Low" ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                        }`}>
                          {row.saturation}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold ${
                          row.opportunity === "Very High" ? "text-teal"
                          : row.opportunity === "High" ? "text-green-400"
                          : "text-yellow-400"
                        }`}>
                          {row.opportunity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Content Angles */}
          <section className="mb-14">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-teal font-mono text-sm">03</span> Recommended Content Angles
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {technologies.slice(0, 4).map((t) => (
                <div key={t.tech} className="bg-surface border border-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{t.tech}</h3>
                    <span className="font-mono text-xs text-teal">{t.score}/100</span>
                  </div>
                  <ul className="space-y-2">
                    {t.angles.map((a) => (
                      <li key={a} className="flex gap-2 text-sm text-muted">
                        <span className="text-teal mt-0.5">→</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Keyword Analysis */}
          <section className="mb-14">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-teal font-mono text-sm">04</span> Keyword Opportunity Analysis
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted text-left">
                    <th className="px-4 py-3 font-medium">Keyword</th>
                    <th className="px-4 py-3 font-medium font-mono">Volume</th>
                    <th className="px-4 py-3 font-medium font-mono">Difficulty</th>
                    <th className="px-4 py-3 font-medium">Intent</th>
                  </tr>
                </thead>
                <tbody>
                  {keywordData.map((row) => (
                    <tr key={row.keyword} className="border-b border-border/50 hover:bg-surface-light/50 transition-colors">
                      <td className="px-4 py-3 font-mono">{row.keyword}</td>
                      <td className="px-4 py-3 font-mono text-muted">{row.volume}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                row.difficulty < 25 ? "bg-teal" : row.difficulty < 40 ? "bg-green-400" : "bg-yellow-400"
                              }`}
                              style={{ width: `${row.difficulty}%` }}
                            />
                          </div>
                          <span className="font-mono text-muted">{row.difficulty}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted">{row.intent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-surface border border-border rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Want the full report?</h2>
            <p className="text-muted text-sm mb-6 max-w-lg mx-auto">
              This is just a preview. Full reports include 47+ technologies, competitor gap analysis,
              and a prioritized content calendar tailored to your verticals.
            </p>
            <Link
              href="/demo"
              className="inline-block bg-teal hover:bg-teal-dark text-background font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Book a Demo
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
