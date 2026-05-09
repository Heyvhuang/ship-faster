import Link from "next/link";
import { CommitGrid } from "@/components/CommitGrid";

const stats = [
  { label: "Teams Analyzed", value: "1,200+" },
  { label: "Commits Processed", value: "14M+" },
  { label: "Skill Gaps Found", value: "8,400+" },
];

const logos = ["Acme Corp", "Beacon AI", "Crux Labs", "DataForge", "Elevate"];

const features = [
  {
    title: "GitHub Commit Analysis",
    desc: "Analyze 6 months of commit history across your entire org. We break down languages, frameworks, and patterns your team actually uses.",
    icon: (
      <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Trending Language Comparison",
    desc: "We track adoption rates across GitHub and Stack Overflow to show where the market is heading — and where your team stands.",
    icon: (
      <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: "Hiring Recommendations",
    desc: "Get prioritized recommendations: who to hire, what to train, and which skills will matter most in the next 12 months.",
    icon: (
      <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 text-center">
          <div className="animate-fade-in">
            <p className="mb-4 inline-block rounded-full border border-green-800 bg-green-950 px-3 py-1 text-xs font-medium text-green-400">
              Built for Series A engineering teams
            </p>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Turn GitHub commits into{" "}
              <span className="text-green-400">hiring roadmaps</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
              Compare your team&apos;s actual code against trending tech stacks.
              Identify skill gaps and make data-driven hiring decisions as you
              scale from 5 to 50 engineers.
            </p>
          </div>

          {/* CTA input */}
          <div className="animate-fade-in-delay mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="github.com/your-org"
              className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              readOnly
            />
            <Link
              href="/results"
              className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-500"
            >
              Analyze Team
            </Link>
          </div>
          <p className="mt-3 text-xs text-gray-600">
            Free analysis for public repos. No credit card required.
          </p>

          {/* Commit grid decoration */}
          <div className="mt-14 flex justify-center opacity-60">
            <CommitGrid />
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-y border-gray-800 bg-[#010409]">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-gray-500">
            Trusted by scaling engineering teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {logos.map((name) => (
              <span key={name} className="text-sm font-semibold text-gray-600">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-green-400">{s.value}</p>
              <p className="mt-1 text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          How it works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800">
                {f.icon}
              </div>
              <p className="mb-1 text-xs font-medium text-green-400">
                Step {i + 1}
              </p>
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 bg-[#010409]">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold">
            Ready to find your team&apos;s skill gaps?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Get a comprehensive analysis in minutes. See exactly where your team
            stands against market trends.
          </p>
          <Link
            href="/results"
            className="mt-8 inline-block rounded-lg bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-500"
          >
            Try Free Analysis
          </Link>
        </div>
      </section>
    </>
  );
}
