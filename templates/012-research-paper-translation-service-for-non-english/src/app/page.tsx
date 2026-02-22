import Link from "next/link";
import { papers } from "@/lib/data";

export default function Home() {
  const featured = papers[0];
  const topPapers = papers.slice(1, 5);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent/20 text-accent-light text-sm font-medium px-3 py-1 rounded-full mb-6">
              February 2026 — 20 New Papers Translated
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Cutting-edge AI research,
              <br />
              <span className="text-accent-light">翻译成中文</span>
            </h1>
            <p className="text-lg lg:text-xl text-blue-100 mb-8 leading-relaxed">
              Premium translation of the top trending AI papers from Hugging
              Face into Chinese with technical precision. Mathematical notation,
              code, and domain terminology preserved exactly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/pricing"
                className="bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3 rounded-lg text-center transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/library"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg text-center transition-colors border border-white/20"
              >
                Browse Paper Library
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Translation Comparison */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-4">
              See the Difference
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Compare our technical translation with generic machine
              translation. Every formula, every term — precisely translated.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted bg-surface px-2 py-1 rounded">
                  Original (English)
                </span>
              </div>
              <h3 className="text-lg font-bold text-primary-dark mb-3">
                {featured.title}
              </h3>
              <p className="text-sm text-muted mb-2">
                {featured.authors.join(", ")}
              </p>
              <div className="bg-surface rounded-lg p-4 text-sm leading-relaxed text-foreground">
                {featured.abstract}
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-accent p-6 shadow-sm relative">
              <div className="absolute -top-3 right-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                PaperBridge Translation
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted bg-surface px-2 py-1 rounded">
                  中文翻译
                </span>
              </div>
              <h3 className="text-lg font-bold text-primary-dark mb-3">
                {featured.titleZh}
              </h3>
              <p className="text-sm text-muted mb-2">
                {featured.authors.join(", ")}
              </p>
              <div className="bg-surface rounded-lg p-4 text-sm leading-relaxed text-foreground">
                {featured.abstractZh}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why PaperBridge */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark text-center mb-12">
            Why Researchers Choose PaperBridge
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔬",
                title: "Technical Precision",
                desc: "Domain-expert translators who understand MoE architectures, attention mechanisms, and loss functions — not just words.",
              },
              {
                icon: "📐",
                title: "Math & Code Preserved",
                desc: "LaTeX formulas, algorithm pseudocode, and mathematical notation rendered perfectly in translated PDFs.",
              },
              {
                icon: "⚡",
                title: "48-Hour Turnaround",
                desc: "Priority translation requests delivered within 48 hours. Monthly batch of 20 trending papers available on the 1st.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-surface rounded-xl p-6 border border-border"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Papers */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary-dark">
              Trending This Month
            </h2>
            <Link
              href="/library"
              className="text-accent hover:text-accent-light font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {topPapers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">
                    #{paper.trending} Trending
                  </span>
                  <span className="text-xs text-muted">{paper.area}</span>
                </div>
                <h3 className="font-bold text-primary-dark mb-1 line-clamp-2">
                  {paper.title}
                </h3>
                <p className="text-accent font-medium text-sm mb-2">
                  {paper.titleZh}
                </p>
                <p className="text-sm text-muted line-clamp-2">
                  {paper.abstract}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "240+", label: "Papers Translated" },
              { value: "98.5%", label: "Accuracy Rate" },
              { value: "48hr", label: "Priority Turnaround" },
              { value: "500+", label: "Active Researchers" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl lg:text-4xl font-bold text-accent-light mb-1">
                  {stat.value}
                </div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-4">
            Never Miss a Breakthrough
          </h2>
          <p className="text-muted text-lg mb-8">
            Join 500+ Chinese AI researchers who stay ahead with technically
            precise translations delivered monthly.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Get Started — $199/month
          </Link>
        </div>
      </section>
    </>
  );
}
