---
name: 06-nextjs-supabase
description: "Integrate Supabase into a Next.js project fast: plan schema/migrations, use supabase-mcp for safe DB ops, set up env vars, generate types, and wire minimal data access. Use when adding a database to a Next.js app, when the user says Supabase/Postgres/RLS/migrations/types."
---

# Next.js + Supabase (Ship Faster Integration)

Goal: Complete the shortest path to "read/write data + types available + security gates".

## Input (pass paths only)

- `repo_root`
- `run_dir`
- `requirements.md` (optional): which tables/fields/queries are needed

## Output (persisted to disk)

- `03-plans/supabase-plan.md`
- `02-analysis/schema.md` (runtime-detected/confirmed schema)
- `05-final/supabase-summary.md`

## Workflow

1. Use `supabase-mcp` to dynamically detect schema (do not rely on outdated schema docs)
2. DDL changes go through migrations (`apply_migration`)
3. Write operations require confirmation (write SQL to `03-plans/sql.md` first, then execute)
4. Generate TypeScript types (`generate_typescript_types`) and persist in project (location follows project conventions)
5. Connect to Next.js:
   - Only write env key names, never write secret values to logs
   - Implement minimal data access layer first (one read, one write), then expand

## Confirmation Points

- Any INSERT/UPDATE/DELETE: write to `03-plans/approval.md` first, then request user confirmation
- Affected rows > 100: require secondary confirmation
