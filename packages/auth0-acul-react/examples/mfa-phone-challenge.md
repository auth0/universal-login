# `mfa-phone-challenge` Screen

> This screen represents the **MfaPhoneChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaPhoneChallengeInstance } from '@auth0/auth0-acul-react/mfa-phone-challenge';

const screen = useMfaPhoneChallengeInstance(); // typed as MfaPhoneChallengeMembers
// Submits the user's choice of receiving the MFA code via SMS or voice call.
It uses the phone number provided in the screen context.
screen.continue({ screen: '<screen>' });

// Initiates the process for the user to select a different phone number (if applicable).
This typically triggers a navigation to a phone selection screen.
screen.pickPhone({ screen: '<screen>' });

// Allows the user to choose a different MFA method (e.g., OTP, Recovery Code).
This typically triggers navigation to the authenticator selection screen.
screen.tryAnotherMethod({ screen: '<screen>' });
```

### Partial import
```tsx
import { useMfaPhoneChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useMfaPhoneChallengeInstance(); // typed as MfaPhoneChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaPhoneChallengeProvider, useMfaPhoneChallengeContext } from '@auth0/auth0-acul-react/mfa-phone-challenge';

function App() {
  return (
    <MfaPhoneChallengeProvider>
      <ScreenComponent />
    </MfaPhoneChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaPhoneChallengeContext(); // typed as MfaPhoneChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaPhoneChallengeProvider, useMfaPhoneChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaPhoneChallengeProvider>
      <ScreenComponent />
    </MfaPhoneChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaPhoneChallengeContext(); // typed as MfaPhoneChallengeMembers
  return <div />;
}
```

---
