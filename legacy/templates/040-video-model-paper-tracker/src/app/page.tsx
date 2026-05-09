import { SubscribeForm } from "./components/SubscribeForm";
import { PaperCard } from "./components/PaperCard";
import { issues } from "./data/issues";
import Link from "next/link";

export default function Home() {
  const latestIssue = issues[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* Hero */}
      <section className="py-16 sm:py-24 text-center" id="subscribe">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Stay ahead in <span style={{ color: "var(--accent)" }}>Video AI</span>
        </h1>
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-8"
          style={{ color: "var(--muted)" }}
        >
          A weekly email digest curating the best video generation and editing
          papers — with benchmark scores, open-source model links, and
          one-sentence summaries. Every Tuesday.
        </p>
        <div className="flex justify-center">
          <SubscribeForm />
        </div>
        <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
          Free forever · 1,247 researchers subscribed · No spam
        </p>
      </section>

      {/* Social proof */}
      <section
        className="rounded-xl border p-6 sm:p-8 mb-16"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
              12
            </p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Issues published
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
              78
            </p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Papers covered
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
              43%
            </p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Avg. open rate
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          What&apos;s inside every issue
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "📊",
              title: "Benchmark Tables",
              desc: "Side-by-side VBench, FVD, and CLIPSIM scores so you can compare models at a glance.",
            },
            {
              icon: "🔗",
              title: "Model Links",
              desc: "Direct links to GitHub repos and HuggingFace checkpoints — no hunting required.",
            },
            {
              icon: "📝",
              title: "One-Line Summaries",
              desc: "Each paper distilled to a single sentence so you know if it's worth reading.",
            },
            {
              icon: "🏷️",
              title: "Filter by Type",
              desc: "Papers tagged as generation or editing, plus model size and dataset info.",
            },
            {
              icon: "📅",
              title: "Tuesday Delivery",
              desc: "Arrives every Tuesday morning — start your week knowing the latest in video AI.",
            },
            {
              icon: "🆓",
              title: "Free Tier",
              desc: "The weekly digest is always free. Pay only if you want archive access.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border p-5"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--card-border)",
              }}
            >
              <span className="text-2xl">{item.icon}</span>
              <h3 className="font-semibold mt-2 mb-1">{item.title}</h3>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest issue preview */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest Issue</h2>
          <Link
            href="/archive"
            className="text-sm hover:opacity-70 transition-opacity"
            style={{ color: "var(--primary)" }}
          >
            View all issues →
          </Link>
        </div>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          {latestIssue.title} · {latestIssue.date}
        </p>
        <div className="grid gap-6">
          {latestIssue.papers.slice(0, 3).map((paper) => (
            <PaperCard key={paper.title} paper={paper} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href={`/archive/${latestIssue.id}`}
            className="inline-block px-6 py-3 rounded-lg border text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ borderColor: "var(--card-border)" }}
          >
            Read full issue ({latestIssue.papers.length} papers) →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-3">
          Don&apos;t miss the next issue
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          Join 1,247 researchers and creators getting the best video AI papers every Tuesday.
        </p>
        <div className="flex justify-center">
          <SubscribeForm />
        </div>
      </section>
    </div>
  );
}
