# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-11

## DESIGN SYSTEM
This project uses a shared design system. See [design-system.md](./design-system.md).

## OVERVIEW
Single-page React + TypeScript app (Vite) for unit-economics analysis and policy drafting (demo-safe, no required secrets).

## STRUCTURE
```
./
├── index.tsx            # React root mount
├── App.tsx              # enum-based view router + shared AppState
├── pages/               # screen components (Landing/Setup/Progress/Results/Billing)
├── components/ui.tsx    # small UI kit (Button/Card/Badge/Input)
├── services/geminiService.ts # Gemini policy generation
├── constants.ts         # demo data + defaults
├── types.ts             # shared types
├── index.html           # Tailwind CDN
├── tsconfig.json        # TS config; @/* path points to repo root
└── vite.config.ts       # dev server config + optional API key injection
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Change screen flow | `App.tsx` | Switches on internal `View` enum; no router lib |
| Update UI styling primitives | `components/ui.tsx` | Tailwind class strings; “stone” palette |
| Policy generation prompt/model | `services/geminiService.ts` | Uses `@google/genai` |
| Demo data / target margin | `constants.ts` | UI currently relies heavily on `MOCK_DATA` |
| Results table + paywall | `pages/Results.tsx` | Gate is `appState.isPaid` |
| “Payment” flow (demo) | `pages/Billing.tsx` | Simulated timeout; no Stripe SDK |

## CODE MAP
| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `App` | component | `App.tsx` | View router + state owner |
| `Landing` | component | `pages/Landing.tsx` | Intro + CTA |
| `Setup` | component | `pages/Setup.tsx` | Margin input + CSV mock upload |
| `Progress` | component | `pages/Progress.tsx` | Fake stepper before results |
| `Results` | component | `pages/Results.tsx` | KPIs + chart + ledger + policy modal |
| `Billing` | component | `pages/Billing.tsx` | Unlock flow (demo) |
| `generatePolicy` | function | `services/geminiService.ts` | Calls Gemini to draft policy/email |

## CONVENTIONS (PROJECT-SPECIFIC)
- No routing library: navigation is `View` enum in `App.tsx`.
- Styling is Tailwind via CDN configured in `index.html` (custom `stone` colors + fonts).
- Path alias exists: `@/*` maps to repo root (`tsconfig.json`, `vite.config.ts`).
- Optional AI key wiring: `vite.config.ts` defines `process.env.API_KEY` from `API_KEY`.

## ANTI-PATTERNS (THIS PROJECT)
- Do not commit real API keys; keep secrets in `.env.local` (and similar `*.local`).
- Do not reference new `process.env.*` keys without adding them to `vite.config.ts#define`.
- Avoid adding a router library unless you replace the `View` switch cleanly.

## COMMANDS
```bash
npm install
npm run dev
npm run build
npm run preview
```

## NOTES
- `index.html` references `/index.css`; verify it exists if you introduce non-Tailwind styles.
- The app is largely “demo mode”: `MOCK_DATA` is used directly in `pages/Results.tsx` and policy generation.
