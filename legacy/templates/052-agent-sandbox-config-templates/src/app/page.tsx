"use client";

import Link from "next/link";
import { templates, testimonials, type Template } from "@/lib/data";
import { useState } from "react";

function Nav() {
  return (
    <nav className="border-b border-card-border px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 text-green font-bold text-lg">
        <span className="text-xl">🛡️</span>
        <span>safespace</span>
      </Link>
      <div className="flex items-center gap-6 text-sm text-muted">
        <Link href="#templates" className="hover:text-green transition-colors">
          Templates
        </Link>
        <Link href="#compare" className="hover:text-green transition-colors">
          Compare
        </Link>
        <Link href="#faq" className="hover:text-green transition-colors">
          FAQ
        </Link>
        <a
          href="https://github.com/agent-safespace/templates"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green transition-colors flex items-center gap-1"
        >
          GitHub
          <span className="text-xs bg-card-bg border border-card-border px-2 py-0.5 rounded-full">
            ★ 1.2k
          </span>
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="px-6 py-24 md:py-32 max-w-4xl mx-auto text-center">
      <div className="inline-block mb-6 text-xs font-medium text-green bg-green-dark/30 border border-green-dark px-3 py-1 rounded-full">
        Free for first 100 users
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        One-click sandbox configs
        <br />
        <span className="text-green">for AI agents</span>
      </h1>
      <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        Pre-built .safespace configuration templates for Claude, GPT, and local
        models. Import into Agent Safehouse and run agents securely in seconds.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="#templates"
          className="bg-green text-black font-semibold px-8 py-3 rounded-md hover:bg-green-dim transition-colors"
        >
          Browse Templates
        </Link>
        <a
          href="https://github.com/agent-safespace/templates"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-card-border text-foreground px-8 py-3 rounded-md hover:border-muted transition-colors"
        >
          View on GitHub
        </a>
      </div>
      <div className="mt-16 bg-card-bg border border-card-border rounded-lg p-4 text-left text-sm overflow-x-auto">
        <div className="flex items-center gap-2 mb-3 text-muted text-xs">
          <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-green/80"></span>
          <span className="ml-2">terminal</span>
        </div>
        <pre className="text-green/80">
          <code>{`$ safehouse import code-review.safespace
✓ Template loaded: Code Review v1.3.0
✓ Permissions verified: 4 allow, 4 deny
✓ Sandbox ready — run 'safehouse start' to begin`}</code>
        </pre>
      </div>
    </section>
  );
}

function AgentBadge({ agent }: { agent: string }) {
  const colors: Record<string, string> = {
    claude: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    gpt: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    ollama: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded border ${colors[agent] || "text-muted border-card-border"}`}
    >
      {agent}
    </span>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group bg-card-bg border border-card-border rounded-lg p-6 hover:border-green/40 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{template.icon}</span>
        <span className="text-xs text-muted">v{template.version}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-green transition-colors">
        {template.title}
      </h3>
      <p className="text-sm text-muted mb-4 leading-relaxed">
        {template.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {template.agents.map((a) => (
            <AgentBadge key={a} agent={a} />
          ))}
        </div>
        <span className="text-xs text-muted">
          {template.downloads.toLocaleString()} downloads
        </span>
      </div>
    </Link>
  );
}

function Templates() {
  return (
    <section id="templates" className="px-6 py-20 max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Use-Case Templates
      </h2>
      <p className="text-muted text-center mb-12 max-w-xl mx-auto">
        Each template is a .safespace config file with granular permissions
        tuned for a specific workflow.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>
    </section>
  );
}

function PermissionCompare() {
  const [selected, setSelected] = useState<string[]>([
    templates[0].id,
    templates[4].id,
  ]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.length > 1 ? prev.filter((s) => s !== id) : prev;
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const selectedTemplates = templates.filter((t) => selected.includes(t.id));

  const allPermTypes = ["Filesystem Read", "Filesystem Write", "Network", "Process Allow", "Process Deny"] as const;

  function getPermRow(t: Template, type: string): string {
    const cfg = JSON.parse(t.configPreview);
    switch (type) {
      case "Filesystem Read":
        return (cfg.fs?.allow_read || []).join(", ") || "—";
      case "Filesystem Write":
        return (cfg.fs?.allow_write || []).join(", ") || (cfg.fs?.deny_write ? `Denied: ${cfg.fs.deny_write.join(", ")}` : "—");
      case "Network":
        return cfg.network?.allow?.length ? cfg.network.allow.join(", ") : "None (isolated)";
      case "Process Allow":
        return (cfg.process?.allow || []).join(", ") || "—";
      case "Process Deny":
        return (cfg.process?.deny || []).join(", ") || "—";
      default:
        return "—";
    }
  }

  return (
    <section id="compare" className="px-6 py-20 max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Compare Permissions
      </h2>
      <p className="text-muted text-center mb-8 max-w-xl mx-auto">
        Select up to 3 templates to compare their sandbox permissions side by side.
      </p>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => toggle(t.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selected.includes(t.id)
                ? "bg-green text-black"
                : "bg-card-bg border border-card-border text-muted hover:text-foreground"
            }`}
          >
            {t.icon} {t.title}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-card-border">
              <th className="text-left py-3 px-4 text-muted font-medium">Permission</th>
              {selectedTemplates.map((t) => (
                <th key={t.id} className="text-left py-3 px-4 font-medium">
                  {t.icon} {t.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPermTypes.map((type) => (
              <tr key={type} className="border-b border-card-border/50">
                <td className="py-3 px-4 text-muted whitespace-nowrap">{type}</td>
                {selectedTemplates.map((t) => (
                  <td key={t.id} className="py-3 px-4 text-xs leading-relaxed">
                    <code className="text-green/80">{getPermRow(t, type)}</code>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Choose a template", desc: "Pick a use-case preset from the gallery." },
    { num: "02", title: "Select your agent", desc: "Claude, GPT, or Ollama/local models." },
    { num: "03", title: "Download .safespace", desc: "One-click download of the config file." },
    { num: "04", title: "Import & run", desc: "Import into Agent Safehouse and start securely." },
  ];
  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
        How It Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div key={s.num} className="text-center">
            <div className="text-green text-3xl font-bold mb-3">{s.num}</div>
            <h3 className="font-semibold mb-1">{s.title}</h3>
            <p className="text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const faqItems = [
  {
    q: "What is a .safespace file?",
    a: "A .safespace file is a JSON configuration that defines sandbox permissions for an AI agent running inside Agent Safehouse on macOS. It specifies which files the agent can read or write, which network domains it can access, and which processes it can execute.",
  },
  {
    q: "Do I need Agent Safehouse installed?",
    a: "Yes. These templates are designed for Agent Safehouse, a macOS app that runs AI agents in sandboxed environments. Download Agent Safehouse first, then import any .safespace template with one click.",
  },
  {
    q: "Which AI agents are supported?",
    a: "Templates are available for Claude (Anthropic), GPT (OpenAI), and Ollama-based local models. Each template adjusts its permissions based on the agent's typical behavior and API requirements.",
  },
  {
    q: "Can I customize a template after importing?",
    a: "Absolutely. After importing a .safespace file, you can edit every permission in Agent Safehouse's UI. Templates are starting points — tune filesystem paths, network allowlists, and process rules to match your exact workflow.",
  },
  {
    q: "Are the templates auditable?",
    a: "Every template lists its full permission breakdown — allowed and denied rules for filesystem, network, and process access. You can review the raw JSON config before importing.",
  },
  {
    q: "Is this free?",
    a: "All 5 use-case templates are free for the first 100 users. A Pro template pack with 20+ advanced configs and auto-update support is coming soon for $9.99 (one-time).",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="px-6 py-20 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <dl className="space-y-2">
        {faqItems.map((item, i) => (
          <div key={i} className="border border-card-border rounded-lg overflow-hidden">
            <dt>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium hover:bg-card-bg transition-colors"
                aria-expanded={open === i}
              >
                {item.q}
                <span className="text-muted ml-4 shrink-0">{open === i ? "−" : "+"}</span>
              </button>
            </dt>
            {open === i && (
              <dd className="px-5 pb-4 text-sm text-muted leading-relaxed">
                {item.a}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Pricing
      </h2>
      <p className="text-muted text-center mb-12 max-w-xl mx-auto">
        Free for early adopters. Premium template packs coming soon.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="bg-card-bg border border-green/40 rounded-lg p-8">
          <div className="text-xs text-green font-medium mb-2">FREE</div>
          <div className="text-3xl font-bold mb-1">$0</div>
          <div className="text-sm text-muted mb-6">First 100 users</div>
          <ul className="space-y-3 text-sm mb-8">
            {[
              "5 use-case templates",
              "Claude, GPT & Ollama support",
              "Permission breakdowns",
              "Version tracking",
              "Community support",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-green">✓</span> {f}
              </li>
            ))}
          </ul>
          <Link
            href="#templates"
            className="block text-center bg-green text-black font-semibold px-6 py-2.5 rounded-md hover:bg-green-dim transition-colors"
          >
            Get Started
          </Link>
        </div>
        <div className="bg-card-bg border border-card-border rounded-lg p-8">
          <div className="text-xs text-muted font-medium mb-2">PRO</div>
          <div className="text-3xl font-bold mb-1">$9.99</div>
          <div className="text-sm text-muted mb-6">One-time purchase</div>
          <ul className="space-y-3 text-sm mb-8">
            {[
              "Everything in Free",
              "20+ advanced templates",
              "Custom permission editor",
              "Auto-update configs",
              "Priority support",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-green">✓</span> {f}
              </li>
            ))}
          </ul>
          <button
            disabled
            className="block w-full text-center border border-card-border text-muted px-6 py-2.5 rounded-md cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
        Early Adopters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-card-bg border border-card-border rounded-lg p-6"
          >
            <p className="text-sm text-muted mb-4 leading-relaxed">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-dark text-green text-xs font-bold flex items-center justify-center">
                {t.avatar}
              </div>
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-card-border px-6 py-8 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span>© 2026 Safespace Templates</span>
        <div className="flex gap-6">
          <a href="https://github.com/agent-safespace/templates" className="hover:text-green transition-colors">
            GitHub
          </a>
          <Link href="#templates" className="hover:text-green transition-colors">
            Templates
          </Link>
          <Link href="#faq" className="hover:text-green transition-colors">
            FAQ
          </Link>
          <Link href="#pricing" className="hover:text-green transition-colors">
            Pricing
          </Link>
        </div>
      </div>
    </footer>
  );
}

function StructuredData() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <Nav />
      <Hero />
      <Templates />
      <PermissionCompare />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
