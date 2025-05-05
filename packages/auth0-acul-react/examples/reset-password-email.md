# `reset-password-email` Screen

> This screen represents the **ResetPasswordEmail** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useResetPasswordEmailInstance } from '@auth0/auth0-acul-react/reset-password-email';

const screen = useResetPasswordEmailInstance(); // typed as ResetPasswordEmailMembers

screen.resendEmail({ screen: '<screen>' });
```

### Partial import
```tsx
import { useResetPasswordEmailInstance } from '@auth0/auth0-acul-react';

const screen = useResetPasswordEmailInstance(); // typed as ResetPasswordEmailMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { ResetPasswordEmailProvider, useResetPasswordEmailContext } from '@auth0/auth0-acul-react/reset-password-email';

function App() {
  return (
    <ResetPasswordEmailProvider>
      <ScreenComponent />
    </ResetPasswordEmailProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordEmailContext(); // typed as ResetPasswordEmailMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { ResetPasswordEmailProvider, useResetPasswordEmailContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <ResetPasswordEmailProvider>
      <ScreenComponent />
    </ResetPasswordEmailProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordEmailContext(); // typed as ResetPasswordEmailMembers
  return <div />;
}
```

---
