"use client";
import ConsoleLayout from "@/components/ConsoleLayout";
import { useState } from "react";

const endpoints = [
  { name: "whisper-large-v3", url: "https://api.acme.com/v1/whisper/transcribe", status: "active", lastPing: "2s ago" },
  { name: "hubert-base-ls960", url: "https://api.acme.com/v1/hubert/classify", status: "degraded", lastPing: "2s ago" },
  { name: "whisper-medium-en", url: "https://api.acme.com/v1/whisper-med/transcribe", status: "active", lastPing: "2s ago" },
];

export default function IntegrationSetup() {
  const [apiKey] = useState("ask_live_9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c");
  const [showKey, setShowKey] = useState(false);

  return (
    <ConsoleLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Integration Setup</h1>
          <p className="text-sm text-muted">API keys and webhook configuration</p>
        </div>

        {/* API Key */}
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="font-semibold text-sm mb-4">API Key</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-background rounded-lg px-4 py-2.5 font-mono text-sm flex items-center">
              {showKey ? apiKey : "•".repeat(40)}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowKey(!showKey)}
                className="border border-card-border px-4 py-2 rounded-md text-sm hover:bg-white/5 transition-colors"
              >
                {showKey ? "Hide" : "Show"}
              </button>
              <button className="border border-card-border px-4 py-2 rounded-md text-sm hover:bg-white/5 transition-colors">
                Copy
              </button>
              <button className="bg-accent-red/10 text-accent-red px-4 py-2 rounded-md text-sm hover:bg-accent-red/20 transition-colors">
                Rotate
              </button>
            </div>
          </div>
        </div>

        {/* Model endpoints */}
        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-card-border flex items-center justify-between">
            <h2 className="font-semibold text-sm">Model Endpoints</h2>
            <button className="bg-accent-blue hover:bg-accent-blue/90 text-white text-xs px-3 py-1.5 rounded-md transition-colors">
              + Add Endpoint
            </button>
          </div>
          <div className="divide-y divide-card-border">
            {endpoints.map((e) => (
              <div key={e.name} className="px-5 py-4 flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${e.status === "active" ? "bg-accent-green" : "bg-accent-orange animate-pulse-dot"}`} />
                  <div className="min-w-0">
                    <div className="font-mono text-sm">{e.name}</div>
                    <div className="text-xs text-muted truncate">{e.url}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className={`px-2 py-1 rounded ${
                    e.status === "active" ? "bg-accent-green/10 text-accent-green" : "bg-accent-orange/10 text-accent-orange"
                  }`}>
                    {e.status}
                  </span>
                  <span className="text-muted">Ping: {e.lastPing}</span>
                  <button className="text-muted hover:text-foreground transition-colors">Configure</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Webhook config */}
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="font-semibold text-sm mb-4">Webhook Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted block mb-1">Failure Webhook URL</label>
              <input
                type="text"
                readOnly
                value="https://hooks.acme.com/audiosae/failures"
                className="w-full bg-background border border-card-border rounded-md px-4 py-2 text-sm font-mono text-foreground"
              />
            </div>
            <div>
              <label className="text-xs text-muted block mb-1">Report Webhook URL</label>
              <input
                type="text"
                readOnly
                value="https://hooks.acme.com/audiosae/reports"
                className="w-full bg-background border border-card-border rounded-md px-4 py-2 text-sm font-mono text-foreground"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-accent-blue hover:bg-accent-blue/90 text-white text-sm px-4 py-2 rounded-md transition-colors">
                Test Webhooks
              </button>
              <span className="text-xs text-accent-green">Last test: successful (2h ago)</span>
            </div>
          </div>
        </div>

        {/* Quick start */}
        <div className="bg-card border border-card-border rounded-xl p-5">
          <h2 className="font-semibold text-sm mb-4">Quick Start</h2>
          <div className="bg-background rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-muted">
{`# Install the AudioSAE SDK
pip install audiosae-sdk

# Initialize the client
from audiosae import AudioSAEClient

client = AudioSAEClient(
    api_key="${showKey ? apiKey : "your-api-key"}",
    endpoint="https://console.audiosae.dev"
)

# Monitor a Whisper prediction
result = client.monitor(
    model="whisper-large-v3",
    audio_path="recording.wav",
    prediction=transcription_result
)

# Check for failures
if result.has_failure:
    print(f"Failure: {result.failure_type}")
    print(f"Top SAE features: {result.sae_features[:3]}")`}
            </pre>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
