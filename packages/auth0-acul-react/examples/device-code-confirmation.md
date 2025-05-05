# `device-code-confirmation` Screen

> This screen represents the **DeviceCodeConfirmation** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useDeviceCodeConfirmationInstance } from '@auth0/auth0-acul-react/device-code-confirmation';

const screen = useDeviceCodeConfirmationInstance(); // typed as DeviceCodeConfirmationMembers
// Confirms the device code.
screen.confirm({ screen: '<screen>' });

// Cancels the device code flow.
screen.cancel({ screen: '<screen>' });
```

### Partial import
```tsx
import { useDeviceCodeConfirmationInstance } from '@auth0/auth0-acul-react';

const screen = useDeviceCodeConfirmationInstance(); // typed as DeviceCodeConfirmationMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { DeviceCodeConfirmationProvider, useDeviceCodeConfirmationContext } from '@auth0/auth0-acul-react/device-code-confirmation';

function App() {
  return (
    <DeviceCodeConfirmationProvider>
      <ScreenComponent />
    </DeviceCodeConfirmationProvider>
  );
}

function ScreenComponent() {
  const screen = useDeviceCodeConfirmationContext(); // typed as DeviceCodeConfirmationMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { DeviceCodeConfirmationProvider, useDeviceCodeConfirmationContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <DeviceCodeConfirmationProvider>
      <ScreenComponent />
    </DeviceCodeConfirmationProvider>
  );
}

function ScreenComponent() {
  const screen = useDeviceCodeConfirmationContext(); // typed as DeviceCodeConfirmationMembers
  return <div />;
}
```

---
