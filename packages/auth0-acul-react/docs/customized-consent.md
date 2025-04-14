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

const screen = useCustomizedConsent(); // typed as CustomizedConsentMembers
screen.accept(...);
```

> View [`CustomizedConsentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.CustomizedConsentMembers.html) — gives all contextual properties for this screen.

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
> View [`CustomizedConsentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.CustomizedConsentMembers.html) — gives all contextual properties for this screen.

---

## 🔹 Interface Usage

The following interfaces and types are available for `CustomizedConsent`:

```ts
import type { default } from '@auth0/auth0-acul-react/customized-consent';
```

---

## 🔸 API References

This section includes all the related types and interfaces for this screen. Use these for advanced typing or extending screen logic.

**Context Type (via Provider):**
- [`CustomizedConsentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.CustomizedConsentMembers.html) — gives all contextual properties for this screen.
