"use client";
import Nav from "@/components/Nav";
import { useState } from "react";

const members = [
  { name: "Morgan Davis", email: "morgan@acme.dev", role: "Admin", status: "active" },
  { name: "Alex Kim", email: "alex@acme.dev", role: "Member", status: "active" },
  { name: "Jordan Lee", email: "jordan@acme.dev", role: "Member", status: "active" },
  { name: "Sam Rivera", email: "sam@acme.dev", role: "Member", status: "active" },
  { name: "Taylor Brooks", email: "taylor@acme.dev", role: "Member", status: "active" },
  { name: "Casey Nguyen", email: "casey@acme.dev", role: "Member", status: "pending" },
];

const integrations = [
  { name: "VS Code", status: "connected", icon: "code", users: 5 },
  { name: "GitHub", status: "connected", icon: "git", users: 6 },
  { name: "PyCharm", status: "not_connected", icon: "py", users: 0 },
  { name: "Cursor", status: "connected", icon: "cursor", users: 3 },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("team");

  const tabs = [
    { id: "team", label: "Team" },
    { id: "integrations", label: "Integrations" },
    { id: "analysis", label: "Analysis" },
    { id: "billing", label: "Billing" },
  ];

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-card-border mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "team" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold">Team Members</h2>
                <p className="text-sm text-muted">Manage who has access to PromptFlow analytics</p>
              </div>
              <button className="bg-accent hover:bg-accent-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                Invite Member
              </button>
            </div>
            <div className="bg-card border border-card-border rounded-xl overflow-hidden">
              {members.map((m, i) => (
                <div
                  key={m.email}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2 ${
                    i < members.length - 1 ? "border-b border-card-border" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold">
                      {m.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{m.name}</div>
                      <div className="text-xs text-muted">{m.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-11 sm:ml-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      m.status === "active" ? "bg-green/10 text-green" : "bg-yellow/10 text-yellow"
                    }`}>
                      {m.status}
                    </span>
                    <span className="text-xs text-muted">{m.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div>
            <h2 className="font-semibold mb-1">Integrations</h2>
            <p className="text-sm text-muted mb-4">Connect your development tools to capture prompt data</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {integrations.map((intg) => (
                <div key={intg.name} className="bg-card border border-card-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs font-bold font-mono">
                        {intg.icon}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{intg.name}</div>
                        <div className="text-xs text-muted">
                          {intg.status === "connected" ? `${intg.users} users connected` : "Not connected"}
                        </div>
                      </div>
                    </div>
                    <span className={`w-2 h-2 rounded-full ${intg.status === "connected" ? "bg-green" : "bg-muted"}`} />
                  </div>
                  <button
                    className={`w-full text-center py-2 rounded-lg text-sm font-medium transition-colors ${
                      intg.status === "connected"
                        ? "border border-card-border text-muted hover:text-foreground"
                        : "bg-accent hover:bg-accent-hover text-white"
                    }`}
                  >
                    {intg.status === "connected" ? "Configure" : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-semibold mb-1">Analysis Parameters</h2>
              <p className="text-sm text-muted mb-4">Configure how PromptFlow analyzes your team&apos;s workflow</p>
            </div>
            <div className="bg-card border border-card-border rounded-xl p-6 space-y-5">
              {[
                { label: "Analysis Window", value: "14 days", desc: "How far back to analyze prompt history" },
                { label: "Min Prompts Threshold", value: "10", desc: "Minimum prompts before scoring a team member" },
                { label: "Success Criteria", value: "No re-prompt within 5 min", desc: "How to determine if a prompt was successful" },
                { label: "Scoring Algorithm", value: "Weighted (time + iterations)", desc: "How efficiency scores are calculated" },
              ].map((param, i) => (
                <div key={param.label} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  i < 3 ? "pb-5 border-b border-card-border" : ""
                }`}>
                  <div>
                    <div className="text-sm font-medium">{param.label}</div>
                    <div className="text-xs text-muted">{param.desc}</div>
                  </div>
                  <div className="bg-background border border-card-border rounded-lg px-3 py-1.5 text-sm text-foreground min-w-[200px]">
                    {param.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-semibold mb-1">Billing</h2>
              <p className="text-sm text-muted mb-4">Manage your subscription and payment details</p>
            </div>
            <div className="bg-card border border-card-border rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-card-border">
                <div>
                  <div className="text-sm font-medium">Current Plan</div>
                  <div className="text-2xl font-bold text-accent mt-1">Team</div>
                  <div className="text-xs text-muted">$49/dev/month &middot; 6 developers</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted">Monthly total</div>
                  <div className="text-2xl font-bold">$294</div>
                  <div className="text-xs text-muted">Next billing: Mar 1, 2026</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium">ROI This Month</div>
                  <div className="text-xs text-muted mt-1">Based on time saved at $75/hr avg dev rate</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green">$4,650</div>
                  <div className="text-xs text-green">15.8x return on investment</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
