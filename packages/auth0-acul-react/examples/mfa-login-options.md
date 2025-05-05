# `mfa-login-options` Screen

> This screen represents the **MfaLoginOptions** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaLoginOptionsInstance } from '@auth0/auth0-acul-react/mfa-login-options';

const screen = useMfaLoginOptionsInstance(); // typed as MfaLoginOptionsMembers
// Continues the login process with the selected MFA factor
screen.enroll({ /* args */ });
```

### Partial import
```tsx
import { useMfaLoginOptionsInstance } from '@auth0/auth0-acul-react';

const screen = useMfaLoginOptionsInstance(); // typed as MfaLoginOptionsMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaLoginOptionsProvider, useMfaLoginOptionsContext } from '@auth0/auth0-acul-react/mfa-login-options';

function App() {
  return (
    <MfaLoginOptionsProvider>
      <ScreenComponent />
    </MfaLoginOptionsProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaLoginOptionsContext(); // typed as MfaLoginOptionsMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaLoginOptionsProvider, useMfaLoginOptionsContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaLoginOptionsProvider>
      <ScreenComponent />
    </MfaLoginOptionsProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaLoginOptionsContext(); // typed as MfaLoginOptionsMembers
  return <div />;
}
```

---
