import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Upload Session Log",
    desc: "Drag & drop your Claude Code session log file or paste the session folder path.",
    icon: "↑",
  },
  {
    num: "02",
    title: "Parse & Recover",
    desc: "Our parser extracts every code block, detects languages, and reconstructs file paths.",
    icon: "⟳",
  },
  {
    num: "03",
    title: "Download Files",
    desc: "Preview recovered code with syntax highlighting and download as a structured zip.",
    icon: "↓",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Engineer @ Stripe",
    quote:
      "I accidentally closed a 2-hour Claude session with 15 files of refactored code. SessionRecover got everything back in seconds.",
    before: `// Lost session - nothing saved\n$ claude --session abc123\nError: Session not found`,
    after: `// Recovered 15 files\nsrc/api/routes.ts\nsrc/models/user.ts\nsrc/middleware/auth.ts\n... and 12 more files ✓`,
  },
  {
    name: "Marcus Johnson",
    role: "Founder @ DevStack",
    quote:
      "My disk crashed mid-session. I thought I lost a full day of Claude-assisted work. SessionRecover pulled it all back from the logs.",
    before: `// Corrupted session data\n[ERROR] Unable to read session\nSegmentation fault (core dumped)`,
    after: `// Full recovery\n✓ 8 TypeScript files\n✓ 3 Python scripts\n✓ 2 config files\n✓ 1 Dockerfile`,
  },
];

const faqs = [
  {
    q: "Is my code safe?",
    a: "Absolutely. All parsing and recovery happens 100% locally in your browser. No data is ever uploaded to any server.",
  },
  {
    q: "What session formats are supported?",
    a: "We support Claude Code session logs (.jsonl), exported chat histories, and raw session directories from ~/.claude/sessions/.",
  },
  {
    q: "How accurate is the recovery?",
    a: "We recover every code block written during the session with original file paths when available. Language detection is automatic.",
  },
  {
    q: "Can I recover from corrupted sessions?",
    a: "Yes. Our parser handles partial/corrupted JSONL files and extracts whatever code blocks remain intact.",
  },
  {
    q: "Do I need to pay for basic recovery?",
    a: "No. Single-session recovery is free forever. Paid plans add bulk recovery, monitoring, and automated backups.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-24 text-center md:pt-32 md:pb-28">
          <div className="mb-6 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 font-mono text-xs text-accent">
            100% local processing — your code never leaves your machine
          </div>
          <h1 className="font-mono text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Recover lost code from
            <br />
            <span className="text-accent">Claude Code sessions</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted md:text-lg">
            Accidentally closed a session? Disk crash mid-coding? Extract and reconstruct every line
            of code from your Claude Code session logs in one click.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/recover"
              className="w-full rounded-md bg-accent px-8 py-3 text-base font-semibold text-black hover:bg-accent-dim transition-colors sm:w-auto"
            >
              Recover My Code — Free
            </Link>
            <Link
              href="/#how-it-works"
              className="w-full rounded-md border border-border px-8 py-3 text-base text-muted hover:text-foreground hover:border-muted transition-colors sm:w-auto"
            >
              See How It Works
            </Link>
          </div>
          <p className="mt-6 font-mono text-xs text-muted">
            Used by 4,200+ developers &middot; 12,000+ sessions recovered
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center font-mono text-2xl font-bold md:text-3xl">
            How it works
          </h2>
          <p className="mt-3 text-center text-muted">Three steps. Under 10 seconds.</p>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.num}
                className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-border bg-surface-2 font-mono text-xl text-accent">
                  {s.icon}
                </div>
                <div className="mb-2 font-mono text-xs text-accent">{s.num}</div>
                <h3 className="font-mono text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center font-mono text-2xl font-bold md:text-3xl">
            Real recoveries
          </h2>
          <p className="mt-3 text-center text-muted">Before and after — actual recovery results.</p>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-lg border border-border bg-surface p-6">
                <p className="text-sm italic text-muted">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-3 text-sm font-semibold">
                  {t.name} <span className="font-normal text-muted">— {t.role}</span>
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-surface-2 p-3">
                    <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-red-400">
                      Before
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-muted">
                      {t.before}
                    </pre>
                  </div>
                  <div className="rounded-md bg-surface-2 p-3">
                    <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                      After
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-accent/80">
                      {t.after}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-mono text-2xl font-bold md:text-3xl">Simple pricing</h2>
          <p className="mt-3 text-muted">Free for single sessions. Pro for power users.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-6 text-left">
              <div className="font-mono text-xs text-muted">FREE</div>
              <div className="mt-2 font-mono text-3xl font-bold">$0</div>
              <ul className="mt-6 space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> Single session recovery</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> All languages supported</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> Download as zip</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> 100% local processing</li>
              </ul>
              <Link
                href="/recover"
                className="mt-6 block rounded-md border border-border py-2 text-center text-sm text-muted hover:text-foreground hover:border-muted transition-colors"
              >
                Get Started
              </Link>
            </div>
            <div className="rounded-lg border border-accent/40 bg-surface p-6 text-left">
              <div className="font-mono text-xs text-accent">PRO</div>
              <div className="mt-2 font-mono text-3xl font-bold">
                $19<span className="text-base font-normal text-muted">/mo</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> Unlimited bulk recovery</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> Automated session backups</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> Session monitoring daemon</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> Priority support</li>
              </ul>
              <Link
                href="/pricing"
                className="mt-6 block rounded-md bg-accent py-2 text-center text-sm font-semibold text-black hover:bg-accent-dim transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center font-mono text-2xl font-bold md:text-3xl">FAQ</h2>
          <div className="mt-12 space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-border pb-6">
                <h3 className="font-mono text-sm font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-mono text-2xl font-bold md:text-3xl">
            Don&apos;t lose your work again
          </h2>
          <p className="mt-3 text-muted">
            Recover your lost Claude Code sessions now — free, private, instant.
          </p>
          <Link
            href="/recover"
            className="mt-8 inline-block rounded-md bg-accent px-8 py-3 text-base font-semibold text-black hover:bg-accent-dim transition-colors"
          >
            Recover My Code — Free
          </Link>
        </div>
      </section>
    </>
  );
}
