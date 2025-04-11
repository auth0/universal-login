---
title: mfa-otp-enrollment-code
sidebar_label: MfaOtpEnrollmentCode
---

# `mfa-otp-enrollment-code`

This screen represents **MfaOtpEnrollmentCode**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaOtpEnrollmentCode()`

This gives you a new `MfaOtpEnrollmentCode` instance:

```tsx
import { useMfaOtpEnrollmentCode } from '@auth0/auth0-acul-react/mfa-otp-enrollment-code';

const screen = useMfaOtpEnrollmentCode();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-otp-enrollment-code';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaOtpEnrollmentCode
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaOtpEnrollmentCodeOptions,
  MfaOtpEnrollmentCodeProperties,
  MfaOtpEnrollmentCodeScreenData
} from '@auth0/auth0-acul-react/mfa-otp-enrollment-code';
```

> These types are re-exported from `auth0-acul-js/mfa-otp-enrollment-code`

---

## ✅ Summary

- `useMfaOtpEnrollmentCode()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
