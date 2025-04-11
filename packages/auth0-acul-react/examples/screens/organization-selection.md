---
title: organization-selection
sidebar_label: OrganizationSelection
---

# `organization-selection`

This screen represents **OrganizationSelection**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useOrganizationSelection()`

This gives you a new `OrganizationSelection` instance:

```tsx
import { useOrganizationSelection } from '@auth0/auth0-acul-react/organization-selection';

const screen = useOrganizationSelection();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/organization-selection';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as OrganizationSelection
```

---

## 🔹 Interface Usage

```ts
import type {
  OrganizationSelectionOptions,
  OrganizationSelectionProperties,
  OrganizationSelectionScreenData
} from '@auth0/auth0-acul-react/organization-selection';
```

> These types are re-exported from `auth0-acul-js/organization-selection`

---

## ✅ Summary

- `useOrganizationSelection()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
