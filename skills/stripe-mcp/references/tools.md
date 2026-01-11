# Stripe MCP 工具详细参考

本文档包含各工具的参数说明和调用示例。

## 目录
- [账户与余额](#账户与余额)
- [客户](#客户)
- [产品与价格](#产品与价格)
- [发票](#发票)
- [支付链接](#支付链接)
- [支付意向](#支付意向)
- [退款](#退款)
- [争议](#争议)
- [订阅](#订阅)
- [优惠券](#优惠券)
- [搜索](#搜索)

---

## 账户与余额

### get_stripe_account_info
获取当前连接的 Stripe 账户信息。

**参数**：无

**返回**：账户 ID、business_profile、settings 等

---

### retrieve_balance
查询账户余额。

**参数**：无

**返回**：
- `available`: 可用余额（按币种）
- `pending`: 待结算余额（按币种）

---

## 客户

### create_customer
创建新客户。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 否 | 客户名称 |
| email | string | 否 | 邮箱地址 |
| phone | string | 否 | 电话 |
| description | string | 否 | 描述 |
| metadata | object | 否 | 自定义键值对 |

**示例**：
```json
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "metadata": {"company": "Fiducial Communications"}
}
```

**返回**：`cus_xxx` + 完整客户对象

---

### list_customers
列出客户。

**参数**：
| 参数 | 类型 | 说明 |
|------|------|------|
| limit | integer | 返回数量（默认 10，最大 100）|
| email | string | 按邮箱筛选 |
| starting_after | string | 分页游标 |

---

## 产品与价格

### create_product
创建产品。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 产品名称 |
| description | string | 否 | 产品描述 |
| metadata | object | 否 | 自定义键值对 |
| active | boolean | 否 | 是否激活（默认 true）|

**示例**：
```json
{
  "name": "企业版订阅",
  "description": "包含 API 访问和优先支持"
}
```

---

### list_products
列出产品。

**参数**：
| 参数 | 类型 | 说明 |
|------|------|------|
| limit | integer | 返回数量 |
| active | boolean | 筛选激活状态 |

---

### create_price
为产品创建价格。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| product | string | 是 | 产品 ID（prod_xxx）|
| unit_amount | integer | 是 | 金额（最小单位，如分/便士）|
| currency | string | 是 | 货币代码（如 "gbp"）|
| recurring | object | 否 | 周期性价格设置 |

**recurring 参数**：
```json
{
  "interval": "month",  // day, week, month, year
  "interval_count": 1
}
```

**示例 - 一次性价格**：
```json
{
  "product": "prod_xxx",
  "unit_amount": 19900,
  "currency": "gbp"
}
```

**示例 - 月付订阅价格**：
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
列出价格。

**参数**：
| 参数 | 类型 | 说明 |
|------|------|------|
| product | string | 按产品 ID 筛选 |
| active | boolean | 筛选激活状态 |
| limit | integer | 返回数量 |

---

## 发票

### create_invoice
创建发票。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| customer | string | 是 | 客户 ID（cus_xxx）|
| collection_method | string | 否 | "charge_automatically" 或 "send_invoice" |
| days_until_due | integer | 否 | 付款期限天数（send_invoice 时用）|
| description | string | 否 | 发票描述 |
| metadata | object | 否 | 自定义键值对 |

**示例**：
```json
{
  "customer": "cus_xxx",
  "collection_method": "send_invoice",
  "days_until_due": 14
}
```

---

### create_invoice_item
向发票添加行项目。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| customer | string | 是 | 客户 ID |
| invoice | string | 否 | 发票 ID（不填则添加到下一张发票）|
| price | string | 否 | 价格 ID |
| quantity | integer | 否 | 数量（默认 1）|
| unit_amount | integer | 否 | 自定义金额（如不用 price）|
| currency | string | 否 | 货币（如用 unit_amount）|
| description | string | 否 | 行项目描述 |

---

### finalize_invoice
定稿发票（锁定并生成编号）。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| invoice | string | 是 | 发票 ID（inv_xxx）|

**返回**：包含 `hosted_invoice_url`（客户支付链接）

---

### list_invoices
列出发票。

**参数**：
| 参数 | 类型 | 说明 |
|------|------|------|
| customer | string | 按客户筛选 |
| status | string | draft, open, paid, uncollectible, void |
| limit | integer | 返回数量 |

---

## 支付链接

### create_payment_link
创建可分享的支付链接。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| line_items | array | 是 | 行项目列表 |
| after_completion | object | 否 | 完成后行为 |
| metadata | object | 否 | 自定义键值对 |

**line_items 格式**：
```json
[
  {"price": "price_xxx", "quantity": 1}
]
```

**after_completion 示例**（跳转）：
```json
{
  "type": "redirect",
  "redirect": {"url": "https://example.com/thanks"}
}
```

---

## 支付意向

### list_payment_intents
列出支付意向（仅查询，不能创建）。

**参数**：
| 参数 | 类型 | 说明 |
|------|------|------|
| customer | string | 按客户筛选 |
| limit | integer | 返回数量 |

**返回字段**：
- `id`: pi_xxx
- `amount`: 金额（最小单位）
- `currency`: 货币
- `status`: succeeded, pending, failed 等
- `customer`: 客户 ID

---

## 退款

### create_refund ⚠️ 危险操作

创建退款。**必须先确认再执行**。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| payment_intent | string | 是* | 支付意向 ID |
| charge | string | 是* | 或扣款 ID（二选一）|
| amount | integer | 否 | 部分退款金额（不填=全额）|
| reason | string | 否 | duplicate, fraudulent, requested_by_customer |
| metadata | object | 否 | 自定义键值对 |

**确认流程**：
1. 展示 payment_intent/charge ID
2. 展示退款金额（全额或部分）
3. 展示 reason
4. 等待用户确认

---

## 争议

### list_disputes
列出争议。

**参数**：
| 参数 | 类型 | 说明 |
|------|------|------|
| limit | integer | 返回数量 |

**关注字段**：
- `status`: needs_response, under_review, won, lost 等
- `reason`: 争议原因
- `amount`: 争议金额

---

### update_dispute ⚠️ 危险操作

更新争议（提交证据）。**必须先确认再执行**。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dispute | string | 是 | 争议 ID（dp_xxx）|
| evidence | object | 否 | 证据字段 |
| metadata | object | 否 | 自定义键值对 |
| submit | boolean | 否 | 是否提交（提交后不可撤回）|

---

## 订阅

### list_subscriptions
列出订阅。

**参数**：
| 参数 | 类型 | 说明 |
|------|------|------|
| customer | string | 按客户筛选 |
| status | string | active, past_due, canceled, all |
| limit | integer | 返回数量 |

---

### update_subscription ⚠️ 危险操作

更新订阅。**必须先确认再执行**。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| subscription | string | 是 | 订阅 ID（sub_xxx）|
| items | array | 否 | 更新订阅项 |
| proration_behavior | string | 否 | 按比例计费行为 |
| cancel_at_period_end | boolean | 否 | 周期结束时取消 |

**确认流程**：
1. 展示当前订阅状态和项目
2. 展示将要变更的内容
3. 等待用户确认

---

### cancel_subscription ⚠️ 危险操作

取消订阅。**必须先确认再执行**。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| subscription | string | 是 | 订阅 ID（sub_xxx）|

**确认流程**：
1. 展示订阅 ID 和当前状态
2. 说明取消时间（立即 vs period_end）
3. 等待用户确认

---

## 优惠券

### create_coupon
创建优惠券。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| percent_off | number | 否* | 百分比折扣（如 20 = 20%）|
| amount_off | integer | 否* | 固定金额折扣（最小单位）|
| currency | string | 否 | 如用 amount_off 则必填 |
| duration | string | 是 | once, repeating, forever |
| duration_in_months | integer | 否 | duration=repeating 时必填 |
| max_redemptions | integer | 否 | 最大使用次数 |
| redeem_by | timestamp | 否 | 过期时间 |

**示例 - 20% 折扣，3 个月**：
```json
{
  "percent_off": 20,
  "duration": "repeating",
  "duration_in_months": 3
}
```

---

### list_coupons
列出优惠券。

**参数**：
| 参数 | 类型 | 说明 |
|------|------|------|
| limit | integer | 返回数量 |

---

## 搜索

### search_stripe_resources
搜索 Stripe 对象（客户、发票、产品等）。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| query | string | 是 | 搜索查询 |

**用途**：按邮箱找客户、按名称找产品等

---

### fetch_stripe_resources
按类型和 ID 获取特定对象。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | 对象类型 |
| id | string | 是 | 对象 ID |

---

### search_stripe_documentation
搜索 Stripe 官方文档。

**参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| query | string | 是 | 搜索关键词 |

**用途**：不确定参数格式、最佳实践、错误处理时使用
