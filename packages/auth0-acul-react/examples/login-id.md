# `login-id` Screen

> This screen represents the **LoginId** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useLoginIdInstance } from '@auth0/auth0-acul-react/login-id';

const screen = useLoginIdInstance(); // typed as LoginIdMembers

screen.login({ screen: '<screen>' });


screen.socialLogin({ screen: '<screen>' });


screen.passkeyLogin({ screen: '<screen>' });


screen.pickCountryCode({ screen: '<screen>' });
```

### Partial import
```tsx
import { useLoginIdInstance } from '@auth0/auth0-acul-react';

const screen = useLoginIdInstance(); // typed as LoginIdMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { LoginIdProvider, useLoginIdContext } from '@auth0/auth0-acul-react/login-id';

function App() {
  return (
    <LoginIdProvider>
      <ScreenComponent />
    </LoginIdProvider>
  );
}

function ScreenComponent() {
  const screen = useLoginIdContext(); // typed as LoginIdMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { LoginIdProvider, useLoginIdContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <LoginIdProvider>
      <ScreenComponent />
    </LoginIdProvider>
  );
}

function ScreenComponent() {
  const screen = useLoginIdContext(); // typed as LoginIdMembers
  return <div />;
}
```

---
