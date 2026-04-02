import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Radar",
  description: "Frequently asked questions about Radar startup idea validation.",
};

const faqs = [
  {
    q: "How does Radar work?",
    a: "You submit your startup idea through our structured form. We match you with an expert validator who has relevant domain experience. They analyze your idea using real competitor data from product platforms, market research tools, and their own expertise. Within 48 hours, you receive a detailed validation report with market sizing, competitor analysis, red flags, and a go/no-go recommendation.",
  },
  {
    q: "Who are the expert validators?",
    a: "Our validators are experienced founders, operators, and investors who have built, scaled, or sold companies. They include YC alumni, former PMs at top tech companies, serial founders, and active angel investors. Each expert is vetted and matched to ideas within their domain of expertise.",
  },
  {
    q: "What's included in the validation report?",
    a: "Every report includes: market size analysis (TAM/SAM/SOM), competitive landscape mapping, target user validation, red flags and risk assessment, a clear go/no-go recommendation, and actionable next steps. Full and Premium plans include additional sections like revenue model assessment and detailed roadmap.",
  },
  {
    q: "How long does it take?",
    a: "Standard delivery is within 48 hours of submitting your idea. Premium plans include priority 24-hour delivery. You'll receive an email confirmation within 1 hour of submission with your matched expert's profile.",
  },
  {
    q: "What if I disagree with the report?",
    a: "All plans include at least 1 round of revisions. If you feel the expert missed something or want deeper analysis on a specific section, submit your feedback and we'll update the report. Premium plans include 2 rounds of revisions plus a 45-minute strategy call.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Yes. If you're unsatisfied with the quality of your validation report, we'll refund your payment in full — no questions asked. We stand behind the quality of our expert analysis.",
  },
  {
    q: "Can I choose my expert?",
    a: "We match you with the best-fit expert based on your idea's domain, but you can request a specific expert if you prefer. If your preferred expert isn't available within the delivery window, we'll let you know and offer alternatives.",
  },
  {
    q: "What data sources do experts use?",
    a: "Experts use a combination of product platform data (traffic, reviews, feature comparisons), market research databases, public financial data, app store analytics, social media signal analysis, and their own industry knowledge and network.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-lg text-slate-900">Radar</span>
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Idea
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-slate-600 mb-12">Everything you need to know about Radar validation.</p>

        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="pb-8 border-b border-slate-100 last:border-0">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">{faq.q}</h2>
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-slate-50 rounded-2xl text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Still have questions?</h3>
          <p className="text-slate-600 mb-4">Take our free 2-minute assessment to see which plan is right for you.</p>
          <Link
            href="/quiz"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition"
          >
            Take Free Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
