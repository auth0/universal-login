# `reset-password-mfa-voice-challenge` Screen

> This screen represents the **ResetPasswordMfaVoiceChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useResetPasswordMfaVoiceChallengeInstance } from '@auth0/auth0-acul-react/reset-password-mfa-voice-challenge';

const screen = useResetPasswordMfaVoiceChallengeInstance(); // typed as ResetPasswordMfaVoiceChallengeMembers
// Continues with the voice challenge using the provided code.
screen.continue({ screen: '<screen>' });

// Switches to SMS verification.
screen.switchToSms({ screen: '<screen>' });

// Resends the code via voice call.
screen.resendCode({ screen: '<screen>' });

// Allows the user to try another MFA method.
screen.tryAnotherMethod({ screen: '<screen>' });
```

### Partial import
```tsx
import { useResetPasswordMfaVoiceChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useResetPasswordMfaVoiceChallengeInstance(); // typed as ResetPasswordMfaVoiceChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { ResetPasswordMfaVoiceChallengeProvider, useResetPasswordMfaVoiceChallengeContext } from '@auth0/auth0-acul-react/reset-password-mfa-voice-challenge';

function App() {
  return (
    <ResetPasswordMfaVoiceChallengeProvider>
      <ScreenComponent />
    </ResetPasswordMfaVoiceChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaVoiceChallengeContext(); // typed as ResetPasswordMfaVoiceChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { ResetPasswordMfaVoiceChallengeProvider, useResetPasswordMfaVoiceChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <ResetPasswordMfaVoiceChallengeProvider>
      <ScreenComponent />
    </ResetPasswordMfaVoiceChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useResetPasswordMfaVoiceChallengeContext(); // typed as ResetPasswordMfaVoiceChallengeMembers
  return <div />;
}
```

---
