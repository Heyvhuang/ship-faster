---
title: Prefer Explicit Conditional Rendering Over Accidental Falsy Values
impact: LOW-MEDIUM
impactDescription: avoids UI bugs and hydration mismatches
tags: rendering, conditional, react, correctness
---

## Prefer Explicit Conditional Rendering Over Accidental Falsy Values

Using `&&` can accidentally render `0` or cause subtle mismatches when values are not strictly boolean.

**Detect:**
- `{count && <Badge />}` where `count` can be `0`.

**Incorrect:**

```tsx
{count && <Badge>{count}</Badge>}
```

**Correct:**

```tsx
{count > 0 ? <Badge>{count}</Badge> : null}
```

