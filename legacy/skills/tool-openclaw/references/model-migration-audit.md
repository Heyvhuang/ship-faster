# OpenClaw Model Migration Audit

Use this reference when the user wants help migrating an OpenClaw setup from one provider/model family to another.

This file now carries two prompt shapes:

- a short prompt for articles, posts, and quick operator handoff
- a full canonical prompt for standalone migration audits

The skill should still carry most of the workflow.

## Before using these prompts

Best practice:
- install or download the local `tool-openclaw` skill first
- let the model read the skill before starting the migration audit

Why:
- the skill carries the local OpenClaw docs snapshot
- the skill already knows where to look for auth, CLI backend, provider, and workspace details
- the prompt works better when the model loads OpenClaw knowledge first instead of guessing

## What this is for

Use this when the user needs to:
- move away from Anthropic subscription-heavy usage
- switch default models
- assess agent-by-agent migration risk
- keep creative lanes from collapsing into generic execution behavior

Do not treat migration as only a model-id rewrite.

Treat it as:
- environment discovery
- auth discovery
- agent boundary discovery
- lane-by-lane risk assessment
- wave-based migration planning

## Audit rules

Always:
- inspect first
- use local OpenClaw docs before memory
- separate public personas from backing runtimes and service accounts
- separate `AGENTS.md`, `RULES.md`, and `SOUL.md`
- distinguish execution-heavy lanes from creativity-heavy lanes

Never:
- assume one OS
- assume one config path
- assume all agents should use one shared prompt
- recommend one giant personality prompt

## Short operator prompt

If the user wants a compact prompt they can paste into another AI, use this:

```md
First load and read the local `tool-openclaw` skill so you have the bundled OpenClaw docs snapshot and migration workflow.

Then use that skill knowledge to audit my OpenClaw model migration.

Target model path: [fill this in yourself]

Please:
- discover the environment and config paths
- inventory current model/auth setup
- list all meaningful agents and runtime lanes
- classify each lane by role and migration risk
- recommend a migration order
- draft short per-agent changes for `AGENTS.md`, `RULES.md`, and `SOUL.md`

Audit first and report first. Do not edit anything yet.
```

## Full canonical audit prompt

If the user wants the full standalone migration-audit prompt, use this:

```md
First load and read the local `tool-openclaw` skill so you have the bundled OpenClaw docs snapshot and migration workflow.

Then perform a model migration audit for an OpenClaw system.

Your job is to inspect the environment, identify current model bindings and agent roles, assess migration risk, and produce a practical migration report for a migration toward a new backbone model family.

Treat this as an audit-first task, not a blind auto-edit task.

Operator context:
- Repo path: [fill if known]
- OpenClaw config path: [fill if known]
- Workspace root: [fill if known]
- Host type: [local / remote / unknown]
- OS: [macOS / Ubuntu / Linux / unknown]
- Target model path: [fill this in yourself, for example: openai-codex/gpt-5.4 or openai/gpt-5.4]
- Current migration reason: [fill if known]
- Special creative lanes that may need extra care: [fill if known]
- If anything above is unknown, discover it.

Important rules:
- Do not assume the machine is a VPS, laptop, macOS, or Ubuntu box. Detect the environment first.
- Do not assume the OpenClaw config path. Discover it if possible.
- Do not assume all agents are equal. Some may be public personas, some may be backing runtimes, and some may be service accounts.
- Do not assume all agents should share the same prompt or the same action threshold.
- Do not start by editing files. Audit first. Report first.
- If local offline docs for OpenClaw exist, use them before relying on memory.
- If a claim is uncertain, say what is known, what is inferred, and what still needs verification.
- Separate role boundary from tool policy from personality.
- Treat migration as a lane problem, not just a model string problem.
- If the system includes creative or brand-facing agents, do not flatten them into generic execution agents.

Your goals:
1. Discover the runtime environment.
2. Inventory the current OpenClaw model and auth setup.
3. Inventory every meaningful live agent or runtime lane.
4. Classify each one by role and risk.
5. Assess what will break or degrade if the system switches to the target model family.
6. Recommend the safest migration order.
7. Recommend prompt-layer changes for each agent:
   - AGENTS.md: role boundary and action policy
   - RULES.md: hard guardrails and escalation limits
   - SOUL.md: short voice and personality layer
8. Produce a report that an operator can act on immediately.

Audit method:

1. Environment discovery
- detect OS
- detect whether the runtime is local or remote
- detect whether the process is supervised
- detect likely OpenClaw state dir, config file, and workspace root
- identify whether the runtime looks like a single-user setup, a VPS gateway, or a mixed system

2. Model discovery
- list current default model paths
- detect provider family per agent
- detect auth mode where possible: API key, OAuth, setup-token, or CLI backend
- identify whether any lanes currently depend on subscription-heavy auth
- identify whether the target migration path is subscription login or API key

3. Agent discovery
- list all meaningful agents and backing runtimes
- separate canonical agents from helpers, archives, and service accounts
- identify role boundary per agent
- identify whether each agent is:
  - execution-heavy
  - support-heavy
  - research-heavy
  - routing-heavy
  - creativity-heavy

4. Risk classification
For each agent or runtime lane, classify likely migration risk:
- tool-use regression risk
- behavior regression risk
- tone or creativity regression risk
- memory or coordination regression risk
- auth or billing risk

5. Migration assessment
For each agent or lane, identify:
- what is most likely to break
- what is most likely to become worse but still function
- whether the lane is safe for early migration
- whether the lane should keep a separate creative finisher model
- whether the lane needs short prompt changes, structural workflow changes, or both

6. Recommendation
- assign a migration wave to each agent: wave 1, wave 2, or hold
- recommend prompt and tool-policy changes per agent
- recommend whether any lane should remain dual-model temporarily
- recommend the smallest safe next steps, not the biggest rewrite

When assessing agents on a new backbone model, use these principles:
- execution lanes usually tolerate stricter and more literal models better
- support lanes benefit from concise packet structure and calm tone
- research lanes should be optimized for evidence compression, not theatrical prose
- creative lanes should not be judged only on factual correctness; voice quality matters
- routing lanes should not become generic assistants; they need clear refusal and escalation boundaries
- if a lane previously relied on a more proactive model family, recommend explicit action-threshold instructions
- do not solve a structure problem with one giant personality prompt

If OpenClaw docs are available locally, use them first for:
- CLI commands
- auth modes
- config keys
- CLI backend behavior
- provider support
- prompt/bootstrap file behavior

Output format:

# Migration Audit Report

## 1. Environment snapshot
Include:
- host type
- OS
- likely OpenClaw paths
- supervision model
- confidence notes

## 2. Model and auth inventory
Produce a table with:
- runtime or agent
- current model
- current provider family
- probable auth mode
- confidence

## 3. Agent boundary inventory
Produce a table with:
- runtime or agent
- public persona, backing runtime, or service account
- primary job
- what it should refuse
- risk class

## 4. Migration risk
For each agent:
- what is most likely to break
- what is most likely to become worse but still function
- whether the lane is safe for early migration

## 5. Recommended migration order
Group into:
- wave 1: safest early movers
- wave 2: medium-risk lanes
- hold or dual-model: lanes that need extra care

## 6. Prompt-layer adjustments
For each agent:
- AGENTS.md changes
- RULES.md changes
- SOUL.md changes

Keep these short, concrete, and role-specific.

## 7. Draft prompt packs
For each agent, draft:
- AGENTS.md pack: 4 to 8 lines
- RULES.md pack: 4 to 8 lines
- SOUL.md pack: 4 to 8 lines

Rules for prompt packs:
- keep each pack short
- do not duplicate the same sentence across all three files
- do not write personality into RULES.md
- do not write hard guardrails into SOUL.md
- do not make all agents sound the same
- if a lane is creativity-heavy, preserve voice quality instead of flattening it into generic helpfulness

## 8. Operator action list
Provide the next 3 to 7 actions, in order.
Each action must be concrete and low-ambiguity.

## 9. Open questions
List only the unresolved items that materially affect the migration.

Style rules for the report:
- be concrete
- prefer tables and short bullets over long essays
- lead with what is likely to break first
- separate known facts from inference
- do not use generic filler language
- do not recommend one giant shared prompt for every agent
- do not assume all lanes should move at the same speed
- do not start implementation unless explicitly asked

If you find conflicts between public-facing agent descriptions and runtime configuration, call that out explicitly as a migration risk.

If you detect that some lanes are clearly better suited to the target model family than others, say so directly and explain why.

If a lane looks likely to lose creative quality after migration, say that plainly and recommend whether to:
- accept the quality drop
- tighten SOUL.md and AGENTS.md
- preserve a separate creative finisher model
- postpone migration for that lane

Do not end with vague encouragement. End with the actual migration picture.
```

## Report shape

For migration reports, prefer this structure:

1. Environment snapshot
2. Model and auth inventory
3. Agent boundary inventory
4. Migration risk by lane
5. Recommended migration order
6. Prompt-layer adjustments
7. Next operator actions
8. Open questions

## Migration heuristics

- execution lanes usually migrate earlier
- support lanes are usually safer than brand or creative lanes
- research lanes should be judged on evidence quality, not flourish
- routing lanes need stronger refusal and escalation boundaries
- creative lanes may need a separate finisher model or a more careful `SOUL.md`

## Good output

Good migration advice is:
- lane-specific
- short
- concrete
- explicit about what is known vs inferred

Bad migration advice is:
- one giant prompt for everyone
- only changing the model string
- pretending tone loss is the same as tool-call loss
