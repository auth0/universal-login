---
title: mfa-push-challenge-push
sidebar_label: MfaPushChallengePush
---

# `mfa-push-challenge-push` Screen

> This screen represents the **MfaPushChallengePush** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useMfaPushChallengePush()`

This creates a new `MfaPushChallengePush` instance:

```tsx
import { useMfaPushChallengePush } from '@auth0/auth0-acul-react/mfa-push-challenge-push';

const screen = useMfaPushChallengePush(); // typed as MfaPushChallengePushMembers
screen.continue(...);
```

> View [`MfaPushChallengePushMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaPushChallengePushMembers.html) — gives all contextual properties for this screen.

---

## 🔹 Provider Usage

Wrap your component tree using the screen-specific provider:

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-push-challenge-push';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance anywhere via context:

```tsx
const screen = useCurrentScreen(); // typed as MfaPushChallengePushMembers
```
> View [`MfaPushChallengePushMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaPushChallengePushMembers.html) — gives all contextual properties for this screen.

---

## 🔹 Interface Usage

The following interfaces and types are available for `MfaPushChallengePush`:

```ts
import type { default, MfaPushChallengePushMembers, WithRememberOptions, ScreenMembersOnMfaPushChallengePush, CaptchaContext, PhonePrefix, Connection, EnterpriseConnection, PasswordPolicy, UsernamePolicy, Error, PasswordComplexityRule, BrandingSettings, BrandingThemes, CustomOptions, ShortEntity, ClientMembers, BrandingMembers, PromptMembers, UserMembers, OrganizationMembers, ScreenMembers, TenantMembers, TransactionMembers, UntrustedDataMembers } from '@auth0/auth0-acul-react/mfa-push-challenge-push';
```

---

## 🔸 API References

This section includes all the related types and interfaces for this screen. Use these for advanced typing or extending screen logic.

**Context Type (via Provider):**
- [`MfaPushChallengePushMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaPushChallengePushMembers.html) — gives all contextual properties for this screen.

**Interfaces:**
- [`MfaPushChallengePushMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaPushChallengePushMembers.html)
- [`WithRememberOptions`](https://auth0.github.io/universal-login/interfaces/Classes.WithRememberOptions.html)
- [`ScreenMembersOnMfaPushChallengePush`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnMfaPushChallengePush.html)
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
