"use client";

import { useState } from "react";

type Finding = {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  remediation: string;
  category: string;
};

type ScanResult = {
  tool: string;
  riskScore: number;
  grade: string;
  findings: Finding[];
  permissions: string[];
  dataFlows: { from: string; to: string; risk: string }[];
};

const mockResult: ScanResult = {
  tool: "example-mcp-server",
  riskScore: 72,
  grade: "C",
  findings: [
    {
      id: "F001",
      severity: "critical",
      title: "Unrestricted Filesystem Read Access",
      description:
        "The tool registers a read_file capability with no path restrictions. Any file on the host system can be read, including /etc/shadow, SSH keys, and application secrets.",
      remediation:
        "Implement an allowlist of permitted directories. Use the MCP manifest 'paths' field to restrict filesystem access to specific directories.",
      category: "Data Exfiltration",
    },
    {
      id: "F002",
      severity: "critical",
      title: "External HTTP Requests with Sensitive Data",
      description:
        "Tool sends file contents to an external endpoint (api.analytics-svc.io) as part of a 'telemetry' feature. This could exfiltrate sensitive data read from local files.",
      remediation:
        "Remove or disable telemetry that transmits file contents. If analytics are needed, send only metadata (file size, type) and never file contents.",
      category: "Data Exfiltration",
    },
    {
      id: "F003",
      severity: "high",
      title: "Environment Variable Access Without Scoping",
      description:
        "process.env is accessed without restriction, exposing all environment variables including API keys, database credentials, and cloud provider tokens.",
      remediation:
        "Access only explicitly declared environment variables. Use the MCP manifest to declare required env vars.",
      category: "Permission Boundary",
    },
    {
      id: "F004",
      severity: "high",
      title: "Missing Input Validation on Tool Parameters",
      description:
        "Tool parameters are passed directly to shell commands without sanitization, enabling command injection through crafted MCP tool calls.",
      remediation:
        "Sanitize all input parameters. Use parameterized commands instead of string interpolation for shell execution.",
      category: "Prompt Injection",
    },
    {
      id: "F005",
      severity: "medium",
      title: "Overly Broad Manifest Permissions",
      description:
        'Manifest declares "permissions": ["*"] granting unrestricted access to all MCP capabilities. Most tools require only 2-3 specific permissions.',
      remediation:
        "Apply principle of least privilege. Replace wildcard with specific permissions: [\"files:read\", \"files:write:/tmp\"].",
      category: "Manifest Config",
    },
    {
      id: "F006",
      severity: "low",
      title: "No Version Pinning in Dependencies",
      description:
        "Package dependencies use ^ ranges allowing automatic minor version updates. This increases supply chain attack surface.",
      remediation:
        "Pin exact dependency versions. Use lockfile integrity checks in CI/CD.",
      category: "Supply Chain",
    },
  ],
  permissions: [
    "files:read (unrestricted)",
    "files:write (/tmp, /var/log)",
    "network:outbound (*.analytics-svc.io)",
    "env:read (all)",
    "process:exec (sh, bash)",
  ],
  dataFlows: [
    { from: "Local filesystem", to: "Tool memory", risk: "high" },
    { from: "Tool memory", to: "api.analytics-svc.io", risk: "critical" },
    { from: "Environment vars", to: "Tool config", risk: "high" },
    { from: "User input", to: "Shell exec", risk: "high" },
  ],
};

const sevStyles = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  high: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const riskFlowColors: Record<string, string> = {
  critical: "text-red-400",
  high: "text-orange-400",
  medium: "text-yellow-400",
  low: "text-blue-400",
};

function gradeColor(grade: string) {
  if (grade === "A") return "text-emerald-400";
  if (grade === "B") return "text-green-400";
  if (grade === "C") return "text-yellow-400";
  if (grade === "D") return "text-orange-400";
  return "text-red-400";
}

export default function ScannerPage() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);

  function handleScan() {
    if (!url.trim()) return;
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult({ ...mockResult, tool: url.split("/").pop() || "mcp-tool" });
    }, 2500);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">MCP Tool Scanner</h1>
        <p className="text-slate-400">
          Enter a repository URL or MCP tool identifier to start a security audit.
        </p>
      </div>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/org/mcp-tool or @scope/mcp-tool"
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 font-mono"
          onKeyDown={(e) => e.key === "Enter" && handleScan()}
        />
        <button
          onClick={handleScan}
          disabled={scanning || !url.trim()}
          className="rounded-lg bg-emerald-600 px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {scanning ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Scanning...
            </span>
          ) : (
            "Run Scan"
          )}
        </button>
      </div>

      {/* Scanning animation */}
      {scanning && (
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-12 text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <svg className="animate-spin h-8 w-8 text-emerald-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Scanning MCP Tool</h3>
          <p className="text-sm text-slate-400">Analyzing permissions, data flows, and manifest configuration...</p>
          <div className="mt-6 space-y-2 max-w-md mx-auto text-left">
            {["Fetching manifest...", "Analyzing permission scopes...", "Tracing data flows...", "Checking supply chain..."].map((step, i) => (
              <div key={step} className="flex items-center gap-2 text-sm text-slate-500">
                <svg className={`h-3 w-3 ${i < 2 ? "text-emerald-400" : "text-slate-600"}`} fill="currentColor" viewBox="0 0 20 20">
                  {i < 2 ? (
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  ) : (
                    <circle cx="10" cy="10" r="3" />
                  )}
                </svg>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Overview */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center">
              <p className="text-sm text-slate-400 mb-2">Risk Score</p>
              <p className="text-5xl font-bold text-white">{result.riskScore}</p>
              <p className="text-xs text-slate-500 mt-1">out of 100 (lower is better)</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center">
              <p className="text-sm text-slate-400 mb-2">Security Grade</p>
              <p className={`text-5xl font-bold ${gradeColor(result.grade)}`}>{result.grade}</p>
              <p className="text-xs text-slate-500 mt-1">Not recommended for production</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center">
              <p className="text-sm text-slate-400 mb-2">Findings</p>
              <p className="text-5xl font-bold text-white">{result.findings.length}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-xs text-red-400">{result.findings.filter((f) => f.severity === "critical").length} critical</span>
                <span className="text-xs text-slate-600">&middot;</span>
                <span className="text-xs text-orange-400">{result.findings.filter((f) => f.severity === "high").length} high</span>
              </div>
            </div>
          </div>

          {/* Permissions & Data Flows side by side */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-base font-semibold text-white mb-4">Detected Permissions</h3>
              <ul className="space-y-2">
                {result.permissions.map((perm) => (
                  <li key={perm} className="flex items-start gap-2 text-sm">
                    <svg className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <code className="text-slate-300 font-mono text-xs">{perm}</code>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-base font-semibold text-white mb-4">Data Flow Analysis</h3>
              <div className="space-y-3">
                {result.dataFlows.map((flow, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-slate-300 font-mono text-xs">{flow.from}</span>
                    <svg className={`h-4 w-4 shrink-0 ${riskFlowColors[flow.risk]}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-slate-300 font-mono text-xs">{flow.to}</span>
                    <span className={`ml-auto rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${sevStyles[flow.risk as keyof typeof sevStyles]}`}>
                      {flow.risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Findings */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
            <h3 className="text-base font-semibold text-white mb-4">Security Findings</h3>
            <div className="space-y-3">
              {result.findings.map((f) => (
                <div
                  key={f.id}
                  className="rounded-lg border border-white/5 bg-white/[0.02] overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFinding(expandedFinding === f.id ? null : f.id)}
                    className="flex w-full items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium ${sevStyles[f.severity]}`}>
                      {f.severity}
                    </span>
                    <span className="text-sm font-medium text-white flex-1">{f.title}</span>
                    <span className="text-xs text-slate-500 hidden sm:block">{f.category}</span>
                    <svg className={`h-4 w-4 text-slate-500 transition-transform ${expandedFinding === f.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFinding === f.id && (
                    <div className="border-t border-white/5 p-4 space-y-3">
                      <div>
                        <p className="text-xs font-medium text-slate-400 mb-1">Description</p>
                        <p className="text-sm text-slate-300">{f.description}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-emerald-400 mb-1">Remediation</p>
                        <p className="text-sm text-slate-300">{f.remediation}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Export */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors">
              Export PDF Report
            </button>
            <button className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 transition-colors">
              Export JSON
            </button>
            <button className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10 transition-colors">
              Schedule Re-scan
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!scanning && !result && (
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-16 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/5 border border-white/10 mb-4">
            <svg width="28" height="28" fill="none" stroke="#64748b" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Ready to scan</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Enter a repository URL or MCP tool package name above to start a security audit.
            Try <button onClick={() => setUrl("https://github.com/example/filesystem-mcp-server")} className="text-emerald-400 hover:underline">an example</button>.
          </p>
        </div>
      )}
    </div>
  );
}
