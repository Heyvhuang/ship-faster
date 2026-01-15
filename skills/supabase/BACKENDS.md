# Supabase Execution Backends

Three ways to execute database operations. Pick what works for you.

## Quick Reference

| Operation | MCP | CLI | Console |
|-----------|-----|-----|---------|
| List tables | `list_tables` | `psql \dt` | Table Editor sidebar |
| Execute SQL | `execute_sql` | `psql` / `supabase db` | SQL Editor |
| Apply migration | `apply_migration` | `supabase db push` | Migrations tab |
| List migrations | `list_migrations` | `supabase db migrations list` | Migrations tab |
| Generate types | `generate_typescript_types` | `supabase gen types typescript` | — |
| Get project URL | `get_project_url` | `supabase status` | Settings → API |
| Get API keys | `get_publishable_keys` | `supabase status` | Settings → API |
| Query logs | `get_logs` | — | Logs Explorer |
| Get advisors | `get_advisors` | — | Database → Advisors |

## Option A: MCP (Automatic)

If you have MCP configured, tools execute automatically.

**Setup**: See [SETUP.md](SETUP.md)

**Example**:
```
Agent calls: execute_sql({"query": "SELECT * FROM users LIMIT 10"})
→ Results returned automatically
```

## Option B: Supabase CLI

Install: `npm install -g supabase`

### Common Commands

**Connect to database**:
```bash
# Get connection string from dashboard or:
supabase db remote --db-url postgresql://...
```

**Execute SQL**:
```bash
# Via psql
psql "postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres" -c "SELECT * FROM users LIMIT 10"

# Or interactive
psql "postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
```

**Migrations**:
```bash
# Create migration
supabase migration new add_users_table

# Apply migrations
supabase db push

# List migrations
supabase db migrations list
```

**Generate types**:
```bash
supabase gen types typescript --project-id [PROJECT_REF] > types/supabase.ts
```

### Evidence Collection

After executing, paste results back:
```
Executed: SELECT count(*) FROM users WHERE created_at > NOW() - INTERVAL '7 days'
Result: 142 rows
```

## Option C: Supabase Dashboard

### SQL Editor
1. Go to: `https://supabase.com/dashboard/project/[PROJECT_REF]/sql`
2. Paste SQL
3. Click "Run"
4. Screenshot or copy results

### Table Editor
1. Go to: `https://supabase.com/dashboard/project/[PROJECT_REF]/editor`
2. Browse tables visually
3. Use filters for queries

### Migrations
1. Go to: `https://supabase.com/dashboard/project/[PROJECT_REF]/database/migrations`
2. View applied migrations
3. Create new migration via SQL Editor

### Logs Explorer
1. Go to: `https://supabase.com/dashboard/project/[PROJECT_REF]/logs/explorer`
2. Filter by service: postgres, auth, storage, etc.
3. Export or screenshot relevant logs

### Database Advisors
1. Go to: `https://supabase.com/dashboard/project/[PROJECT_REF]/database/advisors`
2. Check security and performance recommendations

### Evidence Collection

After executing manually, provide:
- Screenshot of results
- Copy/paste of result table
- Row count affected

## Choosing a Backend

| Situation | Recommended |
|-----------|-------------|
| Have MCP configured | MCP (fastest) |
| CI/CD or scripting | CLI |
| One-off queries | Console |
| Need visual exploration | Console |
| Team doesn't have MCP | CLI or Console |

## Security Notes

All backends follow the same security rules from [SKILL.md](SKILL.md):
- Read before write
- Confirm before INSERT/UPDATE/DELETE
- Never execute UPDATE/DELETE without WHERE
- Double confirm for batch operations (>100 rows)
