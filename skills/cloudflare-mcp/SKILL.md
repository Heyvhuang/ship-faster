---
name: cloudflare-mcp
description: Manage Workers/KV/R2/D1/Hyperdrive via Cloudflare MCP, perform observability/build troubleshooting/audit/container sandbox operations. Trigger words: worker/KV/R2/D1/logs/builds/deploy/screenshot/audit/sandbox. Three permission tiers: Diagnose (read-only), Change (write requires confirmation), Super Admin (isolated environment). Write operations must follow read-first, user-confirm, post-verify pattern.
---

# Cloudflare MCP Skill

Interact with Cloudflare services via MCP: Workers, KV, R2, D1, Hyperdrive, Observability, Builds, Audit, Container Sandbox.

## File-Based Pipeline (Pass Paths Only)

When integrating troubleshooting/changes into multi-step workflows, all evidence and artifacts are persisted to disk, and only paths are passed between agents/sub-agents.

Recommended directory structure (within project): `.claude/runs/<workflow>/<run_id>/`

- Input: `01-input/goal.md` (symptoms/goals), `01-input/context.json` (account/worker/resource/time_range etc.)
- Evidence: `02-analysis/observability.md`, `02-analysis/audit.md`, `02-analysis/screenshots/`
- Plan: `03-plans/change-plan.md` (write operation plan; must write here first and wait for confirmation)
- Output: `05-final/report.md` (conclusion + evidence chain + tool call summary + next steps)
- Logs: `logs/events.jsonl` (summary of each tool call)

## Permission Tiers (Core Principles)

| Tier | Purpose | Tool Scope | Risk Control |
|------|---------|------------|--------------|
| **Diagnose** | Read-only/query/troubleshooting | Observability, Builds, Browser, Audit | Default entry point, no write operations |
| **Change** | Create/modify/delete resources | Workers Bindings (KV/R2/D1) | Requires user confirmation, post-execution verification |
| **Super Admin** | Highest privilege | All + Container Sandbox | Only for isolated environments/test accounts |

## Tool Inventory

### Diagnose Tier (Read-Only)

**Observability**
| Tool | Purpose |
|------|---------|
| `query_worker_observability` | Query logs/metrics (events, CPU, error rate) |
| `observability_keys` | Discover available fields |
| `observability_values` | Explore available field values |

**Builds**
| Tool | Purpose |
|------|---------|
| `workers_builds_list_builds` | List build history |
| `workers_builds_get_build` | Get build details |
| `workers_builds_get_build_logs` | Get build logs |

**Browser Rendering (Page Capture)**
| Tool | Purpose |
|------|---------|
| `get_url_html_content` | Fetch page HTML |
| `get_url_markdown` | Convert to Markdown |
| `get_url_screenshot` | Take page screenshot |

**Audit Logs**
| Tool | Purpose |
|------|---------|
| `auditlogs_by_account_id` | Fetch change history by time range |

### Change Tier (Write Operations)

**Account**
| Tool | Purpose |
|------|---------|
| `accounts_list` | List accounts |
| `set_active_account` | Set active account |

**Builds (Build Settings)**
| Tool | Purpose |
|------|---------|
| `workers_builds_set_active_worker` | ⚠️ Set active worker (requires confirmation) |

**KV**
| Tool | Purpose |
|------|---------|
| `kv_namespaces_list` | List namespaces |
| `kv_namespace_get` | Get details |
| `kv_namespace_create` | Create (⚠️ requires confirmation) |
| `kv_namespace_update` | Update (⚠️ requires confirmation) |
| `kv_namespace_delete` | Delete (⚠️ requires confirmation) |

**R2**
| Tool | Purpose |
|------|---------|
| `r2_buckets_list` | List buckets |
| `r2_bucket_get` | Get details |
| `r2_bucket_create` | Create (⚠️ requires confirmation) |
| `r2_bucket_delete` | Delete (⚠️ requires confirmation) |

**D1**
| Tool | Purpose |
|------|---------|
| `d1_databases_list` | List databases |
| `d1_database_get` | Get details |
| `d1_database_query` | Execute SQL |
| `d1_database_create` | Create (⚠️ requires confirmation) |
| `d1_database_delete` | Delete (⚠️ requires confirmation) |

**Hyperdrive**
| Tool | Purpose |
|------|---------|
| `hyperdrive_configs_list` | List configurations |
| `hyperdrive_config_get` | Get details |
| `hyperdrive_config_create` | Create (⚠️ requires confirmation) |
| `hyperdrive_config_edit` | Edit (⚠️ requires confirmation) |
| `hyperdrive_config_delete` | Delete (⚠️ requires confirmation) |

**Workers**
| Tool | Purpose |
|------|---------|
| `workers_list` | List workers |
| `workers_get_worker` | Get worker details |
| `workers_get_worker_code` | Get source code |

### Super Admin Tier (Container Sandbox)

| Tool | Purpose |
|------|---------|
| `container_initialize` | Initialize container (~10 min lifespan) |
| `container_exec` | Execute command |
| `container_file_write` | Write file |
| `container_file_read` | Read file |
| `container_files_list` | List files |
| `container_file_delete` | Delete file |

**Container Note**: Containers are stateless with short lifespan, only for temporary tasks (running tests/reproducing issues/parsing data).

## Security Rules (Must Follow)

### Read Operations
1. **Scope first**: account / worker / resource ID
2. **No account? Run `accounts_list` first**
3. Conclusions must include evidence chain: logs/screenshots/audit records

### Write Operations (Three-Step Flow)
```
1. Plan: Read current state first (list/get)
2. Confirm: Output exact changes (name/ID/impact scope), wait for user confirmation
3. Execute: create/delete/update
4. Verify: audit logs + observability confirm no new errors
```

### Prohibited Actions
- ❌ Execute create/delete/update without confirmation
- ❌ Delete production resources (unless user explicitly says "delete production xxx")
- ❌ Use Super Admin privileges in non-isolated environments
- ❌ Treat container sandbox as persistent environment

## Operation Workflows

### Troubleshooting Workflow (Typical)
```
1. Clarify symptoms → worker name/time range/error type
2. query_worker_observability to fetch logs/metrics
3. If build-related → workers_builds_get_build_logs
4. If page-related → get_url_screenshot to reproduce
5. Trace changes → auditlogs_by_account_id
6. Summarize: root cause + evidence + fix recommendations
```

### Resource Management Workflow
```
1. accounts_list → set_active_account
2. List resources (kv_namespaces_list / r2_buckets_list / d1_databases_list)
3. Plan changes → present to user
4. Execute after confirmation
5. Verify: audit logs + observability shows no errors
```

## Output Format

- **Language**: English
- **Structure**: Conclusion → Key data/evidence → Tool call summary → Next step recommendations
- **Write operations**: Must explicitly list operations to be executed and impact scope

Example output:
```
✅ Investigation complete: worker `api-gateway` experienced 5xx spike between 18:00-18:30

Root cause: New code deployed threw TypeError when handling /v2/users
Evidence:
- Logs: 18:02 first occurrence of "Cannot read property 'id' of undefined"
- Audit: 18:00 user dev@example.com deployed new version
- Metrics: error_rate jumped from 0.1% to 12%

Recommendation: Roll back to previous version, or fix /v2/users handler
```

## Error Handling

| Situation | Action |
|-----------|--------|
| Account not set | Run `accounts_list` → `set_active_account` first |
| Resource not found | Verify ID/name is correct, list available resources |
| Insufficient permissions | Explain required permissions, suggest checking API token scope |
| Observability query too long | Split into smaller time ranges, ask more specific questions |

## Scenario Examples

See [references/scenarios.md](references/scenarios.md) for 20 real-world development scenarios.
