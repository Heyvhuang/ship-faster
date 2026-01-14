# Detailed Examples by Dimension

## Table of Contents
- [1. Naming Issues](#1-naming-issues)
- [2. Function Issues](#2-function-issues)
- [3. Duplication Issues](#3-duplication-issues)
- [4. Over-Engineering](#4-over-engineering)
- [5. Magic Numbers](#5-magic-numbers)

---

## 1. Naming Issues

### Meaningless Names

```typescript
// ❌ 
const list = getUsers();           // list of what?
const flag = checkPermission();    // what flag?
const handler = () => {};          // handles what?

// ✅ 
const activeUsers = getUsers();
const hasEditPermission = checkPermission();
const onFormSubmit = () => {};
```

### Inconsistent Naming

```typescript
// ❌ Multiple names for same concept
getUserData();
fetchUserInfo();
retrieveUserProfile();

// ✅ Use one consistently
getUser();
getUserProfile();
getUserSettings();
```

### Boolean Naming

```typescript
// ❌ 
const open = true;
const disabled = false;

// ✅ Use is/has/can/should prefix
const isOpen = true;
const isDisabled = false;
const hasPermission = true;
const canEdit = true;
```

---

## 2. Function Issues

### Function Too Long

```typescript
// ❌ 160-line processOrder function
async function processOrder(order) {
  // Validation logic (40 lines)
  // Calculation logic (30 lines)
  // Inventory check (25 lines)
  // Payment processing (35 lines)
  // Notification sending (30 lines)
}

// ✅ Split into single-responsibility functions
async function processOrder(order) {
  await validateOrder(order);
  const total = calculateTotal(order);
  await checkInventory(order.items);
  await processPayment(order, total);
  await sendNotifications(order);
}
```

### Too Many Parameters

```typescript
// ❌ 
function createUser(name, email, age, address, phone, role, department, manager) {}

// ✅ Use configuration object
interface CreateUserParams {
  name: string;
  email: string;
  profile: { age: number; phone: string };
  organization: { role: string; department: string; manager: string };
}
function createUser(params: CreateUserParams) {}
```

### Side Effects

```typescript
// ❌ Function name implies read-only, but has side effects
function getUser(id) {
  const user = db.find(id);
  user.lastAccess = new Date();  // Side effect!
  db.save(user);                  // Side effect!
  return user;
}

// ✅ Separate read and write
function getUser(id) {
  return db.find(id);
}

function recordUserAccess(id) {
  const user = db.find(id);
  user.lastAccess = new Date();
  db.save(user);
}
```

---

## 3. Duplication Issues

### Similar Validation Logic

```typescript
// ❌ Repeated validation pattern
function validateUser(user) {
  if (!user.name) throw new Error('Name required');
  if (!user.email) throw new Error('Email required');
  if (!user.age) throw new Error('Age required');
}

function validateProduct(product) {
  if (!product.name) throw new Error('Name required');
  if (!product.price) throw new Error('Price required');
  if (!product.sku) throw new Error('SKU required');
}

// ✅ Extract generic validator
function validateRequired(obj, fields) {
  for (const field of fields) {
    if (!obj[field]) throw new Error(`${field} required`);
  }
}

validateRequired(user, ['name', 'email', 'age']);
validateRequired(product, ['name', 'price', 'sku']);
```

### Similar Error Handling

```typescript
// ❌ Repeated try-catch pattern
async function fetchUsers() {
  try {
    return await api.get('/users');
  } catch (e) {
    logger.error('Failed to fetch users', e);
    throw new ApiError('Failed to fetch users');
  }
}

async function fetchProducts() {
  try {
    return await api.get('/products');
  } catch (e) {
    logger.error('Failed to fetch products', e);
    throw new ApiError('Failed to fetch products');
  }
}

// ✅ Extract generic wrapper
async function apiCall(endpoint, errorMessage) {
  try {
    return await api.get(endpoint);
  } catch (e) {
    logger.error(errorMessage, e);
    throw new ApiError(errorMessage);
  }
}

const users = await apiCall('/users', 'Failed to fetch users');
const products = await apiCall('/products', 'Failed to fetch products');
```

---

## 4. Over-Engineering

### Useless Abstraction Layer

```typescript
// ❌ Interface with only one implementation
interface IUserRepository {
  findById(id: string): User;
}

class UserRepository implements IUserRepository {
  findById(id: string): User { /* ... */ }
}

// ✅ Use class directly, abstract when needed
class UserRepository {
  findById(id: string): User { /* ... */ }
}
```

### Over-Defensive Code

```typescript
// ❌ Overly defensive code
function add(a, b) {
  if (typeof a !== 'number') throw new Error('a must be number');
  if (typeof b !== 'number') throw new Error('b must be number');
  if (isNaN(a)) throw new Error('a is NaN');
  if (isNaN(b)) throw new Error('b is NaN');
  if (!isFinite(a)) throw new Error('a is not finite');
  if (!isFinite(b)) throw new Error('b is not finite');
  return a + b;
}

// ✅ Reasonable type safety (TypeScript)
function add(a: number, b: number): number {
  return a + b;
}
```

### Never-Used Configuration

```typescript
// ❌ 
if (config.enableNewFeature) {  // Always true
  newFeature();
} else {
  oldFeature();  // Dead code
}

// ✅ Remove dead code
newFeature();
```

---

## 5. Magic Numbers

### Numbers in Business Logic

```typescript
// ❌ 
if (user.age >= 18) {}
if (order.total > 100) {}
if (retryCount < 3) {}

// ✅ 
const LEGAL_AGE = 18;
const FREE_SHIPPING_THRESHOLD = 100;
const MAX_RETRY_ATTEMPTS = 3;

if (user.age >= LEGAL_AGE) {}
if (order.total > FREE_SHIPPING_THRESHOLD) {}
if (retryCount < MAX_RETRY_ATTEMPTS) {}
```

### Time Constants

```typescript
// ❌ 
setTimeout(fn, 86400000);  // How long is this?
setInterval(poll, 300000); // How long is this?

// ✅ 
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const FIVE_MINUTES_MS = 5 * 60 * 1000;

setTimeout(fn, ONE_DAY_MS);
setInterval(poll, FIVE_MINUTES_MS);
```

### HTTP Status Codes

```typescript
// ❌ 
if (response.status === 200) {}
if (response.status === 404) {}

// ✅ 
const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;
// Or use constant library: import { StatusCodes } from 'http-status-codes';
```
