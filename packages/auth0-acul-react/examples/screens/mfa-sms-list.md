---
title: mfa-sms-list
sidebar_label: MfaSmsList
---

# `mfa-sms-list`

This screen represents **MfaSmsList**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaSmsList()`

This gives you a new `MfaSmsList` instance:

```tsx
import { useMfaSmsList } from '@auth0/auth0-acul-react/mfa-sms-list';

const screen = useMfaSmsList();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-sms-list';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaSmsList
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaSmsListOptions,
  MfaSmsListProperties,
  MfaSmsListScreenData
} from '@auth0/auth0-acul-react/mfa-sms-list';
```

> These types are re-exported from `auth0-acul-js/mfa-sms-list`

---

## ✅ Summary

- `useMfaSmsList()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
