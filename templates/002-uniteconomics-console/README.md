# Template 002: UnitEconomics Console

> Financial precision tool for AI SaaS teams to calculate per-customer gross margins and generate cap/overage policies.

**Ship Faster** template series · [voxyz.space](https://voxyz.space) · [Vault Home](../../)

---

## Features

- **Margin Analysis Dashboard** - Detailed breakdown of revenue, costs, and margins per customer
- **AI-Powered Policy Generation** - Generate cap and overage policies using Gemini AI
- **Multi-plan Support** - Analyze Starter, Pro, and Enterprise tiers
- **Interactive Charts** - Visualize unit economics with Recharts

## Tech Stack

- **Framework**: Next.js 16.1.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS (via globals.css)
- **Charts**: Recharts
- **AI**: Google Gemini
- **Database**: Supabase (planned)
- **Payments**: Stripe (planned)

## Quickstart

**Prerequisites:** Node.js 18+, pnpm

1. Enter template directory:
   ```bash
   cd templates/002-uniteconomics-console
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

5. Open `http://localhost:3000`

## Environment Variables

No required environment variables for the demo.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |

## Design System

See [design-system.md](./design-system.md) for UI tokens and guidelines.

## Deployment

1. Create a Vercel project pointing at this repo
2. Add all environment variables from `.env.local`
3. Deploy and promote to production

---

**License:** MIT · **Part of:** [Ship Faster](../../) by [voxyz](https://voxyz.space)
