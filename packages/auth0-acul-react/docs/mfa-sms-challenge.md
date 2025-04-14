---
title: mfa-sms-challenge
sidebar_label: MfaSmsChallenge
---

# `mfa-sms-challenge` Screen

> This screen represents the **MfaSmsChallenge** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useMfaSmsChallenge()`

This creates a new `MfaSmsChallenge` instance:

```tsx
import { useMfaSmsChallenge } from '@auth0/auth0-acul-react/mfa-sms-challenge';

const screen = useMfaSmsChallenge(); // typed as MfaSmsChallengeMembers
screen.continueMfaSmsChallenge(...);
```

> View [`MfaSmsChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsChallengeMembers.html) — this interface describes all properties and methods exposed by the `MfaSmsChallenge` screen.

---

## 🔹 Provider Usage

Wrap your component tree using the screen-specific provider:

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-sms-challenge';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance anywhere via context:

```tsx
const screen = useCurrentScreen(); // typed as MfaSmsChallengeMembers
```

> View [`MfaSmsChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsChallengeMembers.html) — this interface describes all properties and methods exposed by the `MfaSmsChallenge` screen.

---

## 🔹 Interface Usage

The following interfaces and types are available for `MfaSmsChallenge`:

**Import:**

```ts
import type {
  default,
  MfaSmsChallengeMembers,
  MfaSmsChallengeOptions,
  ScreenMembersOnMfaSmsChallenge,
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
} from '@auth0/auth0-acul-react/mfa-sms-challenge';
```

---

## 🔸 API References

This section includes all the relevant types and interfaces for this screen. Use them for typing props, payloads, and extending behaviors.

**Screen Class Reference:**  
- [`MfaSmsChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsChallengeMembers.html) — this interface describes all properties and methods exposed by the `MfaSmsChallenge` screen.

**Interfaces:**
- [`MfaSmsChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsChallengeMembers.html)
- [`MfaSmsChallengeOptions`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsChallengeOptions.html)
- [`ScreenMembersOnMfaSmsChallenge`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnMfaSmsChallenge.html)
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
