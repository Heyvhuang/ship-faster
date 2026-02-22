import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample Digest",
  description:
    "Preview a real ResearchPulse weekly digest with healthcare AI research insights, regulatory signals, and competitor analysis.",
};

const digestItems = [
  {
    category: "Regulatory Signal",
    categoryColor: "bg-red-100 text-red-700",
    impact: 9,
    title: "FDA Issues Updated Framework for AI-Enabled Clinical Decision Support",
    authors: "U.S. Food and Drug Administration",
    source: "Federal Register",
    date: "Feb 14, 2026",
    summary:
      "The FDA released an updated framework distinguishing between clinical decision support (CDS) software that qualifies as a medical device and software that is exempt. Key change: AI/ML-based CDS that provides time-critical alerts will now require 510(k) clearance even if a clinician reviews the output.",
    actionItems: [
      "Review current CDS product classification against new criteria",
      "Assess whether any pipeline products need reclassification",
      "Submit comments by April 15, 2026 deadline",
    ],
  },
  {
    category: "Competitor Publication",
    categoryColor: "bg-amber-100 text-amber-700",
    impact: 8,
    title: "Large-Scale Validation of Foundation Model for Chest X-Ray Interpretation",
    authors: "Wang, J., Kumar, S., et al. — Google Health",
    source: "Nature Medicine",
    date: "Feb 12, 2026",
    summary:
      "Google Health published results from a 247,000-image multi-site validation study of their chest X-ray foundation model. The model achieved radiologist-level performance (AUC 0.974) across 14 pathologies in 23 hospital systems spanning 8 countries. Notably, the model showed consistent performance across patient demographics.",
    actionItems: [
      "Benchmark your radiology AI against reported metrics",
      "Note the multi-site validation approach for your own FDA submission strategy",
      "Monitor Google Health's regulatory filing timeline",
    ],
  },
  {
    category: "Patent Alert",
    categoryColor: "bg-purple-100 text-purple-700",
    impact: 7,
    title: "Tempus Labs Files Patent for Multi-Modal Cancer Biomarker Discovery Platform",
    authors: "Tempus Labs, Inc.",
    source: "USPTO Application #2026/0041523",
    date: "Feb 11, 2026",
    summary:
      "Tempus filed a patent application covering methods for integrating genomic, proteomic, and imaging data for automated biomarker discovery in oncology. The patent claims cover a broad range of multi-modal fusion architectures, potentially affecting companies developing similar integrated diagnostic platforms.",
    actionItems: [
      "Review patent claims for potential overlap with your IP",
      "Consult IP counsel about freedom-to-operate implications",
      "Document your prior art if applicable",
    ],
  },
  {
    category: "Emerging Trend",
    categoryColor: "bg-emerald-100 text-emerald-700",
    impact: 7,
    title: "Surge in Federated Learning Publications for Healthcare AI",
    authors: "ResearchPulse Trend Analysis",
    source: "arXiv + PubMed Aggregate",
    date: "Feb 10, 2026",
    summary:
      "Publication volume for federated learning in healthcare increased 340% year-over-year in January 2026. Three major themes: (1) privacy-preserving model training across hospital networks, (2) FDA-compliant distributed validation, and (3) cross-border data collaboration under GDPR. This trend signals growing demand for privacy-first AI training infrastructure.",
    actionItems: [
      "Evaluate federated learning capabilities for your product roadmap",
      "Identify potential hospital network partners for distributed validation",
      "Monitor European regulatory developments on cross-border health AI",
    ],
  },
  {
    category: "Market Opportunity",
    categoryColor: "bg-sky-100 text-sky-700",
    impact: 6,
    title: "CMS Proposes New Reimbursement Codes for AI-Assisted Diagnostics",
    authors: "Centers for Medicare & Medicaid Services",
    source: "CMS Proposed Rule CMS-1807-P",
    date: "Feb 8, 2026",
    summary:
      "CMS proposed three new CPT codes specifically for AI-assisted diagnostic interpretations in radiology and pathology. If finalized, this would create a direct reimbursement pathway for AI diagnostic tools, significantly improving the business case for hospital adoption of AI solutions.",
    actionItems: [
      "Map your products to proposed CPT codes",
      "Prepare health economics data to support reimbursement applications",
      "Engage with hospital customers about the reimbursement opportunity",
    ],
  },
  {
    category: "Competitor Publication",
    categoryColor: "bg-amber-100 text-amber-700",
    impact: 6,
    title: "PathAI Demonstrates AI-Guided Therapy Selection in Phase II Oncology Trial",
    authors: "Campanella, G., et al. — PathAI",
    source: "Journal of Clinical Oncology",
    date: "Feb 7, 2026",
    summary:
      "PathAI published Phase II results showing their AI system successfully predicted optimal therapy selection for non-small cell lung cancer with 82% concordance with molecular testing. The study enrolled 1,200 patients across 8 NCI-designated cancer centers, demonstrating clinical utility of computational pathology.",
    actionItems: [
      "Analyze PathAI's clinical evidence strategy for regulatory lessons",
      "Compare your clinical validation data against their benchmarks",
      "Note the NCI cancer center partnership model for your own trials",
    ],
  },
];

function ImpactBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${score >= 8 ? "bg-red-500" : score >= 6 ? "bg-amber-500" : "bg-blue-500"}`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-xs font-bold text-slate-600">{score}/10</span>
    </div>
  );
}

export default function DigestPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
              SAMPLE
            </span>
            <span className="text-xs text-slate-400">Week of February 7–14, 2026</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Healthcare AI Research Digest
          </h1>
          <p className="mt-3 text-slate-500">
            6 actionable findings from 2,847 papers scanned across arXiv, PubMed, and patent databases this week.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Regulatory Signal", "Competitor Alert", "Patent Filing", "Market Opportunity"].map((tag) => (
              <span key={tag} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {digestItems.map((item, i) => (
            <article
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-300">#{i + 1}</span>
                  <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${item.categoryColor}`}>
                    {item.category}
                  </span>
                </div>
                <div>
                  <span className="mr-2 text-xs text-slate-400">Business Impact</span>
                  <ImpactBar score={item.impact} />
                </div>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h2>
              <p className="mt-1 text-xs text-slate-400">
                {item.authors} · {item.source} · {item.date}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.summary}</p>
              <div className="mt-5 rounded-lg bg-blue-50 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Recommended Actions
                </h4>
                <ul className="mt-2 space-y-1">
                  {item.actionItems.map((action) => (
                    <li key={action} className="flex items-start gap-2 text-sm text-blue-900">
                      <span className="mt-1 text-blue-500">→</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-800 to-blue-900 p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold">Get Your Custom Digest</h2>
          <p className="mt-3 text-blue-200">
            This is a sample. Your digest will be tailored to your specific research areas, competitors, and regulatory concerns.
          </p>
          <Link
            href="/demo"
            className="mt-6 inline-block rounded-lg bg-sky-500 px-8 py-3 text-sm font-semibold text-white hover:bg-sky-400"
          >
            Request Your Free Sample
          </Link>
        </div>
      </section>
    </>
  );
}
