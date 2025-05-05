# `mfa-push-enrollment-qr` Screen

> This screen represents the **MfaPushEnrollmentQr** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaPushEnrollmentQrInstance } from '@auth0/auth0-acul-react/mfa-push-enrollment-qr';

const screen = useMfaPushEnrollmentQrInstance(); // typed as MfaPushEnrollmentQrMembers
// Navigates to the authenticator selection screen.
screen.pickAuthenticator({ screen: '<screen>' });
```

### Partial import
```tsx
import { useMfaPushEnrollmentQrInstance } from '@auth0/auth0-acul-react';

const screen = useMfaPushEnrollmentQrInstance(); // typed as MfaPushEnrollmentQrMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaPushEnrollmentQrProvider, useMfaPushEnrollmentQrContext } from '@auth0/auth0-acul-react/mfa-push-enrollment-qr';

function App() {
  return (
    <MfaPushEnrollmentQrProvider>
      <ScreenComponent />
    </MfaPushEnrollmentQrProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaPushEnrollmentQrContext(); // typed as MfaPushEnrollmentQrMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaPushEnrollmentQrProvider, useMfaPushEnrollmentQrContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaPushEnrollmentQrProvider>
      <ScreenComponent />
    </MfaPushEnrollmentQrProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaPushEnrollmentQrContext(); // typed as MfaPushEnrollmentQrMembers
  return <div />;
}
```

---
