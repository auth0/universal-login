# `redeem-ticket` Screen

> This screen represents the **RedeemTicket** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useRedeemTicketInstance } from '@auth0/auth0-acul-react/redeem-ticket';

const screen = useRedeemTicketInstance(); // typed as RedeemTicketMembers
// Performs the default action on the redeem-ticket screen, usually continuing the flow.
screen.continue({ client: '<client>', organization: '<organization>', prompt: '<prompt>', screen: '<screen>', transaction: '<transaction>' });
```

### Partial import
```tsx
import { useRedeemTicketInstance } from '@auth0/auth0-acul-react';

const screen = useRedeemTicketInstance(); // typed as RedeemTicketMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { RedeemTicketProvider, useRedeemTicketContext } from '@auth0/auth0-acul-react/redeem-ticket';

function App() {
  return (
    <RedeemTicketProvider>
      <ScreenComponent />
    </RedeemTicketProvider>
  );
}

function ScreenComponent() {
  const screen = useRedeemTicketContext(); // typed as RedeemTicketMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { RedeemTicketProvider, useRedeemTicketContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <RedeemTicketProvider>
      <ScreenComponent />
    </RedeemTicketProvider>
  );
}

function ScreenComponent() {
  const screen = useRedeemTicketContext(); // typed as RedeemTicketMembers
  return <div />;
}
```

---
