import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConvertTool from "@/components/ConvertTool";

const FEATURES = [
  {
    title: "Auto-detect Code Blocks",
    description:
      "Automatically identifies and extracts code from agent conversations, wrapping them in properly tagged markdown fences.",
    icon: "{ }",
  },
  {
    title: "Multi-Agent Support",
    description:
      "Works with Claude, GPT, Gemini, and any markdown-formatted conversation export. Paste and go.",
    icon: "///",
  },
  {
    title: "Syntax Highlighting",
    description:
      "Code blocks are rendered with syntax highlighting for 20+ languages. TypeScript, Python, Rust, Go, and more.",
    icon: "</>",
  },
  {
    title: "One-Click Export",
    description:
      "Copy the full markdown, extract just the code, or download as a .md file. Ready for your docs or repo.",
    icon: " ->",
  },
  {
    title: "Prose Formatting",
    description:
      "Agent reasoning and explanations are formatted as clean prose sections, interleaved naturally with code.",
    icon: " Aa",
  },
  {
    title: "Zero Config",
    description:
      "No sign-up required for your first 50 conversions. Paste, convert, and export in seconds.",
    icon: " 0~",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-20 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded-full border border-border text-xs text-muted font-mono mb-2">
            Open beta — 50 free conversions
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Turn Agent Chats into{" "}
            <span className="text-accent">Literate Programs</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Paste any AI agent conversation. Get a polished notebook with
            extracted code blocks, syntax highlighting, and formatted prose.
            Ready to share or ship.
          </p>
        </div>
      </section>

      {/* Convert Tool */}
      <section className="pb-20 sm:pb-28 px-4 sm:px-6" id="convert">
        <ConvertTool />
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-border" id="features">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Everything you need to go from chat to code
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-mono text-sm font-bold mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-border">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Three steps. That&apos;s it.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Paste", desc: "Drop in your agent conversation — plain text, JSON, or markdown." },
              { step: "2", title: "Convert", desc: "We parse code blocks, detect languages, and format prose sections." },
              { step: "3", title: "Export", desc: "Copy markdown, extract code, or download as a .md file." },
            ].map((s) => (
              <div key={s.step} className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-mono font-bold mx-auto">
                  {s.step}
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 border-t border-border">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to convert your first conversation?
          </h2>
          <p className="text-muted">
            No sign-up required. Paste, convert, export — in under 10 seconds.
          </p>
          <a
            href="#convert"
            className="inline-block px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors text-sm"
          >
            Try it now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
