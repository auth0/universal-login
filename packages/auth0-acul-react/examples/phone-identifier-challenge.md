# `phone-identifier-challenge` Screen

> This screen represents the **PhoneIdentifierChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { usePhoneIdentifierChallengeInstance } from '@auth0/auth0-acul-react/phone-identifier-challenge';

const screen = usePhoneIdentifierChallengeInstance(); // typed as PhoneIdentifierChallengeMembers

screen.submitPhoneChallenge({ screen: '<screen>' });


screen.resendCode({ screen: '<screen>' });


screen.returnToPrevious({ screen: '<screen>' });
```

### Partial import
```tsx
import { usePhoneIdentifierChallengeInstance } from '@auth0/auth0-acul-react';

const screen = usePhoneIdentifierChallengeInstance(); // typed as PhoneIdentifierChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { PhoneIdentifierChallengeProvider, usePhoneIdentifierChallengeContext } from '@auth0/auth0-acul-react/phone-identifier-challenge';

function App() {
  return (
    <PhoneIdentifierChallengeProvider>
      <ScreenComponent />
    </PhoneIdentifierChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = usePhoneIdentifierChallengeContext(); // typed as PhoneIdentifierChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { PhoneIdentifierChallengeProvider, usePhoneIdentifierChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <PhoneIdentifierChallengeProvider>
      <ScreenComponent />
    </PhoneIdentifierChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = usePhoneIdentifierChallengeContext(); // typed as PhoneIdentifierChallengeMembers
  return <div />;
}
```

---
