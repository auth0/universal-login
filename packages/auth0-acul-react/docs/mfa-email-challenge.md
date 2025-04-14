---
title: mfa-email-challenge
sidebar_label: MfaEmailChallenge
---

# `mfa-email-challenge` Screen

> This screen represents the **MfaEmailChallenge** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useMfaEmailChallenge()`

This creates a new `MfaEmailChallenge` instance:

```tsx
import { useMfaEmailChallenge } from '@auth0/auth0-acul-react/mfa-email-challenge';

const screen = useMfaEmailChallenge(); // typed as MfaEmailChallengeMembers
screen.continue(...);
```

> View [`MfaEmailChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaEmailChallengeMembers.html) — gives all contextual properties for this screen.

---

## 🔹 Provider Usage

Wrap your component tree using the screen-specific provider:

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-email-challenge';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance anywhere via context:

```tsx
const screen = useCurrentScreen(); // typed as MfaEmailChallengeMembers
```
> View [`MfaEmailChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaEmailChallengeMembers.html) — gives all contextual properties for this screen.

---

## 🔹 Interface Usage

The following interfaces and types are available for `MfaEmailChallenge`:

```ts
import type { default, MfaEmailChallengeMembers, ContinueOptions, ResendCodeOptions, TryAnotherMethodOptions, ScreenMembersOnMfaEmailChallenge, CaptchaContext, PhonePrefix, Connection, EnterpriseConnection, PasswordPolicy, UsernamePolicy, Error, PasswordComplexityRule, BrandingSettings, BrandingThemes, CustomOptions, ShortEntity, ClientMembers, BrandingMembers, PromptMembers, UserMembers, OrganizationMembers, ScreenMembers, TenantMembers, TransactionMembers, UntrustedDataMembers } from '@auth0/auth0-acul-react/mfa-email-challenge';
```

---

## 🔸 API References

This section includes all the related types and interfaces for this screen. Use these for advanced typing or extending screen logic.

**Context Type (via Provider):**
- [`MfaEmailChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaEmailChallengeMembers.html) — gives all contextual properties for this screen.

**Interfaces:**
- [`MfaEmailChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaEmailChallengeMembers.html)
- [`ContinueOptions`](https://auth0.github.io/universal-login/interfaces/Classes.ContinueOptions.html)
- [`ResendCodeOptions`](https://auth0.github.io/universal-login/interfaces/Classes.ResendCodeOptions.html)
- [`TryAnotherMethodOptions`](https://auth0.github.io/universal-login/interfaces/Classes.TryAnotherMethodOptions.html)
- [`ScreenMembersOnMfaEmailChallenge`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnMfaEmailChallenge.html)
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
