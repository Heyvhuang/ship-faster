const plans = [
  {
    name: "Starter Audit",
    price: "$2,500",
    description: "For single-agent deployments on one messaging platform.",
    features: [
      "1 AI agent assessment",
      "1 messaging platform",
      "URL preview exploitation testing",
      "Vulnerability report with PoC",
      "30-minute debrief call",
    ],
    cta: "Book Starter Audit",
    highlighted: false,
  },
  {
    name: "Professional Audit",
    price: "$7,500",
    description: "For multi-agent or multi-platform deployments.",
    features: [
      "Up to 5 AI agents",
      "All messaging platforms",
      "Custom exploit development",
      "Full vulnerability report with CVSS",
      "Remediation code examples",
      "60-minute debrief + Q&A",
      "30-day retest included",
    ],
    cta: "Book Professional Audit",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale agent deployments and ongoing monitoring.",
    features: [
      "Unlimited AI agents",
      "All platforms + custom integrations",
      "Red team engagement",
      "Executive summary report",
      "Architecture review",
      "Remediation implementation support",
      "Quarterly retest & monitoring",
      "Dedicated security engineer",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Fixed-Price Audit Packages
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Transparent pricing based on agent complexity. No hourly billing, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-8 flex flex-col ${
                plan.highlighted
                  ? "border-2 border-red-accent bg-white shadow-xl"
                  : "border border-slate-200 bg-white"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold text-white bg-red-accent rounded-full">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-sm text-slate-500">/ audit</span>}
                </div>
                <p className="mt-3 text-sm text-slate-600">{plan.description}</p>
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-red-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 block text-center py-3 px-6 rounded-lg font-semibold text-sm transition-colors ${
                  plan.highlighted
                    ? "bg-red-accent text-white hover:bg-red-dark"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
