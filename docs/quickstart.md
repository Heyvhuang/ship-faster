# Quick Start

Ship Faster is a toolbox of **composable skills** for coding agents. The main workflow writes a resumable run directory under `.claude/runs/` and gates external side effects behind explicit approvals.

If you only want a runnable codebase, go to [`templates/`](../templates/) instead.

## 1) Install skills

macOS / Linux:

```bash
mkdir -p ~/.claude/skills
curl -L https://github.com/Heyvhuang/ship-faster/archive/refs/heads/main.tar.gz \
  | tar -xz --strip-components=2 -C ~/.claude/skills ship-faster-main/skills/
```

> This copies skill folders into `~/.claude/skills/`. If you already have skills there, folders with the same name will be overwritten.

Install a single skill (safer if you already have many skills installed):

```bash
git clone https://github.com/Heyvhuang/ship-faster.git
cd ship-faster
cp -r skills/workflow-ship-faster ~/.claude/skills/
```

Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\\.claude\\skills" | Out-Null
$zip = "$env:TEMP\\ship-faster-main.zip"
Invoke-WebRequest -Uri "https://github.com/Heyvhuang/ship-faster/archive/refs/heads/main.zip" -OutFile $zip
Expand-Archive -Path $zip -DestinationPath "$env:TEMP\\ship-faster" -Force
Copy-Item -Recurse -Force "$env:TEMP\\ship-faster\\ship-faster-main\\skills\\*" "$HOME\\.claude\\skills\\"
```

## 2) Run (copy/paste prompts)

### I have an idea (start from scratch)

```text
Use workflow-project-intake.

Idea: <what are we building?>
Users: <who is it for?>
Must-have: <3-5 bullets>
Constraints: <deadline / tech / design / infra>
Need: deploy? database? billing? seo?
```

### I have a repo (ship this code)

```text
Use workflow-ship-faster.

Repo path: <absolute path or '.'>
Constraints: <deadline / tech / non-goals>
Need: deploy? database? billing? seo?
```

### I want to ship one feature (fast, PR-sized)

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

## 3) Find outputs

Ship Faster writes every run to disk:

- Outputs: `.claude/runs/ship-faster/<run_id>/`
- Current run pointer: `.claude/runs/ship-faster/ACTIVE`
- Resume entry: `.claude/runs/ship-faster/<run_id>/00-index.md`
- Progress: open `00-index.md` → follow `Next action` → mark tasks in `03-plans/*.md` (`[ ]` → `[x]`)

See the deeper explanation in [`concepts/runs-and-approvals.md`](concepts/runs-and-approvals.md).

## Troubleshooting

### The agent can’t find a skill

- Confirm the folder exists: `ls ~/.claude/skills/workflow-ship-faster/`
- If you installed via tarball, confirm the extracted path is correct (the command uses `--strip-components=2` intentionally).

### I don’t see `.claude/runs/ship-faster/`

- You only get runs after you execute a workflow that writes them (for example `workflow-ship-faster`).
- If your target repo is elsewhere, runs are created **in that repo**, not in this `ship-faster` repo.
