# `mfa-voice-enrollment` Screen

> This screen represents the **MfaVoiceEnrollment** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaVoiceEnrollmentInstance } from '@auth0/auth0-acul-react/mfa-voice-enrollment';

const screen = useMfaVoiceEnrollmentInstance(); // typed as MfaVoiceEnrollmentMembers
// Continues with the default action.
screen.continue({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });

// Allows trying another authentication method
screen.tryAnotherMethod({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });

// Allows picking a country code for the phone number
screen.selectPhoneCountryCode({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });
```

### Partial import
```tsx
import { useMfaVoiceEnrollmentInstance } from '@auth0/auth0-acul-react';

const screen = useMfaVoiceEnrollmentInstance(); // typed as MfaVoiceEnrollmentMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaVoiceEnrollmentProvider, useMfaVoiceEnrollmentContext } from '@auth0/auth0-acul-react/mfa-voice-enrollment';

function App() {
  return (
    <MfaVoiceEnrollmentProvider>
      <ScreenComponent />
    </MfaVoiceEnrollmentProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaVoiceEnrollmentContext(); // typed as MfaVoiceEnrollmentMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaVoiceEnrollmentProvider, useMfaVoiceEnrollmentContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaVoiceEnrollmentProvider>
      <ScreenComponent />
    </MfaVoiceEnrollmentProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaVoiceEnrollmentContext(); // typed as MfaVoiceEnrollmentMembers
  return <div />;
}
```

---
