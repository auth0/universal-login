# `reset-password-mfa-recovery-code-challenge` Screen

> This screen represents the **ResetPasswordMfaRecoveryCodeChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useResetPasswordMfaRecoveryCodeChallengeInstance } from '@auth0/auth0-acul-react/reset-password-mfa-recovery-code-challenge';

const screen = useResetPasswordMfaRecoveryCodeChallengeInstance(); // typed as ResetPasswordMfaRecoveryCodeChallengeMembers
// Continues with the provided recovery code.
screen.continue({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });

// Navigates to the screen where the user can pick another MFA method.
screen.tryAnotherMethod({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });
```

### Partial import
```tsx
import { useResetPasswordMfaRecoveryCodeChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useResetPasswordMfaRecoveryCodeChallengeInstance(); // typed as ResetPasswordMfaRecoveryCodeChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { ResetPasswordMfaRecoveryCodeChallengeProvider, useResetPasswordMfaRecoveryCodeChallengeContext } from '@auth0/auth0-acul-react/reset-password-mfa-recovery-code-challenge';

function App() {
  return (
    <ResetPasswordMfaRecoveryCodeChallengeProvider>
      <ScreenComponent />
    </ResetPasswordMfaRecoveryCodeChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaRecoveryCodeChallengeContext(); // typed as ResetPasswordMfaRecoveryCodeChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { ResetPasswordMfaRecoveryCodeChallengeProvider, useResetPasswordMfaRecoveryCodeChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <ResetPasswordMfaRecoveryCodeChallengeProvider>
      <ScreenComponent />
    </ResetPasswordMfaRecoveryCodeChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaRecoveryCodeChallengeContext(); // typed as ResetPasswordMfaRecoveryCodeChallengeMembers
  return <div />;
}
```

---
