# Skill Design Principles (Progressive Disclosure)

Keep `SKILL.md` short and treat the rest of the skill folder as a small “knowledge + tooling package”:

- `SKILL.md`: routing + safety + I/O contract + output format
- `references/`: deep docs loaded only when needed
- `scripts/`: deterministic automation (prefer this for repetitive or fragile work)
- `assets/`: templates/files to copy (not meant to be loaded into context)

## Core ideas

### Concise is key

The context window is shared by everything: system prompt, conversation history, project files, and the actual task.
Only include information that is:

1) non-obvious to an LLM, and  
2) repeatedly useful for real execution.

### Choose the right “degree of freedom”

- **High freedom** (guidance): when trade-offs are contextual
- **Medium freedom** (pseudocode/templates): when you want a preferred pattern with light variation
- **Low freedom** (scripts / strict templates): when consistency is critical or errors are costly

### Organize for selective loading

If a skill covers multiple domains/variants, separate them so the agent only loads what it needs:

- By domain: `references/finance.md`, `references/product.md`, …
- By variant: `references/aws.md`, `references/gcp.md`, …

Avoid deep nesting; link reference files directly from `SKILL.md`.

