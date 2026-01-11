<div align="center">
  
# 🚀 Ship Faster

**Skills 为主线的一条链路（idea → deploy）；templates/packs 是配套素材。**
**Skills 支持通过 99-evolution 钩子自我迭代（仅生成补丁建议，不自动改动）。**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

<br />

[🌐 VoxYZ](https://voxyz.space) · [🎯 Demo 001](https://copyback.vercel.app/) · [🎯 Demo 002](https://uniteconomics-console.vercel.app/) · [📦 Templates](./templates/) · [🧩 Copy Packs](./packs/) · [Agent Skills](./skills/) · [🇺🇸 English](./README.md)

<br />

<img src="https://img.shields.io/badge/状态-活跃开发中-success?style=for-the-badge" alt="Status" />

</div>

---

## ⚡ 10 秒上手（先用 Skills）

```bash
# 1) 把 skills 复制到 Claude Code 目录
cp -r skills/* ~/.claude/skills/
```

2) 在 Claude Code/Opencode 等里运行工作流技能 `00-workflow-ship-faster`

3) 产物目录：`.claude/runs/ship-faster/<run_id>/`（包含产物与日志）

> 所有会产生外部副作用的操作（部署、支付等）都需要显式审批门控。

Skills 是主线：运行 `00-workflow-ship-faster` 即可端到端交付。Templates 和 packs 是可选配套素材，需要时再运行/复制即可。

---

## ✨ 这是什么？

**Ship Faster** 是 [VoxYZ](https://voxyz.space) 背后的资产仓库：

> 一句话：我做了一套可复制的 Agent Skills 工具箱，把从 idea/prototype 到上线的流程拆成可组合技能，并用文件落盘做状态与审计。当前主线是 Ship Faster：Next.js + Supabase + Stripe + GitHub/Vercel + AI SEO，支持可恢复、可追踪，并对所有外部副作用操作做了强制审批门控。

| 类型 | 说明 |
|:-----|:-----|
| 🤖 **Agent Skills（主线）** | 可复用工作流，端到端交付（idea → deploy） |
| 📦 **Runnable Templates** | 配套素材：完整可运行的全栈项目 |
| 🧩 **Copy Packs** | 配套素材：模块化代码包，复制即用 |

> 💡 仓库根目录**刻意不可运行**。请从 `templates/` 选择一个模板运行，或从 `packs/` 复制代码包到你的项目。

---

## ⚡ 快速开始（30 秒）

```bash
# 1. 克隆仓库
git clone https://github.com/Heyvhuang/ship-faster.git
cd ship-faster

# 2. 选择一个模板并运行
cd templates/001-copyback-studio
pnpm install && pnpm dev
```

**或将代码包复制到你的项目中：**

```bash
# 将 SaaS 启动包复制到你的项目
cp -r packs/2026-01-10-create-saas-starter-pack/copy-pack/* ./your-project/
```

**或复制 Agent Skills 到你的 Claude 目录：**

```bash
# 复制 skills 到 Claude Code 目录
cp -r skills/* ~/.claude/skills/
```

---

## 📂 仓库结构

```
ship-faster/
├── 📁 templates/                 # 可运行的完整项目
│   ├── README.md
│   ├── 001-copyback-studio/      # CopyBack Studio 应用
│   └── 002-uniteconomics-console/ # UnitEconomics Console 应用
├── 📁 packs/                     # 可复制的模块化代码包
│   ├── README.md
│   └── 2026-01-10-create-saas-starter-pack/
├── 📁 skills/                    # AI 代理工作流（复制到 .claude/skills/）
│   ├── README.md
│   ├── 00-workflow-ship-faster/
│   └── ...
├── 📄 LICENSE
├── 📄 README.md
└── 📄 README.zh-CN.md
```

---

## 📦 Templates（模板）

全栈、生产就绪的项目，克隆即可运行。

| # | 模板 | 描述 | 技术栈 | 链接 |
|:-:|:-----|:-----|:-------|:-----|
| 001 | **CopyBack Studio** | 全栈创意应用 | Next.js + Supabase | [→ 打开](templates/001-copyback-studio/) |
| 002 | **UnitEconomics Console** | 单页单位经济分析控制台 | Next.js + Gemini | [→ 打开](templates/002-uniteconomics-console/) |

---

## 🧩 Copy Packs（代码包）

模块化代码包，包含你需要的一切——复制粘贴即可使用。

| 日期 | 代码包 | 包含内容 | 链接 |
|:-----|:-------|:---------|:-----|
| 2026-01-10 | **SaaS 启动包** | Supabase + Stripe + Credits + R2 | [→ 打开](packs/2026-01-10-create-saas-starter-pack/) |

---

## Agent Skills（技能）

可复用的 AI 代理工作流，复制到你的 `.claude/skills/` 目录即可使用；即使不用 Claude，也可以当作执行清单。

| Skill | Description | Link |
|:------|:------------|:-----|
| **00-entry-router** | 入口路由：调度与工作流管理 | [→ 打开](skills/00-entry-router/) |
| **00-workflow-ship-faster** | 主流程：idea → deploy | [→ 打开](skills/00-workflow-ship-faster/) |
| **01-nextjs-foundation** | Next.js 初始化/升级 | [→ 打开](skills/01-nextjs-foundation/) |
| **02-design-style-selector** | 选择并部署设计风格 | [→ 打开](skills/02-design-style-selector/) |
| **03-nextjs-guardrails** | Lint/format/typecheck 基线 | [→ 打开](skills/03-nextjs-guardrails/) |
| **06-nextjs-supabase** | Supabase 集成 | [→ 打开](skills/06-nextjs-supabase/) |
| **07-nextjs-stripe** | Stripe 集成 | [→ 打开](skills/07-nextjs-stripe/) |
| **08-github-vercel-deploy** | GitHub + Vercel 部署 | [→ 打开](skills/08-github-vercel-deploy/) |
| **09-ai-seo-nextjs** | AI 时代 SEO（sitemap/robots/llms.txt） | [→ 打开](skills/09-ai-seo-nextjs/) |

> 完整列表与使用方法见 [skills/README.md](./skills/)。

---

## 📝 命名规范

| 类型 | 格式 | 示例 |
|:-----|:-----|:-----|
| Templates | `templates/<NNN>-<slug>/` | `001-copyback-studio` |
| Packs | `packs/<YYYY-MM-DD>-<slug>/` | `2026-01-10-create-saas-starter-pack` |
| Skills | `skills/<NN>-<slug>/` | `01-nextjs-foundation` |

- **NNN**：推荐顺序（001, 002, ...）
- **YYYY-MM-DD**：创建日期，用于时间线排序
- **NN**：执行顺序（00-09 为主流程阶段）

---

## ➕ 新增模板 / 代码包

<details>
<summary><strong>📦 新增 Template</strong></summary>

1. 创建 `templates/<NNN>-<slug>/`
2. 必须包含：
   - `README.md` — 入口文档
   - `.env.local.example` — 环境变量模板

</details>

<details>
<summary><strong>🧩 新增 Pack</strong></summary>

1. 创建 `packs/<YYYY-MM-DD>-<slug>/`
2. 必须包含：
   - `COPY_PACK.md` — 使用指南
   - `copy-pack/` — 可复制的文件
   - `copy-pack/.env.example` — 环境变量模板（禁止包含真实密钥！）

</details>

---

## 🔒 安全须知

- ✅ 禁止提交密钥或本地环境文件（`.env.local`）
- ✅ 构建产物已被 gitignore（`.next/`、`*.tsbuildinfo`）

---

## 📄 开源协议

MIT License — 详见 [LICENSE](LICENSE)

---

<div align="center">

**Made with ❤️ by [VoxYZ](https://voxyz.space)**

<sub>小步快跑，快速迭代，持续交付</sub>

</div>
