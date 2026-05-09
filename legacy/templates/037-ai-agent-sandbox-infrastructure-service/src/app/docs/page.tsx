import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs — SandboxKit",
  description: "API reference and quickstart guide for SandboxKit AI agent sandboxes.",
};

export default function DocsPage() {
  return (
    <div className="pt-16">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-2 font-mono text-3xl font-bold md:text-4xl">Documentation</h1>
        <p className="mb-12 text-muted">Everything you need to get started with SandboxKit.</p>

        {/* Quickstart */}
        <section className="mb-16">
          <h2 className="mb-6 font-mono text-xl font-bold text-blue">Quickstart</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-mono text-sm font-semibold">1. Install the CLI</h3>
              <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm">
{`$ npm install -g @sandboxkit/cli
# or
$ curl -fsSL https://sandboxkit.dev/install.sh | sh`}
              </pre>
            </div>

            <div>
              <h3 className="mb-2 font-mono text-sm font-semibold">2. Authenticate</h3>
              <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm">
{`$ sandboxkit login
# Opens browser for authentication
✓ Logged in as dev@example.com`}
              </pre>
            </div>

            <div>
              <h3 className="mb-2 font-mono text-sm font-semibold">3. Deploy your agent</h3>
              <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm">
{`$ sandboxkit deploy agent.py
⠿ Provisioning sandbox...
✓ Sandbox sbx_a1b2c3d4 ready in 12.4s

$ sandboxkit logs sbx_a1b2c3d4 --follow`}
              </pre>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-16">
          <h2 className="mb-6 font-mono text-xl font-bold text-blue">REST API Reference</h2>
          <p className="mb-6 text-sm text-muted">
            Base URL: <code className="rounded bg-surface px-2 py-0.5 font-mono text-xs">https://api.sandboxkit.dev/v1</code>
          </p>

          <div className="space-y-8">
            {/* Create Sandbox */}
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-green/20 px-2 py-0.5 font-mono text-xs font-bold text-green">POST</span>
                <code className="font-mono text-sm">/sandboxes</code>
              </div>
              <p className="mb-4 text-sm text-muted">Create and start a new sandbox for your agent.</p>
              <h4 className="mb-2 font-mono text-xs font-semibold text-muted">REQUEST BODY</h4>
              <pre className="overflow-x-auto rounded border border-border bg-background p-3 font-mono text-xs">
{`{
  "name": "my-agent",
  "source": "base64-encoded-file-or-git-url",
  "runtime": "python3.12",
  "limits": {
    "cpu": 2,
    "memory_mb": 4096,
    "max_cost_usd": 5.00,
    "timeout_minutes": 60
  },
  "policy": "default"
}`}
              </pre>
              <h4 className="mb-2 mt-4 font-mono text-xs font-semibold text-muted">RESPONSE</h4>
              <pre className="overflow-x-auto rounded border border-border bg-background p-3 font-mono text-xs">
{`{
  "id": "sbx_a1b2c3d4",
  "status": "provisioning",
  "created_at": "2026-03-06T08:12:00Z",
  "url": "https://sbx-a1b2c3d4.sandboxkit.dev"
}`}
              </pre>
            </div>

            {/* List Sandboxes */}
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-blue/20 px-2 py-0.5 font-mono text-xs font-bold text-blue">GET</span>
                <code className="font-mono text-sm">/sandboxes</code>
              </div>
              <p className="mb-4 text-sm text-muted">List all sandboxes in your account.</p>
              <h4 className="mb-2 font-mono text-xs font-semibold text-muted">RESPONSE</h4>
              <pre className="overflow-x-auto rounded border border-border bg-background p-3 font-mono text-xs">
{`{
  "sandboxes": [
    {
      "id": "sbx_a1b2c3d4",
      "name": "my-agent",
      "status": "running",
      "cpu_usage": 0.45,
      "memory_usage_mb": 1200,
      "uptime_seconds": 3600
    }
  ]
}`}
              </pre>
            </div>

            {/* Get Logs */}
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-blue/20 px-2 py-0.5 font-mono text-xs font-bold text-blue">GET</span>
                <code className="font-mono text-sm">{"/sandboxes/{id}/logs"}</code>
              </div>
              <p className="mb-4 text-sm text-muted">Retrieve logs from a sandbox. Supports streaming via SSE.</p>
              <h4 className="mb-2 font-mono text-xs font-semibold text-muted">QUERY PARAMS</h4>
              <pre className="overflow-x-auto rounded border border-border bg-background p-3 font-mono text-xs">
{`?follow=true      # Stream logs via SSE
&tail=100         # Number of lines from end
&since=2026-03-06T08:00:00Z`}
              </pre>
            </div>

            {/* Stop Sandbox */}
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-[#f85149]/20 px-2 py-0.5 font-mono text-xs font-bold text-[#f85149]">DELETE</span>
                <code className="font-mono text-sm">{"/sandboxes/{id}"}</code>
              </div>
              <p className="mb-4 text-sm text-muted">Stop and destroy a sandbox. This action is irreversible.</p>
              <h4 className="mb-2 font-mono text-xs font-semibold text-muted">RESPONSE</h4>
              <pre className="overflow-x-auto rounded border border-border bg-background p-3 font-mono text-xs">
{`{
  "id": "sbx_a1b2c3d4",
  "status": "terminated",
  "terminated_at": "2026-03-06T09:12:00Z"
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* SDK */}
        <section className="mb-16">
          <h2 className="mb-6 font-mono text-xl font-bold text-blue">Python SDK</h2>
          <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm">
{`import sandboxkit

client = sandboxkit.Client(api_key="sk_live_...")

# Create a sandbox
sandbox = client.sandboxes.create(
    name="my-agent",
    source="./agent.py",
    runtime="python3.12",
    limits={"cpu": 2, "memory_mb": 4096},
)

print(f"Sandbox {sandbox.id} is {sandbox.status}")

# Stream logs
for line in sandbox.logs(follow=True):
    print(line)

# Stop when done
sandbox.stop()`}
          </pre>
        </section>

        {/* Security Policies */}
        <section>
          <h2 className="mb-6 font-mono text-xl font-bold text-blue">Security Policies</h2>
          <p className="mb-6 text-sm text-muted">
            Policies control what your agent can do inside the sandbox. The default policy is restrictive and secure.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-surface">
                <tr>
                  <th className="px-4 py-3 text-left font-mono text-xs font-semibold text-muted">Policy</th>
                  <th className="px-4 py-3 text-left font-mono text-xs font-semibold text-muted">Network</th>
                  <th className="px-4 py-3 text-left font-mono text-xs font-semibold text-muted">Filesystem</th>
                  <th className="px-4 py-3 text-left font-mono text-xs font-semibold text-muted">Syscalls</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-mono text-xs">default</td>
                  <td className="px-4 py-3 text-xs text-muted">No egress</td>
                  <td className="px-4 py-3 text-xs text-muted">Read-only (except /tmp)</td>
                  <td className="px-4 py-3 text-xs text-muted">Restricted</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-mono text-xs">relaxed</td>
                  <td className="px-4 py-3 text-xs text-muted">Allowlisted domains</td>
                  <td className="px-4 py-3 text-xs text-muted">Read-write in /workspace</td>
                  <td className="px-4 py-3 text-xs text-muted">Standard Linux</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">custom</td>
                  <td className="px-4 py-3 text-xs text-muted">User-defined rules</td>
                  <td className="px-4 py-3 text-xs text-muted">User-defined mounts</td>
                  <td className="px-4 py-3 text-xs text-muted">User-defined seccomp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
