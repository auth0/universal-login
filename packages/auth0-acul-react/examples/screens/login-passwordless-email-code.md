---
title: login-passwordless-email-code
sidebar_label: LoginPasswordlessEmailCode
---

# `login-passwordless-email-code`

This screen represents **LoginPasswordlessEmailCode**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useLoginPasswordlessEmailCode()`

This gives you a new `LoginPasswordlessEmailCode` instance:

```tsx
import { useLoginPasswordlessEmailCode } from '@auth0/auth0-acul-react/login-passwordless-email-code';

const screen = useLoginPasswordlessEmailCode();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/login-passwordless-email-code';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as LoginPasswordlessEmailCode
```

---

## 🔹 Interface Usage

```ts
import type {
  LoginPasswordlessEmailCodeOptions,
  LoginPasswordlessEmailCodeProperties,
  LoginPasswordlessEmailCodeScreenData
} from '@auth0/auth0-acul-react/login-passwordless-email-code';
```

> These types are re-exported from `auth0-acul-js/login-passwordless-email-code`

---

## ✅ Summary

- `useLoginPasswordlessEmailCode()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
