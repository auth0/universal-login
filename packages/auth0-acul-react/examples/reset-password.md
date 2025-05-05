# `reset-password` Screen

> This screen represents the **ResetPassword** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useResetPasswordInstance } from '@auth0/auth0-acul-react/reset-password';

const screen = useResetPasswordInstance(); // typed as ResetPasswordMembers

screen.resetPassword({ screen: '<screen>' });
```

### Partial import
```tsx
import { useResetPasswordInstance } from '@auth0/auth0-acul-react';

const screen = useResetPasswordInstance(); // typed as ResetPasswordMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { ResetPasswordProvider, useResetPasswordContext } from '@auth0/auth0-acul-react/reset-password';

function App() {
  return (
    <ResetPasswordProvider>
      <ScreenComponent />
    </ResetPasswordProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordContext(); // typed as ResetPasswordMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { ResetPasswordProvider, useResetPasswordContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <ResetPasswordProvider>
      <ScreenComponent />
    </ResetPasswordProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordContext(); // typed as ResetPasswordMembers
  return <div />;
}
```

---
