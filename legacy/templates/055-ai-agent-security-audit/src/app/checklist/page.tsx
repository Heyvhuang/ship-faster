import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Agent Security Checklist — AgentShield",
  description: "Free security checklist covering what gets tested in an AI agent security audit. Use this to harden your agents before launch.",
};

const categories = [
  {
    title: "Prompt Injection Defense",
    icon: "⚡",
    items: [
      { check: "System prompt is not extractable via direct instruction override", severity: "critical" as const },
      { check: "Agent resists 'ignore previous instructions' attacks", severity: "critical" as const },
      { check: "Multi-turn context manipulation doesn't bypass safety guidelines", severity: "high" as const },
      { check: "Indirect prompt injection via external content (URLs, documents) is blocked", severity: "critical" as const },
      { check: "Prompt injection via encoded/obfuscated text (base64, unicode) is detected", severity: "high" as const },
      { check: "Role-switching attacks ('pretend you are...') are handled", severity: "high" as const },
      { check: "Payload injection via few-shot examples is prevented", severity: "medium" as const },
      { check: "Agent maintains instruction hierarchy under adversarial pressure", severity: "critical" as const },
    ],
  },
  {
    title: "Data Leakage Prevention",
    icon: "🔍",
    items: [
      { check: "Training data cannot be extracted through targeted prompts", severity: "critical" as const },
      { check: "PII in conversation context is not exposed to unauthorized users", severity: "critical" as const },
      { check: "Internal business logic and rules are not revealed", severity: "high" as const },
      { check: "API keys, tokens, or credentials are never included in responses", severity: "critical" as const },
      { check: "Error messages don't expose internal architecture details", severity: "medium" as const },
      { check: "Conversation history from other users is not accessible", severity: "critical" as const },
      { check: "Model metadata (version, provider, fine-tuning details) is not leaked", severity: "low" as const },
    ],
  },
  {
    title: "Sandbox & Execution Security",
    icon: "🔒",
    items: [
      { check: "Code execution is sandboxed with no file system access", severity: "critical" as const },
      { check: "Network access from execution environment is restricted", severity: "critical" as const },
      { check: "Tool/function calls require explicit authorization", severity: "high" as const },
      { check: "Resource limits (CPU, memory, time) are enforced", severity: "high" as const },
      { check: "Escalation from agent tools to system-level access is impossible", severity: "critical" as const },
      { check: "External API calls made by agent are validated and allowlisted", severity: "high" as const },
    ],
  },
  {
    title: "Output Safety & Quality",
    icon: "📊",
    items: [
      { check: "Harmful or illegal content generation is blocked", severity: "critical" as const },
      { check: "Output is sanitized to prevent XSS when rendered in web UIs", severity: "high" as const },
      { check: "Agent doesn't generate convincing phishing content on request", severity: "high" as const },
      { check: "Hallucinated URLs, emails, or phone numbers are filtered", severity: "medium" as const },
      { check: "Response length limits prevent denial-of-service via verbose output", severity: "medium" as const },
      { check: "Agent gracefully handles unsupported languages and edge-case inputs", severity: "low" as const },
    ],
  },
  {
    title: "Authentication & Access Control",
    icon: "🔑",
    items: [
      { check: "Agent verifies user identity before performing sensitive actions", severity: "critical" as const },
      { check: "Rate limiting is enforced to prevent automated attacks", severity: "high" as const },
      { check: "Session isolation prevents cross-user data access", severity: "critical" as const },
      { check: "Admin/debug modes are not accessible to regular users", severity: "critical" as const },
      { check: "API authentication tokens are rotated regularly", severity: "medium" as const },
    ],
  },
];

const severityBadge = {
  critical: "bg-red-500/10 text-red-400 border-red-500/30",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  low: "bg-blue-500/10 text-blue-400 border-blue-500/30",
};

export default function ChecklistPage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mb-3 text-sm font-medium text-green-400">FREE RESOURCE</div>
          <h1 className="text-4xl font-bold text-white">AI Agent Security Checklist</h1>
          <p className="mt-4 text-lg text-slate-400">
            Everything we test during an audit. Use this checklist to evaluate your own agent&apos;s security posture.
          </p>
        </div>

        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat.title} className="rounded-xl border border-[#1e293b] bg-[#111827] overflow-hidden">
              <div className="border-b border-[#1e293b] bg-[#0f172a] px-6 py-4">
                <h2 className="flex items-center gap-3 text-lg font-semibold text-white">
                  <span>{cat.icon}</span>
                  {cat.title}
                  <span className="ml-auto text-sm font-normal text-slate-500">
                    {cat.items.length} checks
                  </span>
                </h2>
              </div>
              <div className="divide-y divide-[#1e293b]">
                {cat.items.map((item) => (
                  <div key={item.check} className="flex items-start gap-4 px-6 py-4">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#1e293b] bg-[#0a0f1a] text-xs text-slate-600">
                      □
                    </div>
                    <div className="flex-1 text-sm text-slate-300">{item.check}</div>
                    <span
                      className={`shrink-0 rounded border px-2 py-0.5 text-xs font-medium uppercase ${severityBadge[item.severity]}`}
                    >
                      {item.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-[#1e293b] bg-[#111827] p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Need help with this checklist?</h2>
          <p className="mt-3 text-slate-400">
            Our automated scanner tests all of these — and more — in under 24 hours.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500"
          >
            Get a Professional Audit
          </Link>
        </div>
      </div>
    </div>
  );
}
