"use client";

import { useState } from "react";
import PaperCard from "@/components/PaperCard";
import { papers } from "@/lib/data";

export default function PapersPage() {
  const [search, setSearch] = useState("");
  const [framework, setFramework] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const filtered = papers.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchFramework = framework === "all" || p.framework === framework;
    const matchStatus = status === "all" || p.status === status;
    return matchSearch && matchFramework && matchStatus;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-mono text-3xl font-bold">Trending Papers</h1>
      <p className="mt-2 text-sm text-zinc-500">
        Browse pre-built, verified paper reproductions ready to run instantly.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search papers..."
          className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none font-mono"
        />
        <select
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-300 focus:outline-none"
        >
          <option value="all">All Frameworks</option>
          <option value="PyTorch">PyTorch</option>
          <option value="TensorFlow">TensorFlow</option>
          <option value="JAX">JAX</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-300 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="building">Building</option>
          <option value="deprecated">Deprecated</option>
        </select>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-sm text-zinc-500">No papers found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
