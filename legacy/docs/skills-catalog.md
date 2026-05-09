# Skills Catalog

> Generated file. Do not edit by hand.

Install (skills.sh):

```bash
npx --yes skills add Heyvhuang/ship-faster --list
npx --yes skills add Heyvhuang/ship-faster --yes --agent claude-code
npx --yes skills add Heyvhuang/ship-faster --yes --agent claude-code --skill workflow-ship-faster
```

| Name | Stage | Summary |
|------|-------|---------|
| `cloudflare` | `service` | Infrastructure operations for Cloudflare: Workers, KV, R2, D1, Hyperdrive, observability, builds, audit logs. Three permission tiers: Diagnose (read-only), Change (write requires confirmation), Super Admin (isolated environment). MCP opt... |
| `deep-research` | `tool` | Research a topic thoroughly in this repo and return a structured summary with file references. Use when you need to understand how something works, find patterns across modules, or audit implementations. |
| `mcp-cloudflare` | `service` | Manage Workers/KV/R2/D1/Hyperdrive via Cloudflare MCP, perform observability/build troubleshooting/audit/container sandbox operations. Three permission tiers with write confirmation gates. |
| `mcp-stripe` | `service` | Stripe MCP transaction operations: customer management, products/prices, invoices, payment links, subscriptions, refunds, dispute handling, balance queries. Money operations require confirmation. |
| `mcp-supabase` | `service` | Execute database operations via Supabase MCP (query/write/migration/logs/type generation). Write operations require confirmation; UPDATE/DELETE without WHERE is refused. |
| `publish-x-article` | `tool` | Publish Markdown to X (Twitter) Articles as a draft (never auto-publish). Alias-style entry alongside tool-x-article-publisher. |
| `review-clean-code` | `review` | Analyze code quality based on Clean Code principles. Identify naming, function size, duplication, over-engineering, and magic number issues with severity ratings and refactoring suggestions. |
| `review-doc-consistency` | `review` | Documentation consistency reviewer that checks alignment between code implementation and documentation. Identifies outdated or inconsistent descriptions in README + docs/. |
| `review-merge-readiness` | `review` | Structured code review for merge readiness: compare against plan and requirements, output issue list by Critical/Important/Minor severity, provide clear verdict on merge readiness. |
| `review-quality` | `review` | Unified codebase quality review: merge readiness verdict + maintainability (Clean Code) + docs-vs-code consistency. Single entry point with auto-triage (runs React/Next.js perf review and UI guidelines audit when applicable). |
| `review-react-best-practices` | `review` | Review or refactor React / Next.js code for performance and reliability using a prioritized rule library (waterfalls, bundle size, server/client data fetching, re-renders). |
| `review-seo-audit` | `review` | When the user wants to audit, review, or diagnose SEO issues on their site. Also use when the user mentions "SEO audit," "technical SEO," "why am I not ranking," "SEO issues," "on-page SEO," "meta tags review," or "SEO health check." For... |
| `skill-creator` | `meta` | Create or refactor Ship Faster-style skills (SKILL.md + references/ + scripts/). Emphasizes progressive disclosure, artifact-first I/O, and packaging/validation. |
| `skill-evolution` | `meta` | Global evolution system for ship-faster skills. Uses hooks to capture context, failures, and session summaries, then generates patch suggestions (no auto edits). |
| `skill-improver` | `meta` | Improve skills and workflows by analyzing run artifacts and execution logs. Find failure modes, bottlenecks, unclear prompts, missing I/O contracts. |
| `stripe` | `service` | Billing and payment operations for Stripe: customers, products, prices, invoices, payment links, subscriptions, refunds, disputes, balance. Money operations require confirmation. MCP optional. |
| `supabase` | `service` | Database operations for Supabase: query, write, migration, logs, type generation. Includes bundled Supabase Postgres best practices reference. Write operations require confirmation; UPDATE/DELETE without WHERE refused. MCP optional. |
| `tool-ast-grep-rules` | `tool` | Write AST-based code search and rewrite rules using ast-grep YAML. Create linting rules, code modernizations, and API migrations with auto-fix. |
| `tool-better-auth` | `tool` | Use when implementing authentication with Better Auth in a TypeScript/Next.js app (session strategy, providers, cookies, CSRF, redirects, middleware, and security best practices). |
| `tool-design-style-selector` | `tool` | Scan project to identify intent, evaluate if existing style is mature; if mature preserve and extract design-system.md, if not recommend from 30 preset styles. |
| `tool-hooks-doctor` | `tool` | Detect whether Claude Code evolution hooks are installed/enabled, and print a copy-paste fix. Use when you expect runs/evolution artifacts but nothing is being written. Triggers: hooks, evolution, runs/evolution, settings.json, PreToolUs... |
| `tool-openclaw` | `tool` | Help users install, configure, and operate OpenClaw (gateway, channels, nodes, plugins). Use when answering OpenClaw setup/debug questions; use the local docs snapshot bundled with this skill as the source of truth. Triggers: openclaw, c... |
| `tool-programmatic-seo` | `tool` | When the user wants to create SEO-driven pages at scale using templates and data. Also use when the user mentions "programmatic SEO," "template pages," "pages at scale," "directory pages," "location pages," "[keyword] + [city] pages," "c... |
| `tool-schema-markup` | `tool` | When the user wants to add, fix, or optimize schema markup and structured data on their site. Also use when the user mentions "schema markup," "structured data," "JSON-LD," "rich snippets," "schema.org," "FAQ schema," "product schema," "... |
| `tool-systematic-debugging` | `tool` | Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes |
| `tool-ui-ux-pro-max` | `tool` | Searchable UI/UX design intelligence: built-in database for styles, palettes, typography pairings, landing patterns, chart types, UX/a11y guidelines, plus stack-specific best practices. Includes a Python search script for fast lookup. |
| `tool-x-article-publisher` | `tool` | Publish Markdown to X (Twitter) Articles as a draft (never auto-publish). Converts Markdown → HTML for rich text paste and inserts images deterministically. |
| `workflow-brainstorm` | `workflow` | Brainstorm → Design Spec: Use before any creative implementation. Ask one question at a time, provide 2-3 options with trade-offs, output design in segments. |
| `workflow-creator` | `meta` | Create workflow-* skills by composing existing skills into end-to-end chains. Discovers available skills locally + from skills.sh, generates workflow-<slug>/ packages with Ship Faster conventions. |
| `workflow-execute-plans` | `workflow` | Execute written implementation plans: read and critically review the plan, implement in small batches (default 3 tasks), produce verification evidence per batch and pause for feedback. |
| `workflow-feature-shipper` | `workflow` | Ship core product features quickly in a Next.js codebase: turn feature idea into executable plan, implement in PR-sized slices, delegate UI styling when needed. |
| `workflow-project-intake` | `workflow` | Project intake + routing: brainstorm and clarify intent, persist goal/context artifacts, dispatch to the right workflow. Default route is workflow-ship-faster. |
| `workflow-ship-faster` | `workflow` | Ship Faster end-to-end workflow for small web apps (Next.js): idea → foundation gate → design-system → guardrails → feature iteration → optional Supabase/Stripe → deploy → SEO. |
| `workflow-template-extractor` | `workflow` | Extract a shareable runnable template under templates/NNN-slug/ from a real project: copy + de-brand + remove secrets + add env examples + docs, with minimal refactors. |
| `workflow-template-seeder` | `workflow` | Seed a new runnable template under templates/NNN-slug/ from a short spec by chaining existing skills (intake → ship-faster stages) while keeping it clean and shareable. |
