import Link from "next/link";

const STEPS = [
  {
    num: "1",
    title: "Set your thresholds",
    desc: "Open the popup and choose minimum account age and karma values. Posts from accounts that don't meet your criteria will be automatically hidden.",
  },
  {
    num: "2",
    title: "Browse HN as usual",
    desc: "Filtered posts fade out or collapse in real time as you scroll. Toggle filters on and off instantly — your settings persist across sessions.",
  },
];

const FEATURES = [
  {
    title: "Account Age Filter",
    desc: "Set a minimum account age (in days) to hide posts from brand-new throwaway accounts.",
    icon: "📅",
  },
  {
    title: "Karma Threshold",
    desc: "Require a minimum karma score so only established community members appear in your feed.",
    icon: "⭐",
  },
  {
    title: "Real-Time Filtering",
    desc: "Posts are filtered as the page loads — no page refresh needed. Works on all HN pages.",
    icon: "⚡",
  },
  {
    title: "Quick Toggle",
    desc: "Disable all filters with a single click to see the unfiltered feed, then re-enable instantly.",
    icon: "🔘",
  },
  {
    title: "Filter Presets",
    desc: "Save multiple filter configurations and switch between them for different browsing moods.",
    icon: "💾",
  },
  {
    title: "Stats Dashboard",
    desc: "See how many posts are filtered vs. visible so you know exactly what you're missing.",
    icon: "📊",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I've been on HN for 12 years. This extension finally solved the one thing that kept bugging me — spam from day-old accounts.",
    name: "jstark",
    detail: "HN member since 2013 · 14,200 karma",
  },
  {
    quote:
      "Simple, fast, does exactly what it says. The karma + age combo filter is perfect for cutting noise.",
    name: "amelia_dev",
    detail: "HN member since 2017 · 3,800 karma",
  },
  {
    quote:
      "Finally I can browse /new without sifting through throwaway account posts. Highly recommend.",
    name: "robknight",
    detail: "HN member since 2015 · 8,600 karma",
  },
];

const FAQS = [
  {
    q: "Does this extension collect my data?",
    a: "No. HN Filter runs entirely in your browser. It reads public HN profile data (account age and karma) via the official HN API and never sends your data anywhere.",
  },
  {
    q: "Will this slow down Hacker News?",
    a: "No. API calls are cached locally, and filtering happens in milliseconds. Most users report no perceptible difference in page load time.",
  },
  {
    q: "Does it work on all HN pages?",
    a: "Yes — the front page, /new, /ask, /show, /jobs, and individual comment threads are all supported.",
  },
  {
    q: "Is there a Firefox version?",
    a: "A Firefox add-on is in development. Sign up for the mailing list to get notified when it launches.",
  },
  {
    q: "What are the HN API rate limits?",
    a: "The HN API is public and has generous rate limits. HN Filter batches and caches requests to stay well within limits during normal browsing.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28" id="install">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Filter Hacker News by
            <span className="text-hn-orange"> account age </span>
            and <span className="text-hn-orange">karma</span>
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
            A free browser extension that automatically hides posts from new or low-karma accounts so you only see content from established community members.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#install"
              className="inline-flex items-center justify-center bg-hn-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-hn-orange-light transition-colors text-base"
            >
              Add to Chrome — Free
            </a>
            <a
              href="https://github.com/hn-filter/extension"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-neutral-300 font-semibold px-6 py-3 rounded-lg hover:border-neutral-400 transition-colors text-base"
            >
              View on GitHub
            </a>
          </div>
          <p className="mt-4 text-sm text-neutral-400">
            1,200+ installs · 4.8 stars on Chrome Web Store
          </p>
        </div>
      </section>

      {/* Popup preview */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="border border-neutral-200 rounded-xl shadow-lg overflow-hidden bg-white max-w-sm mx-auto">
            <div className="bg-hn-orange px-4 py-3 flex items-center gap-2">
              <span className="w-4 h-4 bg-white/30 rounded-sm" />
              <span className="text-white font-bold text-sm">HN Filter</span>
              <span className="ml-auto text-white/80 text-xs">v1.4.2</span>
            </div>
            <div className="p-4 space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">Filters Enabled</span>
                <span className="w-10 h-6 bg-hn-orange rounded-full relative">
                  <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </span>
              </div>
              <div>
                <div className="flex justify-between text-neutral-600 mb-1">
                  <span>Min Account Age</span>
                  <span className="font-mono font-semibold text-neutral-900">30 days</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-hn-orange rounded-full" style={{ width: "25%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-neutral-600 mb-1">
                  <span>Min Karma</span>
                  <span className="font-mono font-semibold text-neutral-900">100</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-hn-orange rounded-full" style={{ width: "10%" }} />
                </div>
              </div>
              <div className="pt-2 border-t border-neutral-100 flex justify-between text-neutral-500 text-xs">
                <span>Showing 24 of 30 posts</span>
                <span className="text-hn-orange font-medium">6 filtered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {STEPS.map((s) => (
              <div key={s.num} className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-hn-orange text-white flex items-center justify-center font-bold">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Features
          </h2>
          <p className="text-center text-neutral-600 mb-12 max-w-lg mx-auto">
            Everything you need to curate your Hacker News experience.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="border border-neutral-200 rounded-lg p-5 hover:border-hn-orange/40 transition-colors"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/features"
              className="text-hn-orange font-medium hover:underline"
            >
              See all features &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            What HN users are saying
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-neutral-200 rounded-lg p-6"
              >
                <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="text-sm">
                  <span className="font-semibold text-hn-orange">{t.name}</span>
                  <br />
                  <span className="text-neutral-400 text-xs">{t.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24" id="faq">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-neutral-200">
            {FAQS.map((f) => (
              <details key={f.q} className="py-4 group">
                <summary className="cursor-pointer font-medium flex items-center justify-between">
                  {f.q}
                  <span className="ml-2 text-neutral-400 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-neutral-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to clean up your HN feed?
          </h2>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">
            Join 1,200+ HN users who use HN Filter to cut through noise and focus on quality content.
          </p>
          <a
            href="#install"
            className="inline-flex items-center justify-center bg-hn-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-hn-orange-light transition-colors"
          >
            Install HN Filter — Free
          </a>
        </div>
      </section>
    </>
  );
}
