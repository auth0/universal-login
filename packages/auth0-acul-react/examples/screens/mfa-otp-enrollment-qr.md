---
title: mfa-otp-enrollment-qr
sidebar_label: MfaOtpEnrollmentQr
---

# `mfa-otp-enrollment-qr`

This screen represents **MfaOtpEnrollmentQr**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaOtpEnrollmentQr()`

This gives you a new `MfaOtpEnrollmentQr` instance:

```tsx
import { useMfaOtpEnrollmentQr } from '@auth0/auth0-acul-react/mfa-otp-enrollment-qr';

const screen = useMfaOtpEnrollmentQr();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-otp-enrollment-qr';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaOtpEnrollmentQr
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaOtpEnrollmentQrOptions,
  MfaOtpEnrollmentQrProperties,
  MfaOtpEnrollmentQrScreenData
} from '@auth0/auth0-acul-react/mfa-otp-enrollment-qr';
```

> These types are re-exported from `auth0-acul-js/mfa-otp-enrollment-qr`

---

## ✅ Summary

- `useMfaOtpEnrollmentQr()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
