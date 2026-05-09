import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: "API reference and guides for the SightLine line-of-sight calculation API.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-background border border-card-border p-4 text-sm font-mono leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

function SectionCard({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b border-card-border">{title}</h2>
      {children}
    </section>
  );
}

export default function DocsPage() {
  return (
    <div className="pt-20 px-6">
      <div className="mx-auto max-w-5xl py-12">
        <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
        <p className="text-muted mb-10">
          Everything you need to integrate SightLine into your application.
        </p>

        <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
          {/* Sidebar */}
          <nav className="hidden lg:block sticky top-24 self-start space-y-2 text-sm">
            {["authentication", "calculate", "batch", "response", "errors", "limits"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="block text-muted hover:text-foreground capitalize transition-colors"
              >
                {s === "calculate" ? "Single Calculation" : s === "batch" ? "Batch Calculations" : s === "response" ? "Response Format" : s === "limits" ? "Rate Limits" : s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
          </nav>

          {/* Content */}
          <div className="space-y-12">
            <SectionCard id="authentication" title="Authentication">
              <p className="text-sm text-muted mb-4">
                All API requests require a Bearer token. Include your API key in the Authorization header.
              </p>
              <CodeBlock>{`curl https://api.sightline.dev/v1/calculate \\
  -H "Authorization: Bearer sl_live_abc123def456" \\
  -H "Content-Type: application/json"`}</CodeBlock>
              <div className="mt-4 rounded-lg bg-accent/5 border border-accent/20 p-4 text-sm">
                <strong className="text-accent">Getting your API key:</strong>{" "}
                <span className="text-muted">
                  Sign up at sightline.dev/signup, add a payment method, and your key will be generated immediately. You get 10 free calculations to start.
                </span>
              </div>
            </SectionCard>

            <SectionCard id="calculate" title="Single Calculation">
              <p className="text-sm text-muted mb-4">
                Calculate line-of-sight between an observer point and a target point.
              </p>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-success/20 px-2 py-0.5 text-xs font-mono font-bold text-success">POST</span>
                <span className="font-mono text-sm">/v1/calculate</span>
              </div>
              <CodeBlock>{`{
  "observer": {
    "lat": 40.7484,
    "lng": -73.9857
  },
  "target": {
    "lat": 40.7527,
    "lng": -73.9772
  },
  "options": {
    "optimize_viewpoint": true,
    "num_viewpoints": 3,
    "include_terrain_profile": true
  }
}`}</CodeBlock>
              <h3 className="mt-6 mb-3 font-semibold text-sm">Parameters</h3>
              <div className="overflow-hidden rounded-lg border border-card-border">
                <table className="w-full text-sm">
                  <thead className="bg-card">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-muted">Field</th>
                      <th className="px-4 py-2 text-left font-medium text-muted">Type</th>
                      <th className="px-4 py-2 text-left font-medium text-muted">Required</th>
                      <th className="px-4 py-2 text-left font-medium text-muted">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["observer", "object", "Yes", "Observer location with lat/lng"],
                      ["target", "object", "Yes", "Target location with lat/lng"],
                      ["observer.lat", "number", "Yes", "Latitude (-90 to 90)"],
                      ["observer.lng", "number", "Yes", "Longitude (-180 to 180)"],
                      ["options.optimize_viewpoint", "boolean", "No", "Return optimal viewpoints (default: false)"],
                      ["options.num_viewpoints", "integer", "No", "Number of viewpoints to return (1-10, default: 3)"],
                      ["options.include_terrain_profile", "boolean", "No", "Include terrain elevation samples (default: false)"],
                    ].map(([field, type, req, desc]) => (
                      <tr key={field} className="border-t border-card-border">
                        <td className="px-4 py-2 font-mono text-xs">{field}</td>
                        <td className="px-4 py-2 text-muted">{type}</td>
                        <td className="px-4 py-2">{req}</td>
                        <td className="px-4 py-2 text-muted">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard id="batch" title="Batch Calculations">
              <p className="text-sm text-muted mb-4">
                Submit multiple calculations in a single request. Batches of 100+ pairs automatically receive the discounted rate of $0.08 per calculation.
              </p>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-success/20 px-2 py-0.5 text-xs font-mono font-bold text-success">POST</span>
                <span className="font-mono text-sm">/v1/batch</span>
              </div>
              <CodeBlock>{`{
  "calculations": [
    {
      "observer": { "lat": 40.7484, "lng": -73.9857 },
      "target": { "lat": 40.7527, "lng": -73.9772 }
    },
    {
      "observer": { "lat": 34.0522, "lng": -118.2437 },
      "target": { "lat": 34.0195, "lng": -118.4912 }
    }
  ],
  "options": {
    "optimize_viewpoint": true
  }
}`}</CodeBlock>
            </SectionCard>

            <SectionCard id="response" title="Response Format">
              <p className="text-sm text-muted mb-4">
                All successful responses return a JSON object with the following structure:
              </p>
              <CodeBlock>{`{
  "status": "success",
  "calculation_id": "calc_8f3a2b1c",
  "observer": {
    "lat": 40.7484,
    "lng": -73.9857,
    "elevation_m": 443.2
  },
  "target": {
    "lat": 40.7527,
    "lng": -73.9772,
    "elevation_m": 318.9
  },
  "line_of_sight": {
    "clear": true,
    "distance_km": 0.92,
    "azimuth_deg": 38.4,
    "elevation_angle_deg": -7.8,
    "max_obstruction_m": 0
  },
  "optimal_viewpoints": [
    {
      "lat": 40.749,
      "lng": -73.985,
      "elevation_m": 443.2,
      "score": 0.98
    }
  ],
  "terrain_profile": {
    "samples": 48,
    "min_elevation_m": 12.3,
    "max_elevation_m": 443.2
  },
  "cost_usd": 0.10
}`}</CodeBlock>
            </SectionCard>

            <SectionCard id="errors" title="Errors">
              <p className="text-sm text-muted mb-4">
                Errors return standard HTTP status codes with a JSON body:
              </p>
              <CodeBlock>{`{
  "status": "error",
  "code": "INVALID_COORDINATES",
  "message": "Latitude must be between -90 and 90"
}`}</CodeBlock>
              <div className="mt-4 overflow-hidden rounded-lg border border-card-border">
                <table className="w-full text-sm">
                  <thead className="bg-card">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-muted">HTTP Code</th>
                      <th className="px-4 py-2 text-left font-medium text-muted">Error Code</th>
                      <th className="px-4 py-2 text-left font-medium text-muted">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["400", "INVALID_COORDINATES", "Coordinates out of range"],
                      ["401", "UNAUTHORIZED", "Missing or invalid API key"],
                      ["402", "PAYMENT_REQUIRED", "No valid payment method on file"],
                      ["429", "RATE_LIMITED", "Too many requests"],
                      ["500", "CALCULATION_ERROR", "Internal calculation failure"],
                    ].map(([code, name, desc]) => (
                      <tr key={code} className="border-t border-card-border">
                        <td className="px-4 py-2 font-mono">{code}</td>
                        <td className="px-4 py-2 font-mono text-xs text-danger">{name}</td>
                        <td className="px-4 py-2 text-muted">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard id="limits" title="Rate Limits">
              <p className="text-sm text-muted mb-4">
                Rate limits are applied per API key:
              </p>
              <div className="overflow-hidden rounded-lg border border-card-border">
                <table className="w-full text-sm">
                  <thead className="bg-card">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-muted">Endpoint</th>
                      <th className="px-4 py-2 text-left font-medium text-muted">Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["/v1/calculate", "60 requests / minute"],
                      ["/v1/batch", "10 requests / minute"],
                    ].map(([ep, limit]) => (
                      <tr key={ep} className="border-t border-card-border">
                        <td className="px-4 py-2 font-mono text-xs">{ep}</td>
                        <td className="px-4 py-2 text-muted">{limit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-muted">
                Rate limit headers are included in every response:{" "}
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border border-card-border">X-RateLimit-Remaining</code>,{" "}
                <code className="text-xs bg-background px-1.5 py-0.5 rounded border border-card-border">X-RateLimit-Reset</code>.
              </p>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
