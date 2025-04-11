---
title: mfa-push-challenge-push
sidebar_label: MfaPushChallengePush
---

# `mfa-push-challenge-push`

This screen represents **MfaPushChallengePush**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaPushChallengePush()`

This gives you a new `MfaPushChallengePush` instance:

```tsx
import { useMfaPushChallengePush } from '@auth0/auth0-acul-react/mfa-push-challenge-push';

const screen = useMfaPushChallengePush();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-push-challenge-push';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaPushChallengePush
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaPushChallengePushOptions,
  MfaPushChallengePushProperties,
  MfaPushChallengePushScreenData
} from '@auth0/auth0-acul-react/mfa-push-challenge-push';
```

> These types are re-exported from `auth0-acul-js/mfa-push-challenge-push`

---

## ✅ Summary

- `useMfaPushChallengePush()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
