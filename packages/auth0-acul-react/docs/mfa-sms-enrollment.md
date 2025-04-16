# `mfa-sms-enrollment` Screen

> This screen represents the **MfaSmsEnrollment** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useMfaSmsEnrollment()`

```tsx
import { useMfaSmsEnrollment } from '@auth0/auth0-acul-react/mfa-sms-enrollment';

const screen = useMfaSmsEnrollment(); // typed as MfaSmsEnrollmentMembers
// Handles the action to pick a country code for SMS enrollment.
screen.pickCountryCode({ /* args */ });

// Continues the SMS enrollment process with the provided phone number.
screen.continueEnrollment({ /* args */ });

// Handles the action to try another method for MFA.
screen.tryAnotherMethod({ /* args */ });
```

> View [`MfaSmsEnrollmentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsEnrollmentMembers.html) — this interface documents the full API for the `MfaSmsEnrollment` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-sms-enrollment';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as MfaSmsEnrollmentMembers
```

> View [`MfaSmsEnrollmentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsEnrollmentMembers.html) — this interface documents the full API for the `MfaSmsEnrollment` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  MfaSmsEnrollmentMembers,
  MfaSmsEnrollmentOptions,
  ScreenMembersOnMfaSmsEnrollment,
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
} from '@auth0/auth0-acul-react/mfa-sms-enrollment';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`MfaSmsEnrollmentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsEnrollmentMembers.html) — documents all methods and properties available on the `MfaSmsEnrollment` screen.

📃 **Interfaces:**
- [`MfaSmsEnrollmentMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsEnrollmentMembers.html)
- [`MfaSmsEnrollmentOptions`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsEnrollmentOptions.html)
- [`ScreenMembersOnMfaSmsEnrollment`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnMfaSmsEnrollment.html)
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


📃 **Types:**
- [`ShortEntity`](https://auth0.github.io/universal-login/types/Classes.ShortEntity.html)
