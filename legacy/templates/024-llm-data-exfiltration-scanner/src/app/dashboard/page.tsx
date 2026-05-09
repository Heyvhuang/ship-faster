"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const integrations = [
  { id: 1, name: "AskGPT Bot", platform: "Slack", status: "critical", score: 9.2, vectors: 47, lastScan: "2 hours ago" },
  { id: 2, name: "CopilotAssist", platform: "Teams", status: "high", score: 7.8, vectors: 23, lastScan: "2 hours ago" },
  { id: 3, name: "SummaryBot", platform: "Slack", status: "medium", score: 5.4, vectors: 12, lastScan: "2 hours ago" },
  { id: 4, name: "ServerGPT", platform: "Discord", status: "high", score: 7.1, vectors: 19, lastScan: "2 hours ago" },
  { id: 5, name: "HelpDesk AI", platform: "Slack", status: "low", score: 2.3, vectors: 3, lastScan: "2 hours ago" },
  { id: 6, name: "DocBot Pro", platform: "Teams", status: "critical", score: 8.9, vectors: 38, lastScan: "1 day ago" },
];

const severityColor: Record<string, string> = {
  critical: "text-red-400 bg-red-950 border-red-900",
  high: "text-orange-400 bg-orange-950 border-orange-900",
  medium: "text-yellow-400 bg-yellow-950 border-yellow-900",
  low: "text-green-400 bg-green-950 border-green-900",
};

const scoreColor = (s: number) =>
  s >= 8 ? "text-red-400" : s >= 6 ? "text-orange-400" : s >= 4 ? "text-yellow-400" : "text-green-400";

const scanLog = [
  { time: "14:32:01", msg: "Scan initiated for workspace acme-corp.slack.com", type: "info" },
  { time: "14:32:03", msg: "Discovered 6 active LLM integrations", type: "info" },
  { time: "14:32:05", msg: "Testing AskGPT Bot for URL preview exfiltration...", type: "info" },
  { time: "14:32:08", msg: "CRITICAL: AskGPT Bot leaks #finance data via markdown image tags", type: "critical" },
  { time: "14:32:10", msg: "Testing CopilotAssist for prompt injection...", type: "info" },
  { time: "14:32:14", msg: "HIGH: CopilotAssist follows injected instructions in shared docs", type: "high" },
  { time: "14:32:16", msg: "Testing SummaryBot for context window poisoning...", type: "info" },
  { time: "14:32:19", msg: "MEDIUM: SummaryBot leaks user queries in verbose error messages", type: "medium" },
  { time: "14:32:21", msg: "Testing ServerGPT for cross-user data leakage...", type: "info" },
  { time: "14:32:25", msg: "HIGH: ServerGPT retains and leaks previous user conversations", type: "high" },
  { time: "14:32:27", msg: "Scan complete. 6 integrations tested, 142 vectors identified.", type: "info" },
];

export default function Dashboard() {
  const [scanning, setScanning] = useState(false);
  const [target, setTarget] = useState("acme-corp.slack.com");

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Scanner Dashboard</h1>
              <p className="mt-1 text-sm text-gray-400">Monitor and scan your AI integrations for data exfiltration vulnerabilities</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-400">Scanner online</span>
            </div>
          </div>

          {/* Scan input */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Enter workspace URL or integration name..."
                className="flex-1 rounded-lg border border-slate-700 bg-[#0a0a0f] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-red-600 focus:outline-none font-mono"
              />
              <button
                onClick={() => setScanning(!scanning)}
                className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition whitespace-nowrap"
              >
                {scanning ? "Stop Scan" : "Run Scan"}
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left column: stats + integrations */}
            <div className="lg:col-span-2 space-y-8">
              {/* Summary cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Integrations", value: "6", color: "text-white" },
                  { label: "Critical", value: "2", color: "text-red-400" },
                  { label: "High Risk", value: "2", color: "text-orange-400" },
                  { label: "Exfil Vectors", value: "142", color: "text-red-400" },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                    <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{c.label}</div>
                  </div>
                ))}
              </div>

              {/* Integration table */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                <div className="border-b border-slate-800 px-6 py-4">
                  <h2 className="font-semibold">Discovered Integrations</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-left text-xs text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-3">Integration</th>
                        <th className="px-6 py-3">Platform</th>
                        <th className="px-6 py-3">Risk</th>
                        <th className="px-6 py-3">Score</th>
                        <th className="px-6 py-3">Vectors</th>
                        <th className="px-6 py-3">Last Scan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {integrations.map((i) => (
                        <tr key={i.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition">
                          <td className="px-6 py-4 font-medium text-white">{i.name}</td>
                          <td className="px-6 py-4 text-gray-400">{i.platform}</td>
                          <td className="px-6 py-4">
                            <span className={`rounded-full border px-2 py-0.5 text-xs font-bold uppercase ${severityColor[i.status]}`}>
                              {i.status}
                            </span>
                          </td>
                          <td className={`px-6 py-4 font-mono font-bold ${scoreColor(i.score)}`}>{i.score}</td>
                          <td className="px-6 py-4 text-gray-400">{i.vectors}</td>
                          <td className="px-6 py-4 text-gray-500">{i.lastScan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right column: scan log */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
              <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <h2 className="font-semibold">Scan Log</h2>
                <span className="text-xs text-gray-500 font-mono">live</span>
              </div>
              <div className="p-4 font-mono text-xs space-y-2 max-h-[600px] overflow-y-auto">
                {scanLog.map((l, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-600 shrink-0">{l.time}</span>
                    <span
                      className={
                        l.type === "critical"
                          ? "text-red-400"
                          : l.type === "high"
                          ? "text-orange-400"
                          : l.type === "medium"
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }
                    >
                      {l.msg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
