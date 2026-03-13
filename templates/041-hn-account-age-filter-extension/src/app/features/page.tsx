import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features — HN Filter",
  description:
    "Explore all features of HN Filter: account age filtering, karma thresholds, real-time filtering, presets, and more.",
};

const FEATURES = [
  {
    title: "Account Age Filter",
    desc: "Set a minimum number of days an account must exist before its posts appear in your feed. Perfect for filtering out throwaway accounts created to push spam or low-effort content.",
    icon: "📅",
  },
  {
    title: "Karma Threshold",
    desc: "Require a minimum karma score for posts to be visible. Accounts that haven't contributed meaningfully to the community are quietly filtered out.",
    icon: "⭐",
  },
  {
    title: "Combined Filters",
    desc: "Use account age AND karma together for precise control. For example, show posts only from accounts older than 90 days with at least 500 karma.",
    icon: "🔗",
  },
  {
    title: "Real-Time Filtering",
    desc: "Posts are filtered the instant the page loads — no refresh required. As you scroll through HN, new content is evaluated and filtered automatically.",
    icon: "⚡",
  },
  {
    title: "Quick Toggle",
    desc: "Disable all filters with a single click to see the full, unfiltered feed. Re-enable just as quickly. Great for checking what you might be missing.",
    icon: "🔘",
  },
  {
    title: "Filter Presets",
    desc: "Save multiple filter configurations and switch between them. Create a 'strict' preset for /new and a 'relaxed' one for the front page.",
    icon: "💾",
  },
  {
    title: "Filtered Post Counter",
    desc: "See exactly how many posts are hidden vs. visible at a glance. A small badge on the extension icon shows the count on every page.",
    icon: "📊",
  },
  {
    title: "Fade or Collapse",
    desc: "Choose how filtered posts are handled: fade them to low opacity so you can still see titles, or collapse them entirely to reclaim space.",
    icon: "👁",
  },
  {
    title: "Per-Page Settings",
    desc: "Apply different filter rules to different HN sections. Use strict filters on /new but lighter ones on the front page where community voting already helps.",
    icon: "📄",
  },
  {
    title: "Allowlist",
    desc: "Exempt specific usernames from filtering. If a new account belongs to someone you follow, add them to your allowlist and their posts will always appear.",
    icon: "✅",
  },
  {
    title: "Local Caching",
    desc: "Account data is cached in your browser for fast lookups. Repeat visits to the same page don't make additional API calls, keeping everything snappy.",
    icon: "🗄",
  },
  {
    title: "Zero Data Collection",
    desc: "HN Filter runs entirely in your browser. No analytics, no tracking, no server calls. Your browsing habits and filter settings stay on your machine.",
    icon: "🔒",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Every feature you need
          </h1>
          <p className="text-center text-neutral-600 mb-14 max-w-lg mx-auto">
            HN Filter gives you fine-grained control over your Hacker News feed with zero setup complexity.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="border border-neutral-200 rounded-lg p-6 hover:border-hn-orange/40 transition-colors"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            See it in action
          </h2>
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm max-w-2xl mx-auto">
            <div className="bg-[#f6f6ef] px-4 py-2 border-b border-neutral-200 flex items-center gap-2 text-xs">
              <span className="w-5 h-5 bg-hn-orange rounded-sm" />
              <span className="font-bold text-hn-orange">Hacker News</span>
              <span className="text-neutral-500 ml-2">new | past | comments | ask | show | jobs</span>
            </div>
            <div className="divide-y divide-neutral-100 text-sm">
              {[
                { title: "Show HN: A new approach to database indexing", user: "pgexpert", age: "4,230 days", karma: "12,400", visible: true },
                { title: "Why Rust is eating the world", user: "throwaway8821", age: "2 days", karma: "3", visible: false },
                { title: "The future of WebAssembly", user: "nicklin", age: "1,800 days", karma: "5,300", visible: true },
                { title: "Ask HN: Best practices for hiring remotely?", user: "newuser_spam", age: "0 days", karma: "1", visible: false },
                { title: "How we scaled our startup to 1M users", user: "sballin", age: "3,100 days", karma: "8,900", visible: true },
              ].map((post, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 flex items-start gap-3 ${
                    !post.visible ? "opacity-20" : ""
                  }`}
                >
                  <span className="text-neutral-400 font-mono text-xs mt-0.5 w-4 text-right">{i + 1}.</span>
                  <div>
                    <span className={post.visible ? "text-neutral-900" : "line-through text-neutral-400"}>
                      {post.title}
                    </span>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      by {post.user} · {post.age} old · {post.karma} karma
                      {!post.visible && (
                        <span className="ml-2 text-red-400 font-medium">filtered</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-sm text-neutral-500 mt-6">
            Posts from accounts younger than 30 days with less than 100 karma are faded out.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Start filtering today</h2>
          <p className="text-neutral-400 mb-8">Free to install. No account required.</p>
          <a
            href="/#install"
            className="inline-flex items-center justify-center bg-hn-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-hn-orange-light transition-colors"
          >
            Add to Chrome — Free
          </a>
        </div>
      </section>
    </>
  );
}
