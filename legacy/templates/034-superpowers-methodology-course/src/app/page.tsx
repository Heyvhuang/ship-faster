"use client";

import { useState } from "react";
import Link from "next/link";

const modules = [
  {
    num: "01",
    title: "Foundations of Agentic AI Development",
    desc: "Understand the superpowers methodology, its core principles, and why structured agentic workflows outperform ad-hoc prompting.",
    duration: "45 min",
  },
  {
    num: "02",
    title: "Setting Up Your Agentic Environment",
    desc: "Configure your development environment, install the superpowers toolkit, and establish project scaffolding for agentic workflows.",
    duration: "35 min",
  },
  {
    num: "03",
    title: "Prompt Architecture & Context Design",
    desc: "Learn to structure prompts as composable building blocks. Design context windows that maximize agent effectiveness.",
    duration: "50 min",
  },
  {
    num: "04",
    title: "Multi-Agent Orchestration Patterns",
    desc: "Coordinate multiple agents across complex tasks. Implement delegation, review, and feedback loops.",
    duration: "55 min",
  },
  {
    num: "05",
    title: "Testing & Validation for AI Workflows",
    desc: "Build confidence in agentic outputs through structured validation, regression checks, and human-in-the-loop patterns.",
    duration: "40 min",
  },
  {
    num: "06",
    title: "Team Adoption Playbook",
    desc: "Roll out the methodology across your engineering org. Manage change, measure productivity gains, and handle pushback.",
    duration: "40 min",
  },
  {
    num: "07",
    title: "Advanced Patterns & Real-World Case Studies",
    desc: "Deep-dive into production patterns from teams shipping with the superpowers methodology at scale.",
    duration: "50 min",
  },
];

const faqs = [
  {
    q: "Why pay when the docs are free?",
    a: "The open-source docs explain what the methodology is. This course teaches you how to adopt it with your team — structured video walkthroughs, downloadable templates, workflow diagrams, and a private community for Q&A. Think of it as the difference between reading React docs and taking a cohort course.",
  },
  {
    q: "Is this for individual developers or teams?",
    a: "Both. Individual engineers will level up their agentic development skills. Team leads get a structured onboarding program with certificates for reporting. Team licenses are available at checkout.",
  },
  {
    q: "What if I'm already using the superpowers methodology?",
    a: "Even experienced practitioners report learning new patterns from Modules 4-7. The advanced orchestration patterns and case studies cover techniques not documented elsewhere. Plus, the community access alone is worth it for ongoing support.",
  },
  {
    q: "Do I get lifetime access?",
    a: "Yes. Pay once and get access to all current and future content, including quarterly updates as the methodology evolves. No recurring fees.",
  },
  {
    q: "Can I get a refund?",
    a: "Absolutely. We offer a 30-day money-back guarantee, no questions asked. If the course doesn't help your team ship faster with agentic AI, we'll refund you in full.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Staff Engineer, Vercel",
    text: "We onboarded 12 engineers using this course. Everyone was productive with the methodology within a week — that used to take a month of ad-hoc learning.",
  },
  {
    name: "Marcus Wright",
    role: "VP Engineering, Loom",
    text: "The multi-agent orchestration module alone saved us from building the wrong abstractions. Worth 10x the price.",
  },
  {
    name: "Priya Patel",
    role: "Tech Lead, Stripe",
    text: "Finally, a structured way to teach this to my team instead of sharing random blog posts and hoping for the best.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-mono text-sm font-bold tracking-wider text-violet-400">
            superpowers<span className="text-zinc-500">.dev</span>
          </Link>
          <div className="flex items-center gap-6">
            <a href="#modules" className="hidden text-sm text-zinc-400 hover:text-white sm:block">
              Modules
            </a>
            <a href="#pricing" className="hidden text-sm text-zinc-400 hover:text-white sm:block">
              Pricing
            </a>
            <a href="#faq" className="hidden text-sm text-zinc-400 hover:text-white sm:block">
              FAQ
            </a>
            <Link
              href="/course"
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition"
            >
              Course Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-950/40 via-zinc-950 to-zinc-950" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
            Early Access — $49 (launches at $149)
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Master the{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Superpowers
            </span>{" "}
            Methodology
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-zinc-400 sm:text-xl">
            Structured async training for engineering teams adopting agentic AI
            development. 7 modules. Templates. Community. Ship faster.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-emerald-300">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              You&apos;re on the list! Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-3">
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <button
                type="submit"
                className="rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition"
              >
                Get Early Access
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-zinc-600">
            Join 2,400+ engineers on the waitlist. No spam.
          </p>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-zinc-800 bg-zinc-900/50 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-6 text-zinc-500">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-mono text-lg font-bold text-white">60k+</span> GitHub stars
          </div>
          <div className="hidden h-4 w-px bg-zinc-700 sm:block" />
          <div className="flex items-center gap-2 text-sm">
            <span className="font-mono text-lg font-bold text-white">2,400+</span> waitlist signups
          </div>
          <div className="hidden h-4 w-px bg-zinc-700 sm:block" />
          <div className="flex items-center gap-2 text-sm">
            <span className="font-mono text-lg font-bold text-white">5h+</span> of video content
          </div>
          <div className="hidden h-4 w-px bg-zinc-700 sm:block" />
          <div className="flex items-center gap-2 text-sm">
            <span className="font-mono text-lg font-bold text-white">7</span> hands-on modules
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold">Everything you need to adopt the methodology</h2>
          <p className="mx-auto mb-16 max-w-xl text-center text-zinc-400">
            Not just videos — a complete toolkit for your team.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "▶", title: "7 Video Modules", desc: "5+ hours of structured async content covering fundamentals to advanced patterns" },
              { icon: "⬇", title: "Templates & Diagrams", desc: "Downloadable workflow diagrams, prompt templates, and team onboarding checklists" },
              { icon: "💬", title: "Private Discord", desc: "Direct access to practitioners and course authors for Q&A and peer support" },
              { icon: "📜", title: "Certificates", desc: "Completion certificates for team reporting and professional development tracking" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="scroll-mt-20 py-24 px-6 bg-zinc-900/30">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-center text-3xl font-bold">Course Modules</h2>
          <p className="mx-auto mb-16 max-w-xl text-center text-zinc-400">
            7 modules taking you from foundations to production-ready agentic workflows.
          </p>
          <div className="space-y-4">
            {modules.map((mod) => (
              <div
                key={mod.num}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-violet-500/30 transition"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-sm text-violet-400">{mod.num}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold group-hover:text-violet-300 transition">
                        {mod.title}
                      </h3>
                      <span className="hidden text-xs text-zinc-500 sm:block">{mod.duration}</span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">{mod.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-bold">What engineers are saying</h2>
          <p className="mx-auto mb-16 max-w-xl text-center text-zinc-400">
            From beta testers and early access participants.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
              >
                <p className="mb-4 text-sm text-zinc-300 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 py-24 px-6 bg-zinc-900/30">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="mb-4 text-3xl font-bold">Early Access Pricing</h2>
          <p className="mb-12 text-zinc-400">
            Lock in the lowest price before public launch.
          </p>
          <div className="rounded-2xl border border-violet-500/30 bg-zinc-900 p-8">
            <div className="mb-2 text-sm text-violet-400 font-medium">Early Bird</div>
            <div className="mb-1 flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold">$49</span>
              <span className="text-zinc-500 line-through">$149</span>
            </div>
            <p className="mb-6 text-sm text-zinc-500">per seat · lifetime access</p>
            <ul className="mb-8 space-y-3 text-left text-sm text-zinc-300">
              {[
                "All 7 video modules (5+ hours)",
                "Downloadable templates & diagrams",
                "Private Discord community access",
                "Certificate of completion",
                "Quarterly content updates",
                "30-day money-back guarantee",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition">
              Get Early Access — $49
            </button>
            <p className="mt-3 text-xs text-zinc-600">
              Team licenses (5+ seats) available at checkout
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-24 px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-center text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-zinc-400">
            Everything you need to know before enrolling.
          </p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-medium hover:text-violet-300 transition"
                >
                  {faq.q}
                  <svg
                    className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-zinc-900/30">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to level up your team?</h2>
          <p className="mb-8 text-zinc-400">
            Join 2,400+ engineers already on the waitlist. Early access closes soon.
          </p>
          <a
            href="#pricing"
            className="inline-block rounded-lg bg-violet-600 px-8 py-3 font-semibold text-white hover:bg-violet-500 transition"
          >
            Get Early Access — $49
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-mono text-xs text-zinc-500">
            superpowers.dev © 2025
          </span>
          <div className="flex gap-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
