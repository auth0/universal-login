---
title: customized-consent
sidebar_label: CustomizedConsent
---

# `customized-consent`

This screen represents **CustomizedConsent**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useCustomizedConsent()`

This gives you a new `CustomizedConsent` instance:

```tsx
import { useCustomizedConsent } from '@auth0/auth0-acul-react/customized-consent';

const screen = useCustomizedConsent();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/customized-consent';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as CustomizedConsent
```

---

## 🔹 Interface Usage

```ts
import type {
  CustomizedConsentOptions,
  CustomizedConsentProperties,
  CustomizedConsentScreenData
} from '@auth0/auth0-acul-react/customized-consent';
```

> These types are re-exported from `auth0-acul-js/customized-consent`

---

## ✅ Summary

- `useCustomizedConsent()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
