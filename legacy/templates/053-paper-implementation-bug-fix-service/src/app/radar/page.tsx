import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Submit Your Bug",
    desc: "Share your paper implementation, describe the issue, and point us at the failing code.",
  },
  {
    num: "02",
    title: "We Diagnose",
    desc: "Our ML engineers trace through the math, the code, and the paper to find the root cause.",
  },
  {
    num: "03",
    title: "Fixed-Price Quote",
    desc: "You receive a clear quote based on complexity. No surprises, no hourly billing.",
  },
  {
    num: "04",
    title: "Fix Delivered",
    desc: "We deliver the fix with a plain-English explanation and validation tests you can run.",
  },
];

const painPoints = [
  "Spent 3 weeks debugging a single tensor shape mismatch",
  "The paper's pseudocode doesn't match the released code",
  "Training diverges at epoch 50 and nobody knows why",
  "The open-source repo is abandoned and full of issues",
  "You found 4 different implementations, all producing different results",
  "The loss converges but the outputs are garbage",
];

const testimonials = [
  {
    quote: "We'd been stuck on a NeRF variant for two weeks. Radar found the bug in the ray sampling code in under 3 hours. Worth every penny.",
    name: "Sarah Chen",
    role: "ML Engineer, Percepto AI",
  },
  {
    quote: "The fix came with a clear explanation of where the paper's notation was ambiguous. We learned as much as we saved in debug time.",
    name: "Marcus Rivera",
    role: "Research Engineer, DeepScale",
  },
  {
    quote: "Fixed a critical gradient computation error in our diffusion model pipeline. The validation tests they provided caught two other latent bugs.",
    name: "Anika Patel",
    role: "CTO, SynthLab",
  },
];

const pricingTiers = [
  {
    name: "Quick Fix",
    price: "$500",
    scope: "Single isolated bug",
    examples: ["Shape mismatch", "Wrong activation", "Off-by-one in indexing"],
    turnaround: "1-2 days",
  },
  {
    name: "Deep Diagnosis",
    price: "$2,000",
    scope: "Complex multi-component bug",
    examples: [
      "Training instability",
      "Numerical precision issues",
      "Architecture misalignment with paper",
    ],
    turnaround: "3-5 days",
    popular: true,
  },
  {
    name: "Full Pipeline Review",
    price: "$5,000",
    scope: "End-to-end implementation audit",
    examples: [
      "Complete implementation validation",
      "Performance optimization",
      "Paper-to-code alignment check",
    ],
    turnaround: "1-2 weeks",
  },
];

export default function RadarPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Accepting new clients
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Your paper implementation has a bug.
              <br />
              <span className="text-accent">We&apos;ll fix it.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed mb-10 max-w-2xl">
              Specialized debugging for ML teams replicating research papers. We trace the math, find the mismatch, and deliver a tested fix with a plain-English explanation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/radar/book"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/radar/case-studies"
                className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted hover:text-foreground hover:border-foreground/20 transition-colors"
              >
                View Case Studies
              </Link>
            </div>
          </div>

          {/* Code snippet decoration */}
          <div className="mt-16 rounded-xl border border-border bg-surface p-6 font-mono text-sm text-muted overflow-x-auto">
            <div className="flex gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <pre className="leading-relaxed">
              <code>
{`# Before: Paper says W @ x + b, code does x @ W + b  (transposed!)
- output = torch.matmul(x, self.weight) + self.bias
+ output = torch.matmul(self.weight, x) + self.bias

# Radar fix: aligned matrix multiplication with Eq. 3 in paper
# Added shape assertion to catch future regressions
+ assert output.shape == (batch_size, d_model), f"Expected {(batch_size, d_model)}"`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Sound familiar?</h2>
          <p className="text-muted mb-12 max-w-xl">
            Every ML team building on research papers hits these walls. You&apos;re not alone.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((pain, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-surface p-5 text-sm text-muted leading-relaxed hover:border-accent/30 transition-colors"
              >
                <span className="text-red-400 mr-2 font-mono text-xs">!</span>
                {pain}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">How it works</h2>
          <p className="text-muted mb-12 max-w-xl">
            From bug report to verified fix in days, not weeks.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="group">
                <div className="text-xs font-mono text-accent mb-3">{step.num}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Transparent pricing</h2>
          <p className="text-muted mb-12 max-w-xl">
            Fixed-scope quotes. Pay only when the fix is validated and working.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl border p-6 flex flex-col ${
                  tier.popular
                    ? "border-accent bg-accent/5"
                    : "border-border bg-surface"
                }`}
              >
                {tier.popular && (
                  <span className="self-start text-[10px] uppercase tracking-wider font-semibold text-accent mb-3">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold mb-1">{tier.name}</h3>
                <div className="text-3xl font-bold mb-1">{tier.price}</div>
                <div className="text-xs text-muted mb-4">{tier.turnaround} turnaround</div>
                <p className="text-sm text-muted mb-4">{tier.scope}</p>
                <ul className="text-sm text-muted space-y-2 mb-6 flex-1">
                  {tier.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">&#10003;</span>
                      {ex}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/radar/book"
                  className={`text-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    tier.popular
                      ? "bg-accent text-white hover:bg-accent-hover"
                      : "border border-border text-muted hover:text-foreground hover:border-foreground/20"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/radar/pricing" className="text-sm text-accent hover:underline">
              View full pricing details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-12">What clients say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-border bg-surface p-6 flex flex-col"
              >
                <p className="text-sm text-muted leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stop debugging. Start shipping.
          </h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">
            Book a free 30-minute consultation. We&apos;ll assess your bug and give you an honest scope estimate.
          </p>
          <Link
            href="/radar/book"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
