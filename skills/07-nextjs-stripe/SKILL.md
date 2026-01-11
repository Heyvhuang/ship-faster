---
name: 07-nextjs-stripe
description: "Integrate Stripe into a Next.js project fast with a default 'ship fastest' path (Payment Links) and an optional code path (webhooks/Stripe SDK). Use when adding billing, subscriptions, checkout, invoices, payment links, refunds, or Stripe setup. Chains stripe-mcp for safe ops and produces file-based receipts under .claude/runs/."
---

# Next.js + Stripe (Ship Faster Integration)

Default goal: **Get paid first**, then gradually evolve to a deeper billing system.

## Input (Pass Paths Only)

- `repo_root`
- `run_dir`
- `billing.md` (optional): What to sell (one-time/subscription), pricing, delivery method

## Output (Written to Disk)

- `03-plans/stripe-plan.md`
- `03-plans/stripe-actions.md`
- `05-final/stripe-summary.md`
- `05-final/receipt.json`

## Two Paths

### Path A (Default, Fastest): Payment Links (Low-Code/No-Code)

1. Use `stripe-mcp` to create/reuse Product + Price
2. Use `stripe-mcp` to create Payment Link (one-time or subscription)
3. Minimal integration in Next.js:
   - Provide a "Buy/Subscribe" button that redirects to Payment Link
   - Success page/copy can be optimized later

Pros: Fast, fewer pitfalls; Cons: Limited deep customization.

### Path B (Optional): Code Integration (Webhook + SDK)

Only take this path when you need:
- Strong consistency for order status in your own system
- Webhook-driven feature activation/permission control

Requirements:
- Stripe SDK
- Webhook endpoint
- Securely store webhook secret (only in env, never log it)

## Mandatory Confirmation Points

- Any money/contract-related actions (refunds, cancel subscriptions, update subscriptions, submit dispute evidence) must:
  1) Write to `03-plans/stripe-actions.md`
  2) Write to `03-plans/approval.md`
  3) Wait for explicit user confirmation before execution
