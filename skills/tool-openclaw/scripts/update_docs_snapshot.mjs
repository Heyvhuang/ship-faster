#!/usr/bin/env node
/**
 * OpenClaw Docs Snapshot Updater
 *
 * Goals:
 * - Keep references/docs/ as a local snapshot of https://docs.openclaw.ai
 * - Provide a deterministic index file for "low IQ" models to route queries fast
 * - Support:
 *   - mode=seed   (only fetch placeholders / missing)
 *   - mode=full   (refresh everything)
 *   - mode=index  (only rebuild index)
 *   - mode=single (fetch one URL -> mapped local path)
 *
 * Notes:
 * - This repo is intentionally dependency-light.
 * - For zh-CN, docs pages are often HTML (no .md). Use --locale zh-CN to map:
 *     install/updating.md -> /zh-CN/install/updating
 *     tools/index.md      -> /zh-CN/tools
 *   If the localized page is missing, it falls back to the English .md URL (default).
 */

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILL_ROOT = path.resolve(__dirname, "..");

// Allow scripts/update.sh to remain a stable entrypoint while also supporting
// `--out <dir>` for smoke tests or alternative snapshot locations.
let DOCS_DIR = path.join(SKILL_ROOT, "references", "docs");
let INDEX_MD = path.join(DOCS_DIR, "__SNAPSHOT_INDEX.md");
let INDEX_JSON = path.join(DOCS_DIR, "__SNAPSHOT_INDEX.json");
let MANIFEST_JSON = path.join(DOCS_DIR, "__SNAPSHOT_MANIFEST.json");

function setDocsDir(nextDocsDir) {
  DOCS_DIR = nextDocsDir;
  INDEX_MD = path.join(DOCS_DIR, "__SNAPSHOT_INDEX.md");
  INDEX_JSON = path.join(DOCS_DIR, "__SNAPSHOT_INDEX.json");
  MANIFEST_JSON = path.join(DOCS_DIR, "__SNAPSHOT_MANIFEST.json");
}

const DEFAULT_BASE = "https://docs.openclaw.ai";
const PLACEHOLDER_MARKER = "status=placeholder";

const CATEGORY_LABELS = {
  start: "Start / Onboarding",
  install: "Install & Updates",
  cli: "CLI Reference",
  gateway: "Gateway & Ops",
  channels: "Channels",
  providers: "Model Providers",
  tools: "Tools & Skills",
  nodes: "Nodes",
  platforms: "Platforms",
  web: "Web & UI",
  automation: "Automation",
  concepts: "Core Concepts",
  reference: "Reference & Templates",
  security: "Security",
  help: "Help",
};

function nowIso() {
  return new Date().toISOString();
}

function sha256(text) {
  return crypto.createHash("sha256").update(text, "utf8").digest("hex");
}

function parseArgs(argv) {
  const out = {
    mode: "seed", // seed|full|index|single
    base: DEFAULT_BASE,
    out: null, // override output dir (default: skill references/docs)
    locale: null, // e.g. "zh-CN"
    concurrency: 6,
    timeoutMs: 25000,
    retries: 2,
    dryRun: false,
    filter: null, // regex
    url: null, // for single
    fallbackToEn: true,
    quiet: false,
  };

  const args = [...argv];
  while (args.length) {
    const a = args.shift();
    if (a === "--mode") out.mode = args.shift();
    else if (a === "--base") out.base = args.shift();
    else if (a === "--out") out.out = args.shift();
    else if (a === "--locale") out.locale = args.shift();
    else if (a === "--concurrency") out.concurrency = Number(args.shift());
    else if (a === "--timeoutMs") out.timeoutMs = Number(args.shift());
    else if (a === "--retries") out.retries = Number(args.shift());
    else if (a === "--filter") out.filter = args.shift();
    else if (a === "--url") out.url = args.shift();
    else if (a === "--no-fallback") out.fallbackToEn = false;
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--quiet") out.quiet = true;
    else if (a === "-h" || a === "--help") out.mode = "help";
    else {
      // allow shorthand: node ... seed/full/index/single
      if (["seed", "full", "index", "single"].includes(a) && out.mode === "seed") out.mode = a;
      else {
        console.error(`Unknown arg: ${a}`);
        out.mode = "help";
      }
    }
  }
  return out;
}

function normalizeBase(base) {
  return base.replace(/\/+$/, "");
}

function relFromDocsDir(absPath) {
  const rel = path.relative(DOCS_DIR, absPath);
  return rel.split(path.sep).join("/");
}

function looksLikeIndexMd(rel) {
  return rel.endsWith("/index.md") || rel === "index.md";
}

function buildUrlFromRel(rel, base) {
  return `${normalizeBase(base)}/${rel}`;
}

function buildLocalizedUrlFromRel(rel, base, locale) {
  // Map *.md -> no extension (Mintlify-style), index.md -> directory route
  const b = normalizeBase(base);
  const noExt = rel.replace(/\.md$/i, "");
  const localizedPath = looksLikeIndexMd(rel)
    ? rel.replace(/\/index\.md$/i, "").replace(/^index\.md$/i, "")
    : noExt;
  // Avoid double slashes
  const mid = localizedPath ? `/${localizedPath}` : "";
  return `${b}/${locale}${mid}`;
}

function parseSnapshotHeader(text) {
  // <!-- SNAPSHOT: key=value; key=value; ... -->
  const m = text.match(/^<!--\s*SNAPSHOT:\s*([^>]+)\s*-->/i);
  if (!m) return null;
  const raw = m[1];
  const parts = raw.split(";").map((s) => s.trim()).filter(Boolean);
  const kv = {};
  for (const p of parts) {
    const idx = p.indexOf("=");
    if (idx === -1) continue;
    const k = p.slice(0, idx).trim();
    const v = p.slice(idx + 1).trim();
    kv[k] = v;
  }
  return kv;
}

function buildSnapshotHeader(meta) {
  // keep stable ordering for diff friendliness
  const keys = ["source_url", "fetched_at", "sha256", "content_type", "status"];
  const parts = [];
  for (const k of keys) {
    if (meta[k] === undefined || meta[k] === null) continue;
    parts.push(`${k}=${meta[k]}`);
  }
  return `<!-- SNAPSHOT: ${parts.join("; ")} -->`;
}

function titleFromRel(rel) {
  const stem = rel.replace(/\.(md|txt)$/i, "");
  const parts = stem.split("/");
  const last = parts[parts.length - 1] || stem;
  const sec = parts.length > 1 ? parts[0] : null;

  const pretty = (s) =>
    s
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  if (!sec) return pretty(last);
  return `${pretty(sec)}: ${pretty(last)}`;
}

function categoryFromRel(rel) {
  const seg = rel.split("/")[0];
  return CATEGORY_LABELS[seg] ? seg : "misc";
}

function tagsFromRel(rel) {
  const stem = rel.replace(/\.(md|txt)$/i, "");
  const toks = stem
    .split(/[\/\-_]/g)
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t && t.length >= 2 && t !== "index");
  // De-dup
  return [...new Set(toks)].slice(0, 12);
}

function extractUrlsFromLlmsTxt(llmsTxt, baseUrl) {
  // llms.txt is a Markdown-ish list of links; extract same-origin URLs.
  const urls = [];
  const seen = new Set();
  const base = new URL(normalizeBase(baseUrl));

  for (const line of llmsTxt.split(/\r?\n/)) {
    const m = line.match(/\((https?:\/\/[^)]+)\)/);
    if (!m) continue;
    try {
      const u = new URL(m[1]);
      if (u.origin !== base.origin) continue;
      u.hash = "";
      const s = u.toString();
      if (seen.has(s)) continue;
      seen.add(s);
      urls.push(s);
    } catch {
      // ignore malformed URL
    }
  }

  return urls;
}

function urlToRelPath(baseUrl, pageUrl) {
  const base = new URL(normalizeBase(baseUrl));
  const u = new URL(pageUrl);
  if (u.origin !== base.origin) {
    throw new Error(`Cross-origin URL not allowed: ${pageUrl}`);
  }

  let rel = u.pathname.replace(/^\/+/, "");
  if (!rel) rel = "index.md";
  if (!/\.(md|txt)$/i.test(rel)) rel = `${rel}.md`;
  return rel;
}

async function syncPlaceholdersFromLlms(cfg) {
  const llmsUrl = `${normalizeBase(cfg.base)}/llms.txt`;
  const { text } = await fetchText(llmsUrl, cfg.timeoutMs, cfg.retries, cfg.quiet);
  const urls = extractUrlsFromLlmsTxt(text, cfg.base);

  let created = 0;
  for (const pageUrl of urls) {
    const rel = urlToRelPath(cfg.base, pageUrl);
    const abs = path.join(DOCS_DIR, rel);

    const exists = await fs
      .stat(abs)
      .then(() => true)
      .catch(() => false);
    if (exists) continue;

    await ensureDir(path.dirname(abs));
    const header = buildSnapshotHeader({
      source_url: pageUrl,
      fetched_at: "null",
      sha256: "null",
      content_type: "unknown",
      status: "placeholder",
    });
    const body = `${header}\n\n# ${titleFromRel(rel)}\n\n`;
    if (!cfg.dryRun) {
      await fs.writeFile(abs, body, "utf8");
    }
    created += 1;
  }

  if (!cfg.quiet) console.log(`Synced llms.txt frontier: created=${created}, seen=${urls.length}`);
}

async function walkFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walkFiles(p)));
      continue;
    }
    out.push(p);
  }
  return out;
}

async function safeReadText(p) {
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    return null;
  }
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function fetchText(url, timeoutMs, retries, quiet) {
  const doFetch = async () => {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": "openclaw-docs-snapshot/1.0",
          "Accept": "text/markdown,text/plain,text/html;q=0.9,*/*;q=0.1",
        },
        signal: ac.signal,
      });
      const ct = (res.headers.get("content-type") || "").toLowerCase();
      const text = await res.text();
      if (!res.ok) {
        const head = text.slice(0, 400);
        throw new Error(`HTTP ${res.status} ${res.statusText} (ct=${ct}) body=${head}`);
      }
      return { text, contentType: ct };
    } finally {
      clearTimeout(t);
    }
  };

  let lastErr = null;
  for (let i = 0; i <= retries; i++) {
    try {
      return await doFetch();
    } catch (e) {
      lastErr = e;
      if (!quiet) console.error(`fetch failed (${i + 1}/${retries + 1}): ${url}\n  ${String(e)}`);
      if (i < retries) await new Promise((r) => setTimeout(r, 600 * (i + 1)));
    }
  }
  throw lastErr;
}

function decodeHtmlEntities(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function htmlToMarkdownBasic(html) {
  // Remove script/style
  let h = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  h = h.replace(/<style[\s\S]*?<\/style>/gi, "");

  // Try to keep main/article only
  const main = h.match(/<main[\s\S]*?<\/main>/i);
  if (main) h = main[0];
  const article = h.match(/<article[\s\S]*?<\/article>/i);
  if (article) h = article[0];

  // Code blocks
  h = h.replace(/<pre[^>]*>\s*<code[^>]*>/gi, "\n```text\n");
  h = h.replace(/<\/code>\s*<\/pre>/gi, "\n```\n");

  // Headings
  h = h.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n");
  h = h.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n");
  h = h.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n");
  h = h.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n");

  // Inline code
  h = h.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");

  // Links (keep text + url)
  h = h.replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");

  // Lists
  h = h.replace(/<\/li>\s*<li[^>]*>/gi, "\n- ");
  h = h.replace(/<li[^>]*>/gi, "\n- ");
  h = h.replace(/<\/li>/gi, "");

  // Paragraphs / breaks
  h = h.replace(/<p[^>]*>/gi, "\n");
  h = h.replace(/<\/p>/gi, "\n");
  h = h.replace(/<br\s*\/?>/gi, "\n");

  // Remove remaining tags
  h = h.replace(/<[^>]+>/g, "");

  // Decode entities + cleanup
  h = decodeHtmlEntities(h);
  h = h.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  // Collapse excessive newlines
  h = h.replace(/\n{3,}/g, "\n\n");
  return h.trim() + "\n";
}

async function updateOneFile(absPath, cfg) {
  const rel = relFromDocsDir(absPath);
  if (rel === "__SNAPSHOT_INDEX.md" || rel === "__SNAPSHOT_INDEX.json" || rel === "__SNAPSHOT_MANIFEST.json") {
    return { skipped: true };
  }

  const raw = (await safeReadText(absPath)) || "";
  const header = parseSnapshotHeader(raw) || {};
  const status = header.status || (raw.includes(PLACEHOLDER_MARKER) ? "placeholder" : "unknown");

  // seed mode: only placeholders
  if (cfg.mode === "seed" && status !== "placeholder") {
    return { skipped: true, rel, reason: "not-placeholder" };
  }

  if (cfg.filter) {
    const re = new RegExp(cfg.filter, "i");
    if (!re.test(rel)) return { skipped: true, rel, reason: "filter" };
  }

  const base = normalizeBase(cfg.base);
  const enUrl = header.source_url || buildUrlFromRel(rel, base);
  let url = enUrl;

  if (cfg.locale) {
    const locUrl = buildLocalizedUrlFromRel(rel, base, cfg.locale);
    try {
      const { text, contentType } = await fetchText(locUrl, cfg.timeoutMs, cfg.retries, cfg.quiet);
      url = locUrl;
      return await writeFetched(absPath, rel, url, text, contentType, cfg);
    } catch (e) {
      if (!cfg.fallbackToEn) throw e;
      if (!cfg.quiet) console.error(`locale miss -> fallback to en: ${locUrl}`);
    }
  }

  const { text, contentType } = await fetchText(url, cfg.timeoutMs, cfg.retries, cfg.quiet);
  return await writeFetched(absPath, rel, url, text, contentType, cfg);
}

async function writeFetched(absPath, rel, url, text, contentType, cfg) {
  let body = text;
  let ct = contentType || "unknown";

  // If HTML, convert (basic) so the snapshot stays readable in Markdown
  if (ct.includes("text/html")) {
    body = htmlToMarkdownBasic(text);
    ct = "text/html->markdown-basic";
  }

  const digest = sha256(body);
  const header = buildSnapshotHeader({
    source_url: url,
    fetched_at: nowIso(),
    sha256: digest,
    content_type: ct,
    status: "ok",
  });

  const out = `${header}\n\n${body.trim()}\n`;
  if (cfg.dryRun) {
    return { updated: true, rel, url, sha256: digest, dryRun: true };
  }

  await ensureDir(path.dirname(absPath));
  await fs.writeFile(absPath, out.replace(/\r\n/g, "\n"), "utf8");
  return { updated: true, rel, url, sha256: digest };
}

async function pMap(items, concurrency, fn) {
  const results = [];
  let i = 0;
  const workers = Array.from({ length: concurrency }).map(async () => {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      results[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return results;
}

async function buildIndex() {
  const all = await walkFiles(DOCS_DIR);
  const entries = [];

  for (const f of all) {
    const rel = relFromDocsDir(f);
    if (rel === "__SNAPSHOT_INDEX.md" || rel === "__SNAPSHOT_INDEX.json" || rel === "__SNAPSHOT_MANIFEST.json") continue;
    if (!/\.(md|txt)$/i.test(rel)) continue;

    const raw = (await safeReadText(f)) || "";
    const header = parseSnapshotHeader(raw) || {};
    const title = extractTitle(raw) || titleFromRel(rel);
    const cat = categoryFromRel(rel);
    const tags = tagsFromRel(rel);
    const url = header.source_url || buildUrlFromRel(rel, DEFAULT_BASE);
    // Older snapshots may not include SNAPSHOT headers; treat them as OK content
    // unless they explicitly look like placeholders.
    const status = header.status || (raw.includes(PLACEHOLDER_MARKER) ? "placeholder" : "ok");
    const fetchedAt = header.fetched_at || null;
    entries.push({ rel, title, category: cat, categoryLabel: CATEGORY_LABELS[cat] || "Misc", tags, url, status, fetchedAt });
  }

  // Sort deterministically
  entries.sort((a, b) => a.rel.localeCompare(b.rel));

  const md = renderIndexMarkdown(entries);
  const json = JSON.stringify(
    {
      generated_at: nowIso(),
      snapshot_root: "references/docs/",
      count: entries.length,
      categories: Object.fromEntries(Object.entries(CATEGORY_LABELS)),
      entries,
    },
    null,
    2
  );

  await fs.writeFile(INDEX_MD, md.replace(/\r\n/g, "\n"), "utf8");
  await fs.writeFile(INDEX_JSON, json.replace(/\r\n/g, "\n"), "utf8");
  await fs.writeFile(
    MANIFEST_JSON,
    JSON.stringify({ generated_at: nowIso(), count: entries.length, files: entries.map((e) => e.rel) }, null, 2),
    "utf8"
  );

  return entries.length;
}

function extractTitle(markdown) {
  // Prefer first h1
  const lines = markdown.split("\n");
  for (const ln of lines) {
    const m = ln.match(/^#\s+(.+?)\s*$/);
    if (m) return m[1].trim();
  }
  return null;
}

function renderIndexMarkdown(entries) {
  const generated = nowIso();

  // Group by category
  const byCat = new Map();
  for (const e of entries) {
    const cat = e.category || "misc";
    if (!byCat.has(cat)) byCat.set(cat, []);
    byCat.get(cat).push(e);
  }

  const catOrder = [
    "start",
    "install",
    "cli",
    "gateway",
    "channels",
    "providers",
    "tools",
    "nodes",
    "platforms",
    "web",
    "automation",
    "concepts",
    "reference",
    "security",
    "help",
    "misc",
  ];

  const lines = [];
  lines.push(`# OpenClaw Docs Snapshot Index`);
  lines.push(``);
  lines.push(`Generated: \`${generated}\``);
  lines.push(`Snapshot root: \`references/docs/\``);
  lines.push(``);
  lines.push(`## Quick Routing (Start Here)`);
  lines.push(``);
  lines.push(
    `> Rule: use keywords to map the problem to one category, then open the 1-3 most relevant files. Do not skim dozens of pages.`
  );
  lines.push(``);
  lines.push(
    `- **Install / onboarding / pairing** → \`start/getting-started.md\`, \`start/setup.md\`, \`start/pairing.md\`, \`install/index.md\``
  );
  lines.push(
    `- **Updates / upgrade channels** → \`install/updating.md\`, \`install/development-channels.md\`, \`cli/update.md\``
  );
  lines.push(`- **Not sure how to use a CLI command** → \`cli/index.md\` + open \`cli/<command>.md\``);
  lines.push(
    `- **Gateway config / ports / tokens / auth** → \`gateway/configuration.md\`, \`gateway/authentication.md\`, \`gateway/index.md\``
  );
  lines.push(
    `- **Remote access / Tailscale / Bonjour / discovery** → \`gateway/remote.md\`, \`gateway/tailscale.md\`, \`gateway/discovery.md\``
  );
  lines.push(
    `- **Security / sandboxing / elevation** → \`gateway/security.md\`, \`gateway/sandboxing.md\`, \`gateway/sandbox-vs-tool-policy-vs-elevated.md\``
  );
  lines.push(
    `- **Channels (WhatsApp/Telegram/Discord/Slack...)** → \`channels/index.md\` + \`channels/<name>.md\` + \`channels/troubleshooting.md\``
  );
  lines.push(`- **Tools (exec/browser/apply_patch/web...)** → \`tools/index.md\` + \`tools/<tool>.md\``);
  lines.push(
    `- **Providers / config / billing** → \`providers/index.md\`, \`providers/openai.md\`, \`providers/anthropic.md\`, \`token-use.md\``
  );
  lines.push(
    `- **Troubleshooting** → \`help/troubleshooting.md\`, \`gateway/troubleshooting.md\`, \`debugging.md\`, \`cli/logs.md\`, \`cli/doctor.md\``
  );
  lines.push(``);
  lines.push(`## Full Directory`);
  lines.push(``);

  for (const cat of catOrder) {
    const items = byCat.get(cat);
    if (!items || items.length === 0) continue;
    const label = CATEGORY_LABELS[cat] || "Misc";
    lines.push(`### ${label}`);
    lines.push(``);
    for (const it of items) {
      const tags = it.tags && it.tags.length ? `tags: ${it.tags.join(", ")}` : "";
      const status = it.status && it.status !== "ok" ? `status: ${it.status}` : "";
      const meta = [tags, status].filter(Boolean).join(" · ");
      const metaStr = meta ? ` — ${meta}` : "";
      lines.push(`- [${it.title}](${it.rel})${metaStr} · Remote: ${it.url}`);
    }
    lines.push(``);
  }

  return lines.join("\n") + "\n";
}

async function main() {
  const cfg = parseArgs(process.argv.slice(2));
  if (cfg.mode === "help") {
    console.log(`
Usage:
  node scripts/update_docs_snapshot.mjs [--mode seed|full|sync|index|single] [options]

Modes:
  --mode seed    Only fetch placeholder files (fast, safe default)
  --mode full    Refresh every snapshot file (slow)
  --mode sync    Sync llms.txt frontier -> create missing placeholders + rebuild index (no page fetch)
  --mode index   Only rebuild __SNAPSHOT_INDEX.(md|json)
  --mode single  Fetch one URL and write it into references/docs/<url-path>

Options:
  --base <url>         Base docs site (default: ${DEFAULT_BASE})
  --out <dir>          Output dir (default: references/docs/)
  --locale <name>      e.g. zh-CN (try localized route first, then fallback)
  --no-fallback        Disable locale fallback to English
  --filter <regex>     Only update files whose relative path matches regex
  --concurrency <n>    Default: 6
  --timeoutMs <ms>     Default: 25000
  --retries <n>        Default: 2
  --url <url>          (single mode) The exact URL to fetch
  --dry-run            Do not write files
  --quiet              Less logging

Examples:
  node scripts/update_docs_snapshot.mjs --mode seed
  node scripts/update_docs_snapshot.mjs --mode sync
  node scripts/update_docs_snapshot.mjs --mode full --filter "^gateway/"
  node scripts/update_docs_snapshot.mjs --mode seed --locale zh-CN
  node scripts/update_docs_snapshot.mjs --mode single --url https://docs.openclaw.ai/cli/update.md
  node scripts/update_docs_snapshot.mjs --mode index
`);
    process.exit(0);
  }

  if (cfg.out) {
    setDocsDir(path.resolve(cfg.out));
  }

  await ensureDir(DOCS_DIR);

  if (cfg.mode === "index") {
    const n = await buildIndex();
    console.log(`Index updated: ${n} entries`);
    return;
  }

  if (cfg.mode === "sync") {
    await syncPlaceholdersFromLlms(cfg);
    const n = await buildIndex();
    console.log(`Synced placeholders and rebuilt index: ${n} entries`);
    return;
  }

  if (cfg.mode === "single") {
    if (!cfg.url) {
      console.error("single mode requires --url");
      process.exit(2);
    }
    const u = new URL(cfg.url);
    // map URL path -> references/docs/<path>
    let rel = u.pathname.replace(/^\/+/, "");
    if (!rel) {
      console.error("URL path is empty; cannot map to a file");
      process.exit(2);
    }
    // If URL doesn't end with .md/.txt, store as .md
    if (!/\.(md|txt)$/i.test(rel)) rel = `${rel}.md`;

    const abs = path.join(DOCS_DIR, rel);
    await ensureDir(path.dirname(abs));
    // Create placeholder if missing
    const exists = await fs
      .stat(abs)
      .then(() => true)
      .catch(() => false);
    if (!exists) {
      const header = buildSnapshotHeader({
        source_url: cfg.url,
        fetched_at: "null",
        sha256: "null",
        content_type: "unknown",
        status: "placeholder",
      });
      await fs.writeFile(abs, `${header}\n\n# ${titleFromRel(rel)}\n\n`, "utf8");
    }

    cfg.mode = "full"; // update regardless of placeholder
    await updateOneFile(abs, cfg);
    const n = await buildIndex();
    console.log(`Fetched -> ${rel}. Index entries: ${n}`);
    return;
  }

  // seed/full: sync local placeholders from the current llms.txt frontier so
  // newly-added docs pages can be fetched even if they didn't exist locally yet.
  await syncPlaceholdersFromLlms(cfg);

  // seed/full: update existing snapshot files
  const all = await walkFiles(DOCS_DIR);
  const targets = all.filter((p) => {
    const rel = relFromDocsDir(p);
    if (rel === "__SNAPSHOT_INDEX.md" || rel === "__SNAPSHOT_INDEX.json" || rel === "__SNAPSHOT_MANIFEST.json") return false;
    return /\.(md|txt)$/i.test(rel);
  });

  const mode = cfg.mode;
  if (!["seed", "full"].includes(mode)) {
    console.error(`Unknown mode: ${mode}`);
    process.exit(2);
  }

  if (!cfg.quiet) console.log(`Updating snapshot: mode=${mode}, files=${targets.length}`);

  const results = await pMap(targets, Math.max(1, cfg.concurrency), async (p) => {
    try {
      const r = await updateOneFile(p, cfg);
      return { ok: true, ...r };
    } catch (e) {
      return { ok: false, rel: relFromDocsDir(p), error: String(e) };
    }
  });

  const updated = results.filter((r) => r.updated).length;
  const failed = results.filter((r) => r.ok === false).length;
  const skipped = results.filter((r) => r.skipped).length;

  const n = await buildIndex();

  console.log(`Done. updated=${updated}, skipped=${skipped}, failed=${failed}, indexed=${n}`);

  if (failed) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
