# `mfa-otp-enrollment-qr` Screen

> This screen represents the **MfaOtpEnrollmentQr** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useMfaOtpEnrollmentQr()`

```tsx
import { useMfaOtpEnrollmentQr } from '@auth0/auth0-acul-react/mfa-otp-enrollment-qr';

const screen = useMfaOtpEnrollmentQr(); // typed as MfaOtpEnrollmentQrMembers
// Navigates to the authenticator selection screen.
screen.toggleView({ /* args */ });

// Continues with the default action.
screen.continue({ /* args */ });

// Navigates to the authenticator selection screen.
screen.tryAnotherMethod({ /* args */ });
```

> View [`MfaOtpEnrollmentQrMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaOtpEnrollmentQrMembers.html) — this interface documents the full API for the `MfaOtpEnrollmentQr` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-otp-enrollment-qr';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as MfaOtpEnrollmentQrMembers
```

> View [`MfaOtpEnrollmentQrMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaOtpEnrollmentQrMembers.html) — this interface documents the full API for the `MfaOtpEnrollmentQr` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  MfaOtpEnrollmentQrMembers,
  ScreenMembersOnMfaOtpEnrollmentQr,
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
} from '@auth0/auth0-acul-react/mfa-otp-enrollment-qr';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`MfaOtpEnrollmentQrMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaOtpEnrollmentQrMembers.html) — documents all methods and properties available on the `MfaOtpEnrollmentQr` screen.

📃 **Interfaces:**
- [`MfaOtpEnrollmentQrMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaOtpEnrollmentQrMembers.html)
- [`ScreenMembersOnMfaOtpEnrollmentQr`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnMfaOtpEnrollmentQr.html)
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
