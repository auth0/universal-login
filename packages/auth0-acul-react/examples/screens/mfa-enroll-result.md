---
title: mfa-enroll-result
sidebar_label: MfaEnrollResult
---

# `mfa-enroll-result`

This screen represents **MfaEnrollResult**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaEnrollResult()`

This gives you a new `MfaEnrollResult` instance:

```tsx
import { useMfaEnrollResult } from '@auth0/auth0-acul-react/mfa-enroll-result';

const screen = useMfaEnrollResult();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-enroll-result';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaEnrollResult
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaEnrollResultOptions,
  MfaEnrollResultProperties,
  MfaEnrollResultScreenData
} from '@auth0/auth0-acul-react/mfa-enroll-result';
```

> These types are re-exported from `auth0-acul-js/mfa-enroll-result`

---

## ✅ Summary

- `useMfaEnrollResult()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
