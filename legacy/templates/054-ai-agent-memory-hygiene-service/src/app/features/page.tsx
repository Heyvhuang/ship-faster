import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features — MemoryGuard",
  description: "Explore MemoryGuard's PII detection, memory compression, GDPR workflows, and audit capabilities.",
};

const features = [
  {
    title: "Automatic PII Detection",
    desc: "ML-powered scanner identifies names, emails, phone numbers, SSNs, addresses, and more across all conversation history. Works on unstructured conversational text, not just tabular data.",
    details: ["Names & identifiers", "Email addresses", "Phone numbers", "Physical addresses", "SSN / national IDs", "Custom regex patterns"],
  },
  {
    title: "Memory Compression",
    desc: "Remove redundant context while preserving agent capabilities. Reduce token costs by 40-60% without degrading agent performance.",
    details: ["Semantic deduplication", "Context summarization", "Token cost reduction", "Performance preservation", "Configurable retention", "Before/after comparison"],
  },
  {
    title: "GDPR Deletion Workflow",
    desc: "One-click export, deletion, and compliance reporting. When a data subject requests deletion, find and remove every instance across all agent memory in seconds.",
    details: ["Subject access requests", "Right to erasure", "Data portability export", "Deletion certificates", "Cross-agent search", "Automated response"],
  },
  {
    title: "Custom PII Rules",
    desc: "Define what counts as sensitive for your industry. Healthcare, finance, and legal teams need different detection patterns.",
    details: ["Industry templates", "Custom regex builder", "Entity whitelisting", "Confidence thresholds", "False positive tuning", "Rule versioning"],
  },
  {
    title: "Scheduled Hygiene",
    desc: "Set daily, weekly, or monthly cleanup intervals. Configure different schedules per agent or memory source.",
    details: ["Cron-like scheduling", "Per-agent configuration", "Real-time monitoring", "Failure alerts", "Retry logic", "Run history"],
  },
  {
    title: "Audit Trail",
    desc: "Full logging of what was scrubbed, when, and why. Export audit-ready reports for compliance reviews and security assessments.",
    details: ["Immutable logs", "Compliance reports", "PDF/CSV export", "Retention policies", "Role-based access", "Search & filter"],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Features</h1>
              <p className="mt-4 text-lg text-muted">
                Everything you need to keep your AI agent memory clean, compliant, and cost-effective.
              </p>
            </div>

            <div className="space-y-16">
              {features.map((f, i) => (
                <div key={f.title} className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-3">{f.title}</h2>
                    <p className="text-muted leading-relaxed mb-4">{f.desc}</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {f.details.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-sm text-foreground">
                          <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 w-full bg-white rounded-xl border border-border p-6">
                    <div className="h-48 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary/30">{String(i + 1).padStart(2, "0")}</div>
                        <div className="text-sm text-muted mt-1">{f.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
              >
                Try it free — no credit card required
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
