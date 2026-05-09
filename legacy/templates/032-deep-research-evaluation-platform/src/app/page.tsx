import Link from "next/link";

const metrics = [
  { name: "Depth", score: 92, desc: "How deeply the agent explores a topic" },
  { name: "Reasoning", score: 87, desc: "Logical coherence of the research chain" },
  { name: "Evidence", score: 94, desc: "Quality and relevance of cited sources" },
  { name: "Accuracy", score: 89, desc: "Factual correctness of conclusions" },
  { name: "Multi-step", score: 81, desc: "Handling of complex multi-turn tasks" },
];

const features = [
  {
    title: "DREAM Metric Scoring",
    desc: "Five-axis evaluation covering Depth, Reasoning, Evidence, Accuracy, and Multi-step performance.",
    icon: "📊",
  },
  {
    title: "Side-by-Side Comparison",
    desc: "Compare multiple agents head-to-head across every metric dimension.",
    icon: "⚖️",
  },
  {
    title: "Reasoning Trace Viz",
    desc: "Visual step-by-step breakdown of how your agent arrived at each conclusion.",
    icon: "🔍",
  },
  {
    title: "Benchmark Reports",
    desc: "Export production-ready PDF/JSON evaluation reports for stakeholders.",
    icon: "📄",
  },
  {
    title: "API-First Design",
    desc: "Integrate evaluations into your CI/CD pipeline with our REST API.",
    icon: "🔌",
  },
  {
    title: "Custom Metric Weighting",
    desc: "Adjust scoring weights to match your specific use case priorities.",
    icon: "⚙️",
  },
];

const logos = [
  "Anthropic",
  "OpenAI",
  "Cohere",
  "DeepMind",
  "Mistral",
  "Hugging Face",
];

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-xs font-mono text-muted">{label}</span>
      <div className="relative h-2 flex-1 rounded-full bg-card-border">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-accent"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="w-8 text-right font-mono text-sm text-accent-bright">{score}</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Now in public beta
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Evaluate AI Research Agents with{" "}
              <span className="text-accent-bright">DREAM Metrics</span>
            </h1>
            <p className="mt-6 text-lg text-muted sm:text-xl">
              The first commercial platform for benchmarking agentic reasoning
              quality. Score depth, reasoning, evidence, accuracy, and multi-step
              performance before deploying to production.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-lg bg-accent px-8 py-3 font-medium text-white transition hover:bg-accent-bright"
              >
                Request a Demo
              </Link>
              <Link
                href="/reports"
                className="rounded-lg border border-card-border px-8 py-3 font-medium text-muted transition hover:border-accent hover:text-foreground"
              >
                View Sample Reports
              </Link>
            </div>
          </div>

          {/* Live score preview */}
          <div className="mx-auto mt-16 max-w-xl rounded-xl border border-card-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-xs text-muted">
                DREAM Score — AutoResearch v2.1
              </span>
              <span className="font-mono text-2xl font-bold text-accent-bright">
                88.6
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {metrics.map((m) => (
                <ScoreBar key={m.name} label={m.name} score={m.score} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-y border-card-border bg-card/50 py-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">
            Trusted by AI teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted">
            {logos.map((l) => (
              <span key={l} className="font-mono text-sm opacity-50">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything you need to evaluate research agents
            </h2>
            <p className="mt-4 text-muted">
              Built for AI teams who ship agents to production.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-card-border bg-card p-6 transition hover:border-accent/40"
              >
                <div className="mb-4 text-2xl">{f.icon}</div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-card-border bg-card/50 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to benchmark your agent?
          </h2>
          <p className="mt-4 text-muted">
            Get a comprehensive DREAM evaluation report in under 24 hours.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-accent px-8 py-3 font-medium text-white transition hover:bg-accent-bright"
          >
            Start Your Evaluation
          </Link>
        </div>
      </section>
    </>
  );
}
