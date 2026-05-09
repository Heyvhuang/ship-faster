"use client";

import { useState } from "react";
import {
  mockScanResult,
  getScoreColor,
  getSeverityColor,
  getSeverityBg,
  getSeverityLabel,
  type Dependency,
} from "@/lib/mock-data";

function ScoreRing({ score }: { score: number }) {
  const color =
    score >= 80
      ? "stroke-green"
      : score >= 50
        ? "stroke-yellow"
        : "stroke-red";
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          className="stroke-border"
          strokeWidth="6"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          className={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`text-3xl sm:text-4xl font-bold font-mono ${getScoreColor(score)}`}
        >
          {score}
        </span>
        <span className="text-xs text-muted font-mono">/100</span>
      </div>
    </div>
  );
}

function DependencyRow({
  dep,
  expanded,
  onToggle,
}: {
  dep: Dependency;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-card-hover transition-colors text-left"
      >
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 ${
            dep.severity === "critical"
              ? "bg-red"
              : dep.severity === "warning"
                ? "bg-yellow"
                : dep.severity === "info"
                  ? "bg-blue-400"
                  : "bg-green"
          }`}
        />
        <span className="font-mono text-sm flex-1 truncate">
          {dep.name}
          <span className="text-muted">@{dep.version}</span>
        </span>
        <span
          className={`text-xs font-mono px-2 py-0.5 rounded border ${getSeverityBg(dep.severity)} ${getSeverityColor(dep.severity)}`}
        >
          {getSeverityLabel(dep.severity)}
        </span>
        <span className={`font-mono text-sm ${getScoreColor(dep.healthScore)}`}>
          {dep.healthScore}
        </span>
        <svg
          className={`w-4 h-4 text-muted transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {expanded && (
        <div className="border-t border-border px-4 py-4 bg-card/50 space-y-3">
          {dep.issues.length > 0 && (
            <div className="space-y-1.5">
              {dep.issues.map((issue, i) => (
                <div
                  key={i}
                  className={`text-xs font-mono flex items-start gap-2 ${getSeverityColor(dep.severity)}`}
                >
                  <span className="mt-0.5">→</span>
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <span className="text-muted block">Latest</span>
              <span>{dep.latestVersion}</span>
            </div>
            <div>
              <span className="text-muted block">Last Publish</span>
              <span>{dep.lastPublish}</span>
            </div>
            <div>
              <span className="text-muted block">Weekly Downloads</span>
              <span>{dep.weeklyDownloads}</span>
            </div>
            <div>
              <span className="text-muted block">Maintainers</span>
              <span
                className={dep.maintainers === 0 ? "text-red" : ""}
              >
                {dep.maintainers}
              </span>
            </div>
            <div>
              <span className="text-muted block">Open Issues</span>
              <span>{dep.openIssues}</span>
            </div>
            <div>
              <span className="text-muted block">Open PRs</span>
              <span>{dep.openPRs}</span>
            </div>
            <div>
              <span className="text-muted block">License</span>
              <span>{dep.license}</span>
            </div>
            <div>
              <span className="text-muted block">Last Commit</span>
              <span
                className={dep.lastCommitDays > 365 ? "text-yellow" : ""}
              >
                {dep.lastCommitDays}d ago
              </span>
            </div>
          </div>
          {dep.deprecated && (
            <div className="text-xs font-mono text-red bg-red/10 border border-red/20 rounded px-3 py-2">
              ⚠ This package is officially deprecated
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type FilterType = "all" | "critical" | "warning" | "info" | "healthy";

export default function ResultsPage() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterType>("all");
  const data = mockScanResult;

  const toggle = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const filtered =
    filter === "all"
      ? data.dependencies
      : data.dependencies.filter((d) => d.severity === filter);

  const filters: { key: FilterType; label: string; count: number; color: string }[] = [
    { key: "all", label: "All", count: data.totalDependencies, color: "text-foreground" },
    { key: "critical", label: "Critical", count: data.criticalCount, color: "text-red" },
    { key: "warning", label: "Warning", count: data.warningCount, color: "text-yellow" },
    { key: "info", label: "Info", count: data.infoCount, color: "text-blue-400" },
    { key: "healthy", label: "Healthy", count: data.healthyCount, color: "text-green" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
        <ScoreRing score={data.overallScore} />
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold font-mono mb-1">
            {data.repo}
          </h1>
          <p className="text-xs text-muted font-mono mb-4">
            Scanned {new Date(data.scannedAt).toLocaleString()} ·{" "}
            {data.totalDependencies} dependencies
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="bg-red/10 border border-red/20 rounded px-3 py-1.5 text-xs font-mono text-red">
              {data.criticalCount} critical
            </div>
            <div className="bg-yellow/10 border border-yellow/20 rounded px-3 py-1.5 text-xs font-mono text-yellow">
              {data.warningCount} warnings
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded px-3 py-1.5 text-xs font-mono text-blue-400">
              {data.infoCount} info
            </div>
            <div className="bg-green/10 border border-green/20 rounded px-3 py-1.5 text-xs font-mono text-green">
              {data.healthyCount} healthy
            </div>
          </div>
        </div>
      </div>

      {/* Monitor CTA */}
      <div className="border border-green/20 bg-green/5 rounded-lg px-5 py-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          <p className="text-sm font-semibold mb-1">
            Monitor this repo weekly
          </p>
          <p className="text-xs text-muted">
            Get email alerts when dependency health changes. $29/repo/month.
          </p>
        </div>
        <button className="bg-green text-black font-mono font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-green/90 transition-colors whitespace-nowrap">
          Monitor This Repo
        </button>
      </div>

      {/* Badge */}
      <div className="border border-border rounded-lg p-4 mb-8 bg-card">
        <p className="text-xs text-muted font-mono mb-2">
          Add a health badge to your README:
        </p>
        <div className="flex items-center gap-3">
          <div className="bg-neutral-800 rounded px-3 py-1.5 flex items-center gap-2 text-xs font-mono">
            <span className="text-muted">dep health</span>
            <span className={`px-1.5 py-0.5 rounded text-black font-bold ${data.overallScore >= 80 ? "bg-green" : data.overallScore >= 50 ? "bg-yellow" : "bg-red"}`}>
              {data.overallScore}/100
            </span>
          </div>
          <code className="text-[10px] text-muted flex-1 truncate">
            ![DepRadar](https://depradar.dev/badge/{data.repo})
          </code>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-xs font-mono px-3 py-1.5 rounded-md border transition-colors whitespace-nowrap ${
              filter === f.key
                ? "border-foreground/30 bg-foreground/10"
                : "border-border hover:border-foreground/20"
            } ${f.color}`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Dependencies List */}
      <div className="space-y-2">
        {filtered.map((dep) => (
          <DependencyRow
            key={dep.name}
            dep={dep}
            expanded={expanded.has(dep.name)}
            onToggle={() => toggle(dep.name)}
          />
        ))}
      </div>
    </div>
  );
}
