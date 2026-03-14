import Link from "next/link";

const MOCK_POSTS = [
  { id: 1, title: "Show HN: I built a real-time collaborative code editor", user: "veteran_dev", age: "12 years", points: 342, comments: 89, filtered: false },
  { id: 2, title: "Why Rust is taking over systems programming", user: "newbie_2024", age: "3 days", points: 15, comments: 4, filtered: true },
  { id: 3, title: "The state of WebAssembly in 2026", user: "wasm_fan", age: "5 years", points: 267, comments: 134, filtered: false },
  { id: 4, title: "Ask HN: Best resources for learning distributed systems?", user: "fresh_account", age: "12 days", points: 8, comments: 2, filtered: true },
  { id: 5, title: "PostgreSQL 18 released with major performance improvements", user: "pg_contributor", age: "8 years", points: 891, comments: 203, filtered: false },
  { id: 6, title: "My side project hit $10k MRR", user: "day_old_user", age: "1 day", points: 3, comments: 1, filtered: true },
];

function HNPost({ post }: { post: typeof MOCK_POSTS[0] }) {
  return (
    <div className={`flex items-baseline gap-2 py-1 ${post.filtered ? "opacity-30 line-through decoration-1" : ""}`}>
      <span className="text-sm text-gray-500 w-6 text-right shrink-0">{post.id}.</span>
      <div>
        <span className="text-sm">{post.title}</span>
        <div className="text-xs text-gray-500">
          {post.points} points by <span className={post.filtered ? "text-red-400" : "text-gray-600"}>{post.user}</span>{" "}
          <span className={post.filtered ? "text-red-400 font-medium" : ""}>(account: {post.age})</span>
          {" | "}{post.comments} comments
          {post.filtered && <span className="ml-2 text-red-400 text-[10px] uppercase font-bold tracking-wider">filtered</span>}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="bg-[#ff6600] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-white text-lg tracking-tight">HN Age Filter</Link>
          <div className="hidden sm:flex items-center gap-3 text-sm text-white/90">
            <Link href="/features" className="hover:text-white">Features</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/faq" className="hover:text-white">FAQ</Link>
          </div>
        </div>
        <Link href="/download" className="bg-white text-[#ff6600] text-sm font-semibold px-4 py-1.5 rounded hover:bg-orange-50 transition">
          Install Free
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-block bg-orange-50 text-[#ff6600] text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
          Chrome Extension
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Filter Hacker News by<br />
          <span className="text-[#ff6600]">Account Age</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Hide posts from newly created accounts. Cut through noise and focus on content from established community members.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/download" className="bg-[#ff6600] text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-600 transition w-full sm:w-auto text-center">
            Add to Chrome — Free
          </Link>
          <Link href="/features" className="border border-gray-300 text-gray-700 font-medium px-8 py-3 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto text-center">
            See How It Works
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-3">Free forever for preset thresholds. No account required.</p>
      </section>

      {/* Live Demo */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-[#ff6600] px-3 py-1.5 flex items-center justify-between">
            <span className="text-white text-xs font-bold">Hacker News</span>
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-[10px]">Filter: 30 days</span>
              <div className="w-8 h-4 bg-white/30 rounded-full relative">
                <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5" />
              </div>
            </div>
          </div>
          <div className="bg-[#f6f6ef] p-3 space-y-0.5">
            {MOCK_POSTS.map((post) => (
              <HNPost key={post.id} post={post} />
            ))}
          </div>
          <div className="bg-gray-50 px-3 py-2 text-xs text-gray-500 flex items-center justify-between border-t">
            <span>Showing 3 of 6 posts</span>
            <span className="text-[#ff6600] font-medium">3 filtered by age</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "🎚️", title: "Set Threshold", desc: "Choose 7, 30, or 90 days — or set a custom age with Pro." },
              { icon: "⚡", title: "Instant Filtering", desc: "Posts from accounts under your threshold are greyed out or hidden." },
              { icon: "🔄", title: "Toggle Anytime", desc: "One click in the toolbar to enable or disable filtering." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { num: "2,847", label: "Active Users" },
            { num: "12M+", label: "Posts Filtered" },
            { num: "4.8★", label: "Chrome Store Rating" },
            { num: "<1s", label: "Filter Speed" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-[#ff6600]">{s.num}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff6600] py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Start Filtering Today</h2>
          <p className="text-white/80 mb-6">Install in seconds. Works on all Hacker News pages.</p>
          <Link href="/download" className="bg-white text-[#ff6600] font-semibold px-8 py-3 rounded-lg hover:bg-orange-50 transition inline-block">
            Install Extension — Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2026 HN Account Age Filter</span>
          <div className="flex gap-4">
            <Link href="/features" className="hover:text-gray-700">Features</Link>
            <Link href="/pricing" className="hover:text-gray-700">Pricing</Link>
            <Link href="/faq" className="hover:text-gray-700">FAQ</Link>
            <Link href="/download" className="hover:text-gray-700">Download</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
