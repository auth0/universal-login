---
title: signup-id
sidebar_label: SignupId
---

# `signup-id`

This screen represents **SignupId**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useSignupId()`

This gives you a new `SignupId` instance:

```tsx
import { useSignupId } from '@auth0/auth0-acul-react/signup-id';

const screen = useSignupId();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/signup-id';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as SignupId
```

---

## 🔹 Interface Usage

```ts
import type {
  SignupIdOptions,
  SignupIdProperties,
  SignupIdScreenData
} from '@auth0/auth0-acul-react/signup-id';
```

> These types are re-exported from `auth0-acul-js/signup-id`

---

## ✅ Summary

- `useSignupId()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
