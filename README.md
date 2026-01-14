<div align="center">
  
<img src="skills/assets/Head.png" alt="Ship Faster" width="720" />

<br />

**A complete development workflow for coding agents — built from composable skills.**
**Turn an idea or small repo into a launchable web app with resumable, artifact-first runs and approval gates for external side effects.**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

<br />

[VoxYZ](https://voxyz.space) · [Demo 001](https://copyback.vercel.app/) · [Demo 002](https://uniteconomics-console.vercel.app/) · [Docs](./docs/) · [Templates](./templates/) · [Skills](./skills/) · [Manifest](./skills/manifest.json) · [中文](./README.zh-CN.md)

</div>

---

## ⚡ 10-Second Start (Skills-first)

```bash
# 1) Quick install (macOS/Linux, no repo clone)
mkdir -p ~/.claude/skills
curl -L https://github.com/Heyvhuang/ship-faster/archive/refs/heads/main.tar.gz \
  | tar -xz --strip-components=2 -C ~/.claude/skills ship-faster-main/skills/

# or if you already cloned this repo
cp -r skills/* ~/.claude/skills/
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\\.claude\\skills" | Out-Null
$zip = "$env:TEMP\\ship-faster-main.zip"
Invoke-WebRequest -Uri "https://github.com/Heyvhuang/ship-faster/archive/refs/heads/main.zip" -OutFile $zip
Expand-Archive -Path $zip -DestinationPath "$env:TEMP\\ship-faster" -Force
Copy-Item -Recurse -Force "$env:TEMP\\ship-faster\\ship-faster-main\\skills\\*" "$HOME\\.claude\\skills\\"
```

> Note: this copies skill folders into `~/.claude/skills/`. If you already have skills there, it will overwrite folders with the same name.

## 🧭 Pick Your Path (Copy/Paste)

### 1) I have an idea (start from scratch)

Paste this into your agent (Claude Code / OpenCode / etc.):

```text
Use workflow-project-intake.

Idea: <what are we building?>
Users: <who is it for?>
Must-have: <3-5 bullets>
Constraints: <deadline / tech / design / infra>
Need: deploy? database? billing? seo?
```

### 2) I have a repo (ship this code)

```text
Use workflow-ship-faster.

Repo path: <absolute path or '.'>
Constraints: <deadline / tech / non-goals>
Need: deploy? database? billing? seo?
```

### 3) I want to ship one feature (fast, PR-sized)

```text
Use workflow-feature-shipper.

Repo path: <absolute path or '.'>
Feature: <one sentence>
Acceptance criteria:
- <bullet>
- <bullet>
Non-goals:
- <bullet>
```

## 📁 Where outputs go

Ship Faster writes every run to disk for replay/audit:

- Outputs: `.claude/runs/ship-faster/<run_id>/` (artifacts + logs)
- Current run pointer: `.claude/runs/ship-faster/ACTIVE`
- Resume entry: `.claude/runs/ship-faster/<run_id>/00-index.md`

![Run artifacts](skills/assets/run-artifacts.png)

> Side-effecting actions (deploy, payments, etc.) are gated behind explicit approvals.

Docs:
- Quick start: [`docs/quickstart.md`](docs/quickstart.md)
- Concepts (runs + approvals): [`docs/concepts/runs-and-approvals.md`](docs/concepts/runs-and-approvals.md)
- Recipe (Next.js App Router perf audit): [`docs/recipes/nextjs-app-router-perf-audit.md`](docs/recipes/nextjs-app-router-perf-audit.md)

<details>
<summary><strong>🔄 Update / Uninstall</strong></summary>

Update (overwrite same skill names):

```bash
curl -L https://github.com/Heyvhuang/ship-faster/archive/refs/heads/main.tar.gz \
  | tar -xz --strip-components=2 -C ~/.claude/skills ship-faster-main/skills/
```

Install a single skill (safer if you already have many skills installed):

```bash
git clone https://github.com/Heyvhuang/ship-faster.git
cd ship-faster
cp -r skills/workflow-ship-faster ~/.claude/skills/
```

Uninstall: delete the skill folders you installed (see `skills/manifest.json` for names).

</details>

Skills are the mainline: run `workflow-ship-faster` to ship end-to-end. Templates are runnable examples; internal snippets help agents move faster when implementing integrations.

---

## ✨ What is Ship Faster?

**Ship Faster** is the asset repository behind [VoxYZ](https://voxyz.space):

> A copyable toolbox of workflows (“skills”) for coding agents. Every run is written to disk for replay/audit; external side effects (deployments, billing, DB writes) require explicit approval.
> Default path: Next.js 16.1.1 + optional Supabase/Stripe + GitHub/Vercel + AI-era SEO.

| Type | Description |
|:-----|:------------|
| 🤖 **Agent Skills (mainline)** | Reusable workflows that ship end-to-end (idea → deploy) |
| 📦 **Runnable Templates** | Supporting assets: complete, production-ready full-stack projects |
| 🧱 **Reference Snippets** | Supporting assets: internal copyable code blocks used by skills (not user-facing) |

> 💡 The repo root is intentionally **not runnable**. Pick a template in `templates/` to run, or copy `skills/` into your agent setup and run the pipeline against a real project.

![Ship Faster workflow](skills/assets/ship-faster-flow.png)

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

---

## 📂 Repository Structure

```
ship-faster/
├── 📁 docs/                      # Project docs (start here)
├── 📁 templates/                 # Runnable full projects
│   ├── README.md
│   ├── 001-copyback-studio/      # CopyBack Studio app
│   └── 002-uniteconomics-console/ # UnitEconomics Console app
├── 📁 skills/                    # AI agent skill packages (copy to .claude/skills/)
│   ├── workflow-ship-faster/     # Main pipeline
│   ├── workflow-project-intake/  # Intake + routing
│   └── ...                       # More skills (workflow/tool/review/mcp/...)
├── 📁 snippets/                  # Internal reference code (for agents)
│   └── product-starter/
├── 📁 skills/assets/             # Diagrams and static assets
│   └── ship-faster-flow.svg
├── 📄 LICENSE
├── 📄 README.md
└── 📄 README.zh-CN.md
```

---

## 📦 Templates

Runnable example apps (demos + regression references) you can run locally.

| # | Template | Description | Stack | Link |
|:-:|:---------|:------------|:------|:-----|
| 001 | **CopyBack Studio** | Full-stack creative app | Next.js + Supabase | [→ Open](templates/001-copyback-studio/) |
| 002 | **UnitEconomics Console** | Unit economics analysis console | Next.js + Gemini | [→ Open](templates/002-uniteconomics-console/) |

![Template loop](skills/assets/template-loop.png)

---

## 🧱 Reference Snippets (Internal)

Internal copyable code blocks used by skills to move faster. These are not meant to be user-facing APIs; use `templates/` for runnable projects.

| Snippet Set | What's Inside | Link |
|:-----------|:--------------|:-----|
| `product-starter` | Supabase + Stripe + Credits + R2 | [→ Open](snippets/product-starter/) |

---

## 🤖 Agent Skills

AI-powered workflows for shipping faster. Copy to your project's `.claude/skills/` directory, or use them as step-by-step runbooks.

| Skill | Description | Link |
|:------|:------------|:-----|
| **workflow-project-intake** | Project intake + routing | [→ Open](skills/workflow-project-intake/) |
| **workflow-ship-faster** | Main pipeline: idea/prototype → launch | [→ Open](skills/workflow-ship-faster/) |
| **workflow-feature-shipper** | Build/ship one feature fast | [→ Open](skills/workflow-feature-shipper/) |
| **workflow-template-seeder** | Seed a new runnable template | [→ Open](skills/workflow-template-seeder/) |
| **workflow-template-extractor** | Extract a runnable template from a real project | [→ Open](skills/workflow-template-extractor/) |
| **tool-design-style-selector** | Pick + deploy `design-system.md` | [→ Open](skills/tool-design-style-selector/) |
| **tool-ast-grep-rules** | Write `ast-grep` rules for batch refactors | [→ Open](skills/tool-ast-grep-rules/) |
| **mcp-supabase** | Supabase DB ops (strict gates) | [→ Open](skills/mcp-supabase/) |
| **mcp-stripe** | Stripe ops (strict gates) | [→ Open](skills/mcp-stripe/) |
| **mcp-cloudflare** | Cloudflare ops (strict gates) | [→ Open](skills/mcp-cloudflare/) |
| **skill-evolution** | Hooks + retrospective (patch suggestions only) | [→ Open](skills/skill-evolution/) |

### Review Skills

Quality/performance audits that fit naturally between “implement” and “merge”.

| Skill | What it’s for | Link |
|:------|:--------------|:-----|
| **review-react-best-practices** | React/Next.js performance review (waterfalls/bundle/re-renders) | [→ Open](skills/review-react-best-practices/) |
| **review-merge-readiness** | “Can we merge?” verdict + issues by severity | [→ Open](skills/review-merge-readiness/) |
| **review-clean-code** | Maintainability audit (Clean Code dimensions) | [→ Open](skills/review-clean-code/) |
| **review-doc-consistency** | Docs vs code consistency audit | [→ Open](skills/review-doc-consistency/) |

![Skills map](skills/assets/skills-map.png)

> Full list is in `skills/manifest.json` (machine-readable).

---

## 📝 Naming Convention

| Type | Pattern | Example |
|:-----|:--------|:--------|
| Templates | `templates/<NNN>-<slug>/` | `001-copyback-studio` |
| Snippets | `snippets/<slug>/` | `snippets/product-starter` |
| Skills | `skills/<prefix>-<slug>/` | `workflow-ship-faster` |

- **NNN**: Recommended order (001, 002, ...)
- **prefix**: Semantic group (`workflow-`, `tool-`, `review-`, `mcp-`, `skill-`, `publish-`)

---

## ➕ Adding New Templates / Snippets

<details>
<summary><strong>📦 Add a Template</strong></summary>

1. Create `templates/<NNN>-<slug>/`
2. Include:
   - `README.md` — Entry documentation
   - `.env.local.example` — Environment template

</details>

<details>
<summary><strong>🧱 Add a Snippet Set</strong></summary>

1. Create `snippets/<slug>/`
2. Include:
   - `README.md` — What it is + what skills should copy
   - Copyable files (no secrets; keep paths stable)

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

**Made by [VoxYZ](https://voxyz.space)**

<sub>Ship small. Ship fast. Ship often.</sub>

</div>
