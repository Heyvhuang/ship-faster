import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const steps = [
  {
    num: "1",
    title: "Connect your repo",
    desc: "Sign in with GitHub and select the repos you want TriageBot to monitor.",
  },
  {
    num: "2",
    title: "AI drafts responses",
    desc: "When a new issue or PR arrives, TriageBot analyzes context and drafts a reply.",
  },
  {
    num: "3",
    title: "Approve & post",
    desc: "Review the draft, edit if needed, and post with one click. Done in seconds.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahchen_dev",
    repo: "react-table-plus",
    stars: 340,
    text: "TriageBot saved me 5+ hours a week on issue triage. The AI drafts are surprisingly good — I approve about 80% without edits.",
  },
  {
    name: "Marcus Weber",
    handle: "@mweber_oss",
    repo: "go-cache-lib",
    stars: 210,
    text: "I used to dread opening my GitHub notifications. Now TriageBot handles the first response and I just review. Game changer.",
  },
  {
    name: "Priya Patel",
    handle: "@priya_builds",
    repo: "py-schema-validator",
    stars: 127,
    text: "The best part is it learns my communication style. After a few weeks, the drafts sound exactly like me.",
  },
];

const faqs = [
  {
    q: "How does TriageBot access my repo?",
    a: "TriageBot uses GitHub OAuth to request minimal permissions — only issue and PR read/write access. We never access your source code.",
  },
  {
    q: "What about GitHub API rate limits?",
    a: "TriageBot uses webhook events, not polling, so API usage is minimal. For repos under 500 stars, you'll never hit rate limits.",
  },
  {
    q: "Is my data private?",
    a: "Yes. We only store issue/PR metadata and your past responses to train the AI. We never share your data with third parties.",
  },
  {
    q: "Can I customize the AI's tone?",
    a: "Absolutely. TriageBot learns from your past responses automatically, and you can also set explicit tone preferences in settings.",
  },
  {
    q: "What if I don't like a draft?",
    a: "Every draft can be edited, approved, or rejected. Rejected drafts help the AI learn your preferences for future responses.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, cancel anytime with no questions asked. Your data is deleted within 30 days of cancellation.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 py-24 text-center md:py-32">
          <div className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-medium text-accent">
            Now in public beta
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Stop triaging issues.
            <br />
            <span className="text-accent">Start shipping.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            AI triage agent that drafts contextual responses to GitHub issues and PRs — so you can focus on writing code, not replies.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="rounded-md bg-accent px-6 py-3 font-medium text-black hover:bg-accent-hover transition-colors"
            >
              Connect your repo — free for 14 days
            </Link>
            <Link
              href="/#how-it-works"
              className="rounded-md border border-border px-6 py-3 font-medium text-muted hover:text-foreground hover:border-muted transition-colors"
            >
              See how it works
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted">No credit card required · Works with any public or private repo</p>

          {/* Dashboard preview */}
          <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-accent/5">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-[#f85149]" />
              <div className="h-3 w-3 rounded-full bg-[#d29922]" />
              <div className="h-3 w-3 rounded-full bg-accent" />
              <span className="ml-2 text-xs text-muted font-mono">triagebot.dev/dashboard</span>
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Today&apos;s triage queue</p>
                  <p className="text-2xl font-bold">3 items pending</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted">Avg response time</p>
                  <p className="text-2xl font-bold text-accent">12s</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { title: "TypeError in useEffect cleanup", type: "bug", status: "Draft ready" },
                  { title: "Add dark mode support", type: "feature", status: "Draft ready" },
                  { title: "Bump dependencies to latest", type: "pr", status: "Approved" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                        item.type === "bug" ? "bg-[#f85149]/20 text-[#f85149]" :
                        item.type === "feature" ? "bg-[#a371f7]/20 text-[#a371f7]" :
                        "bg-accent/20 text-accent"
                      }`}>
                        {item.type === "pr" ? "PR" : item.type}
                      </span>
                      <span className="text-sm">{item.title}</span>
                    </div>
                    <span className={`text-xs font-medium ${item.status === "Approved" ? "text-accent" : "text-[#d29922]"}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="mb-4 text-center text-3xl font-bold">How it works</h2>
            <p className="mx-auto mb-14 max-w-lg text-center text-muted">
              Three steps to automated issue triage. Set up in under 2 minutes.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.num} className="rounded-xl border border-border bg-background p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-xl font-bold text-accent">
                    {s.num}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center">
            <h2 className="mb-4 text-3xl font-bold">See it in action</h2>
            <p className="mx-auto mb-10 max-w-lg text-muted">
              Watch TriageBot draft a response to a real GitHub issue in under 15 seconds.
            </p>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-border bg-surface">
              <div className="flex aspect-video items-center justify-center bg-background">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-accent/10">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-accent">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-muted">Demo video — 2 min</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="mb-4 text-center text-3xl font-bold">Simple pricing</h2>
            <p className="mx-auto mb-14 max-w-lg text-center text-muted">
              One plan. No surprises. Cancel anytime.
            </p>
            <div className="mx-auto max-w-sm rounded-xl border border-accent bg-background p-8 text-center shadow-lg shadow-accent/10">
              <p className="text-sm font-medium text-accent">Solo Maintainer</p>
              <div className="my-4">
                <span className="text-5xl font-bold">$9</span>
                <span className="text-muted">/mo</span>
              </div>
              <ul className="mb-8 space-y-3 text-left text-sm">
                {[
                  "Up to 5 repos",
                  "Unlimited AI-drafted responses",
                  "Learns your communication style",
                  "One-click approve & post",
                  "Triage stats dashboard",
                  "Priority email support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-accent">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="block w-full rounded-md bg-accent px-6 py-3 font-medium text-black hover:bg-accent-hover transition-colors"
              >
                Start 14-day free trial
              </Link>
              <p className="mt-3 text-xs text-muted">No credit card required</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="mb-4 text-center text-3xl font-bold">Loved by maintainers</h2>
            <p className="mx-auto mb-14 max-w-lg text-center text-muted">
              Hear from open source maintainers who use TriageBot daily.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.handle} className="rounded-xl border border-border bg-surface p-6">
                  <p className="mb-4 text-sm leading-relaxed text-muted">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted">
                        {t.handle} · {t.repo} ({t.stars}★)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-border bg-surface">
          <div className="mx-auto max-w-3xl px-4 py-20">
            <h2 className="mb-4 text-center text-3xl font-bold">FAQ</h2>
            <p className="mx-auto mb-14 max-w-lg text-center text-muted">
              Common questions about TriageBot.
            </p>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border bg-background">
                  <summary className="cursor-pointer px-6 py-4 text-sm font-medium list-none flex items-center justify-between">
                    {f.q}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="shrink-0 text-muted transition-transform group-open:rotate-180"
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-4 text-sm text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to stop triaging manually?</h2>
            <p className="mx-auto mb-8 max-w-lg text-muted">
              Join hundreds of maintainers who save hours every week with TriageBot.
            </p>
            <Link
              href="/dashboard"
              className="inline-block rounded-md bg-accent px-8 py-3 font-medium text-black hover:bg-accent-hover transition-colors"
            >
              Get started for free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
