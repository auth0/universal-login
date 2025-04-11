---
title: reset-password-error
sidebar_label: ResetPasswordError
---

# `reset-password-error`

This screen represents **ResetPasswordError**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useResetPasswordError()`

This gives you a new `ResetPasswordError` instance:

```tsx
import { useResetPasswordError } from '@auth0/auth0-acul-react/reset-password-error';

const screen = useResetPasswordError();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password-error';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordError
```

---

## 🔹 Interface Usage

```ts
import type {
  ResetPasswordErrorOptions,
  ResetPasswordErrorProperties,
  ResetPasswordErrorScreenData
} from '@auth0/auth0-acul-react/reset-password-error';
```

> These types are re-exported from `auth0-acul-js/reset-password-error`

---

## ✅ Summary

- `useResetPasswordError()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
