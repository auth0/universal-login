---
title: mfa-login-options
sidebar_label: MfaLoginOptions
---

# `mfa-login-options`

This screen represents **MfaLoginOptions**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaLoginOptions()`

This gives you a new `MfaLoginOptions` instance:

```tsx
import { useMfaLoginOptions } from '@auth0/auth0-acul-react/mfa-login-options';

const screen = useMfaLoginOptions();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-login-options';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaLoginOptions
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaLoginOptionsOptions,
  MfaLoginOptionsProperties,
  MfaLoginOptionsScreenData
} from '@auth0/auth0-acul-react/mfa-login-options';
```

> These types are re-exported from `auth0-acul-js/mfa-login-options`

---

## ✅ Summary

- `useMfaLoginOptions()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
