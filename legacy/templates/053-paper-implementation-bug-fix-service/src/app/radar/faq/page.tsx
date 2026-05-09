import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | Radar",
  description: "Frequently asked questions about Radar's paper implementation bug fix service.",
};

const faqs = [
  {
    q: "What kind of bugs do you fix?",
    a: "We specialize in bugs in ML paper implementations — code that attempts to replicate algorithms described in research papers. This includes tensor shape mismatches, incorrect loss functions, wrong mathematical operations, numerical instability, training divergence, architecture misalignment with the paper, and data pipeline issues.",
  },
  {
    q: "How do you diagnose the bug?",
    a: "We read the paper, trace through your code, and systematically compare every operation against the paper's description. We check shapes, gradients, intermediate outputs, and numerical properties. When the paper is ambiguous, we cross-reference with the original authors' code if available.",
  },
  {
    q: "What if you can't fix it?",
    a: "You don't pay. If we determine the bug is outside our scope (e.g., hardware issue, dataset problem, or the paper's results aren't reproducible), we'll tell you upfront during the consultation. If we accept the project and can't deliver, you owe nothing.",
  },
  {
    q: "What frameworks do you support?",
    a: "We primarily work with PyTorch and JAX, but also handle TensorFlow, Flax, and custom frameworks. If your implementation uses an unusual stack, mention it in the consultation and we'll assess.",
  },
  {
    q: "How do you handle confidential code?",
    a: "We sign NDAs before accessing any code. All work happens on encrypted systems. We delete your codebase after the project is complete (unless you request otherwise for ongoing support). We never share client code or details without explicit permission.",
  },
  {
    q: "Can you help with papers that don't have reference implementations?",
    a: "Yes. Some of our most valuable work involves papers where the only implementation is the client's own. We work directly from the paper to verify correctness.",
  },
  {
    q: "What's the turnaround time?",
    a: "Quick Fix: 1-2 days. Deep Diagnosis: 3-5 days. Full Pipeline Review: 1-2 weeks. These are typical timelines — we'll give you a specific estimate during consultation.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. We offer retainer agreements for teams that regularly implement research papers. This includes priority turnaround, a dedicated engineer, and bulk pricing. Contact us for details.",
  },
  {
    q: "How do revisions work?",
    a: "Each tier includes a set number of revision rounds. A revision means you've tested our fix and it doesn't fully resolve the issue. We'll investigate further and deliver an updated fix. Additional revisions beyond the included rounds are billed at $200/round.",
  },
  {
    q: "What do I need to provide?",
    a: "At minimum: (1) the paper you're implementing, (2) your codebase, (3) a description of expected vs. actual behavior, and (4) reproduction steps. The more context you provide, the faster we can diagnose.",
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
      <p className="text-muted mb-16">
        Everything you need to know about working with Radar.
      </p>

      <div className="space-y-8">
        {faqs.map((faq) => (
          <div key={faq.q} className="border-b border-border pb-8">
            <h2 className="text-base font-semibold mb-3">{faq.q}</h2>
            <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted mb-6">Still have questions?</p>
        <Link
          href="/radar/book"
          className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
        >
          Book a Consultation
        </Link>
      </div>
    </div>
  );
}
