---
title: passkey-enrollment-local
sidebar_label: PasskeyEnrollmentLocal
---

# `passkey-enrollment-local`

This screen represents **PasskeyEnrollmentLocal**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `usePasskeyEnrollmentLocal()`

This gives you a new `PasskeyEnrollmentLocal` instance:

```tsx
import { usePasskeyEnrollmentLocal } from '@auth0/auth0-acul-react/passkey-enrollment-local';

const screen = usePasskeyEnrollmentLocal();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/passkey-enrollment-local';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as PasskeyEnrollmentLocal
```

---

## 🔹 Interface Usage

```ts
import type {
  PasskeyEnrollmentLocalOptions,
  PasskeyEnrollmentLocalProperties,
  PasskeyEnrollmentLocalScreenData
} from '@auth0/auth0-acul-react/passkey-enrollment-local';
```

> These types are re-exported from `auth0-acul-js/passkey-enrollment-local`

---

## ✅ Summary

- `usePasskeyEnrollmentLocal()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
