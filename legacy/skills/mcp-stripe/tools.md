# Stripe MCP Tool Reference

This document contains parameter descriptions and examples for each tool.

## Table of Contents
- [Account & Balance](#account--balance)
- [Customer](#customer)
- [Products & Prices](#products--prices)
- [Invoices](#invoices)
- [Payment Links](#payment-links)
- [Payment Intents](#payment-intents)
- [Refunds](#refunds)
- [Disputes](#disputes)
- [Subscriptions](#subscriptions)
- [Coupons](#coupons)
- [Search](#search)

---

## Account & Balance

### get_stripe_account_info
Get current connected Stripe account information.

**Parameters**: None

**Returns**: Account ID, business_profile, settings, etc.

---

### retrieve_balance
Query account balance.

**Parameters**: None

**Returns**:
- `available`: Available balance (by currency)
- `pending`: Pending balance (by currency)

---

## Customer

### create_customer
Create a new customer.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | No | Customer name |
| email | string | No | Email address |
| phone | string | No | Phone number |
| description | string | No | Description |
| metadata | object | No | Custom key-value pairs |

**Example**:
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "metadata": {"company": "Fiducial Communications"}
}
```

**Returns**: `cus_xxx` + complete customer object

---

### list_customers
List customers.

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| limit | integer | Number to return (default 10, max 100) |
| email | string | Filter by email |
| starting_after | string | Pagination cursor |

---

## Products & Prices

### create_product
Create a product.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Product name |
| description | string | No | Product description |
| metadata | object | No | Custom key-value pairs |
| active | boolean | No | Whether active (default true) |

**Example**:
```json
{
  "name": "Enterprise Subscription",
  "description": "Includes API access and priority support"
}
```

---

### list_products
List products.

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| limit | integer | Number to return |
| active | boolean | Filter by active status |

---

### create_price
Create a price for a product.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product | string | Yes | Product ID (prod_xxx) |
| unit_amount | integer | Yes | Amount (smallest unit, e.g., cents/pence) |
| currency | string | Yes | Currency code (e.g., "gbp") |
| recurring | object | No | Recurring price settings |

**recurring parameters**:
```json
{
  "interval": "month",  // day, week, month, year
  "interval_count": 1
}
```

**Example - One-time price**:
```json
{
  "product": "prod_xxx",
  "unit_amount": 19900,
  "currency": "gbp"
}
```

**Example - Monthly subscription price**:
```json
{
  "product": "prod_xxx",
  "unit_amount": 4900,
  "currency": "gbp",
  "recurring": {"interval": "month"}
}
```

---

### list_prices
List prices.

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| product | string | Filter by product ID |
| active | boolean | Filter by active status |
| limit | integer | Number to return |

---

## Invoices

### create_invoice
Create an invoice.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| customer | string | Yes | Customer ID (cus_xxx) |
| collection_method | string | No | "charge_automatically" or "send_invoice" |
| days_until_due | integer | No | Payment deadline in days (for send_invoice) |
| description | string | No | Invoice description |
| metadata | object | No | Custom key-value pairs |

**Example**:
```json
{
  "customer": "cus_xxx",
  "collection_method": "send_invoice",
  "days_until_due": 14
}
```

---

### create_invoice_item
Add line item to invoice.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| customer | string | Yes | Customer ID |
| invoice | string | No | Invoice ID (if empty, adds to next invoice) |
| price | string | No | Price ID |
| quantity | integer | No | Quantity (default 1) |
| unit_amount | integer | No | Custom amount (if not using price) |
| currency | string | No | Currency (if using unit_amount) |
| description | string | No | Line item description |

---

### finalize_invoice
Finalize invoice (lock and generate number).

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| invoice | string | Yes | Invoice ID (inv_xxx) |

**Returns**: Includes `hosted_invoice_url` (customer payment link)

---

### list_invoices
List invoices.

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| customer | string | Filter by customer |
| status | string | draft, open, paid, uncollectible, void |
| limit | integer | Number to return |

---

## Payment Links

### create_payment_link
Create a shareable payment link.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| line_items | array | Yes | Line items list |
| after_completion | object | No | Post-completion behavior |
| metadata | object | No | Custom key-value pairs |

**line_items format**:
```json
[
  {"price": "price_xxx", "quantity": 1}
]
```

**after_completion example** (redirect):
```json
{
  "type": "redirect",
  "redirect": {"url": "https://example.com/thanks"}
}
```

---

## Payment Intents

### list_payment_intents
List payment intents (query only, cannot create).

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| customer | string | Filter by customer |
| limit | integer | Number to return |

**Return fields**:
- `id`: pi_xxx
- `amount`: Amount (smallest unit)
- `currency`: Currency
- `status`: succeeded, pending, failed, etc.
- `customer`: Customer ID

---

## Refunds

### create_refund ⚠️ Dangerous Operation

Create a refund. **Must confirm before execution**.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| payment_intent | string | Yes* | Payment intent ID |
| charge | string | Yes* | Or charge ID (one of the two) |
| amount | integer | No | Partial refund amount (omit = full refund) |
| reason | string | No | duplicate, fraudulent, requested_by_customer |
| metadata | object | No | Custom key-value pairs |

**Confirmation flow**:
1. Display payment_intent/charge ID
2. Display refund amount (full or partial)
3. Display reason
4. Await user confirmation

---

## Disputes

### list_disputes
List disputes.

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| limit | integer | Number to return |

**Key fields**:
- `status`: needs_response, under_review, won, lost, etc.
- `reason`: Dispute reason
- `amount`: Dispute amount

---

### update_dispute ⚠️ Dangerous Operation

Update dispute (submit evidence). **Must confirm before execution**.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| dispute | string | Yes | Dispute ID (dp_xxx) |
| evidence | object | No | Evidence fields |
| metadata | object | No | Custom key-value pairs |
| submit | boolean | No | Whether to submit (irreversible after submission) |

---

## Subscriptions

### list_subscriptions
List subscriptions.

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| customer | string | Filter by customer |
| status | string | active, past_due, canceled, all |
| limit | integer | Number to return |

---

### update_subscription ⚠️ Dangerous Operation

Update subscription. **Must confirm before execution**.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| subscription | string | Yes | Subscription ID (sub_xxx) |
| items | array | No | Update subscription items |
| proration_behavior | string | No | Proration behavior |
| cancel_at_period_end | boolean | No | Cancel at period end |

**Confirmation flow**:
1. Display current subscription status and items
2. Display changes to be made
3. Await user confirmation

---

### cancel_subscription ⚠️ Dangerous Operation

Cancel subscription. **Must confirm before execution**.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| subscription | string | Yes | Subscription ID (sub_xxx) |

**Confirmation flow**:
1. Display subscription ID and current status
2. Explain cancellation timing (immediate vs period_end)
3. Await user confirmation

---

## Coupons

### create_coupon
Create a coupon.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| percent_off | number | No* | Percentage discount (e.g., 20 = 20%) |
| amount_off | integer | No* | Fixed amount discount (smallest unit) |
| currency | string | No | Required if using amount_off |
| duration | string | Yes | once, repeating, forever |
| duration_in_months | integer | No | Required when duration=repeating |
| max_redemptions | integer | No | Maximum usage count |
| redeem_by | timestamp | No | Expiration time |

**Example - 20% off for 3 months**:
```json
{
  "percent_off": 20,
  "duration": "repeating",
  "duration_in_months": 3
}
```

---

### list_coupons
List coupons.

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| limit | integer | Number to return |

---

## Search

### search_stripe_resources
Search Stripe objects (customers, invoices, products, etc.).

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Search query |

**Use cases**: Find customer by email, find product by name, etc.

---

### fetch_stripe_resources
Get specific object by type and ID.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Object type |
| id | string | Yes | Object ID |

---

### search_stripe_documentation
Search Stripe official documentation.

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Search keywords |

**Use cases**: When unsure about parameter format, best practices, error handling
