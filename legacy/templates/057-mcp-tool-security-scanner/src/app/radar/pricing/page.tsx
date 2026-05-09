import Link from "next/link";

const plans = [
  {
    name: "Single Scan",
    price: "$49",
    period: "per scan",
    desc: "One-time security audit for a single MCP tool.",
    features: [
      "Full security scan of 1 MCP tool",
      "Compliance-ready PDF report",
      "Severity-rated findings",
      "Remediation guidance",
      "24-hour email support",
    ],
    cta: "Run a Scan",
    href: "/radar/scanner",
  },
  {
    name: "Team",
    price: "$299",
    period: "per month",
    desc: "For teams managing multiple MCP integrations.",
    features: [
      "25 scans per month",
      "CI/CD pipeline integration",
      "Team dashboard with history",
      "API access (REST + webhooks)",
      "Priority support (4hr SLA)",
      "Custom scan policies",
      "Slack/Teams notifications",
    ],
    cta: "Start Free Trial",
    href: "/radar/scanner",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual contract",
    desc: "For organizations with strict compliance requirements.",
    features: [
      "Unlimited scans",
      "Continuous monitoring & alerting",
      "Custom security policies",
      "Dedicated customer success manager",
      "SSO & SAML integration",
      "SLA with 99.9% uptime guarantee",
      "On-premise deployment option",
      "SOC 2 audit artifact export",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    href: "/radar#contact",
  },
];

const faqs = [
  {
    q: "What is an MCP tool scan?",
    a: "A scan analyzes an MCP tool's manifest, permissions, data flows, dependencies, and source code to identify security vulnerabilities and misconfigurations before deployment.",
  },
  {
    q: "How long does a scan take?",
    a: "Most scans complete in under 5 minutes. Complex tools with large dependency trees may take up to 15 minutes.",
  },
  {
    q: "Can I integrate scans into my CI/CD pipeline?",
    a: "Yes. Team and Enterprise plans include a REST API and webhook support. Add a scan step to your pipeline to block deployments that don't pass your security threshold.",
  },
  {
    q: "What compliance frameworks do you support?",
    a: "Our reports map findings to SOC 2, ISO 27001, and NIST CSF controls. Enterprise customers can configure custom compliance mappings.",
  },
  {
    q: "Do you store the MCP tool source code?",
    a: "No. We analyze tools in isolated ephemeral environments. Source code is never persisted after the scan completes.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-center mb-16">
        <p className="text-sm font-medium text-emerald-400 mb-2">Pricing</p>
        <h1 className="text-3xl font-bold text-white md:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
          Pay per scan or subscribe for continuous security monitoring of your MCP tool portfolio.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-20">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-8 flex flex-col ${
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
            <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
            <p className="text-sm text-slate-400 mt-1 mb-6">{plan.desc}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="text-sm text-slate-500 ml-2">/{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                  <svg className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={`block w-full rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
                plan.popular
                  ? "bg-emerald-600 text-white hover:bg-emerald-500"
                  : "border border-white/10 text-slate-300 hover:bg-white/5"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-base font-semibold text-white mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
