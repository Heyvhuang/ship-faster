# 数据库 Schema 参考

本项目核心表结构（来自 `lib/supabase/types.ts`）。

## 表关系概览

```
user_profiles (用户)
    └── projects (项目) [user_id → user_profiles.id]
            ├── runs (运行记录) [project_id → projects.id]
            │       ├── regions (区域) [run_id → runs.id]
            │       └── share_links (分享链接) [run_id → runs.id]
            ├── assets (资源文件) [project_id → projects.id]
            └── batches (批次) [project_id → projects.id]
                    ├── runs [batch_id → batches.id]
                    └── assets [batch_id → batches.id]
```

## 表详情

### user_profiles
用户资料表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string (PK) | 用户 ID |
| email | string | 邮箱（敏感） |
| role | string | 角色 |
| plan | string | 订阅计划 |
| credits_balance | number | 积分余额 |
| entitlements | jsonb | 权限配置 |
| stripe_customer_id | string | Stripe 客户 ID（敏感） |
| display_name | string | 显示名称 |
| created_at | timestamp | 创建时间 |
| updated_at | timestamp | 更新时间 |

### projects
项目表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string (PK) | 项目 ID |
| user_id | string (FK) | 关联用户 → user_profiles.id |
| name | string | 项目名称 |
| brand_notes | text | 品牌备注 |
| default_recipe | jsonb | 默认配方 |
| created_at | timestamp | 创建时间 |
| updated_at | timestamp | 更新时间 |

### runs
运行记录表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string (PK) | 运行 ID |
| project_id | string (FK) | 关联项目 → projects.id |
| batch_id | string (FK) | 关联批次 → batches.id |
| source_asset_id | string (FK) | 源资源 → assets.id |
| recipe | jsonb | 配方配置 |
| languages | string[] | 语言列表 |
| progress | number | 进度 (0-100) |
| status | string | 状态 (pending/running/completed/failed) |
| stage | string | 当前阶段 |
| started_at | timestamp | 开始时间 |
| completed_at | timestamp | 完成时间 |
| error | text | 错误信息 |
| retries | number | 重试次数 |
| created_at | timestamp | 创建时间 |
| updated_at | timestamp | 更新时间 |

**常用查询条件**：
- `status = 'failed'` - 失败的运行
- `status = 'running'` - 进行中
- `completed_at IS NOT NULL` - 已完成

### assets
资源文件表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string (PK) | 资源 ID |
| project_id | string (FK) | 关联项目 → projects.id |
| batch_id | string (FK) | 关联批次 → batches.id |
| kind | string | 资源类型 |
| storage_path | string | 存储路径 |
| filename | string | 文件名 |
| original_filename | string | 原始文件名 |
| mime_type | string | MIME 类型 |
| size | number | 文件大小 (bytes) |
| checksum | string | 校验和 |
| public_url | string | 公开 URL |
| width | number | 宽度 (px) |
| height | number | 高度 (px) |
| aspect_ratio | number | 宽高比 |
| created_at | timestamp | 创建时间 |

### regions
区域表（OCR/处理区域）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string (PK) | 区域 ID |
| run_id | string (FK) | 关联运行 → runs.id |
| asset_id | string (FK) | 关联资源 → assets.id |
| key | string | 区域键名 |
| source_text | text | 原文本 |
| processed_texts | jsonb | 处理后文本（多语言） |
| bbox | jsonb | 边界框坐标 |
| overflow_detected | boolean | 是否溢出 |
| confidence | number | 置信度 |
| context | jsonb | 上下文信息 |
| created_at | timestamp | 创建时间 |

### share_links
分享链接表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string (PK) | 链接 ID |
| run_id | string (FK) | 关联运行 → runs.id |
| token | string | 访问令牌（敏感） |
| expires_at | timestamp | 过期时间 |
| download_path | string | 下载路径 |
| download_count | number | 下载次数 |
| created_at | timestamp | 创建时间 |

## 常用查询模板

### 用户统计
```sql
-- 最近 N 天新增用户
SELECT DATE(created_at) as date, COUNT(*) as count 
FROM user_profiles 
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at) 
ORDER BY date DESC;
```

### 项目运行状态
```sql
-- 项目及其运行统计
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

### 失败运行排查
```sql
-- 最近失败的运行（含错误信息）
SELECT id, project_id, error, created_at
FROM runs
WHERE status = 'failed'
ORDER BY created_at DESC
LIMIT 20;
```