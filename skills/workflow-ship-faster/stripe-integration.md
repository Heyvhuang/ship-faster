# Step 7 — Next.js + Stripe (Ship Faster Integration)

Default goal: **Get paid first**, then gradually evolve into a deeper billing system.

## Input (Pass Paths Only)

- `repo_root`
- `run_dir`
- `billing.md` (optional): What to sell (one-time/subscription), pricing, delivery method

## Output (Persisted)

- `03-plans/stripe-plan.md`
- `03-plans/stripe-actions.md`
- `05-final/stripe-summary.md`
- `05-final/receipt.json`

## Two Routes

### Route A (Default, Fastest): Payment Links (Low-code/No-code)

1. Use `stripe` skill to create/reuse Product + Price
2. Use `stripe` skill to create Payment Link (one-time or subscription)
3. Minimal integration in Next.js:
   - Provide a "Buy/Subscribe" button that redirects to Payment Link
   - Success page/copy can be optimized later

Pros: Fast, fewer pitfalls; Cons: Limited deep customization capability.

### Route B (Optional): Code Integration (webhook + SDK)

Only take this route when you need:
- Strong consistency of order status in your own system
- Webhook-driven business provisioning/permission control

Requires:
- Stripe SDK
- Webhook endpoint
- Securely store webhook secret (only in env, not in logs)

## Mandatory Confirmation Points

- Any money/contract related action (refund, cancel subscription, update subscription, submit dispute evidence) must:
  1) Write to `03-plans/stripe-actions.md`
  2) Write to `03-plans/approval.md`
  3) Wait for explicit user confirmation before executing
