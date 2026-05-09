import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
        </svg>
      </div>
      <span className="font-mono font-bold text-lg text-foreground">ContextLens</span>
    </div>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-sm text-muted hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/debugger" className="text-sm font-medium bg-accent hover:bg-accent/80 text-white px-4 py-1.5 rounded-md transition-colors">
            Open Debugger
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSegment({ label, tokens, color, width }: { label: string; tokens: string; color: string; width: string }) {
  return (
    <div className="group relative" style={{ width }}>
      <div className="h-10 rounded-sm transition-all group-hover:h-12" style={{ backgroundColor: color, opacity: 0.85 }} />
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-2 border border-border rounded px-2 py-1 text-xs font-mono whitespace-nowrap z-10">
        {label}: {tokens}
      </div>
    </div>
  );
}

function TokenMeter({ percent }: { percent: number }) {
  const color = percent > 75 ? "bg-red" : percent > 50 ? "bg-yellow" : "bg-green";
  return (
    <div className="w-full max-w-xs">
      <div className="flex justify-between text-xs font-mono mb-1">
        <span className="text-muted">Token Usage</span>
        <span className={percent > 75 ? "text-red" : percent > 50 ? "text-yellow" : "text-green"}>{percent}%</span>
      </div>
      <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-3 py-1 mb-6 text-xs font-mono text-muted">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            Now in public beta
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            See inside your agent&apos;s<br />
            <span className="text-accent">context window</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
            Visual debugger for AI agent developers. Inspect context segments, track token usage, and identify memory bottlenecks before they break your agent.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/debugger" className="bg-accent hover:bg-accent/80 text-white font-medium px-6 py-3 rounded-lg transition-colors text-sm">
              Try the Debugger →
            </Link>
            <Link href="/pricing" className="border border-border hover:border-muted text-foreground px-6 py-3 rounded-lg transition-colors text-sm">
              View Pricing
            </Link>
          </div>

          {/* Visual demo */}
          <div className="bg-surface border border-border rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-sm text-muted">Customer Support Agent</span>
              <TokenMeter percent={77} />
            </div>
            <div className="flex gap-1 items-end">
              <HeroSegment label="System Prompt" tokens="4,200" color="#58a6ff" width="6%" />
              <HeroSegment label="Tools" tokens="12,800" color="#bc8cff" width="14%" />
              <HeroSegment label="Conversation" tokens="62,400" color="#d29922" width="52%" />
              <HeroSegment label="Memories" tokens="8,900" color="#3fb950" width="10%" />
              <HeroSegment label="RAG Docs" tokens="7,200" color="#d18616" width="9%" />
              <HeroSegment label="Results" tokens="2,920" color="#f85149" width="4%" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono">
              <span className="text-red">⚠</span>
              <span className="text-muted">Conversation history consuming 63.4% of total context</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Built for agent developers</h2>
          <p className="text-muted text-center mb-14 max-w-xl mx-auto">Everything you need to understand and optimize your agent&apos;s context window.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Segment Visualizer", desc: "Color-coded breakdown of system prompts, tools, conversation history, memories, and RAG documents.", icon: "◧" },
              { title: "Token Counter", desc: "Real-time token counts with percentage of max window. Supports GPT-4, Claude, and custom models.", icon: "▥" },
              { title: "Bottleneck Alerts", desc: "Automatic detection when segments approach limits, with actionable optimization suggestions.", icon: "△" },
              { title: "Prompt Inspector", desc: "Deep-dive into system prompts with length analysis, section breakdown, and compression hints.", icon: "⊞" },
              { title: "JSON Export", desc: "Export full context snapshots for sharing, version control, or automated analysis.", icon: "⇥" },
              { title: "Session Comparison", desc: "Compare context usage across sessions to identify regressions and optimization wins.", icon: "⇔" },
            ].map((f) => (
              <div key={f.title} className="bg-surface border border-border rounded-lg p-5 hover:border-accent/40 transition-colors">
                <div className="text-2xl mb-3 text-accent">{f.icon}</div>
                <h3 className="font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14">How it works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Paste or Connect", desc: "Paste an API response payload or connect via API key" },
              { step: "2", title: "Parse & Visualize", desc: "Context is parsed into color-coded segments with token counts" },
              { step: "3", title: "Identify Bloat", desc: "See which segments are consuming the most tokens" },
              { step: "4", title: "Optimize", desc: "Export, modify, and re-test your optimized context" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-full border-2 border-accent text-accent font-mono font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="font-semibold mb-1 text-foreground">{s.title}</h3>
                <p className="text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Trusted by agent builders</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Finally I can see why my agent loses context after 20 turns. Conversation history was eating 70% of my window.", name: "Sarah Chen", role: "ML Engineer @ Vercel" },
              { quote: "ContextLens saved us hours of debugging. We found 3 duplicate memory entries that were wasting 8K tokens.", name: "Marcus Rivera", role: "Founder, AgentOps" },
              { quote: "The segment visualizer is a game-changer. I optimized my tool definitions and got 40% more conversation room.", name: "Priya Sharma", role: "AI Dev @ Stripe" },
            ].map((t) => (
              <div key={t.name} className="bg-surface border border-border rounded-lg p-5 text-left">
                <p className="text-sm text-foreground mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Start debugging your agent&apos;s context</h2>
          <p className="text-muted mb-8">Free for solo developers. No credit card required.</p>
          <Link href="/debugger" className="inline-block bg-accent hover:bg-accent/80 text-white font-medium px-8 py-3 rounded-lg transition-colors">
            Open Debugger →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <Logo />
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/debugger" className="hover:text-foreground transition-colors">Debugger</Link>
            <span>Docs</span>
            <span>GitHub</span>
          </div>
          <span>© 2026 ContextLens. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
