# Step 9 — AI-era SEO for Next.js

Goal: Get "discoverable by search engines + readable by LLMs" right with minimal investment.

## Input (Pass Paths Only)

- `repo_root`
- `run_dir`
- `site.json` (optional): Site info (domain, site name, main pages, update frequency)

## Output (Persisted)

- `tasks.md` (SEO checklist section: tasks + verification)
- `evidence/seo-summary.md`

## Plan (Checklist Required)

Before SEO edits, add an SEO checklist section to `tasks.md`.
Record verification (sitemap/robots routes reachable, metadata present) in the same `tasks.md` section.

## Minimum Delivery Checklist (Recommend Completing All)

1. `robots` (allow/disallow crawling policy)
2. `sitemap` (at least include core pages)
3. Site-wide metadata: title/description/canonical
4. OpenGraph/Twitter cards (at least one default set)
5. Structured data (JSON-LD): organization/product/article (choose by site type)
6. `llms.txt` (site index entry for LLMs; keep content brief and maintainable)

## Optional: Cloudflare Enhancement (Don't Block Ship)

If user explicitly wants to use Cloudflare:
- Only do minimal config directly related to "discoverability/performance" (caching/redirects/basic observability)
- Don't force complex edge logic at launch
