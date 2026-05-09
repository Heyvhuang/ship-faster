"use client";

import { useState, useMemo } from "react";
import { papers } from "@/lib/data";
import { PaperCard } from "@/components/paper-card";

const allTags = Array.from(new Set(papers.flatMap((p) => p.tags))).sort();

export default function PapersPage() {
  const [minScore, setMinScore] = useState(0);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"score" | "date">("score");

  const filtered = useMemo(() => {
    let result = papers.filter((p) => p.score >= minScore);
    if (selectedTag) result = result.filter((p) => p.tags.includes(selectedTag));
    result.sort((a, b) =>
      sortBy === "score"
        ? b.score - a.score
        : b.scoredAt.localeCompare(a.scoredAt)
    );
    return result;
  }, [minScore, selectedTag, sortBy]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">All Scored Papers</h1>
      <p className="text-muted mt-1">
        {filtered.length} papers matching your filters
      </p>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div>
          <label className="text-xs text-muted block mb-1">
            Min Score: {minScore}
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-40 accent-green-500"
          />
        </div>

        <div>
          <label className="text-xs text-muted block mb-1">Tag</label>
          <select
            value={selectedTag ?? ""}
            onChange={(e) => setSelectedTag(e.target.value || null)}
            className="rounded-md border border-card-border bg-card px-3 py-1.5 text-sm text-foreground"
          >
            <option value="">All</option>
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-muted block mb-1">Sort</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "score" | "date")}
            className="rounded-md border border-card-border bg-card px-3 py-1.5 text-sm text-foreground"
          >
            <option value="score">Highest Score</option>
            <option value="date">Most Recent</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 space-y-3">
        {filtered.map((p) => (
          <PaperCard key={p.id} paper={p} />
        ))}
        {filtered.length === 0 && (
          <p className="text-muted py-12 text-center">
            No papers match your filters. Try lowering the minimum score.
          </p>
        )}
      </div>
    </div>
  );
}
