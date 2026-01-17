<div align="center">
  
<img src="skills/assets/Head.png" alt="Ship Faster" width="720" />

<br />

**面向 AI coding agents 的端到端开发工作流。**
**想法 → 可上线 Web app，全程可续跑、产物落盘、副作用门控。**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

<br />

[Docs](./docs/) · [Skills](./skills/) · [Templates](./templates/) · [English](./README.md)

</div>

---

## 这是什么？

**Ship Faster** 是一套给 AI coding agents 用的可复制 workflows（skills）工具箱。

| 没有 Ship Faster | 有了 Ship Faster |
|:-----------------|:-----------------|
| Agent 执行到一半丢失上下文 | 每次运行都写入磁盘 — 随时可续跑 |
| 没有审计记录 | 完整日志 + 证据，支持回放/审查 |
| 副作用有风险（部署、DB 写入、支付） | 外部操作前必须显式审批 |
| 临时 prompt，输出不一致 | 可组合 skills，结构可预测 |

**默认技术栈**：Next.js 16.1.1 + 可选 Supabase/Stripe + GitHub/Vercel + AI 时代 SEO。

---

## 适合谁？

- **AI coding agents**（Claude Code、Cursor、OpenCode 等）— skills 是主要接口
- **操作这些 agents 的开发者** — 复制粘贴 prompt，审查产物，批准门控
- **希望 AI 辅助开发可复现、可审计的团队**

> 这不是 CLI，不是 SaaS。它是一组文件，复制到你的 agent skill 目录即可使用。

---

## 快速开始

### 方式 A：只装 skills（10 秒）

只需要工作流，不用克隆整个仓库：

```bash
# macOS / Linux
mkdir -p ~/.claude/skills
curl -L https://github.com/Heyvhuang/ship-faster/archive/refs/heads/main.tar.gz \
  | tar -xz --strip-components=2 -C ~/.claude/skills ship-faster-main/skills/
```

<details>
<summary>Windows (PowerShell)</summary>

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.claude\skills" | Out-Null
$zip = "$env:TEMP\ship-faster-main.zip"
Invoke-WebRequest -Uri "https://github.com/Heyvhuang/ship-faster/archive/refs/heads/main.zip" -OutFile $zip
Expand-Archive -Path $zip -DestinationPath "$env:TEMP\ship-faster" -Force
Copy-Item -Recurse -Force "$env:TEMP\ship-faster\ship-faster-main\skills\*" "$HOME\.claude\skills\"
```

</details>

### 方式 B：克隆完整仓库（30 秒）

如果你还想要可运行的示例项目：

```bash
git clone https://github.com/Heyvhuang/ship-faster.git
cd ship-faster

# 复制 skills 到你的 agent
cp -r skills/* ~/.claude/skills/

# 或者直接运行一个模板
cd templates/001-copyback-studio
pnpm install && pnpm dev
```

---

## 选择入口

安装 skills 后，把下面的 prompt 发给你的 agent：

### 1) 我只有一个想法（从零开始）

```text
Use workflow-project-intake.

Idea: <我们要做什么?>
Users: <给谁用?>
Must-have: <3-5 条>
Constraints: <时间 / 技术 / 设计 / 基建限制>
Need: deploy? database? billing? seo?
```

### 2) 我有一个仓库（推进到上线）

```text
Use workflow-ship-faster.

Repo path: <绝对路径或 '.'>
Constraints: <deadline / tech / non-goals>
Need: deploy? database? billing? seo?
```

### 3) 我想快速交付一个功能（PR 尺寸）

```text
Use workflow-feature-shipper.

Repo path: <绝对路径或 '.'>
Feature: <一句话描述>
Acceptance criteria:
- <bullet>
- <bullet>
Non-goals:
- <bullet>
```

### 4) 我想做 UI/UX 设计（设计系统 / 配色 / 字体 / 无障碍）

```text
Use tool-design-style-selector.   # 生成 design-system.md
# 或：
Use tool-ui-ux-pro-max.           # 快速查配色/字体/UX/a11y 规则

Query: <你要什么?>
Domain: product|style|typography|color|landing|chart|ux
Stack (可选): nextjs|react|html-tailwind|vue|svelte|flutter|swiftui
```

---

## 工作原理

![Ship Faster 主流程](skills/assets/ship-faster-flow.png)

每次运行都写入磁盘，支持续跑/审计：

```
.claude/runs/ship-faster/<run_id>/
├── 00-index.md          # 续跑入口（从这里开始）
├── 03-plans/            # 计划清单（[ ] → [x]）
├── 02-analysis/         # 证据/扫描产物（大输出）
├── 05-final/            # 最终交付总结
└── logs/                # 执行日志（大输出）
```

- **当前 run 指针**：`.claude/runs/ship-faster/ACTIVE`
- **进度在 plans 里**：打开 `00-index.md` → 跟随 `Next action` → 在 `03-plans/*.md` 打勾推进
- **副作用操作**（部署、支付、DB 写入）执行前需显式审批

> 详见：[Runs & Approvals](docs/concepts/runs-and-approvals.md)

---

## Skills（技能）

可组合的端到端工作流。复制到 `~/.claude/skills/` 或当作执行清单使用。

| 类别 | Skills |
|:-----|:-------|
| **工作流** | [workflow-project-intake](skills/workflow-project-intake/) · [workflow-brainstorm](skills/workflow-brainstorm/) · [workflow-ship-faster](skills/workflow-ship-faster/) · [workflow-feature-shipper](skills/workflow-feature-shipper/) |
| **工具** | [tool-design-style-selector](skills/tool-design-style-selector/) · [tool-ui-ux-pro-max](skills/tool-ui-ux-pro-max/) · [tool-ast-grep-rules](skills/tool-ast-grep-rules/) · [tool-x-article-publisher](skills/tool-x-article-publisher/) |
| **审查** | [review-quality](skills/review-quality/) · [review-react-best-practices](skills/review-react-best-practices/) |
| **服务集成** | [supabase](skills/supabase/) · [stripe](skills/stripe/) · [cloudflare](skills/cloudflare/) |
| **元技能** | [skill-evolution](skills/skill-evolution/) · [skill-creator](skills/skill-creator/) · [skill-improver](skills/skill-improver/) |

> 完整列表：[`skills/manifest.json`](skills/manifest.json)

![Run 产物结构](skills/assets/run-artifacts.png)

---

## Templates（模板）

可运行的示例项目 — Demo + 回归参考。

| # | 模板 | 技术栈 | 链接 |
|:-:|:-----|:-------|:-----|
| 001 | **CopyBack Studio** | Next.js + Supabase + R2 | [→ 打开](templates/001-copyback-studio/) |
| 002 | **UnitEconomics Console** | Next.js | [→ 打开](templates/002-uniteconomics-console/) |
| 003 | **MarginLedger** | Vite + React | [→ 打开](templates/003-marginledger/) |
| 004 | **Kanban Load Mirror** | Vite + React | [→ 打开](templates/004-kanban-load-mirror/) |
| 005 | **Multi-Store Daily Brief** | Vite + React | [→ 打开](templates/005-multi-store-daily-brief/) |
| 006 | **Ticket to FAQ** | Vite + React | [→ 打开](templates/006-ticket-to-faq/) |
| 007 | **Elevate Move-in Booking** | Vite + React | [→ 打开](templates/007-elevate-move-in-booking/) |

> 仓库根目录**刻意不可运行**。请选择一个模板，或用 skills 对你自己的项目运行。

---

<details>
<summary><strong>仓库结构</strong></summary>

```
ship-faster/
├── docs/                         # 文档
├── templates/                    # 可运行的完整项目
│   ├── 001-copyback-studio/
│   ├── 002-uniteconomics-console/
│   ├── 003-marginledger/
│   ├── 004-kanban-load-mirror/
│   ├── 005-multi-store-daily-brief/
│   ├── 006-ticket-to-faq/
│   └── 007-elevate-move-in-booking/
├── skills/                       # Agent 技能包
│   ├── workflow-ship-faster/
│   ├── workflow-project-intake/
│   ├── review-*/
│   ├── tool-*/
│   ├── supabase/
│   ├── stripe/
│   ├── cloudflare/
│   └── assets/                   # 图示等静态资源
├── snippets/                     # 内部参考代码
│   └── product-starter/
├── LICENSE
├── README.md
└── README.zh-CN.md
```

</details>

<details>
<summary><strong>命名规范</strong></summary>

| 类型 | 格式 | 示例 |
|:-----|:-----|:-----|
| Templates | `templates/<NNN>-<slug>/` | `001-copyback-studio` |
| Snippets | `snippets/<slug>/` | `product-starter` |
| Skills | `skills/<prefix>-<slug>/` | `workflow-ship-faster` |

前缀：`workflow-`、`tool-`、`review-`、`skill-`
服务类 skills（supabase、stripe、cloudflare）直接使用服务名。

</details>

<details>
<summary><strong>更新 / 卸载</strong></summary>

**更新**（覆盖现有 skills）：

注意：只会覆盖同名 skill 文件夹，`~/.claude/skills/` 下其他目录不会受影响。

```bash
curl -L https://github.com/Heyvhuang/ship-faster/archive/refs/heads/main.tar.gz \
  | tar -xz --strip-components=2 -C ~/.claude/skills ship-faster-main/skills/
```

**只安装单个 skill**：

```bash
git clone https://github.com/Heyvhuang/ship-faster.git
cp -r ship-faster/skills/workflow-ship-faster ~/.claude/skills/
```

**卸载**：从 `~/.claude/skills/` 删除对应的 skill 文件夹（名称见 `skills/manifest.json`）。

</details>

<details>
<summary><strong>新增模板 / Snippets</strong></summary>

**新增 Template**：
1. 创建 `templates/<NNN>-<slug>/`
2. 包含 `README.md` 和 `.env.local.example`

**新增 Snippet**：
1. 创建 `snippets/<slug>/`
2. 包含 `README.md` 说明哪些 skills 会复制它

</details>

---

## 安全须知

- 禁止提交密钥或 `.env.local` 文件
- 构建产物（`.next/`、`*.tsbuildinfo`）已被 gitignore

---

## 开源协议

MIT License — 详见 [LICENSE](LICENSE)

---

<div align="center">

**Made by [VoxYZ](https://voxyz.space)**

<sub>小步快跑，快速迭代，持续交付</sub>

</div>
