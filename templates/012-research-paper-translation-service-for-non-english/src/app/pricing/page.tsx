import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — PaperBridge",
  description:
    "Subscribe to PaperBridge for monthly AI research paper translations. Plans starting at $99/month.",
};

const plans = [
  {
    name: "Researcher",
    price: 99,
    annual: 79,
    desc: "For individual researchers staying current",
    features: [
      "10 translated papers per month",
      "PDF downloads with preserved formatting",
      "Search across translated paper database",
      "Email notifications for new translations",
      "1 priority translation request per month",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: 199,
    annual: 159,
    desc: "For active researchers and team leads",
    features: [
      "All 20 translated papers per month",
      "PDF downloads with preserved formatting",
      "Search across full translated database",
      "Email notifications for new translations",
      "5 priority translation requests per month",
      "48-hour turnaround on priority requests",
      "Mathematical notation quality guarantee",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Team",
    price: 499,
    annual: 399,
    desc: "For research labs and departments",
    features: [
      "Everything in Professional",
      "Up to 10 team member accounts",
      "Unlimited priority translation requests",
      "24-hour turnaround on priority requests",
      "Custom glossary for your research domain",
      "API access for integration",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary-dark mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            All plans include a 7-day free trial. No credit card required to
            start.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-8 relative ${
                plan.popular
                  ? "border-accent shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-primary-dark mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-muted mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary-dark">
                  ${plan.price}
                </span>
                <span className="text-muted">/month</span>
                <div className="text-sm text-accent mt-1">
                  ${plan.annual}/mo billed annually
                </div>
              </div>
              <Link
                href="/dashboard"
                className={`block text-center font-semibold py-3 rounded-lg mb-6 transition-colors ${
                  plan.popular
                    ? "bg-accent hover:bg-accent-light text-white"
                    : "bg-primary hover:bg-primary-light text-white"
                }`}
              >
                {plan.cta}
              </Link>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
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
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-primary-dark text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What makes PaperBridge different from Google Translate?",
                a: "Google Translate fails on technical AI terminology, mathematical notation, and domain-specific jargon. Our translators are AI researchers themselves who understand concepts like mixture-of-experts, attention mechanisms, and gradient descent — ensuring accurate, natural-sounding Chinese translations.",
              },
              {
                q: "How are the top 20 papers selected each month?",
                a: "We track trending metrics on Hugging Face, arXiv citations, and social media engagement to identify the most impactful AI research papers each month. Our editorial team curates the final selection to ensure breadth across research areas.",
              },
              {
                q: "Can I request a specific paper to be translated?",
                a: "Yes! All plans include priority translation requests. Submit any arXiv or conference paper link, and our team will deliver a high-quality Chinese translation within 48 hours (24 hours for Team plan).",
              },
              {
                q: "Do you support languages other than Chinese?",
                a: "We are currently focused on English-to-Chinese translation to ensure the highest quality. Japanese and Korean support is planned for Q3 2026.",
              },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-border pb-6">
                <h3 className="font-semibold text-primary-dark mb-2">
                  {faq.q}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
