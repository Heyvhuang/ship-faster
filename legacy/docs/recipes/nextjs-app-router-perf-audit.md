# Next.js (App Router) Performance Audit (Manual Recipe)

This is a lightweight, **manual** performance audit recipe for Next.js App Router projects.

Goal: capture a small evidence bundle (build output + route size + lighthouse + key findings) and then apply fixes in the highest-ROI order.

If you want “best practices” guidance, use:
- `review-react-best-practices` (waterfalls → bundle → server → client → rerender)

## When to use

- Pages feel slow / “stuck” on initial load
- LCP is high (slow first paint) or layout shifts
- Too many requests / waterfalls
- Bundle size increased noticeably
- Next.js App Router page renders slowly on server

## What you will produce (evidence bundle)

Minimum evidence to collect:

1. Build output log (`next build`) saved to a file
2. A Lighthouse report for **one target route**
3. A short findings note: top 3 causes + next fixes

Optional evidence:

- A screenshot of the Network waterfall for the target route
- A list of large dependencies / dynamic imports

## Where to store artifacts (Ship Faster-friendly)

If you’re running inside a Ship Faster run directory, store evidence here:

```
run_dir/
  evidence/
    perf/
      nextjs-app-router/
        00-scope.md
        01-build.log
        02-lighthouse.md
        03-findings.md
```

If you don’t have a `run_dir`, use `/tmp/` (macOS/Linux) or a local `perf/` folder.

## Step 0 — Define scope (do this first)

Write down (in a note or `00-scope.md`):

- Target route: `/` / `/dashboard` / `/pricing` (pick **one**)
- Scenario: logged-out vs logged-in (pick one)
- Device: “Desktop” (default) or “Mobile”
- Environment: local production build (recommended)

This prevents endless “perf work” without measurable outcomes.

## Step 1 — Capture a baseline (before changing code)

### 1.1 Build log (production)

From the project root:

```bash
rm -rf .next
NEXT_TELEMETRY_DISABLED=1 npm run build 2>&1 | tee /tmp/next-build.log
```

If you use pnpm/yarn:

```bash
NEXT_TELEMETRY_DISABLED=1 pnpm build 2>&1 | tee /tmp/next-build.log
```

Save the build log to your evidence bundle (e.g. `01-build.log`).

### 1.2 Run the production server

```bash
npm run start
```

Open the target route in the browser (example):

```
http://localhost:3000/dashboard
```

### 1.3 Lighthouse snapshot (one route)

In Chrome DevTools:

- `Lighthouse` tab
- Mode: “Navigation”
- Device: Desktop (start here)
- Run on the target route

Save the report (HTML or JSON) or at minimum record:

- Performance score
- LCP / TBT / CLS

## Step 2 — Fix in the highest-ROI order

### Order (don’t skip)

1. **Waterfalls** (CRITICAL): sequential async work
2. **Bundle size** (CRITICAL): large first-load JS / heavy deps
3. **Server-side perf** (HIGH): caching/dedup, serialization boundaries
4. **Client data fetching** (MEDIUM-HIGH): dedupe requests, avoid refetch thrash
5. **Re-renders** (MEDIUM): wasted renders, unstable deps
6. **Micro-opts** (LOW-MED): only after the above

### 2.1 Waterfall audit (App Router + Server Components)

Common signals:

- Multiple `await` calls in sequence in:
  - `app/**/page.tsx`
  - `app/**/layout.tsx`
  - Server Actions (`"use server"`)
  - Route handlers (`app/api/**/route.ts`)

Quick scan:

```bash
rg -n \"await \" app
rg -n \"Promise\\.all\\(\" app
```

Fix patterns:

- Start promises early, await late (`Promise.all`)
- Defer await until needed (move into branches)
- Use Suspense boundaries to stream slow subtrees

If you want the canonical patterns + examples, use:
- `review-react-best-practices` (async* rules first)

### 2.2 Bundle audit (initial JS payload)

Common signals:

- Lighthouse shows high JS parse/execute time
- `next build` output shows large route bundles
- Heavy components loaded even when hidden (charts/editors/maps)

Fix patterns:

- Avoid barrel imports for big libs (icons/components)
- Use `next/dynamic` for heavy components not needed on first paint
- Defer non-critical third-party SDKs (analytics/widgets)
- Preload based on intent (hover/focus/intersection), not always-on

### 2.3 Server-side performance (RSC boundaries + serialization)

Common signals:

- Server components do repeated identical lookups (auth/user/config)
- Client components receive huge objects (serialization overhead)

Fix patterns:

- Use `React.cache` to dedupe per-request work
- Only pass the minimal serializable data to Client Components
- Avoid pushing large data blobs across the boundary

### 2.4 Client fetching (dedupe + stability)

Common signals:

- Multiple components `useEffect(fetch…)` for the same endpoint
- Refetching on mount/focus creates flicker and wasted traffic

Fix patterns:

- Use SWR / React Query for request dedupe + caching
- Centralize fetching into a `useX()` hook so callers share cache

### 2.5 Re-render audit (client components)

Common signals:

- UI jank when typing/scrolling
- Components that “always re-render” due to unstable objects/functions

Fix patterns:

- Narrow effect dependencies
- Memoize expensive subtrees (extract + `memo`)
- Use lazy state initialization for expensive defaults

## Step 3 — Re-measure and record the delta

After each meaningful change:

1) rebuild (`npm run build`, capture log)  
2) rerun Lighthouse on the same route + scenario  
3) update `03-findings.md` with “before → after” numbers

If numbers don’t move, don’t keep optimizing — reassess the top cause.

## “Don’t do this” list (common traps)

- Don’t start with micro-optimizations before removing waterfalls / fixing bundle bloat
- Don’t add caching without clear TTL/invalidation assumptions
- Don’t blanket-apply `useMemo`/`useCallback` everywhere (can add complexity without wins)
- Don’t ship “perf refactors” without measuring baseline + delta
