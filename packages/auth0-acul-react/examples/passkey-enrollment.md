# `passkey-enrollment` Screen

> This screen represents the **PasskeyEnrollment** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { usePasskeyEnrollmentInstance } from '@auth0/auth0-acul-react/passkey-enrollment';

const screen = usePasskeyEnrollmentInstance(); // typed as PasskeyEnrollmentMembers

screen.continuePasskeyEnrollment({ screen: '<screen>' });


screen.abortPasskeyEnrollment({ screen: '<screen>' });
```

### Partial import
```tsx
import { usePasskeyEnrollmentInstance } from '@auth0/auth0-acul-react';

const screen = usePasskeyEnrollmentInstance(); // typed as PasskeyEnrollmentMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { PasskeyEnrollmentProvider, usePasskeyEnrollmentContext } from '@auth0/auth0-acul-react/passkey-enrollment';

function App() {
  return (
    <PasskeyEnrollmentProvider>
      <ScreenComponent />
    </PasskeyEnrollmentProvider>
  );
}

function ScreenComponent() {
  const screen = usePasskeyEnrollmentContext(); // typed as PasskeyEnrollmentMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { PasskeyEnrollmentProvider, usePasskeyEnrollmentContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <PasskeyEnrollmentProvider>
      <ScreenComponent />
    </PasskeyEnrollmentProvider>
  );
}

function ScreenComponent() {
  const screen = usePasskeyEnrollmentContext(); // typed as PasskeyEnrollmentMembers
  return <div />;
}
```

---
