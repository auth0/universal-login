# `signup-password` Screen

> This screen represents the **SignupPassword** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useSignupPasswordInstance } from '@auth0/auth0-acul-react/signup-password';

const screen = useSignupPasswordInstance(); // typed as SignupPasswordMembers

screen.signup({ screen: '<screen>', transaction: '<transaction>' });
```

### Partial import
```tsx
import { useSignupPasswordInstance } from '@auth0/auth0-acul-react';

const screen = useSignupPasswordInstance(); // typed as SignupPasswordMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { SignupPasswordProvider, useSignupPasswordContext } from '@auth0/auth0-acul-react/signup-password';

function App() {
  return (
    <SignupPasswordProvider>
      <ScreenComponent />
    </SignupPasswordProvider>
  );
}

function ScreenComponent() {
  const screen = useSignupPasswordContext(); // typed as SignupPasswordMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { SignupPasswordProvider, useSignupPasswordContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <SignupPasswordProvider>
      <ScreenComponent />
    </SignupPasswordProvider>
  );
}

function ScreenComponent() {
  const screen = useSignupPasswordContext(); // typed as SignupPasswordMembers
  return <div />;
}
```

---
