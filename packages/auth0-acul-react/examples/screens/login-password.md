---
title: login-password
sidebar_label: LoginPassword
---

# `login-password`

This screen represents **LoginPassword**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useLoginPassword()`

This gives you a new `LoginPassword` instance:

```tsx
import { useLoginPassword } from '@auth0/auth0-acul-react/login-password';

const screen = useLoginPassword();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/login-password';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as LoginPassword
```

---

## 🔹 Interface Usage

```ts
import type {
  LoginPasswordOptions,
  LoginPasswordProperties,
  LoginPasswordScreenData
} from '@auth0/auth0-acul-react/login-password';
```

> These types are re-exported from `auth0-acul-js/login-password`

---

## ✅ Summary

- `useLoginPassword()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
