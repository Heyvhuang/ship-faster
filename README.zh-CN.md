<div align="center">
  
# 🚀 Ship Faster

**面向 coding agents 的完整开发工作流 —— 由可组合 skills 构成。**
**把想法/小原型推进到可上线的 Web app：可续跑、产物落盘、外部副作用必须确认。**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

<br />

[VoxYZ](https://voxyz.space) · [Demo 001](https://copyback.vercel.app/) · [Demo 002](https://uniteconomics-console.vercel.app/) · [Templates](./templates/) · [Skills](./skills/) · [Manifest](./skills/manifest.json) · [English](./README.md)

</div>

---

## ⚡ 10 秒上手（先用 Skills）

```bash
# 1) 把 skills 复制到 Claude Code 目录
cp -r skills/* ~/.claude/skills/
```

2) 在 Claude Code/Opencode 等里运行 `workflow-project-intake`（从想法）或 `workflow-ship-faster`（从仓库）

3) 产物目录：`.claude/runs/ship-faster/<run_id>/`（包含产物与日志；`ACTIVE` 指向当前 run）

![运行产物结构](skills/assets/run-artifacts.png)

> 所有会产生外部副作用的操作（部署、支付等）都需要显式审批门控。

Skills 是主线：运行 `workflow-ship-faster` 即可端到端交付。Templates 是可运行示例；内部 snippets 用于让 Agent 在集成实现时更快复用。

---

## ✨ 这是什么？

**Ship Faster** 是 [VoxYZ](https://voxyz.space) 背后的资产仓库：

> 一套给 coding agents 用的可复制 workflows（skills）工具箱。每次运行都把计划/证据/交付写进磁盘，支持续跑与审计；所有外部副作用（部署/支付/DB 写入）必须显式确认。
> 默认链路：Next.js 16.1.1 + 可选 Supabase/Stripe + GitHub/Vercel + AI 时代 SEO。

| 类型 | 说明 |
|:-----|:-----|
| 🤖 **Agent Skills（主线）** | 可复用工作流，端到端交付（idea → deploy） |
| 📦 **Runnable Templates** | 配套素材：完整可运行的全栈项目 |
| 🧱 **Reference Snippets** | 配套素材：Skills 内部用的可复制代码片段（非面向用户） |

> 💡 仓库根目录**刻意不可运行**。请从 `templates/` 选择一个模板运行，或把 `skills/` 复制到你的 Agent 环境后，对真实项目运行主流程。

![Ship Faster 主流程](skills/assets/ship-faster-flow.png)

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

---

## 📂 仓库结构

```
ship-faster/
├── 📁 templates/                 # 可运行的完整项目
│   ├── README.md
│   ├── 001-copyback-studio/      # CopyBack Studio 应用
│   └── 002-uniteconomics-console/ # UnitEconomics Console 应用
├── 📁 skills/                    # AI 代理技能包（复制到 .claude/skills/）
│   ├── workflow-ship-faster/
│   ├── workflow-project-intake/
│   └── ...                       # 更多 skills（workflow/tool/review/mcp/...）
├── 📁 snippets/                  # 内部可复制代码片段（给 Agent 用）
│   └── product-starter/
├── 📁 skills/assets/             # 图示等静态资源
│   └── ship-faster-flow.svg
├── 📄 LICENSE
├── 📄 README.md
└── 📄 README.zh-CN.md
```

---

## 📦 Templates（模板）

可运行示例项目（Demo + 回归参考），克隆即可跑起来。

| # | 模板 | 描述 | 技术栈 | 链接 |
|:-:|:-----|:-----|:-------|:-----|
| 001 | **CopyBack Studio** | 全栈创意应用 | Next.js + Supabase | [→ 打开](templates/001-copyback-studio/) |
| 002 | **UnitEconomics Console** | 单页单位经济分析控制台 | Next.js + Gemini | [→ 打开](templates/002-uniteconomics-console/) |

![模板循环](skills/assets/template-loop.png)

---

## 🧱 Reference Snippets（内部片段）

Skills 内部用的可复制代码片段，用于让 Agent 执行更快。对普通用户不作为主要入口；可运行项目请用 `templates/`。

| Snippet Set | 包含内容 | 链接 |
|:-----------|:---------|:-----|
| `product-starter` | Supabase + Stripe + Credits + R2 | [→ 打开](snippets/product-starter/) |

---

## Agent Skills（技能）

可复用的 AI 代理工作流，复制到你的 `.claude/skills/` 目录即可使用；即使不用 Claude，也可以当作执行清单。

| Skill | Description | Link |
|:------|:------------|:-----|
| **workflow-project-intake** | 入口：澄清 + 路由 | [→ 打开](skills/workflow-project-intake/) |
| **workflow-ship-faster** | 主链路：idea/prototype → launch | [→ 打开](skills/workflow-ship-faster/) |
| **workflow-feature-shipper** | 功能迭代（拆分 + 交付） | [→ 打开](skills/workflow-feature-shipper/) |
| **workflow-template-seeder** | 快速生成一个可运行模板 | [→ 打开](skills/workflow-template-seeder/) |
| **workflow-template-extractor** | 从真实项目提取为可分享模板 | [→ 打开](skills/workflow-template-extractor/) |
| **tool-design-style-selector** | 选择并部署 `design-system.md` | [→ 打开](skills/tool-design-style-selector/) |
| **tool-ast-grep-rules** | 生成 `ast-grep` 规则（批量重构） | [→ 打开](skills/tool-ast-grep-rules/) |
| **mcp-supabase** | Supabase DB 操作（严格门控） | [→ 打开](skills/mcp-supabase/) |
| **mcp-stripe** | Stripe 操作（严格门控） | [→ 打开](skills/mcp-stripe/) |
| **mcp-cloudflare** | Cloudflare 操作（严格门控） | [→ 打开](skills/mcp-cloudflare/) |
| **skill-evolution** | Hooks + 复盘（仅补丁建议） | [→ 打开](skills/skill-evolution/) |

![Skills 分组地图](skills/assets/skills-map.png)

> 完整列表见 `skills/manifest.json`（机器可读）。

---

## 📝 命名规范

| 类型 | 格式 | 示例 |
|:-----|:-----|:-----|
| Templates | `templates/<NNN>-<slug>/` | `001-copyback-studio` |
| Snippets | `snippets/<slug>/` | `snippets/product-starter` |
| Skills | `skills/<prefix>-<slug>/` | `workflow-ship-faster` |

- **NNN**：推荐顺序（001, 002, ...）
- **prefix**：语义分组（`workflow-`、`tool-`、`review-`、`mcp-`、`skill-`、`publish-`）

---

## ➕ 新增模板 / Snippets

<details>
<summary><strong>📦 新增 Template</strong></summary>

1. 创建 `templates/<NNN>-<slug>/`
2. 必须包含：
   - `README.md` — 入口文档
   - `.env.local.example` — 环境变量模板

</details>

<details>
<summary><strong>🧱 新增 Snippet Set</strong></summary>

1. 创建 `snippets/<slug>/`
2. 建议包含：
   - `README.md` — 用途 + 哪些 skills 会引用/复制
   - 可复制的文件（禁止包含真实密钥；尽量保持路径稳定）

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

**Made by [VoxYZ](https://voxyz.space)**

<sub>小步快跑，快速迭代，持续交付</sub>

</div>
