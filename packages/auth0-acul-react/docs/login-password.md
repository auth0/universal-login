---
title: login-password
sidebar_label: LoginPassword
---

# `login-password` Screen

> This screen represents the **LoginPassword** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useLoginPassword()`

This creates a new `LoginPassword` instance:

```tsx
import { useLoginPassword } from '@auth0/auth0-acul-react/login-password';

const screen = useLoginPassword(); // typed as LoginPasswordMembers
screen.login({ identifier: 'user@example.com', password: '***' });
```

> View [`LoginPasswordMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordMembers.html) — this interface describes all properties and methods exposed by the `LoginPassword` screen.

---

## 🔹 Provider Usage

Wrap your component tree using the screen-specific provider:

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/login-password';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance anywhere via context:

```tsx
const screen = useCurrentScreen(); // typed as LoginPasswordMembers
```

> View [`LoginPasswordMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordMembers.html) — this interface describes all properties and methods exposed by the `LoginPassword` screen.

---

## 🔹 Interface Usage

The following interfaces and types are available for `LoginPassword`:

**Import:**

```ts
import type {
  default,
  LoginPasswordMembers,
  LoginPasswordOptions,
  ScreenMembersOnLoginPassword,
  TransactionMembersOnLoginPassword,
  CaptchaContext,
  PhonePrefix,
  Connection,
  EnterpriseConnection,
  PasswordPolicy,
  UsernamePolicy,
  Error,
  PasswordComplexityRule,
  BrandingSettings,
  BrandingThemes,
  CustomOptions,
  ShortEntity,
  ClientMembers,
  BrandingMembers,
  PromptMembers,
  UserMembers,
  OrganizationMembers,
  ScreenMembers,
  TenantMembers,
  TransactionMembers,
  UntrustedDataMembers
} from '@auth0/auth0-acul-react/login-password';
```

---

## 🔸 API References

This section includes all the relevant types and interfaces for this screen. Use them for typing props, payloads, and extending behaviors.

**Screen Class Reference:**  
- [`LoginPasswordMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordMembers.html) — this interface describes all properties and methods exposed by the `LoginPassword` screen.

**Interfaces:**
- [`LoginPasswordMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordMembers.html)
- [`LoginPasswordOptions`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordOptions.html)
- [`ScreenMembersOnLoginPassword`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnLoginPassword.html)
- [`TransactionMembersOnLoginPassword`](https://auth0.github.io/universal-login/interfaces/Classes.TransactionMembersOnLoginPassword.html)
- [`CaptchaContext`](https://auth0.github.io/universal-login/interfaces/Classes.CaptchaContext.html)
- [`PhonePrefix`](https://auth0.github.io/universal-login/interfaces/Classes.PhonePrefix.html)
- [`Connection`](https://auth0.github.io/universal-login/interfaces/Classes.Connection.html)
- [`EnterpriseConnection`](https://auth0.github.io/universal-login/interfaces/Classes.EnterpriseConnection.html)
- [`PasswordPolicy`](https://auth0.github.io/universal-login/interfaces/Classes.PasswordPolicy.html)
- [`UsernamePolicy`](https://auth0.github.io/universal-login/interfaces/Classes.UsernamePolicy.html)
- [`Error`](https://auth0.github.io/universal-login/interfaces/Classes.Error.html)
- [`PasswordComplexityRule`](https://auth0.github.io/universal-login/interfaces/Classes.PasswordComplexityRule.html)
- [`BrandingSettings`](https://auth0.github.io/universal-login/interfaces/Classes.BrandingSettings.html)
- [`BrandingThemes`](https://auth0.github.io/universal-login/interfaces/Classes.BrandingThemes.html)
- [`CustomOptions`](https://auth0.github.io/universal-login/interfaces/Classes.CustomOptions.html)
- [`ClientMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ClientMembers.html)
- [`BrandingMembers`](https://auth0.github.io/universal-login/interfaces/Classes.BrandingMembers.html)
- [`PromptMembers`](https://auth0.github.io/universal-login/interfaces/Classes.PromptMembers.html)
- [`UserMembers`](https://auth0.github.io/universal-login/interfaces/Classes.UserMembers.html)
- [`OrganizationMembers`](https://auth0.github.io/universal-login/interfaces/Classes.OrganizationMembers.html)
- [`ScreenMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembers.html)
- [`TenantMembers`](https://auth0.github.io/universal-login/interfaces/Classes.TenantMembers.html)
- [`TransactionMembers`](https://auth0.github.io/universal-login/interfaces/Classes.TransactionMembers.html)
- [`UntrustedDataMembers`](https://auth0.github.io/universal-login/interfaces/Classes.UntrustedDataMembers.html)


**Types:**
- [`ShortEntity`](https://auth0.github.io/universal-login/types/Classes.ShortEntity.html)
