# Template 005: Multi-Store Daily Brief

> Aggregate multi-store performance into a single morning brief with headline, anomalies, and action items.

**Ship Faster** template series · [voxyz.space](https://voxyz.space) · [Vault Home](../../)

---

## Features

- **Store Aggregation** - Combine metrics across multiple stores
- **Morning Brief Summary** - Headline, executive summary, and action item
- **Anomaly Detection** - Flag unusual drops or spikes automatically
- **Store Performance List** - Compare stores side by side
- **Delivery CTA** - Lightweight “email subscription” style hook

## Tech Stack

- **Framework**: Vite + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS (via CDN)

## Quickstart

**Prerequisites:** Node.js 18+, pnpm

1. Enter template directory:
   ```bash
   cd templates/005-multi-store-daily-brief
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
005-multi-store-daily-brief/
├── App.tsx                 # App state + routing
├── types.ts                # TypeScript interfaces
├── components/
│   ├── Landing.tsx         # Hero + CTA
│   ├── HeroStats.tsx       # KPI hero strip
│   ├── DailyBrief.tsx      # Brief output panel
│   └── StoreList.tsx       # Store performance list
├── services/
│   ├── geminiService.ts    # Brief generation (demo-safe fallback)
│   └── mockDataService.ts  # Demo data + aggregation
└── design-system.md        # Design tokens & guidelines
```

## Design System

See [design-system.md](./design-system.md) for UI tokens and guidelines.

---

**License:** MIT · **Part of:** [Ship Faster](../../) by [voxyz](https://voxyz.space)
