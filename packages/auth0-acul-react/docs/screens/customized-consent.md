---
title: customized-consent
sidebar_label: CustomizedConsent
---

# `customized-consent` Screen

> This screen represents the **CustomizedConsent** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useCustomizedConsent()`

This creates a new `CustomizedConsent` instance:

```tsx
import { useCustomizedConsent } from '@auth0/auth0-acul-react/customized-consent';

const screen = useCustomizedConsent();
screen.login({ identifier: 'user@example.com', password: '***' });
```

---

## 🔹 Provider Usage

Wrap your component tree using the screen-specific provider:

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/customized-consent';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance anywhere via context:

```tsx
const screen = useCurrentScreen(); // typed as CustomizedConsentMembers
```

> View [`CustomizedConsentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.CustomizedConsentMembers.html) — provides all contextual properties for this screen.

---

## 🔹 Interface Usage

The following interfaces are supported by `CustomizedConsent` and are useful for typing inputs, outputs, and screen properties.

> _(No interfaces exported for this screen)_
