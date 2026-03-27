"use client";
import { useState } from "react";

const faqs = [
  {
    q: "How does PromptFlow analyze my team's prompts?",
    a: "PromptFlow integrates with your IDE (VS Code, PyCharm, Cursor) and captures prompt-to-output data. We score each prompt on efficiency, specificity, and success rate, then surface patterns across your team.",
  },
  {
    q: "What languages and frameworks are supported?",
    a: "We're optimized for Python teams using Django, Flask, and FastAPI. Our template library covers models, views, API endpoints, tests, migrations, and CLI tools. JavaScript/TypeScript support is on the roadmap.",
  },
  {
    q: "How long until we see results?",
    a: "Most teams see measurable improvement within 2 weeks. The initial audit takes 5 minutes to set up, and the system needs about 2 weeks of prompt data to generate meaningful recommendations.",
  },
  {
    q: "Is my team's code or prompt data shared?",
    a: "No. Prompt data is analyzed in aggregate and never leaves your workspace. We score patterns, not content. You can self-host the analysis engine on Enterprise plans.",
  },
  {
    q: "What if we use multiple AI coding tools?",
    a: "PromptFlow works across tools — GPT-4, Claude, Copilot, Cursor, and others. We normalize prompt patterns across providers so you can compare efficiency regardless of which model your team uses.",
  },
  {
    q: "How do I prove ROI to my engineering manager?",
    a: "The Team dashboard includes exportable before/after reports showing time saved per developer, prompt success rate improvements, and estimated cost savings — ready to share with leadership.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <dl className="divide-y divide-card-border">
        {faqs.map((faq, i) => (
          <div key={i} className="py-4">
            <dt>
              <button
                className="flex w-full items-center justify-between text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-medium">{faq.q}</span>
                <svg
                  className={`w-5 h-5 shrink-0 text-muted transition-transform ${open === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </dt>
            {open === i && (
              <dd className="mt-2 text-sm text-muted leading-relaxed">
                {faq.a}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
