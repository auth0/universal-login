# `passkey-enrollment-local` Screen

> This screen represents the **PasskeyEnrollmentLocal** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { usePasskeyEnrollmentLocalInstance } from '@auth0/auth0-acul-react/passkey-enrollment-local';

const screen = usePasskeyEnrollmentLocalInstance(); // typed as PasskeyEnrollmentLocalMembers

screen.continuePasskeyEnrollment({ screen: '<screen>' });


screen.abortPasskeyEnrollment({ screen: '<screen>' });
```

### Partial import
```tsx
import { usePasskeyEnrollmentLocalInstance } from '@auth0/auth0-acul-react';

const screen = usePasskeyEnrollmentLocalInstance(); // typed as PasskeyEnrollmentLocalMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { PasskeyEnrollmentLocalProvider, usePasskeyEnrollmentLocalContext } from '@auth0/auth0-acul-react/passkey-enrollment-local';

function App() {
  return (
    <PasskeyEnrollmentLocalProvider>
      <ScreenComponent />
    </PasskeyEnrollmentLocalProvider>
  );
}

function ScreenComponent() {
  const screen = usePasskeyEnrollmentLocalContext(); // typed as PasskeyEnrollmentLocalMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { PasskeyEnrollmentLocalProvider, usePasskeyEnrollmentLocalContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <PasskeyEnrollmentLocalProvider>
      <ScreenComponent />
    </PasskeyEnrollmentLocalProvider>
  );
}

function ScreenComponent() {
  const screen = usePasskeyEnrollmentLocalContext(); // typed as PasskeyEnrollmentLocalMembers
  return <div />;
}
```

---
