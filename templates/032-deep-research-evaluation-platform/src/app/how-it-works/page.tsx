import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works — DREAM Eval",
  description:
    "Learn how the DREAM evaluation pipeline benchmarks AI research agents across five agentic reasoning dimensions.",
};

const steps = [
  {
    num: "01",
    title: "Submit Your Agent",
    desc: "Connect your research agent via our API or upload traces from a previous run. We support all major frameworks — LangChain, AutoGen, CrewAI, and custom implementations.",
    detail: "curl -X POST https://api.dreameval.ai/v1/evaluate \\\n  -H 'Authorization: Bearer dk_...' \\\n  -d '{\"agent_url\": \"https://...\", \"suite\": \"deep-research-v2\"}'",
  },
  {
    num: "02",
    title: "Select Evaluation Suite",
    desc: "Choose from pre-built task suites or create custom scenarios. Each suite contains multi-turn research tasks calibrated for specific domains — biomedical, legal, financial, or general knowledge.",
    detail: "Available suites: deep-research-v2, biomedical-qa, legal-analysis, financial-dd, custom",
  },
  {
    num: "03",
    title: "Agent Runs Scenarios",
    desc: "Your agent executes a battery of research tasks under controlled conditions. We capture every reasoning step, tool call, source retrieval, and synthesis decision for analysis.",
    detail: "Avg. scenarios per suite: 25 | Avg. eval time: 45 min | Max context: 128k tokens",
  },
  {
    num: "04",
    title: "DREAM Metrics Computed",
    desc: "Our scoring engine evaluates the agent on five axes: Depth, Reasoning, Evidence quality, Accuracy, and Multi-step coherence. Each metric uses calibrated rubrics validated against expert human judgment.",
    detail: "Inter-annotator agreement: κ = 0.87 | Metric reliability: α = 0.92",
  },
  {
    num: "05",
    title: "Report Delivered",
    desc: "Receive a detailed benchmark report with per-task breakdowns, reasoning trace visualizations, comparative rankings, and actionable improvement recommendations.",
    detail: "Formats: Interactive dashboard, PDF, JSON API response",
  },
];

const dreamMetrics = [
  { letter: "D", name: "Depth", desc: "Measures how thoroughly the agent explores a research question — topic coverage, sub-question generation, and information completeness." },
  { letter: "R", name: "Reasoning", desc: "Evaluates logical coherence across the research chain — argument structure, inferential validity, and conclusion support." },
  { letter: "E", name: "Evidence", desc: "Scores the quality, relevance, and diversity of sources cited — fact grounding, source authority, and citation accuracy." },
  { letter: "A", name: "Accuracy", desc: "Validates factual correctness of all claims and conclusions against verified ground-truth datasets." },
  { letter: "M", name: "Multi-step", desc: "Assesses performance on complex tasks requiring planning, tool use sequencing, and multi-turn synthesis." },
];

export default function HowItWorks() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">How It Works</h1>
        <p className="mt-4 text-lg text-muted">
          Five steps from agent submission to production-ready evaluation report.
        </p>
      </section>

      {/* Steps */}
      <section className="mx-auto mt-20 max-w-4xl px-6">
        <div className="relative border-l border-card-border pl-8">
          {steps.map((s, i) => (
            <div key={s.num} className={`relative pb-14 ${i === steps.length - 1 ? "pb-0" : ""}`}>
              <div className="absolute -left-[41px] flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-card font-mono text-xs text-accent-bright">
                {s.num}
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
              <div className="mt-4 overflow-x-auto rounded-lg border border-card-border bg-background p-4 font-mono text-xs text-muted">
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DREAM breakdown */}
      <section className="mt-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold">The DREAM Framework</h2>
          <p className="mt-4 text-center text-muted">
            Five calibrated dimensions for evaluating agentic research quality.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {dreamMetrics.map((m) => (
              <div
                key={m.letter}
                className="rounded-xl border border-card-border bg-card p-5 transition hover:border-accent/40"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 font-mono text-xl font-bold text-accent-bright">
                  {m.letter}
                </div>
                <h3 className="mb-1 font-semibold">{m.name}</h3>
                <p className="text-xs text-muted">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 text-center">
        <Link
          href="/contact"
          className="rounded-lg bg-accent px-8 py-3 font-medium text-white transition hover:bg-accent-bright"
        >
          Request a Demo
        </Link>
      </section>
    </div>
  );
}
