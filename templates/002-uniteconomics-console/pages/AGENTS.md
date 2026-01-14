# PAGES SCOPE

## OVERVIEW
Screen components; `App.tsx` chooses which page renders.

## STRUCTURE
- `Landing.tsx`: marketing intro, “Start Analysis”.
- `Setup.tsx`: target margin input + file picker (demo attachment).
- `Progress.tsx`: timed stepper; calls `onComplete()`.
- `Results.tsx`: KPIs, Recharts chart, ledger table, policy modal, paywall overlay.
- `Billing.tsx`: simulated purchase; flips `isPaid` via `onSuccess()`.

## WHERE TO LOOK
| Task | File | Notes |
|------|------|-------|
| Add a new screen | `App.tsx` + new `pages/*.tsx` | Add `View` enum case + handler wiring |
| Change onboarding copy | `pages/Landing.tsx` | Uses `Button/Card/Badge` from UI kit |
| Change “CSV upload” behavior | `pages/Setup.tsx` | Currently only toggles `fileAttached` |
| Change processing steps | `pages/Progress.tsx` | `steps` array + timing logic |
| Update ledger/table/paywall | `pages/Results.tsx` | Gate: `appState.isPaid` |
| Update pricing/upsell | `pages/Billing.tsx` | Demo-only (no Stripe SDK) |

## CONVENTIONS (LOCAL)
- Pages are `React.FC<Props>` exports, imported by name from `./pages/*`.
- UI primitives come from `../components/ui`; icons from `lucide-react`.
- Data is read from `MOCK_DATA` (not parsed from uploaded CSV yet).

## ANTI-PATTERNS
- Don’t introduce stateful navigation inside pages; keep page transitions in `App.tsx`.
- Don’t bypass the `isPaid` gate without intentionally removing the paywall UX.
