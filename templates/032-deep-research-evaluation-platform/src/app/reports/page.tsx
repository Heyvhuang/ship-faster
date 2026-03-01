import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample Reports — DREAM Eval",
  description:
    "Explore sample DREAM evaluation reports comparing leading AI research agents across reasoning quality metrics.",
};

const agents = [
  {
    name: "AutoResearch v2.1",
    org: "LabAI",
    overall: 88.6,
    scores: { Depth: 92, Reasoning: 87, Evidence: 94, Accuracy: 89, "Multi-step": 81 },
    badge: "Top Performer",
  },
  {
    name: "DeepHermes-3",
    org: "NousResearch",
    overall: 82.4,
    scores: { Depth: 85, Reasoning: 83, Evidence: 88, Accuracy: 79, "Multi-step": 77 },
    badge: null,
  },
  {
    name: "WebPilot Pro",
    org: "WebPilot AI",
    overall: 79.1,
    scores: { Depth: 78, Reasoning: 80, Evidence: 82, Accuracy: 81, "Multi-step": 74 },
    badge: null,
  },
  {
    name: "AgentX-Research",
    org: "Startup Labs",
    overall: 74.8,
    scores: { Depth: 76, Reasoning: 72, Evidence: 79, Accuracy: 77, "Multi-step": 70 },
    badge: null,
  },
];

const traceSteps = [
  { step: 1, action: "Query Decomposition", detail: "Broke main question into 4 sub-questions", duration: "2.3s", status: "pass" },
  { step: 2, action: "Source Retrieval", detail: "Retrieved 12 relevant papers from Semantic Scholar", duration: "8.1s", status: "pass" },
  { step: 3, action: "Evidence Extraction", detail: "Extracted 23 key claims with citations", duration: "5.4s", status: "pass" },
  { step: 4, action: "Cross-Validation", detail: "Validated 21/23 claims against ground truth", duration: "3.7s", status: "warn" },
  { step: 5, action: "Synthesis", detail: "Generated coherent 800-word research summary", duration: "4.2s", status: "pass" },
  { step: 6, action: "Self-Critique", detail: "Identified 2 weak arguments, revised conclusion", duration: "3.1s", status: "pass" },
];

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color = score >= 85 ? "bg-green-500" : score >= 75 ? "bg-accent" : "bg-yellow-500";
  return (
    <div className="flex items-center gap-2">
      <span className="w-20 text-xs text-muted">{label}</span>
      <div className="relative h-1.5 flex-1 rounded-full bg-card-border">
        <div className={`absolute left-0 top-0 h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="w-6 text-right font-mono text-xs">{score}</span>
    </div>
  );
}

export default function Reports() {
  return (
    <div className="pt-28 pb-20">
      <section className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Sample Reports</h1>
        <p className="mt-4 text-lg text-muted">
          Explore real evaluation outputs from our DREAM benchmark suite.
        </p>
      </section>

      {/* Agent comparison */}
      <section className="mx-auto mt-16 max-w-7xl px-6">
        <h2 className="mb-6 text-xl font-semibold">Agent Comparison — Deep Research v2 Suite</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((a) => (
            <div
              key={a.name}
              className="rounded-xl border border-card-border bg-card p-5 transition hover:border-accent/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{a.name}</h3>
                  <p className="text-xs text-muted">{a.org}</p>
                </div>
                <span className="font-mono text-2xl font-bold text-accent-bright">
                  {a.overall}
                </span>
              </div>
              {a.badge && (
                <span className="mt-2 inline-block rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                  {a.badge}
                </span>
              )}
              <div className="mt-4 flex flex-col gap-2">
                {Object.entries(a.scores).map(([k, v]) => (
                  <ScoreBar key={k} label={k} score={v} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reasoning trace */}
      <section className="mx-auto mt-20 max-w-4xl px-6">
        <h2 className="mb-6 text-xl font-semibold">
          Reasoning Trace — AutoResearch v2.1
        </h2>
        <p className="mb-8 text-sm text-muted">
          Task: &quot;Evaluate the current evidence for GLP-1 receptor agonists in treating neurodegenerative diseases.&quot;
        </p>
        <div className="overflow-x-auto rounded-xl border border-card-border bg-card">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-card-border text-xs text-muted">
                <th className="px-4 py-3">Step</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Detail</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {traceSteps.map((s) => (
                <tr key={s.step} className="border-b border-card-border last:border-0">
                  <td className="px-4 py-3 font-mono text-muted">{s.step}</td>
                  <td className="px-4 py-3 font-medium">{s.action}</td>
                  <td className="px-4 py-3 text-muted">{s.detail}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">{s.duration}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        s.status === "pass" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Summary stats */}
      <section className="mx-auto mt-20 max-w-7xl px-6">
        <h2 className="mb-6 text-xl font-semibold">Benchmark Summary Statistics</h2>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Agents Evaluated", value: "142" },
            { label: "Total Scenarios", value: "3,550" },
            { label: "Avg. Score", value: "76.3" },
            { label: "Median Score", value: "78.1" },
            { label: "Top Score", value: "94.2" },
            { label: "Suites Available", value: "8" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-card-border bg-card p-4 text-center">
              <div className="font-mono text-2xl font-bold text-accent-bright">{s.value}</div>
              <div className="mt-1 text-xs text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 text-center">
        <Link
          href="/contact"
          className="rounded-lg bg-accent px-8 py-3 font-medium text-white transition hover:bg-accent-bright"
        >
          Get Your Agent Evaluated
        </Link>
      </section>
    </div>
  );
}
