# Cloudflare MCP Setup (Optional)

MCP enables automatic execution of infrastructure operations. This is optional — you can always use Wrangler CLI or Dashboard instead.

## Prerequisites

- Claude Code, Cursor, or another MCP-compatible client
- Cloudflare account with API access

## Connection

### Method 1: Cloudflare MCP Server

```bash
# Add the MCP server
claude mcp add cloudflare

# Authenticate
claude /mcp
```

### Method 2: API Token Authentication

1. Go to: `https://dash.cloudflare.com/profile/api-tokens`
2. Create a token with required permissions
3. Configure in your MCP client

**Recommended token permissions**:

| Permission | Read | Edit | Required For |
|------------|------|------|--------------|
| Account Settings | ✅ | — | accounts_list |
| Workers Scripts | ✅ | ✅ | workers_*, builds_* |
| Workers KV Storage | ✅ | ✅ | kv_* |
| Workers R2 Storage | ✅ | ✅ | r2_* |
| D1 | ✅ | ✅ | d1_* |
| Account Analytics | ✅ | — | observability_* |
| Audit Logs | ✅ | — | auditlogs_* |

## Available MCP Tools

### Diagnose Tier (Read-only)

**Observability**
| Tool | Purpose |
|------|---------|
| `query_worker_observability` | Query logs/metrics (events, CPU, error rate) |
| `observability_keys` | Discover available fields |
| `observability_values` | Explore field values |

**Builds**
| Tool | Purpose |
|------|---------|
| `workers_builds_list_builds` | List build history |
| `workers_builds_get_build` | Get build details |
| `workers_builds_get_build_logs` | Get build logs |

**Browser Rendering**
| Tool | Purpose |
|------|---------|
| `get_url_html_content` | Fetch page HTML |
| `get_url_markdown` | Convert to Markdown |
| `get_url_screenshot` | Take page screenshot |

**Audit**
| Tool | Purpose |
|------|---------|
| `auditlogs_by_account_id` | Pull change history |

**Workers**
| Tool | Purpose |
|------|---------|
| `workers_list` | List workers |
| `workers_get_worker` | Get worker details |
| `workers_get_worker_code` | Get source code |

### Change Tier (Write Operations)

**Account**
| Tool | Purpose |
|------|---------|
| `accounts_list` | List accounts |
| `set_active_account` | Set active account |

**KV**
| Tool | Purpose |
|------|---------|
| `kv_namespaces_list` | List namespaces |
| `kv_namespace_get` | Get details |
| `kv_namespace_create` | Create ⚠️ |
| `kv_namespace_update` | Update ⚠️ |
| `kv_namespace_delete` | Delete ⚠️ |

**R2**
| Tool | Purpose |
|------|---------|
| `r2_buckets_list` | List buckets |
| `r2_bucket_get` | Get details |
| `r2_bucket_create` | Create ⚠️ |
| `r2_bucket_delete` | Delete ⚠️ |

**D1**
| Tool | Purpose |
|------|---------|
| `d1_databases_list` | List databases |
| `d1_database_get` | Get details |
| `d1_database_query` | Execute SQL |
| `d1_database_create` | Create ⚠️ |
| `d1_database_delete` | Delete ⚠️ |

**Hyperdrive**
| Tool | Purpose |
|------|---------|
| `hyperdrive_configs_list` | List configs |
| `hyperdrive_config_get` | Get details |
| `hyperdrive_config_create` | Create ⚠️ |
| `hyperdrive_config_edit` | Edit ⚠️ |
| `hyperdrive_config_delete` | Delete ⚠️ |

⚠️ = Requires confirmation per [SKILL.md](SKILL.md)

### Super Admin Tier (Container Sandbox)

| Tool | Purpose |
|------|---------|
| `container_initialize` | Initialize container (~10 min lifecycle) |
| `container_exec` | Execute command |
| `container_file_write` | Write file |
| `container_file_read` | Read file |
| `container_files_list` | List files |
| `container_file_delete` | Delete file |

## Verification

Test the connection:
```
accounts_list()
```

Should return list of accounts you have access to.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Authentication failed | Re-run `claude /mcp` or check API token |
| Account not set | Run `accounts_list` → `set_active_account` first |
| Permission denied | Check API token has required permissions |
| Tool not found | Verify MCP server is properly added |

## Without MCP

If you can't or don't want to use MCP, see [BACKENDS.md](BACKENDS.md) for Wrangler CLI and Dashboard alternatives. All operations in [SKILL.md](SKILL.md) can be performed manually.
