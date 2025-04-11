---
title: mfa-sms-enrollment
sidebar_label: MfaSmsEnrollment
---

# `mfa-sms-enrollment`

This screen represents **MfaSmsEnrollment**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaSmsEnrollment()`

This gives you a new `MfaSmsEnrollment` instance:

```tsx
import { useMfaSmsEnrollment } from '@auth0/auth0-acul-react/mfa-sms-enrollment';

const screen = useMfaSmsEnrollment();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-sms-enrollment';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaSmsEnrollment
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaSmsEnrollmentOptions,
  MfaSmsEnrollmentProperties,
  MfaSmsEnrollmentScreenData
} from '@auth0/auth0-acul-react/mfa-sms-enrollment';
```

> These types are re-exported from `auth0-acul-js/mfa-sms-enrollment`

---

## ✅ Summary

- `useMfaSmsEnrollment()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
