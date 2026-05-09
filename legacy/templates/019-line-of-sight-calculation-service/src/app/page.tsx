"use client";

import Link from "next/link";
import { useState } from "react";

const MOCK_RESULT = {
  status: "success",
  calculation_id: "calc_8f3a2b1c",
  observer: { lat: 40.7484, lng: -73.9857, elevation_m: 443.2 },
  target: { lat: 40.7527, lng: -73.9772, elevation_m: 318.9 },
  line_of_sight: {
    clear: true,
    distance_km: 0.92,
    azimuth_deg: 38.4,
    elevation_angle_deg: -7.8,
    max_obstruction_m: 0,
  },
  optimal_viewpoints: [
    { lat: 40.749, lng: -73.985, elevation_m: 443.2, score: 0.98 },
    { lat: 40.7486, lng: -73.9862, elevation_m: 441.1, score: 0.95 },
    { lat: 40.7478, lng: -73.9851, elevation_m: 438.7, score: 0.91 },
  ],
  terrain_profile: { samples: 48, min_elevation_m: 12.3, max_elevation_m: 443.2 },
  cost_usd: 0.1,
};

function TerrainViz() {
  const points = [
    12, 14, 15, 18, 22, 35, 58, 95, 140, 200, 260, 320, 380, 420, 440, 443,
    443, 440, 430, 410, 380, 350, 320, 300, 290, 280, 275, 278, 285, 295, 300,
    305, 308, 310, 312, 315, 316, 317, 318, 318, 319, 319, 319, 318, 318, 318,
    318, 319,
  ];
  const max = 450;
  const w = 100;
  const h = 40;
  const pathD = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (p / max) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const fillD = `${pathD} L${w},${h} L0,${h} Z`;
  const losY1 = h - (443.2 / max) * h;
  const losY2 = h - (318.9 / max) * h;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="none">
      <defs>
        <linearGradient id="terrainGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#terrainGrad)" />
      <path d={pathD} fill="none" stroke="#22d3ee" strokeWidth="0.4" />
      <line x1="0" y1={losY1} x2={w} y2={losY2} stroke="#10b981" strokeWidth="0.3" strokeDasharray="1.5,1" />
      <circle cx="0" cy={losY1} r="1" fill="#22d3ee" />
      <circle cx={w} cy={losY2} r="1" fill="#10b981" />
    </svg>
  );
}

export default function Home() {
  const [observerLat, setObserverLat] = useState("40.7484");
  const [observerLng, setObserverLng] = useState("-73.9857");
  const [targetLat, setTargetLat] = useState("40.7527");
  const [targetLng, setTargetLng] = useState("-73.9772");
  const [result, setResult] = useState<typeof MOCK_RESULT | null>(null);
  const [loading, setLoading] = useState(false);

  const runDemo = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(MOCK_RESULT);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/5 px-4 py-1 text-xs font-medium text-accent">
            API-first line-of-sight analysis
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Precise <span className="text-accent">sight-line</span> calculations
            <br />
            via a simple API
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Elevation-aware terrain modeling and viewpoint optimization for
            photography, telecommunications, and real estate professionals.
            Pay only $0.10 per calculation.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/docs"
              className="rounded-lg bg-accent px-6 py-3 font-medium text-background hover:bg-accent/90 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-card-border px-6 py-3 font-medium text-foreground hover:bg-card transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Calculator */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold">Try the API</h2>
          <p className="mb-8 text-center text-muted">
            Enter coordinates and see the calculation in action
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input */}
            <div className="rounded-xl border border-card-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-accent uppercase tracking-wider">
                Request
              </h3>
              <div className="mb-4 rounded-lg bg-background p-4 font-mono text-sm">
                <span className="text-success">POST</span>{" "}
                <span className="text-muted">/api/v1/calculate</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-muted">Observer Lat</label>
                  <input
                    value={observerLat}
                    onChange={(e) => setObserverLat(e.target.value)}
                    className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm font-mono focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted">Observer Lng</label>
                  <input
                    value={observerLng}
                    onChange={(e) => setObserverLng(e.target.value)}
                    className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm font-mono focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted">Target Lat</label>
                  <input
                    value={targetLat}
                    onChange={(e) => setTargetLat(e.target.value)}
                    className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm font-mono focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted">Target Lng</label>
                  <input
                    value={targetLng}
                    onChange={(e) => setTargetLng(e.target.value)}
                    className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm font-mono focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={runDemo}
                disabled={loading}
                className="mt-4 w-full rounded-lg bg-accent py-2.5 font-medium text-background hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Calculating..." : "Run Calculation — $0.10"}
              </button>
            </div>

            {/* Output */}
            <div className="rounded-xl border border-card-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-accent uppercase tracking-wider">
                Response
              </h3>
              {result ? (
                <div className="overflow-auto rounded-lg bg-background p-4 font-mono text-xs leading-relaxed max-h-80">
                  <pre className="text-foreground/90">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-card-border text-sm text-muted">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                      Processing terrain data...
                    </div>
                  ) : (
                    "Run a calculation to see the response"
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Terrain visualization */}
          {result && (
            <div className="mt-6 rounded-xl border border-card-border bg-card p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">
                  Terrain Profile
                </h3>
                <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                  Clear line of sight
                </span>
              </div>
              <div className="h-32 md:h-48">
                <TerrainViz />
              </div>
              <div className="mt-3 flex justify-between text-xs text-muted">
                <span>Observer — 443.2m</span>
                <span>0.92 km</span>
                <span>Target — 318.9m</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-card-border px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-bold">Built for professionals</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Elevation-Aware",
                desc: "Integrates high-resolution terrain elevation data for accurate sight-line modeling across any distance.",
                icon: (
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-accent">
                    <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 3h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Viewpoint Optimization",
                desc: "Returns ranked optimal viewpoints with confidence scores so you pick the best position every time.",
                icon: (
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-accent">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                ),
              },
              {
                title: "Batch Processing",
                desc: "Submit up to 1,000 calculations per request. Ideal for telecom network planning and site surveys.",
                icon: (
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-accent">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ),
              },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-card-border bg-card p-6">
                <div className="mb-3">{f.icon}</div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-t border-card-border px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-bold">Who uses SightLine</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Photographers", desc: "Scout locations and optimize camera positions for landscape, real estate, and architectural photography." },
              { title: "Telecom Engineers", desc: "Plan antenna placements and verify signal paths between towers with terrain-aware calculations." },
              { title: "Film & Media", desc: "Find optimal filming positions for drone shots, location scouting, and venue sight-line planning." },
            ].map((u) => (
              <div key={u.title} className="rounded-xl border border-card-border bg-card/50 p-6">
                <h3 className="mb-2 font-semibold">{u.title}</h3>
                <p className="text-sm text-muted">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-card-border px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Start calculating in minutes</h2>
          <p className="mt-4 text-muted">
            Get your API key, make your first request, and pay only for what you use.
          </p>
          <Link
            href="/docs"
            className="mt-6 inline-block rounded-lg bg-accent px-8 py-3 font-medium text-background hover:bg-accent/90 transition-colors"
          >
            Get Your API Key
          </Link>
        </div>
      </section>
    </div>
  );
}
