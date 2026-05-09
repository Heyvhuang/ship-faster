# Stripe Execution Backends

Three ways to execute billing operations. Pick what works for you.

## Quick Reference

| Operation | MCP | CLI | Dashboard |
|-----------|-----|-----|-----------|
| List customers | `list_customers` | `stripe customers list` | Customers tab |
| Create customer | `create_customer` | `stripe customers create` | Customers → + |
| List products | `list_products` | `stripe products list` | Products tab |
| Create product | `create_product` | `stripe products create` | Products → + |
| Create price | `create_price` | `stripe prices create` | Product → Add price |
| Create invoice | `create_invoice` | `stripe invoices create` | Invoices → + |
| Finalize invoice | `finalize_invoice` | `stripe invoices finalize` | Invoice → Finalize |
| Create payment link | `create_payment_link` | `stripe payment_links create` | Payment links → + |
| List payment intents | `list_payment_intents` | `stripe payment_intents list` | Payments tab |
| Create refund | `create_refund` | `stripe refunds create` | Payment → Refund |
| List subscriptions | `list_subscriptions` | `stripe subscriptions list` | Subscriptions tab |
| Cancel subscription | `cancel_subscription` | `stripe subscriptions cancel` | Subscription → Cancel |
| Check balance | `retrieve_balance` | `stripe balance retrieve` | Dashboard home |

## Option A: MCP (Automatic)

If you have MCP configured, tools execute automatically.

**Setup**: See [SETUP.md](SETUP.md)

**Example**:
```
Agent calls: list_customers({"limit": 10})
→ Results returned automatically
```

## Option B: Stripe CLI

Install: `brew install stripe/stripe-cli/stripe` or [download](https://stripe.com/docs/stripe-cli)

### Setup

```bash
# Login (opens browser for auth)
stripe login

# Check connection
stripe config --list
```

### Common Commands

**Customers**:
```bash
# List customers
stripe customers list --limit 10

# Create customer
stripe customers create --name "John Smith" --email "john@example.com"

# Get customer
stripe customers retrieve cus_xxx
```

**Products & Prices**:
```bash
# Create product
stripe products create --name "Pro Plan" --description "Premium features"

# Create price (one-time)
stripe prices create --product prod_xxx --unit-amount 1999 --currency usd

# Create price (recurring)
stripe prices create --product prod_xxx --unit-amount 999 --currency usd \
  --recurring-interval month
```

**Invoices**:
```bash
# Create invoice
stripe invoices create --customer cus_xxx --collection-method send_invoice \
  --days-until-due 14

# Add line item
stripe invoiceitems create --customer cus_xxx --invoice inv_xxx --price price_xxx

# Finalize
stripe invoices finalize inv_xxx
```

**Payments**:
```bash
# List payment intents
stripe payment_intents list --customer cus_xxx

# Create refund (requires confirmation in skill)
stripe refunds create --payment-intent pi_xxx --reason requested_by_customer
```

**Subscriptions**:
```bash
# List subscriptions
stripe subscriptions list --customer cus_xxx

# Cancel subscription (requires confirmation in skill)
stripe subscriptions cancel sub_xxx
```

### Test Mode vs Live Mode

```bash
# CLI defaults to test mode
stripe customers list

# Use live mode (requires confirmation)
stripe customers list --live
```

### Evidence Collection

After executing, paste results back:
```
Executed: stripe customers create --name "John Smith" --email "john@example.com"
Result: cus_xxx created
```

## Option C: Stripe Dashboard

### Customers
1. Go to: `https://dashboard.stripe.com/customers`
2. Click "+ Add customer" to create
3. Click customer row to view details

### Products & Prices
1. Go to: `https://dashboard.stripe.com/products`
2. Click "+ Add product" to create
3. Add prices within product detail page

### Invoices
1. Go to: `https://dashboard.stripe.com/invoices`
2. Click "+ Create invoice"
3. Add line items, set due date
4. Click "Finalize" to lock and send

### Payment Links
1. Go to: `https://dashboard.stripe.com/payment-links`
2. Click "+ Create payment link"
3. Select product/price
4. Copy generated URL

### Payments & Refunds
1. Go to: `https://dashboard.stripe.com/payments`
2. Click payment row for details
3. Click "Refund" button (requires confirmation)

### Subscriptions
1. Go to: `https://dashboard.stripe.com/subscriptions`
2. Click subscription row for details
3. Use "Cancel" or "Update" buttons (requires confirmation)

### Balance
1. Go to: `https://dashboard.stripe.com/balance/overview`
2. View available and pending balances

### Test Mode vs Live Mode

Toggle at top-left of dashboard: "View test data" switch

### Evidence Collection

After executing manually, provide:
- Screenshot of result
- Object ID (cus_xxx, inv_xxx, etc.)
- Key fields (amount, status, etc.)

## Choosing a Backend

| Situation | Recommended |
|-----------|-------------|
| Have MCP configured | MCP (fastest) |
| CI/CD or scripting | CLI |
| One-off operations | Dashboard |
| Need visual confirmation | Dashboard |
| Team doesn't have MCP | CLI or Dashboard |

## Security Notes

All backends follow the same security rules from [SKILL.md](SKILL.md):
- Read before write (check for duplicates)
- Money operations require confirmation
- Test mode by default; live mode needs explicit switch
