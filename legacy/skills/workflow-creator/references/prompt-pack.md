# Prompt Pack: skill-workflow-creator

Use these prompts verbatim to reduce drift and missed steps.

## Prompt 1: Convert a vague idea into `workflow_spec.md` (SSOT)

```
You are creating a new workflow-* skill. Your output must be a `workflow_spec.md` that will become the SSOT.

Rules:
- Ask exactly ONE question at a time (prefer multiple-choice).
- Do NOT start generating a workflow folder until the spec is confirmed.
- MUST run Skill Discovery (Prompt 1.5) before finalizing required_skills.

Goal:
- Produce a complete `workflow_spec.md` using `references/workflow-spec-template.md`.

Must capture:
- slug (kebab-case)
- 5-10 triggers (real user phrases)
- required_skills + optional_skills (after Skill Discovery)
- Goal & Non-goals
- Skill Chain (each step maps to exactly ONE skill)
- Verification & Stop Rules

Stop when:
- the user has not confirmed the spec.
```

## Prompt 1.5: Skill Discovery (MANDATORY before finalizing spec)

```
Goal: Before writing workflow_spec.md, discover ALL potentially useful skills (local + external).

This step is REQUIRED, not optional. Do not skip even if you think you know all relevant skills.

## Step A: Scan Local Skills

List all skills under skills_root that might be relevant:
- ls ~/.claude/skills/ | grep -E "(tool-|review-|workflow-)"
- For each potentially relevant skill, note: name, purpose, relevance to this workflow

## Step B: Search skills.sh (MANDATORY)

Fetch https://skills.sh/ and identify relevant skills:
1. Look at the leaderboard for high-install skills in relevant categories
2. Search for keywords related to the workflow goal
3. Note 3-5 external skills that could be useful

Prefer reputable sources:
- vercel-labs/agent-skills (React, Next.js, Web design)
- anthropics/skills (general purpose)
- expo/skills (React Native)
- supabase/agent-skills (database)
- stripe/ai (payments)

## Step C: Present Findings to User

Format:
```md
## Skill Discovery Results

### Local Skills (already available)
| Skill | Relevance | Could serve step |
|-------|-----------|------------------|
| tool-xxx | HIGH | Step 2: ... |
| review-yyy | MEDIUM | Step 4: ... |

### External Skills (from skills.sh)
| Skill | Installs | Source | Relevance | Could serve step |
|-------|----------|--------|-----------|------------------|
| vercel-react-best-practices | 37K | vercel-labs/agent-skills | HIGH | Step 3: perf review |
| audit-website | 2K | squirrelscan/skills | MEDIUM | Step 2: full audit |

**Want to inspect any external skills before deciding?**
Enter skill numbers (e.g., "1, 3") or "none" to continue with local only.
```

## Step D: If User Wants to Inspect

For each requested skill:
1. Fetch the skill page from skills.sh (e.g., https://skills.sh/owner/repo/skill-name)
2. Show the SKILL.md content
3. After showing all requested, ask: "Add any of these to required_skills? (list numbers or 'none')"

## Step E: Confirm Final Selection

Present final skill selection:
```md
## Final Skill Selection

**Required skills:**
- [local] tool-design-style-selector
- [local] review-quality
- [NEW] vercel-react-best-practices (install: npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices)

**Optional skills:**
- [local] tool-systematic-debugging

Confirm this selection? (y/n/adjust)
```

Only proceed to write workflow_spec.md after user confirms.
```

## Prompt 2: Validate the spec (deterministic)

```
Run:
python3 ~/.claude/skills/skill-workflow-creator/scripts/validate_workflow_spec.py "<workflow_spec_path>"

If validation fails:
- Do not continue.
- Fix the spec until it passes.
```

## Prompt 3: Local dependency check (required)

```
Given `workflow_spec.md`, list required_skills and optional_skills.

Check whether each required skill exists locally under the skills_root.

If any required skill is missing:
- Stop and run the skills.sh lookup prompt.
```

## Prompt 4: skills.sh lookup (only when a required skill is missing)

```
Goal: suggest 2-3 repos from https://skills.sh/ that likely contain the missing capability.

Inputs:
- missing_skills: <list>
- what capability is needed: <1 sentence>

Do:
1) Open https://skills.sh/ (leaderboard) and identify relevant skills.
2) Prefer reputable sources first (examples):
   - vercel-labs/agent-skills
   - anthropics/skills
   - expo/skills
3) For each suggestion, provide:
   - link to the skill page on skills.sh (if available)
   - repo to install
   - install command (do NOT run it):
     npx skills add <owner/repo>
   - why it matches the missing capability

Stop and ask the user to install before continuing.
```

## Prompt 5: Generate the workflow skill (compose, don't copy)

```
You are generating `workflow-<slug>/SKILL.md` from `workflow_spec.md`.

Hard rules:
- Workflows orchestrate skills; do not paste long best-practice content from other skills.
- For each step: reference the relevant skill and specify input/output artifacts (paths only).
- Execution model: plan-then-confirm.
- Missing required skill: stop (do not approximate).

SKILL.md must include:
- YAML frontmatter: name=workflow-<slug>, description that embeds triggers.
- Link to SSOT: references/workflow-spec.md
- Run_dir backend rules (runs vs OpenSpec) and required artifacts (proposal/tasks/context).
- Process:
  - Initialize run
  - Plan (write tasks.md checklist + verification)
  - Ask user to confirm
  - On confirm: write approval record to tasks.md -> ## Approvals
  - Execute by calling the step skills in order
  - Verify and persist evidence
```

## Prompt 6: Validate generated workflow skill (deterministic)

```
Run:
python3 ~/.claude/skills/skill-workflow-creator/scripts/validate_skill_md.py "<workflow_dir>"

If it fails:
- Fix frontmatter/name/line endings until it passes.
```
