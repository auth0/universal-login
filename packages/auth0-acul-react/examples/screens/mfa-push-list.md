---
title: mfa-push-list
sidebar_label: MfaPushList
---

# `mfa-push-list`

This screen represents **MfaPushList**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaPushList()`

This gives you a new `MfaPushList` instance:

```tsx
import { useMfaPushList } from '@auth0/auth0-acul-react/mfa-push-list';

const screen = useMfaPushList();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-push-list';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaPushList
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaPushListOptions,
  MfaPushListProperties,
  MfaPushListScreenData
} from '@auth0/auth0-acul-react/mfa-push-list';
```

> These types are re-exported from `auth0-acul-js/mfa-push-list`

---

## ✅ Summary

- `useMfaPushList()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
