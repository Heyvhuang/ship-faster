"use client";
import ConsoleLayout from "@/components/ConsoleLayout";
import { useState } from "react";

const initialRules = [
  { id: 1, name: "High Failure Rate", metric: "failure_rate", operator: ">", threshold: "5%", channel: "Slack #alerts", enabled: true },
  { id: 2, name: "Hallucination Spike", metric: "hallucination_count", operator: ">", threshold: "10/hr", channel: "PagerDuty", enabled: true },
  { id: 3, name: "Model Latency", metric: "avg_latency", operator: ">", threshold: "500ms", channel: "Email", enabled: false },
  { id: 4, name: "Low Confidence Burst", metric: "low_confidence_rate", operator: ">", threshold: "15%", channel: "Slack #alerts", enabled: true },
  { id: 5, name: "Timeout Rate", metric: "timeout_rate", operator: ">", threshold: "2%", channel: "PagerDuty", enabled: true },
];

const recentAlerts = [
  { time: "08:42", rule: "High Failure Rate", value: "6.2%", channel: "Slack", status: "fired" },
  { time: "08:18", rule: "Hallucination Spike", value: "12/hr", channel: "PagerDuty", status: "fired" },
  { time: "07:55", rule: "Low Confidence Burst", value: "18%", channel: "Slack", status: "fired" },
  { time: "07:30", rule: "High Failure Rate", value: "4.8%", channel: "Slack", status: "resolved" },
  { time: "06:45", rule: "Timeout Rate", value: "2.4%", channel: "PagerDuty", status: "resolved" },
];

export default function AlertsConfig() {
  const [rules, setRules] = useState(initialRules);

  return (
    <ConsoleLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Alerts Configuration</h1>
            <p className="text-sm text-muted">Set thresholds for failure type notifications</p>
          </div>
          <button className="bg-accent-blue hover:bg-accent-blue/90 text-white text-sm px-4 py-2 rounded-md transition-colors w-fit">
            + New Alert Rule
          </button>
        </div>

        {/* Rules */}
        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-border">
            <h2 className="font-semibold text-sm">Alert Rules</h2>
          </div>
          <div className="divide-y divide-card-border">
            {rules.map((r) => (
              <div key={r.id} className="px-5 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <button
                    onClick={() =>
                      setRules(rules.map((rule) => (rule.id === r.id ? { ...rule, enabled: !rule.enabled } : rule)))
                    }
                    className={`w-9 h-5 rounded-full relative transition-colors shrink-0 ${
                      r.enabled ? "bg-accent-green" : "bg-card-border"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                        r.enabled ? "left-4" : "left-0.5"
                      }`}
                    />
                  </button>
                  <div className="min-w-0">
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-muted font-mono">
                      {r.metric} {r.operator} {r.threshold}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="bg-background px-2 py-1 rounded font-mono">{r.channel}</span>
                  <button className="text-muted hover:text-foreground transition-colors">Edit</button>
                  <button className="text-accent-red/70 hover:text-accent-red transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent alerts */}
        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-border">
            <h2 className="font-semibold text-sm">Recent Alert Activity</h2>
          </div>
          <div className="divide-y divide-card-border">
            {recentAlerts.map((a, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-4 text-sm">
                <span className={`w-2 h-2 rounded-full shrink-0 ${a.status === "fired" ? "bg-accent-red" : "bg-accent-green"}`} />
                <span className="font-mono text-xs text-muted w-12">{a.time}</span>
                <span className="flex-1 min-w-0 truncate">{a.rule}</span>
                <span className="font-mono text-xs">{a.value}</span>
                <span className="text-xs text-muted">{a.channel}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  a.status === "fired" ? "bg-accent-red/10 text-accent-red" : "bg-accent-green/10 text-accent-green"
                }`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notification channels */}
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="font-semibold text-sm mb-4">Notification Channels</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Slack", status: "Connected", detail: "#audio-alerts, #eng-oncall", connected: true },
              { name: "PagerDuty", status: "Connected", detail: "Audio ML Service", connected: true },
              { name: "Email", status: "Not configured", detail: "Add team emails", connected: false },
            ].map((ch) => (
              <div key={ch.name} className="bg-background rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{ch.name}</span>
                  <span className={`w-2 h-2 rounded-full ${ch.connected ? "bg-accent-green" : "bg-muted"}`} />
                </div>
                <div className={`text-xs ${ch.connected ? "text-accent-green" : "text-muted"}`}>{ch.status}</div>
                <div className="text-xs text-muted mt-1">{ch.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
