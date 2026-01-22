# ⚡ Quick Start

> Ship Faster is a toolbox of **composable skills** for coding agents. Resumable runs + approval gates for side effects.

---

## 📥 1) Install Skills

### macOS / Linux (10 seconds)

```bash
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

### skills.sh (npx)

```bash
# List available skills
npx --yes skills add Heyvhuang/ship-faster --list

# Install all skills (Claude Code)
npx --yes skills add Heyvhuang/ship-faster --yes --agent claude-code

# Install a single skill
npx --yes skills add Heyvhuang/ship-faster --yes --agent claude-code --skill workflow-ship-faster
```

---

## 🚀 2) Run (Copy/Paste Prompts)

| Scenario | Prompt |
|----------|--------|
| 💡 **I have an idea** | `Use workflow-project-intake` |
| 📦 **I have a repo** | `Use workflow-ship-faster` |
| 🎯 **I want one feature** | `Use workflow-feature-shipper` |

---

## 📂 3) Find Outputs

| Location | Description |
|----------|-------------|
| `runs/ship-faster/active/<run_id>/` | Active runs |
| `runs/ship-faster/archive/...` | Archived runs |
| `tasks.md` | Resume entry (checkboxes) |
| `proposal.md` + `context.json` | Context/spec |

> 📖 Learn more: [Runs & Approvals](concepts/runs-and-approvals.md)

---

## 🔧 Troubleshooting

**Agent cannot find skill?** Check: `ls ~/.claude/skills/workflow-ship-faster/`

**No `runs/` folder?** Runs appear after executing a workflow.

---

<div align="center">

[← Docs](README.md) · [Runs & Approvals →](concepts/runs-and-approvals.md)

</div>
