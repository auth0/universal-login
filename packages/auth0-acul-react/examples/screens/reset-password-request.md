---
title: reset-password-request
sidebar_label: ResetPasswordRequest
---

# `reset-password-request`

This screen represents **ResetPasswordRequest**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useResetPasswordRequest()`

This gives you a new `ResetPasswordRequest` instance:

```tsx
import { useResetPasswordRequest } from '@auth0/auth0-acul-react/reset-password-request';

const screen = useResetPasswordRequest();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password-request';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordRequest
```

---

## 🔹 Interface Usage

```ts
import type {
  ResetPasswordRequestOptions,
  ResetPasswordRequestProperties,
  ResetPasswordRequestScreenData
} from '@auth0/auth0-acul-react/reset-password-request';
```

> These types are re-exported from `auth0-acul-js/reset-password-request`

---

## ✅ Summary

- `useResetPasswordRequest()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
