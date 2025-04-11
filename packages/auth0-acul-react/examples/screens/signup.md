---
title: signup
sidebar_label: Signup
---

# `signup`

This screen represents **Signup**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useSignup()`

This gives you a new `Signup` instance:

```tsx
import { useSignup } from '@auth0/auth0-acul-react/signup';

const screen = useSignup();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/signup';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as Signup
```

---

## 🔹 Interface Usage

```ts
import type {
  SignupOptions,
  SignupProperties,
  SignupScreenData
} from '@auth0/auth0-acul-react/signup';
```

> These types are re-exported from `auth0-acul-js/signup`

---

## ✅ Summary

- `useSignup()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
