# Cloudflare MCP Scenario Examples

20 real-world development scenarios, each annotated with required tools and execution flow.

## Observability (Troubleshooting)

### 1. Worker 5xx Spike Investigation
```
User: My worker had a 5xx spike starting yesterday at 18:00, find the most likely cause and evidence.
Execution:
1. query_worker_observability: filter status >= 500, time range 17:30-19:00
2. Find first error occurrence time and error message
3. auditlogs_by_account_id: check for deployments/config changes during same period
4. Summary: root cause + timeline + evidence + fix recommendations
```

### 2. CPU Trend Analysis
```
User: Pull the CPU time trend for worker `api-gateway` over the last 24h, tell me if there are abnormal spikes.
Execution:
1. query_worker_observability: metric type CPU time, worker name api-gateway
2. Aggregate by hour, identify peak periods
3. Compare against historical baseline, determine if abnormal
4. If spikes found, correlate with logs from same period to find cause
```

## Builds (Build Troubleshooting)

### 3. Build History Review
```
User: List the last 5 builds for `frontend-app`, why did the latest one fail?
Execution:
1. workers_builds_list_builds: worker name frontend-app, limit 5
2. workers_builds_get_build: get failed build details
3. workers_builds_get_build_logs: pull complete logs
4. Extract failure reason + fix recommendations
```

### 4. Build Log Analysis
```
User: Pull logs for build UUID xxx, help me extract the first failure cause and possible fixes.
Execution:
1. workers_builds_get_build_logs: build ID
2. Locate first ERROR/FATAL
3. Analyze dependency issues/syntax errors/config problems
4. Provide specific fix steps
```

## Browser Rendering (Page Capture)

### 5. Page Screenshot Verification
```
User: Take a screenshot of https://my-site.com, see if the top banner loaded.
Execution:
1. Confirm active account (otherwise run accounts_list + set_active_account first)
2. get_url_screenshot: URL
3. Return screenshot + observation conclusions
```

### 6. Page to Markdown Conversion
```
User: Convert an online error page to markdown, I need to paste it into an incident postmortem.
Execution:
1. get_url_markdown: URL
2. Clean up formatting, keep key error information
3. Return ready-to-use markdown
```

## Audit Logs (Change Tracking)

### 7. DNS Change Tracking
```
User: Who changed the DNS records yesterday at noon? Give me the audit records.
Execution:
1. auditlogs_by_account_id: time range yesterday 11:00-14:00
2. Filter action type for DNS-related
3. List: time + operator + specific changes
```

### 8. Weekly Change Report
```
User: Summarize Worker-related key config changes from the past 7 days into a report.
Execution:
1. auditlogs_by_account_id: past 7 days
2. Filter Worker-related actions
3. Group by date
4. Format output report
```

## KV Management

### 9. List KV Namespaces
```
User: List all KV namespaces in my account, find ones named like `prod-*`.
Execution:
1. accounts_list → set_active_account (if not set)
2. kv_namespaces_list
3. Filter names matching prod-*
4. Return list + statistics
```

### 10. Create KV Namespace
```
User: Create a KV namespace called `feature-flags`, and tell me how to bind it to a worker.
Execution:
1. Present plan: create namespace "feature-flags"
2. Await user confirmation
3. kv_namespace_create: name = feature-flags
4. Return creation result + wrangler.toml binding example
```

### 11. Batch Delete KV (Dangerous)
```
User: Delete all KV namespaces starting with `temp-*` (list them first for my confirmation).
Execution:
1. kv_namespaces_list
2. Filter temp-* prefix
3. List namespaces to be deleted (name + ID)
4. ⚠️ Await explicit user confirmation
5. Delete each with kv_namespace_delete
6. auditlogs_by_account_id to verify deletion records
```

## R2 Management

### 12. R2 Cleanup Recommendations
```
User: List R2 buckets, find ones that might be unused, give me cleanup recommendations.
Execution:
1. r2_buckets_list
2. Analyze by creation time/name pattern
3. Flag potentially abandoned ones (e.g., test-*, tmp-*)
4. Provide cleanup recommendations (don't delete directly)
```

### 13. Create R2 Bucket + Code Example
```
User: Create an R2 bucket called `uploads-prod`, and give me a minimal worker code snippet to read/write it.
Execution:
1. Present plan: create bucket "uploads-prod"
2. Await confirmation
3. r2_bucket_create: name = uploads-prod
4. Return creation result + Worker code example (env.BUCKET.put/get)
```

## D1 Management

### 14. D1 Query
```
User: List D1 databases, run `SELECT COUNT(*) FROM users;`.
Execution:
1. d1_databases_list
2. Confirm target database
3. d1_database_query: SELECT COUNT(*) FROM users
4. Return result
```

### 15. D1 Migration Dry Run (Complete Flow)
```
User: I need a temporary D1 for migration dry run: create, run schema, insert test data, then delete (give me confirmation points at each step).
Execution:
1. Present plan: create temp DB → create tables → insert test data → delete
2. After confirmation, d1_database_create
3. After confirmation, d1_database_query: CREATE TABLE ...
4. After confirmation, d1_database_query: INSERT ...
5. After confirmation, d1_database_delete
6. auditlogs to verify
```

## Hyperdrive Management

### 16. Hyperdrive Config Analysis
```
User: List Hyperdrive configs, help me find which one connects to the production database, and suggest cache strategy improvements.
Execution:
1. hyperdrive_configs_list
2. hyperdrive_config_get: check connection strings one by one
3. Identify production database connection
4. Analyze current cache config + optimization recommendations
```

## Workers Code

### 17. Worker Source Code Inspection
```
User: Pull the source code for worker `my-worker-script`, I suspect it has an env variable wrong.
Execution:
1. workers_get_worker: get worker details
2. workers_get_worker_code: get source code
3. Search for env. references
4. Flag suspicious locations
```

## Container Sandbox

### 18. Run Tests
```
User: In the sandbox, clone this repo, run tests, paste any failing tests and errors.
Execution:
1. container_initialize (note: ~10 min lifecycle)
2. container_exec: git clone <repo>
3. container_exec: npm install && npm test
4. Extract failed tests + error messages
5. Summary report
```

### 19. Data Analysis
```
User: Use Python to parse this log/metric export, calculate p95 and error rate changes.
Execution:
1. container_initialize
2. container_file_write: write log data
3. container_file_write: write analysis script
4. container_exec: python analyze.py
5. Return analysis results
```

## End-to-End Workflows

### 20. Build Failure Full-chain Troubleshooting
```
User: Create an automated troubleshooting flow: from build failure → find logs → fix recommendations → verify production recovery.
Execution:
1. workers_builds_list_builds: find failed build
2. workers_builds_get_build_logs: analyze failure cause
3. Provide fix recommendations
4. (After user fixes and redeploys)
5. workers_builds_list_builds: confirm new build succeeded
6. query_worker_observability: confirm no new errors
7. get_url_screenshot: verify page is normal
8. Summary report
```

## General Principles

1. **Read before write**: Always list/get current state before any write operation
2. **Explicit confirmation**: Write operations must present plan, await user confirmation
3. **Post-execution verification**: Audit logs + observability confirm no anomalies
4. **Evidence chain**: Troubleshooting conclusions must have logs/metrics/screenshots supporting them
5. **Split requests**: Break complex queries into smaller pieces to avoid context overload
