---
title: organization-picker
sidebar_label: OrganizationPicker
---

# `organization-picker`

This screen represents **OrganizationPicker**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useOrganizationPicker()`

This gives you a new `OrganizationPicker` instance:

```tsx
import { useOrganizationPicker } from '@auth0/auth0-acul-react/organization-picker';

const screen = useOrganizationPicker();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/organization-picker';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as OrganizationPicker
```

---

## 🔹 Interface Usage

```ts
import type {
  OrganizationPickerOptions,
  OrganizationPickerProperties,
  OrganizationPickerScreenData
} from '@auth0/auth0-acul-react/organization-picker';
```

> These types are re-exported from `auth0-acul-js/organization-picker`

---

## ✅ Summary

- `useOrganizationPicker()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
