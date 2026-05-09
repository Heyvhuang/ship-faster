import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — HN Account Age Filter",
  description: "Frequently asked questions about the HN Account Age Filter browser extension.",
};

const FAQS = [
  {
    q: "How does the extension determine account age?",
    a: "The extension queries the public Hacker News API to fetch each submitter's account creation date. Results are cached locally so repeat visits are instant.",
  },
  {
    q: "Does this work on all HN pages?",
    a: "Yes — the front page, new, ask, show, jobs, and individual comment pages are all supported. The extension detects HN pages automatically.",
  },
  {
    q: "Will this slow down Hacker News?",
    a: "No. API lookups are batched and cached for 24 hours. Filtering happens in under 1 second on a typical page load.",
  },
  {
    q: "Is my data sent anywhere?",
    a: "Never. All processing happens locally in your browser. The only network requests are to the official HN API to fetch public account data.",
  },
  {
    q: "Can I still see filtered posts?",
    a: "Yes — in 'Grey Out' mode, filtered posts are visually muted but still visible. You can also toggle all filters off with one click.",
  },
  {
    q: "What browsers are supported?",
    a: "Chrome and Chromium-based browsers (Edge, Brave, Arc) are fully supported. Firefox support is coming soon.",
  },
  {
    q: "Why would I want the Pro plan?",
    a: "Pro unlocks custom day thresholds (e.g. 45 days, 180 days, or any number you choose) and lets you export filtered post lists as CSV for research or moderation.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. Pro includes a 7-day free trial, and you can cancel anytime. If you're not satisfied, email us within 30 days for a full refund.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#ff6600] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-white text-lg tracking-tight">HN Age Filter</Link>
          <div className="hidden sm:flex items-center gap-3 text-sm text-white/90">
            <Link href="/features" className="hover:text-white">Features</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/faq" className="text-white font-semibold">FAQ</Link>
          </div>
        </div>
        <Link href="/download" className="bg-white text-[#ff6600] text-sm font-semibold px-4 py-1.5 rounded hover:bg-orange-50 transition">
          Install Free
        </Link>
      </nav>

      <section className="max-w-2xl mx-auto px-4 pt-16 pb-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 text-center">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-center max-w-md mx-auto mb-12">
          Everything you need to know about HN Account Age Filter.
        </p>

        <div className="space-y-6">
          {FAQS.map((faq) => (
            <div key={faq.q} className="border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-orange-50 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-sm text-gray-600 mb-4">Reach out and we&apos;ll get back to you within 24 hours.</p>
          <a href="mailto:support@hnagefilter.com" className="text-[#ff6600] font-medium text-sm hover:underline">
            support@hnagefilter.com
          </a>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2026 HN Account Age Filter</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <Link href="/features" className="hover:text-gray-700">Features</Link>
            <Link href="/pricing" className="hover:text-gray-700">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
