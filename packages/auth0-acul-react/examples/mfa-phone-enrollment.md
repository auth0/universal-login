# `mfa-phone-enrollment` Screen

> This screen represents the **MfaPhoneEnrollment** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaPhoneEnrollmentInstance } from '@auth0/auth0-acul-react/mfa-phone-enrollment';

const screen = useMfaPhoneEnrollmentInstance(); // typed as MfaPhoneEnrollmentMembers
// Navigates to the country code selection screen.
screen.pickCountryCode({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });

// Continues the enrollment process with the provided phone number and type (SMS or voice).
screen.continueEnrollment({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });

// Allows the user to try another MFA method.
screen.tryAnotherMethod({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });
```

### Partial import
```tsx
import { useMfaPhoneEnrollmentInstance } from '@auth0/auth0-acul-react';

const screen = useMfaPhoneEnrollmentInstance(); // typed as MfaPhoneEnrollmentMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaPhoneEnrollmentProvider, useMfaPhoneEnrollmentContext } from '@auth0/auth0-acul-react/mfa-phone-enrollment';

function App() {
  return (
    <MfaPhoneEnrollmentProvider>
      <ScreenComponent />
    </MfaPhoneEnrollmentProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaPhoneEnrollmentContext(); // typed as MfaPhoneEnrollmentMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaPhoneEnrollmentProvider, useMfaPhoneEnrollmentContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaPhoneEnrollmentProvider>
      <ScreenComponent />
    </MfaPhoneEnrollmentProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaPhoneEnrollmentContext(); // typed as MfaPhoneEnrollmentMembers
  return <div />;
}
```

---
