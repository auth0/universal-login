---
title: mfa-email-challenge
sidebar_label: MfaEmailChallenge
---

# `mfa-email-challenge`

This screen represents **MfaEmailChallenge**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaEmailChallenge()`

This gives you a new `MfaEmailChallenge` instance:

```tsx
import { useMfaEmailChallenge } from '@auth0/auth0-acul-react/mfa-email-challenge';

const screen = useMfaEmailChallenge();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-email-challenge';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaEmailChallenge
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaEmailChallengeOptions,
  MfaEmailChallengeProperties,
  MfaEmailChallengeScreenData
} from '@auth0/auth0-acul-react/mfa-email-challenge';
```

> These types are re-exported from `auth0-acul-js/mfa-email-challenge`

---

## ✅ Summary

- `useMfaEmailChallenge()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
