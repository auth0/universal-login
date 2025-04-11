---
title: accept-invitation
sidebar_label: AcceptInvitation
---

# `accept-invitation`

This screen represents **AcceptInvitation**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useAcceptInvitation()`

This gives you a new `AcceptInvitation` instance:

```tsx
import { useAcceptInvitation } from '@auth0/auth0-acul-react/accept-invitation';

const screen = useAcceptInvitation();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/accept-invitation';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as AcceptInvitation
```

---

## 🔹 Interface Usage

```ts
import type {
  AcceptInvitationOptions,
  AcceptInvitationProperties,
  AcceptInvitationScreenData
} from '@auth0/auth0-acul-react/accept-invitation';
```

> These types are re-exported from `auth0-acul-js/accept-invitation`

---

## ✅ Summary

- `useAcceptInvitation()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
