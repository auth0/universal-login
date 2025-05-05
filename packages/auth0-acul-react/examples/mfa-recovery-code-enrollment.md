# `mfa-recovery-code-enrollment` Screen

> This screen represents the **MfaRecoveryCodeEnrollment** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaRecoveryCodeEnrollmentInstance } from '@auth0/auth0-acul-react/mfa-recovery-code-enrollment';

const screen = useMfaRecoveryCodeEnrollmentInstance(); // typed as MfaRecoveryCodeEnrollmentMembers
// Declares that the user saved the recovery code.
This action is triggered when the user declares that they have saved the recovery code.
It redirects to the next screen in the authentication flow.
screen.continue({ screen: '<screen>' });
```

### Partial import
```tsx
import { useMfaRecoveryCodeEnrollmentInstance } from '@auth0/auth0-acul-react';

const screen = useMfaRecoveryCodeEnrollmentInstance(); // typed as MfaRecoveryCodeEnrollmentMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaRecoveryCodeEnrollmentProvider, useMfaRecoveryCodeEnrollmentContext } from '@auth0/auth0-acul-react/mfa-recovery-code-enrollment';

function App() {
  return (
    <MfaRecoveryCodeEnrollmentProvider>
      <ScreenComponent />
    </MfaRecoveryCodeEnrollmentProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaRecoveryCodeEnrollmentContext(); // typed as MfaRecoveryCodeEnrollmentMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaRecoveryCodeEnrollmentProvider, useMfaRecoveryCodeEnrollmentContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaRecoveryCodeEnrollmentProvider>
      <ScreenComponent />
    </MfaRecoveryCodeEnrollmentProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaRecoveryCodeEnrollmentContext(); // typed as MfaRecoveryCodeEnrollmentMembers
  return <div />;
}
```

---
