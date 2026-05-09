import { papers } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return papers.map((p) => ({ id: p.id }));
}

export default async function PaperDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const paper = papers.find((p) => p.id === id);
  if (!paper) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/radar/papers" className="text-xs text-zinc-500 hover:text-zinc-300">
        ← Back to papers
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs text-zinc-500">#{paper.trendingRank} Trending</span>
        {paper.status === "verified" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-900/50 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        )}
        {paper.status === "building" && (
          <span className="rounded-full bg-amber-900/50 px-2.5 py-1 text-xs font-medium text-amber-400">Building</span>
        )}
        {paper.status === "deprecated" && (
          <span className="rounded-full bg-red-900/50 px-2.5 py-1 text-xs font-medium text-red-400">Deprecated</span>
        )}
        <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-400">{paper.framework}</span>
      </div>

      <h1 className="mt-4 font-mono text-2xl font-bold leading-tight sm:text-3xl">{paper.title}</h1>
      <p className="mt-2 text-sm text-zinc-500">{paper.authors.join(", ")} · {paper.publishedDate}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {paper.tags.map((tag) => (
          <span key={tag} className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-400">{tag}</span>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="text-sm font-semibold text-zinc-300">Abstract</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{paper.abstract}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <p className="text-xs text-zinc-500">Reproduction Time</p>
          <p className="mt-1 font-mono text-lg font-bold text-emerald-400">{paper.reproductionTime}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <p className="text-xs text-zinc-500">GPU</p>
          <p className="mt-1 font-mono text-lg font-bold text-zinc-100">{paper.gpu}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <p className="text-xs text-zinc-500">Likes</p>
          <p className="mt-1 font-mono text-lg font-bold text-zinc-100">{paper.likes.toLocaleString()}</p>
        </div>
      </div>

      {paper.status === "verified" && (
        <div className="mt-8">
          <button className="w-full rounded-xl bg-emerald-500 py-4 text-center text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 sm:w-auto sm:px-12">
            Reproduce Now — $3
          </button>
          <p className="mt-2 text-xs text-zinc-500">Includes GPU time, JupyterLab access, and 30-day result storage.</p>
        </div>
      )}

      {paper.status === "building" && (
        <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm text-amber-400">This container is currently being built. Check back soon.</p>
        </div>
      )}

      {paper.status === "deprecated" && (
        <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm text-red-400">This paper&apos;s environment has been deprecated due to dependency issues.</p>
        </div>
      )}

      <div className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-sm font-semibold text-zinc-300">Environment Details</h2>
        <div className="mt-4 font-mono text-xs leading-relaxed text-zinc-400">
          <div className="flex justify-between border-b border-zinc-800 py-2">
            <span className="text-zinc-500">Framework</span>
            <span>{paper.framework}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800 py-2">
            <span className="text-zinc-500">Python</span>
            <span>3.11.7</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800 py-2">
            <span className="text-zinc-500">CUDA</span>
            <span>12.1</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800 py-2">
            <span className="text-zinc-500">Container Size</span>
            <span>4.2 GB</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-zinc-500">Dependencies</span>
            <span>47 packages</span>
          </div>
        </div>
      </div>
    </div>
  );
}
