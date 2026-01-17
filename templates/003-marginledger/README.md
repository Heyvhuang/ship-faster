# Template 003: MarginLedger

> Stop guessing which AI customers are killing your margins. Turn usage records into per-customer gross-margin analysis and actionable cap policies.

**Ship Faster** template series · [voxyz.space](https://voxyz.space) · [Vault Home](../../)

---

## Features

- **Customer Profit Heatmap** - Interactive treemap visualization showing customer profitability at a glance
- **Margin Analysis Dashboard** - Detailed breakdown of revenue, costs, and margins per customer
- **AI-Powered Cap Policy** - Generate stop-loss policies using Gemini AI
- **Multi-plan Support** - Analyze Starter, Pro, and Enterprise tiers

## Tech Stack

- **Framework**: Vite + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **AI**: Google Gemini

## Quickstart

**Prerequisites:** Node.js 18+, pnpm

1. Enter template directory:
   ```bash
   cd templates/003-marginledger
   ```

2. Install & configure:
   ```bash
   pnpm install
   cp .env.local.example .env.local
   ```

3. Fill in `.env.local` with required values (see below)

4. Start dev server:
   ```bash
   pnpm dev
   ```

5. Open `http://localhost:5173`

## Environment Variables

No required environment variables for the demo.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm typecheck` | Run TypeScript type checking |

## Project Structure

```
003-marginledger/
├── App.tsx              # Main application (views + logic)
├── types.ts             # TypeScript interfaces
├── components/
│   ├── Layout.tsx       # Page layout + navigation
│   ├── Button.tsx       # Button component
│   ├── Card.tsx         # Card component
│   └── ProfitHeatmap.tsx # Interactive profit visualization
├── services/
│   ├── mockData.ts      # Mock data generator
│   └── geminiService.ts # Gemini AI integration
└── design-system.md     # Design tokens & guidelines
```

## Design System

See [design-system.md](./design-system.md) for UI tokens and guidelines.

---

**License:** MIT · **Part of:** [Ship Faster](../../) by [voxyz](https://voxyz.space)
