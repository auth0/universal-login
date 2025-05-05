# `mfa-begin-enroll-options` Screen

> This screen represents the **MfaBeginEnrollOptions** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaBeginEnrollOptionsInstance } from '@auth0/auth0-acul-react/mfa-begin-enroll-options';

const screen = useMfaBeginEnrollOptionsInstance(); // typed as MfaBeginEnrollOptionsMembers
// Continues the enrollment process with the selected factor
screen.enroll({ /* args */ });
```

### Partial import
```tsx
import { useMfaBeginEnrollOptionsInstance } from '@auth0/auth0-acul-react';

const screen = useMfaBeginEnrollOptionsInstance(); // typed as MfaBeginEnrollOptionsMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaBeginEnrollOptionsProvider, useMfaBeginEnrollOptionsContext } from '@auth0/auth0-acul-react/mfa-begin-enroll-options';

function App() {
  return (
    <MfaBeginEnrollOptionsProvider>
      <ScreenComponent />
    </MfaBeginEnrollOptionsProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaBeginEnrollOptionsContext(); // typed as MfaBeginEnrollOptionsMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaBeginEnrollOptionsProvider, useMfaBeginEnrollOptionsContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaBeginEnrollOptionsProvider>
      <ScreenComponent />
    </MfaBeginEnrollOptionsProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaBeginEnrollOptionsContext(); // typed as MfaBeginEnrollOptionsMembers
  return <div />;
}
```

---
