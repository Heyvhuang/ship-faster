import Link from "next/link";
import Nav from "@/components/Nav";

const stats = [
  { value: "40%", label: "Faster Code Generation" },
  { value: "2.3x", label: "Prompt Success Rate" },
  { value: "31 min", label: "Saved Per Dev Per Day" },
  { value: "500+", label: "Teams Optimized" },
];

const features = [
  {
    icon: "chart",
    title: "Prompt Pattern Analysis",
    description:
      "Track and score prompt efficiency across your entire team. Identify who's getting the best results and why.",
  },
  {
    icon: "clock",
    title: "Before/After Tracking",
    description:
      "Measure code generation time before and after optimization. Show real ROI numbers to leadership.",
  },
  {
    icon: "template",
    title: "Optimized Templates",
    description:
      "Curated prompt templates for Django models, Flask routes, API endpoints, tests, and more.",
  },
  {
    icon: "team",
    title: "Team Dashboard",
    description:
      "See prompt usage patterns, success rates, and bottlenecks across your development team in real time.",
  },
  {
    icon: "ide",
    title: "IDE Integration",
    description:
      "Capture prompt data automatically from VS Code, PyCharm, and Cursor. Zero friction for developers.",
  },
  {
    icon: "ai",
    title: "AI Recommendations",
    description:
      "Get personalized suggestions to improve prompt quality based on your team's specific coding patterns.",
  },
];

const testimonials = [
  {
    quote:
      "We cut our prompt iteration time by 45%. The template library alone saved our Django team hours every week.",
    name: "Sarah Chen",
    role: "Engineering Manager, Datawise",
  },
  {
    quote:
      "Finally, a tool that lets me justify our AI tooling budget with real numbers. The ROI dashboard is a game-changer.",
    name: "Marcus Johnson",
    role: "VP of Engineering, ScaleAPI",
  },
  {
    quote:
      "Our junior devs went from struggling with prompts to outperforming seniors in code generation speed within 2 weeks.",
    name: "Priya Patel",
    role: "Tech Lead, FlowStack",
  },
];

const steps = [
  {
    num: "01",
    title: "Connect Your Tools",
    desc: "Link your IDE, GitHub, and AI coding tools. Setup takes under 5 minutes.",
  },
  {
    num: "02",
    title: "Analyze Patterns",
    desc: "We scan 2 weeks of prompt history and code generation activity across your team.",
  },
  {
    num: "03",
    title: "Get Recommendations",
    desc: "Receive tailored prompt templates and workflow optimizations ranked by impact.",
  },
  {
    num: "04",
    title: "Track Improvements",
    desc: "Monitor real-time productivity gains and share ROI reports with stakeholders.",
  },
];

function IconFor({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    chart: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13h4v8H3zm7-5h4v13h-4zm7-5h4v18h-4z" />
      </svg>
    ),
    clock: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 6v6l4 2" />
      </svg>
    ),
    template: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm10 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    team: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    ide: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    ai: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  };
  return <>{icons[name]}</>;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
          Now analyzing 12,000+ prompts daily
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
          Stop guessing.{" "}
          <span className="text-accent">Start measuring</span> your AI coding
          workflow.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto">
          PromptFlow analyzes your team&apos;s LLM prompting patterns and
          delivers data-driven optimizations for faster, more accurate Python
          code generation.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base w-full sm:w-auto"
          >
            Start Free Audit
          </Link>
          <Link
            href="/recommendations"
            className="border border-card-border text-foreground hover:bg-card font-semibold px-8 py-3 rounded-lg transition-colors text-base w-full sm:w-auto"
          >
            View Templates
          </Link>
        </div>

        {/* Terminal Preview */}
        <div className="mt-16 max-w-3xl mx-auto bg-card border border-card-border rounded-xl p-6 sm:p-8 text-left">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-red" />
            <span className="w-3 h-3 rounded-full bg-yellow" />
            <span className="w-3 h-3 rounded-full bg-green" />
            <span className="ml-2 text-sm text-muted font-mono">
              promptflow analyze --team acme
            </span>
          </div>
          <div className="font-mono text-sm space-y-2 text-muted">
            <p>
              <span className="text-green">$</span> Scanning 2,847 prompts
              across 8 team members...
            </p>
            <p>
              <span className="text-green">$</span> Analyzing code generation
              patterns...
            </p>
            <p>
              <span className="text-yellow">!</span> Found 12 inefficient
              prompt patterns
            </p>
            <p>
              <span className="text-green">$</span> Generating optimization
              recommendations...
            </p>
            <p className="text-foreground pt-2">
              Efficiency Score:{" "}
              <span className="text-yellow font-bold">62/100</span> → Potential:{" "}
              <span className="text-green font-bold">91/100</span>
            </p>
            <p className="text-foreground">
              Estimated time savings:{" "}
              <span className="text-green font-bold">4.1 hours/dev/week</span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-card-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-card border border-card-border rounded-xl p-6"
            >
              <div className="text-accent font-mono text-sm font-bold mb-3">
                {s.num}
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">
          Everything You Need to Optimize
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12">
          Purpose-built for Python development teams using AI coding assistants.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-card border border-card-border rounded-xl p-6 hover:border-accent/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                <IconFor name={f.icon} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card/50 border-y border-card-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by Python Teams
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card border border-card-border rounded-xl p-6"
              >
                <p className="text-sm text-muted mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
        <p className="text-muted text-center max-w-xl mx-auto mb-12">
          Start with a free audit. Upgrade when you see the results.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: "Starter",
              price: "Free",
              desc: "For individual developers",
              features: [
                "Personal prompt analysis",
                "5 optimized templates",
                "Weekly efficiency report",
                "VS Code integration",
              ],
              cta: "Start Free",
              highlighted: false,
            },
            {
              name: "Team",
              price: "$49",
              period: "/dev/month",
              desc: "For development teams",
              features: [
                "Team-wide prompt analysis",
                "Unlimited templates",
                "Real-time dashboard",
                "All IDE integrations",
                "Priority support",
              ],
              cta: "Start Free Trial",
              highlighted: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              desc: "For large organizations",
              features: [
                "Everything in Team",
                "SSO & SAML",
                "Custom integrations",
                "Dedicated success manager",
                "SLA guarantee",
              ],
              cta: "Contact Sales",
              highlighted: false,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-6 border ${
                plan.highlighted
                  ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                  : "border-card-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <div className="text-accent text-xs font-semibold mb-2 uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="font-bold text-xl">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-muted">{plan.period}</span>
                )}
              </div>
              <p className="text-sm text-muted mt-1">{plan.desc}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-4 h-4 text-green shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className={`mt-6 block text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  plan.highlighted
                    ? "bg-accent hover:bg-accent-hover text-white"
                    : "border border-card-border hover:bg-card text-foreground"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to optimize your team&apos;s AI workflow?
        </h2>
        <p className="text-muted text-lg max-w-xl mx-auto mb-8">
          Get your free prompt efficiency audit in under 5 minutes.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Start Free Audit
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-card-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-accent">{">"}_</span> PromptFlow
          </div>
          <div className="text-sm text-muted">
            &copy; 2026 PromptFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
