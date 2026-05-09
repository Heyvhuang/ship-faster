"use client";

import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";

const GENERATIONS = [
  {
    id: "gen-001",
    title: "Attention Pooling for Vision Transformers",
    source: "arxiv.org/abs/2401.08541",
    status: "completed" as const,
    date: "2026-02-25",
    time: "47s",
    lines: 156,
  },
  {
    id: "gen-002",
    title: "Sparse Mixture-of-Experts Layer",
    source: "arxiv.org/abs/2401.04088",
    status: "completed" as const,
    date: "2026-02-24",
    time: "1m 12s",
    lines: 243,
  },
  {
    id: "gen-003",
    title: "Contrastive Learning with Hard Negatives",
    source: "github.com/research-lab/cl-hard-neg",
    status: "completed" as const,
    date: "2026-02-24",
    time: "38s",
    lines: 189,
  },
  {
    id: "gen-004",
    title: "Neural Radiance Fields with Depth Supervision",
    source: "arxiv.org/abs/2402.01293",
    status: "generating" as const,
    date: "2026-02-25",
    time: "--",
    lines: 0,
  },
  {
    id: "gen-005",
    title: "Diffusion Model with Classifier-Free Guidance",
    source: "arxiv.org/abs/2401.11478",
    status: "completed" as const,
    date: "2026-02-23",
    time: "2m 04s",
    lines: 412,
  },
  {
    id: "gen-006",
    title: "Graph Neural Network for Molecule Property Prediction",
    source: "github.com/mol-ai/gnn-props",
    status: "failed" as const,
    date: "2026-02-23",
    time: "--",
    lines: 0,
  },
];

const statusColor = {
  completed: "text-green-400 bg-green-500/10",
  generating: "text-yellow-400 bg-yellow-500/10",
  failed: "text-red-400 bg-red-500/10",
};

export default function Dashboard() {
  const [url, setUrl] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <div className="max-w-5xl mx-auto px-4 py-10 w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              42 of 50 free generations remaining
            </p>
          </div>
          <div className="flex gap-3 text-sm">
            <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-center">
              <div className="text-green-400 font-bold">8</div>
              <div className="text-gray-500 text-xs">Generated</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-center">
              <div className="text-green-400 font-bold">94%</div>
              <div className="text-gray-500 text-xs">Success</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-center">
              <div className="text-green-400 font-bold">52s</div>
              <div className="text-gray-500 text-xs">Avg Time</div>
            </div>
          </div>
        </div>

        {/* New generation input */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 text-sm">$</span>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste arXiv URL or GitHub link..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-8 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
            <button className="bg-green-500 text-gray-950 px-6 py-2.5 rounded-lg font-medium hover:bg-green-400 transition-colors text-sm whitespace-nowrap">
              Generate
            </button>
          </div>
        </div>

        {/* Generation history */}
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Generation History
        </h2>
        <div className="space-y-2">
          {GENERATIONS.map((gen) => (
            <Link
              key={gen.id}
              href={gen.status === "completed" ? "/viewer/demo" : "#"}
              className={`flex flex-col sm:flex-row sm:items-center justify-between bg-gray-900 border border-gray-800 rounded-lg p-4 gap-2 transition-colors ${
                gen.status === "completed" ? "hover:border-green-500/50 cursor-pointer" : "opacity-70"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{gen.title}</div>
                <div className="text-gray-500 text-xs mt-0.5">{gen.source}</div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 shrink-0">
                <span>{gen.date}</span>
                {gen.lines > 0 && <span>{gen.lines} lines</span>}
                <span>{gen.time}</span>
                <span className={`px-2 py-0.5 rounded ${statusColor[gen.status]}`}>
                  {gen.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
