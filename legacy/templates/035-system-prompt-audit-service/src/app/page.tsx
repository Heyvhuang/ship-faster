import Link from "next/link";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-green-accent font-bold text-lg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          PromptShield
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          <Link href="#how-it-works" className="hover:text-foreground transition">How it works</Link>
          <Link href="#pricing" className="hover:text-foreground transition">Pricing</Link>
          <Link href="#case-study" className="hover:text-foreground transition">Case Study</Link>
          <Link href="/scan" className="bg-green-accent text-background px-4 py-2 rounded font-bold hover:bg-green-dim transition">
            Start Scan
          </Link>
        </div>
        <Link href="/scan" className="md:hidden bg-green-accent text-background px-4 py-2 rounded font-bold text-sm">
          Scan
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-block mb-6 px-3 py-1 border border-green-accent/30 rounded-full text-green-accent text-xs tracking-wider uppercase">
          AI Prompt Security
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Is your AI system prompt{" "}
          <span className="text-green-accent">leaking?</span>
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Scan your system prompts for security vulnerabilities, injection risks, and IP exposure.
          Get a detailed security score and remediation report in 30 seconds.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/scan"
            className="bg-green-accent text-background px-8 py-4 rounded font-bold text-lg hover:bg-green-dim transition w-full sm:w-auto"
          >
            Scan Your Prompt Now
          </Link>
          <Link
            href="#how-it-works"
            className="border border-border px-8 py-4 rounded font-bold text-lg hover:border-muted transition w-full sm:w-auto text-muted"
          >
            Learn More
          </Link>
        </div>
        <div className="mt-10 flex items-center justify-center gap-6 text-xs text-muted">
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            SSL Encrypted
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
            No data stored
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            SOC 2 Ready
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl mt-16">
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-danger/60" />
            <div className="w-3 h-3 rounded-full bg-warning/60" />
            <div className="w-3 h-3 rounded-full bg-green-accent/60" />
            <span className="ml-2 text-xs text-muted">promptshield scan --analyze</span>
          </div>
          <div className="p-6 text-sm font-mono space-y-2">
            <p className="text-muted">$ promptshield scan --input system_prompt.txt</p>
            <p className="text-green-accent">Scanning for vulnerabilities...</p>
            <p className="text-foreground">[<span className="text-danger">CRITICAL</span>] Prompt injection vector detected at line 14</p>
            <p className="text-foreground">[<span className="text-warning">WARNING</span>] Business logic exposed in lines 23-31</p>
            <p className="text-foreground">[<span className="text-warning">WARNING</span>] Extractable instructions found at line 7</p>
            <p className="text-foreground">[<span className="text-green-accent">INFO</span>] Role boundary definition: weak</p>
            <p className="mt-4 text-muted">Security Score: <span className="text-danger font-bold text-lg">34/100</span></p>
            <p className="text-muted">Found <span className="text-danger">4 vulnerabilities</span> · Report saved to ./report.pdf</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Paste Your Prompt",
      desc: "Paste your AI system prompt or upload a file. We support all major LLM formats.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="9" y="2" width="6" height="4" rx="1" />
          <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Automated Scan",
      desc: "Our engine analyzes for injection vectors, leak patterns, and IP exposure in under 30 seconds.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Get Your Report",
      desc: "Receive a detailed security score (0-100), vulnerability breakdown, and actionable fixes.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 border-t border-border">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-muted text-center mb-16 max-w-xl mx-auto">
          Three simple steps to secure your AI system prompts
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="bg-surface border border-border rounded-lg p-8 hover:border-green-accent/30 transition">
              <div className="text-green-accent mb-4">{step.icon}</div>
              <div className="text-green-accent text-xs font-bold mb-2">{step.num}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 border-t border-border">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simple Pricing</h2>
        <p className="text-muted text-center mb-16 max-w-xl mx-auto">
          Pay per scan or go unlimited with a team plan
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-surface border border-border rounded-lg p-8">
            <div className="text-sm text-muted mb-2 uppercase tracking-wider">Individual</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-muted text-sm">/scan</span>
            </div>
            <p className="text-muted text-sm mb-8">One-time audit for any system prompt</p>
            <ul className="space-y-3 text-sm mb-8">
              {["Full vulnerability scan", "Security score 0-100", "Injection risk analysis", "IP exposure detection", "PDF remediation report"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/scan" className="block text-center border border-green-accent text-green-accent px-6 py-3 rounded font-bold hover:bg-green-accent hover:text-background transition">
              Start Scan
            </Link>
          </div>
          <div className="bg-surface border-2 border-green-accent rounded-lg p-8 relative">
            <div className="absolute -top-3 right-6 bg-green-accent text-background text-xs px-3 py-1 rounded-full font-bold">
              Popular
            </div>
            <div className="text-sm text-muted mb-2 uppercase tracking-wider">Team</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold">$99</span>
              <span className="text-muted text-sm">/month</span>
            </div>
            <p className="text-muted text-sm mb-8">Unlimited scans for your entire team</p>
            <ul className="space-y-3 text-sm mb-8">
              {["Everything in Individual", "Unlimited scans", "API access for CI/CD", "Batch scanning", "Priority support", "Team dashboard"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/scan" className="block text-center bg-green-accent text-background px-6 py-3 rounded font-bold hover:bg-green-dim transition">
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section id="case-study" className="py-20 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Real Vulnerability Found</h2>
        <p className="text-muted text-center mb-12 max-w-xl mx-auto">
          A popular AI writing assistant had its entire business logic exposed
        </p>
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 border-b md:border-b-0 md:border-r border-border">
              <div className="text-danger text-xs font-bold uppercase tracking-wider mb-3">Before Scan</div>
              <div className="bg-background rounded p-4 font-mono text-sm space-y-2">
                <p className="text-muted">{"// System prompt (exposed)"}</p>
                <p><span className="text-danger">You are a writing assistant.</span></p>
                <p><span className="text-warning">Use our proprietary tone algorithm:</span></p>
                <p className="text-muted">{"  score = (clarity * 0.4) + (engagement * 0.35)"}</p>
                <p className="text-muted">{"  + (seo_density * 0.25)"}</p>
                <p><span className="text-danger">Never mention you are AI.</span></p>
                <p><span className="text-warning">Pricing: charge $0.02 per word.</span></p>
              </div>
              <div className="mt-4 text-center">
                <span className="text-danger font-bold text-2xl">Score: 18/100</span>
              </div>
            </div>
            <div className="p-8">
              <div className="text-green-accent text-xs font-bold uppercase tracking-wider mb-3">After Remediation</div>
              <div className="bg-background rounded p-4 font-mono text-sm space-y-2">
                <p className="text-muted">{"// System prompt (secured)"}</p>
                <p><span className="text-green-accent">You are a helpful writing assistant.</span></p>
                <p><span className="text-green-accent">Follow the style guide provided in</span></p>
                <p><span className="text-green-accent">the context window.</span></p>
                <p className="text-muted">{"  [Business logic moved to backend]"}</p>
                <p className="text-muted">{"  [Injection guards added]"}</p>
                <p><span className="text-green-accent">Respond only within your defined role.</span></p>
              </div>
              <div className="mt-4 text-center">
                <span className="text-green-accent font-bold text-2xl">Score: 92/100</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-surface border border-border rounded-lg p-6">
          <p className="text-sm italic text-muted">
            &ldquo;PromptShield found that our entire pricing model and proprietary algorithm were visible in our system prompt.
            A competitor could have cloned our product in hours. The fix took 10 minutes.&rdquo;
          </p>
          <p className="text-xs text-muted mt-2">— CTO, AI Writing Startup (name withheld)</p>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Secure your prompts <span className="text-green-accent">today</span>
        </h2>
        <p className="text-muted mb-8 max-w-lg mx-auto">
          Don&apos;t wait until a competitor extracts your system prompt. Scan now and fix vulnerabilities before they&apos;re exploited.
        </p>
        <Link
          href="/scan"
          className="inline-block bg-green-accent text-background px-8 py-4 rounded font-bold text-lg hover:bg-green-dim transition"
        >
          Scan Your Prompt Now — $29
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>PromptShield</span>
        </div>
        <div className="flex gap-6">
          <Link href="#pricing" className="hover:text-foreground transition">Pricing</Link>
          <Link href="/scan" className="hover:text-foreground transition">Scan</Link>
          <span>privacy@promptshield.dev</span>
        </div>
        <div>&copy; 2026 PromptShield. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <HowItWorks />
      <Pricing />
      <CaseStudy />
      <CTA />
      <Footer />
    </main>
  );
}
