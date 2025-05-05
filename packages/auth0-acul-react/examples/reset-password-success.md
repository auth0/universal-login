# `reset-password-success` Screen

> This screen represents the **ResetPasswordSuccess** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useResetPasswordSuccessInstance } from '@auth0/auth0-acul-react/reset-password-success';

const screen = useResetPasswordSuccessInstance(); // typed as ResetPasswordSuccessMembers
// invoke screen methods here
```

### Partial import
```tsx
import { useResetPasswordSuccessInstance } from '@auth0/auth0-acul-react';

const screen = useResetPasswordSuccessInstance(); // typed as ResetPasswordSuccessMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { ResetPasswordSuccessProvider, useResetPasswordSuccessContext } from '@auth0/auth0-acul-react/reset-password-success';

function App() {
  return (
    <ResetPasswordSuccessProvider>
      <ScreenComponent />
    </ResetPasswordSuccessProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordSuccessContext(); // typed as ResetPasswordSuccessMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { ResetPasswordSuccessProvider, useResetPasswordSuccessContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <ResetPasswordSuccessProvider>
      <ScreenComponent />
    </ResetPasswordSuccessProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordSuccessContext(); // typed as ResetPasswordSuccessMembers
  return <div />;
}
```

---
