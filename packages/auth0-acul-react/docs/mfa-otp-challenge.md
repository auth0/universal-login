# `mfa-otp-challenge` Screen

> This screen represents the **MfaOtpChallenge** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useMfaOtpChallenge()`

This creates a new `MfaOtpChallenge` instance:

```tsx
import { useMfaOtpChallenge } from '@auth0/auth0-acul-react/mfa-otp-challenge';

const screen = useMfaOtpChallenge(); // typed as MfaOtpChallengeMembers
screen.continue(...);
```

> View [`MfaOtpChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaOtpChallengeMembers.html) — this interface describes all properties and methods exposed by the `MfaOtpChallenge` screen.

---

## 🔹 Provider Usage

Wrap your component tree using the screen-specific provider:

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-otp-challenge';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance anywhere via context:

```tsx
const screen = useCurrentScreen(); // typed as MfaOtpChallengeMembers
```

> View [`MfaOtpChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaOtpChallengeMembers.html) — this interface describes all properties and methods exposed by the `MfaOtpChallenge` screen.

---

## 🔹 Interface Usage

The following interfaces and types are available for `MfaOtpChallenge`:

**Import:**

```ts
import type {
  default,
  MfaOtpChallengeMembers,
  ContinueOptions,
  TryAnotherMethodOptions,
  ScreenMembersOnMfaOtpChallenge,
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
} from '@auth0/auth0-acul-react/mfa-otp-challenge';
```

---

## 🔸 API References

This section includes all the relevant types and interfaces for this screen. Use them for typing props, payloads, and extending behaviors.

**Screen Class Reference:**  
- [`MfaOtpChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaOtpChallengeMembers.html) — this interface describes all properties and methods exposed by the `MfaOtpChallenge` screen.

**Interfaces:**
- [`MfaOtpChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaOtpChallengeMembers.html)
- [`ContinueOptions`](https://auth0.github.io/universal-login/interfaces/Classes.ContinueOptions.html)
- [`TryAnotherMethodOptions`](https://auth0.github.io/universal-login/interfaces/Classes.TryAnotherMethodOptions.html)
- [`ScreenMembersOnMfaOtpChallenge`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnMfaOtpChallenge.html)
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
