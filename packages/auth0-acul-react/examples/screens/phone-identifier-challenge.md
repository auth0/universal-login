---
title: phone-identifier-challenge
sidebar_label: PhoneIdentifierChallenge
---

# `phone-identifier-challenge`

This screen represents **PhoneIdentifierChallenge**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `usePhoneIdentifierChallenge()`

This gives you a new `PhoneIdentifierChallenge` instance:

```tsx
import { usePhoneIdentifierChallenge } from '@auth0/auth0-acul-react/phone-identifier-challenge';

const screen = usePhoneIdentifierChallenge();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/phone-identifier-challenge';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as PhoneIdentifierChallenge
```

---

## 🔹 Interface Usage

```ts
import type {
  PhoneIdentifierChallengeOptions,
  PhoneIdentifierChallengeProperties,
  PhoneIdentifierChallengeScreenData
} from '@auth0/auth0-acul-react/phone-identifier-challenge';
```

> These types are re-exported from `auth0-acul-js/phone-identifier-challenge`

---

## ✅ Summary

- `usePhoneIdentifierChallenge()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
