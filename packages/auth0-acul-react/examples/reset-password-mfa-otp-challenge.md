# `reset-password-mfa-otp-challenge` Screen

> This screen represents the **ResetPasswordMfaOtpChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useResetPasswordMfaOtpChallengeInstance } from '@auth0/auth0-acul-react/reset-password-mfa-otp-challenge';

const screen = useResetPasswordMfaOtpChallengeInstance(); // typed as ResetPasswordMfaOtpChallengeMembers
// Continues with the OTP challenge using the provided code.
screen.continue({ /* args */ });

// Allows the user to try another MFA method.
screen.tryAnotherMethod({ /* args */ });
```

### Partial import
```tsx
import { useResetPasswordMfaOtpChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useResetPasswordMfaOtpChallengeInstance(); // typed as ResetPasswordMfaOtpChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { ResetPasswordMfaOtpChallengeProvider, useResetPasswordMfaOtpChallengeContext } from '@auth0/auth0-acul-react/reset-password-mfa-otp-challenge';

function App() {
  return (
    <ResetPasswordMfaOtpChallengeProvider>
      <ScreenComponent />
    </ResetPasswordMfaOtpChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaOtpChallengeContext(); // typed as ResetPasswordMfaOtpChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { ResetPasswordMfaOtpChallengeProvider, useResetPasswordMfaOtpChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <ResetPasswordMfaOtpChallengeProvider>
      <ScreenComponent />
    </ResetPasswordMfaOtpChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaOtpChallengeContext(); // typed as ResetPasswordMfaOtpChallengeMembers
  return <div />;
}
```

---
