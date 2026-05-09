"use client";

import { useState } from "react";
import Link from "next/link";
import PaperCard from "@/components/PaperCard";
import { papers, testimonials, faqItems, pricingPlans } from "@/lib/data";

function HeroSection() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            50 papers ready to run
          </span>
        </div>

        <h1 className="mt-6 font-mono text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl animate-fade-in">
          Run any HuggingFace paper
          <br />
          <span className="text-emerald-400">in under 2 minutes</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 animate-fade-in-delay">
          Pre-built containers with verified dependencies. One-click JupyterLab.
          GPU included. No setup, no debugging, no wasted hours.
        </p>

        <div className="mx-auto mt-10 max-w-2xl animate-fade-in-delay-2">
          <div className="pulse-glow flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 p-2">
            <svg className="ml-2 h-5 w-5 shrink-0 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Paste a HuggingFace paper URL or search by title..."
              className="flex-1 bg-transparent px-2 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 focus:outline-none font-mono"
            />
            <button className="shrink-0 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400">
              Reproduce Now
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Verified dependencies
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            GPU included
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Browser-based IDE
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Download results
          </span>
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-amber-500/70" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/70" />
            <span className="ml-2 font-mono text-xs text-zinc-500">papercloud terminal</span>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed">
            <div className="text-zinc-500">$ papercloud reproduce https://huggingface.co/papers/llama-4-scout</div>
            <div className="mt-2 text-zinc-400">
              <span className="text-emerald-400">✓</span> Detected framework: PyTorch 2.3.1
            </div>
            <div className="text-zinc-400">
              <span className="text-emerald-400">✓</span> Resolved 47 dependencies
            </div>
            <div className="text-zinc-400">
              <span className="text-emerald-400">✓</span> Container image found (pre-built)
            </div>
            <div className="text-zinc-400">
              <span className="text-emerald-400">✓</span> Allocated GPU: NVIDIA A10G (24GB)
            </div>
            <div className="text-zinc-400">
              <span className="text-emerald-400">✓</span> JupyterLab ready at <span className="text-blue-400 underline">lab.papercloud.dev/s/abc123</span>
            </div>
            <div className="mt-2 text-emerald-400">
              Ready in 1m 42s — open in browser? [Y/n]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Paste a paper URL", desc: "Enter any HuggingFace paper URL or search our database of trending papers." },
    { num: "02", title: "Auto-detect & resolve", desc: "We detect the framework, resolve all dependencies, and match to a pre-built container." },
    { num: "03", title: "One-click reproduce", desc: "Click 'Reproduce Now' and get a browser-based JupyterLab with everything loaded." },
    { num: "04", title: "Run & download", desc: "Execute cells, validate results, and download model weights when done." },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-mono text-2xl font-bold sm:text-3xl">How it works</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.num} className="relative">
              <span className="font-mono text-3xl font-bold text-emerald-500/20">{step.num}</span>
              <h3 className="mt-2 text-sm font-semibold text-zinc-100">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-2xl font-bold sm:text-3xl">Trending papers</h2>
          <Link href="/radar/papers" className="text-sm text-emerald-400 hover:text-emerald-300">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {papers.slice(0, 6).map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="pricing">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-mono text-2xl font-bold sm:text-3xl">Simple pricing</h2>
        <p className="mt-3 text-center text-sm text-zinc-500">Pay per paper or go unlimited with a subscription.</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 ${
                plan.highlighted
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : "border-zinc-800 bg-zinc-900/50"
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-block rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                  Most Popular
                </span>
              )}
              <h3 className="font-mono text-lg font-semibold">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-zinc-500">/{plan.unit}</span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs text-zinc-300">
                    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                    : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-mono text-2xl font-bold sm:text-3xl">Researchers love it</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <p className="text-sm leading-relaxed text-zinc-300">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-100">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
                <span className="rounded-full bg-emerald-900/30 px-2 py-0.5 text-xs font-mono text-emerald-400">
                  {t.timeSaved} saved
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="faq">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-mono text-2xl font-bold sm:text-3xl">FAQ</h2>
        <div className="mt-12 space-y-6">
          {faqItems.map((item) => (
            <div key={item.question} className="border-b border-zinc-800 pb-6">
              <h3 className="text-sm font-semibold text-zinc-100">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center sm:p-12">
        <h2 className="font-mono text-2xl font-bold sm:text-3xl">
          Stop debugging environments.
          <br />
          <span className="text-emerald-400">Start reproducing papers.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-zinc-400">
          Join 2,400+ researchers who save hours every week with verified paper reproductions.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button className="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400">
            Try Free — No Card Required
          </button>
          <Link href="/radar/papers" className="text-sm text-zinc-400 hover:text-zinc-300">
            Browse papers →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function RadarPage() {
  return (
    <>
      <HeroSection />
      <DemoSection />
      <HowItWorksSection />
      <TrendingSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
