"use client";

import { useState } from "react";
import { services, incidents, uptimeData, type ServiceStatus, type Incident } from "./data";

const statusConfig: Record<ServiceStatus, { label: string; color: string; dot: string }> = {
  operational: { label: "Operational", color: "text-emerald-600", dot: "bg-emerald-500" },
  degraded: { label: "Degraded", color: "text-amber-600", dot: "bg-amber-500" },
  partial_outage: { label: "Partial Outage", color: "text-orange-600", dot: "bg-orange-500" },
  major_outage: { label: "Major Outage", color: "text-red-600", dot: "bg-red-500" },
};

const severityColors: Record<string, string> = {
  minor: "bg-amber-100 text-amber-800",
  major: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

const incidentStatusColors: Record<string, string> = {
  resolved: "text-emerald-600",
  monitoring: "text-blue-600",
  investigating: "text-amber-600",
  identified: "text-orange-600",
};

function uptimeBarColor(status: ServiceStatus) {
  if (status === "operational") return "bg-emerald-500";
  if (status === "degraded") return "bg-amber-500";
  if (status === "partial_outage") return "bg-orange-500";
  return "bg-red-500";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function overallStatus() {
  if (services.some((s) => s.status === "major_outage")) return { label: "Major System Outage", color: "bg-red-500" };
  if (services.some((s) => s.status === "partial_outage")) return { label: "Partial System Outage", color: "bg-orange-500" };
  if (services.some((s) => s.status === "degraded")) return { label: "Minor Service Degradation", color: "bg-amber-500" };
  return { label: "All Systems Operational", color: "bg-emerald-500" };
}

function avgUptime(serviceName: string) {
  const days = uptimeData[serviceName];
  if (!days) return 0;
  return Math.round((days.reduce((a, d) => a + d.uptime, 0) / days.length) * 100) / 100;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const status = overallStatus();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="font-semibold text-lg text-slate-900">OpsStatus</span>
          </div>
          <span className="text-sm text-slate-500">System Status</span>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-10">
        {/* Hero / Overall Status Banner */}
        <section>
          <div className={`${status.color} rounded-xl px-6 py-5 text-white`}>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-white/80 animate-pulse" />
              <h1 className="text-xl font-semibold">{status.label}</h1>
            </div>
            <p className="mt-1 text-sm text-white/80">
              Last checked: February 21, 2026
            </p>
          </div>
        </section>

        {/* Current System Status */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Current Status</h2>
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
            {services.map((svc) => {
              const cfg = statusConfig[svc.status];
              return (
                <div key={svc.name} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="font-medium text-slate-900">{svc.name}</p>
                    <p className="text-sm text-slate-500">{svc.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                    <span className={`text-sm font-medium ${cfg.color}`}>{cfg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Uptime Metrics */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Uptime &mdash; Last 90 Days</h2>
          <div className="space-y-5">
            {services.map((svc) => {
              const days = uptimeData[svc.name] || [];
              const avg = avgUptime(svc.name);
              return (
                <div key={svc.name} className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-slate-900">{svc.name}</span>
                    <span className="text-sm font-mono text-slate-600">{avg}% uptime</span>
                  </div>
                  <div className="flex gap-[2px]">
                    {days.map((d) => (
                      <div
                        key={d.date}
                        className={`h-8 flex-1 rounded-sm ${uptimeBarColor(d.status)} opacity-90 hover:opacity-100 transition-opacity`}
                        title={`${d.date}: ${d.uptime}%`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-slate-400">
                    <span>90 days ago</span>
                    <span>Today</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Incident Timeline */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Incident History</h2>
          <div className="space-y-4">
            {incidents.map((inc) => (
              <IncidentCard key={inc.id} incident={inc} />
            ))}
          </div>
        </section>

        {/* Subscribe Form */}
        <section>
          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Stay Updated</h2>
            <p className="text-sm text-slate-500 mb-4">Get notified when we create or resolve incidents.</p>
            {subscribed ? (
              <p className="text-emerald-600 font-medium">You&apos;re subscribed! We&apos;ll keep you posted.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubscribed(true);
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <span>&copy; 2026 OpsStatus. Free starter template.</span>
          <span>Powered by OpsStatus</span>
        </div>
      </footer>
    </div>
  );
}

function IncidentCard({ incident }: { incident: Incident }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-medium text-slate-900">{incident.title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${severityColors[incident.severity]}`}>
            {incident.severity}
          </span>
        </div>
        <span className={`text-sm font-medium capitalize ${incidentStatusColors[incident.status]}`}>
          {incident.status}
        </span>
      </div>
      <p className="text-xs text-slate-400 mb-3">
        {formatDate(incident.createdAt)} &mdash; Updated {formatDate(incident.updatedAt)}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
      >
        {expanded ? "Hide updates" : `Show updates (${incident.updates.length})`}
      </button>
      {expanded && (
        <div className="mt-3 border-l-2 border-slate-200 pl-4 space-y-3">
          {incident.updates.map((u, i) => (
            <div key={i}>
              <p className="text-sm text-slate-700">{u.message}</p>
              <p className="text-xs text-slate-400 mt-0.5">{formatDate(u.timestamp)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
