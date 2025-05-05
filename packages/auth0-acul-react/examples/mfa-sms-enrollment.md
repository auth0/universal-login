# `mfa-sms-enrollment` Screen

> This screen represents the **MfaSmsEnrollment** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaSmsEnrollmentInstance } from '@auth0/auth0-acul-react/mfa-sms-enrollment';

const screen = useMfaSmsEnrollmentInstance(); // typed as MfaSmsEnrollmentMembers
// Handles the action to pick a country code for SMS enrollment.
screen.pickCountryCode({ screen: '<screen>' });

// Continues the SMS enrollment process with the provided phone number.
screen.continueEnrollment({ screen: '<screen>' });

// Handles the action to try another method for MFA.
screen.tryAnotherMethod({ screen: '<screen>' });
```

### Partial import
```tsx
import { useMfaSmsEnrollmentInstance } from '@auth0/auth0-acul-react';

const screen = useMfaSmsEnrollmentInstance(); // typed as MfaSmsEnrollmentMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaSmsEnrollmentProvider, useMfaSmsEnrollmentContext } from '@auth0/auth0-acul-react/mfa-sms-enrollment';

function App() {
  return (
    <MfaSmsEnrollmentProvider>
      <ScreenComponent />
    </MfaSmsEnrollmentProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaSmsEnrollmentContext(); // typed as MfaSmsEnrollmentMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaSmsEnrollmentProvider, useMfaSmsEnrollmentContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaSmsEnrollmentProvider>
      <ScreenComponent />
    </MfaSmsEnrollmentProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaSmsEnrollmentContext(); // typed as MfaSmsEnrollmentMembers
  return <div />;
}
```

---
