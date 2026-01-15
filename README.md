<div align="center">
  
<img src="skills/assets/Head.png" alt="Ship Faster" width="720" />

<br />

**End-to-end development workflows for coding agents.**
**Idea → launchable web app, with resumable runs, artifact-first execution, and approval gates.**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

<br />

[Demo 001](https://copyback.vercel.app/) · [Demo 002](https://uniteconomics-console.vercel.app/) · [Docs](./docs/) · [Skills](./skills/) · [Templates](./templates/) · [中文](./README.zh-CN.md)

</div>

---

## What is Ship Faster?

**Ship Faster** is a copyable toolbox of workflows ("skills") for AI coding agents.

| Without Ship Faster | With Ship Faster |
|:--------------------|:-----------------|
| Agent loses context mid-task | Every run writes artifacts to disk — resumable anytime |
| No audit trail | Full logs + evidence for replay/review |
| Risky side effects (deploy, DB writes, payments) | Explicit approval gates before external actions |
| Ad-hoc prompts, inconsistent outputs | Composable skills with predictable structure |

**Default stack**: Next.js 16.1.1 + optional Supabase/Stripe + GitHub/Vercel + AI-era SEO.

---

## Who is this for?

- **AI coding agents** (Claude Code, Cursor, OpenCode, etc.) — skills are the primary interface
- **Developers** who operate those agents — copy/paste prompts, review artifacts, approve gates
- **Teams** who want reproducible, auditable AI-assisted development

> This is NOT a CLI, NOT a SaaS. It's a set of files you copy into your agent's skill directory.

---

## Quick Start

### Option A: Install skills only (10 seconds)

If you just want the workflows — no need to clone the repo:

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

### Option B: Clone for templates + skills (30 seconds)

If you want runnable example projects too:

```bash
git clone https://github.com/Heyvhuang/ship-faster.git
cd ship-faster

# Copy skills to your agent
cp -r skills/* ~/.claude/skills/

# Or run a template directly
cd templates/001-copyback-studio
pnpm install && pnpm dev
```

---

## Pick Your Path

Once skills are installed, paste one of these into your agent:

### 1) I have an idea (start from scratch)

```text
Use workflow-project-intake.

Idea: <what are we building?>
Users: <who is it for?>
Must-have: <3-5 bullets>
Constraints: <deadline / tech / design / infra>
Need: deploy? database? billing? seo?
```

### 2) I have a repo (ship it to launch)

```text
Use workflow-ship-faster.

Repo path: <absolute path or '.'>
Constraints: <deadline / tech / non-goals>
Need: deploy? database? billing? seo?
```

### 3) I want to ship one feature (PR-sized)

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

---

## How It Works

![Ship Faster workflow](skills/assets/ship-faster-flow.png)

Every run writes to disk for replay/audit:

```
.claude/runs/ship-faster/<run_id>/
├── 00-index.md          # Resume entry point
├── plan.md              # Execution plan
├── evidence/            # Verification artifacts
└── logs/                # Execution logs
```

- **Current run pointer**: `.claude/runs/ship-faster/ACTIVE`
- **Side effects** (deploy, payments, DB writes) require explicit approval before execution

> Learn more: [Runs & Approvals](docs/concepts/runs-and-approvals.md)

---

## Skills

Composable workflows that ship end-to-end. Copy to `~/.claude/skills/` or use as step-by-step runbooks.

| Category | Skills |
|:---------|:-------|
| **Workflows** | [workflow-project-intake](skills/workflow-project-intake/) · [workflow-ship-faster](skills/workflow-ship-faster/) · [workflow-feature-shipper](skills/workflow-feature-shipper/) |
| **Tools** | [tool-design-style-selector](skills/tool-design-style-selector/) · [tool-ast-grep-rules](skills/tool-ast-grep-rules/) |
| **Reviews** | [review-react-best-practices](skills/review-react-best-practices/) · [review-merge-readiness](skills/review-merge-readiness/) · [review-clean-code](skills/review-clean-code/) · [review-doc-consistency](skills/review-doc-consistency/) |
| **Services** | [supabase](skills/supabase/) · [stripe](skills/stripe/) · [cloudflare](skills/cloudflare/) |
| **Meta** | [skill-evolution](skills/skill-evolution/) · [skill-creator](skills/skill-creator/) |

> Full catalog: [`skills/manifest.json`](skills/manifest.json)

![Skills map](skills/assets/skills-map.png)

---

## Templates

Runnable example projects — demos + regression references.

| # | Template | Stack | Link |
|:-:|:---------|:------|:-----|
| 001 | **CopyBack Studio** | Next.js + Supabase | [→ Open](templates/001-copyback-studio/) |
| 002 | **UnitEconomics Console** | Next.js + Gemini | [→ Open](templates/002-uniteconomics-console/) |

> The repo root is intentionally **not runnable**. Pick a template or run skills against your own project.

---

<details>
<summary><strong>Repository Structure</strong></summary>

```
ship-faster/
├── docs/                         # Documentation
├── templates/                    # Runnable full projects
│   ├── 001-copyback-studio/
│   └── 002-uniteconomics-console/
├── skills/                       # Agent skill packages
│   ├── workflow-ship-faster/
│   ├── workflow-project-intake/
│   ├── review-*/
│   ├── tool-*/
│   ├── supabase/
│   ├── stripe/
│   ├── cloudflare/
│   └── assets/                   # Diagrams and static assets
├── snippets/                     # Internal reference code
│   └── product-starter/
├── LICENSE
├── README.md
└── README.zh-CN.md
```

</details>

<details>
<summary><strong>Naming Convention</strong></summary>

| Type | Pattern | Example |
|:-----|:--------|:--------|
| Templates | `templates/<NNN>-<slug>/` | `001-copyback-studio` |
| Snippets | `snippets/<slug>/` | `product-starter` |
| Skills | `skills/<prefix>-<slug>/` | `workflow-ship-faster` |

Prefixes: `workflow-`, `tool-`, `review-`, `skill-`, `publish-`
Service skills (supabase, stripe, cloudflare) use the service name directly.

</details>

<details>
<summary><strong>Update / Uninstall</strong></summary>

**Update** (overwrite existing skills):

Note: this only overwrites skill folders with the same name; other folders in `~/.claude/skills/` are untouched.

```bash
curl -L https://github.com/Heyvhuang/ship-faster/archive/refs/heads/main.tar.gz \
  | tar -xz --strip-components=2 -C ~/.claude/skills ship-faster-main/skills/
```

**Install single skill**:

```bash
git clone https://github.com/Heyvhuang/ship-faster.git
cp -r ship-faster/skills/workflow-ship-faster ~/.claude/skills/
```

**Uninstall**: Delete skill folders from `~/.claude/skills/` (see `skills/manifest.json` for names).

</details>

<details>
<summary><strong>Adding Templates / Snippets</strong></summary>

**New Template**:
1. Create `templates/<NNN>-<slug>/`
2. Include `README.md` and `.env.local.example`

**New Snippet**:
1. Create `snippets/<slug>/`
2. Include `README.md` explaining what skills should copy

</details>

---

## Security

- Never commit secrets or `.env.local` files
- Build outputs (`.next/`, `*.tsbuildinfo`) are gitignored

---

## License

MIT License — see [LICENSE](LICENSE)

---

<div align="center">

**Made by [VoxYZ](https://voxyz.space)**

<sub>Ship small. Ship fast. Ship often.</sub>

</div>
