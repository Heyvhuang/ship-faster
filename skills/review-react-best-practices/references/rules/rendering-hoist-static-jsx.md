---
title: Hoist Static JSX Out of Render
impact: LOW-MEDIUM
impactDescription: reduces render-time allocations
tags: rendering, jsx, performance
---

## Hoist Static JSX Out of Render

If JSX is static (doesn’t depend on props/state), define it outside the component to avoid recreating elements every render.

**Detect:**
- Large static SVG/markup created inside component body.

**Incorrect:**

```tsx
function Banner() {
  const icon = <svg>{/* big static svg */}</svg>
  return <div>{icon} Hello</div>
}
```

**Correct:**

```tsx
const Icon = <svg>{/* big static svg */}</svg>

function Banner() {
  return <div>{Icon} Hello</div>
}
```

