---
title: reset-password-mfa-otp-challenge
sidebar_label: ResetPasswordMfaOtpChallenge
---

# `reset-password-mfa-otp-challenge`

This screen represents **ResetPasswordMfaOtpChallenge**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useResetPasswordMfaOtpChallenge()`

This gives you a new `ResetPasswordMfaOtpChallenge` instance:

```tsx
import { useResetPasswordMfaOtpChallenge } from '@auth0/auth0-acul-react/reset-password-mfa-otp-challenge';

const screen = useResetPasswordMfaOtpChallenge();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password-mfa-otp-challenge';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordMfaOtpChallenge
```

---

## 🔹 Interface Usage

```ts
import type {
  ResetPasswordMfaOtpChallengeOptions,
  ResetPasswordMfaOtpChallengeProperties,
  ResetPasswordMfaOtpChallengeScreenData
} from '@auth0/auth0-acul-react/reset-password-mfa-otp-challenge';
```

> These types are re-exported from `auth0-acul-js/reset-password-mfa-otp-challenge`

---

## ✅ Summary

- `useResetPasswordMfaOtpChallenge()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
