---
title: reset-password-email
sidebar_label: ResetPasswordEmail
---

# `reset-password-email`

This screen represents **ResetPasswordEmail**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useResetPasswordEmail()`

This gives you a new `ResetPasswordEmail` instance:

```tsx
import { useResetPasswordEmail } from '@auth0/auth0-acul-react/reset-password-email';

const screen = useResetPasswordEmail();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password-email';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordEmail
```

---

## 🔹 Interface Usage

```ts
import type {
  ResetPasswordEmailOptions,
  ResetPasswordEmailProperties,
  ResetPasswordEmailScreenData
} from '@auth0/auth0-acul-react/reset-password-email';
```

> These types are re-exported from `auth0-acul-js/reset-password-email`

---

## ✅ Summary

- `useResetPasswordEmail()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
