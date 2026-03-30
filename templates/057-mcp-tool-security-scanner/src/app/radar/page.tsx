import Link from "next/link";

const trustBadges = [
  "SOC 2 Type II",
  "GDPR Compliant",
  "ISO 27001",
];

const steps = [
  {
    num: "01",
    title: "Submit MCP Tool",
    desc: "Enter a repository URL or upload the MCP tool manifest JSON for analysis.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#10b981" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 16v-8m-4 4h8M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Automated Scan",
    desc: "Our engine analyzes permissions, data flows, API surface, and manifest configuration.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#10b981" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Get Audit Report",
    desc: "Receive a compliance-ready report with risk scores, findings, and remediation guidance.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#10b981" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

const securityChecks = [
  {
    title: "Data Exfiltration Detection",
    desc: "Identifies tools that can read sensitive local files and transmit data to external endpoints. Traces data flow from input to output across tool boundaries.",
    severity: "Critical",
    color: "red",
  },
  {
    title: "Permission Boundary Analysis",
    desc: "Maps every resource the MCP tool can access — filesystem, network, environment variables, system commands — and flags over-permissioned tools.",
    severity: "High",
    color: "orange",
  },
  {
    title: "Manifest Validation",
    desc: "Checks MCP tool JSON manifests for misconfigurations, missing security fields, overly broad permission scopes, and undocumented capabilities.",
    severity: "High",
    color: "orange",
  },
  {
    title: "Supply Chain Risk",
    desc: "Analyzes dependency trees for known vulnerabilities, unsigned packages, and injection vectors in MCP tool installations.",
    severity: "Medium",
    color: "yellow",
  },
  {
    title: "Prompt Injection Surface",
    desc: "Detects vectors where untrusted input could manipulate tool behavior, including indirect prompt injection through tool outputs.",
    severity: "Medium",
    color: "yellow",
  },
  {
    title: "Credential Exposure",
    desc: "Scans for hardcoded secrets, API keys in environment variable access patterns, and unsafe credential storage in MCP tool implementations.",
    severity: "Critical",
    color: "red",
  },
];

const caseStudies = [
  {
    tool: "filesystem-mcp-server",
    findings: 4,
    critical: 1,
    high: 2,
    summary:
      "Unrestricted filesystem access allowed reading /etc/passwd and ~/.ssh directories. No sandboxing or path restrictions enforced.",
  },
  {
    tool: "database-query-tool",
    findings: 6,
    critical: 2,
    high: 3,
    summary:
      "SQL injection via unsanitized user input. Tool could exfiltrate entire database contents through crafted MCP tool calls.",
  },
  {
    tool: "web-scraper-mcp",
    findings: 3,
    critical: 0,
    high: 2,
    summary:
      "SSRF vulnerability enabling internal network scanning. Fetched content sent to external logging endpoint without user consent.",
  },
];

const severityColor: Record<string, string> = {
  red: "bg-red-500/10 text-red-400 border-red-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

export default function RadarHome() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/3 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400"
              >
                <svg className="mr-1.5 h-3 w-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {badge}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Security Scanning for
            <br />
            <span className="text-emerald-400">MCP Tools</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
            Pre-deployment security audits for Model Context Protocol integrations.
            Detect data exfiltration, permission boundary violations, and misconfigurations
            before third-party MCP tools go live.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/radar/scanner"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-all"
            >
              Scan an MCP Tool
            </Link>
            <Link
              href="/radar/docs"
              className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 transition-all"
            >
              View API Docs
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">2,847</span>
              <span>tools scanned</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">412</span>
              <span>critical findings</span>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-2xl font-bold text-white">98%</span>
              <span>detection rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-white/5 bg-[#060a14]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-emerald-400 mb-2">How It Works</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Three-step audit flow</h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              From submission to compliance-ready report in under 5 minutes.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="group relative rounded-xl border border-white/5 bg-white/[0.02] p-8 hover:border-emerald-500/20 transition-colors"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono text-slate-600">STEP {step.num}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Framework */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-emerald-400 mb-2">Security Framework</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Comprehensive MCP threat coverage
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Purpose-built checks for the unique attack surface of Model Context Protocol tools.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {securityChecks.map((check) => (
              <div
                key={check.title}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${severityColor[check.color]}`}>
                    {check.severity}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{check.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{check.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="border-t border-white/5 bg-[#060a14]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-emerald-400 mb-2">Real Findings</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Sample audit results
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Real security issues discovered in popular MCP tool implementations.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <div
                key={cs.tool}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <code className="rounded-md bg-white/5 px-2 py-1 text-sm text-emerald-400 font-mono">
                    {cs.tool}
                  </code>
                </div>
                <div className="flex gap-3 mb-4">
                  <span className="rounded-md bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-xs text-red-400">
                    {cs.critical} Critical
                  </span>
                  <span className="rounded-md bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 text-xs text-orange-400">
                    {cs.high} High
                  </span>
                  <span className="rounded-md bg-slate-500/10 border border-slate-500/20 px-2 py-0.5 text-xs text-slate-400">
                    {cs.findings} Total
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{cs.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-emerald-400 mb-2">Pricing</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Pay per scan or subscribe
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              { name: "Single Scan", price: "$49", period: "per scan", features: ["1 MCP tool audit", "Risk report PDF", "Remediation guidance", "24h email support"] },
              { name: "Team", price: "$299", period: "per month", features: ["25 scans / month", "CI/CD integration", "Dashboard access", "Priority support", "API access"], popular: true },
              { name: "Enterprise", price: "Custom", period: "annual", features: ["Unlimited scans", "Continuous monitoring", "Custom policies", "Dedicated CSM", "SSO & SAML", "SLA guarantee"] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 ${
                  plan.popular
                    ? "border-emerald-500/30 bg-emerald-500/5 relative"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-medium text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-slate-500 ml-2">/{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                      <svg className="h-4 w-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === "Enterprise" ? "/radar#contact" : "/radar/scanner"}
                  className={`block w-full rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                    plan.popular
                      ? "bg-emerald-600 text-white hover:bg-emerald-500"
                      : "border border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Demo Request */}
      <section id="contact" className="border-t border-white/5 bg-[#060a14]">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-emerald-400 mb-2">Contact</p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Request a demo
            </h2>
            <p className="mt-4 text-slate-400">
              See MCP Radar in action with a guided walkthrough of your MCP security posture.
            </p>
          </div>
          <form className="space-y-4" onSubmit={undefined}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              />
              <input
                type="email"
                placeholder="Work Email"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              />
            </div>
            <input
              type="text"
              placeholder="Company"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
            />
            <select className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50">
              <option value="">How many MCP tools do you deploy?</option>
              <option>1-5</option>
              <option>6-20</option>
              <option>21-50</option>
              <option>50+</option>
            </select>
            <textarea
              rows={4}
              placeholder="Tell us about your MCP security needs..."
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 resize-none"
            />
            <button
              type="button"
              className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              Request Demo
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
