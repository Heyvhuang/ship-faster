# COMPONENTS SCOPE

## OVERVIEW
Small in-repo UI kit used by pages (`pages/*`).

## STRUCTURE
- `Button`: primary CTA; supports icon + loading state.
- `Card`: bordered container with subtle shadow.
- `Badge`: small status chip (monospace).
- `Input`: labeled input wrapper (monospace input text).

## WHERE TO LOOK
- `components/ui.tsx`: `Button`, `Card`, `Badge`, `Input`.

## CONVENTIONS (LOCAL)
- Styling is Tailwind class strings (palette is “stone”; fonts configured in `index.html`).
- `Button`
  - `variant`: `primary | secondary | outline | ghost`
  - `size`: `sm | md | lg`
  - `icon`: optional `LucideIcon` rendered left of children
  - `isLoading`: swaps children for `Processing...` (animate-pulse)
- `Badge.variant`: `success | warning | danger | neutral`

## NOTES
- Components are intentionally “dumb” (no app state); page components own logic.
- Prefer adding new primitives here vs duplicating Tailwind bundles in pages.

## ANTI-PATTERNS
- Avoid component-specific global CSS; prefer utilities and `index.html` theme.
- Avoid ad-hoc per-page button styles; add/extend `Button` variants instead.
- Don’t add new variants without updating the TypeScript union types.
