# `mfa-enroll-result` Screen

> This screen represents the **MfaEnrollResult** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaEnrollResultInstance } from '@auth0/auth0-acul-react/mfa-enroll-result';

const screen = useMfaEnrollResultInstance(); // typed as MfaEnrollResultMembers
// invoke screen methods here
```

### Partial import
```tsx
import { useMfaEnrollResultInstance } from '@auth0/auth0-acul-react';

const screen = useMfaEnrollResultInstance(); // typed as MfaEnrollResultMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaEnrollResultProvider, useMfaEnrollResultContext } from '@auth0/auth0-acul-react/mfa-enroll-result';

function App() {
  return (
    <MfaEnrollResultProvider>
      <ScreenComponent />
    </MfaEnrollResultProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaEnrollResultContext(); // typed as MfaEnrollResultMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaEnrollResultProvider, useMfaEnrollResultContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaEnrollResultProvider>
      <ScreenComponent />
    </MfaEnrollResultProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaEnrollResultContext(); // typed as MfaEnrollResultMembers
  return <div />;
}
```

---
