"use client";

import { useState } from "react";
import { parseConversation, blocksToMarkdown, extractAllCode, type ParsedBlock } from "@/lib/parser";
import { SAMPLE_CONVERSATION } from "@/lib/sample-data";

function highlightSyntax(code: string): string {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(\/\/.*$|#.*$)/gm, '<span class="token-comment">$1</span>')
    .replace(/\b(import|from|export|default|const|let|var|function|return|if|else|for|while|class|interface|type|async|await|new|throw|try|catch|def|fn|use|pub|mod|package|func)\b/g, '<span class="token-keyword">$1</span>')
    .replace(/(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, '<span class="token-string">$&</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="token-number">$1</span>');
}

function CodeBlock({ block }: { block: ParsedBlock }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(block.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-lg border border-border bg-[#0d0d0d] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card text-xs text-muted">
        <span className="font-mono">{block.language || "text"}</span>
        <button
          onClick={copy}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted hover:text-foreground"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono">
        <code dangerouslySetInnerHTML={{ __html: highlightSyntax(block.content) }} />
      </pre>
    </div>
  );
}

function ProseBlock({ block }: { block: ParsedBlock }) {
  const lines = block.content.split("\n");
  return (
    <div className="prose-custom space-y-2">
      {lines.map((line, i) => {
        if (line.startsWith("## ")) {
          return <h2 key={i} className="text-xl font-semibold text-foreground mt-6 mb-2">{line.slice(3)}</h2>;
        }
        if (line.startsWith("# ")) {
          return <h1 key={i} className="text-2xl font-bold text-foreground mt-6 mb-2">{line.slice(2)}</h1>;
        }
        if (line.startsWith("- **")) {
          const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
          if (match) {
            return (
              <p key={i} className="text-muted pl-4">
                <span className="text-foreground font-medium">{match[1]}</span>
                {match[2]}
              </p>
            );
          }
        }
        if (line.startsWith("- ")) {
          return <p key={i} className="text-muted pl-4">• {line.slice(2)}</p>;
        }
        if (line.trim() === "") return <div key={i} className="h-2" />;
        return <p key={i} className="text-muted leading-relaxed">{line}</p>;
      })}
    </div>
  );
}

export default function ConvertTool() {
  const [input, setInput] = useState("");
  const [blocks, setBlocks] = useState<ParsedBlock[]>([]);
  const [converted, setConverted] = useState(false);
  const [mdCopied, setMdCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleConvert = () => {
    const text = input.trim() || SAMPLE_CONVERSATION;
    if (!input.trim()) setInput(SAMPLE_CONVERSATION);
    const parsed = parseConversation(text);
    setBlocks(parsed);
    setConverted(true);
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_CONVERSATION);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(blocksToMarkdown(blocks));
    setMdCopied(true);
    setTimeout(() => setMdCopied(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(extractAllCode(blocks));
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleDownload = () => {
    const md = blocksToMarkdown(blocks);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "agent-notebook.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setBlocks([]);
    setConverted(false);
  };

  const codeBlockCount = blocks.filter((b) => b.type === "code").length;
  const proseBlockCount = blocks.filter((b) => b.type === "prose").length;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {!converted ? (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your AI agent conversation here... (supports Claude, GPT, Gemini exports, or any markdown with code blocks)"
              className="w-full h-64 sm:h-80 p-4 sm:p-6 rounded-xl border border-border bg-card text-foreground font-mono text-sm resize-none placeholder:text-muted/50 focus:border-accent transition-colors"
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted">
              {input.length > 0 ? `${input.length} chars` : ""}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleConvert}
              className="px-6 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors text-sm"
            >
              Convert to Notebook
            </button>
            <button
              onClick={handleLoadSample}
              className="px-4 py-3 rounded-lg border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors text-sm"
            >
              Load sample conversation
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-0.5 rounded bg-accent/20 text-accent font-mono text-xs">
                  {codeBlockCount} code block{codeBlockCount !== 1 ? "s" : ""}
                </span>
                <span className="px-2 py-0.5 rounded bg-card border border-border text-muted font-mono text-xs">
                  {proseBlockCount} prose section{proseBlockCount !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleCopyMarkdown}
                className="px-3 py-1.5 rounded-md border border-border text-sm text-muted hover:text-foreground hover:border-accent/50 transition-colors"
              >
                {mdCopied ? "Copied!" : "Copy Markdown"}
              </button>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-md border border-border text-sm text-muted hover:text-foreground hover:border-accent/50 transition-colors"
              >
                {codeCopied ? "Copied!" : "Copy All Code"}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-md bg-accent/20 text-accent text-sm hover:bg-accent/30 transition-colors"
              >
                Download .md
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-md border border-border text-sm text-muted hover:text-foreground transition-colors"
              >
                New
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {blocks.map((block, i) =>
              block.type === "code" ? (
                <CodeBlock key={i} block={block} />
              ) : (
                <ProseBlock key={i} block={block} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
