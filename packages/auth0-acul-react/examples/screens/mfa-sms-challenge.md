---
title: mfa-sms-challenge
sidebar_label: MfaSmsChallenge
---

# `mfa-sms-challenge`

This screen represents **MfaSmsChallenge**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaSmsChallenge()`

This gives you a new `MfaSmsChallenge` instance:

```tsx
import { useMfaSmsChallenge } from '@auth0/auth0-acul-react/mfa-sms-challenge';

const screen = useMfaSmsChallenge();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-sms-challenge';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaSmsChallenge
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaSmsChallengeOptions,
  MfaSmsChallengeProperties,
  MfaSmsChallengeScreenData
} from '@auth0/auth0-acul-react/mfa-sms-challenge';
```

> These types are re-exported from `auth0-acul-js/mfa-sms-challenge`

---

## ✅ Summary

- `useMfaSmsChallenge()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
