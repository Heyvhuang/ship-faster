"use client";

import { useState } from "react";
import { papers } from "@/lib/data";
import { PaperCard } from "@/components/paper-card";
import { ScoreBadge } from "@/components/score-badge";
import Link from "next/link";

const trending = papers.slice().sort((a, b) => b.score - a.score).slice(0, 6);
const recent = papers.slice().sort((a, b) => b.scoredAt.localeCompare(a.scoredAt)).slice(0, 5);

export default function Home() {
  const [url, setUrl] = useState("");
  const [showResult, setShowResult] = useState(false);
  const demoPaper = papers[0];

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Score ML papers by{" "}
            <span className="text-accent">code quality</span>, not just
            existence
          </h1>
          <p className="mt-4 text-lg text-muted">
            Reproducibility Radar rates papers on code availability, quality,
            and setup ease—helping you filter deployable research in seconds.
          </p>

          {/* Search bar */}
          <div className="mt-8 flex gap-2">
            <input
              type="text"
              placeholder="Paste an arXiv URL to score a paper…"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setShowResult(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && url.trim()) setShowResult(true);
              }}
              className="flex-1 rounded-lg border border-card-border bg-card px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button
              onClick={() => url.trim() && setShowResult(true)}
              className="rounded-lg bg-accent px-6 py-3 font-medium text-black transition-colors hover:bg-accent/90"
            >
              Score
            </button>
          </div>

          {/* Demo result */}
          {showResult && (
            <div className="mt-6 rounded-lg border border-card-border bg-card p-6 text-left">
              <div className="flex items-start gap-4">
                <ScoreBadge score={demoPaper.score} size="lg" />
                <div>
                  <h3 className="font-semibold text-lg">{demoPaper.title}</h3>
                  <p className="text-sm text-muted mt-1">
                    {demoPaper.authors.join(", ")} · {demoPaper.venue}{" "}
                    {demoPaper.year}
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                    <Dim label="Code Availability" value={demoPaper.codeAvailability} />
                    <Dim label="Code Quality" value={demoPaper.codeQuality} />
                    <Dim label="Setup Ease" value={demoPaper.setupEase} />
                  </div>
                  <Link
                    href={`/papers/${demoPaper.id}`}
                    className="mt-3 inline-block text-sm text-accent hover:underline"
                  >
                    View full breakdown →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 pb-12">
        {[
          { n: "2,847", label: "Papers Scored" },
          { n: "73", label: "Avg Score" },
          { n: "412", label: "Repos Analyzed" },
          { n: "1.2k", label: "Practitioners" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-card-border bg-card p-4 text-center"
          >
            <div className="text-2xl font-bold text-accent font-mono">
              {s.n}
            </div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Two columns: trending + recent */}
      <section className="grid gap-8 pb-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Trending Papers</h2>
            <Link
              href="/papers"
              className="text-sm text-accent hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {trending.map((p) => (
              <PaperCard key={p.id} paper={p} />
            ))}
          </div>
        </div>

        {/* Sidebar: recent */}
        <aside>
          <h2 className="text-xl font-semibold mb-4">Recently Scored</h2>
          <div className="space-y-3">
            {recent.map((p) => (
              <Link
                key={p.id}
                href={`/papers/${p.id}`}
                className="flex items-center gap-3 rounded-lg border border-card-border bg-card p-3 transition-colors hover:border-muted/50"
              >
                <ScoreBadge score={p.score} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{p.title}</p>
                  <p className="text-xs text-muted">{p.scoredAt}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Email signup */}
          <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
            <h3 className="font-semibold text-sm">
              Get weekly top-scored papers
            </h3>
            <p className="text-xs text-muted mt-1">
              We send the best reproducible papers every Friday.
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 rounded-md border border-card-border bg-card px-3 py-1.5 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <button className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-black hover:bg-accent/90">
                Subscribe
              </button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Dim({ label, value }: { label: string; value: number }) {
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
  return (
    <div>
      <div className="text-muted text-xs">{label}</div>
      <div className={`font-mono font-bold ${color}`}>{value}</div>
      <div className="mt-1 h-1 w-full rounded-full bg-white/10">
        <div
          className={`h-1 rounded-full ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
