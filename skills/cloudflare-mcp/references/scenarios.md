# Cloudflare MCP 场景示例

20 个真实开发场景，每个标注所需工具和执行流程。

## Observability（观测排障）

### 1. Worker 5xx 暴涨定位
```
用户：我这个 worker 昨天 18:00 开始 5xx 暴涨，给我定位最可能的原因和证据。
执行：
1. query_worker_observability：过滤 status >= 500，时间范围 17:30-19:00
2. 找到首次报错时间点和错误信息
3. auditlogs_by_account_id：查同时间段是否有部署/配置变更
4. 汇总：根因 + 时间线 + 证据 + 修复建议
```

### 2. CPU 趋势分析
```
用户：把 worker `api-gateway` 最近 24h CPU time 的趋势拉出来，告诉我有没有异常峰值。
执行：
1. query_worker_observability：指标类型 CPU time，worker 名 api-gateway
2. 按小时聚合，找出峰值时段
3. 对比历史基线，判断是否异常
4. 如有峰值，关联同时段日志找原因
```

## Builds（构建排障）

### 3. 构建历史查看
```
用户：列出 `frontend-app` 最近 5 次构建，最新一次为什么失败？
执行：
1. workers_builds_list_builds：worker 名 frontend-app，limit 5
2. workers_builds_get_build：获取失败构建详情
3. workers_builds_get_build_logs：拉取完整日志
4. 提炼失败原因 + 修复建议
```

### 4. 构建日志分析
```
用户：把 build UUID xxx 的 logs 拉出来，帮我提炼出失败的第一原因和可能修复。
执行：
1. workers_builds_get_build_logs：build ID
2. 定位第一个 ERROR/FATAL
3. 分析依赖问题/语法错误/配置问题
4. 给出具体修复步骤
```

## Browser Rendering（页面抓取）

### 5. 页面截图验证
```
用户：把 https://my-site.com 截图给我，看看顶部 banner 有没有加载出来。
执行：
1. 确认有 active account（否则先 accounts_list + set_active_account）
2. get_url_screenshot：URL
3. 返回截图 + 观察结论
```

### 6. 页面转 Markdown
```
用户：把某个线上错误页面转成 markdown，我要贴到事故复盘里。
执行：
1. get_url_markdown：URL
2. 清理格式，保留关键错误信息
3. 返回可直接使用的 markdown
```

## Audit Logs（审计追溯）

### 7. DNS 变更追溯
```
用户：昨天中午是谁改了 DNS 记录？给我审计记录。
执行：
1. auditlogs_by_account_id：时间范围昨天 11:00-14:00
2. 过滤 action 类型为 DNS 相关
3. 列出：时间 + 操作人 + 具体变更
```

### 8. 变更周报
```
用户：把过去 7 天和 Worker 相关的关键配置变更汇总成报告。
执行：
1. auditlogs_by_account_id：过去 7 天
2. 过滤 Worker 相关 action
3. 按日期分组汇总
4. 格式化输出报告
```

## KV 管理

### 9. 列出 KV namespaces
```
用户：列出我账号里所有 KV namespaces，并找出名字像 `prod-*` 的。
执行：
1. accounts_list → set_active_account（如未设置）
2. kv_namespaces_list
3. 过滤 name 匹配 prod-*
4. 返回列表 + 统计
```

### 10. 创建 KV namespace
```
用户：创建一个 KV namespace 叫 `feature-flags`，并告诉我后续怎么绑到 worker。
执行：
1. 展示计划：创建 namespace "feature-flags"
2. 等待用户确认
3. kv_namespace_create：name = feature-flags
4. 返回创建结果 + wrangler.toml 绑定示例
```

### 11. 批量删除 KV（危险）
```
用户：把 `temp-*` 开头的 KV namespace 全部删掉（先列出来让我确认）。
执行：
1. kv_namespaces_list
2. 过滤 temp-* 开头
3. 列出将删除的 namespace（名称 + ID）
4. ⚠️ 等待用户明确确认
5. 逐个 kv_namespace_delete
6. auditlogs_by_account_id 回验删除记录
```

## R2 管理

### 12. R2 清理建议
```
用户：列出 R2 buckets，找出最近可能不用的，给我清理建议。
执行：
1. r2_buckets_list
2. 按创建时间/名称模式分析
3. 标记可能废弃的（如 test-*、tmp-*）
4. 给出清理建议（不直接删除）
```

### 13. 创建 R2 bucket + 代码示例
```
用户：创建一个 R2 bucket 叫 `uploads-prod`，并给我一个最小可用的 worker 代码片段读写它。
执行：
1. 展示计划：创建 bucket "uploads-prod"
2. 等待确认
3. r2_bucket_create：name = uploads-prod
4. 返回创建结果 + Worker 代码示例（env.BUCKET.put/get）
```

## D1 管理

### 14. D1 查询
```
用户：列出 D1 数据库，跑一下 `SELECT COUNT(*) FROM users;`。
执行：
1. d1_databases_list
2. 确认目标数据库
3. d1_database_query：SELECT COUNT(*) FROM users
4. 返回结果
```

### 15. D1 迁移演练（完整流程）
```
用户：我需要一个临时 D1 用来做迁移演练：创建、跑 schema、跑几条测试数据、最后删掉（每步都给我确认点）。
执行：
1. 展示计划：创建临时 DB → 建表 → 插入测试数据 → 删除
2. 确认后 d1_database_create
3. 确认后 d1_database_query：CREATE TABLE ...
4. 确认后 d1_database_query：INSERT ...
5. 确认后 d1_database_delete
6. auditlogs 回验
```

## Hyperdrive 管理

### 16. Hyperdrive 配置分析
```
用户：列出 Hyperdrive 配置，帮我找哪个连到生产库，并建议怎么改缓存策略。
执行：
1. hyperdrive_configs_list
2. hyperdrive_config_get：逐个查看连接字符串
3. 识别生产库连接
4. 分析当前缓存配置 + 优化建议
```

## Workers 代码

### 17. Worker 源码检查
```
用户：拉取 worker `my-worker-script` 的源码，我怀疑它把某个 env 变量写错了。
执行：
1. workers_get_worker：获取 worker 详情
2. workers_get_worker_code：获取源码
3. 搜索 env. 相关引用
4. 标注可疑位置
```

## Container Sandbox（沙箱）

### 18. 跑测试
```
用户：在沙箱里 clone 这个 repo，跑测试，把失败的测试和报错贴出来。
执行：
1. container_initialize（注意：~10分钟生命周期）
2. container_exec：git clone <repo>
3. container_exec：pnpm install && pnpm test
4. 提取失败测试 + 错误信息
5. 汇总报告
```

### 19. 数据分析
```
用户：用 Python 解析这段日志/指标导出，算一下 p95 和 error rate 的变化。
执行：
1. container_initialize
2. container_file_write：写入日志数据
3. container_file_write：写入分析脚本
4. container_exec：python analyze.py
5. 返回分析结果
```

## 综合流程

### 20. 构建失败全链路排障
```
用户：给我做一个"从构建失败 → 找日志 → 修复建议 → 验证线上是否恢复"的自动化排障流程。
执行：
1. workers_builds_list_builds：找到失败构建
2. workers_builds_get_build_logs：分析失败原因
3. 给出修复建议
4. （用户修复并重新部署后）
5. workers_builds_list_builds：确认新构建成功
6. query_worker_observability：确认无新报错
7. get_url_screenshot：验证页面正常
8. 汇总报告
```

## 通用原则

1. **先查后改**：任何写操作前先 list/get 确认现状
2. **明确确认**：写操作必须展示计划，等用户确认
3. **执行后回验**：audit logs + observability 确认无异常
4. **证据链**：排障结论必须有日志/指标/截图支撑
5. **拆分请求**：复杂查询拆小，避免上下文过载