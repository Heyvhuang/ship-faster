---
title: Store Event Handlers in Refs for Stable Subscriptions
impact: LOW
impactDescription: avoids unnecessary add/remove listener churn
tags: advanced, events, refs, performance
---

## Store Event Handlers in Refs for Stable Subscriptions

For global subscriptions where the handler changes often, store the handler in a ref and keep the subscription stable.

**Detect:**
- `useEffect` re-subscribing on every render because handler identity changes.

**Example:**

```tsx
function useWindowScroll(onScroll: () => void) {
  const onScrollRef = useRef(onScroll)
  onScrollRef.current = onScroll

  useEffect(() => {
    const handler = () => onScrollRef.current()
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])
}
```

