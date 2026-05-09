import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — SessionRecover",
  description: "Free single-session recovery. Pro plan for bulk recovery and automated backups.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Perfect for occasional recovery needs.",
    features: [
      "Single session recovery",
      "All languages supported",
      "Download recovered files as zip",
      "100% local processing",
      "Syntax highlighting preview",
    ],
    cta: "Start Recovering",
    ctaHref: "/recover",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    description: "For developers who rely on Claude Code daily.",
    features: [
      "Everything in Free",
      "Unlimited bulk recovery",
      "Automated session backups",
      "Session monitoring daemon",
      "File structure reconstruction",
      "Priority email support",
    ],
    cta: "Start 14-Day Free Trial",
    ctaHref: "/recover",
    highlight: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/mo",
    description: "For teams using Claude Code across projects.",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared recovery dashboard",
      "Team session monitoring",
      "Centralized backup storage",
      "Slack integration alerts",
      "Dedicated support",
    ],
    cta: "Contact Us",
    ctaHref: "/recover",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <h1 className="font-mono text-2xl font-bold md:text-4xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-3 text-muted">
          Start free. Upgrade when you need bulk recovery and monitoring.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg border p-6 ${
              plan.highlight
                ? "border-accent/40 bg-surface"
                : "border-border bg-surface"
            }`}
          >
            {plan.highlight && (
              <div className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                Most Popular
              </div>
            )}
            <div className="font-mono text-xs text-muted uppercase tracking-wider">
              {plan.name}
            </div>
            <div className="mt-2 font-mono text-4xl font-bold">
              {plan.price}
              {plan.period && (
                <span className="text-base font-normal text-muted">{plan.period}</span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted">{plan.description}</p>
            <ul className="mt-6 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted">
                  <span className="text-accent">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={plan.ctaHref}
              className={`mt-8 block rounded-md py-2.5 text-center text-sm font-semibold transition-colors ${
                plan.highlight
                  ? "bg-accent text-black hover:bg-accent-dim"
                  : "border border-border text-muted hover:text-foreground hover:border-muted"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="font-mono text-xl font-bold">Frequently asked</h2>
        <div className="mx-auto mt-8 max-w-2xl space-y-6 text-left">
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes. Cancel your subscription at any time with no penalties. Your Pro features remain active until the end of the billing period.",
            },
            {
              q: "Is there a refund policy?",
              a: "We offer a full refund within 14 days of your first payment if you're not satisfied.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards and debit cards via Stripe. All payments are processed securely.",
            },
            {
              q: "Do you offer annual billing?",
              a: "Yes. Annual billing is available at $15/mo (save 20%) for Pro and $39/mo for Team.",
            },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-border pb-4">
              <h3 className="font-mono text-sm font-semibold">{faq.q}</h3>
              <p className="mt-1.5 text-sm text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
