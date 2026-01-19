<div align="center">

<img src="skills/assets/Head.png" alt="Ship Faster" width="720" />

<br />

**16 个可组合技能 + 7 个可运行模板，专为 AI 编程代理设计**

*想法 → 代码 → 部署，一条工作流搞定。可恢复运行、审批门控、完整审计日志。*

<br />

[![Skills](https://img.shields.io/badge/技能-16+-8B5CF6?style=for-the-badge)](./skills/)
[![Templates](https://img.shields.io/badge/模板-7-10B981?style=for-the-badge)](./templates/)
[![MIT License](https://img.shields.io/badge/许可证-MIT-3B82F6?style=for-the-badge)](LICENSE)

<br />

[📚 文档](./docs/) · [🛠️ 技能](./skills/) · [📦 模板](./templates/) · [⚡ 快速开始](#-快速开始)

<br />

[English](./README.md) | 简体中文

</div>

---

## 🤔 为什么选择 Ship Faster？

| 没有 Ship Faster | 使用 Ship Faster |
|------------------|------------------|
| 😩 Agent 执行到一半丢失上下文 | ✅ 每次运行写入磁盘 — **随时恢复** |
| 🔥 没有审计记录 | ✅ 完整日志 + 证据，支持 **回放/审查** |
| 💣 部署、数据库写入、支付有风险 | ✅ 危险操作前有 **审批门控** |
| 🎲 临时 prompt，输出不一致 | ✅ **可组合技能**，结构可预测 |

---

## 🎯 适合谁用？

- 🤖 **AI 编程代理**（Claude Code、Cursor、OpenCode 等）— 技能是主要接口
- 👨‍💻 **开发者** — 复制粘贴 prompt，审查产物，批准门控
- 👥 **团队** — 需要可复现、可审计的 AI 辅助开发流程

> 💡 这不是 CLI，不是 SaaS。只是一套 **复制到 agent 技能目录** 的文件。

---

## 🔗 兼容工具

<p align="center">
<img src="https://img.shields.io/badge/Claude_Code-000000?style=flat-square&logo=anthropic&logoColor=white" alt="Claude Code" />
<img src="https://img.shields.io/badge/Cursor-000000?style=flat-square&logo=cursor&logoColor=white" alt="Cursor" />
<img src="https://img.shields.io/badge/OpenCode-412991?style=flat-square&logo=openai&logoColor=white" alt="OpenCode" />
<img src="https://img.shields.io/badge/任意_MCP_Agent-6366F1?style=flat-square" alt="MCP" />
</p>

**默认技术栈：**

<p align="center">
<img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
<img src="https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white" alt="Stripe" />
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## ⚡ 快速开始

### 方式 A：只安装技能（10 秒）

```bash
# macOS / Linux
mkdir -p ~/.claude/skills
curl -L https://github.com/Heyvhuang/ship-faster/archive/refs/heads/main.tar.gz \
  | tar -xz --strip-components=2 -C ~/.claude/skills ship-faster-main/skills/
```

<details>
<summary>🪟 Windows (PowerShell)</summary>

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\.claude\skills" | Out-Null
$zip = "$env:TEMP\ship-faster-main.zip"
Invoke-WebRequest -Uri "https://github.com/Heyvhuang/ship-faster/archive/refs/heads/main.zip" -OutFile $zip
Expand-Archive -Path $zip -DestinationPath "$env:TEMP\ship-faster" -Force
Copy-Item -Recurse -Force "$env:TEMP\ship-faster\ship-faster-main\skills\*" "$HOME\.claude\skills\"
```

</details>

### 方式 B：克隆完整仓库（30 秒）

```bash
git clone https://github.com/Heyvhuang/ship-faster.git
cd ship-faster
cp -r skills/* ~/.claude/skills/
# 或运行模板: cd templates/001-copyback-studio && pnpm install && pnpm dev
```

---

## 🚀 选择你的路径

| 场景 | Prompt |
|------|--------|
| 💡 **我有一个想法** | `Use workflow-project-intake` |
| 📦 **我有一个仓库** | `Use workflow-ship-faster` |
| 🎯 **我要做一个功能** | `Use workflow-feature-shipper` |
| 🎨 **我需要 UI/UX 方向** | `Use tool-design-style-selector` |

---

## 🔄 工作原理

<p align="center">
<img src="skills/assets/ship-faster-flow.png" alt="Ship Faster 工作流" width="700" />
</p>

每次运行都写入磁盘，支持 **回放/审计/恢复**：

```
runs/ship-faster/active/<run_id>/
├── proposal.md      # 为什么/做什么/范围
├── tasks.md         # 检查清单 [ ] → [x]（从这里恢复！）
├── context.json     # 开关（deploy/db/billing/seo）
├── evidence/        # 大型输出 / 审计记录
└── logs/            # 调试事件
```

> 📖 了解更多：[运行与审批](docs/concepts/runs-and-approvals.md)

---

## 🛠️ 技能（16+）

可组合的工作流，复制到 `~/.claude/skills/`。

### 🔄 工作流
- ⚡ [workflow-ship-faster](skills/workflow-ship-faster/) — 端到端：想法 → 基础 → 设计 → 部署
- 📥 [workflow-project-intake](skills/workflow-project-intake/) — 头脑风暴 → 澄清 → 路由
- 🚀 [workflow-feature-shipper](skills/workflow-feature-shipper/) — PR 级别功能迭代
- 🧠 [workflow-brainstorm](skills/workflow-brainstorm/) — 一次一个问题 → 设计规格

### 🔧 工具
- 🎨 [tool-design-style-selector](skills/tool-design-style-selector/) — 生成 design-system.md
- 🖌️ [tool-ui-ux-pro-max](skills/tool-ui-ux-pro-max/) — 配色 / 字体 / UX 查询
- 🔍 [tool-ast-grep-rules](skills/tool-ast-grep-rules/) — AST 代码搜索重写
- 📝 [tool-x-article-publisher](skills/tool-x-article-publisher/) — 发布到 X Articles

### 🔎 审查
- ✅ [review-quality](skills/review-quality/) — 合并就绪 + 可维护性审计
- ⚛️ [review-react-best-practices](skills/review-react-best-practices/) — React/Next.js 性能规则

### 🔌 服务
- 🗄️ [supabase](skills/supabase/) — 数据库操作（禁止裸 DELETE！）
- 💳 [stripe](skills/stripe/) — 计费操作，带确认门控
- ☁️ [cloudflare](skills/cloudflare/) — Workers / KV / R2 / D1


### 🧬 元技能
- 🔄 [skill-evolution](skills/skill-evolution/) — 捕获上下文 → 生成补丁
- ✨ [skill-creator](skills/skill-creator/) — 从零创建新技能
- 🔧 [skill-improver](skills/skill-improver/) — 分析运行 → 改进技能

> 📋 完整目录：[`skills/manifest.json`](skills/manifest.json)

---

## 📦 模板（7）

可运行的示例项目 — 演示 + 回归测试参考。

| | 模板 | 技术栈 | 描述 |
|:-:|:-----|:-------|:-----|
| 🎨 | [CopyBack Studio](templates/001-copyback-studio/) | Next.js + Supabase + R2 | AI 图像工作流 |
| 📊 | [UnitEconomics Console](templates/002-uniteconomics-console/) | Next.js | 商业指标仪表板 |
| 💰 | [MarginLedger](templates/003-marginledger/) | Vite + React | 利润率追踪器 |
| 📋 | [Kanban Load Mirror](templates/004-kanban-load-mirror/) | Vite + React | 任务负载均衡 |
| 📈 | [Multi-Store Daily Brief](templates/005-multi-store-daily-brief/) | Vite + React | 零售分析 |
| ❓ | [Ticket to FAQ](templates/006-ticket-to-faq/) | Vite + React | 工单 → FAQ 生成器 |
| 🏠 | [Elevate Move-in Booking](templates/007-elevate-move-in-booking/) | Vite + React | 预约调度 |

> 💡 仓库根目录 **不可运行**。请选择一个模板或对你自己的项目运行技能。

---

## 🔒 安全

- 永远不要提交密钥或 `.env.local` 文件
- 构建产物（`.next/`、`*.tsbuildinfo`）已被 gitignore
- 写操作（数据库、部署、支付）需要显式批准

---

## 🌟 Star 历史

<p align="center">
<a href="https://star-history.com/#Heyvhuang/ship-faster&Date">
  <img src="https://api.star-history.com/svg?repos=Heyvhuang/ship-faster&type=Date" alt="Star History Chart" width="600" />
</a>
</p>

> ⭐ **Star 这个仓库**，及时获取新技能和模板更新！

---

## 📜 许可证

MIT 许可证 — 查看 [LICENSE](LICENSE)

---

<div align="center">

**由 [VoxYZ](https://voxyz.space) 用 ❤️ 打造**

*小步快跑，持续交付。*

<br />

[![Twitter](https://img.shields.io/badge/关注-@VoxYZ-1DA1F2?style=flat-square&logo=twitter&logoColor=white)](https://twitter.com/voxyz)
[![GitHub](https://img.shields.io/badge/GitHub-Heyvhuang-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Heyvhuang)

</div>