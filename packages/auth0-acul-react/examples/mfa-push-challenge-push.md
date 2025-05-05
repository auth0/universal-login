# `mfa-push-challenge-push` Screen

> This screen represents the **MfaPushChallengePush** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useMfaPushChallengePushInstance } from '@auth0/auth0-acul-react/mfa-push-challenge-push';

const screen = useMfaPushChallengePushInstance(); // typed as MfaPushChallengePushMembers
// Continues with the push notification challenge
screen.continue({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Resends the push notification
screen.resendPushNotification({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Switches to entering the verification code manually
screen.enterCodeManually({ screen: '<screen>', untrustedData: '<untrustedData>' });

// Allows trying another authentication method
screen.tryAnotherMethod({ screen: '<screen>', untrustedData: '<untrustedData>' });
```

### Partial import
```tsx
import { useMfaPushChallengePushInstance } from '@auth0/auth0-acul-react';

const screen = useMfaPushChallengePushInstance(); // typed as MfaPushChallengePushMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { MfaPushChallengePushProvider, useMfaPushChallengePushContext } from '@auth0/auth0-acul-react/mfa-push-challenge-push';

function App() {
  return (
    <MfaPushChallengePushProvider>
      <ScreenComponent />
    </MfaPushChallengePushProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaPushChallengePushContext(); // typed as MfaPushChallengePushMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { MfaPushChallengePushProvider, useMfaPushChallengePushContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <MfaPushChallengePushProvider>
      <ScreenComponent />
    </MfaPushChallengePushProvider>
  );
}

function ScreenComponent() {
  const screen = useMfaPushChallengePushContext(); // typed as MfaPushChallengePushMembers
  return <div />;
}
```

---
