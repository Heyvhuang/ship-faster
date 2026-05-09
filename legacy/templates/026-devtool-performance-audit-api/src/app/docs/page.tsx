import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation — CoreScope",
  description: "Get started with CoreScope CLI, API reference, and CI/CD integration guides.",
};

const endpoints = [
  {
    method: "POST",
    path: "/v1/builds",
    desc: "Upload build telemetry for analysis",
    params: [
      { name: "telemetry", type: "file", desc: "JSON or xctrace file from corescope wrap" },
      { name: "ci_provider", type: "string", desc: "github_actions | gitlab_ci | buildkite | xcode_cloud" },
      { name: "commit_sha", type: "string?", desc: "Git commit SHA for regression tracking" },
    ],
  },
  {
    method: "GET",
    path: "/v1/builds/:id",
    desc: "Get build analysis status and summary",
    params: [
      { name: "id", type: "path", desc: "Build ID returned from POST" },
    ],
  },
  {
    method: "GET",
    path: "/v1/builds/:id/recommendations",
    desc: "Get optimization recommendations",
    params: [
      { name: "id", type: "path", desc: "Build ID" },
      { name: "severity", type: "query?", desc: "Filter by severity: high | medium | low" },
    ],
  },
  {
    method: "GET",
    path: "/v1/builds/:id/flamegraph",
    desc: "Get annotated flame graph data",
    params: [
      { name: "id", type: "path", desc: "Build ID" },
      { name: "format", type: "query?", desc: "json (default) | svg" },
    ],
  },
  {
    method: "GET",
    path: "/v1/projects/:slug/regressions",
    desc: "Get build performance regressions across commits",
    params: [
      { name: "slug", type: "path", desc: "Project slug" },
      { name: "since", type: "query?", desc: "ISO 8601 date" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="pt-16">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-black md:text-4xl">Documentation</h1>
        <p className="mt-2 text-zinc-500">Everything you need to integrate CoreScope into your CI/CD pipeline.</p>

        {/* Quick Start */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-green-400">Quick Start</h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <h3 className="mb-2 text-sm font-semibold text-zinc-300">1. Install the CLI</h3>
              <pre className="overflow-x-auto text-sm text-green-400">$ brew install corescope/tap/corescope</pre>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <h3 className="mb-2 text-sm font-semibold text-zinc-300">2. Authenticate</h3>
              <pre className="overflow-x-auto text-sm text-green-400">$ corescope auth login</pre>
              <p className="mt-2 text-xs text-zinc-500">Opens browser for API key creation. Free tier includes 1 build.</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <h3 className="mb-2 text-sm font-semibold text-zinc-300">3. Profile a build</h3>
              <pre className="overflow-x-auto text-sm text-green-400">{`$ corescope wrap -- xcodebuild \\
  -project MyApp.xcodeproj \\
  -scheme MyApp \\
  -destination 'platform=iOS Simulator,name=iPhone 16' \\
  build`}</pre>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <h3 className="mb-2 text-sm font-semibold text-zinc-300">4. View report</h3>
              <pre className="overflow-x-auto text-sm text-green-400">{`$ corescope report
┌─────────────────────────┬──────────┬───────────┬──────────┐
│ Task                    │ Current  │ Suggested │ Severity │
├─────────────────────────┼──────────┼───────────┼──────────┤
│ Ld MyApp                │ P2       │ E0        │ 🔴 high  │
│ CompileAssetCatalog     │ P0       │ E1        │ 🔴 high  │
│ CopySwiftLibs           │ P1       │ E2        │ 🟡 med   │
│ CodeSign                │ P3       │ E0        │ 🟡 med   │
└─────────────────────────┴──────────┴───────────┴──────────┘
Estimated speedup: 39.4% · $1.84 saved/build`}</pre>
            </div>
          </div>
        </section>

        {/* CI/CD Integration */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-green-400">CI/CD Integration</h2>

          <div className="mt-6 space-y-6">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <h3 className="mb-3 text-sm font-semibold text-zinc-300">GitHub Actions</h3>
              <pre className="overflow-x-auto text-sm text-zinc-300">
{`# .github/workflows/build.yml
jobs:
  build:
    runs-on: macos-14  # Apple Silicon runner
    steps:
      - uses: actions/checkout@v4
      - uses: corescope/action@v1
        with:
          api-key: \${{ secrets.CORESCOPE_API_KEY }}
      - run: xcodebuild -scheme MyApp build
      # CoreScope automatically wraps and reports`}</pre>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
              <h3 className="mb-3 text-sm font-semibold text-zinc-300">Buildkite</h3>
              <pre className="overflow-x-auto text-sm text-zinc-300">
{`# .buildkite/pipeline.yml
steps:
  - label: ":xcode: Build"
    command: corescope wrap -- xcodebuild build
    plugins:
      - corescope/buildkite-plugin#v1.0:
          api_key_env: CORESCOPE_API_KEY`}</pre>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-green-400">API Reference</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Base URL: <code className="text-zinc-300">https://api.corescope.dev</code>
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Auth: <code className="text-zinc-300">Authorization: Bearer cs_live_...</code>
          </p>

          <div className="mt-6 space-y-6">
            {endpoints.map((ep) => (
              <div key={ep.path + ep.method} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
                <div className="flex items-center gap-3">
                  <span className={`rounded px-2 py-0.5 text-xs font-bold ${
                    ep.method === "POST" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"
                  }`}>
                    {ep.method}
                  </span>
                  <code className="text-sm text-zinc-200">{ep.path}</code>
                </div>
                <p className="mt-2 text-sm text-zinc-500">{ep.desc}</p>
                <div className="mt-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-zinc-600">
                        <th className="pb-1 pr-4">Parameter</th>
                        <th className="pb-1 pr-4">Type</th>
                        <th className="pb-1">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-zinc-400">
                      {ep.params.map((p) => (
                        <tr key={p.name} className="border-t border-zinc-800">
                          <td className="py-1.5 pr-4"><code className="text-green-400">{p.name}</code></td>
                          <td className="py-1.5 pr-4 text-zinc-600">{p.type}</td>
                          <td className="py-1.5">{p.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLI Reference */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-green-400">CLI Reference</h2>
          <div className="mt-4 space-y-3">
            {[
              { cmd: "corescope auth login", desc: "Authenticate with your API key" },
              { cmd: "corescope wrap -- <command>", desc: "Profile a build command" },
              { cmd: "corescope report [--format=json|table|yaml]", desc: "Display optimization report" },
              { cmd: "corescope compare <build1> <build2>", desc: "Compare two build profiles" },
              { cmd: "corescope watch --project=<slug>", desc: "Stream live core utilization during build" },
            ].map((item) => (
              <div key={item.cmd} className="flex flex-col gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
                <code className="text-sm text-green-400 sm:w-80 sm:shrink-0">{item.cmd}</code>
                <span className="text-sm text-zinc-500">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
