"use client";

import { useState } from "react";
import { papers, areas } from "@/lib/data";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState("All Areas");

  const filtered = papers.filter((p) => {
    const matchSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.titleZh.includes(search) ||
      p.authors.some((a) => a.toLowerCase().includes(search.toLowerCase()));
    const matchArea =
      selectedArea === "All Areas" || p.area === selectedArea;
    return matchSearch && matchArea;
  });

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-2">
            Translated Paper Library
          </h1>
          <p className="text-muted">
            Browse 240+ AI research papers translated into Chinese with
            technical precision.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search papers, authors, or topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="border border-border rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-muted mb-4">
          {filtered.length} paper{filtered.length !== 1 ? "s" : ""} found
        </div>

        {/* Paper list */}
        <div className="space-y-4">
          {filtered.map((paper) => (
            <div
              key={paper.id}
              className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded">
                      #{paper.trending} Trending
                    </span>
                    <span className="bg-surface text-muted text-xs px-2 py-0.5 rounded">
                      {paper.area}
                    </span>
                    <span className="text-xs text-muted">{paper.date}</span>
                  </div>
                  <h3 className="font-bold text-primary-dark mb-1">
                    {paper.title}
                  </h3>
                  <p className="text-accent font-medium text-sm mb-1">
                    {paper.titleZh}
                  </p>
                  <p className="text-xs text-muted mb-2">
                    {paper.authors.join(", ")}
                  </p>
                  <p className="text-sm text-muted line-clamp-2">
                    {paper.abstractZh}
                  </p>
                </div>
                <div className="flex lg:flex-col gap-2 shrink-0">
                  <button className="bg-primary hover:bg-primary-light text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    Download PDF
                  </button>
                  <button className="border border-border text-muted hover:text-primary text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    Read Online
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted">
            <p className="text-lg mb-2">No papers found</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
