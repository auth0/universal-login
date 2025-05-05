# `mfa-otp-challenge` Screen

> This screen represents the **MfaOtpChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaOtpChallengeInstance } from '@auth0/auth0-acul-react/mfa-otp-challenge';

const screen = useMfaOtpChallengeInstance(); // typed as MfaOtpChallengeMembers
// Continues with the OTP challenge using the provided code
screen.continue({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Allows the user to try another MFA method
screen.tryAnotherMethod({ screen: '<screen>', untrustedData: '<untrustedData>' });
```

### Partial import
```tsx
import { useMfaOtpChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useMfaOtpChallengeInstance(); // typed as MfaOtpChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaOtpChallengeProvider, useMfaOtpChallengeContext } from '@auth0/auth0-acul-react/mfa-otp-challenge';

function App() {
  return (
    <MfaOtpChallengeProvider>
      <ScreenComponent />
    </MfaOtpChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaOtpChallengeContext(); // typed as MfaOtpChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaOtpChallengeProvider, useMfaOtpChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaOtpChallengeProvider>
      <ScreenComponent />
    </MfaOtpChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaOtpChallengeContext(); // typed as MfaOtpChallengeMembers
  return <div />;
}
```

---
