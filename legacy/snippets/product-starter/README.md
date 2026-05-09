# Snippets: Product Starter (Auth + Billing + Storage)

This is a **reference snippet set** used by skills (especially `workflow-ship-faster`) as a fast, copyable baseline for many web products—not just “SaaS”.

It provides:
- Supabase client/server helpers + basic Auth provider
- Stripe helpers + example checkout/webhook handlers
- Credits helpers (metering + charging patterns)
- R2 (S3-compatible) storage helpers
- Example `schema.sql`
- Example `.env` key list (`.env.example`)

## Files

```
.
├── api/
│   ├── checkout.ts
│   └── webhook-stripe.ts
├── storage/
│   └── r2.ts
├── supabase/
│   ├── AuthProvider.tsx
│   ├── client.ts
│   ├── server.ts
│   └── types.ts
├── credits.ts
├── schema.sql
├── stripe-service.ts
└── .env.example
```

## How skills should use this

- Prefer copying the smallest required subset into the target project.
- Always adjust import paths, env var names, and routes to match the target project's conventions.
- Never copy secrets; only copy **env var key names** (values live in the target environment).
