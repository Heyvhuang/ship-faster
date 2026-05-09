# 🔄 Runs + Approval Gates

> Ship Faster is designed around two constraints: **context is expensive** and **side effects are risky**.

---

## 🎯 Core Principles

| Constraint | Solution |
|------------|----------|
| 😩 Context is expensive (chat history limited) | ✅ Resumable runs on disk |
| 💣 Side effects are risky (deploys, payments) | ✅ Explicit approval gates |

Workflows are built to be **resumable**, **auditable**, and require confirmation before anything irreversible.

---

## 📂 Resumable Runs (Artifact-First)

When you run `workflow-ship-faster`, it creates a run folder:

```
runs/ship-faster/
  active/<run_id>/
    proposal.md, tasks.md, context.json, evidence/, logs/
  archive/YYYY-MM-DD-<run_id>/
```

For OpenSpec repos (`openspec/project.md` exists):

```
openspec/changes/<change-id>/
  proposal.md, tasks.md, design.md, evidence/, logs/
```

### 📋 Key Files

| File | Purpose |
|------|---------|
| `proposal.md` | What/why/scope document (stable context) |
| `tasks.md` | Executable checklist + approvals |
| `context.json` | Machine-readable switches |
| `evidence/` | Audits & big outputs |
| `logs/` | Optional debug logs |

> 🎯 **Design goal**: Resume by reading **2-5 small files**, not scrolling a giant chat.

### 🔁 Resume Loop

1. Open `tasks.md` (resume here)
2. Execute next unchecked items
3. Use `proposal.md` for context if needed
4. Dig into `evidence/` only when debugging

---

## 🔒 Approval Gates

Ship Faster treats certain actions as **side-effecting** and requires explicit approval:

| Action | Examples |
|--------|----------|
| 🚀 Deployments | Vercel, Cloudflare |
| 💳 Payments | Stripe billing setup |
| 🗄️ Database | Schema changes, migrations |
| 💣 Destructive | Deletes, resets, overwrites |

### Typical Pattern

1. Write approval plan into `tasks.md`
2. Reference long details in `evidence/`
3. Ask for confirmation
4. Only then execute

---

## 📦 Auto-Archive

Runs are archived **automatically** when:
- `tasks.md` has a verification section
- All checkbox items are checked

---

## 🛠️ For Skill Authors

| Guideline | Why |
|-----------|-----|
| Keep `SKILL.md` short | Routing + constraints + output contract |
| Put details in `references/` | Progressive disclosure |
| Prefer scripts | Reproducibility |
| Write big outputs to `evidence/` | Keep chat concise |

---

<div align="center">

[← Quick Start](../quickstart.md) · [Back to Docs](../README.md)

</div>

