---
title: login-id
sidebar_label: LoginId
---

# `login-id`

This screen represents **LoginId**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useLoginId()`

This gives you a new `LoginId` instance:

```tsx
import { useLoginId } from '@auth0/auth0-acul-react/login-id';

const screen = useLoginId();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/login-id';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as LoginId
```

---

## 🔹 Interface Usage

```ts
import type {
  LoginIdOptions,
  LoginIdProperties,
  LoginIdScreenData
} from '@auth0/auth0-acul-react/login-id';
```

> These types are re-exported from `auth0-acul-js/login-id`

---

## ✅ Summary

- `useLoginId()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
