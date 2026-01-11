# Template 002: UnitEconomics Console

This is the second runnable template in Ship Faster: the UnitEconomics Console.

- Vault home: [`../../`](../../)

Single-page unit economics analysis and policy drafting app for AI SaaS teams.

## Local Development

Prerequisites: Node.js 18+

1. Install dependencies:
   npm install
2. Create .env.local and set required keys (see below)
3. Start the dev server:
   npm run dev

## Environment Variables

Required:
- GEMINI_API_KEY

Planned integrations:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- NEXT_PUBLIC_STRIPE_PAYMENT_LINK
- STRIPE_PRICE_ID

## Database (Supabase)

Supabase integration will store customer metrics and analysis runs. Configure env vars above and apply migrations when the database step is completed.

## Billing (Stripe)

Stripe integration will unlock paid features. Configure env vars above and set up webhook delivery when the billing step is completed.

## Deployment (Vercel)

1. Create a Vercel project pointing at this repo.
2. Add the environment variables from .env.local.
3. Deploy and promote to production.

## Design System

See design-system.md for UI rules and tokens.
