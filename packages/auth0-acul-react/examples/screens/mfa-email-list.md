---
title: mfa-email-list
sidebar_label: MfaEmailList
---

# `mfa-email-list`

This screen represents **MfaEmailList**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaEmailList()`

This gives you a new `MfaEmailList` instance:

```tsx
import { useMfaEmailList } from '@auth0/auth0-acul-react/mfa-email-list';

const screen = useMfaEmailList();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-email-list';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaEmailList
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaEmailListOptions,
  MfaEmailListProperties,
  MfaEmailListScreenData
} from '@auth0/auth0-acul-react/mfa-email-list';
```

> These types are re-exported from `auth0-acul-js/mfa-email-list`

---

## ✅ Summary

- `useMfaEmailList()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
