---
title: mfa-country-codes
sidebar_label: MfaCountryCodes
---

# `mfa-country-codes`

This screen represents **MfaCountryCodes**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaCountryCodes()`

This gives you a new `MfaCountryCodes` instance:

```tsx
import { useMfaCountryCodes } from '@auth0/auth0-acul-react/mfa-country-codes';

const screen = useMfaCountryCodes();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-country-codes';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaCountryCodes
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaCountryCodesOptions,
  MfaCountryCodesProperties,
  MfaCountryCodesScreenData
} from '@auth0/auth0-acul-react/mfa-country-codes';
```

> These types are re-exported from `auth0-acul-js/mfa-country-codes`

---

## ✅ Summary

- `useMfaCountryCodes()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
