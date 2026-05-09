---
title: Minimize Serialization at Client / RSC Boundaries
impact: HIGH
impactDescription: reduces payload and CPU on server + client
tags: server, serialization, nextjs, rsc, performance
---

## Minimize Serialization at Client / RSC Boundaries

Passing large objects across boundaries (RSC → Client Component props) increases payload size and serialization cost.

**Detect:**
- Client components receiving huge objects with many unused fields.
- Passing `Date`, `Map`, class instances (non-serializable) across boundaries.

**Incorrect:**

```tsx
// Client component gets entire db record
<ClientWidget user={user} />
```

**Correct:**

```tsx
// Only pass what the client needs (serializable primitives)
<ClientWidget user={{ id: user.id, name: user.name }} />
```

