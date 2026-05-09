import Link from "next/link";

const features = [
  {
    icon: "🔒",
    title: "Automatic Isolation",
    desc: "Every agent runs in its own sandboxed container with gVisor-level isolation. No shared kernel, no escape.",
  },
  {
    icon: "📊",
    title: "Resource Limits",
    desc: "Set per-agent CPU, memory, GPU, and cost caps with simple sliders. Never get a surprise bill.",
  },
  {
    icon: "🛡️",
    title: "Security Policies",
    desc: "Built-in policies: no network egress, restricted filesystem, blocked syscalls. Customize per agent.",
  },
  {
    icon: "📈",
    title: "Agent Monitoring",
    desc: "Real-time dashboards for token usage, API calls, execution time, and resource consumption.",
  },
  {
    icon: "⏱️",
    title: "Auto Teardown",
    desc: "Sandboxes automatically shut down after inactivity. No orphaned containers wasting resources.",
  },
  {
    icon: "📋",
    title: "Audit Logs",
    desc: "Full audit trail of every action, API call, and file access for compliance and debugging.",
  },
];

const steps = [
  { num: "01", title: "Upload Code", desc: "Paste your agent code or upload a file. We support Python, Node.js, and any Docker image." },
  { num: "02", title: "Configure & Launch", desc: "Set resource limits and security policies (or use smart defaults). Sandbox is ready in under 30 seconds." },
  { num: "03", title: "Monitor & Debug", desc: "Watch live logs, metrics, and SSH into your sandbox. Stop, pause, or delete anytime." },
];

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#58a6ff10_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center md:py-36">
          <div className="mb-4 inline-block rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-green">
            Now in Public Beta
          </div>
          <h1 className="mb-6 font-mono text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Secure sandboxes for
            <br />
            <span className="text-blue">AI agents</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted">
            Deploy and run AI agents in isolated environments with automatic security policies,
            resource limits, and real-time monitoring. No infrastructure setup required.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="rounded-md bg-green px-6 py-2.5 font-mono text-sm font-semibold text-background hover:brightness-110 transition"
            >
              Start Building &rarr;
            </Link>
            <Link
              href="/docs"
              className="rounded-md border border-border px-6 py-2.5 font-mono text-sm text-muted hover:text-foreground hover:border-muted transition"
            >
              Read the Docs
            </Link>
          </div>

          {/* Terminal preview */}
          <div className="mx-auto mt-14 max-w-2xl overflow-hidden rounded-lg border border-border bg-surface text-left">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-xs text-muted">terminal</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed md:text-sm">
              <code>
{`$ sandboxkit deploy agent.py --limits cpu=2,mem=4g

⠿ Provisioning sandbox...
✓ Sandbox ready in 12.4s

  ID:       sbx_a1b2c3d4
  Status:   running
  CPU:      2 cores
  Memory:   4 GB
  Policy:   default (no-egress, ro-fs)

$ sandboxkit logs sbx_a1b2c3d4 --follow
[2026-03-06 08:12:01] Agent started
[2026-03-06 08:12:02] Loading model weights...
[2026-03-06 08:12:05] Processing task queue
[2026-03-06 08:12:06] ✓ Task #1 completed (1.2s)`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-12 text-center font-mono text-2xl font-bold md:text-3xl">
            How it works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.num} className="rounded-lg border border-border bg-surface p-6">
                <div className="mb-3 font-mono text-3xl font-bold text-blue">{s.num}</div>
                <h3 className="mb-2 font-mono text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-4 text-center font-mono text-2xl font-bold md:text-3xl">
            Built for agent safety
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-muted">
            Everything you need to deploy agents with confidence. Security and observability out of the box.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-border bg-surface p-6 transition hover:border-blue/40"
              >
                <div className="mb-3 text-2xl">{f.icon}</div>
                <h3 className="mb-2 font-mono text-sm font-semibold">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-mono text-2xl font-bold md:text-3xl">Simple, transparent pricing</h2>
          <p className="mb-8 text-muted">
            Start free with 50 agent-hours per month. Pay only for what you use.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Free", price: "$0", desc: "50 agent-hours/mo", cta: "Get Started" },
              { name: "Usage", price: "$0.02", desc: "per agent-minute", cta: "Start Building", highlight: true },
              { name: "Team", price: "$99", desc: "/month · 5 seats", cta: "Contact Sales" },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-lg border p-6 ${
                  p.highlight
                    ? "border-green bg-green/5"
                    : "border-border bg-surface"
                }`}
              >
                <h3 className="mb-1 font-mono text-sm font-semibold text-muted">{p.name}</h3>
                <div className="mb-2 font-mono text-3xl font-bold">{p.price}</div>
                <p className="mb-4 text-sm text-muted">{p.desc}</p>
                <Link
                  href="/pricing"
                  className={`block rounded-md px-4 py-2 text-sm font-medium transition ${
                    p.highlight
                      ? "bg-green text-background hover:brightness-110"
                      : "border border-border text-muted hover:text-foreground"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 font-mono text-2xl font-bold md:text-3xl">
            Ready to sandbox your agents?
          </h2>
          <p className="mb-8 text-muted">
            Get started in under a minute. No credit card required.
          </p>
          <Link
            href="/dashboard"
            className="inline-block rounded-md bg-blue px-8 py-3 font-mono text-sm font-semibold text-background hover:brightness-110 transition"
          >
            Start Building &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
