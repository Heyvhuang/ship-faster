# Template 001: CopyBack Studio

> High-density copy round-trip studio for global growth marketers. Extract, translate, and verify text layouts on banners instantly.

**Ship Faster** template series · [voxyz.space](https://voxyz.space) · [Vault Home](../../)

---

## Features

- **Text Extraction** - AI-powered text detection from banner images
- **Multi-language Translation** - Translate copy to multiple languages in one batch
- **Layout Verification** - Verify translated text fits original design constraints
- **Batch Processing** - Process multiple banners in a single run
- **Credit System** - Built-in usage tracking with Stripe billing

## Tech Stack

- **Framework**: Next.js 16.1.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Storage**: Cloudflare R2
- **AI**: fal.ai + Google Gemini
- **Payments**: Stripe

## Quickstart

**Prerequisites:** Node.js 20+, pnpm

1. Enter template directory:
   ```bash
   cd templates/001-copyback-studio
   ```

2. Install & configure:
   ```bash
   pnpm install
   cp .env.local.example .env.local
   ```

3. Fill in `.env.local` with required values (see below)

4. Start dev server:
   ```bash
   pnpm dev
   ```

5. Open `http://localhost:3000`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key |
| `R2_ACCOUNT_ID` | Yes | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | Yes | R2 access key |
| `R2_SECRET_ACCESS_KEY` | Yes | R2 secret key |
| `R2_ENDPOINT` | Yes | R2 endpoint URL |
| `R2_PUBLIC_BASE` | Yes | R2 public base URL |
| `R2_BUCKET` | Yes | R2 bucket name |
| `FAL_KEY` | Yes | fal.ai API key |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key |
| `STRIPE_PRICE_ID_STARTER` | Yes | Stripe price ID for Starter plan |
| `STRIPE_PRICE_ID_PRO` | Yes | Stripe price ID for Pro plan |
| `STRIPE_PRICE_ID_ENTERPRISE` | Yes | Stripe price ID for Enterprise plan |
| `NEXT_PUBLIC_APP_URL` | Yes | App URL (e.g., `http://localhost:3000`) |
| `AI_GATEWAY_API_KEY` | No | Vercel AI Gateway key |
| `NEXT_PUBLIC_CREDITS_PER_IMAGE` | No | Credits per image (default: 6) |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |

## Deployment

1. Create a Vercel project pointing at this repo
2. Add all environment variables from `.env.local`
3. Deploy and promote to production

---

**License:** MIT · **Part of:** [Ship Faster](../../) by [voxyz](https://voxyz.space)
