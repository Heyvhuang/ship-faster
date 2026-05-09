import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Radar",
  description: "Built by a researcher, for researchers. Learn about the team behind Radar.",
};

export default function AboutPage() {
  return (
    <>
      <nav className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            radar<span className="text-accent">.</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-muted hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/sample" className="text-muted hover:text-foreground transition-colors">
              Sample
            </Link>
            <Link href="/pricing" className="text-muted hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-8">About Radar</h1>

          <div className="space-y-6 text-muted leading-relaxed">
            <p>
              I started Radar because I was frustrated. As an ML researcher, I
              spent hours every week skimming arXiv, trying to separate signal
              from noise. Most of what I found was incremental. The papers that
              actually mattered were buried under hundreds of submissions.
            </p>

            <p>
              Existing newsletters didn&apos;t help. They either listed 20+ papers
              with one-line descriptions (useless for deciding what to read) or
              covered topics too broadly to be actionable for working researchers.
            </p>

            <p>
              Radar is different. Every week, I read 50+ papers and select the 3
              that will most impact how you think or work. Then I write deep
              summaries — not abstracts, but real analysis: what the paper does,
              why it matters, what&apos;s actionable, and what to watch out for.
            </p>

            <p>
              Each summary takes about 5 minutes to read. That&apos;s 15 minutes a
              week to stay current on the most important developments in ML.
              Compare that to the hours you&apos;re spending now.
            </p>

            <div className="border-l-2 border-accent pl-4 py-2 my-8">
              <p className="text-foreground font-medium italic">
                &quot;I used to spend my Sunday mornings scrolling arXiv. Now I read
                Radar on Monday morning with my coffee and I&apos;m better informed
                in 15 minutes than I was in 3 hours.&quot;
              </p>
              <p className="text-sm mt-2">
                — ML researcher at a major tech lab
              </p>
            </div>

            <h2 className="text-xl font-bold text-foreground pt-4">
              The curation process
            </h2>
            <p>
              Every week, I scan new submissions across arXiv categories
              (cs.LG, cs.CL, cs.CV, stat.ML), top conference proceedings, and
              notable industry publications. I evaluate each paper on three
              criteria:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>
                <strong className="text-foreground">Impact:</strong> Does this
                change how researchers or practitioners should approach a
                problem?
              </li>
              <li>
                <strong className="text-foreground">Novelty:</strong> Is this a
                genuinely new idea, not an incremental improvement?
              </li>
              <li>
                <strong className="text-foreground">Actionability:</strong> Can
                readers apply these findings to their own work?
              </li>
            </ol>

            <p>
              Only papers that score highly on all three make the cut. This means
              some weeks I reject papers from top labs if they don&apos;t meet the bar.
              Quality over prestige, always.
            </p>

            <h2 className="text-xl font-bold text-foreground pt-4">Get in touch</h2>
            <p>
              Have a paper suggestion? Question about a summary? Just want to
              chat about ML research? Reply to any issue email or reach out
              directly at{" "}
              <a
                href="mailto:hello@radarml.com"
                className="text-accent hover:underline"
              >
                hello@radarml.com
              </a>
              .
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <Link
              href="/sample"
              className="bg-foreground text-background px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              Read a free sample →
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-sm text-muted">
          <span>© 2026 Radar</span>
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
        </div>
      </footer>
    </>
  );
}
