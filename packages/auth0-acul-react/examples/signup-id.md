# `signup-id` Screen

> This screen represents the **SignupId** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useSignupIdInstance } from '@auth0/auth0-acul-react/signup-id';

const screen = useSignupIdInstance(); // typed as SignupIdMembers

screen.signup({ screen: '<screen>', transaction: '<transaction>' });


screen.socialSignup({ screen: '<screen>', transaction: '<transaction>' });
```

### Partial import
```tsx
import { useSignupIdInstance } from '@auth0/auth0-acul-react';

const screen = useSignupIdInstance(); // typed as SignupIdMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { SignupIdProvider, useSignupIdContext } from '@auth0/auth0-acul-react/signup-id';

function App() {
  return (
    <SignupIdProvider>
      <ScreenComponent />
    </SignupIdProvider>
  );
}

function ScreenComponent() {
  const screen = useSignupIdContext(); // typed as SignupIdMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { SignupIdProvider, useSignupIdContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <SignupIdProvider>
      <ScreenComponent />
    </SignupIdProvider>
  );
}

function ScreenComponent() {
  const screen = useSignupIdContext(); // typed as SignupIdMembers
  return <div />;
}
```

---
