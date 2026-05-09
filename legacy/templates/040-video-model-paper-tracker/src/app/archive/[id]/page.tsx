import { issues } from "../../data/issues";
import { PaperCard } from "../../components/PaperCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Params = { id: string };

export function generateStaticParams() {
  return issues.map((issue) => ({ id: String(issue.id) }));
}

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then(({ id }) => {
    const issue = issues.find((i) => i.id === Number(id));
    return {
      title: issue ? `${issue.title} — VideoModelWeekly` : "Issue Not Found",
      description: issue
        ? `${issue.papers.length} papers on video generation & editing with benchmarks.`
        : undefined,
    };
  });
}

export default async function IssuePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const issue = issues.find((i) => i.id === Number(id));
  if (!issue) notFound();

  const genCount = issue.papers.filter((p) => p.category === "generation").length;
  const editCount = issue.papers.filter((p) => p.category === "editing").length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/archive"
        className="text-sm hover:opacity-70 transition-opacity mb-6 inline-block"
        style={{ color: "var(--primary)" }}
      >
        ← Back to archive
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{issue.title}</h1>
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
        Published {issue.date} · {issue.papers.length} papers · {genCount} generation · {editCount} editing
      </p>

      <div className="grid gap-6">
        {issue.papers.map((paper) => (
          <PaperCard key={paper.title} paper={paper} />
        ))}
      </div>

      {/* Upgrade prompt */}
      <div
        className="mt-12 rounded-xl border p-6 text-center"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <p className="font-semibold mb-2">Want full archive access?</p>
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          Upgrade to Pro for $5/month and get every past issue plus early Tuesday delivery.
        </p>
        <Link
          href="/pricing"
          className="inline-block px-6 py-2.5 rounded-lg text-white text-sm font-medium"
          style={{ backgroundColor: "var(--primary)" }}
        >
          See pricing →
        </Link>
      </div>
    </div>
  );
}
