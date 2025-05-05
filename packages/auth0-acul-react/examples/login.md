# `login` Screen

> This screen represents the **Login** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useLoginInstance } from '@auth0/auth0-acul-react/login';

const screen = useLoginInstance(); // typed as LoginMembers
// Performs login with username/password
screen.login({ screen: '<screen>', transaction: '<transaction>' });

// Performs login with social provider
screen.socialLogin({ screen: '<screen>', transaction: '<transaction>' });
```

### Partial import
```tsx
import { useLoginInstance } from '@auth0/auth0-acul-react';

const screen = useLoginInstance(); // typed as LoginMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { LoginProvider, useLoginContext } from '@auth0/auth0-acul-react/login';

function App() {
  return (
    <LoginProvider>
      <ScreenComponent />
    </LoginProvider>
  );
}

function ScreenComponent() {
  const screen = useLoginContext(); // typed as LoginMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { LoginProvider, useLoginContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <LoginProvider>
      <ScreenComponent />
    </LoginProvider>
  );
}

function ScreenComponent() {
  const screen = useLoginContext(); // typed as LoginMembers
  return <div />;
}
```

---
