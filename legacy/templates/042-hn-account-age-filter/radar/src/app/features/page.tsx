import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features — HN Account Age Filter",
  description: "See how HN Account Age Filter works: threshold presets, instant filtering, toggle control, and more.",
};

const FEATURES = [
  {
    icon: "🎚️",
    title: "Flexible Thresholds",
    desc: "Choose from 7, 30, or 90-day presets, or unlock custom day counts with Pro. Set your preferred minimum account age and let the extension handle the rest.",
  },
  {
    icon: "👁️",
    title: "Visual Filtering Modes",
    desc: "Grey out filtered posts so you can still glance at them, or hide them completely. Your choice, configurable in the options page.",
  },
  {
    icon: "⚡",
    title: "Real-time Processing",
    desc: "Posts are filtered as the page loads — under 1 second. The extension queries account creation dates via the HN API with smart caching.",
  },
  {
    icon: "🔄",
    title: "One-Click Toggle",
    desc: "Click the toolbar icon to instantly toggle all filters on or off. No popup needed — just one click.",
  },
  {
    icon: "📊",
    title: "Post Count Indicator",
    desc: "The popup always shows how many posts are visible vs. filtered on the current page, so you know exactly what you're missing.",
  },
  {
    icon: "💾",
    title: "Persistent Preferences",
    desc: "Your threshold and display preferences are saved across sessions. Set it once and forget about it.",
  },
  {
    icon: "🔒",
    title: "Privacy First",
    desc: "All processing happens locally in your browser. No data is sent to any external server — ever.",
  },
  {
    icon: "📋",
    title: "Filtered List Export (Pro)",
    desc: "Export a list of all filtered posts and their submitter details as CSV. Useful for moderation research.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#ff6600] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-white text-lg tracking-tight">HN Age Filter</Link>
          <div className="hidden sm:flex items-center gap-3 text-sm text-white/90">
            <Link href="/features" className="text-white font-semibold">Features</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/faq" className="hover:text-white">FAQ</Link>
          </div>
        </div>
        <Link href="/download" className="bg-white text-[#ff6600] text-sm font-semibold px-4 py-1.5 rounded hover:bg-orange-50 transition">
          Install Free
        </Link>
      </nav>

      <section className="max-w-4xl mx-auto px-4 pt-16 pb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 text-center">Features</h1>
        <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
          Everything you need to filter Hacker News by account age. Simple, fast, private.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="border border-gray-100 rounded-lg p-6 hover:shadow-sm transition">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popup Preview */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-lg mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Extension Popup Preview</h2>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-xs mx-auto">
            <div className="bg-[#ff6600] px-4 py-3 flex items-center justify-between">
              <span className="text-white font-bold text-sm">HN Age Filter</span>
              <div className="w-8 h-4 bg-white/30 rounded-full relative cursor-pointer">
                <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 transition" />
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Minimum Account Age</label>
                <div className="flex gap-2 mt-2">
                  {["7d", "30d", "90d", "Custom"].map((preset, i) => (
                    <button
                      key={preset}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                        i === 1
                          ? "bg-[#ff6600] text-white"
                          : i === 3
                          ? "bg-gray-100 text-gray-400 border border-dashed border-gray-300"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Display Mode</label>
                <div className="flex gap-2 mt-2">
                  <button className="text-xs px-3 py-1.5 rounded-full bg-[#ff6600] text-white font-medium">Grey Out</button>
                  <button className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium hover:bg-gray-200">Hide</button>
                </div>
              </div>
              <div className="border-t pt-3 flex justify-between text-xs text-gray-500">
                <span>Visible: <strong className="text-gray-900">23</strong></span>
                <span>Filtered: <strong className="text-[#ff6600]">7</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <Link href="/download" className="bg-[#ff6600] text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-600 transition inline-block">
          Install Extension — Free
        </Link>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2026 HN Account Age Filter</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <Link href="/pricing" className="hover:text-gray-700">Pricing</Link>
            <Link href="/faq" className="hover:text-gray-700">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
