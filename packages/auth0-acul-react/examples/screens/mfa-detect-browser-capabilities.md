---
title: mfa-detect-browser-capabilities
sidebar_label: MfaDetectBrowserCapabilities
---

# `mfa-detect-browser-capabilities`

This screen represents **MfaDetectBrowserCapabilities**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useMfaDetectBrowserCapabilities()`

This gives you a new `MfaDetectBrowserCapabilities` instance:

```tsx
import { useMfaDetectBrowserCapabilities } from '@auth0/auth0-acul-react/mfa-detect-browser-capabilities';

const screen = useMfaDetectBrowserCapabilities();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-detect-browser-capabilities';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as MfaDetectBrowserCapabilities
```

---

## 🔹 Interface Usage

```ts
import type {
  MfaDetectBrowserCapabilitiesOptions,
  MfaDetectBrowserCapabilitiesProperties,
  MfaDetectBrowserCapabilitiesScreenData
} from '@auth0/auth0-acul-react/mfa-detect-browser-capabilities';
```

> These types are re-exported from `auth0-acul-js/mfa-detect-browser-capabilities`

---

## ✅ Summary

- `useMfaDetectBrowserCapabilities()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
