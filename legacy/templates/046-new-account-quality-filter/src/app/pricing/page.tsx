import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Radar",
  description: "Simple, transparent pricing. Free for small communities, $19/mo for unlimited.",
};

const faqs = [
  {
    q: "What counts as a 'check'?",
    a: "Each time Radar scores an account, that's one check. On the Free plan you get 500 checks per month. Pro is unlimited.",
  },
  {
    q: "Can I try Pro for free?",
    a: "Yes! Every new account starts with a 14-day Pro trial. No credit card required.",
  },
  {
    q: "What platforms do you support?",
    a: "Reddit, Discord, and any custom platform via our REST API. We're adding Discourse and Slack support soon.",
  },
  {
    q: "How does the shared blocklist work?",
    a: "When multiple communities flag the same account, it gets added to a shared blocklist. Pro users get access to this network-wide intelligence.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, cancel anytime from your dashboard. You'll keep Pro access until the end of your billing period.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-emerald-400">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500 text-xs text-black">R</span>
            RADAR
          </Link>
          <Link href="/dashboard" className="rounded-md bg-emerald-600 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
            Dashboard
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Simple, transparent pricing</h1>
          <p className="mt-4 text-lg text-zinc-400">Free for small communities. Scale when you&apos;re ready.</p>
        </div>

        {/* Plans */}
        <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8">
            <h3 className="text-lg font-semibold text-white">Free</h3>
            <p className="mt-1 text-sm text-zinc-400">Get started</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-zinc-500">/mo</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
              {["1 community", "500 checks/month", "Basic scoring", "7-day score history", "Email support"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="mt-8 block w-full rounded-lg border border-zinc-700 py-2.5 text-center text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors">
              Get started
            </Link>
          </div>

          <div className="rounded-xl border border-emerald-800 bg-emerald-950/20 p-8 relative">
            <span className="absolute -top-3 left-6 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-medium text-white">Popular</span>
            <h3 className="text-lg font-semibold text-white">Pro</h3>
            <p className="mt-1 text-sm text-zinc-400">For growing communities</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-white">$19</span>
              <span className="text-zinc-500">/mo per community</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
              {["Unlimited communities", "Unlimited checks", "Advanced scoring", "Post history analysis", "Shared blocklist", "Webhook integrations", "30-day history", "Priority support"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="mt-8 block w-full rounded-lg bg-emerald-600 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
              Start free trial
            </Link>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8">
            <h3 className="text-lg font-semibold text-white">Enterprise</h3>
            <p className="mt-1 text-sm text-zinc-400">Custom solutions</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-white">Custom</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
              {["Everything in Pro", "Custom scoring models", "Dedicated blocklist", "SLA guarantee", "SSO / SAML", "Dedicated support"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="mailto:sales@radarfilter.io" className="mt-8 block w-full rounded-lg border border-zinc-700 py-2.5 text-center text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors">
              Contact sales
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center">Frequently asked questions</h2>
          <div className="mt-10 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-zinc-800 pb-6">
                <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
