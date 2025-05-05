# `mfa-country-codes` Screen

> This screen represents the **MfaCountryCodes** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaCountryCodesInstance } from '@auth0/auth0-acul-react/mfa-country-codes';

const screen = useMfaCountryCodesInstance(); // typed as MfaCountryCodesMembers
// Selects a country code from the available options
screen.selectCountryCode({ screen: '<screen>' });

// Navigates back to the previous screen
screen.goBack({ screen: '<screen>' });
```

### Partial import
```tsx
import { useMfaCountryCodesInstance } from '@auth0/auth0-acul-react';

const screen = useMfaCountryCodesInstance(); // typed as MfaCountryCodesMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaCountryCodesProvider, useMfaCountryCodesContext } from '@auth0/auth0-acul-react/mfa-country-codes';

function App() {
  return (
    <MfaCountryCodesProvider>
      <ScreenComponent />
    </MfaCountryCodesProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaCountryCodesContext(); // typed as MfaCountryCodesMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaCountryCodesProvider, useMfaCountryCodesContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaCountryCodesProvider>
      <ScreenComponent />
    </MfaCountryCodesProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaCountryCodesContext(); // typed as MfaCountryCodesMembers
  return <div />;
}
```

---
