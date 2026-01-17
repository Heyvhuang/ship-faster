# Template 006: Ticket to FAQ

> Turn resolved IT tickets into publishable knowledge base articles with redaction and structured steps.

**Ship Faster** template series · [voxyz.space](https://voxyz.space) · [Vault Home](../../)

---

## Features

- **Ticket-to-Article Pipeline** - Paste ticket logs and generate structured KB articles
- **Audience Controls** - Switch between client-friendly and internal tone
- **Redaction Support** - Sanitize sensitive info automatically
- **Streaming Preview** - Watch the article render as it generates
- **Publish Flow** - One-click publish confirmation state

## Tech Stack

- **Framework**: Vite + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS (via CDN)

## Quickstart

**Prerequisites:** Node.js 18+, pnpm

1. Enter template directory:
   ```bash
   cd templates/006-ticket-to-faq
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
006-ticket-to-faq/
├── App.tsx                      # App state + views
├── types.ts                     # TypeScript interfaces
├── components/
│   ├── InputPane.tsx            # Input + config controls
│   ├── ArticleView.tsx          # Final article view
│   └── StreamingArticleView.tsx # Streaming preview
├── services/
│   └── geminiService.ts         # Article generation (demo-safe fallback)
└── design-system.md             # Design tokens & guidelines
```

## Design System

See [design-system.md](./design-system.md) for UI tokens and guidelines.

---

**License:** MIT · **Part of:** [Ship Faster](../../) by [voxyz](https://voxyz.space)
