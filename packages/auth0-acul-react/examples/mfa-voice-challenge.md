# `mfa-voice-challenge` Screen

> This screen represents the **MfaVoiceChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaVoiceChallengeInstance } from '@auth0/auth0-acul-react/mfa-voice-challenge';

const screen = useMfaVoiceChallengeInstance(); // typed as MfaVoiceChallengeMembers
// Submits the voice verification code to validate the MFA challenge.
screen.continue({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Navigates to the screen for selecting a different phone number.
screen.pickPhone({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Switches to SMS verification method instead of voice call.
screen.switchToSms({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Requests a new voice call with a verification code.
screen.resendCode({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Navigates to the screen for selecting an alternative MFA method.
screen.tryAnotherMethod({ screen: '<screen>', untrustedData: '<untrustedData>' });
```

### Partial import
```tsx
import { useMfaVoiceChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useMfaVoiceChallengeInstance(); // typed as MfaVoiceChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaVoiceChallengeProvider, useMfaVoiceChallengeContext } from '@auth0/auth0-acul-react/mfa-voice-challenge';

function App() {
  return (
    <MfaVoiceChallengeProvider>
      <ScreenComponent />
    </MfaVoiceChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaVoiceChallengeContext(); // typed as MfaVoiceChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaVoiceChallengeProvider, useMfaVoiceChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaVoiceChallengeProvider>
      <ScreenComponent />
    </MfaVoiceChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaVoiceChallengeContext(); // typed as MfaVoiceChallengeMembers
  return <div />;
}
```

---
