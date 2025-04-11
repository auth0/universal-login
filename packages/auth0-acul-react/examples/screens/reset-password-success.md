---
title: reset-password-success
sidebar_label: ResetPasswordSuccess
---

# `reset-password-success`

This screen represents **ResetPasswordSuccess**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useResetPasswordSuccess()`

This gives you a new `ResetPasswordSuccess` instance:

```tsx
import { useResetPasswordSuccess } from '@auth0/auth0-acul-react/reset-password-success';

const screen = useResetPasswordSuccess();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password-success';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordSuccess
```

---

## 🔹 Interface Usage

```ts
import type {
  ResetPasswordSuccessOptions,
  ResetPasswordSuccessProperties,
  ResetPasswordSuccessScreenData
} from '@auth0/auth0-acul-react/reset-password-success';
```

> These types are re-exported from `auth0-acul-js/reset-password-success`

---

## ✅ Summary

- `useResetPasswordSuccess()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
