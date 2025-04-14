---
title: login-passwordless-email-code
sidebar_label: LoginPasswordlessEmailCode
---

# `login-passwordless-email-code` Screen

> This screen represents the **LoginPasswordlessEmailCode** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useLoginPasswordlessEmailCode()`

This creates a new `LoginPasswordlessEmailCode` instance:

```tsx
import { useLoginPasswordlessEmailCode } from '@auth0/auth0-acul-react/login-passwordless-email-code';

const screen = useLoginPasswordlessEmailCode();
screen.login({ identifier: 'user@example.com', password: '***' });
```

---

## 🔹 Provider Usage

Wrap your component tree using the screen-specific provider:

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/login-passwordless-email-code';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance anywhere via context:

```tsx
const screen = useCurrentScreen(); // typed as LoginPasswordlessEmailCodeMembers
```

> View [`LoginPasswordlessEmailCodeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessEmailCodeMembers.html) — provides all contextual properties for this screen.

---

## 🔹 Interface Usage

The following interfaces are supported by `LoginPasswordlessEmailCode` and are useful for typing inputs, outputs, and screen properties.

```ts
import type { LoginPasswordlessEmailCodeMembers, SubmitCodeOptions, ScreenMembersOnLoginPasswordlessEmailCode, TransactionMembersOnLoginPasswordlessEmailCode, CaptchaContext, PhonePrefix, Connection, EnterpriseConnection, PasswordPolicy, UsernamePolicy, Error, PasswordComplexityRule, BrandingSettings, BrandingThemes, CustomOptions, ShortEntity, ClientMembers, BrandingMembers, PromptMembers, UserMembers, OrganizationMembers, ScreenMembers, TenantMembers, TransactionMembers, UntrustedDataMembers } from '@auth0/auth0-acul-react/login-passwordless-email-code';
```

### 🔸 Interface Documentation
  
  You can find detailed documentation for the available interfaces below.  
  These types help with typing screen inputs, properties, and screen-specific data models:

- [`LoginPasswordlessEmailCodeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessEmailCodeMembers.html)
- [`SubmitCodeOptions`](https://auth0.github.io/universal-login/interfaces/Classes.SubmitCodeOptions.html)
- [`ScreenMembersOnLoginPasswordlessEmailCode`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnLoginPasswordlessEmailCode.html)
- [`TransactionMembersOnLoginPasswordlessEmailCode`](https://auth0.github.io/universal-login/interfaces/Classes.TransactionMembersOnLoginPasswordlessEmailCode.html)
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
- [`ShortEntity`](https://auth0.github.io/universal-login/interfaces/Classes.ShortEntity.html)
- [`ClientMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ClientMembers.html)
- [`BrandingMembers`](https://auth0.github.io/universal-login/interfaces/Classes.BrandingMembers.html)
- [`PromptMembers`](https://auth0.github.io/universal-login/interfaces/Classes.PromptMembers.html)
- [`UserMembers`](https://auth0.github.io/universal-login/interfaces/Classes.UserMembers.html)
- [`OrganizationMembers`](https://auth0.github.io/universal-login/interfaces/Classes.OrganizationMembers.html)
- [`ScreenMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembers.html)
- [`TenantMembers`](https://auth0.github.io/universal-login/interfaces/Classes.TenantMembers.html)
- [`TransactionMembers`](https://auth0.github.io/universal-login/interfaces/Classes.TransactionMembers.html)
- [`UntrustedDataMembers`](https://auth0.github.io/universal-login/interfaces/Classes.UntrustedDataMembers.html)
