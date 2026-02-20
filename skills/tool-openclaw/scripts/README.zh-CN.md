# 脚本说明（维护 / 更新 / 运维）

English version: `README.md`

这个 skill 自带两类脚本：

1) **文档快照（Docs Snapshot）**：将 https://docs.openclaw.ai 同步为本地可检索快照，并生成索引  
2) **OpenClaw 运维（Ops）**：自动更新 OpenClaw、健康检查、日志清理、诊断打包等

> 默认行为偏保守：包含并发锁、避免重入、失败时尽量不破坏现有文件。

---

## A. 文档快照（推荐）

### 1) 手动更新

```bash
# 默认：刷新 placeholder + 无 SNAPSHOT 头的历史页面 + 过期页面
node scripts/update_docs_snapshot.mjs --mode seed

# 全量刷新当前 llms frontier 内页面
node scripts/update_docs_snapshot.mjs --mode full

# 仅同步 llms frontier（只补占位，不抓正文）
node scripts/update_docs_snapshot.mjs --mode sync

# 同步 frontier 并删除本地已过期页面（不在 llms frontier 中）
node scripts/update_docs_snapshot.mjs --mode sync --prune

# 仅重建索引
node scripts/update_docs_snapshot.mjs --mode index
```

最佳努力中文路由（页面不存在则回落英文）：

```bash
node scripts/update_docs_snapshot.mjs --mode seed --locale zh-CN
```

仅验证不落盘（包含索引文件）：

```bash
node scripts/update_docs_snapshot.mjs --mode full --dry-run --prune
```

调整 seed 模式“过期阈值”（默认 14 天）：

```bash
node scripts/update_docs_snapshot.mjs --mode seed --seed-max-age-days 7
```

### 2) 定时自动更新

- `scripts/autoupdate/docs_snapshot_autoupdate.sh`：可直接调度执行（带锁 + 日志）
- 可选安装方式：
  - cron: `scripts/autoupdate/install_cron_docs_snapshot.sh`
  - systemd user: `scripts/autoupdate/install_systemd_user_docs_snapshot.sh`
  - launchd (macOS): `scripts/autoupdate/install_launchd_docs_snapshot.sh`
  - Windows Task Scheduler: `scripts/autoupdate/install_schtasks_docs_snapshot.ps1`

自动更新包装脚本常用环境变量：

- `DOCS_SNAPSHOT_MODE`（`seed|full|sync|index`，默认 `seed`）
- `DOCS_SNAPSHOT_SEED_MAX_AGE_DAYS`（默认 `14`）
- `DOCS_SNAPSHOT_PRUNE`（`1` 表示清理本地过期页面）
- `DOCS_SNAPSHOT_LOCALE`（例如 `zh-CN`）
- `DOCS_SNAPSHOT_FILTER`（regex）

---

## B. OpenClaw 自动更新（可选）

- `scripts/autoupdate/openclaw_autoupdate.sh`：更新 OpenClaw（二进制更新；可选重启）
- 可选安装方式：
  - cron: `scripts/autoupdate/install_cron_openclaw.sh`
  - systemd user: `scripts/autoupdate/install_systemd_user_openclaw.sh`
  - launchd (macOS): `scripts/autoupdate/install_launchd_openclaw.sh`
  - Windows Task Scheduler: `scripts/autoupdate/install_schtasks_openclaw.ps1`

---

## C. 运维脚本（可选但实用）

- `scripts/ops/healthcheck.sh`：基础健康检查（进程/端口/关键命令）
- `scripts/ops/diag_bundle.sh`：生成可分享的诊断包（自动脱敏）
- `scripts/ops/log_prune.sh`：日志清理与压缩
- `scripts/ops/backup_state.sh`：备份 `~/.openclaw/`（是否加密由你决定）
- `scripts/ops/security_audit.sh`：高风险配置快速扫描（只读）
