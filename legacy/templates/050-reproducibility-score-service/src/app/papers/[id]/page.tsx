import { papers, getScoreColor, getScoreBg, getScoreLabel } from "@/lib/data";
import { ScoreBadge } from "@/components/score-badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return papers.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const paper = papers.find((p) => p.id === id);
  if (!paper) return {};
  return {
    title: `${paper.title} — Reproducibility Score ${paper.score}/100`,
    description: paper.summary,
  };
}

export default async function PaperDetailPage({ params }: Props) {
  const { id } = await params;
  const paper = papers.find((p) => p.id === id);
  if (!paper) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/papers"
        className="text-sm text-muted hover:text-foreground transition-colors"
      >
        ← Back to papers
      </Link>

      <div className="mt-6 flex flex-col sm:flex-row gap-6 items-start">
        <ScoreBadge score={paper.score} size="lg" />
        <div>
          <h1 className="text-2xl font-bold leading-snug">{paper.title}</h1>
          <p className="text-muted mt-1">
            {paper.authors.join(", ")} · {paper.venue} {paper.year}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {paper.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/5 border border-card-border px-2.5 py-0.5 text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-muted leading-relaxed">{paper.summary}</p>

      {/* Score Breakdown */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <DimCard
          label="Code Availability"
          description="Does the paper have an official repo with code and weights?"
          value={paper.codeAvailability}
        />
        <DimCard
          label="Code Quality"
          description="Is the code well-structured, documented, and maintained?"
          value={paper.codeQuality}
        />
        <DimCard
          label="Setup Ease"
          description="Can you install and run it within 30 minutes?"
          value={paper.setupEase}
        />
      </div>

      {/* Rationale */}
      <div className="mt-8 rounded-lg border border-card-border bg-card p-6">
        <h2 className="font-semibold mb-2">Scoring Rationale</h2>
        <p className="text-muted text-sm leading-relaxed">{paper.rationale}</p>
      </div>

      {/* Links */}
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={paper.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-card-border px-4 py-2 text-sm hover:border-muted/50 transition-colors"
        >
          View Paper ↗
        </a>
        {paper.repoUrl && (
          <a
            href={paper.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-card-border px-4 py-2 text-sm hover:border-muted/50 transition-colors"
          >
            GitHub {paper.stars ? `(${(paper.stars / 1000).toFixed(1)}k ★)` : ""} ↗
          </a>
        )}
      </div>

      {/* Scored date */}
      <p className="mt-8 text-xs text-muted">
        Scored on {paper.scoredAt}
      </p>
    </div>
  );
}

function DimCard({
  label,
  description,
  value,
}: {
  label: string;
  description: string;
  value: number;
}) {
  const color =
    value >= 80
      ? "text-green-400"
      : value >= 60
        ? "text-yellow-400"
        : "text-red-400";
  const barColor =
    value >= 80
      ? "bg-green-500"
      : value >= 60
        ? "bg-yellow-500"
        : "bg-red-500";
  const dotColor =
    value >= 80
      ? "bg-green-500"
      : value >= 60
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <div className="rounded-lg border border-card-border bg-card p-4">
      <div className="flex items-center gap-2">
        <span className={`inline-block h-2 w-2 rounded-full ${dotColor}`} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className={`mt-2 text-3xl font-bold font-mono ${color}`}>
        {value}
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
        <div
          className={`h-1.5 rounded-full ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted">{description}</p>
    </div>
  );
}
