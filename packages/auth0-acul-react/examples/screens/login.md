---
title: login
sidebar_label: Login
---

# `login`

This screen represents **Login**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useLogin()`

This gives you a new `Login` instance:

```tsx
import { useLogin } from '@auth0/auth0-acul-react/login';

const screen = useLogin();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/login';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as Login
```

---

## 🔹 Interface Usage

```ts
import type {
  LoginOptions,
  LoginProperties,
  LoginScreenData
} from '@auth0/auth0-acul-react/login';
```

> These types are re-exported from `auth0-acul-js/login`

---

## ✅ Summary

- `useLogin()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
