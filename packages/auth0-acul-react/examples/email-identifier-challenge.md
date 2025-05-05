# `email-identifier-challenge` Screen

> This screen represents the **EmailIdentifierChallenge** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useEmailIdentifierChallengeInstance } from '@auth0/auth0-acul-react/email-identifier-challenge';

const screen = useEmailIdentifierChallengeInstance(); // typed as EmailIdentifierChallengeMembers

screen.submitEmailChallenge({ screen: '<screen>' });


screen.resendCode({ screen: '<screen>' });


screen.returnToPrevious({ screen: '<screen>' });
```

### Partial import
```tsx
import { useEmailIdentifierChallengeInstance } from '@auth0/auth0-acul-react';

const screen = useEmailIdentifierChallengeInstance(); // typed as EmailIdentifierChallengeMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { EmailIdentifierChallengeProvider, useEmailIdentifierChallengeContext } from '@auth0/auth0-acul-react/email-identifier-challenge';

function App() {
  return (
    <EmailIdentifierChallengeProvider>
      <ScreenComponent />
    </EmailIdentifierChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useEmailIdentifierChallengeContext(); // typed as EmailIdentifierChallengeMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { EmailIdentifierChallengeProvider, useEmailIdentifierChallengeContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <EmailIdentifierChallengeProvider>
      <ScreenComponent />
    </EmailIdentifierChallengeProvider>
  );
}

function ScreenComponent() {
  const screen = useEmailIdentifierChallengeContext(); // typed as EmailIdentifierChallengeMembers
  return <div />;
}
```

---
