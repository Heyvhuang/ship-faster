import { notFound } from "next/navigation";
import {
  decisions,
  categoryLabels,
  categoryColors,
  getRegretColor,
  getRegretBg,
  getRegretLabel,
} from "@/data/decisions";
import type { Metadata } from "next";

function RegretStars({ score }: { score: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i <= score ? getRegretColor(score) : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

type PageProps = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return decisions.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const decision = decisions.find((d) => d.id === id);
  if (!decision) return {};
  return {
    title: `${decision.tool} — InfraRegrets`,
    description: decision.oneLiner,
  };
}

export default async function DecisionPage({ params }: PageProps) {
  const { id } = await params;
  const decision = decisions.find((d) => d.id === id);
  if (!decision) notFound();

  const related = decisions
    .filter((d) => d.category === decision.category && d.id !== decision.id)
    .slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <a
        href="/"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to all decisions
      </a>

      <div className={`border rounded-2xl p-6 sm:p-8 ${getRegretBg(decision.regretScore)}`}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[decision.category]}`}>
            {categoryLabels[decision.category]}
          </span>
          <span className="text-xs text-slate-500 font-mono">{decision.cloud}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-mono mb-4">
          {decision.tool}
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <RegretStars score={decision.regretScore} />
          <span className={`text-sm font-semibold ${getRegretColor(decision.regretScore)}`}>
            {decision.regretScore}/5 — {getRegretLabel(decision.regretScore)}
          </span>
        </div>

        <blockquote className="text-lg sm:text-xl text-slate-700 italic border-l-4 border-slate-300 pl-4 mb-8">
          &ldquo;{decision.oneLiner}&rdquo;
        </blockquote>

        <div className="prose prose-slate max-w-none">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Full Advice</h2>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
            {decision.fullAdvice}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
          <div>
            <div className="text-xs text-slate-500 mb-1">Company Stage</div>
            <div className="text-sm font-medium text-slate-900">{decision.companyStage}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Team Size</div>
            <div className="text-sm font-medium text-slate-900">{decision.teamSize}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Submitted By</div>
            <div className="text-sm font-medium text-slate-900">{decision.submittedBy.split(",")[0]}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">Upvotes</div>
            <div className="text-sm font-medium text-slate-900">{decision.upvotes}</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            More {categoryLabels[decision.category]} Decisions
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((d) => (
              <a
                key={d.id}
                href={`/decision/${d.id}`}
                className={`block border rounded-xl p-4 hover:shadow-md transition-shadow ${getRegretBg(d.regretScore)}`}
              >
                <h3 className="font-bold text-slate-900 font-mono mb-1">{d.tool}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <RegretStars score={d.regretScore} />
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{d.oneLiner}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
