---
title: phone-identifier-enrollment
sidebar_label: PhoneIdentifierEnrollment
---

# `phone-identifier-enrollment`

This screen represents **PhoneIdentifierEnrollment**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `usePhoneIdentifierEnrollment()`

This gives you a new `PhoneIdentifierEnrollment` instance:

```tsx
import { usePhoneIdentifierEnrollment } from '@auth0/auth0-acul-react/phone-identifier-enrollment';

const screen = usePhoneIdentifierEnrollment();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/phone-identifier-enrollment';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as PhoneIdentifierEnrollment
```

---

## 🔹 Interface Usage

```ts
import type {
  PhoneIdentifierEnrollmentOptions,
  PhoneIdentifierEnrollmentProperties,
  PhoneIdentifierEnrollmentScreenData
} from '@auth0/auth0-acul-react/phone-identifier-enrollment';
```

> These types are re-exported from `auth0-acul-js/phone-identifier-enrollment`

---

## ✅ Summary

- `usePhoneIdentifierEnrollment()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
