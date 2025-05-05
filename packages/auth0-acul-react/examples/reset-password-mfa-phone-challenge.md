# `reset-password-mfa-phone-challenge` Screen

> This screen represents the **ResetPasswordMfaPhoneChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useResetPasswordMfaPhoneChallengeInstance } from '@auth0/auth0-acul-react/reset-password-mfa-phone-challenge';

const screen = useResetPasswordMfaPhoneChallengeInstance(); // typed as ResetPasswordMfaPhoneChallengeMembers
// Sends the verification code to the user's phone via the selected method (SMS or Voice).
Corresponds to the 'Continue' action in the OpenAPI definition (action: 'default').
screen.continue({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });

// Initiates the process for the user to select a different MFA authenticator.
Corresponds to the 'Try Another Method' action in the OpenAPI definition (action: 'pick-authenticator').
screen.tryAnotherMethod({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });
```

### Partial import
```tsx
import { useResetPasswordMfaPhoneChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useResetPasswordMfaPhoneChallengeInstance(); // typed as ResetPasswordMfaPhoneChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { ResetPasswordMfaPhoneChallengeProvider, useResetPasswordMfaPhoneChallengeContext } from '@auth0/auth0-acul-react/reset-password-mfa-phone-challenge';

function App() {
  return (
    <ResetPasswordMfaPhoneChallengeProvider>
      <ScreenComponent />
    </ResetPasswordMfaPhoneChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaPhoneChallengeContext(); // typed as ResetPasswordMfaPhoneChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { ResetPasswordMfaPhoneChallengeProvider, useResetPasswordMfaPhoneChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <ResetPasswordMfaPhoneChallengeProvider>
      <ScreenComponent />
    </ResetPasswordMfaPhoneChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaPhoneChallengeContext(); // typed as ResetPasswordMfaPhoneChallengeMembers
  return <div />;
}
```

---
