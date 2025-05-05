# `reset-password-error` Screen

> This screen represents the **ResetPasswordError** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useResetPasswordErrorInstance } from '@auth0/auth0-acul-react/reset-password-error';

const screen = useResetPasswordErrorInstance(); // typed as ResetPasswordErrorMembers
// invoke screen methods here
```

### Partial import
```tsx
import { useResetPasswordErrorInstance } from '@auth0/auth0-acul-react';

const screen = useResetPasswordErrorInstance(); // typed as ResetPasswordErrorMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { ResetPasswordErrorProvider, useResetPasswordErrorContext } from '@auth0/auth0-acul-react/reset-password-error';

function App() {
  return (
    <ResetPasswordErrorProvider>
      <ScreenComponent />
    </ResetPasswordErrorProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordErrorContext(); // typed as ResetPasswordErrorMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { ResetPasswordErrorProvider, useResetPasswordErrorContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <ResetPasswordErrorProvider>
      <ScreenComponent />
    </ResetPasswordErrorProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordErrorContext(); // typed as ResetPasswordErrorMembers
  return <div />;
}
```

---
