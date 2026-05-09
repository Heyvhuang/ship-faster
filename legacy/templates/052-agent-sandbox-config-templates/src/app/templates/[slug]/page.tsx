"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { templates, type Agent } from "@/lib/data";
import { useState } from "react";

function AgentSelector({
  agents,
  selected,
  onSelect,
}: {
  agents: Agent[];
  selected: Agent;
  onSelect: (a: Agent) => void;
}) {
  return (
    <div className="flex gap-2">
      {agents.map((a) => (
        <button
          key={a}
          onClick={() => onSelect(a)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selected === a
              ? "bg-green text-black"
              : "bg-card-bg border border-card-border text-muted hover:text-foreground"
          }`}
        >
          {a.charAt(0).toUpperCase() + a.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default function TemplatePage() {
  const { slug } = useParams<{ slug: string }>();
  const template = templates.find((t) => t.slug === slug);
  const [selectedAgent, setSelectedAgent] = useState<Agent>("claude");
  const [copied, setCopied] = useState(false);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template not found</h1>
          <Link href="/" className="text-green hover:underline">
            Back to templates
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    const blob = new Blob([template.configPreview], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.slug}-${selectedAgent}.safespace`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(template.configPreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <nav className="border-b border-card-border px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-green font-bold text-lg"
        >
          <span className="text-xl">🛡️</span>
          <span>safespace</span>
        </Link>
        <Link href="/" className="text-sm text-muted hover:text-green transition-colors">
          ← All Templates
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-start gap-4 mb-2">
          <span className="text-4xl">{template.icon}</span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{template.title}</h1>
            <p className="text-muted mt-2 text-lg">{template.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6 mb-10 text-sm text-muted">
          <span>v{template.version}</span>
          <span>•</span>
          <span>{template.downloads.toLocaleString()} downloads</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-lg font-semibold mb-3">Select Agent</h2>
              <AgentSelector
                agents={template.agents}
                selected={selectedAgent}
                onSelect={setSelectedAgent}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Configuration</h2>
                <button
                  onClick={handleCopy}
                  className="text-xs text-muted hover:text-green transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="bg-card-bg border border-card-border rounded-lg p-4 overflow-x-auto">
                <div className="flex items-center gap-2 mb-3 text-muted text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green/80"></span>
                  <span className="ml-2">
                    {template.slug}-{selectedAgent}.safespace
                  </span>
                </div>
                <pre className="text-sm text-green/80 leading-relaxed">
                  <code>{template.configPreview}</code>
                </pre>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Quick Start</h2>
              <div className="bg-card-bg border border-card-border rounded-lg p-4 text-sm space-y-2">
                <p className="text-muted">
                  <span className="text-green">1.</span> Download the .safespace
                  file below
                </p>
                <p className="text-muted">
                  <span className="text-green">2.</span> Open Agent Safehouse on
                  your Mac
                </p>
                <p className="text-muted">
                  <span className="text-green">3.</span> Click{" "}
                  <code className="text-foreground bg-background px-1.5 py-0.5 rounded text-xs">
                    Import Config
                  </code>{" "}
                  and select the file
                </p>
                <p className="text-muted">
                  <span className="text-green">4.</span> Run{" "}
                  <code className="text-green bg-background px-1.5 py-0.5 rounded text-xs">
                    safehouse start
                  </code>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleDownload}
              className="w-full bg-green text-black font-semibold py-3 px-6 rounded-md hover:bg-green-dim transition-colors"
            >
              Download .safespace
            </button>

            <div>
              <h3 className="text-sm font-semibold mb-3 text-green">
                ✓ Allowed
              </h3>
              <ul className="space-y-2">
                {template.permissions.allow.map((p) => (
                  <li
                    key={p}
                    className="text-xs bg-green-dark/20 border border-green-dark/40 rounded px-3 py-2 text-green/80"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3 text-red-400">
                ✗ Denied
              </h3>
              <ul className="space-y-2">
                {template.permissions.deny.map((p) => (
                  <li
                    key={p}
                    className="text-xs bg-red-500/10 border border-red-500/20 rounded px-3 py-2 text-red-400/80"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
