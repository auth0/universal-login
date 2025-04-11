---
title: reset-password-mfa-push-challenge-push
sidebar_label: ResetPasswordMfaPushChallengePush
---

# `reset-password-mfa-push-challenge-push`

This screen represents **ResetPasswordMfaPushChallengePush**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useResetPasswordMfaPushChallengePush()`

This gives you a new `ResetPasswordMfaPushChallengePush` instance:

```tsx
import { useResetPasswordMfaPushChallengePush } from '@auth0/auth0-acul-react/reset-password-mfa-push-challenge-push';

const screen = useResetPasswordMfaPushChallengePush();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password-mfa-push-challenge-push';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordMfaPushChallengePush
```

---

## 🔹 Interface Usage

```ts
import type {
  ResetPasswordMfaPushChallengePushOptions,
  ResetPasswordMfaPushChallengePushProperties,
  ResetPasswordMfaPushChallengePushScreenData
} from '@auth0/auth0-acul-react/reset-password-mfa-push-challenge-push';
```

> These types are re-exported from `auth0-acul-js/reset-password-mfa-push-challenge-push`

---

## ✅ Summary

- `useResetPasswordMfaPushChallengePush()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
