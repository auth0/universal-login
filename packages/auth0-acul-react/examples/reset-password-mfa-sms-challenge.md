# `reset-password-mfa-sms-challenge` Screen

> This screen represents the **ResetPasswordMfaSmsChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useResetPasswordMfaSmsChallengeInstance } from '@auth0/auth0-acul-react/reset-password-mfa-sms-challenge';

const screen = useResetPasswordMfaSmsChallengeInstance(); // typed as ResetPasswordMfaSmsChallengeMembers
// Submits the MFA SMS challenge with the provided code.
screen.continueMfaSmsChallenge({ screen: '<screen>' });

// Submits the action to resend the SMS code.
screen.resendCode({ screen: '<screen>' });

// Submits the action to try another MFA method.
screen.tryAnotherMethod({ screen: '<screen>' });

// Submits the action to switch to voice call verification.
screen.getACall({ screen: '<screen>' });
```

### Partial import
```tsx
import { useResetPasswordMfaSmsChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useResetPasswordMfaSmsChallengeInstance(); // typed as ResetPasswordMfaSmsChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { ResetPasswordMfaSmsChallengeProvider, useResetPasswordMfaSmsChallengeContext } from '@auth0/auth0-acul-react/reset-password-mfa-sms-challenge';

function App() {
  return (
    <ResetPasswordMfaSmsChallengeProvider>
      <ScreenComponent />
    </ResetPasswordMfaSmsChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaSmsChallengeContext(); // typed as ResetPasswordMfaSmsChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { ResetPasswordMfaSmsChallengeProvider, useResetPasswordMfaSmsChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <ResetPasswordMfaSmsChallengeProvider>
      <ScreenComponent />
    </ResetPasswordMfaSmsChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaSmsChallengeContext(); // typed as ResetPasswordMfaSmsChallengeMembers
  return <div />;
}
```

---
