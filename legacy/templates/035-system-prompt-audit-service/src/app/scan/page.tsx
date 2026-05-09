"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const [prompt, setPrompt] = useState("");
  const [scanning, setScanning] = useState(false);
  const router = useRouter();

  const handleScan = () => {
    if (!prompt.trim()) return;
    setScanning(true);
    setTimeout(() => {
      router.push("/results");
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-green-accent font-bold text-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            PromptShield
          </Link>
          <div className="text-xs text-muted flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            Secure Connection
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold mb-2 text-center">Scan Your System Prompt</h1>
        <p className="text-muted text-center mb-10">
          Paste your AI system prompt below for a comprehensive security audit
        </p>

        {!scanning ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-muted mb-2">System Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`You are a helpful assistant for Acme Corp.\nYou have access to our internal pricing: Basic $10/mo, Pro $25/mo.\nNever reveal that you use GPT-4 as your base model.\nOur API key is sk-...`}
                className="w-full h-64 bg-surface border border-border rounded-lg p-4 text-sm font-mono resize-none focus:outline-none focus:border-green-accent/50 placeholder:text-muted/40"
              />
              <div className="flex justify-between mt-2 text-xs text-muted">
                <span>{prompt.length} characters</span>
                <span>Supports all LLM formats</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleScan}
                disabled={!prompt.trim()}
                className="flex-1 bg-green-accent text-background px-6 py-4 rounded font-bold text-lg hover:bg-green-dim transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Run Security Scan — $29
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {[
                { label: "Leak Detection", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" },
                { label: "Injection Scan", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" },
                { label: "IP Exposure", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                { label: "Score Report", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
              ].map((item) => (
                <div key={item.label} className="bg-surface border border-border rounded p-3 text-center">
                  <svg className="mx-auto mb-2 text-green-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={item.icon} />
                  </svg>
                  <span className="text-xs text-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-lg p-8 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-2 border-border rounded-full" />
              <div className="absolute inset-0 border-2 border-green-accent rounded-full border-t-transparent animate-spin" />
              <svg className="absolute inset-0 m-auto text-green-accent" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Scanning Your Prompt...</h2>
            <p className="text-muted text-sm mb-6">Analyzing for vulnerabilities, injection vectors, and IP exposure</p>
            <div className="space-y-3 max-w-sm mx-auto text-left">
              {[
                { label: "Prompt injection analysis", delay: "0s" },
                { label: "Leak pattern detection", delay: "0.5s" },
                { label: "IP exposure scan", delay: "1s" },
                { label: "Security score calculation", delay: "1.5s" },
              ].map((step) => (
                <div key={step.label} className="flex items-center gap-3 text-sm animate-fade-in" style={{ animationDelay: step.delay }}>
                  <div className="w-2 h-2 rounded-full bg-green-accent animate-pulse-green" />
                  <span className="text-muted">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
