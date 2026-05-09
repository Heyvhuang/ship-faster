import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For trying it out",
    features: [
      "50 conversions",
      "All export formats",
      "Syntax highlighting",
      "No sign-up required",
    ],
    cta: "Get started",
    accent: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For individual developers",
    features: [
      "Unlimited conversions",
      "Saved document library",
      "Version history",
      "Priority support",
      "Custom themes",
    ],
    cta: "Start free trial",
    accent: true,
  },
  {
    name: "Team",
    price: "$19",
    period: "/user/month",
    description: "For teams building with agents",
    features: [
      "Everything in Pro",
      "Shared document libraries",
      "Team collaboration",
      "SSO / SAML",
      "API access",
      "Dedicated support",
    ],
    cta: "Contact sales",
    accent: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <section className="pt-20 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Simple, transparent pricing
          </h1>
          <p className="text-muted text-lg">
            Start free. Upgrade when you need more.
          </p>
        </div>
      </section>

      <section className="pb-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-xl border ${
                plan.accent
                  ? "border-accent bg-accent/5"
                  : "border-border bg-card"
              } flex flex-col`}
            >
              {plan.accent && (
                <div className="text-xs font-mono text-accent mb-3">
                  Most popular
                </div>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-sm text-muted mt-1">{plan.description}</p>
              <div className="mt-4 mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-success mt-0.5">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  plan.accent
                    ? "bg-accent hover:bg-accent-hover text-white"
                    : "bg-card border border-border text-foreground hover:bg-border"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">FAQ</h2>
          <div className="space-y-6">
            {[
              {
                q: "What counts as a conversion?",
                a: "Each time you paste a conversation and click Convert, that's one conversion. Editing or re-exporting the same result doesn't count again.",
              },
              {
                q: "Can I use this for commercial projects?",
                a: "Absolutely. All plans include commercial use. The exported markdown is yours to use however you want.",
              },
              {
                q: "Do you store my conversations?",
                a: "Free tier: no data is stored, everything runs client-side. Pro/Team: documents are stored encrypted for your library and history features.",
              },
              {
                q: "What agent formats are supported?",
                a: "Any text with markdown code blocks works. We also parse Claude artifacts, ChatGPT exports, and Gemini conversation JSON.",
              },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-border pb-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
