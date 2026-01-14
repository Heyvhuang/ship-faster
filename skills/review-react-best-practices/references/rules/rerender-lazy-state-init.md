---
title: Use Lazy State Initialization for Expensive Defaults
impact: MEDIUM
impactDescription: avoids recomputing defaults on every render
tags: rerender, useState, performance
---

## Use Lazy State Initialization for Expensive Defaults

If your default state is expensive to compute, pass a function to `useState` so it runs once.

**Detect:**
- `useState(expensiveFn())` or large parsing in initial state.

**Incorrect:**

```tsx
const [value] = useState(expensiveParse(raw))
```

**Correct:**

```tsx
const [value] = useState(() => expensiveParse(raw))
```

