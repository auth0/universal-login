# `device-code-activation-denied` Screen

> This screen represents the **DeviceCodeActivationDenied** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useDeviceCodeActivationDeniedInstance } from '@auth0/auth0-acul-react/device-code-activation-denied';

const screen = useDeviceCodeActivationDeniedInstance(); // typed as DeviceCodeActivationDeniedMembers
// invoke screen methods here
```

### Partial import
```tsx
import { useDeviceCodeActivationDeniedInstance } from '@auth0/auth0-acul-react';

const screen = useDeviceCodeActivationDeniedInstance(); // typed as DeviceCodeActivationDeniedMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { DeviceCodeActivationDeniedProvider, useDeviceCodeActivationDeniedContext } from '@auth0/auth0-acul-react/device-code-activation-denied';

function App() {
  return (
    <DeviceCodeActivationDeniedProvider>
      <ScreenComponent />
    </DeviceCodeActivationDeniedProvider>
  );
}

function ScreenComponent() {
  const screen = useDeviceCodeActivationDeniedContext(); // typed as DeviceCodeActivationDeniedMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { DeviceCodeActivationDeniedProvider, useDeviceCodeActivationDeniedContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <DeviceCodeActivationDeniedProvider>
      <ScreenComponent />
    </DeviceCodeActivationDeniedProvider>
  );
}

function ScreenComponent() {
  const screen = useDeviceCodeActivationDeniedContext(); // typed as DeviceCodeActivationDeniedMembers
  return <div />;
}
```

---
