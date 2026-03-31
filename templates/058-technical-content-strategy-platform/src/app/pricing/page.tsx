import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing — Radar",
  description: "Simple, transparent pricing for Radar's technical content strategy reports.",
};

const faqs = [
  { q: "What's a technology vertical?", a: "A vertical is a technology domain — for example, 'JavaScript frameworks' or 'DevOps tooling'. Each vertical covers 25-50 specific technologies within that domain." },
  { q: "How are reports delivered?", a: "Reports are delivered as polished PDF documents via email on the first Monday of each month. Enterprise clients also receive weekly Slack updates." },
  { q: "Can I switch verticals?", a: "Yes, you can change your target vertical once per quarter at no additional cost. Enterprise clients can adjust verticals monthly." },
  { q: "What's the minimum commitment?", a: "We offer month-to-month plans with no long-term commitment required. Enterprise annual plans receive a discount." },
  { q: "Do you offer a free trial?", a: "We offer a complimentary sample report for one technology vertical so you can evaluate the quality before committing." },
  { q: "What if I need more than 5 verticals?", a: "Contact us for custom enterprise pricing. We support teams tracking up to 20 verticals simultaneously." },
];

export default function Pricing() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
            <p className="text-muted max-w-xl mx-auto">
              Start with one vertical. Scale as you see results.
            </p>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-3xl mx-auto">
            <div className="bg-surface border border-border rounded-xl p-8">
              <div className="text-sm text-muted mb-1">Starter</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold font-mono">$800</span>
                <span className="text-muted">/mo</span>
              </div>
              <p className="text-xs text-teal mb-6">Early-bird pricing — limited spots</p>
              <ul className="space-y-3 text-sm text-muted mb-8">
                {[
                  "1 technology vertical",
                  "Monthly trend report (PDF)",
                  "25+ technologies scored",
                  "Content angle recommendations",
                  "Keyword difficulty analysis",
                  "Competitor content overview",
                  "Email support",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-teal shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/demo"
                className="block text-center bg-teal hover:bg-teal-dark text-background font-semibold py-3 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-surface border-2 border-teal rounded-xl p-8 relative">
              <span className="absolute -top-3 left-6 bg-teal text-background text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </span>
              <div className="text-sm text-muted mb-1">Enterprise</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold font-mono">$2,400</span>
                <span className="text-muted">/mo</span>
              </div>
              <p className="text-xs text-muted mb-6">Billed annually — save 20%</p>
              <ul className="space-y-3 text-sm text-muted mb-8">
                {[
                  "Up to 5 technology verticals",
                  "Weekly trend updates",
                  "50+ technologies scored",
                  "Deep competitor gap analysis",
                  "Quarterly strategy consultation",
                  "Slack channel integration",
                  "Dedicated account manager",
                  "Priority support",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-teal shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/demo"
                className="block text-center bg-teal hover:bg-teal-dark text-background font-semibold py-3 rounded-lg transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently asked questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b border-border pb-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
