import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security Checklist",
  description:
    "Free AI agent security checklist covering prompt injection, data leakage, authorization, and sandbox escape vulnerabilities.",
};

const categories = [
  {
    title: "Prompt Injection Defense",
    icon: "🎯",
    items: [
      {
        check: "Input sanitization for known injection patterns",
        detail: "Filter inputs for phrases like 'ignore previous instructions', 'system prompt', and encoded variants.",
      },
      {
        check: "System prompt isolation from user input",
        detail: "Ensure the system prompt cannot be overridden or extracted through conversational manipulation.",
      },
      {
        check: "Multi-turn conversation attack resistance",
        detail: "Test for attacks that gradually shift context over multiple messages to bypass safety guardrails.",
      },
      {
        check: "Indirect injection via retrieved content",
        detail: "Validate that data fetched from databases, APIs, or documents cannot contain executable instructions.",
      },
      {
        check: "Encoding and obfuscation resistance",
        detail: "Test against base64, Unicode, leetspeak, and other encoding techniques used to bypass filters.",
      },
      {
        check: "Context window overflow protection",
        detail: "Implement input length limits and ensure system prompts are preserved regardless of conversation length.",
      },
      {
        check: "Role-play and hypothetical scenario guards",
        detail: "Prevent the agent from executing actions when framed as games, stories, or hypothetical situations.",
      },
    ],
  },
  {
    title: "Data Leakage Prevention",
    icon: "🔒",
    items: [
      {
        check: "System prompt confidentiality",
        detail: "Verify the agent never reveals its system prompt, internal instructions, or configuration details.",
      },
      {
        check: "PII output filtering",
        detail: "Monitor outputs for patterns matching emails, phone numbers, SSNs, credit cards, and other PII.",
      },
      {
        check: "Training data extraction resistance",
        detail: "Test whether the model can be coerced into reproducing memorized training data.",
      },
      {
        check: "Conversation log isolation",
        detail: "Ensure one user's conversation data cannot be accessed by another user through the agent.",
      },
      {
        check: "Internal tool and API exposure prevention",
        detail: "Verify the agent doesn't reveal available tools, API endpoints, or internal infrastructure details.",
      },
      {
        check: "Error message sanitization",
        detail: "Ensure error messages don't expose stack traces, database schemas, or internal system information.",
      },
    ],
  },
  {
    title: "Authorization & Access Control",
    icon: "🔐",
    items: [
      {
        check: "User identity verification before data access",
        detail: "Require proper authentication before the agent retrieves or modifies any user-specific data.",
      },
      {
        check: "Action authorization for sensitive operations",
        detail: "Implement confirmation flows for refunds, data deletion, account changes, and other critical actions.",
      },
      {
        check: "Privilege escalation prevention",
        detail: "Test that users cannot trick the agent into performing admin-level actions.",
      },
      {
        check: "Rate limiting on sensitive operations",
        detail: "Implement rate limits on data queries, transactions, and other operations that could be abused.",
      },
      {
        check: "Scope limitation for tool access",
        detail: "Ensure the agent can only use tools within its defined scope and cannot access unauthorized resources.",
      },
    ],
  },
  {
    title: "Sandbox & Execution Security",
    icon: "🛡️",
    items: [
      {
        check: "Code execution environment isolation",
        detail: "If the agent can execute code, verify it runs in a sandboxed environment with no host access.",
      },
      {
        check: "File system access restrictions",
        detail: "Ensure the agent cannot read, write, or traverse the host file system.",
      },
      {
        check: "Network access controls",
        detail: "Limit outbound network calls to pre-approved domains and block arbitrary HTTP requests.",
      },
      {
        check: "Tool chaining abuse prevention",
        detail: "Test that combining multiple tool calls cannot achieve unauthorized outcomes.",
      },
      {
        check: "Resource consumption limits",
        detail: "Implement timeouts, memory limits, and CPU constraints to prevent denial-of-service through the agent.",
      },
    ],
  },
  {
    title: "Monitoring & Incident Response",
    icon: "📊",
    items: [
      {
        check: "Anomaly detection on agent behavior",
        detail: "Monitor for unusual patterns like bulk data queries, repeated tool calls, or off-topic responses.",
      },
      {
        check: "Automated alerting for security events",
        detail: "Set up real-time alerts when potential attack patterns are detected in conversations.",
      },
      {
        check: "Audit logging of all agent actions",
        detail: "Log every tool call, data access, and external API interaction for forensic analysis.",
      },
      {
        check: "Kill switch for immediate agent shutdown",
        detail: "Implement the ability to immediately disable the agent if a security incident is detected.",
      },
    ],
  },
];

export default function Checklist() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/10 px-3 py-1 text-xs text-accent-green">
          Free Resource
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">
          AI Agent Security Checklist
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Use this checklist to evaluate your AI agent&apos;s security posture.
          Each item represents a test we run during our comprehensive security
          audit.
        </p>

        <div className="mt-12 space-y-10">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h2 className="mb-4 flex items-center gap-3 text-xl font-bold">
                <span className="text-2xl">{cat.icon}</span>
                {cat.title}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <div
                    key={item.check}
                    className="rounded-lg border border-card-border bg-card p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-card-border text-xs text-muted">
                        &nbsp;
                      </div>
                      <div>
                        <div className="font-medium">{item.check}</div>
                        <p className="mt-1 text-sm text-muted">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-accent-blue/30 bg-accent-blue/5 p-8 text-center">
          <h2 className="text-2xl font-bold">
            Want us to run this checklist for you?
          </h2>
          <p className="mt-3 text-muted">
            Our automated scanner tests all {categories.reduce((a, c) => a + c.items.length, 0)}+ checks plus additional attack vectors specific to your agent&apos;s configuration.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-accent-blue px-8 py-3 font-medium text-white transition hover:bg-accent-blue/90"
          >
            Get Your Free Audit
          </Link>
        </div>
      </div>
    </div>
  );
}
