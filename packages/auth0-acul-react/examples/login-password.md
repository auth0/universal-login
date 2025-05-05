# `login-password` Screen

> This screen represents the **LoginPassword** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useLoginPasswordInstance } from '@auth0/auth0-acul-react/login-password';

const screen = useLoginPasswordInstance(); // typed as LoginPasswordMembers

screen.login({ screen: '<screen>' });
```

### Partial import
```tsx
import { useLoginPasswordInstance } from '@auth0/auth0-acul-react';

const screen = useLoginPasswordInstance(); // typed as LoginPasswordMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { LoginPasswordProvider, useLoginPasswordContext } from '@auth0/auth0-acul-react/login-password';

function App() {
  return (
    <LoginPasswordProvider>
      <ScreenComponent />
    </LoginPasswordProvider>
  );
}

function ScreenComponent() {
  const screen = useLoginPasswordContext(); // typed as LoginPasswordMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { LoginPasswordProvider, useLoginPasswordContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <LoginPasswordProvider>
      <ScreenComponent />
    </LoginPasswordProvider>
  );
}

function ScreenComponent() {
  const screen = useLoginPasswordContext(); // typed as LoginPasswordMembers
  return <div />;
}
```

---
