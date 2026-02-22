import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample Report",
  description: "View a sample ShieldWatch weekly security intelligence briefing showing vulnerable trending GitHub repositories.",
};

const findings = [
  {
    id: 1,
    repo: "quickserve-api",
    url: "github.com/example/quickserve-api",
    stars: "14.2k",
    forks: "2.1k",
    language: "Python",
    trending: "#3 Trending (Python)",
    severity: "Critical",
    severityColor: "text-critical bg-critical/10 border-critical/30",
    dotColor: "bg-critical",
    cvss: "9.8",
    cves: ["CVE-2025-31842", "CVE-2025-31843"],
    summary: "SQL injection vulnerability in the dynamic query builder allows unauthenticated attackers to extract arbitrary database contents. The ORM abstraction layer does not properly parameterize user-supplied filter conditions.",
    impact: "Full database read/write access. In fintech applications, this could expose transaction records, account balances, and PII. Healthcare deployments risk HIPAA violation through PHI exposure.",
    recommendation: "Do not adopt this library until maintainers release v2.4.0 with parameterized query support. If already in use, immediately audit all endpoints accepting user filter parameters.",
    affectedVersions: "v2.0.0 – v2.3.7",
  },
  {
    id: 2,
    repo: "react-dashboard-pro",
    url: "github.com/example/react-dashboard-pro",
    stars: "8.7k",
    forks: "1.4k",
    language: "TypeScript",
    trending: "#7 Trending (TypeScript)",
    severity: "High",
    severityColor: "text-high bg-high/10 border-high/30",
    dotColor: "bg-high",
    cvss: "7.5",
    cves: ["CVE-2025-28911"],
    summary: "Stored XSS through unsanitized SVG file uploads in the chart rendering component. Malicious SVG files can execute arbitrary JavaScript in the context of authenticated admin sessions.",
    impact: "Session hijacking of admin users. Attackers can steal authentication tokens and escalate privileges. Particularly dangerous in multi-tenant SaaS environments.",
    recommendation: "If evaluating this library, ensure SVG uploads are sanitized through DOMPurify or similar before rendering. Monitor GitHub issue #847 for official patch.",
    affectedVersions: "v3.1.0 – v3.5.2",
  },
  {
    id: 3,
    repo: "node-auth-utils",
    url: "github.com/example/node-auth-utils",
    stars: "5.2k",
    forks: "890",
    language: "JavaScript",
    trending: "#12 Trending (JavaScript)",
    severity: "Critical",
    severityColor: "text-critical bg-critical/10 border-critical/30",
    dotColor: "bg-critical",
    cvss: "9.1",
    cves: ["CVE-2025-33017", "CVE-2025-33018"],
    summary: "Hardcoded JWT secret key in default configuration and missing token expiry validation. Tokens generated with default settings never expire and use a publicly known signing key.",
    impact: "Complete authentication bypass. Any attacker can forge valid JWT tokens and impersonate any user, including administrators. Affects all deployments using default configuration.",
    recommendation: "Do not use this library. Recommend jsonwebtoken or jose as alternatives with proper defaults. If already deployed, immediately rotate all JWT secrets and enforce token expiry.",
    affectedVersions: "All versions (v1.0.0 – v4.2.1)",
  },
];

export default function SampleReportPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Report Header */}
      <div className="bg-surface border border-border rounded-xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-wide">Sample Intelligence Briefing</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">
              Weekly Threat Report
            </h1>
            <p className="text-foreground/50 text-sm mt-1">Week of February 17, 2026 — Fintech Vertical</p>
          </div>
          <div className="flex gap-3 text-sm">
            <div className="bg-critical/10 border border-critical/30 text-critical px-3 py-1.5 rounded-lg font-semibold">
              2 Critical
            </div>
            <div className="bg-high/10 border border-high/30 text-high px-3 py-1.5 rounded-lg font-semibold">
              1 High
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <h2 className="text-white font-semibold mb-2">Executive Summary</h2>
          <p className="text-foreground/60 text-sm leading-relaxed">
            This week&apos;s analysis of the top 50 trending GitHub repositories identified <strong className="text-critical">3 repositories with significant security vulnerabilities</strong> relevant to fintech organizations. Two findings are rated Critical with CVSS scores above 9.0, representing immediate risk if adopted. One trending authentication library contains a hardcoded secret that would allow complete authentication bypass in any deployment using default configuration. We recommend immediate team communication to prevent adoption of these repositories.
          </p>
        </div>
      </div>

      {/* Findings */}
      <div className="space-y-6">
        {findings.map((f) => (
          <div key={f.id} className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className={`px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${f.id === 1 || f.id === 3 ? "bg-critical/5" : "bg-high/5"}`}>
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${f.dotColor}`} />
                <span className="font-mono font-bold text-white text-lg">{f.repo}</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${f.severityColor}`}>
                  {f.severity} — CVSS {f.cvss}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-foreground/40">
                <span>{f.trending}</span>
                <span>{f.stars} stars</span>
                <span>{f.forks} forks</span>
              </div>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div>
                <h3 className="text-foreground/40 text-xs font-semibold uppercase tracking-wide mb-1">Vulnerability Details</h3>
                <p className="text-foreground/70 leading-relaxed">{f.summary}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {f.cves.map((c) => (
                    <span key={c} className="font-mono text-xs bg-background px-2 py-0.5 rounded border border-border text-foreground/50">{c}</span>
                  ))}
                  <span className="text-xs bg-background px-2 py-0.5 rounded border border-border text-foreground/50">
                    Affected: {f.affectedVersions}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-foreground/40 text-xs font-semibold uppercase tracking-wide mb-1">Business Impact</h3>
                <p className="text-foreground/70 leading-relaxed">{f.impact}</p>
              </div>
              <div>
                <h3 className="text-foreground/40 text-xs font-semibold uppercase tracking-wide mb-1">Recommendation</h3>
                <p className="text-foreground/70 leading-relaxed">{f.recommendation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Developer template */}
      <div className="bg-surface border border-border rounded-xl p-6 md:p-8 mt-8">
        <h2 className="text-white font-bold text-lg mb-4">Developer Communication Template</h2>
        <div className="bg-background rounded-lg p-4 border border-border font-mono text-xs text-foreground/60 leading-relaxed whitespace-pre-line">
{`Subject: [Security Advisory] Do Not Adopt These Trending Repositories

Team,

Our weekly security intelligence scan has identified the following trending GitHub repositories that contain known vulnerabilities. Please do not adopt or integrate these into any projects:

🔴 quickserve-api (Python) — SQL Injection (CVSS 9.8)
🔴 node-auth-utils (JavaScript) — Auth Bypass (CVSS 9.1)
🟠 react-dashboard-pro (TypeScript) — Stored XSS (CVSS 7.5)

If you have already integrated any of these libraries, please contact the security team immediately.

Full details are available in this week's threat briefing.

— Security Team`}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-foreground/50 mb-4">This is a sample report. Get a personalized briefing for your industry.</p>
        <Link
          href="/#signup"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Get Your Free Briefing
        </Link>
      </div>
    </div>
  );
}
