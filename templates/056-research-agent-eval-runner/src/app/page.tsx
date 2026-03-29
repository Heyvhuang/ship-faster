import Link from "next/link";

const benchmarks = [
  {
    id: "rgym-001",
    title: "Literature Survey Synthesis",
    paper: "ResearchGym (2024)",
    tasks: 12,
    difficulty: "Hard",
    desc: "Synthesize findings across 50+ papers into structured survey sections with citations.",
  },
  {
    id: "rgym-002",
    title: "Experiment Design",
    paper: "ResearchGym (2024)",
    tasks: 8,
    difficulty: "Expert",
    desc: "Design controlled experiments given a hypothesis, dataset, and compute budget.",
  },
  {
    id: "rgym-003",
    title: "Result Interpretation",
    paper: "ResearchGym (2024)",
    tasks: 15,
    difficulty: "Medium",
    desc: "Interpret ablation tables and generate correct conclusions from statistical results.",
  },
  {
    id: "rgym-004",
    title: "Code-to-Paper Alignment",
    paper: "ResearchGym (2024)",
    tasks: 10,
    difficulty: "Hard",
    desc: "Verify that code implementations match methodology described in paper sections.",
  },
  {
    id: "rgym-005",
    title: "Novelty Detection",
    paper: "ResearchGym (2024)",
    tasks: 6,
    difficulty: "Expert",
    desc: "Identify whether proposed methods are genuinely novel vs. incremental over prior work.",
  },
];

const steps = [
  {
    num: "01",
    title: "Upload Agent",
    desc: "Point us to your agent endpoint. We handle the rest.",
    code: `curl -X POST https://radar.dev/api/v1/eval \\
  -H "Authorization: Bearer rdr_..." \\
  -d '{"agent_url": "https://your-agent.com/run"}'`,
  },
  {
    num: "02",
    title: "Run Eval",
    desc: "We execute your agent against research-grade benchmarks in a sandboxed environment.",
    code: `{
  "eval_id": "eval_7xk9m2",
  "status": "running",
  "benchmark": "rgym-001",
  "started_at": "2024-12-15T10:30:00Z"
}`,
  },
  {
    num: "03",
    title: "Get Scores",
    desc: "Receive detailed results with pass/fail, reasoning traces, and score breakdowns.",
    code: `{
  "eval_id": "eval_7xk9m2",
  "status": "completed",
  "score": 0.847,
  "passed": 10,
  "failed": 2,
  "reasoning_trace": "..."
}`,
  },
];

function DifficultyBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Medium: "text-yellow-400 border-yellow-400/30",
    Hard: "text-orange-400 border-orange-400/30",
    Expert: "text-red-400 border-red-400/30",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 border rounded font-mono ${colors[level] || ""}`}
    >
      {level}
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-neon font-bold text-lg tracking-tight">
            ◈ radar
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted">
          <Link href="/pricing" className="hover:text-foreground transition">
            Pricing
          </Link>
          <Link href="/docs" className="hover:text-foreground transition">
            API Docs
          </Link>
          <Link href="/dashboard" className="hover:text-foreground transition">
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="bg-neon text-black px-4 py-1.5 rounded font-medium hover:bg-neon-dim transition"
          >
            Get API Key
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-neon border border-neon/20 rounded-full px-3 py-1 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          Now in public beta
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-tight">
          One API call to benchmark
          <br />
          <span className="text-neon">your research agent</span>
        </h1>
        <p className="text-muted mt-6 max-w-xl text-lg leading-relaxed">
          Run paper-specific evaluations on fresh AI research tasks. No local
          setup, no dependency hell. Just scores.
        </p>
        <div className="flex gap-4 mt-10">
          <Link
            href="/dashboard"
            className="bg-neon text-black px-6 py-3 rounded font-bold hover:bg-neon-dim transition glow-pulse"
          >
            Start Free →
          </Link>
          <Link
            href="/docs"
            className="border border-border px-6 py-3 rounded font-medium text-muted hover:text-foreground hover:border-foreground/30 transition"
          >
            View API Docs
          </Link>
        </div>

        {/* Live demo snippet */}
        <div className="mt-16 w-full max-w-2xl">
          <div className="bg-surface border border-border rounded-lg overflow-hidden text-left">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-xs text-muted ml-2">terminal</span>
            </div>
            <pre className="p-4 text-sm text-green-400 overflow-x-auto">
              <code>{`$ curl -X POST https://radar.dev/api/v1/eval \\
    -H "Authorization: Bearer rdr_sk_live_..." \\
    -d '{
      "agent_url": "https://my-agent.com/run",
      "benchmark": "rgym-001",
      "tasks": "all"
    }'

→ {"eval_id":"eval_7xk9m2","status":"queued","eta_seconds":120}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-16">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col">
                <div className="text-neon text-xs font-bold mb-2">
                  STEP {step.num}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted text-sm mb-4">{step.desc}</p>
                <div className="bg-surface border border-border rounded p-3 text-xs text-green-400/80 overflow-x-auto flex-1">
                  <pre>
                    <code>{step.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benchmarks Grid */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">
            Available Benchmarks
          </h2>
          <p className="text-muted text-center mb-12 text-sm">
            5 pre-loaded research tasks from the ResearchGym paper
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benchmarks.map((b) => (
              <div
                key={b.id}
                className="bg-surface border border-border rounded-lg p-5 hover:border-neon/30 transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted font-mono">{b.id}</span>
                  <DifficultyBadge level={b.difficulty} />
                </div>
                <h3 className="font-bold mb-1 group-hover:text-neon transition">
                  {b.title}
                </h3>
                <p className="text-muted text-xs mb-3">{b.desc}</p>
                <div className="text-xs text-muted">
                  {b.tasks} tasks · {b.paper}
                </div>
              </div>
            ))}
            {/* CTA card */}
            <div className="border border-dashed border-border rounded-lg p-5 flex flex-col items-center justify-center text-center">
              <p className="text-muted text-sm mb-2">More benchmarks coming</p>
              <p className="text-xs text-muted">
                Request a paper →{" "}
                <span className="text-neon">radar@eval.dev</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Simple, usage-based pricing</h2>
          <p className="text-muted mb-10 text-sm">
            Pay per evaluation. No subscriptions, no minimums.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { evals: "100", price: "$49", per: "$0.49/eval", pop: false },
              { evals: "500", price: "$199", per: "$0.40/eval", pop: true },
              { evals: "1,000", price: "$349", per: "$0.35/eval", pop: false },
            ].map((tier) => (
              <div
                key={tier.evals}
                className={`rounded-lg p-6 border ${
                  tier.pop
                    ? "border-neon/50 bg-neon/5"
                    : "border-border bg-surface"
                }`}
              >
                <div className="text-3xl font-bold mb-1">{tier.price}</div>
                <div className="text-muted text-sm mb-2">
                  {tier.evals} evals
                </div>
                <div className="text-neon text-xs">{tier.per}</div>
              </div>
            ))}
          </div>
          <Link
            href="/pricing"
            className="inline-block mt-8 text-sm text-muted hover:text-neon transition"
          >
            View full pricing details →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span className="text-neon font-bold">◈ radar</span>
          <div className="flex gap-6">
            <Link href="/docs" className="hover:text-foreground transition">
              API Docs
            </Link>
            <Link href="/pricing" className="hover:text-foreground transition">
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-foreground transition"
            >
              Dashboard
            </Link>
            <span>radar@eval.dev</span>
          </div>
          <span>© 2024 Radar. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
