---
title: mfa-begin-enroll-options
sidebar_label: MfaBeginEnrollOptions
---

# `mfa-begin-enroll-options`

This screen represents **MfaBeginEnrollOptions**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaBeginEnrollOptions()`

This gives you a new `MfaBeginEnrollOptions` instance:

```tsx
import { useMfaBeginEnrollOptions } from '@auth0/auth0-acul-react/mfa-begin-enroll-options';

const screen = useMfaBeginEnrollOptions();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-begin-enroll-options';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaBeginEnrollOptions
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaBeginEnrollOptionsOptions,
  MfaBeginEnrollOptionsProperties,
  MfaBeginEnrollOptionsScreenData
} from '@auth0/auth0-acul-react/mfa-begin-enroll-options';
```

> These types are re-exported from `auth0-acul-js/mfa-begin-enroll-options`

---

## ✅ Summary

- `useMfaBeginEnrollOptions()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
