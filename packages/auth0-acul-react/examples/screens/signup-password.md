---
title: signup-password
sidebar_label: SignupPassword
---

# `signup-password`

This screen represents **SignupPassword**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useSignupPassword()`

This gives you a new `SignupPassword` instance:

```tsx
import { useSignupPassword } from '@auth0/auth0-acul-react/signup-password';

const screen = useSignupPassword();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/signup-password';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as SignupPassword
```

---

## 🔹 Interface Usage

```ts
import type {
  SignupPasswordOptions,
  SignupPasswordProperties,
  SignupPasswordScreenData
} from '@auth0/auth0-acul-react/signup-password';
```

> These types are re-exported from `auth0-acul-js/signup-password`

---

## ✅ Summary

- `useSignupPassword()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
