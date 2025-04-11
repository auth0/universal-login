---
title: mfa-push-enrollment-qr
sidebar_label: MfaPushEnrollmentQr
---

# `mfa-push-enrollment-qr`

This screen represents **MfaPushEnrollmentQr**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaPushEnrollmentQr()`

This gives you a new `MfaPushEnrollmentQr` instance:

```tsx
import { useMfaPushEnrollmentQr } from '@auth0/auth0-acul-react/mfa-push-enrollment-qr';

const screen = useMfaPushEnrollmentQr();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-push-enrollment-qr';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaPushEnrollmentQr
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaPushEnrollmentQrOptions,
  MfaPushEnrollmentQrProperties,
  MfaPushEnrollmentQrScreenData
} from '@auth0/auth0-acul-react/mfa-push-enrollment-qr';
```

> These types are re-exported from `auth0-acul-js/mfa-push-enrollment-qr`

---

## ✅ Summary

- `useMfaPushEnrollmentQr()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
