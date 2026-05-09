"use client";

import { useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Link from "next/link";

const EXAMPLE_CODE = `import torch
import torch.nn as nn
from papercode.api import PrototypeModel, StandardAPI

class AttentionPooling(nn.Module):
    """Auto-generated from: arxiv.org/abs/2401.08541"""

    def __init__(self, dim=512, heads=8):
        super().__init__()
        self.attention = nn.MultiheadAttention(dim, heads)
        self.norm = nn.LayerNorm(dim)
        self.pool = nn.AdaptiveAvgPool1d(1)

    def forward(self, x):
        attn_out, _ = self.attention(x, x, x)
        x = self.norm(x + attn_out)
        return self.pool(x.transpose(1, 2)).squeeze(-1)

# === StandardAPI Wrapper ===
model = PrototypeModel(
    module=AttentionPooling(dim=512, heads=8),
    input_shape=(32, 128, 512),
    task="classification"
)

api = StandardAPI(model)
api.serve(port=8080)`;

const EXAMPLES = [
  {
    title: "Attention Pooling for Vision Transformers",
    source: "arxiv.org/abs/2401.08541",
    status: "completed",
    time: "47s",
    lines: 156,
  },
  {
    title: "Sparse Mixture-of-Experts Layer",
    source: "arxiv.org/abs/2401.04088",
    status: "completed",
    time: "1m 12s",
    lines: 243,
  },
  {
    title: "Contrastive Learning with Hard Negatives",
    source: "github.com/research-lab/cl-hard-neg",
    status: "completed",
    time: "38s",
    lines: 189,
  },
];

const STATS = [
  { label: "Papers Converted", value: "2,847" },
  { label: "Avg. Generation Time", value: "52s" },
  { label: "Success Rate", value: "94.2%" },
  { label: "Time Saved per Paper", value: "~18hrs" },
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");

  const handleGenerate = () => {
    if (!url.trim()) return;
    setGenerating(true);
    setProgress(0);

    const stages = [
      "Extracting paper metadata...",
      "Parsing methodology section...",
      "Identifying model architecture...",
      "Generating prototype code...",
      "Wrapping with StandardAPI...",
      "Running syntax validation...",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < stages.length) {
        setStage(stages[i]);
        setProgress(((i + 1) / stages.length) * 100);
        i++;
      } else {
        clearInterval(interval);
        window.location.href = "/viewer/demo";
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-block bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full mb-6 border border-green-500/20">
          Now in public beta — 50 free generations
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white leading-tight">
          ML Paper → <span className="text-green-400">Working Code</span>
          <br />
          in under a minute
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Paste an arXiv URL or GitHub repo link. Get a running prototype with standardized API
          interfaces. Skip weeks of manual implementation.
        </p>

        {/* Input */}
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 text-sm">
                $
              </span>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="arxiv.org/abs/2401.08541 or github.com/..."
                className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-8 pr-4 py-3 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-green-500 text-gray-950 px-6 py-3 rounded-lg font-medium hover:bg-green-400 transition-colors disabled:opacity-50 text-sm whitespace-nowrap"
            >
              {generating ? "Generating..." : "Generate Prototype"}
            </button>
          </div>

          {generating && (
            <div className="mt-4 text-left">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span className="text-green-400">{stage}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Code Preview */}
      <section className="max-w-4xl mx-auto px-4 pb-16 w-full">
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-800 bg-gray-900/50">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs text-gray-500">prototype_attention_pooling.py</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto text-gray-300 leading-relaxed">
            <code>{EXAMPLE_CODE}</code>
          </pre>
        </div>
        <p className="text-center text-xs text-gray-600 mt-3">
          Example output from arxiv.org/abs/2401.08541
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 pb-16 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-green-400">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 pb-16 w-full">
        <h2 className="text-2xl font-bold text-center mb-10 text-white">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Paste your paper",
              desc: "Enter an arXiv URL, paper abstract, or GitHub repo link. We extract methodology, architecture details, and hyperparameters.",
            },
            {
              step: "02",
              title: "We generate code",
              desc: "Our pipeline converts paper details into a working PyTorch prototype with proper model architecture and training loop.",
            },
            {
              step: "03",
              title: "Download & run",
              desc: "Get a zip with working code, StandardAPI wrapper, setup instructions, and dependency list. Run it immediately.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="text-green-400 text-xs font-bold mb-3">STEP {item.step}</div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent generations */}
      <section className="max-w-4xl mx-auto px-4 pb-16 w-full">
        <h2 className="text-2xl font-bold text-center mb-10 text-white">Recent Generations</h2>
        <div className="space-y-3">
          {EXAMPLES.map((ex) => (
            <Link
              key={ex.title}
              href="/viewer/demo"
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-green-500/50 transition-colors gap-2"
            >
              <div>
                <div className="text-white text-sm font-medium">{ex.title}</div>
                <div className="text-gray-500 text-xs">{ex.source}</div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{ex.lines} lines</span>
                <span>{ex.time}</span>
                <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                  {ex.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-20 w-full text-center">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-10">
          <h2 className="text-2xl font-bold text-white mb-3">
            Stop implementing papers by hand
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            Join 2,800+ researchers saving an average of 18 hours per paper implementation.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-green-500 text-gray-950 px-8 py-3 rounded-lg font-medium hover:bg-green-400 transition-colors text-sm"
          >
            Start Generating — Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
