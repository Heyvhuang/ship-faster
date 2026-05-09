---
title: Deduplicate Client Fetching (SWR / React Query)
impact: MEDIUM-HIGH
impactDescription: reduces redundant requests and UI thrash
tags: client, data-fetching, dedupe, swr, react-query
---

## Deduplicate Client Fetching (SWR / React Query)

If multiple components fetch the same resource, use a library that deduplicates and caches.

**Detect:**
- Multiple `useEffect(fetch…)` blocks hitting the same endpoint.
- Repeated requests on focus/mount causing flicker.

**Incorrect:**

```tsx
useEffect(() => {
  fetch("/api/me").then(/* ... */)
}, [])
```

**Correct (example with SWR):**

```tsx
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useMe() {
  return useSWR("/api/me", fetcher)
}
```

