# `customized-consent` Screen

> This screen represents the **CustomizedConsent** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useCustomizedConsent()`

```tsx
import { useCustomizedConsent } from '@auth0/auth0-acul-react/customized-consent';

const screen = useCustomizedConsent(); // typed as CustomizedConsentMembers
// Accepts the consent.
screen.accept({ /* args */ });

// Declines the consent.
screen.deny({ /* args */ });
```

> View [`CustomizedConsentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.CustomizedConsentMembers.html) — this interface documents the full API for the `CustomizedConsent` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/customized-consent';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as CustomizedConsentMembers
```

> View [`CustomizedConsentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.CustomizedConsentMembers.html) — this interface documents the full API for the `CustomizedConsent` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default
} from '@auth0/auth0-acul-react/customized-consent';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`CustomizedConsentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.CustomizedConsentMembers.html) — documents all methods and properties available on the `CustomizedConsent` screen.
