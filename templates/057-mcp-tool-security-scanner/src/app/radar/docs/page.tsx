export default function DocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-12">
        <p className="text-sm font-medium text-emerald-400 mb-2">API Documentation</p>
        <h1 className="text-3xl font-bold text-white md:text-4xl mb-4">
          MCP Radar API
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Integrate MCP security scanning into your CI/CD pipeline, internal tools, or security dashboards.
          Available on Team and Enterprise plans.
        </p>
      </div>

      <div className="space-y-12">
        {/* Auth */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Authentication</h2>
          <p className="text-sm text-slate-400 mb-4">
            All API requests require a Bearer token. Obtain your API key from the dashboard settings.
          </p>
          <pre className="rounded-lg border border-white/5 bg-[#060a14] p-4 text-sm text-slate-300 font-mono overflow-x-auto">
{`curl -H "Authorization: Bearer mcpr_sk_live_..." \\
  https://api.mcpradar.com/v1/scans`}
          </pre>
        </section>

        {/* Create Scan */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-1">Create Scan</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-mono text-emerald-400">POST</span>
            <code className="text-sm text-slate-300 font-mono">/v1/scans</code>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Submit an MCP tool for security scanning. Returns a scan ID for polling results.
          </p>
          <h3 className="text-sm font-semibold text-white mb-2">Request Body</h3>
          <pre className="rounded-lg border border-white/5 bg-[#060a14] p-4 text-sm text-slate-300 font-mono overflow-x-auto mb-4">
{`{
  "source": "https://github.com/org/mcp-tool",
  "type": "repository",  // "repository" | "manifest" | "package"
  "options": {
    "depth": "full",      // "quick" | "standard" | "full"
    "policy": "default"   // custom policy ID (Enterprise)
  }
}`}
          </pre>
          <h3 className="text-sm font-semibold text-white mb-2">Response</h3>
          <pre className="rounded-lg border border-white/5 bg-[#060a14] p-4 text-sm text-slate-300 font-mono overflow-x-auto">
{`{
  "id": "scan_abc123",
  "status": "pending",
  "created_at": "2026-03-30T12:00:00Z",
  "estimated_duration_seconds": 180
}`}
          </pre>
        </section>

        {/* Get Scan */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-1">Get Scan Results</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="rounded bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-xs font-mono text-blue-400">GET</span>
            <code className="text-sm text-slate-300 font-mono">/v1/scans/:scan_id</code>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Retrieve scan results. Poll until status is &quot;completed&quot; or &quot;failed&quot;.
          </p>
          <pre className="rounded-lg border border-white/5 bg-[#060a14] p-4 text-sm text-slate-300 font-mono overflow-x-auto">
{`{
  "id": "scan_abc123",
  "status": "completed",
  "tool": "example-mcp-server",
  "risk_score": 72,
  "grade": "C",
  "findings_count": 6,
  "findings": [
    {
      "id": "F001",
      "severity": "critical",
      "title": "Unrestricted Filesystem Read Access",
      "category": "Data Exfiltration",
      "description": "...",
      "remediation": "..."
    }
  ],
  "permissions": ["files:read", "network:outbound", "env:read"],
  "report_url": "https://api.mcpradar.com/v1/scans/scan_abc123/report.pdf"
}`}
          </pre>
        </section>

        {/* List Scans */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-1">List Scans</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="rounded bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-xs font-mono text-blue-400">GET</span>
            <code className="text-sm text-slate-300 font-mono">/v1/scans?page=1&limit=20</code>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            List all scans for your organization, sorted by most recent.
          </p>
          <pre className="rounded-lg border border-white/5 bg-[#060a14] p-4 text-sm text-slate-300 font-mono overflow-x-auto">
{`{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 47
  }
}`}
          </pre>
        </section>

        {/* Webhooks */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Webhooks</h2>
          <p className="text-sm text-slate-400 mb-4">
            Configure webhooks to receive scan completion events. Set your webhook URL in dashboard settings.
          </p>
          <pre className="rounded-lg border border-white/5 bg-[#060a14] p-4 text-sm text-slate-300 font-mono overflow-x-auto">
{`// POST to your webhook URL
{
  "event": "scan.completed",
  "scan_id": "scan_abc123",
  "risk_score": 72,
  "grade": "C",
  "critical_count": 2,
  "passed": false
}`}
          </pre>
        </section>

        {/* CI/CD */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">CI/CD Integration</h2>
          <p className="text-sm text-slate-400 mb-4">
            Add MCP Radar to your GitHub Actions workflow to block deployments with critical findings.
          </p>
          <pre className="rounded-lg border border-white/5 bg-[#060a14] p-4 text-sm text-slate-300 font-mono overflow-x-auto">
{`# .github/workflows/mcp-security.yml
name: MCP Security Scan
on:
  pull_request:
    paths:
      - 'mcp-tools/**'

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run MCP Radar Scan
        uses: mcpradar/scan-action@v1
        with:
          api-key: \${{ secrets.MCP_RADAR_API_KEY }}
          manifest: ./mcp-tools/manifest.json
          fail-on: critical  # "critical" | "high" | "medium"
`}
          </pre>
        </section>

        {/* Rate Limits */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Rate Limits</h2>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Plan</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Rate Limit</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Concurrent Scans</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3">Team</td>
                  <td className="px-4 py-3">100 req/min</td>
                  <td className="px-4 py-3">5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Enterprise</td>
                  <td className="px-4 py-3">1,000 req/min</td>
                  <td className="px-4 py-3">50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
