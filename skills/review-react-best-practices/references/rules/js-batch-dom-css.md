---
title: Batch DOM Style Changes via Classes
impact: LOW-MEDIUM
impactDescription: reduces layout thrash
tags: js, dom, css, performance
---

## Batch DOM Style Changes via Classes

Avoid repeatedly mutating inline styles in loops. Prefer toggling classes or using a single style write.

**Detect:**
- Many `.style.* =` writes inside loops/scroll handlers.

**Incorrect:**

```ts
for (const el of nodes) {
  el.style.opacity = "0.5"
}
```

**Correct:**

```ts
for (const el of nodes) {
  el.classList.add("isDimmed")
}
```

