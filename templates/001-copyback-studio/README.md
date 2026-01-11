# Template 001: CopyBack Studio

This is the first runnable template in Ship Faster: the CopyBack Studio full-stack app.

- Vault home: [`../../`](../../)
- Website: https://voxyz.space
- Recommended pack: [`../../packs/2026-01-10-create-saas-starter-pack/`](../../packs/2026-01-10-create-saas-starter-pack/)

## Quickstart

**Prerequisites:** Node.js 20.19.5+ (recommended). If you want to avoid the `@fal-ai/client` engine warning during install, use Node.js 22+.

1. Enter the template directory:
   `cd templates/001-copyback-studio`

2. Install dependencies:
   `pnpm install`

3. Create your local env file:
   `cp .env.local.example .env.local`

4. Fill in `.env.local` (at minimum, Supabase variables are required or `pnpm build` may fail):
   - Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - Storage (Cloudflare R2): `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, `R2_BUCKET`, `R2_PUBLIC_BASE`
   - fal.ai: `FAL_KEY`
   - Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID_*`
   - App URL: `NEXT_PUBLIC_APP_URL=http://localhost:3000`
   - Optional credits tuning: `NEXT_PUBLIC_CREDITS_PER_IMAGE` (default: `6`)

5. Run the app:
   `pnpm dev`

Then open `http://localhost:3000`.

## Build

- Production build: `pnpm build`
- Start production server: `pnpm start`
