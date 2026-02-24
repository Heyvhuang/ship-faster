"use client";

import { useState } from "react";

const DEMO_SCENARIOS = [
  {
    name: "NYC: Empire State → Chrysler Building",
    observer: { lat: 40.7484, lng: -73.9857 },
    target: { lat: 40.7516, lng: -73.9755 },
    result: {
      clear: true,
      distance_km: 1.12,
      azimuth_deg: 52.3,
      elevation_angle_deg: -3.1,
      observer_elevation: 443.2,
      target_elevation: 318.9,
      max_obstruction: 0,
      viewpoints: [
        { lat: 40.749, lng: -73.985, score: 0.98 },
        { lat: 40.7486, lng: -73.9862, score: 0.95 },
        { lat: 40.7478, lng: -73.9851, score: 0.91 },
      ],
      terrain: [12, 14, 18, 35, 95, 200, 320, 420, 443, 443, 440, 410, 350, 300, 285, 305, 315, 318, 319],
    },
  },
  {
    name: "SF: Twin Peaks → Golden Gate Bridge",
    observer: { lat: 37.7544, lng: -122.4477 },
    target: { lat: 37.8199, lng: -122.4783 },
    result: {
      clear: true,
      distance_km: 7.41,
      azimuth_deg: 339.8,
      elevation_angle_deg: -2.8,
      observer_elevation: 282.0,
      target_elevation: 67.1,
      max_obstruction: 0,
      viewpoints: [
        { lat: 37.7546, lng: -122.4475, score: 0.96 },
        { lat: 37.7541, lng: -122.448, score: 0.93 },
      ],
      terrain: [282, 275, 260, 230, 190, 140, 95, 60, 35, 15, 8, 5, 4, 5, 8, 20, 45, 60, 67],
    },
  },
  {
    name: "LA: Griffith Observatory → Downtown",
    observer: { lat: 34.1184, lng: -118.3004 },
    target: { lat: 34.0522, lng: -118.2437 },
    result: {
      clear: false,
      distance_km: 8.92,
      azimuth_deg: 147.2,
      elevation_angle_deg: -4.1,
      observer_elevation: 346.0,
      target_elevation: 89.0,
      max_obstruction: 42,
      viewpoints: [
        { lat: 34.1186, lng: -118.3001, score: 0.88 },
        { lat: 34.119, lng: -118.2998, score: 0.82 },
      ],
      terrain: [346, 340, 310, 265, 200, 145, 120, 110, 105, 115, 130, 125, 110, 100, 95, 92, 90, 89, 89],
    },
  },
];

function TerrainChart({ data, clear }: { data: number[]; clear: boolean }) {
  const max = Math.max(...data) * 1.1;
  const w = 100;
  const h = 40;
  const pathD = data
    .map((p, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - (p / max) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const fillD = `${pathD} L${w},${h} L0,${h} Z`;
  const y1 = h - (data[0] / max) * h;
  const y2 = h - (data[data.length - 1] / max) * h;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fillD} fill="url(#tg)" />
      <path d={pathD} fill="none" stroke="#22d3ee" strokeWidth="0.4" />
      <line
        x1="0" y1={y1} x2={w} y2={y2}
        stroke={clear ? "#10b981" : "#ef4444"}
        strokeWidth="0.3"
        strokeDasharray="1.5,1"
      />
      <circle cx="0" cy={y1} r="1.2" fill="#22d3ee" />
      <circle cx={w} cy={y2} r="1.2" fill={clear ? "#10b981" : "#ef4444"} />
    </svg>
  );
}

function MapPlaceholder({ observer, target, clear }: { observer: { lat: number; lng: number }; target: { lat: number; lng: number }; clear: boolean }) {
  const midLat = (observer.lat + target.lat) / 2;
  const midLng = (observer.lng + target.lng) / 2;

  return (
    <div className="relative h-full w-full rounded-lg bg-background border border-card-border overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`h${i}`} className="absolute w-full border-t border-foreground" style={{ top: `${i * 10}%` }} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`v${i}`} className="absolute h-full border-l border-foreground" style={{ left: `${i * 10}%` }} />
        ))}
      </div>
      {/* Line */}
      <svg className="absolute inset-0 w-full h-full">
        <line x1="25%" y1="30%" x2="75%" y2="70%" stroke={clear ? "#10b981" : "#ef4444"} strokeWidth="2" strokeDasharray="6,4" opacity="0.7" />
      </svg>
      {/* Observer */}
      <div className="absolute left-[20%] top-[25%] flex flex-col items-center">
        <div className="h-4 w-4 rounded-full bg-accent border-2 border-accent/50 shadow-lg shadow-accent/20" />
        <span className="mt-1 text-[10px] font-mono text-accent">Observer</span>
      </div>
      {/* Target */}
      <div className="absolute left-[70%] top-[65%] flex flex-col items-center">
        <div className={`h-4 w-4 rounded-full border-2 shadow-lg ${clear ? "bg-success border-success/50 shadow-success/20" : "bg-danger border-danger/50 shadow-danger/20"}`} />
        <span className={`mt-1 text-[10px] font-mono ${clear ? "text-success" : "text-danger"}`}>Target</span>
      </div>
      {/* Coords */}
      <div className="absolute bottom-2 left-2 text-[9px] font-mono text-muted">
        {midLat.toFixed(4)}, {midLng.toFixed(4)}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const [selected, setSelected] = useState(0);
  const scenario = DEMO_SCENARIOS[selected];
  const r = scenario.result;

  return (
    <div className="pt-20 px-6">
      <div className="mx-auto max-w-6xl py-12">
        <h1 className="text-3xl font-bold mb-2">Results Visualization</h1>
        <p className="text-muted mb-8">
          Explore sample calculations with terrain profiles and viewpoint data.
        </p>

        {/* Scenario selector */}
        <div className="mb-8 flex flex-wrap gap-3">
          {DEMO_SCENARIOS.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setSelected(i)}
              className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                i === selected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-card-border bg-card text-muted hover:text-foreground"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Map */}
          <div className="h-80 lg:h-auto rounded-xl border border-card-border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold text-accent uppercase tracking-wider">Map View</h3>
            <div className="h-[calc(100%-2rem)]">
              <MapPlaceholder observer={scenario.observer} target={scenario.target} clear={r.clear} />
            </div>
          </div>

          {/* Data */}
          <div className="space-y-4">
            {/* Status */}
            <div className="rounded-xl border border-card-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">Line of Sight</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  r.clear ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                }`}>
                  {r.clear ? "Clear" : "Obstructed"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Distance", value: `${r.distance_km} km` },
                  { label: "Azimuth", value: `${r.azimuth_deg}°` },
                  { label: "Elev Angle", value: `${r.elevation_angle_deg}°` },
                  { label: "Max Obstruction", value: `${r.max_obstruction}m` },
                ].map((d) => (
                  <div key={d.label}>
                    <div className="text-xs text-muted">{d.label}</div>
                    <div className="text-lg font-mono font-bold">{d.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terrain */}
            <div className="rounded-xl border border-card-border bg-card p-6">
              <h3 className="mb-3 text-sm font-semibold text-accent uppercase tracking-wider">Terrain Profile</h3>
              <div className="h-32">
                <TerrainChart data={r.terrain} clear={r.clear} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted">
                <span>Observer — {r.observer_elevation}m</span>
                <span>Target — {r.target_elevation}m</span>
              </div>
            </div>

            {/* Viewpoints */}
            <div className="rounded-xl border border-card-border bg-card p-6">
              <h3 className="mb-3 text-sm font-semibold text-accent uppercase tracking-wider">Optimal Viewpoints</h3>
              <div className="space-y-2">
                {r.viewpoints.map((vp, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-background p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                        {i + 1}
                      </span>
                      <span className="font-mono text-sm">
                        {vp.lat.toFixed(4)}, {vp.lng.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-card-border">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${vp.score * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono text-muted">{(vp.score * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Download section */}
        <div className="mt-8 rounded-xl border border-card-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Download Report</h3>
            <p className="text-sm text-muted">Export this calculation as JSON or GeoJSON for use in GIS tools.</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-lg border border-card-border px-4 py-2 text-sm font-medium hover:bg-card-border/30 transition-colors">
              JSON
            </button>
            <button className="rounded-lg border border-card-border px-4 py-2 text-sm font-medium hover:bg-card-border/30 transition-colors">
              GeoJSON
            </button>
            <button className="rounded-lg border border-card-border px-4 py-2 text-sm font-medium hover:bg-card-border/30 transition-colors">
              CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
