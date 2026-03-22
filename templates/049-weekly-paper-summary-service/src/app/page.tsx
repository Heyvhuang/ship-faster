import Link from "next/link";

function Nav() {
  return (
    <nav className="border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          radar<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/sample" className="text-muted hover:text-foreground transition-colors">
            Sample
          </Link>
          <Link href="/pricing" className="text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-muted hover:text-foreground transition-colors">
            About
          </Link>
          <Link
            href="/pricing"
            className="bg-foreground text-background px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-sm text-accent bg-accent-light px-3 py-1 rounded-full mb-6 font-medium">
            <span className="w-2 h-2 bg-accent rounded-full" />
            New issue every Monday
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            ML papers explained in
            <br />
            <span className="text-accent">5 minutes</span>, not 50.
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-8 max-w-lg">
            Weekly deep-dive summaries of 3 curated papers. Actionable insights,
            not just abstracts. Built for researchers who value depth over volume.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/sample"
              className="bg-foreground text-background px-6 py-3 rounded-md font-medium text-center hover:opacity-90 transition-opacity"
            >
              Read free sample →
            </Link>
            <Link
              href="/pricing"
              className="border border-border px-6 py-3 rounded-md font-medium text-center hover:bg-card-bg transition-colors"
            >
              $9/month — Subscribe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Deep analysis, not listings",
    desc: "Each paper gets a full breakdown: motivation, method, results, and what it means for your work.",
  },
  {
    title: "5-minute read time",
    desc: "Every summary is written to be understood in 5 minutes. TL;DR included for when you need it faster.",
  },
  {
    title: "Actionable insights",
    desc: "3-5 concrete takeaways per paper. What to try, what to avoid, and why it matters to your research.",
  },
  {
    title: "Code snippets included",
    desc: "When relevant, we include implementation snippets so you can go from reading to running.",
  },
  {
    title: "Curated, not aggregated",
    desc: "We read 50+ papers a week so you don't have to. Only the most impactful 3 make the cut.",
  },
  {
    title: "Reply with questions",
    desc: "Every email is a conversation. Reply with questions or suggest papers — we read everything.",
  },
];

function Features() {
  return (
    <section className="py-20 bg-card-bg border-y border-border">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-2">Why deep summaries beat paper lists</h2>
        <p className="text-muted mb-12 max-w-lg">
          The difference between skimming 20 abstracts and truly understanding 3 papers.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title}>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SamplePreview() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-2">See what you get</h2>
        <p className="text-muted mb-8">A preview from this week&apos;s issue.</p>
        <div className="border border-border rounded-lg p-6 md:p-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs bg-accent-light text-accent px-2 py-0.5 rounded font-medium">
              5 min read
            </span>
            <span className="text-xs text-muted">March 17, 2026</span>
          </div>
          <h3 className="font-mono text-lg font-bold mb-2">
            Scaling Sparse Mixture-of-Experts to 1T Parameters
          </h3>
          <p className="text-sm text-muted mb-4 italic">
            Fedus et al. — Google Brain
          </p>
          <div className="space-y-3 text-sm text-muted leading-relaxed">
            <p>
              <strong className="text-foreground">TL;DR:</strong> A new routing
              strategy for MoE models achieves GPT-4 level performance at 1/3
              the compute cost by dynamically balancing expert utilization during
              training.
            </p>
            <p>
              <strong className="text-accent">Key Insight #1:</strong> Expert
              collapse — where most tokens route to the same few experts — is the
              primary bottleneck. The proposed auxiliary loss fixes this without
              sacrificing convergence speed.
            </p>
            <p>
              <strong className="text-accent">Key Insight #2:</strong> You
              don&apos;t need more experts, you need better routing. 64 experts with
              smart routing outperforms 256 experts with naive top-2 gating.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/sample"
              className="text-sm font-medium text-accent hover:underline"
            >
              Read full summary →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCTA() {
  return (
    <section className="py-20 bg-card-bg border-y border-border">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Simple pricing</h2>
        <p className="text-muted mb-8">One plan. Cancel anytime.</p>
        <div className="inline-block border border-border rounded-lg p-8 bg-background text-left max-w-sm w-full">
          <div className="mb-6">
            <span className="text-3xl font-bold">$9</span>
            <span className="text-muted">/month</span>
          </div>
          <ul className="space-y-3 text-sm mb-8">
            {[
              "3 deep paper summaries every Monday",
              "3-5 actionable insights per paper",
              "Code snippets when relevant",
              "Reply to any email with questions",
              "Suggest papers for future issues",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/pricing"
            className="block w-full bg-foreground text-background text-center py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Start reading smarter
          </Link>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Built by a researcher, for researchers</h2>
          <p className="text-muted leading-relaxed mb-4">
            I&apos;m a machine learning researcher who got tired of spending hours skimming
            papers only to find 2-3 that actually mattered to my work.
          </p>
          <p className="text-muted leading-relaxed">
            Radar is the newsletter I wished existed — one that respects your time
            and gives you the depth you need to actually apply what you read.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span>© 2026 Radar. All rights reserved.</span>
        <div className="flex gap-6">
          <Link href="/sample" className="hover:text-foreground transition-colors">
            Sample
          </Link>
          <Link href="/pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <a href="mailto:hello@radarml.com" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Features />
        <SamplePreview />
        <PricingCTA />
        <About />
      </main>
      <Footer />
    </>
  );
}
