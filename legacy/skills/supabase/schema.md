# Database Schema Reference

Core table structures for this project (from `lib/supabase/types.ts`).

## Table Relationship Overview

```
user_profiles (users)
    └── projects [user_id → user_profiles.id]
            ├── runs [project_id → projects.id]
            │       ├── regions [run_id → runs.id]
            │       └── share_links [run_id → runs.id]
            ├── assets [project_id → projects.id]
            └── batches [project_id → projects.id]
                    ├── runs [batch_id → batches.id]
                    └── assets [batch_id → batches.id]
```

## Table Details

### user_profiles
User profile table

| Field | Type | Description |
|-------|------|-------------|
| id | string (PK) | User ID |
| email | string | Email (sensitive) |
| role | string | Role |
| plan | string | Subscription plan |
| credits_balance | number | Credits balance |
| entitlements | jsonb | Permission config |
| stripe_customer_id | string | Stripe customer ID (sensitive) |
| display_name | string | Display name |
| created_at | timestamp | Created time |
| updated_at | timestamp | Updated time |

### projects
Projects table

| Field | Type | Description |
|-------|------|-------------|
| id | string (PK) | Project ID |
| user_id | string (FK) | Associated user → user_profiles.id |
| name | string | Project name |
| brand_notes | text | Brand notes |
| default_recipe | jsonb | Default recipe |
| created_at | timestamp | Created time |
| updated_at | timestamp | Updated time |

### runs
Run records table

| Field | Type | Description |
|-------|------|-------------|
| id | string (PK) | Run ID |
| project_id | string (FK) | Associated project → projects.id |
| batch_id | string (FK) | Associated batch → batches.id |
| source_asset_id | string (FK) | Source asset → assets.id |
| recipe | jsonb | Recipe config |
| languages | string[] | Language list |
| progress | number | Progress (0-100) |
| status | string | Status (pending/running/completed/failed) |
| stage | string | Current stage |
| started_at | timestamp | Start time |
| completed_at | timestamp | Completion time |
| error | text | Error message |
| retries | number | Retry count |
| created_at | timestamp | Created time |
| updated_at | timestamp | Updated time |

**Common query conditions**:
- `status = 'failed'` - Failed runs
- `status = 'running'` - In progress
- `completed_at IS NOT NULL` - Completed

### assets
Asset files table

| Field | Type | Description |
|-------|------|-------------|
| id | string (PK) | Asset ID |
| project_id | string (FK) | Associated project → projects.id |
| batch_id | string (FK) | Associated batch → batches.id |
| kind | string | Asset type |
| storage_path | string | Storage path |
| filename | string | Filename |
| original_filename | string | Original filename |
| mime_type | string | MIME type |
| size | number | File size (bytes) |
| checksum | string | Checksum |
| public_url | string | Public URL |
| width | number | Width (px) |
| height | number | Height (px) |
| aspect_ratio | number | Aspect ratio |
| created_at | timestamp | Created time |

### regions
Regions table (OCR/processing regions)

| Field | Type | Description |
|-------|------|-------------|
| id | string (PK) | Region ID |
| run_id | string (FK) | Associated run → runs.id |
| asset_id | string (FK) | Associated asset → assets.id |
| key | string | Region key name |
| source_text | text | Source text |
| processed_texts | jsonb | Processed text (multi-language) |
| bbox | jsonb | Bounding box coordinates |
| overflow_detected | boolean | Overflow detected |
| confidence | number | Confidence score |
| context | jsonb | Context information |
| created_at | timestamp | Created time |

### share_links
Share links table

| Field | Type | Description |
|-------|------|-------------|
| id | string (PK) | Link ID |
| run_id | string (FK) | Associated run → runs.id |
| token | string | Access token (sensitive) |
| expires_at | timestamp | Expiration time |
| download_path | string | Download path |
| download_count | number | Download count |
| created_at | timestamp | Created time |

## Common Query Templates

### User Statistics
```sql
-- New users in last N days
SELECT DATE(created_at) as date, COUNT(*) as count 
FROM user_profiles 
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at) 
ORDER BY date DESC;
```

### Project Run Status
```sql
-- Projects with run statistics
SELECT 
  p.id, p.name,
  COUNT(r.id) as total_runs,
  SUM(CASE WHEN r.status = 'completed' THEN 1 ELSE 0 END) as completed,
  SUM(CASE WHEN r.status = 'failed' THEN 1 ELSE 0 END) as failed
FROM projects p
LEFT JOIN runs r ON r.project_id = p.id
GROUP BY p.id, p.name
ORDER BY total_runs DESC
LIMIT 50;
```

### Failed Run Investigation
```sql
-- Recent failed runs (with error messages)
SELECT id, project_id, error, created_at
FROM runs
WHERE status = 'failed'
ORDER BY created_at DESC
LIMIT 20;
```
