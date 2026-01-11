# Cloudflare MCP Scenarios

20 real-world development scenarios, each marked with required tools and execution flow.

## Observability

### 1. Worker 5xx Spike Diagnosis
```
User: My worker has had a 5xx spike since 18:00 yesterday, help me find the most likely cause and evidence.
Execute:
1. query_worker_observability: filter status >= 500, time range 17:30-19:00
2. Find the first error time point and message
3. auditlogs_by_account_id: check for deployments/config changes in the same time window
4. Summarize: root cause + timeline + evidence + fix recommendations
```

### 2. CPU Trend Analysis
```
User: Pull the CPU time trend for worker `api-gateway` over the last 24h and tell me if there are any abnormal spikes.
Execute:
1. query_worker_observability: metric type CPU time, worker name api-gateway
2. Aggregate by hour, find peak time periods
3. Compare with historical baseline to determine if abnormal
4. If peaks found, correlate with logs from the same period to find the cause
```

## Builds

### 3. Build History View
```
User: List the last 5 builds for `frontend-app`, why did the latest one fail?
Execute:
1. workers_builds_list_builds: worker name frontend-app, limit 5
2. workers_builds_get_build: get failed build details
3. workers_builds_get_build_logs: pull complete logs
4. Summarize failure reason + fix recommendations
```

### 4. Build Log Analysis
```
User: Pull the logs for build UUID xxx, help me extract the first failure cause and possible fix.
Execute:
1. workers_builds_get_build_logs: build ID
2. Find the first ERROR/FATAL
3. Analyze dependency issues/syntax errors/config issues
4. Provide specific fix steps
```

## Browser Rendering

### 5. Page Screenshot Verification
```
User: Take a screenshot of https://my-site.com, see if the top banner loaded.
Execute:
1. Confirm active account (otherwise accounts_list + set_active_account first)
2. get_url_screenshot: URL
3. Return screenshot + observation conclusions
```

### 6. Page to Markdown
```
User: Convert an online error page to markdown, I want to paste it into the incident review.
Execute:
1. get_url_markdown: URL
2. Clean up format, preserve key error information
3. Return ready-to-use markdown
```

## Audit Logs

### 7. DNS Change Traceback
```
User: Who changed the DNS records yesterday at noon? Give me the audit records.
Execute:
1. auditlogs_by_account_id: time range yesterday 11:00-14:00
2. Filter action types for DNS-related
3. List: time + operator + specific changes
```

### 4. Change Weekly Report
```
User: Summarize key Worker-related config changes over the past 7 days into a report.
Execute:
1. auditlogs_by_account_id: past 7 days
2. Filter Worker-related actions
3. Group by date
4. Format report output
```

## KV Management

### 9. List KV Namespaces
```
User: List all KV namespaces in my account, find ones with names like `prod-*`.
Execute:
1. accounts_list → set_active_account (if not set)
2. kv_namespaces_list
3. Filter name matching prod-*
4. Return list + statistics
```

### 10. Create KV Namespace
```
User: Create a KV namespace called `feature-flags`, and tell me how to bind it to a worker afterward.
Execute:
1. Show plan: create namespace "feature-flags"
2. Wait for user confirmation
3. kv_namespace_create: name = feature-flags
4. Return creation result + wrangler.toml binding example
```

### 11. Bulk Delete KV (Dangerous)
```
User: Delete all KV namespaces starting with `temp-*` (list them for confirmation first).
Execute:
1. kv_namespaces_list
2. Filter temp-* prefix
3. List namespaces to be deleted (name + ID)
4. ⚠️ Wait for explicit user confirmation
5. kv_namespace_delete one by one
6. auditlogs_by_account_id to verify deletion records
```

## R2 Management

### 12. R2 Cleanup Suggestions
```
User: List R2 buckets, find ones that might not be used recently, give me cleanup suggestions.
Execute:
1. r2_buckets_list
2. Analyze by creation time/name patterns
3. Mark possibly abandoned ones (like test-*, tmp-*)
4. Provide cleanup suggestions (don't delete directly)
```

### 13. Create R2 Bucket + Code Example
```
User: Create an R2 bucket called `uploads-prod`, and give me a minimal working worker code snippet to read/write it.
Execute:
1. Show plan: create bucket "uploads-prod"
2. Wait for confirmation
3. r2_bucket_create: name = uploads-prod
4. Return creation result + Worker code example (env.BUCKET.put/get)
```

## D1 Management

### 14. D1 Query
```
User: List D1 databases, run `SELECT COUNT(*) FROM users;`.
Execute:
1. d1_databases_list
2. Confirm target database
3. d1_database_query: SELECT COUNT(*) FROM users
4. Return results
```

### 15. D1 Migration Drill (Complete Flow)
```
User: I need a temporary D1 for migration drills: create, run schema, insert test data, finally delete (give me confirmation points at each step).
Execute:
1. Show plan: create temp DB → create table → insert test data → delete
2. Confirm then d1_database_create
3. Confirm then d1_database_query: CREATE TABLE ...
4. Confirm then d1_database_query: INSERT ...
5. Confirm then d1_database_delete
6. auditlogs verify
```

## Hyperdrive Management

### 16. Hyperdrive Config Analysis
```
User: List Hyperdrive configurations, help me find which one connects to production database, and suggest how to change caching strategy.
Execute:
1. hyperdrive_configs_list
2. hyperdrive_config_get: check connection strings one by one
3. Identify production database connections
4. Analyze current caching configuration + optimization suggestions
```

## Workers Code

### 17. Worker Source Code Check
```
User: Pull the source code for worker `my-worker-script`, I suspect it has a wrong env variable.
Execute:
1. workers_get_worker: get worker details
2. workers_get_worker_code: get source code
3. Search for env. references
4. Mark suspicious locations
```

## Container Sandbox

### 18. Run Tests
```
User: Clone this repo in the sandbox, run tests, paste the failed tests and errors.
Execute:
1. container_initialize (note: ~10 min lifecycle)
2. container_exec: git clone <repo>
3. container_exec: pnpm install && pnpm test
4. Extract failed tests + error info
5. Summarize report
```

### 19. Data Analysis
```
User: Parse this log/metrics export with Python, calculate the change in p95 and error rate.
Execute:
1. container_initialize
2. container_file_write: write log data
3. container_file_write: write analysis script
4. container_exec: python analyze.py
5. Return analysis results
```

## Comprehensive Flow

### 20. Build Failure Full-Link Troubleshooting
```
User: Create an automated troubleshooting flow from "build failure → find logs → fix suggestions → verify online recovery".
Execute:
1. workers_builds_list_builds: find failed build
2. workers_builds_get_build_logs: analyze failure cause
3. Provide fix suggestions
4. (User fixes and redeploys)
5. workers_builds_list_builds: confirm new build success
6. query_worker_observability: confirm no new errors
7. get_url_screenshot: verify page is normal
8. Summarize report
```

## General Principles

1. **Query Before Modify**: List/get to confirm current state before any write operation
2. **Explicit Confirmation**: Write operations must show plan, wait for user confirmation
3. **Verify After Execution**: audit logs + observability confirm no anomalies
4. **Evidence Chain**: Troubleshooting conclusions must have log/metric/screenshot support
5. **Split Requests**: Complex queries into small ones to avoid context overflow
