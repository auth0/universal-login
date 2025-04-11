---
title: email-identifier-challenge
sidebar_label: EmailIdentifierChallenge
---

# `email-identifier-challenge`

This screen represents **EmailIdentifierChallenge**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useEmailIdentifierChallenge()`

This gives you a new `EmailIdentifierChallenge` instance:

```tsx
import { useEmailIdentifierChallenge } from '@auth0/auth0-acul-react/email-identifier-challenge';

const screen = useEmailIdentifierChallenge();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/email-identifier-challenge';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as EmailIdentifierChallenge
```

---

## 🔹 Interface Usage

```ts
import type {
  EmailIdentifierChallengeOptions,
  EmailIdentifierChallengeProperties,
  EmailIdentifierChallengeScreenData
} from '@auth0/auth0-acul-react/email-identifier-challenge';
```

> These types are re-exported from `auth0-acul-js/email-identifier-challenge`

---

## ✅ Summary

- `useEmailIdentifierChallenge()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
