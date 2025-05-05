# `mfa-sms-challenge` Screen

> This screen represents the **MfaSmsChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaSmsChallengeInstance } from '@auth0/auth0-acul-react/mfa-sms-challenge';

const screen = useMfaSmsChallengeInstance(); // typed as MfaSmsChallengeMembers
// Submits the MFA SMS challenge with the provided code and rememberDevice option.
screen.continueMfaSmsChallenge({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Submits the action to pick a different SMS configuration, if available.
screen.pickSms({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Submits the action to resend the SMS code.
screen.resendCode({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Submits the action to try another MFA method.
screen.tryAnotherMethod({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Submits the action to switch to voice call verification.
screen.getACall({ screen: '<screen>', untrustedData: '<untrustedData>' });
```

### Partial import
```tsx
import { useMfaSmsChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useMfaSmsChallengeInstance(); // typed as MfaSmsChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaSmsChallengeProvider, useMfaSmsChallengeContext } from '@auth0/auth0-acul-react/mfa-sms-challenge';

function App() {
  return (
    <MfaSmsChallengeProvider>
      <ScreenComponent />
    </MfaSmsChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaSmsChallengeContext(); // typed as MfaSmsChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaSmsChallengeProvider, useMfaSmsChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaSmsChallengeProvider>
      <ScreenComponent />
    </MfaSmsChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaSmsChallengeContext(); // typed as MfaSmsChallengeMembers
  return <div />;
}
```

---
