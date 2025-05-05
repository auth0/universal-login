# `mfa-detect-browser-capabilities` Screen

> This screen represents the **MfaDetectBrowserCapabilities** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaDetectBrowserCapabilitiesInstance } from '@auth0/auth0-acul-react/mfa-detect-browser-capabilities';

const screen = useMfaDetectBrowserCapabilitiesInstance(); // typed as MfaDetectBrowserCapabilitiesMembers
// Picks an authenticator based on browser capabilities
screen.detectCapabilities({ /* args */ });
```

### Partial import
```tsx
import { useMfaDetectBrowserCapabilitiesInstance } from '@auth0/auth0-acul-react';

const screen = useMfaDetectBrowserCapabilitiesInstance(); // typed as MfaDetectBrowserCapabilitiesMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaDetectBrowserCapabilitiesProvider, useMfaDetectBrowserCapabilitiesContext } from '@auth0/auth0-acul-react/mfa-detect-browser-capabilities';

function App() {
  return (
    <MfaDetectBrowserCapabilitiesProvider>
      <ScreenComponent />
    </MfaDetectBrowserCapabilitiesProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaDetectBrowserCapabilitiesContext(); // typed as MfaDetectBrowserCapabilitiesMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaDetectBrowserCapabilitiesProvider, useMfaDetectBrowserCapabilitiesContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaDetectBrowserCapabilitiesProvider>
      <ScreenComponent />
    </MfaDetectBrowserCapabilitiesProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaDetectBrowserCapabilitiesContext(); // typed as MfaDetectBrowserCapabilitiesMembers
  return <div />;
}
```

---
