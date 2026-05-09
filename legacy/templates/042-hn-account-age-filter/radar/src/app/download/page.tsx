import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download — HN Account Age Filter",
  description: "Install HN Account Age Filter for Chrome and start filtering Hacker News posts by account age.",
};

const STEPS = [
  { num: "1", title: "Install the Extension", desc: "Click the button below to add HN Account Age Filter to your Chrome browser. It takes less than 10 seconds." },
  { num: "2", title: "Visit Hacker News", desc: "Navigate to news.ycombinator.com. The extension activates automatically on all HN pages." },
  { num: "3", title: "Set Your Threshold", desc: "Click the extension icon and choose your minimum account age. Posts from newer accounts will be filtered instantly." },
];

const REVIEWS = [
  { name: "dang_fan", rating: 5, text: "Finally! I've wanted this for years. Cuts out so much noise from throwaway accounts." },
  { name: "systems_hacker", rating: 5, text: "Simple, fast, and does exactly what it says. The grey-out mode is perfect." },
  { name: "startup_cto", rating: 4, text: "Great tool. Would love to see Firefox support — otherwise, exactly what I needed." },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#ff6600] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-white text-lg tracking-tight">HN Age Filter</Link>
          <div className="hidden sm:flex items-center gap-3 text-sm text-white/90">
            <Link href="/features" className="hover:text-white">Features</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/faq" className="hover:text-white">FAQ</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-2xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="w-20 h-20 bg-[#ff6600] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-200">
          <span className="text-white text-3xl font-bold">HN</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Install HN Account Age Filter</h1>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Add to Chrome in one click. Start filtering Hacker News posts by account age immediately.
        </p>
        <button className="bg-[#ff6600] text-white font-semibold px-10 py-4 rounded-lg hover:bg-orange-600 transition text-lg shadow-md shadow-orange-200 cursor-pointer">
          Add to Chrome — It&apos;s Free
        </button>
        <p className="text-xs text-gray-400 mt-3">Chrome Web Store · v1.2.4 · 2,847 users · 4.8★</p>

        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Privacy-first
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Instant filtering
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            10-second setup
          </span>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">Get Started in 3 Steps</h2>
          <div className="space-y-6">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#ff6600] text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">What Users Say</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="border border-gray-100 rounded-lg p-5">
              <div className="text-[#ff6600] text-sm mb-2">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              <p className="text-sm text-gray-700 mb-3">&ldquo;{r.text}&rdquo;</p>
              <p className="text-xs text-gray-400">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2026 HN Account Age Filter</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <Link href="/features" className="hover:text-gray-700">Features</Link>
            <Link href="/pricing" className="hover:text-gray-700">Pricing</Link>
            <Link href="/faq" className="hover:text-gray-700">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
