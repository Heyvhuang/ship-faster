"use client";

import Link from "next/link";
import { useState } from "react";

type ScanState = "idle" | "scanning" | "complete";

interface ScanResult {
  file: string;
  status: "clean" | "suspicious" | "compromised";
  detail: string;
}

const mockResults: ScanResult[] = [
  { file: "/opt/ivanti/mics/webapps/ROOT/403.jsp", status: "compromised", detail: "Known webshell signature detected — SHA-256 match" },
  { file: "/opt/ivanti/mics/webapps/ROOT/WEB-INF/web.xml", status: "suspicious", detail: "Modified servlet mapping referencing 403.jsp" },
  { file: "/opt/ivanti/mics/webapps/ROOT/404.jsp", status: "clean", detail: "Legitimate Ivanti error page — hash verified" },
  { file: "/opt/ivanti/mics/webapps/ROOT/500.jsp", status: "clean", detail: "Legitimate Ivanti error page — hash verified" },
  { file: "/opt/ivanti/mics/webapps/ROOT/index.jsp", status: "clean", detail: "Default page — no modifications detected" },
  { file: "/opt/ivanti/mics/conf/server.xml", status: "clean", detail: "Standard Tomcat configuration — no anomalies" },
  { file: "/opt/ivanti/mics/logs/access.log", status: "suspicious", detail: "Unusual POST requests to /403.jsp from external IP" },
];

const statusColors = {
  clean: "text-emerald-400",
  suspicious: "text-amber-400",
  compromised: "text-red-400",
};

const statusBg = {
  clean: "bg-emerald-400/10",
  suspicious: "bg-amber-400/10",
  compromised: "bg-red-400/10",
};

export default function ScanPage() {
  const [state, setState] = useState<ScanState>("idle");
  const [progress, setProgress] = useState(0);
  const [visibleResults, setVisibleResults] = useState<ScanResult[]>([]);

  function startScan() {
    setState("scanning");
    setProgress(0);
    setVisibleResults([]);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setProgress(Math.min(Math.round((i / mockResults.length) * 100), 100));
      setVisibleResults((prev) => [...prev, mockResults[i - 1]]);
      if (i >= mockResults.length) {
        clearInterval(interval);
        setState("complete");
      }
    }, 800);
  }

  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-alert rounded flex items-center justify-center text-white font-bold text-sm">SI</div>
            <span className="font-bold text-lg text-white">ShieldIvanti</span>
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition">Back to Home</Link>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Free Backdoor Indicator Check</h1>
        <p className="text-slate-400 mb-8">
          This demo simulates our automated scanning process. In production, our scripts connect securely to your Ivanti EPMM system via SSH to perform a real file-system analysis.
        </p>

        {state === "idle" && (
          <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">
              <svg className="w-16 h-16 mx-auto text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Ready to Scan</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
              Click below to run a simulated scan against a demo Ivanti EPMM file system. This demonstrates the indicators our tools check for.
            </p>
            <button
              onClick={startScan}
              className="bg-red-alert hover:bg-red-dark text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg shadow-red-alert/20"
            >
              Start Demo Scan
            </button>
          </div>
        )}

        {(state === "scanning" || state === "complete") && (
          <div className="space-y-4">
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400 font-mono">
                  {state === "scanning" ? "Scanning..." : "Scan Complete"}
                </span>
                <span className="text-sm font-mono text-white">{progress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${state === "complete" ? "bg-emerald-500" : "bg-red-alert"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              {visibleResults.map((r, i) => (
                <div key={i} className={`border border-slate-800 rounded-lg p-4 ${statusBg[r.status]}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <code className="text-sm text-slate-300 break-all">{r.file}</code>
                      <p className="text-xs text-slate-400 mt-1">{r.detail}</p>
                    </div>
                    <span className={`text-xs font-semibold uppercase shrink-0 ${statusColors[r.status]}`}>
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {state === "complete" && (
              <div className="bg-red-alert/10 border border-red-alert/30 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-semibold text-red-glow mb-2">Threats Detected</h3>
                <p className="text-slate-400 text-sm mb-4">
                  This simulated scan found <strong className="text-white">1 confirmed backdoor</strong> and <strong className="text-white">2 suspicious indicators</strong>. In a real engagement, our team would immediately begin forensic analysis and remediation.
                </p>
                <Link
                  href="/#contact"
                  className="inline-block bg-red-alert hover:bg-red-dark text-white px-6 py-3 rounded-lg font-semibold text-sm transition"
                >
                  Request Full Assessment
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
