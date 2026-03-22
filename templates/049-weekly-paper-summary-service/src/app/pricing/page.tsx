import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Radar",
  description: "Subscribe to Radar for $9/month. Weekly ML paper deep dives.",
};

const faqs = [
  {
    q: "What do I get each week?",
    a: "Every Monday, you receive an email with 3 curated paper summaries. Each includes a TL;DR, why it matters, 3-5 actionable insights, and code snippets when relevant.",
  },
  {
    q: "How do you choose which papers to cover?",
    a: "We read 50+ papers per week across arXiv, top conferences, and industry labs. We pick the 3 most impactful for working ML researchers — papers that change how you think or work.",
  },
  {
    q: "Can I suggest papers?",
    a: "Yes! Reply to any issue email with a paper suggestion. We read every reply and prioritize subscriber requests.",
  },
  {
    q: "Is there a free trial?",
    a: "We offer a free sample issue so you can see the quality before subscribing. No credit card required to read it.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel with one click from your account page. No questions asked, no lock-in.",
  },
];

export default function PricingPage() {
  return (
    <>
      <nav className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            radar<span className="text-accent">.</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-muted hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/sample" className="text-muted hover:text-foreground transition-colors">
              Sample
            </Link>
            <Link href="/about" className="text-muted hover:text-foreground transition-colors">
              About
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              One plan. No noise.
            </h1>
            <p className="text-muted text-lg max-w-md mx-auto">
              The cost of one mediocre lunch for a week of research clarity.
            </p>
          </div>

          <div className="max-w-sm mx-auto border-2 border-foreground rounded-lg p-8 mb-20">
            <div className="mb-1 text-sm font-medium text-accent uppercase tracking-wide">
              Researcher
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold">$9</span>
              <span className="text-muted">/month</span>
            </div>
            <ul className="space-y-3 text-sm mb-8">
              {[
                "3 deep paper summaries every Monday",
                "3-5 actionable insights per paper",
                "Code snippets when relevant",
                "TL;DR + deep-dive for every paper",
                "Reply to emails with questions",
                "Suggest papers for coverage",
                "Cancel anytime",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full bg-foreground text-background py-3 rounded-md font-medium hover:opacity-90 transition-opacity cursor-pointer">
              Subscribe — $9/month
            </button>
            <p className="text-xs text-muted text-center mt-3">
              Cancel anytime · No credit card until checkout
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b border-border pb-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-muted mb-4">
              Not sure yet?{" "}
              <Link href="/sample" className="text-accent hover:underline font-medium">
                Read the free sample →
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-sm text-muted">
          <span>© 2026 Radar</span>
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
        </div>
      </footer>
    </>
  );
}
