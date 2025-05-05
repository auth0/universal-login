# `mfa-otp-enrollment-code` Screen

> This screen represents the **MfaOtpEnrollmentCode** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaOtpEnrollmentCodeInstance } from '@auth0/auth0-acul-react/mfa-otp-enrollment-code';

const screen = useMfaOtpEnrollmentCodeInstance(); // typed as MfaOtpEnrollmentCodeMembers
// Continues the MFA OTP enrollment process by submitting the OTP code.
screen.continue({ screen: '<screen>' });

// Allows the user to try another MFA method.
screen.tryAnotherMethod({ screen: '<screen>' });
```

### Partial import
```tsx
import { useMfaOtpEnrollmentCodeInstance } from '@auth0/auth0-acul-react';

const screen = useMfaOtpEnrollmentCodeInstance(); // typed as MfaOtpEnrollmentCodeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaOtpEnrollmentCodeProvider, useMfaOtpEnrollmentCodeContext } from '@auth0/auth0-acul-react/mfa-otp-enrollment-code';

function App() {
  return (
    <MfaOtpEnrollmentCodeProvider>
      <ScreenComponent />
    </MfaOtpEnrollmentCodeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaOtpEnrollmentCodeContext(); // typed as MfaOtpEnrollmentCodeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaOtpEnrollmentCodeProvider, useMfaOtpEnrollmentCodeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaOtpEnrollmentCodeProvider>
      <ScreenComponent />
    </MfaOtpEnrollmentCodeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaOtpEnrollmentCodeContext(); // typed as MfaOtpEnrollmentCodeMembers
  return <div />;
}
```

---
