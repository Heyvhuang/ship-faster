---
title: Deduplicate Global Event Listeners
impact: MEDIUM
impactDescription: avoids leaks and repeated handlers
tags: client, events, effect, performance
---

## Deduplicate Global Event Listeners

Only attach global listeners once (or via a shared hook). Multiple components attaching the same listener can cause duplicated work and leaks.

**Detect:**
- Many components `addEventListener("scroll", ...)` with independent cleanup.

**Incorrect:**

```tsx
useEffect(() => {
  window.addEventListener("scroll", onScroll)
  return () => window.removeEventListener("scroll", onScroll)
}, [])
```

**Correct (share a single subscription):**

```tsx
// Example approach: single provider manages the listener and exposes state
```

