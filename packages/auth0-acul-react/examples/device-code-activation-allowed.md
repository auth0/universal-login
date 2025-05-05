# `device-code-activation-allowed` Screen

> This screen represents the **DeviceCodeActivationAllowed** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useDeviceCodeActivationAllowedInstance } from '@auth0/auth0-acul-react/device-code-activation-allowed';

const screen = useDeviceCodeActivationAllowedInstance(); // typed as DeviceCodeActivationAllowedMembers
// invoke screen methods here
```

### Partial import
```tsx
import { useDeviceCodeActivationAllowedInstance } from '@auth0/auth0-acul-react';

const screen = useDeviceCodeActivationAllowedInstance(); // typed as DeviceCodeActivationAllowedMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { DeviceCodeActivationAllowedProvider, useDeviceCodeActivationAllowedContext } from '@auth0/auth0-acul-react/device-code-activation-allowed';

function App() {
  return (
    <DeviceCodeActivationAllowedProvider>
      <ScreenComponent />
    </DeviceCodeActivationAllowedProvider>
  );
}

function ScreenComponent() {
  const screen = useDeviceCodeActivationAllowedContext(); // typed as DeviceCodeActivationAllowedMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { DeviceCodeActivationAllowedProvider, useDeviceCodeActivationAllowedContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <DeviceCodeActivationAllowedProvider>
      <ScreenComponent />
    </DeviceCodeActivationAllowedProvider>
  );
}

function ScreenComponent() {
  const screen = useDeviceCodeActivationAllowedContext(); // typed as DeviceCodeActivationAllowedMembers
  return <div />;
}
```

---
