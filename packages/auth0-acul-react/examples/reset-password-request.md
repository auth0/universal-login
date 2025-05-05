# `reset-password-request` Screen

> This screen represents the **ResetPasswordRequest** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useResetPasswordRequestInstance } from '@auth0/auth0-acul-react/reset-password-request';

const screen = useResetPasswordRequestInstance(); // typed as ResetPasswordRequestMembers

screen.resetPassword({ screen: '<screen>', transaction: '<transaction>' });


screen.backToLogin({ screen: '<screen>', transaction: '<transaction>' });
```

### Partial import
```tsx
import { useResetPasswordRequestInstance } from '@auth0/auth0-acul-react';

const screen = useResetPasswordRequestInstance(); // typed as ResetPasswordRequestMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { ResetPasswordRequestProvider, useResetPasswordRequestContext } from '@auth0/auth0-acul-react/reset-password-request';

function App() {
  return (
    <ResetPasswordRequestProvider>
      <ScreenComponent />
    </ResetPasswordRequestProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordRequestContext(); // typed as ResetPasswordRequestMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { ResetPasswordRequestProvider, useResetPasswordRequestContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <ResetPasswordRequestProvider>
      <ScreenComponent />
    </ResetPasswordRequestProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordRequestContext(); // typed as ResetPasswordRequestMembers
  return <div />;
}
```

---
