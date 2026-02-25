import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — CoreScope",
  description: "Transparent per-build pricing. Free first audit, pay only when we find >15% speedup.",
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    builds: "1 build",
    desc: "Try CoreScope on a single build, no commitment.",
    features: [
      "E-core/P-core utilization report",
      "Compiler flag suggestions",
      "Thread affinity recommendations",
      "Annotated flame graph",
      "JSON + table output formats",
    ],
  },
  {
    name: "Team",
    price: "$49",
    period: "/mo",
    builds: "500 builds/mo",
    desc: "For teams shipping iOS apps daily.",
    popular: true,
    features: [
      "Everything in Starter",
      "Historical regression tracking",
      "GitHub Actions plugin",
      "Buildkite plugin",
      "GitLab CI plugin",
      "Slack alerts on regressions",
      "Team dashboard (up to 10 seats)",
      "Commit-level performance diff",
    ],
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/mo",
    builds: "Unlimited",
    desc: "For large teams with Xcode Cloud and custom CI.",
    features: [
      "Everything in Team",
      "Xcode Cloud native integration",
      "Custom webhook endpoints",
      "Priority email support",
      "Unlimited seats",
      "SSO / SAML",
      "SLA guarantee (99.9% uptime)",
      "On-premise agent option",
    ],
  },
];

const calculator = [
  { builds: 100, naive: "$420", optimized: "$236", saved: "$184" },
  { builds: 500, naive: "$2,100", optimized: "$1,180", saved: "$920" },
  { builds: 2000, naive: "$8,400", optimized: "$4,720", saved: "$3,680" },
  { builds: 5000, naive: "$21,000", optimized: "$11,800", saved: "$9,200" },
];

export default function PricingPage() {
  return (
    <div className="pt-16">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-black md:text-4xl">Pricing</h1>
          <p className="mt-2 text-zinc-500">
            Pay only when we find &gt;15% speedup opportunity. Cancel anytime.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 ${
                plan.popular ? "border-green-500/50 bg-green-500/5" : "border-zinc-800 bg-zinc-900"
              }`}
            >
              {plan.popular && (
                <div className="mb-3 text-xs font-semibold text-green-400">MOST POPULAR</div>
              )}
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <div className="mt-2">
                <span className="text-4xl font-black">{plan.price}</span>
                {plan.period && <span className="text-sm text-zinc-500">{plan.period}</span>}
              </div>
              <div className="mt-1 text-xs text-zinc-500">{plan.builds}</div>
              <p className="mt-3 text-sm text-zinc-500">{plan.desc}</p>
              <ul className="mt-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-0.5 text-green-500">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/docs"
                className={`mt-8 block rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
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

        {/* Savings Calculator */}
        <section className="mt-20">
          <h2 className="text-center text-2xl font-bold">Build Cost Calculator</h2>
          <p className="mt-2 text-center text-sm text-zinc-500">
            Based on average $4.20/build CI cost on Apple Silicon runners (39% optimization).
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500">
                  <th className="pb-3 pr-6">Builds/mo</th>
                  <th className="pb-3 pr-6">Before CoreScope</th>
                  <th className="pb-3 pr-6">After CoreScope</th>
                  <th className="pb-3 text-green-400">Monthly Savings</th>
                </tr>
              </thead>
              <tbody>
                {calculator.map((row) => (
                  <tr key={row.builds} className="border-b border-zinc-800/50">
                    <td className="py-3 pr-6 font-medium">{row.builds.toLocaleString()}</td>
                    <td className="py-3 pr-6 text-zinc-500">{row.naive}</td>
                    <td className="py-3 pr-6 text-zinc-500">{row.optimized}</td>
                    <td className="py-3 font-bold text-green-400">{row.saved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="text-center text-2xl font-bold">FAQ</h2>
          <div className="mt-8 space-y-4">
            {[
              {
                q: "What if CoreScope doesn't find a >15% speedup?",
                a: "You don't pay. The Starter tier is completely free, and paid tiers only charge for builds where actionable recommendations are generated.",
              },
              {
                q: "Does CoreScope slow down my builds?",
                a: "No. The CLI agent adds <0.5% overhead by sampling powermetrics at 100ms intervals. It does not inject into the build process.",
              },
              {
                q: "Which Apple Silicon chips are supported?",
                a: "All Apple Silicon Macs: M1, M1 Pro/Max/Ultra, M2, M2 Pro/Max/Ultra, M3, M3 Pro/Max, M4, M4 Pro/Max. The analyzer adapts to each chip's core topology.",
              },
              {
                q: "Can I use CoreScope with SPM instead of xcodebuild?",
                a: "Yes. `corescope wrap -- swift build` works with Swift Package Manager, xcodebuild, bazel, and any other build tool.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm text-zinc-500">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
