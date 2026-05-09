# Pixel Office Kit

> AI agent pixel office component — watch agents work, walk, and collaborate in a retro pixel-art office.

**Ship Faster** component · [voxyz.space](https://voxyz.space) · [Repo Home](../)

<p align="center">
  <img src="public/stage-office-demo.gif" alt="Pixel Office Kit demo — agents working, walking, and chatting in a pixel-art office" width="720" />
</p>

<p align="center"><sub>Free version: 4 agents · auto behavior · day/night cycle — <a href="https://www.voxyz.space/vault"><b>Pro version</b></a> adds 6 agents, moods, conversations, matrix effects & full OpenClaw data integration</sub></p>

---

## Features

- Canvas-rendered pixel-art office with day/night cycle
- 4 configurable AI agents with autonomous behavior
- Agents walk, work, grab coffee, lounge, chat, and celebrate
- BFS pathfinding on a tile grid
- Responsive scaling with mobile scroll support
- Manual control panel to direct individual agents
- Auto-simulation mode with randomized agent commands
- Reduced-motion support

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Rendering**: HTML5 Canvas + DOM overlay
- **Styling**: Tailwind CSS + custom CSS animations

## Quickstart

```bash
cd pixel-office-kit
pnpm install
pnpm dev
# Open http://localhost:3000
```

## Customization

### Add/change agents

Edit `lib/agents.ts` to configure agent names, colors, avatars, and work styles.

### Embed the component

```tsx
import { OfficeRoom } from '@/components/OfficeRoom/OfficeRoom';

<OfficeRoom
  agents={myAgents}
  isActive={true}
  activityLevel={10}
  agentCommands={commands}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `agents` | `AgentDef[]` | required | Agent definitions (id, name, color, avatar, workStyle) |
| `isActive` | `boolean` | `true` | Toggle animation on/off |
| `activityLevel` | `number` | `10` | Controls tempo of agent actions |
| `agentCommands` | `AgentCommand[]` | `[]` | External commands to direct agents |
| `workMsgs` | `Record<string, string[]>` | defaults | Work state messages per agent |
| `personalityBanter` | `Record<string, string[]>` | defaults | Chat messages per agent |

## Want the full version?

This free kit gives you a working pixel office with 4 agents and basic behaviors. The **[Pro version](https://www.voxyz.space/vault)** is the same engine that powers the live [VoxYZ Stage](https://voxyz.space) — connected to a real multi-agent system via **OpenClaw Gateway**, where every agent action, conversation, and mood change is driven by live ops data.

**[Ship Faster Vault Pro](https://www.voxyz.space/vault)** includes:

| Feature | Free | Pro |
|---------|:----:|:---:|
| Pixel office agents | 4 | 6 |
| Autonomous walk + sit | Basic random | Personality-driven (6 work styles) |
| Day/night cycle | Yes | Yes |
| Affect/mood system | -- | 6 moods x behavior weights |
| Day-arc energy curves | -- | Behavior shifts throughout the day |
| Agent conversations + bubble lines | -- | Real dialogue with sentiment |
| Collaboration connection lines | -- | Live collab edge rendering |
| Mission status badges | -- | Task icons above agents |
| Matrix rain spawn effect | -- | Deep-focus mode |
| Whiteboard stats overlay | -- | Live ops data on the wall |
| Data connector | Mock only | Full OpenClaw integration ready |

> **Get the Pro version** — drop-in ready with the full affect system, conversation engine, and matrix effects. Wire it up to your own agent pipeline or use the built-in demo simulation.
>
> **[Browse the Vault](https://www.voxyz.space/vault)**

---

**License:** MIT · **Part of:** [Ship Faster](../) by [VoxYZ](https://voxyz.space)
