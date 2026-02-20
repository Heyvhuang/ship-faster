import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alerts, riskBgColors, riskColors } from "@/lib/data";
import { RiskBadge } from "@/components/risk-badge";

export function generateStaticParams() {
  return alerts.map((a) => ({ id: a.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }): Metadata {
  return {
    title: "Alert Details — DepRadar",
    description: "Detailed dependency risk alert with trending repository analysis.",
  };
}

export default async function AlertPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const alert = alerts.find((a) => a.id === id);
  if (!alert) notFound();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M15 18l-6-6 6-6"/></svg>
          Back to Dashboard
        </Link>

        {/* Alert header */}
        <div className={`rounded-xl border p-6 mb-8 ${riskBgColors[alert.severity]}`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <RiskBadge level={alert.severity} />
                <span className="text-xs text-zinc-400">{alert.status === "new" ? "New Alert" : alert.status === "acknowledged" ? "Acknowledged" : "Resolved"}</span>
              </div>
              <h1 className="text-xl font-bold sm:text-2xl">{alert.title}</h1>
              <p className="mt-2 text-sm text-zinc-400">{alert.description}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
            <div>
              <div className="text-zinc-500">Dependency</div>
              <code className="font-mono font-medium">{alert.dependency}</code>
            </div>
            <div>
              <div className="text-zinc-500">Affected Versions</div>
              <code className="font-mono font-medium">{alert.affectedVersions}</code>
            </div>
            <div>
              <div className="text-zinc-500">Trending Repo</div>
              <code className="font-mono font-medium">{alert.trendingRepo}</code>
            </div>
            <div>
              <div className="text-zinc-500">Stars (48h)</div>
              <span className="font-mono font-medium">{alert.trendingStars.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-3">Recommendation</h2>
          <p className="text-sm text-zinc-300 leading-relaxed">{alert.recommendation}</p>
        </div>

        {/* Detailed analysis */}
        <div className="rounded-xl border border-zinc-800 overflow-hidden mb-8">
          <div className="border-b border-zinc-800 bg-zinc-900/50 px-6 py-4">
            <h2 className="font-semibold">Detailed Analysis</h2>
          </div>
          <div className="px-6 py-6 prose prose-invert prose-sm max-w-none">
            {alert.details.split("\n").map((line, i) => {
              if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-semibold mt-6 mb-3 first:mt-0">{line.replace("## ", "")}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} className="text-base font-semibold mt-4 mb-2">{line.replace("### ", "")}</h3>;
              if (line.startsWith("```")) return <div key={i} className="my-1" />;
              if (line.startsWith("- **")) {
                const [, bold, rest] = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/) || [];
                return <div key={i} className="flex gap-2 text-sm ml-4 my-1"><span className="font-semibold text-zinc-200">{bold}:</span><span className="text-zinc-400">{rest}</span></div>;
              }
              if (line.startsWith("- ")) return <div key={i} className="text-sm text-zinc-400 ml-4 my-1">• {line.replace("- ", "")}</div>;
              if (line.startsWith("//") || line.includes("jwt.") || line.includes("_.") || line.includes("console.")) return <code key={i} className="block text-sm font-mono text-emerald-400 bg-zinc-900 rounded px-3 py-0.5">{line}</code>;
              if (line.trim() === "") return <div key={i} className="h-2" />;
              return <p key={i} className="text-sm text-zinc-300 leading-relaxed">{line}</p>;
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors">
            Mark as Acknowledged
          </button>
          <button className="rounded-lg border border-zinc-700 px-6 py-2.5 text-sm font-medium hover:bg-zinc-800 transition-colors">
            Share with Team
          </button>
          <button className="rounded-lg border border-zinc-700 px-6 py-2.5 text-sm font-medium hover:bg-zinc-800 transition-colors">
            Snooze Alert
          </button>
        </div>
      </div>
    </main>
  );
}
