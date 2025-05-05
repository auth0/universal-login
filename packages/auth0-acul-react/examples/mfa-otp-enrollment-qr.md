# `mfa-otp-enrollment-qr` Screen

> This screen represents the **MfaOtpEnrollmentQr** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaOtpEnrollmentQrInstance } from '@auth0/auth0-acul-react/mfa-otp-enrollment-qr';

const screen = useMfaOtpEnrollmentQrInstance(); // typed as MfaOtpEnrollmentQrMembers
// Navigates to the authenticator selection screen.
screen.toggleView({ screen: '<screen>' });

// Continues with the default action.
screen.continue({ screen: '<screen>' });

// Navigates to the authenticator selection screen.
screen.tryAnotherMethod({ screen: '<screen>' });
```

### Partial import
```tsx
import { useMfaOtpEnrollmentQrInstance } from '@auth0/auth0-acul-react';

const screen = useMfaOtpEnrollmentQrInstance(); // typed as MfaOtpEnrollmentQrMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaOtpEnrollmentQrProvider, useMfaOtpEnrollmentQrContext } from '@auth0/auth0-acul-react/mfa-otp-enrollment-qr';

function App() {
  return (
    <MfaOtpEnrollmentQrProvider>
      <ScreenComponent />
    </MfaOtpEnrollmentQrProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaOtpEnrollmentQrContext(); // typed as MfaOtpEnrollmentQrMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaOtpEnrollmentQrProvider, useMfaOtpEnrollmentQrContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaOtpEnrollmentQrProvider>
      <ScreenComponent />
    </MfaOtpEnrollmentQrProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaOtpEnrollmentQrContext(); // typed as MfaOtpEnrollmentQrMembers
  return <div />;
}
```

---
