---
title: mfa-push-welcome
sidebar_label: MfaPushWelcome
---

# `mfa-push-welcome`

This screen represents **MfaPushWelcome**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaPushWelcome()`

This gives you a new `MfaPushWelcome` instance:

```tsx
import { useMfaPushWelcome } from '@auth0/auth0-acul-react/mfa-push-welcome';

const screen = useMfaPushWelcome();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-push-welcome';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaPushWelcome
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaPushWelcomeOptions,
  MfaPushWelcomeProperties,
  MfaPushWelcomeScreenData
} from '@auth0/auth0-acul-react/mfa-push-welcome';
```

> These types are re-exported from `auth0-acul-js/mfa-push-welcome`

---

## ✅ Summary

- `useMfaPushWelcome()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
