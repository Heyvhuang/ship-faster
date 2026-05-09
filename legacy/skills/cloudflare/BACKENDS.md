# Cloudflare Execution Backends

Three ways to execute infrastructure operations. Pick what works for you.

## Quick Reference

| Operation | MCP | Wrangler CLI | Dashboard |
|-----------|-----|--------------|-----------|
| **Workers** |
| List workers | `workers_list` | `wrangler deployments list` | Workers & Pages |
| Get worker details | `workers_get_worker` | `wrangler deployments view` | Worker → Settings |
| Get worker code | `workers_get_worker_code` | — | Worker → Quick Edit |
| **KV** |
| List namespaces | `kv_namespaces_list` | `wrangler kv namespace list` | Workers → KV |
| Create namespace | `kv_namespace_create` | `wrangler kv namespace create` | KV → Create |
| Delete namespace | `kv_namespace_delete` | `wrangler kv namespace delete` | KV → Delete |
| **R2** |
| List buckets | `r2_buckets_list` | `wrangler r2 bucket list` | R2 → Overview |
| Create bucket | `r2_bucket_create` | `wrangler r2 bucket create` | R2 → Create bucket |
| Delete bucket | `r2_bucket_delete` | `wrangler r2 bucket delete` | R2 → Delete |
| **D1** |
| List databases | `d1_databases_list` | `wrangler d1 list` | D1 → Overview |
| Execute SQL | `d1_database_query` | `wrangler d1 execute` | D1 → Console |
| Create database | `d1_database_create` | `wrangler d1 create` | D1 → Create |
| Delete database | `d1_database_delete` | `wrangler d1 delete` | D1 → Delete |
| **Observability** |
| Query logs/metrics | `query_worker_observability` | — | Analytics → Workers |
| **Audit** |
| View audit logs | `auditlogs_by_account_id` | — | Audit Log |
| **Builds** |
| List builds | `workers_builds_list_builds` | — | Worker → Deployments |
| Get build logs | `workers_builds_get_build_logs` | — | Deployment → View logs |

## Option A: MCP (Automatic)

If you have MCP configured, tools execute automatically.

**Setup**: See [SETUP.md](SETUP.md)

**Example**:
```
Agent calls: kv_namespaces_list()
→ Results returned automatically
```

## Option B: Wrangler CLI

Install: `npm install -g wrangler`

### Setup

```bash
# Login (opens browser)
wrangler login

# Check whoami
wrangler whoami
```

### Workers

```bash
# List deployments
wrangler deployments list

# View specific deployment
wrangler deployments view --deployment-id <id>

# Tail logs (real-time)
wrangler tail <worker-name>
```

### KV

```bash
# List namespaces
wrangler kv namespace list

# Create namespace
wrangler kv namespace create <name>

# List keys
wrangler kv key list --namespace-id <id>

# Get value
wrangler kv key get <key> --namespace-id <id>

# Put value
wrangler kv key put <key> <value> --namespace-id <id>

# Delete namespace
wrangler kv namespace delete <id>
```

### R2

```bash
# List buckets
wrangler r2 bucket list

# Create bucket
wrangler r2 bucket create <name>

# List objects
wrangler r2 object list <bucket-name>

# Upload object
wrangler r2 object put <bucket-name>/<key> --file <path>

# Delete bucket
wrangler r2 bucket delete <name>
```

### D1

```bash
# List databases
wrangler d1 list

# Create database
wrangler d1 create <name>

# Execute SQL
wrangler d1 execute <database-name> --command "SELECT * FROM users LIMIT 10"

# Execute from file
wrangler d1 execute <database-name> --file schema.sql

# Delete database
wrangler d1 delete <name>
```

### Evidence Collection

After executing, paste results back:
```
Executed: wrangler kv namespace list
Result:
┌──────────────────────────────────────┬─────────────────┐
│ id                                   │ title           │
├──────────────────────────────────────┼─────────────────┤
│ abc123...                            │ feature-flags   │
└──────────────────────────────────────┴─────────────────┘
```

## Option C: Cloudflare Dashboard

### Workers & Pages
1. Go to: `https://dash.cloudflare.com/<account>/workers-and-pages`
2. Click worker to view details
3. Use "Quick Edit" to view/edit code
4. Check "Deployments" tab for build history

### KV
1. Go to: `https://dash.cloudflare.com/<account>/workers/kv/namespaces`
2. Create/delete namespaces
3. Browse keys and values

### R2
1. Go to: `https://dash.cloudflare.com/<account>/r2/overview`
2. Create/delete buckets
3. Upload/download objects

### D1
1. Go to: `https://dash.cloudflare.com/<account>/d1`
2. Create/delete databases
3. Use "Console" to run SQL queries

### Analytics (Observability)
1. Go to: `https://dash.cloudflare.com/<account>/workers/analytics`
2. Filter by worker, time range
3. View requests, errors, CPU time

### Audit Log
1. Go to: `https://dash.cloudflare.com/<account>/audit-log`
2. Filter by time, action type, user
3. Export or screenshot relevant entries

### Evidence Collection

After executing manually, provide:
- Screenshot of result
- Copy/paste of table data
- Resource IDs created/modified

## Choosing a Backend

| Situation | Recommended |
|-----------|-------------|
| Have MCP configured | MCP (fastest) |
| CI/CD or scripting | Wrangler CLI |
| One-off operations | Dashboard |
| Need visual confirmation | Dashboard |
| Real-time log tailing | Wrangler CLI (`wrangler tail`) |
| Team doesn't have MCP | Wrangler CLI or Dashboard |

## Security Notes

All backends follow the same security rules from [SKILL.md](SKILL.md):
- Read before write
- Confirm before create/update/delete
- Verify after execution via audit logs
- Never delete production resources without explicit confirmation
