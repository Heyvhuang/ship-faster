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

## Optional modules (when installed)

Use these to raise SEO quality without bloating the base step:

1. `review-seo-audit`: run after minimum checklist to find concrete issues and prioritize fixes.
   - Persist: `evidence/seo-audit.md`
2. `tool-schema-markup`: if you need rich results / structured data beyond the basics.
   - Persist: `evidence/schema-markup.md`
3. `tool-programmatic-seo`: if the goal includes template-driven pages at scale (directories, locations, comparisons).
   - Persist: `evidence/programmatic-seo.md`

## Optional: Cloudflare Enhancement (Don't Block Ship)

If user explicitly wants to use Cloudflare:
- Only do minimal config directly related to "discoverability/performance" (caching/redirects/basic observability)
- Don't force complex edge logic at launch
