# `signup` Screen

> This screen represents the **Signup** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useSignupInstance } from '@auth0/auth0-acul-react/signup';

const screen = useSignupInstance(); // typed as SignupMembers

screen.signup({ screen: '<screen>', transaction: '<transaction>' });

// Handles the submission of the social signup form.
screen.socialSignup({ screen: '<screen>', transaction: '<transaction>' });


screen.pickCountryCode({ screen: '<screen>', transaction: '<transaction>' });
```

### Partial import
```tsx
import { useSignupInstance } from '@auth0/auth0-acul-react';

const screen = useSignupInstance(); // typed as SignupMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { SignupProvider, useSignupContext } from '@auth0/auth0-acul-react/signup';

function App() {
  return (
    <SignupProvider>
      <ScreenComponent />
    </SignupProvider>
  );
}

function ScreenComponent() {
  const screen = useSignupContext(); // typed as SignupMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { SignupProvider, useSignupContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <SignupProvider>
      <ScreenComponent />
    </SignupProvider>
  );
}

function ScreenComponent() {
  const screen = useSignupContext(); // typed as SignupMembers
  return <div />;
}
```

---
