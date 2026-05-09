"use client";

import { useState } from "react";
import Link from "next/link";
import { issues } from "../data/issues";

export default function ArchivePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "generation" | "editing">("all");

  const filtered = issues
    .map((issue) => ({
      ...issue,
      papers: issue.papers.filter((p) => {
        const matchesSearch =
          !search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.modelName.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || p.category === filter;
        return matchesSearch && matchesFilter;
      }),
    }))
    .filter((issue) => issue.papers.length > 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Archive</h1>
      <p className="mb-8 text-sm" style={{ color: "var(--muted)" }}>
        Browse all past issues. Free tier sees the latest 3 issues — upgrade
        for full access.
      </p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search by paper or model name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg border text-sm outline-none"
          style={{
            borderColor: "var(--card-border)",
            backgroundColor: "var(--card-bg)",
            color: "var(--foreground)",
          }}
        />
        <div className="flex gap-2">
          {(["all", "generation", "editing"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-lg border text-sm capitalize cursor-pointer transition-colors"
              style={{
                borderColor:
                  filter === cat ? "var(--primary)" : "var(--card-border)",
                backgroundColor:
                  filter === cat ? "var(--primary)" : "var(--card-bg)",
                color: filter === cat ? "#fff" : "var(--foreground)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Issue list */}
      {filtered.length === 0 ? (
        <p className="text-center py-12" style={{ color: "var(--muted)" }}>
          No results found. Try a different search term.
        </p>
      ) : (
        <div className="space-y-8">
          {filtered.map((issue) => (
            <div
              key={issue.id}
              className="rounded-xl border p-6"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--card-border)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <Link
                  href={`/archive/${issue.id}`}
                  className="font-semibold text-lg hover:opacity-70 transition-opacity"
                >
                  {issue.title}
                </Link>
                <span className="text-sm" style={{ color: "var(--muted)" }}>
                  {issue.date}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {issue.papers.map((p) => (
                  <span
                    key={p.modelName}
                    className="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-md border"
                    style={{
                      borderColor: "var(--card-border)",
                      color: "var(--foreground)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{
                        backgroundColor:
                          p.category === "generation"
                            ? "var(--accent)"
                            : "#818cf8",
                      }}
                    />
                    {p.modelName}
                  </span>
                ))}
              </div>
              <Link
                href={`/archive/${issue.id}`}
                className="inline-block mt-4 text-sm hover:opacity-70 transition-opacity"
                style={{ color: "var(--primary)" }}
              >
                Read full issue →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
