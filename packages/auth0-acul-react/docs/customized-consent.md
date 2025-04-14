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

> View [`CustomizedConsentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.CustomizedConsentMembers.html) — this interface describes all properties and methods exposed by the `CustomizedConsent` screen.

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

> View [`CustomizedConsentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.CustomizedConsentMembers.html) — this interface describes all properties and methods exposed by the `CustomizedConsent` screen.

---

## 🔹 Interface Usage

The following interfaces and types are available for `CustomizedConsent`:

**Import:**
`import type { default } from '@auth0/auth0-acul-react/customized-consent';`

---

## 🔸 API References

This section includes all the relevant types and interfaces for this screen. Use them for typing props, payloads, and extending behaviors.

**Screen Class Reference:**  
- [`CustomizedConsentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.CustomizedConsentMembers.html) — this interface describes all properties and methods exposed by the `CustomizedConsent` screen.
