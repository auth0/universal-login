---
title: reset-password-mfa-email-challenge
sidebar_label: ResetPasswordMfaEmailChallenge
---

# `reset-password-mfa-email-challenge`

This screen represents **ResetPasswordMfaEmailChallenge**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useResetPasswordMfaEmailChallenge()`

This gives you a new `ResetPasswordMfaEmailChallenge` instance:

```tsx
import { useResetPasswordMfaEmailChallenge } from '@auth0/auth0-acul-react/reset-password-mfa-email-challenge';

const screen = useResetPasswordMfaEmailChallenge();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password-mfa-email-challenge';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordMfaEmailChallenge
```

---

## 🔹 Interface Usage

```ts
import type {
  ResetPasswordMfaEmailChallengeOptions,
  ResetPasswordMfaEmailChallengeProperties,
  ResetPasswordMfaEmailChallengeScreenData
} from '@auth0/auth0-acul-react/reset-password-mfa-email-challenge';
```

> These types are re-exported from `auth0-acul-js/reset-password-mfa-email-challenge`

---

## ✅ Summary

- `useResetPasswordMfaEmailChallenge()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
