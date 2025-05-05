# `mfa-email-list` Screen

> This screen represents the **MfaEmailList** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaEmailListInstance } from '@auth0/auth0-acul-react/mfa-email-list';

const screen = useMfaEmailListInstance(); // typed as MfaEmailListMembers
// Selects an enrolled email address from the list
screen.selectMfaEmail({ /* args */ });

// Navigates back to the previous screen
screen.goBack({ /* args */ });
```

### Partial import
```tsx
import { useMfaEmailListInstance } from '@auth0/auth0-acul-react';

const screen = useMfaEmailListInstance(); // typed as MfaEmailListMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaEmailListProvider, useMfaEmailListContext } from '@auth0/auth0-acul-react/mfa-email-list';

function App() {
  return (
    <MfaEmailListProvider>
      <ScreenComponent />
    </MfaEmailListProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaEmailListContext(); // typed as MfaEmailListMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaEmailListProvider, useMfaEmailListContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaEmailListProvider>
      <ScreenComponent />
    </MfaEmailListProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaEmailListContext(); // typed as MfaEmailListMembers
  return <div />;
}
```

---
