# `device-code-activation` Screen

> This screen represents the **DeviceCodeActivation** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useDeviceCodeActivationInstance } from '@auth0/auth0-acul-react/device-code-activation';

const screen = useDeviceCodeActivationInstance(); // typed as DeviceCodeActivationMembers
// Submits the device code entered by the user.
This action is triggered when the user enters the code displayed on their device and submits the form.
screen.continue({ /* args */ });
```

### Partial import
```tsx
import { useDeviceCodeActivationInstance } from '@auth0/auth0-acul-react';

const screen = useDeviceCodeActivationInstance(); // typed as DeviceCodeActivationMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { DeviceCodeActivationProvider, useDeviceCodeActivationContext } from '@auth0/auth0-acul-react/device-code-activation';

function App() {
  return (
    <DeviceCodeActivationProvider>
      <ScreenComponent />
    </DeviceCodeActivationProvider>
  );
}

function ScreenComponent() {
  const screen = useDeviceCodeActivationContext(); // typed as DeviceCodeActivationMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { DeviceCodeActivationProvider, useDeviceCodeActivationContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <DeviceCodeActivationProvider>
      <ScreenComponent />
    </DeviceCodeActivationProvider>
  );
}

function ScreenComponent() {
  const screen = useDeviceCodeActivationContext(); // typed as DeviceCodeActivationMembers
  return <div />;
}
```

---
