# Ship Faster

**Open Agent Packs for builders** by Voxyz AI

Ship Faster is a public library of agent packs, small tools, and approved outputs generated from Voxyz. It is built for people who want useful AI-agent workflows without starting from a blank prompt.

```text
demand signal
  -> agent pack
  -> visible output
  -> hosted execution in Voxyz when you need it
```

## Start Here

| Need | Go |
|------|----|
| Use a serious builder pack | [Packs](./packs/) |
| See curated examples and briefs | [Examples](./examples/) |
| Inspect Radar-generated HTML sources | [Generated Sites](./generated-sites/) |
| Turn a brief into a simple page | [Brief to HTML Page](./tools/brief-to-html-page/) |
| Understand the pack shape | [What is an Agent Pack?](./docs/what-is-an-agent-pack.md) |
| Run with Codex | [Codex guide](./docs/run-with-codex.md) |
| Run with Claude Code | [Claude Code guide](./docs/run-with-claude-code.md) |

## First Packs

| Pack | Lane | Outcome | Link |
|------|------|---------|------|
| Timeline Forager | creator | Turn a messy timeline or niche into a ranked list of article angles, evidence, and launch hooks. | [Open](./packs/creator/timeline-forager/) |
| Codebase Cartographer | developer | Map the product surface, key files, commands, risks, and first safe change in one pass. | [Open](./packs/developer/codebase-cartographer/) |
| Search Presence Operator | growth | Turn product truth into directories, comparison pages, answer pages, and measurement hooks. | [Open](./packs/growth/search-presence-operator/) |

## Voxyz Links

- Cloud: https://www.voxyz.ai/cloud?utm_source=github&utm_medium=ship_faster&utm_campaign=ship_faster_reboot
- Studio: https://www.voxyz.ai/studio?utm_source=github&utm_medium=ship_faster&utm_campaign=ship_faster_reboot
- Marketplace: https://www.voxyz.ai/marketplace?utm_source=github&utm_medium=ship_faster&utm_campaign=ship_faster_reboot
- Radar: https://www.voxyz.ai/radar?utm_source=github&utm_medium=ship_faster&utm_campaign=ship_faster_reboot

## Repository Shape

```text
packs/      open agent packs
examples/   shipped outputs and approved source briefs
generated-sites/ Radar/tool-generated static HTML sources; not starter templates
tools/      small public utilities
docs/       usage notes
legacy/     old skills/templates kept for history
```

The old root `skills/`, `templates/`, and `pixel-office-kit/` paths are archived under `legacy/`. New reusable work should start from `packs/`, `examples/`, and `tools/`; generated proof pages live under `generated-sites/`.
