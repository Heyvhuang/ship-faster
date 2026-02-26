"use client";

import { useState, useMemo } from "react";
import {
  decisions,
  categoryLabels,
  categoryColors,
  getRegretColor,
  getRegretBg,
  getRegretLabel,
  type Category,
} from "@/data/decisions";

function RegretStars({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= score ? getRegretColor(score) : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const categories: Category[] = [
  "database",
  "caching",
  "ci-cd",
  "cloud",
  "monitoring",
  "messaging",
  "auth",
  "hosting",
];

type SortOption = "most-regretted" | "least-regretted" | "most-upvoted" | "newest";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedRegret, setSelectedRegret] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("most-upvoted");

  const filtered = useMemo(() => {
    const result = decisions.filter((d) => {
      const matchesSearch =
        search === "" ||
        d.tool.toLowerCase().includes(search.toLowerCase()) ||
        d.oneLiner.toLowerCase().includes(search.toLowerCase()) ||
        d.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || d.category === selectedCategory;
      const matchesRegret =
        selectedRegret === "all" || d.regretScore === selectedRegret;
      return matchesSearch && matchesCategory && matchesRegret;
    });

    switch (sortBy) {
      case "most-regretted":
        result.sort((a, b) => b.regretScore - a.regretScore);
        break;
      case "least-regretted":
        result.sort((a, b) => a.regretScore - b.regretScore);
        break;
      case "most-upvoted":
        result.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [search, selectedCategory, selectedRegret, sortBy]);

  const stats = useMemo(() => {
    const totalDecisions = decisions.length;
    const avgRegret = (decisions.reduce((s, d) => s + d.regretScore, 0) / totalDecisions).toFixed(1);
    const mostRegretted = decisions.reduce((max, d) => (d.regretScore > max.regretScore ? d : max), decisions[0]);
    return { totalDecisions, avgRegret, mostRegretted };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            {stats.totalDecisions} decisions catalogued
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
            Learn from startup
            <br />
            <span className="text-red-500">infrastructure regrets</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
            Searchable database of infrastructure decisions made by real
            founders, with regret ratings and practical advice.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search tools, categories, or advice..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["MongoDB", "Kubernetes", "Kafka", "Datadog", "Vercel"].map(
              (tool) => (
                <button
                  key={tool}
                  onClick={() => setSearch(tool)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-sm hover:bg-slate-200 transition-colors font-mono"
                >
                  {tool}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900">{stats.totalDecisions}</div>
              <div className="text-sm text-slate-500">Decisions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{stats.avgRegret}/5</div>
              <div className="text-sm text-slate-500">Avg Regret</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{stats.mostRegretted.tool}</div>
              <div className="text-sm text-slate-500">Most Regretted</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">PostgreSQL</div>
              <div className="text-sm text-slate-500">Most Endorsed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse section */}
      <section id="browse" className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2 flex-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <select
              value={selectedRegret === "all" ? "all" : String(selectedRegret)}
              onChange={(e) =>
                setSelectedRegret(
                  e.target.value === "all" ? "all" : Number(e.target.value)
                )
              }
              className="px-3 py-1.5 rounded-lg text-sm bg-white border border-slate-300 text-slate-700"
            >
              <option value="all">All Regret Levels</option>
              <option value="1">1 — No Regret</option>
              <option value="2">2 — Minor</option>
              <option value="3">3 — Mixed</option>
              <option value="4">4 — Significant</option>
              <option value="5">5 — Massive</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1.5 rounded-lg text-sm bg-white border border-slate-300 text-slate-700"
            >
              <option value="most-upvoted">Most Upvoted</option>
              <option value="most-regretted">Most Regretted</option>
              <option value="least-regretted">Least Regretted</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-4">
          {filtered.length} decision{filtered.length !== 1 ? "s" : ""} found
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <a
              key={d.id}
              href={`/decision/${d.id}`}
              className={`block border rounded-xl p-5 hover:shadow-md transition-shadow ${getRegretBg(d.regretScore)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-900 font-mono">
                  {d.tool}
                </h3>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[d.category]}`}
                >
                  {categoryLabels[d.category]}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <RegretStars score={d.regretScore} />
                <span className={`text-xs font-medium ${getRegretColor(d.regretScore)}`}>
                  {getRegretLabel(d.regretScore)}
                </span>
              </div>
              <p className="text-sm text-slate-700 mb-4 line-clamp-2">
                {d.oneLiner}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{d.submittedBy.split(",")[0]}</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  {d.upvotes}
                </span>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No decisions match your filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setSelectedRegret("all");
              }}
              className="mt-4 text-red-500 hover:text-red-600 text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">Made an infrastructure decision?</h2>
          <p className="mt-3 text-slate-400 max-w-lg mx-auto">
            Share your experience in under 2 minutes. Help other founders avoid
            the same mistakes — or discover the same wins.
          </p>
          <a
            href="/submit"
            className="inline-block mt-6 bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Submit Your Decision
          </a>
        </div>
      </section>
    </div>
  );
}
