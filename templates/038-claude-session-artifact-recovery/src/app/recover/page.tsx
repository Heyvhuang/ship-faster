"use client";
import { useState } from "react";

interface RecoveredFile {
  path: string;
  language: string;
  code: string;
  lines: number;
}

const MOCK_RESULTS: RecoveredFile[] = [
  {
    path: "src/api/routes.ts",
    language: "TypeScript",
    lines: 84,
    code: `import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { UserController } from "../controllers/user";

const router = Router();

router.get("/users", authMiddleware, UserController.list);
router.post("/users", authMiddleware, UserController.create);
router.put("/users/:id", authMiddleware, UserController.update);
router.delete("/users/:id", authMiddleware, UserController.remove);

export default router;`,
  },
  {
    path: "src/models/user.ts",
    language: "TypeScript",
    lines: 42,
    code: `interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export function createUser(data: Partial<User>): User {
  return {
    id: crypto.randomUUID(),
    email: data.email ?? "",
    name: data.name ?? "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}`,
  },
  {
    path: "src/middleware/auth.ts",
    language: "TypeScript",
    lines: 28,
    code: `import { Request, Response, NextFunction } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // Verify token logic here
  next();
}`,
  },
  {
    path: "src/utils/logger.py",
    language: "Python",
    lines: 31,
    code: `import logging
from datetime import datetime

def setup_logger(name: str) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        f"%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger`,
  },
  {
    path: "Dockerfile",
    language: "Docker",
    lines: 18,
    code: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]`,
  },
];

type Phase = "upload" | "processing" | "results";

export default function RecoverPage() {
  const [phase, setPhase] = useState<Phase>("upload");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<RecoveredFile[]>([]);
  const [expandedFile, setExpandedFile] = useState<string | null>(null);

  function simulateProcessing() {
    setPhase("processing");
    setProgress(0);
    const steps = [10, 25, 40, 55, 70, 85, 95, 100];
    steps.forEach((p, i) => {
      setTimeout(() => {
        setProgress(p);
        if (p === 100) {
          setTimeout(() => {
            setResults(MOCK_RESULTS);
            setSelected(new Set(MOCK_RESULTS.map((f) => f.path)));
            setPhase("results");
          }, 400);
        }
      }, (i + 1) * 350);
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    simulateProcessing();
  }

  function toggleFile(path: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-mono text-2xl font-bold md:text-3xl">
        <span className="text-accent">{">"}</span> Recover Session
      </h1>
      <p className="mt-2 text-sm text-muted">
        Upload a Claude Code session log to extract and recover your code.
      </p>

      {phase === "upload" && (
        <div
          className={`mt-10 flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            dragOver
              ? "border-accent bg-accent/5"
              : "border-border hover:border-muted"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={simulateProcessing}
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface-2 font-mono text-2xl text-accent">
            ↑
          </div>
          <p className="font-mono text-sm">
            Drag & drop session log here
          </p>
          <p className="mt-1 text-xs text-muted">
            or click to browse &middot; .jsonl, .json, or session directory
          </p>
          <div className="mt-6 rounded-md bg-surface px-4 py-2 font-mono text-xs text-muted">
            ~/.claude/sessions/&lt;session-id&gt;/
          </div>
        </div>
      )}

      {phase === "processing" && (
        <div className="mt-10 flex flex-col items-center py-20">
          <div className="mb-6 font-mono text-sm text-accent">Parsing session log...</div>
          <div className="h-2 w-64 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 font-mono text-xs text-muted">{progress}%</div>
          <div className="mt-8 space-y-1 font-mono text-xs text-muted">
            {progress >= 10 && <p className="text-accent">✓ Session file loaded</p>}
            {progress >= 40 && <p className="text-accent">✓ Identified 5 code blocks</p>}
            {progress >= 70 && <p className="text-accent">✓ Languages detected</p>}
            {progress >= 95 && <p className="text-accent">✓ File paths reconstructed</p>}
          </div>
        </div>
      )}

      {phase === "results" && (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm">
              <span className="text-accent">{results.length} files</span> recovered &middot;{" "}
              {results.reduce((a, f) => a + f.lines, 0)} lines of code
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setPhase("upload")}
                className="rounded-md border border-border px-4 py-1.5 text-xs text-muted hover:text-foreground transition-colors"
              >
                New Recovery
              </button>
              <button className="rounded-md bg-accent px-4 py-1.5 text-xs font-semibold text-black hover:bg-accent-dim transition-colors">
                Download Zip ({selected.size} files)
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {results.map((file) => (
              <div key={file.path} className="rounded-lg border border-border bg-surface overflow-hidden">
                <div
                  className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-surface-2 transition-colors"
                  onClick={() =>
                    setExpandedFile(expandedFile === file.path ? null : file.path)
                  }
                >
                  <input
                    type="checkbox"
                    checked={selected.has(file.path)}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleFile(file.path);
                    }}
                    className="accent-accent"
                  />
                  <span className="font-mono text-sm text-accent">{file.path}</span>
                  <span className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted">
                    {file.language}
                  </span>
                  <span className="ml-auto font-mono text-xs text-muted">
                    {file.lines} lines
                  </span>
                  <span className="text-muted">{expandedFile === file.path ? "▾" : "▸"}</span>
                </div>
                {expandedFile === file.path && (
                  <div className="border-t border-border bg-surface-2 p-4">
                    <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-accent/80">
                      {file.code}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
