# `mfa-sms-list` Screen

> This screen represents the **MfaSmsList** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaSmsListInstance } from '@auth0/auth0-acul-react/mfa-sms-list';

const screen = useMfaSmsListInstance(); // typed as MfaSmsListMembers
// Selects a phone number from the list of enrolled phone numbers.
screen.selectPhoneNumber({ /* args */ });

// Navigates back to the previous screen.
screen.backAction({ /* args */ });
```

### Partial import
```tsx
import { useMfaSmsListInstance } from '@auth0/auth0-acul-react';

const screen = useMfaSmsListInstance(); // typed as MfaSmsListMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaSmsListProvider, useMfaSmsListContext } from '@auth0/auth0-acul-react/mfa-sms-list';

function App() {
  return (
    <MfaSmsListProvider>
      <ScreenComponent />
    </MfaSmsListProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaSmsListContext(); // typed as MfaSmsListMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaSmsListProvider, useMfaSmsListContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaSmsListProvider>
      <ScreenComponent />
    </MfaSmsListProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaSmsListContext(); // typed as MfaSmsListMembers
  return <div />;
}
```

---
