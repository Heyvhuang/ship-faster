---
title: Narrow Effect Dependencies and Avoid Accidental Re-Subscriptions
impact: MEDIUM
impactDescription: reduces repeated work and event churn
tags: rerender, useEffect, dependencies, performance
---

## Narrow Effect Dependencies and Avoid Accidental Re-Subscriptions

Effects that depend on unstable objects/functions re-run too often. Keep dependencies minimal and stabilize callbacks where needed.

**Detect:**
- `useEffect(() => {...}, [props])` or `[options]` where `options` is recreated each render.

**Incorrect:**

```tsx
useEffect(() => {
  analytics.track("view", { filter })
}, [filterObj])
```

**Correct:**

```tsx
useEffect(() => {
  analytics.track("view", { filter })
}, [filter])
```

