# Template 004: Kanban Load Mirror

> Turn board exports into a one-page workload mirror and meeting agenda. Detect bottlenecks and aging work in minutes.

**Ship Faster** template series · [voxyz.space](https://voxyz.space) · [Vault Home](../../)

---

## Features

- **Board Import Flow** - Paste JSON or upload board exports to start
- **WIP Configuration** - Define in-progress statuses and aging thresholds
- **Workload Mirror Dashboard** - WIP counts, blockers, and aging at a glance
- **Bottleneck Detection** - See overloaded assignees instantly
- **Auto Agenda Draft** - Generate top discussion points (falls back gracefully in demo mode)

## Tech Stack

- **Framework**: Vite + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS (via CDN)
- **Charts**: Recharts + D3

## Quickstart

**Prerequisites:** Node.js 18+, pnpm

1. Enter template directory:
   ```bash
   cd templates/004-kanban-load-mirror
   ```

2. Install:
   ```bash
   pnpm install
   ```

3. Start dev server:
   ```bash
   pnpm dev
   ```

4. Open `http://localhost:5173`

## Environment Variables

No required environment variables for the demo.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |

## Project Structure

```
004-kanban-load-mirror/
├── App.tsx               # App state + view routing
├── types.ts              # TypeScript interfaces
├── components/
│   ├── Landing.tsx       # Hero + CTA
│   ├── ImportFlow.tsx    # Upload + config steps
│   ├── Processing.tsx    # Progress stepper
│   ├── Dashboard.tsx     # Workload mirror + agenda
│   ├── Billing.tsx       # Upgrade modal
│   └── ParticleField.tsx # Visual workload field
├── services/
│   └── geminiService.ts  # Agenda generation (demo-safe fallback)
└── design-system.md      # Design tokens & guidelines
```

## Design System

See [design-system.md](./design-system.md) for UI tokens and guidelines.

---

**License:** MIT · **Part of:** [Ship Faster](../../) by [voxyz](https://voxyz.space)
