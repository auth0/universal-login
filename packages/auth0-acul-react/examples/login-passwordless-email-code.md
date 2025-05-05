# `login-passwordless-email-code` Screen

> This screen represents the **LoginPasswordlessEmailCode** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useLoginPasswordlessEmailCodeInstance } from '@auth0/auth0-acul-react/login-passwordless-email-code';

const screen = useLoginPasswordlessEmailCodeInstance(); // typed as LoginPasswordlessEmailCodeMembers

screen.submitCode({ screen: '<screen>' });


screen.resendCode({ screen: '<screen>' });
```

### Partial import
```tsx
import { useLoginPasswordlessEmailCodeInstance } from '@auth0/auth0-acul-react';

const screen = useLoginPasswordlessEmailCodeInstance(); // typed as LoginPasswordlessEmailCodeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { LoginPasswordlessEmailCodeProvider, useLoginPasswordlessEmailCodeContext } from '@auth0/auth0-acul-react/login-passwordless-email-code';

function App() {
  return (
    <LoginPasswordlessEmailCodeProvider>
      <ScreenComponent />
    </LoginPasswordlessEmailCodeProvider>
  );
}

function ScreenComponent() {
  const screen = useLoginPasswordlessEmailCodeContext(); // typed as LoginPasswordlessEmailCodeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { LoginPasswordlessEmailCodeProvider, useLoginPasswordlessEmailCodeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <LoginPasswordlessEmailCodeProvider>
      <ScreenComponent />
    </LoginPasswordlessEmailCodeProvider>
  );
}

function ScreenComponent() {
  const screen = useLoginPasswordlessEmailCodeContext(); // typed as LoginPasswordlessEmailCodeMembers
  return <div />;
}
```

---
