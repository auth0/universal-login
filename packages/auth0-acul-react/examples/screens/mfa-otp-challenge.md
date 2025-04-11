---
title: mfa-otp-challenge
sidebar_label: MfaOtpChallenge
---

# `mfa-otp-challenge`

This screen represents **MfaOtpChallenge**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaOtpChallenge()`

This gives you a new `MfaOtpChallenge` instance:

```tsx
import { useMfaOtpChallenge } from '@auth0/auth0-acul-react/mfa-otp-challenge';

const screen = useMfaOtpChallenge();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-otp-challenge';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaOtpChallenge
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaOtpChallengeOptions,
  MfaOtpChallengeProperties,
  MfaOtpChallengeScreenData
} from '@auth0/auth0-acul-react/mfa-otp-challenge';
```

> These types are re-exported from `auth0-acul-js/mfa-otp-challenge`

---

## ✅ Summary

- `useMfaOtpChallenge()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
