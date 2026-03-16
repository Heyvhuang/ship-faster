import Link from "next/link";
import { Paper } from "@/lib/data";

function StatusBadge({ status }: { status: Paper["status"] }) {
  if (status === "verified") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-900/50 px-2 py-0.5 text-xs font-medium text-emerald-400">
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Verified
      </span>
    );
  }
  if (status === "building") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-900/50 px-2 py-0.5 text-xs font-medium text-amber-400">
        <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Building
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-900/50 px-2 py-0.5 text-xs font-medium text-red-400">
      Deprecated
    </span>
  );
}

function FrameworkBadge({ framework }: { framework: Paper["framework"] }) {
  const colors = {
    PyTorch: "text-red-400 bg-red-900/30",
    TensorFlow: "text-amber-400 bg-amber-900/30",
    JAX: "text-purple-400 bg-purple-900/30",
  };
  return (
    <span className={`rounded px-1.5 py-0.5 font-mono text-xs ${colors[framework]}`}>
      {framework}
    </span>
  );
}

export default function PaperCard({ paper }: { paper: Paper }) {
  return (
    <Link
      href={`/radar/papers/${paper.id}`}
      className="group block rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-zinc-500">#{paper.trendingRank}</span>
          <StatusBadge status={paper.status} />
          <FrameworkBadge framework={paper.framework} />
        </div>
        <span className="flex items-center gap-1 text-xs text-zinc-500">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
          {paper.likes.toLocaleString()}
        </span>
      </div>

      <h3 className="mt-3 text-sm font-semibold leading-snug text-zinc-100 group-hover:text-emerald-400 transition-colors">
        {paper.title}
      </h3>
      <p className="mt-1 text-xs text-zinc-500">{paper.authors.join(", ")}</p>
      <p className="mt-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
        {paper.abstract}
      </p>

      <div className="mt-4 flex items-center gap-4">
        {paper.status === "verified" && (
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {paper.reproductionTime}
          </span>
        )}
        <span className="text-xs text-zinc-500 font-mono">{paper.gpu}</span>
        <div className="flex gap-1 ml-auto">
          {paper.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-500">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
