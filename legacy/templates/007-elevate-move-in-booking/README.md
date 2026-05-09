# Template 007: Elevate Move-in Booking

> Streamlined elevator booking for high-rise buildings with live availability, deposits, and staff-ready schedules.

**Ship Faster** template series · [voxyz.space](https://voxyz.space) · [Vault Home](../../)

---

## Features

- **Resident Booking Flow** - Step-by-step move-in scheduling with timeline slot picker
- **Manager Dashboard** - Review requests, approvals, and deposit tracking
- **Rule Extraction** - Turn building policy text into booking rules (demo-safe fallback)
- **Conflict Prevention** - Real-time slot availability to avoid double-booking
- **Status Tracking** - Pending, confirmed, and completed booking states

## Tech Stack

- **Framework**: Vite + React 19
- **Language**: TypeScript
- **Styling**: Custom CSS + UI components

## Quickstart

**Prerequisites:** Node.js 18+, pnpm

1. Enter template directory:
   ```bash
   cd templates/007-elevate-move-in-booking
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
007-elevate-move-in-booking/
├── App.tsx                    # App state + routing
├── views/
│   ├── Landing.tsx            # Marketing + CTA
│   ├── Resident.tsx           # Resident booking flow
│   └── Manager.tsx            # Manager dashboard
├── components/
│   ├── TimelineSlotPicker.tsx # Slot picker UI
│   └── ui.tsx                 # Shared UI components
├── services/
│   └── ai.ts                  # Rule extraction (demo-safe fallback)
├── index.css                  # App-wide custom CSS
└── design-system.md           # Design tokens & guidelines
```

## Design System

See [design-system.md](./design-system.md) for UI tokens and guidelines.

---

**License:** MIT · **Part of:** [Ship Faster](../../) by [voxyz](https://voxyz.space)
