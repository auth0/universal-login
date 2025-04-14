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

const screen = useLoginPasswordlessEmailCode(); // typed as LoginPasswordlessEmailCodeMembers
screen.submitCode(...);
```

> View [`LoginPasswordlessEmailCodeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessEmailCodeMembers.html) — this interface describes all properties and methods exposed by the `LoginPasswordlessEmailCode` screen.

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

> View [`LoginPasswordlessEmailCodeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessEmailCodeMembers.html) — this interface describes all properties and methods exposed by the `LoginPasswordlessEmailCode` screen.

---

## 🔹 Interface Usage

The following interfaces and types are available for `LoginPasswordlessEmailCode`:

**Import:**
`import type { default, LoginPasswordlessEmailCodeMembers, SubmitCodeOptions, ScreenMembersOnLoginPasswordlessEmailCode, TransactionMembersOnLoginPasswordlessEmailCode, CaptchaContext, PhonePrefix, Connection, EnterpriseConnection, PasswordPolicy, UsernamePolicy, Error, PasswordComplexityRule, BrandingSettings, BrandingThemes, CustomOptions, ShortEntity, ClientMembers, BrandingMembers, PromptMembers, UserMembers, OrganizationMembers, ScreenMembers, TenantMembers, TransactionMembers, UntrustedDataMembers } from '@auth0/auth0-acul-react/login-passwordless-email-code';`

---

## 🔸 API References

This section includes all the relevant types and interfaces for this screen. Use them for typing props, payloads, and extending behaviors.

**Screen Class Reference:**  
- [`LoginPasswordlessEmailCodeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessEmailCodeMembers.html) — this interface describes all properties and methods exposed by the `LoginPasswordlessEmailCode` screen.

**Interfaces:**
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
