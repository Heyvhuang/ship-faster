# Agent Skills

本目录包含 **Agent Skills**（Agent 技能）——模块化、自包含的包，用于通过专用工作流、工具集成和领域专长来扩展 AI Agent 的能力。

这些技能设计为具有 **工作流编排** 能力的"可组合 SOP"：

- 叶子技能专注于某一类任务（代码审查、规则生成、MCP 集成等）
- 工作流/编排器技能将多个叶子技能串连成端到端流水线
- **状态存储在文件中，而非上下文**：所有产物写入磁盘；Agent 只传递路径

**当前重点：Ship Faster**（Next.js + Supabase + Stripe + GitHub + Vercel + AI SEO）

---

## 使用方式

> **重要**：要使用这些技能，将它们复制到项目的 `.claude/skills/` 目录中（或复制到全局 `~/.claude/skills/` 供个人使用）。

```bash
# 复制到项目
cp -r skills/* your-project/.claude/skills/

# 或复制到全局（供所有项目个人使用）
cp -r skills/* ~/.claude/skills/
```

---

## 1. 核心原则

### 1) 传递路径，而非内容

- 主 Agent 不持有大文本块
- 子 Agent 自己读取输入文件并写入输出文件
- 返回值尽可能使用路径（或路径列表）

优势：上下文隔离、支持并行、可恢复、可追踪。

### 2) 文件是一等公民（Artifact-first）

工作流运行的"唯一事实来源"存在于磁盘，而非聊天记录。

每次运行推荐的产物：
- `goal.md`（目标/约束）
- `context.json`（关键上下文）
- `plan*.md`（执行计划 + 检查点）
- `final*.md/.json`（交付物）
- `events.jsonl`（结构化日志）

### 3) 确定性优先

- 使用脚本/规则处理确定性任务（格式化、批量替换、Schema 验证）
- 使用 LLM 处理判断/生成/解释，而非机械任务

### 4) 写入操作检查点（Human-in-the-loop）

任何有外部副作用的操作（Cloudflare 资源变更、Supabase 写入、Stripe 退款/取消）：

- 必须先写计划文件（`03-plans/approval.md`）
- 然后在聊天中请求明确用户确认
- 确认后才执行

---

## 2. 目录结构

### 技能目录结构

每个技能至少包含：

```
<skill-name>/
  SKILL.md
```

可选目录：
- `references/`：按需加载的参考资料（Schema、检查清单、模板）
- `scripts/`：可执行脚本（确定性回退）
- `assets/`：静态资源（模板、图标、数据文件）

### SKILL.md Frontmatter（发现契约）

每个 SKILL.md 使用 YAML frontmatter 进行发现/触发：

```yaml
---
name: skill-name
description: 技能做什么以及何时使用（包含触发词）
license: 可选
compatibility: 可选
metadata: 可选
allowed-tools: 可选
---
```

约束：
- `name` 必须与目录名匹配
- `name` 使用小写 + 连字符（kebab-case）

---

## 3. 工作流运行（运行目录契约）

工作流/编排器技能在目标项目根目录创建运行记录：

```
<project-root>/.claude/runs/<workflow>/<run_id>/
  01-input/
    goal.md
    context.json
  02-analysis/
  03-plans/
    approval.md
  04-parallel/
  05-final/
  logs/
    events.jsonl
    state.json
```

约定：
- `01-input/`：仅用户输入/背景
- `02-analysis/`：证据和分析（可复用）
- `03-plans/`：可执行计划（必须在写操作前生成并确认）
- `04-parallel/`：并行子任务产物（每个任务一个子目录）
- `05-final/`：最终交付物
- `logs/`：可追加的结构化日志和状态机

**注意**：不要在产物/日志中记录密钥/令牌/邮箱（需要时使用脱敏版本）。

---

## 4. 技能概览

### 4.1 编排器 / 工作流（Ship Faster 流水线）

| 技能 | 描述 |
|------|------|
| `00-workflow-ship-faster/` | 主流水线：idea/prototype → style → guardrails → Supabase/Stripe → GitHub+Vercel → AI SEO |
| `00-entry-router/` | 路由器/调度器（仅路径、运行目录、检查点、并行/可恢复） |
| `skill-improver/` | 对运行产物/日志进行回顾，输出改进建议 |

### 4.2 Ship Faster 组件（按阶段）

| 技能 | 描述 |
|------|------|
| `01-nextjs-foundation/` | 创建/升级/迁移小型项目到 Next.js（项目过大则跳过升级） |
| `02-design-style-selector/` | 选择并部署 `design-system.md` |
| `03-nextjs-guardrails/` | 最小 lint/format/typecheck 基线（避免繁重的治理阻碍开发） |
| `04-docs-baseline/` | 最小 README/env vars/deploy 说明 |
| `05-feature-shipper/` | 核心功能迭代（拆分 + 交付） |
| `06-nextjs-supabase/` | Next.js + Supabase 集成（使用 `supabase-mcp`） |
| `07-nextjs-stripe/` | Next.js + Stripe 集成（默认：Payment Links 快速路径；使用 `stripe-mcp`） |
| `08-github-vercel-deploy/` | GitHub + Vercel 部署和预览环境 |
| `09-ai-seo-nextjs/` | AI 时代 SEO（sitemap/robots/llms.txt/结构化数据） |

### 4.3 分析 / 审查（报告输出）

| 技能 | 描述 |
|------|------|
| `clean-code-reviewer/` | 基于 Clean Code 原则的代码质量审查；输出 `clean-code-review.md` + `.json` |
| `doc-consistency-reviewer/` | 文档与实现一致性审计；输出 `doc-consistency.md` + `.json` |

### 4.4 规则 / 确定性转换

| 技能 | 描述 |
|------|------|
| `ast-grep-rule-crafter/` | 生成 `ast-grep` YAML 规则（搜索/重写），用于批量重构、API 迁移、Lint 规则 |

### 4.5 外部系统 MCP（副作用、严格门控）

| 技能 | 描述 |
|------|------|
| `cloudflare-mcp/` | Workers/KV/R2/D1/Hyperdrive 诊断和变更；诊断/变更/超级管理员层级 |
| `supabase-mcp/` | DB 查询/写入/迁移/日志/类型生成；拒绝无 WHERE 的 UPDATE/DELETE；DDL 必须使用迁移 |
| `stripe-mcp/` | 客户/产品/价格/发票/支付链接/订阅/退款/争议；默认测试模式；资金/合同操作需要确认 |

### 4.6 Meta 技能（创建/维护技能）

| 技能 | 描述 |
|------|------|
| `skill-creator/` | 创建/验证/打包技能的工具和方法论；包含 `scripts/`（脚手架 + 验证器） |
| `skill-improver/` | 读取运行产物和日志，生成最小改进建议（不自动编辑） |
| `99-evolution/` | 全局钩子，捕获失败信号和上下文，生成 `evolution-candidates.md`，使用 `skill-improver` 生成补丁建议 |

---

## 5. 推荐用法（Ship Faster）

### 主流水线：Idea/Prototype → Launch

- 使用：`00-workflow-ship-faster`（或让 `00-entry-router` 分发）
- 产物：`.claude/runs/ship-faster/<run_id>/`（计划、日志、最终摘要）

### 按阶段使用（按需）

| 阶段 | 技能 |
|------|------|
| 基础搭建 | `01-nextjs-foundation` |
| 设计 | `02-design-style-selector` |
| 代码规范 | `03-nextjs-guardrails` |
| 文档基线 | `04-docs-baseline` |
| 功能迭代 | `05-feature-shipper` |
| 数据库 | `06-nextjs-supabase`（DB 操作通过 `supabase-mcp`） |
| 计费 | `07-nextjs-stripe`（操作/对象管理通过 `stripe-mcp`） |
| 部署 | `08-github-vercel-deploy` |
| AI SEO | `09-ai-seo-nextjs` |

### 深度治理（可选、不阻塞）

- 深度代码审查：`clean-code-reviewer`（可与 `ast-grep-rule-crafter` 组合进行批量修复）
- 深度文档一致性审计：`doc-consistency-reviewer`

---

## 6. 项目级别覆盖

全局技能（本目录）应保持通用性。

如果某个技能需要项目特定信息（DB Schema、业务规则、品牌指南），在项目中覆盖：

```
<project-root>/.claude/skills/<skill-name>/
  SKILL.md
  references/
```

示例：将项目特定的 Schema 放在项目中，而非全局 `supabase-mcp`。

---

## 7. 验证与维护

### 验证单个技能

```bash
python skill-creator/scripts/quick_validate.py <skill-dir>
```

### 验证所有技能

```bash
for d in */; do [ -f "${d}SKILL.md" ] && python skill-creator/scripts/quick_validate.py "${d%/}" || exit 1; done
```

### 创建新技能（脚手架）

```bash
python skill-creator/scripts/init_skill.py my-new-skill --path .
```

### 打包技能（可分发的 .skill 文件）

```bash
python skill-creator/scripts/package_skill.py ./my-new-skill ./dist
```

---

## 8. 维护约束

- 目录名必须匹配 `SKILL.md` frontmatter 的 `name`
- `SKILL.md` 必须描述触发词和边界（何时使用/不使用），避免技能竞争触发
- 工作流必须"先计划后执行"：先写计划，再执行变更
- `references/` 仅使用单级引用（无深层链接）
- 永远不要在产物/日志中记录密钥

---

## 9. 快速指南：如何使用

将技能视为两层：

- **数字前缀（`00-` ~ `09-`）**：Ship Faster 主流水线"步骤按钮"——数字表示推荐执行顺序
- **无前缀**：基础能力（原子工具、审查、规则、MCP）——随时使用

### 最常见用法

1. 提供入口点：
   - **从 idea 开始**：描述产品应该做什么
   - **从 prototype 开始**：提供仓库路径或链接
2. 指定你需要什么：DB (Supabase) / Billing (Stripe) / Deploy (Vercel) / SEO
3. 运行主流水线：`00-workflow-ship-faster`

流水线将所有计划、证据和产物写入项目：`.claude/runs/ship-faster/<run_id>/`，因此：
- 中途停止也没关系（从最后一个检查点恢复）
- 一切可追踪（做了什么以及为什么）

### 运行单个阶段

直接调用对应编号：
- 仅基础搭建：`01-nextjs-foundation`
- 仅设计：`02-design-style-selector`
- 仅部署：`08-github-vercel-deploy`

### 深度能力（无前缀）

- 深度代码审查 / 批量基于规则的重构：`clean-code-reviewer` / `ast-grep-rule-crafter`
- 深度文档一致性审计：`doc-consistency-reviewer`
- DB 操作：`supabase-mcp`
- Stripe 操作：`stripe-mcp`
- Cloudflare（故障排查/可观测性/资源变更）：`cloudflare-mcp`

### 自动演进（可选）

- 启用 `99-evolution` 全局钩子（见 `99-evolution/hooks/settings.example.json`）
- 会话结束后，生成 `evolution-candidates.md`
- 使用 `skill-improver` 生成补丁建议，手动确认后再编辑技能

### 主流水线图

```text
(idea) / (小型原型)
          |
          v
  00-workflow-ship-faster
          |
          +--> 01-nextjs-foundation      (创建/升级/迁移到 Next.js)
          |
          +--> 02-design-style-selector  (选择 + 部署 design-system.md)
          |
          +--> 03-nextjs-guardrails      (lint/format/typecheck 基线)
          |
          +--> 04-docs-baseline          (README/env/deploy 说明基线)
          |
          +--> 05-feature-shipper        (迭代核心功能)  <循环>
          |
          +--> 06-nextjs-supabase        (可选 DB)
          |
          +--> 07-nextjs-stripe          (可选计费)
          |
          +--> 08-github-vercel-deploy   (可选但推荐)
          |
          +--> 09-ai-seo-nextjs          (可选但推荐)
          |
          v
     可发布应用 + .claude/runs/ 下的产物
```
