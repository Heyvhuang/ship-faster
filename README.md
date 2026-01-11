<div align="center">
  
# 🚀 Ship Faster

**Runnable templates, copy-ready packs, and agent skills for shipping small products.**
**Skills can self-iterate via 99-evolution hooks (patch suggestions only, no auto-edits).**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

<br />

[🌐 VoxYZ](https://voxyz.space) · [🎯 Demo](https://copyback.vercel.app/) · [📦 Templates](./templates/) · [🧩 Copy Packs](./packs/) · [🤖 Agent Skills](./skills/) · [🇨🇳 中文](./README.zh-CN.md)

<br />

<img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status" />

</div>

---

## ⚡ 10-Second Start (Skills-first)

```bash
# 1) Copy the skills into Claude Code
cp -r skills/* ~/.claude/skills/
```

2) Run the workflow skill `00-workflow-ship-faster` in Claude Code/OpenCode

3) Find outputs in `.claude/runs/ship-faster/<run_id>/` (artifacts + logs)

> Side-effecting actions (deploy, payments, etc.) are gated behind explicit approvals.

---

## ✨ What is Ship Faster?

**Ship Faster** is the asset repository behind [VoxYZ](https://voxyz.space):

> In one sentence: a copyable Agent Skills toolbox that breaks idea → prototype → launch into composable skills, persists runs to files for state + audit, and enforces explicit approval gates for any external side effects.
> Current mainline: Ship Faster — Next.js + Supabase + Stripe + GitHub/Vercel + AI SEO.

| Type | Description |
|:-----|:------------|
| 📦 **Runnable Templates** | Complete, production-ready full-stack projects |
| 🧩 **Copy Packs** | Modular code bundles you can copy into your own project |
| 🤖 **Agent Skills** | AI agent workflows for shipping faster (copy to `.claude/skills/`, or use as checklists) |

> 💡 The repo root is intentionally **not runnable**. Pick a template in `templates/` to run, or pick a pack in `packs/` to copy.

---

## ⚡ Quick Start (30 seconds)

```bash
# 1. Clone the repo
git clone https://github.com/Heyvhuang/ship-faster.git
cd ship-faster

# 2. Pick a template and run
cd templates/001-copyback-studio
pnpm install && pnpm dev
```

**Or copy a pack into your existing project:**

```bash
# Copy the SaaS starter pack files into your project
cp -r packs/2026-01-10-create-saas-starter-pack/copy-pack/* ./your-project/
```

**Or copy agent skills into your Claude setup:**

```bash
# Copy skills into your Claude Code directory
cp -r skills/* ~/.claude/skills/
```

---

## 📂 Repository Structure

```
ship-faster/
├── 📁 templates/                 # Runnable full projects
│   ├── README.md
│   └── 001-copyback-studio/      # CopyBack Studio app
├── 📁 packs/                     # Copy-ready modular bundles
│   ├── README.md
│   └── 2026-01-10-create-saas-starter-pack/
├── 📁 skills/                    # AI agent skills (copy to .claude/skills/)
│   ├── README.md
│   ├── 00-workflow-ship-faster/  # Main pipeline
│   ├── 01-nextjs-foundation/     # Next.js setup
│   └── ...                       # More skills
├── 📄 LICENSE
├── 📄 README.md
└── 📄 README.zh-CN.md
```

---

## 📦 Templates

Full-stack, production-ready projects you can clone and run immediately.

| # | Template | Description | Stack | Link |
|:-:|:---------|:------------|:------|:-----|
| 001 | **CopyBack Studio** | Full-stack creative app | Next.js + Supabase | [→ Open](templates/001-copyback-studio/) |

---

## 🧩 Copy Packs

Modular code bundles with everything you need — just copy and paste.

| Date | Pack | What's Inside | Link |
|:-----|:-----|:--------------|:-----|
| 2026-01-10 | **SaaS Starter Pack** | Supabase + Stripe + Credits + R2 | [→ Open](packs/2026-01-10-create-saas-starter-pack/) |

---

## 🤖 Agent Skills

AI-powered workflows for shipping faster. Copy to your project's `.claude/skills/` directory, or use them as step-by-step runbooks.

| Skill | Description | Link |
|:------|:------------|:-----|
| **00-entry-router** | Orchestrator: routes to workflows, manages runs | [→ Open](skills/00-entry-router/) |
| **00-workflow-ship-faster** | Main pipeline: idea → deploy | [→ Open](skills/00-workflow-ship-faster/) |
| **01-nextjs-foundation** | Create/upgrade Next.js projects | [→ Open](skills/01-nextjs-foundation/) |
| **02-design-style-selector** | Select and deploy design system | [→ Open](skills/02-design-style-selector/) |
| **03-nextjs-guardrails** | Lint/format/typecheck baseline | [→ Open](skills/03-nextjs-guardrails/) |
| **06-nextjs-supabase** | Supabase integration | [→ Open](skills/06-nextjs-supabase/) |
| **07-nextjs-stripe** | Stripe integration | [→ Open](skills/07-nextjs-stripe/) |
| **08-github-vercel-deploy** | GitHub + Vercel deployment | [→ Open](skills/08-github-vercel-deploy/) |
| **09-ai-seo-nextjs** | AI-era SEO (sitemap/robots/llms.txt) | [→ Open](skills/09-ai-seo-nextjs/) |

> See [skills/README.md](./skills/) for the full list (20 skills) and usage guide.

---

## 📝 Naming Convention

| Type | Pattern | Example |
|:-----|:--------|:--------|
| Templates | `templates/<NNN>-<slug>/` | `001-copyback-studio` |
| Packs | `packs/<YYYY-MM-DD>-<slug>/` | `2026-01-10-create-saas-starter-pack` |
| Skills | `skills/<NN>-<slug>/` | `01-nextjs-foundation` |

- **NNN**: Recommended order (001, 002, ...)
- **YYYY-MM-DD**: Creation date for timeline ordering
- **NN**: Execution order for skills (00-09 = main pipeline stages)

---

## ➕ Adding New Templates / Packs

<details>
<summary><strong>📦 Add a Template</strong></summary>

1. Create `templates/<NNN>-<slug>/`
2. Include:
   - `README.md` — Entry documentation
   - `.env.local.example` — Environment template

</details>

<details>
<summary><strong>🧩 Add a Pack</strong></summary>

1. Create `packs/<YYYY-MM-DD>-<slug>/`
2. Include:
   - `COPY_PACK.md` — Usage guide
   - `copy-pack/` — Copy-ready files
   - `copy-pack/.env.example` — Environment template (no secrets!)

</details>

---

## 🔒 Security

- ✅ Never commit secrets or local env files (`.env.local`)
- ✅ Build outputs are gitignored (`.next/`, `*.tsbuildinfo`)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Made with ❤️ by [VoxYZ](https://voxyz.space)**

<sub>Ship small. Ship fast. Ship often.</sub>

</div>
