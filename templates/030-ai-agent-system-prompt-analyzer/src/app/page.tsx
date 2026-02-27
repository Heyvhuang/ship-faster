"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SAMPLE_PROMPT = `You are a helpful customer support agent for Acme Corp. You must:
1. Always be polite and professional
2. Never reveal internal pricing or discount structures
3. If unsure, escalate to a human agent
4. Do not discuss competitors
5. Respond in the customer's language`;

const PATTERNS = [
  { name: "Role-Playing", icon: "🎭", desc: "Agent persona & identity" },
  { name: "Chain-of-Thought", icon: "🔗", desc: "Reasoning structure" },
  { name: "Constraints", icon: "🛡️", desc: "Behavioral boundaries" },
  { name: "Safety", icon: "🔒", desc: "Security guardrails" },
  { name: "Tool-Use", icon: "🔧", desc: "Function calling patterns" },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "AI Lead, TechFlow",
    text: "PromptShield caught 3 critical injection vectors in our production agent prompt that we completely missed during review.",
  },
  {
    name: "Marcus Rivera",
    role: "Security Engineer, SafeAI",
    text: "Finally a tool that treats system prompts as attack surface. The security scan alone is worth 10x the price.",
  },
  {
    name: "Aisha Patel",
    role: "Founder, AgentStack",
    text: "We run every prompt through PromptShield before deployment. Our prompt quality score went from 62 to 91 in two weeks.",
  },
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "",
    desc: "Basic pattern analysis",
    features: [
      "5 analyses per day",
      "Pattern detection (5 types)",
      "Basic effectiveness score",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    desc: "Full security reports",
    features: [
      "Unlimited analyses",
      "Security vulnerability reports",
      "Injection risk scoring",
      "Improvement suggestions",
      "Exportable PDF reports",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    desc: "Advanced edge-case testing",
    features: [
      "Everything in Pro",
      "Edge-case stress testing",
      "Custom rule sets",
      "API access",
      "Team collaboration",
      "Dedicated support",
      "SSO & audit logs",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const router = useRouter();

  const handleAnalyze = () => {
    if (!prompt.trim()) return;
    setAnalyzing(true);
    sessionStorage.setItem("analyzedPrompt", prompt);
    setTimeout(() => {
      router.push("/analyze");
    }, 1200);
  };

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-card-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center">
              <span className="text-accent-green font-bold font-mono text-sm">PS</span>
            </div>
            <span className="font-semibold text-lg">PromptShield</span>
          </div>
          <div className="hidden sm:flex items-center gap-8 text-sm text-muted">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
            <a href="#testimonials" className="hover:text-foreground transition">Testimonials</a>
          </div>
          <button className="text-sm bg-accent-green/10 text-accent-green px-4 py-2 rounded-lg hover:bg-accent-green/20 transition cursor-pointer">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-accent-green/10 text-accent-green text-xs font-medium mb-6">
          Trusted by 2,400+ AI developers
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
          Analyze Your System Prompt
          <br />
          <span className="text-accent-green">in Seconds</span>
        </h1>
        <p className="text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10">
          Detect security vulnerabilities, score effectiveness, and find edge case weaknesses in your AI agent system prompts.
        </p>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-card-border rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 text-xs text-muted font-mono">
              <span className="w-3 h-3 rounded-full bg-accent-red/60" />
              <span className="w-3 h-3 rounded-full bg-accent-yellow/60" />
              <span className="w-3 h-3 rounded-full bg-accent-green/60" />
              <span className="ml-2">system_prompt.txt</span>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Paste your system prompt here..."
              rows={8}
              className="w-full bg-background border border-card-border rounded-lg p-4 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent-green/50 placeholder:text-muted/50"
            />
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3">
              <button
                onClick={() => setPrompt(SAMPLE_PROMPT)}
                className="text-xs text-muted hover:text-foreground transition cursor-pointer"
              >
                Or try a sample prompt →
              </button>
              <button
                onClick={handleAnalyze}
                disabled={!prompt.trim() || analyzing}
                className="w-full sm:w-auto bg-accent-green text-background font-semibold px-8 py-3 rounded-lg hover:bg-accent-green/90 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {analyzing ? (
                  <span className="flex items-center gap-2 justify-center">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Prompt"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern Detection */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">5 Pattern Detection Categories</h2>
        <p className="text-muted text-center mb-10 max-w-xl mx-auto">
          We scan your prompt against established patterns used in production AI agents worldwide.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {PATTERNS.map((p) => (
            <div key={p.name} className="bg-card border border-card-border rounded-xl p-5 text-center hover:border-accent-green/30 transition">
              <div className="text-3xl mb-3">{p.icon}</div>
              <div className="font-semibold text-sm mb-1">{p.name}</div>
              <div className="text-xs text-muted">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Paste Your Prompt", desc: "Drop your system prompt into the analyzer. We support any format or length." },
            { step: "02", title: "Instant Analysis", desc: "Our engine runs pattern detection, security scanning, and effectiveness scoring." },
            { step: "03", title: "Get Your Report", desc: "Receive scores, vulnerability alerts, and rewritten improvement suggestions." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-accent-green font-mono text-sm mb-2">{item.step}</div>
              <div className="font-semibold mb-2">{item.title}</div>
              <div className="text-sm text-muted">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">Simple, Transparent Pricing</h2>
        <p className="text-muted text-center mb-10">Start free. Upgrade when you need deeper analysis.</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-6 border ${
                plan.highlighted
                  ? "bg-accent-green/5 border-accent-green/40 ring-1 ring-accent-green/20"
                  : "bg-card border-card-border"
              }`}
            >
              {plan.highlighted && <div className="text-accent-green text-xs font-medium mb-3">Most Popular</div>}
              <div className="text-lg font-semibold">{plan.name}</div>
              <div className="mt-2 mb-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted text-sm">{plan.period}</span>
              </div>
              <div className="text-sm text-muted mb-6">{plan.desc}</div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="text-accent-green mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                  plan.highlighted
                    ? "bg-accent-green text-background hover:bg-accent-green/90"
                    : "bg-card-border text-foreground hover:bg-card-border/80"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Trusted by AI Teams</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-card border border-card-border rounded-xl p-6">
              <p className="text-sm text-muted mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-card-border mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <div className="w-6 h-6 rounded bg-accent-green/20 flex items-center justify-center">
              <span className="text-accent-green font-bold font-mono text-xs">PS</span>
            </div>
            <span>PromptShield</span>
            <span className="ml-2">&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted">
            <a href="#" className="hover:text-foreground transition">Privacy</a>
            <a href="#" className="hover:text-foreground transition">Terms</a>
            <a href="https://github.com" className="hover:text-foreground transition" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
