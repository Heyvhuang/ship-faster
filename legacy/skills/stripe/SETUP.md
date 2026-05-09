# Stripe MCP Setup (Optional)

MCP enables automatic execution of billing operations. This is optional — you can always use CLI or Dashboard instead.

## Prerequisites

- Claude Code, Cursor, or another MCP-compatible client
- Stripe account (test mode is fine for setup)

## Connection

### Method 1: Stripe Official MCP Server (Recommended)

```bash
# Add the MCP server
claude mcp add --transport http stripe https://mcp.stripe.com/

# Authenticate
claude /mcp
```

This connects to Stripe's official MCP server at `https://mcp.stripe.com` and handles authentication via OAuth.

### Method 2: API Key Authentication

If OAuth isn't available, use a restricted API key:

1. Go to: `https://dashboard.stripe.com/apikeys`
2. Create a restricted key with needed permissions
3. Configure as Bearer token in your MCP client

**Recommended permissions for restricted key**:
- Customers: Read/Write
- Products: Read/Write
- Prices: Read/Write
- Invoices: Read/Write
- Payment Links: Read/Write
- Payment Intents: Read only
- Refunds: Write (dangerous)
- Subscriptions: Read/Write (dangerous)
- Disputes: Read/Write (dangerous)

## Available MCP Tools

Once connected, these tools become available:

| Category | Tools |
|----------|-------|
| Account | `get_stripe_account_info` |
| Balance | `retrieve_balance` |
| Customer | `create_customer`, `list_customers` |
| Product | `create_product`, `list_products` |
| Price | `create_price`, `list_prices` |
| Invoice | `create_invoice`, `create_invoice_item`, `finalize_invoice`, `list_invoices` |
| Payment Link | `create_payment_link` |
| Payment Intent | `list_payment_intents` |
| Refund | `create_refund` ⚠️ |
| Dispute | `list_disputes`, `update_dispute` ⚠️ |
| Subscription | `list_subscriptions`, `update_subscription` ⚠️, `cancel_subscription` ⚠️ |
| Coupon | `create_coupon`, `list_coupons` |
| Search | `search_stripe_resources`, `fetch_stripe_resources`, `search_stripe_documentation` |

⚠️ = Dangerous operation, requires confirmation per [SKILL.md](SKILL.md)

## Test vs Live Mode

- **Default**: Test mode (safe for experimentation)
- **Live mode**: Requires user to explicitly say "live mode" + double confirmation

MCP server handles mode switching automatically based on the connected account.

## Verification

Test the connection:
```
list_customers({"limit": 1})
```

Should return customer list (or empty list if new account).

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Authentication failed | Re-run `claude /mcp` to re-authenticate |
| Permission denied | Check API key has required permissions |
| Tool not found | Verify MCP server is properly added |
| Wrong mode | Check test/live toggle in Stripe dashboard |

## Without MCP

If you can't or don't want to use MCP, see [BACKENDS.md](BACKENDS.md) for CLI and Dashboard alternatives. All operations in [SKILL.md](SKILL.md) can be performed manually.
