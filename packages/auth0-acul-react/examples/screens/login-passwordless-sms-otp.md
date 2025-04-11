---
title: login-passwordless-sms-otp
sidebar_label: LoginPasswordlessSmsOtp
---

# `login-passwordless-sms-otp`

This screen represents **LoginPasswordlessSmsOtp**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useLoginPasswordlessSmsOtp()`

This gives you a new `LoginPasswordlessSmsOtp` instance:

```tsx
import { useLoginPasswordlessSmsOtp } from '@auth0/auth0-acul-react/login-passwordless-sms-otp';

const screen = useLoginPasswordlessSmsOtp();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/login-passwordless-sms-otp';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as LoginPasswordlessSmsOtp
```

---

## 🔹 Interface Usage

```ts
import type {
  LoginPasswordlessSmsOtpOptions,
  LoginPasswordlessSmsOtpProperties,
  LoginPasswordlessSmsOtpScreenData
} from '@auth0/auth0-acul-react/login-passwordless-sms-otp';
```

> These types are re-exported from `auth0-acul-js/login-passwordless-sms-otp`

---

## ✅ Summary

- `useLoginPasswordlessSmsOtp()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
