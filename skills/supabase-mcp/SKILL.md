---
name: supabase-mcp
description: Execute database operations via Supabase MCP (query/write/migration/logs/type generation). Trigger words: query/count/export/insert/update/delete/fix/backfill/migration/logs/alerts/type generation. Does not trigger: pure architecture discussion or code planning. Write operations require confirmation; UPDATE/DELETE without WHERE will be rejected.
---

# Supabase MCP Skill

Interact with Supabase database via MCP tools to perform queries, writes, migrations, and diagnostics.

## File-Based Pipeline (Pass Paths Only)

When integrating database operations into multi-step workflows, all context and artifacts are persisted to disk, and only paths are passed between agents/sub-agents.

Recommended directory structure (within project): `.claude/runs/<workflow>/<run_id>/`

- Input: `01-input/goal.md` (requirements), `01-input/context.json` (known tables/fields/IDs)
- Plan: `03-plans/sql.md` (SQL to execute; must be written here before confirming write operations)
- Output: `05-final/result.md` (conclusion + key metrics + SQL + truncated results)
- Logs: `logs/events.jsonl` (summary of each tool call; do not log sensitive field values)

## Tool Reference

| Tool Name | Parameters | Purpose |
|-----------|------------|---------|
| `list_tables` | `{"schemas":["public"]}` | List all tables in specified schema |
| `execute_sql` | `{"query":"SELECT ..."}` | Execute SQL (query or DML) |
| `apply_migration` | `{"name":"snake_case_name","query":"-- DDL"}` | Apply database migration |
| `list_migrations` | `{}` | View existing migrations |
| `generate_typescript_types` | `{}` | Generate TypeScript type definitions |
| `get_project_url` | `{}` | Get project URL |
| `get_publishable_keys` | `{}` | Get publishable API keys |
| `get_logs` | `{"service":"postgres\|api\|auth\|storage\|realtime\|edge-function\|branch-action"}` | Query service logs |
| `get_advisors` | `{"type":"security\|performance"}` | Get security/performance recommendations |

**Optional Tools (if enabled)**:
- Edge Functions: `list_edge_functions`, `get_edge_function`, `deploy_edge_function`
- Branching: `create_branch`, `list_branches`, `merge_branch`, `reset_branch`, `rebase_branch`, `delete_branch`

## Security Rules (Must Follow)

1. **Read First**: Always query schema before any operation
2. **Default LIMIT 50**: All SELECT queries default to `LIMIT 50` unless user explicitly requests more
3. **Write Confirmation**: Before executing INSERT/UPDATE/DELETE:
   - Display the SQL to be executed
   - State the expected number of affected rows
   - Wait for explicit user confirmation
4. **No Bare Writes**: UPDATE/DELETE without WHERE clause → Reject immediately, do not execute
5. **Batch Threshold**: If affecting > 100 rows → Require secondary confirmation + suggest running `SELECT count(*)` first
6. **DDL via Migration**: Schema changes must use `apply_migration`, never run DDL directly via `execute_sql`
7. **Production Environment**: Write operations disabled by default; only allow when user explicitly says "execute in prod" and confirms twice
8. **Sensitive Fields**: email/phone/token/password are masked or not returned by default, unless user explicitly requests

## Operation Flow

```
1. Parse request → Restate the goal
2. Uncertain about tables/fields → First run list_tables or execute_sql to query information_schema
3. Plan SQL → Display to user
4. Read-only → Execute directly
5. Write operation → Confirm → Execute → Verify affected rows → Report results
```

## Output Format

- **Language**: English
- **Structure**: Conclusion → Key metrics → Executed SQL → Result table (max 50 rows)
- **Overflow Handling**: Truncate + show total count + offer export/pagination

Example output:
```
✅ Query complete: 142 new users in the last 7 days

Executed SQL:
SELECT DATE(created_at) as date, COUNT(*) as count 
FROM user_profiles 
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at) ORDER BY date DESC;

| date       | count |
|------------|-------|
| 2025-01-09 | 23    |
| 2025-01-08 | 31    |
| ...        | ...   |
```

## Error Handling

| Scenario | Handling |
|----------|----------|
| SQL syntax error | Return error summary + fix suggestions |
| Insufficient permissions | Explain required permissions + alternatives |
| No data returned | Explain possible reasons (conditions too strict? data doesn't exist?) |
| RLS blocked | Suggest checking RLS policies or using service_role |

## Example Dialogues

### Read: Simple Query
```
User: Count registered users in the last 7 days, grouped by day
Action:
1. Confirm table user_profiles, field created_at
2. Execute aggregation SQL
3. Return: conclusion + metrics + SQL + table
```

### Read: Complex Query
```
User: Find projects that have runs but all failed
Action:
1. Confirm projects, runs tables and status field
2. Display JOIN + aggregation SQL
3. Execute and return results (mask email)
```

### Write: Insert
```
User: Create a new run for project xxx
Action:
1. First query if project exists
2. Display INSERT SQL + expected impact: 1 row
3. Wait for confirmation → Execute → Return new record id
```

### Write: Update
```
User: Change the status of run abc to completed
Action:
1. First SELECT to verify current status
2. Display UPDATE SQL + WHERE id = 'abc'
3. Confirm → Execute → SELECT again to verify
```

### Dangerous: Delete
```
User: Delete all runs with status = 'failed'
Action:
1. First SELECT count(*) WHERE status = 'failed'
2. Display count + DELETE SQL
3. If > 100 rows, require secondary confirmation
4. After confirmation → Execute → Report deleted row count
```

### Dangerous: Delete Without WHERE
```
User: Clear the runs table
Action:
❌ Rejected
→ Message: DELETE without WHERE clause would delete all data
→ Suggestion: Use TRUNCATE (requires migration) or add explicit conditions
```

## Schema Reference

Dynamically fetch latest schema at runtime:
```sql
-- List all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- View table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = '<table_name>';
```

For project-specific schema (may be outdated), see [references/schema.md](references/schema.md). Default to information_schema / `generate_typescript_types` as source of truth.
