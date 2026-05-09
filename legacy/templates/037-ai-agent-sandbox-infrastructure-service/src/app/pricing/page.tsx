import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — SandboxKit",
  description: "Simple, transparent pricing for AI agent sandboxes. Start free with 50 agent-hours per month.",
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "For individual developers exploring agent sandboxing.",
    features: [
      "50 agent-hours/month",
      "1 concurrent sandbox",
      "2 CPU cores, 4 GB RAM per sandbox",
      "Basic monitoring dashboard",
      "Community support",
      "Default security policies",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Usage-Based",
    price: "$0.02",
    period: "per agent-minute",
    desc: "For developers and small teams running agents in production.",
    features: [
      "Unlimited agent-hours",
      "10 concurrent sandboxes",
      "Up to 8 CPU cores, 32 GB RAM",
      "GPU access (A10G, T4)",
      "Advanced monitoring & alerts",
      "Custom security policies",
      "SSH/terminal access",
      "Email support",
    ],
    cta: "Start Building",
    highlight: true,
  },
  {
    name: "Team",
    price: "$99",
    period: "/month",
    desc: "For teams that need collaboration, compliance, and priority support.",
    features: [
      "Everything in Usage-Based",
      "5 team seats included",
      "Unlimited concurrent sandboxes",
      "Up to 32 CPU cores, 128 GB RAM",
      "Audit logs & compliance reports",
      "SSO / SAML integration",
      "Custom SLAs",
      "Priority support with SLA",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="pt-16">
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="mb-4 text-center font-mono text-3xl font-bold md:text-4xl">Pricing</h1>
          <p className="mx-auto mb-12 max-w-xl text-center text-muted">
            Start free. Scale as you grow. No surprise bills — ever.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`flex flex-col rounded-lg border p-6 ${
                  t.highlight ? "border-green bg-green/5" : "border-border bg-surface"
                }`}
              >
                <h2 className="mb-1 font-mono text-sm font-semibold text-muted">{t.name}</h2>
                <div className="mb-1 font-mono text-4xl font-bold">{t.price}</div>
                <p className="mb-4 text-xs text-muted">{t.period}</p>
                <p className="mb-6 text-sm text-muted">{t.desc}</p>
                <ul className="mb-8 flex-1 space-y-2">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 text-green">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`block rounded-md py-2.5 text-center text-sm font-medium transition ${
                    t.highlight
                      ? "bg-green text-background hover:brightness-110"
                      : "border border-border text-muted hover:text-foreground"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-lg border border-border bg-surface p-8">
            <h3 className="mb-4 font-mono text-lg font-bold">Frequently Asked Questions</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { q: "What counts as an agent-hour?", a: "One agent running for one hour in a sandbox. Paused sandboxes don't count." },
                { q: "Can I set a spending limit?", a: "Yes. Set per-agent and per-account cost caps in your dashboard settings. We'll pause agents before exceeding limits." },
                { q: "What happens when I exceed the free tier?", a: "Your agents will pause. Upgrade to usage-based pricing to continue, or wait until next month's reset." },
                { q: "Do you support GPU workloads?", a: "Yes. Usage-Based and Team plans support NVIDIA A10G and T4 GPUs. GPU time is billed at $0.10/minute." },
              ].map((faq) => (
                <div key={faq.q}>
                  <h4 className="mb-1 text-sm font-semibold">{faq.q}</h4>
                  <p className="text-sm text-muted">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
