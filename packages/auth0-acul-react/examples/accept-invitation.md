# `accept-invitation` Screen

> This screen represents the **AcceptInvitation** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useAcceptInvitationInstance } from '@auth0/auth0-acul-react/accept-invitation';

const screen = useAcceptInvitationInstance(); // typed as AcceptInvitationMembers
// Accepts the invitation to the organization.
screen.acceptInvitation({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });
```

### Partial import
```tsx
import { useAcceptInvitationInstance } from '@auth0/auth0-acul-react';

const screen = useAcceptInvitationInstance(); // typed as AcceptInvitationMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { AcceptInvitationProvider, useAcceptInvitationContext } from '@auth0/auth0-acul-react/accept-invitation';

function App() {
  return (
    <AcceptInvitationProvider>
      <ScreenComponent />
    </AcceptInvitationProvider>
  );
}

function ScreenComponent() {
  const screen = useAcceptInvitationContext(); // typed as AcceptInvitationMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { AcceptInvitationProvider, useAcceptInvitationContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <AcceptInvitationProvider>
      <ScreenComponent />
    </AcceptInvitationProvider>
  );
}

function ScreenComponent() {
  const screen = useAcceptInvitationContext(); // typed as AcceptInvitationMembers
  return <div />;
}
```

---
