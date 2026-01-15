# Step 6 — Next.js + Supabase (Ship Faster Integration)

Goal: Complete "can read/write data + types available + security gates" via shortest path.

## Scope (Boundaries)

**Applicable:**
- Need to **integrate Supabase into Next.js project** (env / types / minimal read-write / migration strategy / traceable artifacts)

**Not applicable:**
- Just want to run a quick query, execute some SQL, check logs, do a one-time migration (use `supabase` skill directly—faster and cleaner)

**Dependencies:**
- This step executes all DB actions through `supabase` skill (schema detection / migration / types generation / logs etc.)
- DB security gates (write operation confirmation, DDL via migration, UPDATE/DELETE must have WHERE...) follow `supabase` skill rules

## Input (Pass Paths Only)

- `repo_root`
- `run_dir`
- `requirements.md` (optional): What tables/fields/queries are needed

## Output (Persisted)

- `03-plans/supabase-plan.md`
- `02-analysis/schema.md` (runtime detected/confirmed schema)
- `05-final/supabase-summary.md`

## Process

1. Use `supabase` skill to dynamically detect schema (don't rely on outdated schema docs)
2. DDL always goes through migration (`apply_migration`)
3. Write operations always go through confirmation point (write SQL to `03-plans/sql.md` first, then execute)
4. Generate TypeScript types (`generate_typescript_types`) and persist in project (location per project conventions)
5. Integrate with Next.js:
   - Only write env key names, don't write secret values to logs
   - Implement minimal data access layer first (one read, one write), then expand

## Confirmation Points

- Any INSERT/UPDATE/DELETE: Write `03-plans/approval.md` first, then request user confirmation
- Rows affected > 100: Mandatory second confirmation
