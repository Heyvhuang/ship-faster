# workflow-creator

Create workflow-* skills by composing existing skills into end-to-end chains.

## When to Use

- You have multiple independent `tool-*` / `review-*` skills and want to chain them into an end-to-end flow
- You want to codify repetitive multi-step operations into a reusable workflow
- You need a plan-then-confirm approval process for dangerous operations
- You're building a new workflow for your team and want Ship Faster conventions

## Quick Example

```
Use workflow-creator.

Idea: A workflow that audits a website for SEO issues, 
      generates fix recommendations, and creates a PR with the changes.

Steps I imagine:
1. review-seo-audit → find issues
2. tool-programmatic-seo → generate fixes  
3. Create PR with changes
```

The skill will:
1. Call `workflow-brainstorm` to refine your idea into a spec
2. Scan local skills + query skills.sh for available building blocks
3. Generate `workflow-<slug>/SKILL.md` + `references/workflow-spec.md`

## Dependencies

| Skill              | Required | Purpose                    |
|--------------------|----------|----------------------------|
| workflow-brainstorm | Yes      | Refine idea into spec      |
| skill-creator       | Optional | Validate generated skill   |

## Output Structure

```
workflow-<slug>/
├── SKILL.md                      # Main skill file
└── references/
    └── workflow-spec.md          # SSOT for the workflow
```

## Related Skills

| Skill          | Purpose                              |
|----------------|--------------------------------------|
| skill-creator  | Create a single atomic skill         |
| skill-improver | Improve existing skills from run logs |
| skill-evolution| Auto-capture context for improvement |

## Install

```bash
# Install workflow-creator + its dependency
npx skills add Heyvhuang/ship-faster --skill workflow-creator --skill workflow-brainstorm --agent claude-code

# Or install the full Ship Faster pack (32 skills)
npx skills add Heyvhuang/ship-faster --agent claude-code
```
