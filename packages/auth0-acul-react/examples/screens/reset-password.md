---
title: reset-password
sidebar_label: ResetPassword
---

# `reset-password`

This screen represents **ResetPassword**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useResetPassword()`

This gives you a new `ResetPassword` instance:

```tsx
import { useResetPassword } from '@auth0/auth0-acul-react/reset-password';

const screen = useResetPassword();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as ResetPassword
```

---

## 🔹 Interface Usage

```ts
import type {
  ResetPasswordOptions,
  ResetPasswordProperties,
  ResetPasswordScreenData
} from '@auth0/auth0-acul-react/reset-password';
```

> These types are re-exported from `auth0-acul-js/reset-password`

---

## ✅ Summary

- `useResetPassword()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
