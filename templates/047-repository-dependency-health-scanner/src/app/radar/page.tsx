"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: "⊘",
    title: "Abandoned Package Detection",
    desc: "Flags packages with no updates in 12+ months, zero active maintainers, or ownership transfers.",
  },
  {
    icon: "△",
    title: "Maintainer Burnout Signals",
    desc: "Tracks commit frequency drops, growing PR backlogs, and unresponsive issue threads.",
  },
  {
    icon: "◇",
    title: "Deprecation Warnings",
    desc: "Catches deprecated packages and suggests migration paths to actively maintained alternatives.",
  },
  {
    icon: "□",
    title: "Health Score 0–100",
    desc: "Composite score weighing update frequency, maintainer activity, issue responsiveness, and CVEs.",
  },
  {
    icon: "○",
    title: "Beyond CVEs",
    desc: "Goes past Dependabot — detects risks that don't have CVE entries yet but will break your build.",
  },
  {
    icon: "▽",
    title: "Weekly Monitoring",
    desc: "Paid tier scans repos weekly and sends email alerts when dependency health changes.",
  },
];

const stats = [
  { value: "2.4M+", label: "packages indexed" },
  { value: "340K+", label: "repos scanned" },
  { value: "12.3", label: "avg issues found" },
  { value: "< 30s", label: "scan time" },
];

export default function RadarHome() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const router = useRouter();

  function handleScan(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setScanning(true);
    setTimeout(() => {
      router.push("/radar/results");
    }, 2000);
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 rounded-full border border-green/20 bg-green/5 text-green text-xs font-mono">
            npm dependency health monitoring
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Your dependencies are
            <br />
            <span className="text-red">silently rotting</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10">
            Dependabot catches CVEs. DepRadar catches everything else —
            abandoned packages, maintainer burnout, deprecation cliffs — before
            they break your production build.
          </p>

          {/* Scan Input */}
          <form onSubmit={handleScan} className="max-w-2xl mx-auto mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-mono text-sm">
                  $
                </span>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="github.com/owner/repo"
                  className="w-full bg-card border border-border rounded-lg pl-8 pr-4 py-3.5 font-mono text-sm text-foreground placeholder:text-neutral-600 focus:outline-none focus:border-green/50 focus:ring-1 focus:ring-green/20 transition-all"
                  disabled={scanning}
                />
              </div>
              <button
                type="submit"
                disabled={scanning}
                className="bg-green text-black font-mono font-bold text-sm px-6 py-3.5 rounded-lg hover:bg-green/90 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {scanning ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Scanning...
                  </span>
                ) : (
                  "Scan Now"
                )}
              </button>
            </div>
          </form>
          <p className="text-xs text-muted font-mono">
            Free scan — no account required. Try:{" "}
            <button
              onClick={() => {
                setUrl("github.com/acme-corp/web-dashboard");
                setTimeout(() => {
                  setScanning(true);
                  setTimeout(() => router.push("/radar/results"), 2000);
                }, 300);
              }}
              className="text-green hover:underline"
            >
              github.com/acme-corp/web-dashboard
            </button>
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
                {s.value}
              </div>
              <div className="text-xs text-muted font-mono mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            What Dependabot misses
          </h2>
          <p className="text-muted text-center mb-12 max-w-xl mx-auto">
            Security scanners catch CVEs after they&apos;re published. DepRadar
            detects the warning signs months earlier.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="border border-border rounded-lg p-6 bg-card hover:bg-card-hover transition-colors"
              >
                <div className="text-green font-mono text-xl mb-3">
                  {f.icon}
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Report Preview */}
      <section className="py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            What you get
          </h2>
          <p className="text-muted text-center mb-12">
            A single-page health report with actionable findings
          </p>
          <div className="border border-border rounded-lg bg-card overflow-hidden">
            <div className="border-b border-border px-4 py-3 flex items-center gap-2 font-mono text-xs text-muted">
              <span className="w-2.5 h-2.5 rounded-full bg-red" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow" />
              <span className="w-2.5 h-2.5 rounded-full bg-green" />
              <span className="ml-2">depradar scan — acme-corp/web-dashboard</span>
            </div>
            <div className="p-6 font-mono text-xs sm:text-sm space-y-2">
              <div className="text-muted">$ depradar scan acme-corp/web-dashboard</div>
              <div className="text-muted">Cloning repository...</div>
              <div className="text-muted">Parsing package.json... 34 dependencies found</div>
              <div className="text-muted">Scanning npm registry...</div>
              <div className="mt-4 text-foreground">
                ── SCAN COMPLETE ──────────────────────────
              </div>
              <div className="mt-2 flex gap-8">
                <span>Health Score: <span className="text-yellow font-bold">62/100</span></span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4">
                <span className="text-red">■ 3 critical</span>
                <span className="text-yellow">■ 5 warnings</span>
                <span className="text-blue-400">■ 8 info</span>
                <span className="text-green">■ 18 healthy</span>
              </div>
              <div className="mt-4 text-red">
                CRITICAL: event-stream@3.3.4 — supply chain attack, 0 maintainers
              </div>
              <div className="text-red">
                CRITICAL: request@2.88.2 — officially deprecated since 2020
              </div>
              <div className="text-red">
                CRITICAL: node-uuid@1.4.8 — abandoned, renamed to &apos;uuid&apos;
              </div>
              <div className="text-yellow mt-1">
                WARNING: moment@2.29.4 — maintenance mode, 329kB bundle
              </div>
              <div className="text-yellow">
                WARNING: lodash@4.17.19 — 2 versions behind, missing CVE patch
              </div>
              <div className="mt-4 text-green">
                → Full report: /radar/results
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Stop finding out in production
          </h2>
          <p className="text-muted mb-8">
            Scan your repo now — free, no account required. Get a full health
            report in under 30 seconds.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-green text-black font-mono font-bold text-sm px-8 py-3.5 rounded-lg hover:bg-green/90 transition-colors"
          >
            Scan a Repository
          </button>
        </div>
      </section>
    </div>
  );
}
