# Supabase MCP Setup (Optional)

MCP enables automatic execution of database operations. This is optional — you can always use CLI or Console instead.

## Prerequisites

- Claude Code, Cursor, or another MCP-compatible client
- Supabase project with API access

## Connection Methods

### Method 1: Supabase MCP Server (Recommended)

```bash
# Add the MCP server
claude mcp add supabase

# Authenticate
claude /mcp
```

This connects to Supabase's official MCP server and handles authentication via OAuth.

### Method 2: Direct Database Connection

If using a generic PostgreSQL MCP:

```bash
# Connection string format
postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
```

Get credentials from: Dashboard → Settings → Database → Connection string

## Available MCP Tools

Once connected, these tools become available:

| Tool | Parameters | Purpose |
|------|------------|---------|
| `list_tables` | `{"schemas":["public"]}` | List all tables in schema |
| `execute_sql` | `{"query":"SELECT ..."}` | Execute SQL (query or DML) |
| `apply_migration` | `{"name":"snake_case","query":"DDL"}` | Apply database migration |
| `list_migrations` | `{}` | View existing migrations |
| `generate_typescript_types` | `{}` | Generate TypeScript types |
| `get_project_url` | `{}` | Get project URL |
| `get_publishable_keys` | `{}` | Get public API keys |
| `get_logs` | `{"service":"postgres\|auth\|..."}` | Query service logs |
| `get_advisors` | `{"type":"security\|performance"}` | Get recommendations |

**Optional tools (if enabled)**:
- Edge Functions: `list_edge_functions`, `get_edge_function`, `deploy_edge_function`
- Branching: `create_branch`, `list_branches`, `merge_branch`, `reset_branch`, `rebase_branch`, `delete_branch`

## Verification

Test the connection:
```
list_tables({"schemas": ["public"]})
```

Should return a list of tables in your database.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Authentication failed | Re-run `claude /mcp` to re-authenticate |
| Connection timeout | Check project is active (not paused) |
| Permission denied | Verify API key has correct permissions |
| Tool not found | Check MCP server is properly added |

## Without MCP

If you can't or don't want to use MCP, see [BACKENDS.md](BACKENDS.md) for CLI and Console alternatives. All operations in [SKILL.md](SKILL.md) can be performed manually.
