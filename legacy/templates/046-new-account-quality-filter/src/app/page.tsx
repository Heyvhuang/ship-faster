import Link from "next/link";

const liveDemo = [
  { username: "fresh_acc_2024", age: "2d", karma: 1, score: 12, status: "blocked" as const },
  { username: "community_vet", age: "4y", karma: 8420, score: 94, status: "approved" as const },
  { username: "new_but_legit", age: "14d", karma: 45, score: 61, status: "approved" as const },
  { username: "spam_king_99", age: "0d", karma: 0, score: 3, status: "blocked" as const },
  { username: "lurker_2020", age: "3y", karma: 210, score: 78, status: "approved" as const },
];

const steps = [
  {
    num: "01",
    title: "Connect API",
    desc: "Add your community with a single API call or webhook URL. Works with Reddit, Discord, and custom platforms.",
  },
  {
    num: "02",
    title: "Set Threshold",
    desc: "Configure quality score thresholds with intuitive sliders. Tune account age, karma, and posting history weights.",
  },
  {
    num: "03",
    title: "Auto-Filter",
    desc: "New submissions are scored in real-time. Low-quality accounts are blocked before they hit your feed.",
  },
];

const testimonials = [
  {
    quote: "Cut our spam by 89% in the first week. The account age scoring alone was worth it.",
    author: "Alex M.",
    role: "Moderator, r/IndieGameDev",
  },
  {
    quote: "Finally a tool built for small communities. Setup took 5 minutes and it just works.",
    author: "Sarah K.",
    role: "Admin, DevChat Discord",
  },
  {
    quote: "We were spending 3 hours a day on manual moderation. Now it's basically zero.",
    author: "James R.",
    role: "Moderator, TechForum HN",
  },
];

function ScoreBadge({ score, status }: { score: number; status: "blocked" | "approved" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        status === "blocked"
          ? "bg-red-900/50 text-red-400"
          : "bg-emerald-900/50 text-emerald-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "blocked" ? "bg-red-400" : "bg-emerald-400"
        }`}
      />
      {score}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-emerald-400">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500 text-xs text-black">R</span>
            RADAR
          </Link>
          <div className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <Link href="/docs" className="hover:text-white transition-colors">API Docs</Link>
            <Link href="/dashboard" className="rounded-md bg-emerald-600 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
              Dashboard
            </Link>
          </div>
          <Link href="/dashboard" className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white md:hidden">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950 to-zinc-950" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Now filtering 12,400+ accounts daily
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Stop spammers<br />
              <span className="text-emerald-400">before they post</span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
              Account quality scoring API for community moderators. Automatically filter low-quality submissions before they hit your feed.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard"
                className="w-full rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-500 transition-colors sm:w-auto"
              >
                Start filtering free
              </Link>
              <Link
                href="/docs"
                className="w-full rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors sm:w-auto"
              >
                View API docs
              </Link>
            </div>
          </div>

          {/* Live demo table */}
          <div className="mt-16 mx-auto max-w-2xl">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Live Demo — Recent Submissions</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Filtering active
                </span>
              </div>
              <div className="divide-y divide-zinc-800/50">
                {liveDemo.map((item) => (
                  <div key={item.username} className="flex items-center justify-between px-4 py-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-zinc-300">{item.username}</span>
                      <span className="text-xs text-zinc-500">Age: {item.age}</span>
                      <span className="text-xs text-zinc-500">Karma: {item.karma.toLocaleString()}</span>
                    </div>
                    <ScoreBadge score={item.score} status={item.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-white">How it works</h2>
          <p className="mt-3 text-center text-zinc-400">Three steps to a cleaner community</p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <span className="font-mono text-xs text-emerald-400">{step.num}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-white">Built for moderators</h2>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Account Age Scoring", desc: "Weight new accounts by days since creation. Fresh accounts get flagged automatically." },
              { title: "Karma Integration", desc: "Pull reputation scores from Reddit, Discord, and custom platforms." },
              { title: "Post History Analysis", desc: "Analyze posting patterns to detect copy-paste spam and low-effort content." },
              { title: "Custom Thresholds", desc: "Intuitive sliders to set quality score cutoffs per community." },
              { title: "Known Bad Actors", desc: "Shared blocklist of flagged accounts across the Radar network." },
              { title: "Webhook Support", desc: "Real-time notifications and automation via webhooks." },
            ].map((f) => (
              <div key={f.title} className="rounded-lg border border-zinc-800 bg-zinc-900/20 p-5">
                <h3 className="text-sm font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-white">Simple pricing</h2>
          <p className="mt-3 text-center text-zinc-400">Free for small communities. Scale when you need to.</p>
          <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8">
              <h3 className="text-lg font-semibold text-white">Free</h3>
              <p className="mt-1 text-sm text-zinc-400">For communities under 1k members</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                {["1 community", "500 checks/month", "Basic scoring", "Email support"].map((f) => (
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
                {["Unlimited communities", "Unlimited checks", "Advanced scoring + history", "Shared blocklist", "Webhook integrations", "Priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="mt-8 block w-full rounded-lg bg-emerald-600 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-white">Trusted by moderators</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.author} className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                <p className="text-sm text-zinc-300 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4">
                  <p className="text-sm font-medium text-white">{t.author}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 border-t border-zinc-800/50">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white">Ready to clean up your community?</h2>
          <p className="mt-4 text-zinc-400">Start filtering spam accounts in under 5 minutes. Free for small communities.</p>
          <Link href="/dashboard" className="mt-8 inline-block rounded-lg bg-emerald-600 px-8 py-3 text-sm font-medium text-white hover:bg-emerald-500 transition-colors">
            Get started for free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-zinc-500 sm:flex-row">
          <span className="font-mono text-emerald-400 font-bold tracking-wider">RADAR</span>
          <div className="flex gap-6">
            <Link href="/docs" className="hover:text-zinc-300 transition-colors">API Docs</Link>
            <Link href="/pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link>
            <Link href="/dashboard" className="hover:text-zinc-300 transition-colors">Dashboard</Link>
          </div>
          <span>&copy; 2026 Radar. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
