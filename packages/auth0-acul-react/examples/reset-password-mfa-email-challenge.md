# `reset-password-mfa-email-challenge` Screen

> This screen represents the **ResetPasswordMfaEmailChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useResetPasswordMfaEmailChallengeInstance } from '@auth0/auth0-acul-react/reset-password-mfa-email-challenge';

const screen = useResetPasswordMfaEmailChallengeInstance(); // typed as ResetPasswordMfaEmailChallengeMembers
// Continues with the email challenge using the provided code.
screen.continue({ screen: '<screen>' });

// Resends the email code.
screen.resendCode({ screen: '<screen>' });

// Allows the user to try another MFA method.
screen.tryAnotherMethod({ screen: '<screen>' });
```

### Partial import
```tsx
import { useResetPasswordMfaEmailChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useResetPasswordMfaEmailChallengeInstance(); // typed as ResetPasswordMfaEmailChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { ResetPasswordMfaEmailChallengeProvider, useResetPasswordMfaEmailChallengeContext } from '@auth0/auth0-acul-react/reset-password-mfa-email-challenge';

function App() {
  return (
    <ResetPasswordMfaEmailChallengeProvider>
      <ScreenComponent />
    </ResetPasswordMfaEmailChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaEmailChallengeContext(); // typed as ResetPasswordMfaEmailChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { ResetPasswordMfaEmailChallengeProvider, useResetPasswordMfaEmailChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <ResetPasswordMfaEmailChallengeProvider>
      <ScreenComponent />
    </ResetPasswordMfaEmailChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaEmailChallengeContext(); // typed as ResetPasswordMfaEmailChallengeMembers
  return <div />;
}
```

---
