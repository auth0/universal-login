---
title: passkey-enrollment
sidebar_label: PasskeyEnrollment
---

# `passkey-enrollment`

This screen represents **PasskeyEnrollment**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `usePasskeyEnrollment()`

This gives you a new `PasskeyEnrollment` instance:

```tsx
import { usePasskeyEnrollment } from '@auth0/auth0-acul-react/passkey-enrollment';

const screen = usePasskeyEnrollment();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/passkey-enrollment';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as PasskeyEnrollment
```

---

## 🔹 Interface Usage

```ts
import type {
  PasskeyEnrollmentOptions,
  PasskeyEnrollmentProperties,
  PasskeyEnrollmentScreenData
} from '@auth0/auth0-acul-react/passkey-enrollment';
```

> These types are re-exported from `auth0-acul-js/passkey-enrollment`

---

## ✅ Summary

- `usePasskeyEnrollment()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
