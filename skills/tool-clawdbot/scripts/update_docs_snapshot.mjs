#!/usr/bin/env node
/*
  Crawl a docs site exposing /llms.txt into an offline Markdown mirror.

  Requirements: Node >= 22

  Example:
    node tool-clawdbot/scripts/update_docs_snapshot.mjs --base https://docs.clawd.bot --out clawdbot-docs
*/

import { EventEmitter } from 'node:events';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, posix as pathPosix } from 'node:path';
import { fileURLToPath } from 'node:url';

EventEmitter.defaultMaxListeners = Math.max(EventEmitter.defaultMaxListeners, 50);

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_OUT = join(SCRIPT_DIR, '../references/docs');

function usage() {
  return `
Usage:
  node tool-clawdbot/scripts/update_docs_snapshot.mjs [options]

Options:
  --base <url>          Base docs URL (default: https://docs.clawd.bot)
  --out <dir>           Output directory (default: tool-clawdbot/references/docs)
  --concurrency <n>     Parallel downloads (default: 5)
  --delay-ms <n>        Delay after each request per worker (default: 100)
  --limit <n>           Only download first N pages (default: no limit)
  --timeout-ms <n>      Per-request timeout (default: 30000)
  --help                Show this help
`;
}

function parseArgs(argv) {
  const args = {
    base: 'https://docs.clawd.bot',
    out: DEFAULT_OUT,
    concurrency: 5,
    delayMs: 100,
    limit: null,
    timeoutMs: 30000,
    help: false,
  };

  const tokens = [...argv];
  while (tokens.length) {
    const t = tokens.shift();
    if (t === '--help' || t === '-h') {
      args.help = true;
      continue;
    }

    if (!t.startsWith('--')) {
      throw new Error(`Unexpected argument: ${t}`);
    }

    const key = t.slice(2);
    const value = tokens.shift();
    if (value == null) {
      throw new Error(`Missing value for --${key}`);
    }

    switch (key) {
      case 'base':
        args.base = value;
        break;
      case 'out':
        args.out = value;
        break;
      case 'concurrency':
        args.concurrency = Number.parseInt(value, 10);
        break;
      case 'delay-ms':
        args.delayMs = Number.parseInt(value, 10);
        break;
      case 'limit':
        args.limit = Number.parseInt(value, 10);
        break;
      case 'timeout-ms':
        args.timeoutMs = Number.parseInt(value, 10);
        break;
      default:
        throw new Error(`Unknown flag: --${key}`);
    }
  }

  if (!Number.isFinite(args.concurrency) || args.concurrency < 1) {
    throw new Error('--concurrency must be >= 1');
  }
  if (!Number.isFinite(args.delayMs) || args.delayMs < 0) {
    throw new Error('--delay-ms must be >= 0');
  }
  if (args.limit != null && (!Number.isFinite(args.limit) || args.limit < 1)) {
    throw new Error('--limit must be >= 1');
  }
  if (!Number.isFinite(args.timeoutMs) || args.timeoutMs < 1) {
    throw new Error('--timeout-ms must be >= 1');
  }

  return args;
}

function normalizeBase(base) {
  const u = new URL(base);
  u.hash = '';
  u.search = '';
  // Ensure no trailing slash for consistent concatenation.
  u.pathname = u.pathname.replace(/\/+$/, '');
  return u;
}

async function sleep(ms) {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function extractUrlsFromLlmsTxt(llmsTxt, baseUrl) {
  const urls = [];
  const seen = new Set();
  const base = normalizeBase(baseUrl);

  for (const line of llmsTxt.split(/\r?\n/)) {
    const match = line.match(/\((https?:\/\/[^)]+)\)/);
    if (!match) continue;

    try {
      const u = new URL(match[1]);
      // Only keep same-origin URLs (avoid surprises).
      if (u.origin !== base.origin) continue;
      u.hash = '';
      // Keep search as-is (rare, but might matter).
      const s = u.toString();
      if (seen.has(s)) continue;
      seen.add(s);
      urls.push(s);
    } catch {
      // Ignore malformed URLs.
    }
  }

  return urls;
}

function urlToOutPath(baseUrl, pageUrl) {
  const base = normalizeBase(baseUrl);
  const u = new URL(pageUrl);

  if (u.origin !== base.origin) {
    throw new Error(`Cross-origin URL not allowed: ${pageUrl}`);
  }

  // Normalize to a relative POSIX path.
  let p = u.pathname;
  p = p.replace(/^\/+/, '');
  if (!p) {
    p = 'index.md';
  }
  // Avoid path traversal.
  const safe = pathPosix.normalize(p).replace(/^\.\//, '');
  if (safe.startsWith('..')) {
    throw new Error(`Unsafe path derived from URL: ${pageUrl}`);
  }

  return safe;
}

async function writeUtf8File(filePath, content) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content, { encoding: 'utf8' });
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function runOne() {
    while (true) {
      const i = nextIndex++;
      if (i >= items.length) return;
      results[i] = await worker(items[i], i);
    }
  }

  const runners = Array.from({ length: Math.min(limit, items.length) }, () => runOne());
  await Promise.all(runners);
  return results;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(usage());
    return;
  }

  const base = normalizeBase(args.base);
  const llmsUrl = new URL('/llms.txt', base).toString();

  const outDir = args.out;
  await mkdir(outDir, { recursive: true });

  console.log(`Base: ${base.toString()}`);
  console.log(`Index: ${llmsUrl}`);
  console.log(`Out: ${outDir}`);

  const llmsTxt = await fetchText(llmsUrl, args.timeoutMs);
  await writeUtf8File(join(outDir, 'llms.txt'), llmsTxt);

  let pageUrls = extractUrlsFromLlmsTxt(llmsTxt, base.toString());
  if (args.limit != null) {
    pageUrls = pageUrls.slice(0, args.limit);
  }

  if (pageUrls.length === 0) {
    throw new Error('No pages found in llms.txt');
  }

  console.log(`Pages: ${pageUrls.length}`);
  console.log(`Concurrency: ${args.concurrency}  Delay: ${args.delayMs}ms  Timeout: ${args.timeoutMs}ms`);

  const failures = [];
  const successes = [];

  await mapLimit(pageUrls, args.concurrency, async (pageUrl) => {
    const relPath = urlToOutPath(base.toString(), pageUrl);
    const dst = join(outDir, relPath);

    try {
      const text = await fetchText(pageUrl, args.timeoutMs);
      await writeUtf8File(dst, text);
      successes.push({ relPath, pageUrl });
      console.log(`OK  ${relPath}`);
    } catch (e) {
      failures.push({ relPath, pageUrl, error: String(e && e.message ? e.message : e) });
      console.error(`ERR ${relPath}  (${pageUrl})`);
    } finally {
      await sleep(args.delayMs);
    }
  });

  const indexLines = [];
  indexLines.push('# Documentation Index');
  indexLines.push('');
  indexLines.push(`Base: ${base.toString()}`);
  indexLines.push(`Generated: ${new Date().toISOString()}`);
  indexLines.push(`Pages requested: ${pageUrls.length}`);
  indexLines.push(`Saved: ${successes.length}`);
  indexLines.push(`Failed: ${failures.length}`);
  indexLines.push('');
  indexLines.push('## Pages');
  indexLines.push('');
  for (const p of successes.sort((a, b) => a.relPath.localeCompare(b.relPath))) {
    indexLines.push(`- [${p.relPath}](${p.relPath}) (${p.pageUrl})`);
  }

  if (failures.length) {
    indexLines.push('');
    indexLines.push('## Failures');
    indexLines.push('');
    for (const f of failures) {
      indexLines.push(`- ${f.relPath} (${f.pageUrl}) - ${f.error}`);
    }
  }

  await writeUtf8File(join(outDir, 'INDEX.md'), indexLines.join('\n') + '\n');

  console.log(`Done. Saved=${successes.length} Failed=${failures.length}`);
  if (failures.length) {
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e && e.stack ? e.stack : String(e));
  process.exitCode = 1;
});
