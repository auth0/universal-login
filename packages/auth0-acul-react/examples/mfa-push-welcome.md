# `mfa-push-welcome` Screen

> This screen represents the **MfaPushWelcome** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaPushWelcomeInstance } from '@auth0/auth0-acul-react/mfa-push-welcome';

const screen = useMfaPushWelcomeInstance(); // typed as MfaPushWelcomeMembers
// Navigates to the enrollment screen.
screen.enroll({ screen: '<screen>' });

// Navigates to the authenticator selection screen.
screen.pickAuthenticator({ screen: '<screen>' });
```

### Partial import
```tsx
import { useMfaPushWelcomeInstance } from '@auth0/auth0-acul-react';

const screen = useMfaPushWelcomeInstance(); // typed as MfaPushWelcomeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaPushWelcomeProvider, useMfaPushWelcomeContext } from '@auth0/auth0-acul-react/mfa-push-welcome';

function App() {
  return (
    <MfaPushWelcomeProvider>
      <ScreenComponent />
    </MfaPushWelcomeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaPushWelcomeContext(); // typed as MfaPushWelcomeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaPushWelcomeProvider, useMfaPushWelcomeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaPushWelcomeProvider>
      <ScreenComponent />
    </MfaPushWelcomeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaPushWelcomeContext(); // typed as MfaPushWelcomeMembers
  return <div />;
}
```

---
