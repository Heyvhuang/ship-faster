---
name: 09-ai-seo-nextjs
description: "Implement AI-era SEO for a Next.js project: sitemap, robots, metadata, OpenGraph, structured data, and llms.txt so LLMs and search engines can index the site well. Use when the user mentions SEO/GEO/AI SEO/llms.txt/sitemap/robots/canonical/structured data, or when preparing for launch."
---

# AI-era SEO for Next.js

Goal: With minimal effort, ensure your site is properly readable by search engines + LLMs.

## Input (pass paths only)

- `repo_root`
- `run_dir`
- `site.json` (optional): site information (domain, site name, main pages, update frequency)

## Output (persisted to disk)

- `03-plans/seo-plan.md`
- `05-final/seo-summary.md`

## Minimum Delivery Checklist (recommended to complete all)

1. `robots` (allow/disallow crawling policies)
2. `sitemap` (at least include core pages)
3. Site-wide metadata: title/description/canonical
4. OpenGraph/Twitter cards (at minimum one default set)
5. Structured data (JSON-LD): Organization/Product/Article (choose based on site type)
6. `llms.txt` (site index entry point for LLMs; keep it short and maintainable)

## Optional: Cloudflare Enhancement (non-blocking for ship)

If the user explicitly wants to use Cloudflare:
- Only apply minimal configuration directly related to "discoverability/performance" (caching/redirects/basic observability)
- Do not push complex edge logic during the initial launch phase
