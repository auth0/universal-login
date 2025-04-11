---
title: reset-password-mfa-sms-challenge
sidebar_label: ResetPasswordMfaSmsChallenge
---

# `reset-password-mfa-sms-challenge`

This screen represents **ResetPasswordMfaSmsChallenge**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useResetPasswordMfaSmsChallenge()`

This gives you a new `ResetPasswordMfaSmsChallenge` instance:

```tsx
import { useResetPasswordMfaSmsChallenge } from '@auth0/auth0-acul-react/reset-password-mfa-sms-challenge';

const screen = useResetPasswordMfaSmsChallenge();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password-mfa-sms-challenge';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordMfaSmsChallenge
```

---

## 🔹 Interface Usage

```ts
import type {
  ResetPasswordMfaSmsChallengeOptions,
  ResetPasswordMfaSmsChallengeProperties,
  ResetPasswordMfaSmsChallengeScreenData
} from '@auth0/auth0-acul-react/reset-password-mfa-sms-challenge';
```

> These types are re-exported from `auth0-acul-js/reset-password-mfa-sms-challenge`

---

## ✅ Summary

- `useResetPasswordMfaSmsChallenge()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
