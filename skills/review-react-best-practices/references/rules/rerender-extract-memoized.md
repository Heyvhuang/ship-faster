---
title: Extract Expensive Work into Memoized Components
impact: MEDIUM
impactDescription: enables early returns and avoids wasted work
tags: rerender, memo, useMemo, performance
---

## Extract Expensive Work into Memoized Components

If a component does expensive work but often early-returns (loading/empty/error), extract the expensive part into a memoized child.

**Detect:**
- `useMemo` doing heavy work in a component that often returns a skeleton.

**Incorrect:**

```tsx
function Profile({ user, loading }: { user: User; loading: boolean }) {
  const avatar = useMemo(() => computeAvatar(user), [user])
  if (loading) return <Skeleton />
  return <Avatar id={avatar} />
}
```

**Correct:**

```tsx
const AvatarView = memo(function AvatarView({ user }: { user: User }) {
  const id = useMemo(() => computeAvatar(user), [user])
  return <Avatar id={id} />
})

function Profile({ user, loading }: { user: User; loading: boolean }) {
  if (loading) return <Skeleton />
  return <AvatarView user={user} />
}
```

