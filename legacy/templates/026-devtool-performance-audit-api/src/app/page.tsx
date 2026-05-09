import Link from "next/link";

const coreData = {
  naive: [
    { label: "P0", pct: 98, type: "p" },
    { label: "P1", pct: 95, type: "p" },
    { label: "P2", pct: 87, type: "p" },
    { label: "P3", pct: 91, type: "p" },
    { label: "E0", pct: 12, type: "e" },
    { label: "E1", pct: 8, type: "e" },
    { label: "E2", pct: 5, type: "e" },
    { label: "E3", pct: 3, type: "e" },
  ],
  optimized: [
    { label: "P0", pct: 72, type: "p" },
    { label: "P1", pct: 68, type: "p" },
    { label: "P2", pct: 65, type: "p" },
    { label: "P3", pct: 70, type: "p" },
    { label: "E0", pct: 89, type: "e" },
    { label: "E1", pct: 85, type: "e" },
    { label: "E2", pct: 78, type: "e" },
    { label: "E3", pct: 82, type: "e" },
  ],
};

function CoreBar({ label, pct, type }: { label: string; pct: number; type: string }) {
  const color = type === "p" ? "bg-red-500" : "bg-green-500";
  const dimColor = type === "p" ? "bg-red-500/20" : "bg-green-500/20";
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-6 text-zinc-500">{label}</span>
      <div className={`h-3 flex-1 rounded-sm ${dimColor}`}>
        <div className={`h-full rounded-sm ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-right text-zinc-500">{pct}%</span>
    </div>
  );
}

function FlameBlock({ name, width, depth, color }: { name: string; width: string; depth: number; color: string }) {
  return (
    <div
      className={`${color} mb-0.5 truncate rounded-sm px-2 py-1 text-[10px] font-medium`}
      style={{ width, marginLeft: `${depth * 16}px` }}
    >
      {name}
    </div>
  );
}

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1.5 text-xs text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Now profiling Apple M4 Pro &amp; M4 Max
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Stop wasting P-cores
              <br />
              <span className="text-green-400">on linking jobs</span>
            </h1>
          </div>
          <p className="animate-fade-in-up-delay mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            CoreScope analyzes E-core vs P-core allocation in your Apple Silicon CI builds and delivers specific compiler flag and parallelization fixes. Cut build minutes. Recover dollars.
          </p>
          <div className="animate-fade-in-up-delay-2 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/docs"
              className="rounded-lg bg-green-500 px-8 py-3 text-sm font-bold text-black transition-colors hover:bg-green-400"
            >
              Start Free Audit →
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
            >
              View Demo Dashboard
            </Link>
          </div>
          <div className="mt-8 text-xs text-zinc-600">
            Free for your first build · No credit card required
          </div>
        </div>
      </section>

      {/* Problem Visualization */}
      <section className="border-y border-zinc-800 bg-zinc-950 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">The Problem: Idle E-cores</h2>
          <p className="mb-12 text-center text-sm text-zinc-500">
            Most CI builds pin all work to P-cores while E-cores sit idle. Your linking, code signing, and asset compilation should run on E-cores.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-red-500/20 bg-zinc-900 p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="text-sm font-semibold text-red-400">Naive Build — 14m 32s</span>
              </div>
              <div className="space-y-1.5">
                {coreData.naive.map((c) => (
                  <CoreBar key={c.label} {...c} />
                ))}
              </div>
              <div className="mt-4 rounded bg-zinc-800 px-3 py-2 text-xs text-zinc-500">
                P-cores overloaded · E-cores 93% idle · $4.20 wasted/build
              </div>
            </div>
            <div className="rounded-xl border border-green-500/20 bg-zinc-900 p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="text-sm font-semibold text-green-400">Optimized Build — 8m 47s</span>
              </div>
              <div className="space-y-1.5">
                {coreData.optimized.map((c) => (
                  <CoreBar key={c.label} {...c} />
                ))}
              </div>
              <div className="mt-4 rounded bg-zinc-800 px-3 py-2 text-xs text-zinc-500">
                Balanced load · 39% faster · $1.84 saved/build
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">Three Commands to Faster Builds</h2>
          <p className="mb-12 text-center text-sm text-zinc-500">
            Works with GitHub Actions, Buildkite, GitLab CI, and Xcode Cloud.
          </p>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Install the CLI agent",
                code: "brew install corescope/tap/corescope",
                desc: "One-line install on your Apple Silicon CI runner. Zero dependencies.",
              },
              {
                step: "02",
                title: "Profile your next build",
                code: "corescope wrap -- xcodebuild -scheme MyApp build",
                desc: "Silently captures powermetrics and xctrace data. No build changes required.",
              },
              {
                step: "03",
                title: "Get optimization report",
                code: "corescope report --format=json | jq '.recommendations'",
                desc: "Specific compiler flags, thread affinity hints, and CI YAML patches.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-sm font-black text-green-400">
                  {item.step}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{item.desc}</p>
                  <div className="mt-3 overflow-x-auto rounded-lg bg-zinc-950 px-4 py-3 text-sm text-green-400">
                    <code>$ {item.code}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Flame Graph */}
      <section className="border-y border-zinc-800 bg-zinc-950 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">Sample Build Flame Graph</h2>
          <p className="mb-8 text-center text-sm text-zinc-500">
            Core annotations show which tasks should move from P-cores to E-cores.
          </p>
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="min-w-[500px]">
              <FlameBlock name="xcodebuild (total: 14m 32s)" width="100%" depth={0} color="bg-zinc-700 text-zinc-200" />
              <FlameBlock name="SwiftCompile — MyApp (P0-P3) ✓" width="65%" depth={1} color="bg-green-700/60 text-green-200" />
              <FlameBlock name="CompileC — NetworkKit (P0-P1)" width="40%" depth={2} color="bg-green-700/40 text-green-200" />
              <FlameBlock name="Ld — MyApp (P2) ⚠ Move to E-core" width="30%" depth={2} color="bg-amber-700/60 text-amber-200" />
              <FlameBlock name="CodeSign (P3) ⚠ Move to E-core" width="15%" depth={2} color="bg-amber-700/60 text-amber-200" />
              <FlameBlock name="CopySwiftLibs (P1) 🔴 E-core candidate" width="20%" depth={1} color="bg-red-700/50 text-red-200" />
              <FlameBlock name="CompileAssetCatalog (P0) 🔴 E-core candidate" width="25%" depth={1} color="bg-red-700/50 text-red-200" />
              <FlameBlock name="ProcessInfoPlistFile (E0) ✓" width="10%" depth={1} color="bg-green-700/40 text-green-200" />
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-zinc-500">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-green-600" /> Optimal</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-amber-600" /> Suboptimal</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-600" /> E-core candidate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">Transparent Per-Build Pricing</h2>
          <p className="mb-10 text-sm text-zinc-500">
            Free audit for your first build. Pay only when we find &gt;15% speedup opportunity.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { name: "Starter", price: "Free", builds: "1 build audit", features: ["E-core/P-core report", "Compiler flag suggestions", "Single build analysis"] },
              { name: "Team", price: "$49", period: "/mo", builds: "Up to 500 builds", features: ["Everything in Starter", "Historical regression tracking", "CI/CD plugin access", "Slack alerts"], popular: true },
              { name: "Enterprise", price: "$199", period: "/mo", builds: "Unlimited builds", features: ["Everything in Team", "Xcode Cloud integration", "Priority support", "Custom webhooks"] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 text-left ${plan.popular ? "border-green-500/50 bg-green-500/5" : "border-zinc-800 bg-zinc-900"}`}
              >
                {plan.popular && (
                  <div className="mb-3 text-xs font-semibold text-green-400">MOST POPULAR</div>
                )}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-black">{plan.price}</span>
                  {plan.period && <span className="text-sm text-zinc-500">{plan.period}</span>}
                </div>
                <div className="mt-1 text-xs text-zinc-500">{plan.builds}</div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="mt-1 text-green-500">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/docs"
                  className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                    plan.popular
                      ? "bg-green-500 text-black hover:bg-green-400"
                      : "border border-zinc-700 text-zinc-300 hover:border-zinc-500"
                  }`}
                >
                  {plan.name === "Starter" ? "Start Free" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
          <Link href="/pricing" className="mt-8 inline-block text-sm text-zinc-500 hover:text-green-400">
            View full pricing details →
          </Link>
        </div>
      </section>

      {/* API Docs Preview */}
      <section className="border-t border-zinc-800 bg-zinc-950 px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-2xl font-bold md:text-3xl">API in 30 Seconds</h2>
          <p className="mb-8 text-center text-sm text-zinc-500">
            Copy-paste these curl examples to start testing immediately.
          </p>
          <div className="space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-2 text-xs font-semibold text-zinc-500">Upload Build Telemetry</div>
              <pre className="overflow-x-auto text-sm text-green-400">
{`curl -X POST https://api.corescope.dev/v1/builds \\
  -H "Authorization: Bearer cs_live_abc123" \\
  -F "telemetry=@build-trace.json" \\
  -F "ci_provider=github_actions"`}
              </pre>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-2 text-xs font-semibold text-zinc-500">Get Recommendations</div>
              <pre className="overflow-x-auto text-sm text-green-400">
{`curl https://api.corescope.dev/v1/builds/bld_7x2k/recommendations \\
  -H "Authorization: Bearer cs_live_abc123" | jq .`}
              </pre>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-2 text-xs font-semibold text-zinc-500">Response</div>
              <pre className="overflow-x-auto text-sm text-zinc-300">
{`{
  "build_id": "bld_7x2k",
  "speedup_pct": 39.4,
  "dollars_saved_per_build": 1.84,
  "recommendations": [
    {
      "severity": "high",
      "task": "Ld MyApp",
      "current_core": "P2",
      "suggested_core": "E0",
      "reason": "Linker is I/O bound, not compute bound"
    }
  ]
}`}
              </pre>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/docs" className="text-sm text-green-400 hover:text-green-300">
              Read full API documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black md:text-4xl">
            Every idle E-core is <span className="text-green-400">money on fire</span>
          </h2>
          <p className="mt-4 text-zinc-500">
            Get your free build audit in under 5 minutes. See exactly how many seconds and dollars you can recover.
          </p>
          <Link
            href="/docs"
            className="mt-8 inline-block rounded-lg bg-green-500 px-10 py-3.5 text-sm font-bold text-black transition-colors hover:bg-green-400"
          >
            Audit Your First Build Free →
          </Link>
        </div>
      </section>
    </div>
  );
}
