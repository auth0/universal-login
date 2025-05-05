# `mfa-recovery-code-challenge` Screen

> This screen represents the **MfaRecoveryCodeChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaRecoveryCodeChallengeInstance } from '@auth0/auth0-acul-react/mfa-recovery-code-challenge';

const screen = useMfaRecoveryCodeChallengeInstance(); // typed as MfaRecoveryCodeChallengeMembers
// Continues with the provided recovery code.
screen.continue({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });

// Navigates to the screen where the user can pick another MFA method.
screen.tryAnotherMethod({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });
```

### Partial import
```tsx
import { useMfaRecoveryCodeChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useMfaRecoveryCodeChallengeInstance(); // typed as MfaRecoveryCodeChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaRecoveryCodeChallengeProvider, useMfaRecoveryCodeChallengeContext } from '@auth0/auth0-acul-react/mfa-recovery-code-challenge';

function App() {
  return (
    <MfaRecoveryCodeChallengeProvider>
      <ScreenComponent />
    </MfaRecoveryCodeChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaRecoveryCodeChallengeContext(); // typed as MfaRecoveryCodeChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaRecoveryCodeChallengeProvider, useMfaRecoveryCodeChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaRecoveryCodeChallengeProvider>
      <ScreenComponent />
    </MfaRecoveryCodeChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaRecoveryCodeChallengeContext(); // typed as MfaRecoveryCodeChallengeMembers
  return <div />;
}
```

---
