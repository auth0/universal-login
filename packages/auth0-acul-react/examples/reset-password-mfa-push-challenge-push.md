# `reset-password-mfa-push-challenge-push` Screen

> This screen represents the **ResetPasswordMfaPushChallengePush** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useResetPasswordMfaPushChallengePushInstance } from '@auth0/auth0-acul-react/reset-password-mfa-push-challenge-push';

const screen = useResetPasswordMfaPushChallengePushInstance(); // typed as ResetPasswordMfaPushChallengePushMembers
// Continues with the push notification challenge
screen.continue({ screen: '<screen>' });

// Re-sends the push notification
screen.resendPushNotification({ screen: '<screen>' });

// Switches to entering the verification code manually
screen.enterCodeManually({ screen: '<screen>' });

// Allows trying another authentication method
screen.tryAnotherMethod({ screen: '<screen>' });
```

### Partial import
```tsx
import { useResetPasswordMfaPushChallengePushInstance } from '@auth0/auth0-acul-react';

const screen = useResetPasswordMfaPushChallengePushInstance(); // typed as ResetPasswordMfaPushChallengePushMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { ResetPasswordMfaPushChallengePushProvider, useResetPasswordMfaPushChallengePushContext } from '@auth0/auth0-acul-react/reset-password-mfa-push-challenge-push';

function App() {
  return (
    <ResetPasswordMfaPushChallengePushProvider>
      <ScreenComponent />
    </ResetPasswordMfaPushChallengePushProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaPushChallengePushContext(); // typed as ResetPasswordMfaPushChallengePushMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { ResetPasswordMfaPushChallengePushProvider, useResetPasswordMfaPushChallengePushContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <ResetPasswordMfaPushChallengePushProvider>
      <ScreenComponent />
    </ResetPasswordMfaPushChallengePushProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaPushChallengePushContext(); // typed as ResetPasswordMfaPushChallengePushMembers
  return <div />;
}
```

---
