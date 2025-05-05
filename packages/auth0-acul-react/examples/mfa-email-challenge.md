# `mfa-email-challenge` Screen

> This screen represents the **MfaEmailChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaEmailChallengeInstance } from '@auth0/auth0-acul-react/mfa-email-challenge';

const screen = useMfaEmailChallengeInstance(); // typed as MfaEmailChallengeMembers
// Continues with the email challenge using the provided code
screen.continue({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Resends the email code
screen.resendCode({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Allows the user to try another MFA method
screen.tryAnotherMethod({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Submits the action to pick a different Email configuration, if available.
screen.pickEmail({ screen: '<screen>', untrustedData: '<untrustedData>' });
```

### Partial import
```tsx
import { useMfaEmailChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useMfaEmailChallengeInstance(); // typed as MfaEmailChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaEmailChallengeProvider, useMfaEmailChallengeContext } from '@auth0/auth0-acul-react/mfa-email-challenge';

function App() {
  return (
    <MfaEmailChallengeProvider>
      <ScreenComponent />
    </MfaEmailChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaEmailChallengeContext(); // typed as MfaEmailChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaEmailChallengeProvider, useMfaEmailChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaEmailChallengeProvider>
      <ScreenComponent />
    </MfaEmailChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaEmailChallengeContext(); // typed as MfaEmailChallengeMembers
  return <div />;
}
```

---
