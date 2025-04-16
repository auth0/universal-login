# `mfa-begin-enroll-options` Screen

> This screen represents the **MfaBeginEnrollOptions** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useMfaBeginEnrollOptions()`

This creates a new `MfaBeginEnrollOptions` instance:

```tsx
import { useMfaBeginEnrollOptions } from '@auth0/auth0-acul-react/mfa-begin-enroll-options';

const screen = useMfaBeginEnrollOptions(); // typed as MfaBeginEnrollOptionsMembers
screen.enroll(...);
```

> View [`MfaBeginEnrollOptionsMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaBeginEnrollOptionsMembers.html) — this interface describes all properties and methods exposed by the `MfaBeginEnrollOptions` screen.

---

## 🔹 Provider Usage

Wrap your component tree using the screen-specific provider:

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-begin-enroll-options';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance anywhere via context:

```tsx
const screen = useCurrentScreen(); // typed as MfaBeginEnrollOptionsMembers
```

> View [`MfaBeginEnrollOptionsMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaBeginEnrollOptionsMembers.html) — this interface describes all properties and methods exposed by the `MfaBeginEnrollOptions` screen.

---

## 🔹 Interface Usage

The following interfaces and types are available for `MfaBeginEnrollOptions`:

**Import:**

```ts
import type {
  default,
  MfaBeginEnrollOptionsMembers,
  MfaEnrollOptions,
  FactorType,
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
} from '@auth0/auth0-acul-react/mfa-begin-enroll-options';
```

---

## 🔸 API References

This section includes all the relevant types and interfaces for this screen. Use them for typing props, payloads, and extending behaviors.

**Screen Class Reference:**  
- [`MfaBeginEnrollOptionsMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaBeginEnrollOptionsMembers.html) — this interface describes all properties and methods exposed by the `MfaBeginEnrollOptions` screen.

**Interfaces:**
- [`MfaBeginEnrollOptionsMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaBeginEnrollOptionsMembers.html)
- [`MfaEnrollOptions`](https://auth0.github.io/universal-login/interfaces/Classes.MfaEnrollOptions.html)
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
- [`FactorType`](https://auth0.github.io/universal-login/types/Classes.FactorType.html)
- [`ShortEntity`](https://auth0.github.io/universal-login/types/Classes.ShortEntity.html)
