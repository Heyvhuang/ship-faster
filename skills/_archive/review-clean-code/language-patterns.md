# Language-Specific Patterns

## Table of Contents
- [TypeScript/JavaScript](#typescriptjavascript)
- [Python](#python)
- [Go](#go)

---

## TypeScript/JavaScript

### Overuse of `any` Type

```typescript
// ❌ 
function process(data: any) {
  return data.value;
}

// ✅ 
interface DataPayload {
  value: string;
}
function process(data: DataPayload) {
  return data.value;
}
```

### Callback Hell

```typescript
// ❌ 
getUser(id, (user) => {
  getOrders(user.id, (orders) => {
    processOrders(orders, (result) => {
      sendNotification(result, () => {
        console.log('done');
      });
    });
  });
});

// ✅ 
const user = await getUser(id);
const orders = await getOrders(user.id);
const result = await processOrders(orders);
await sendNotification(result);
```

### Missing Optional Chaining

```typescript
// ❌ 
if (user && user.profile && user.profile.address && user.profile.address.city) {}

// ✅ 
if (user?.profile?.address?.city) {}
```

### Destructuring Assignment

```typescript
// ❌ 
const name = user.name;
const email = user.email;
const age = user.age;

// ✅ 
const { name, email, age } = user;
```

---

## Python

### Overuse of List Comprehensions

```python
# ❌ Overly complex list comprehension
result = [x.value for x in items if x.is_valid and x.type == 'A' for y in x.children if y.active]

# ✅ Split into function
def get_active_children(items):
    for item in items:
        if item.is_valid and item.type == 'A':
            for child in item.children:
                if child.active:
                    yield child.value

result = list(get_active_children(items))
```

### Mutable Default Arguments

```python
# ❌ Dangerous! Mutable object as default argument
def add_item(item, items=[]):
    items.append(item)
    return items

# ✅ 
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

### Bare Except

```python
# ❌ 
try:
    risky_operation()
except:
    pass

# ✅ 
try:
    risky_operation()
except SpecificError as e:
    logger.warning(f"Operation failed: {e}")
```

### String Concatenation

```python
# ❌ 
message = "Hello " + name + "! You have " + str(count) + " messages."

# ✅ 
message = f"Hello {name}! You have {count} messages."
```

### Missing Type Hints

```python
# ❌ 
def process(data):
    return data['value']

# ✅ 
from typing import TypedDict

class DataPayload(TypedDict):
    value: str

def process(data: DataPayload) -> str:
    return data['value']
```

---

## Go

### Ignoring Errors

```go
// ❌ 
result, _ := someFunction()

// ✅ 
result, err := someFunction()
if err != nil {
    return fmt.Errorf("someFunction failed: %w", err)
}
```

### Overlong init Function

```go
// ❌ init() does too much
func init() {
    // Database connection
    // Config loading
    // Cache initialization
    // Logger setup
    // 100+ lines...
}

// ✅ Split responsibilities
func init() {
    initConfig()
    initLogger()
}

func main() {
    db := initDatabase()
    cache := initCache()
    // ...
}
```

### Overuse of Empty Interface

```go
// ❌ 
func process(data interface{}) {
    v := data.(map[string]interface{})
    // ...
}

// ✅ 
type Payload struct {
    Value string `json:"value"`
}

func process(data Payload) {
    // Type safe
}
```

### Deep Nesting

```go
// ❌ 
func process(order *Order) error {
    if order != nil {
        if order.Items != nil {
            if len(order.Items) > 0 {
                for _, item := range order.Items {
                    if item.Valid {
                        // Actual logic
                    }
                }
            }
        }
    }
    return nil
}

// ✅ Early return (Guard Clauses)
func process(order *Order) error {
    if order == nil {
        return nil
    }
    if order.Items == nil || len(order.Items) == 0 {
        return nil
    }
    for _, item := range order.Items {
        if !item.Valid {
            continue
        }
        // Actual logic
    }
    return nil
}
```

### Misuse of Context

```go
// ❌ Using context to pass business data
ctx = context.WithValue(ctx, "user", user)
ctx = context.WithValue(ctx, "order", order)

// ✅ Context is only for cancellation and timeout, pass business data explicitly
func processOrder(ctx context.Context, user User, order Order) error {
    // ...
}
```
