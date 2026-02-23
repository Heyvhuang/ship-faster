const steps = [
  {
    step: "01",
    title: "Discovery & Scoping",
    description:
      "You share your AI agent architecture, messaging platform integrations, and access credentials. We map all data flows and identify potential attack surfaces.",
    details: [
      "Agent architecture review",
      "Integration point mapping",
      "Threat model development",
      "Attack surface identification",
    ],
  },
  {
    step: "02",
    title: "Penetration Testing",
    description:
      "Our team manually tests your AI agent using documented and novel attack vectors, focusing on data exfiltration through URL previews and messaging features.",
    details: [
      "Prompt injection testing",
      "URL preview exploitation",
      "Data exfiltration attempts",
      "Custom exploit development",
    ],
  },
  {
    step: "03",
    title: "Report & Remediation",
    description:
      "We deliver a detailed vulnerability report with proof-of-concept exploits, severity ratings, and implementation-ready remediation guidance.",
    details: [
      "Vulnerability disclosure report",
      "PoC exploit code",
      "Severity classification (CVSS)",
      "Remediation code examples",
    ],
  },
];

const sampleReport = {
  id: "AGSH-2025-0042",
  severity: "CRITICAL",
  cvss: "9.1",
  title: "Data Exfiltration via Slack URL Preview",
  affected: "CustomerBot v2.3 — Slack Integration",
  description:
    "The AI agent can be manipulated through indirect prompt injection to embed sensitive customer data within URLs. Slack's automatic link unfurling sends HTTP GET requests to attacker-controlled endpoints, exfiltrating data without user interaction.",
  impact:
    "Full exfiltration of any data accessible to the agent, including customer PII, internal documents, and API credentials.",
};

export default function Process() {
  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Our 3-Step Audit Methodology
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            A rigorous, repeatable process that uncovers vulnerabilities traditional security assessments miss.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((item, i) => (
            <div key={item.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-px bg-slate-300 -translate-x-1/2 z-0" />
              )}
              <div className="relative bg-white p-8 rounded-xl border border-slate-200 h-full">
                <div className="text-4xl font-bold text-red-accent/20">
                  {item.step}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-slate-500">
                      <svg className="w-4 h-4 text-red-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-slate-900 mb-4 text-center">
            Sample Vulnerability Report
          </h3>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <span className="font-mono text-sm text-slate-600">{sampleReport.id}</span>
              <span className="px-3 py-1 text-xs font-bold text-white bg-red-accent rounded-full">
                {sampleReport.severity} — CVSS {sampleReport.cvss}
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Vulnerability</div>
                <div className="mt-1 text-lg font-semibold text-slate-900">{sampleReport.title}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Affected Component</div>
                <div className="mt-1 text-sm text-slate-700 font-mono">{sampleReport.affected}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Description</div>
                <div className="mt-1 text-sm text-slate-600 leading-relaxed">{sampleReport.description}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Impact</div>
                <div className="mt-1 text-sm text-red-accent font-medium">{sampleReport.impact}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
