# `login-passwordless-sms-otp` Screen

> This screen represents the **LoginPasswordlessSmsOtp** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useLoginPasswordlessSmsOtp()`

```tsx
import { useLoginPasswordlessSmsOtp } from '@auth0/auth0-acul-react/login-passwordless-sms-otp';

const screen = useLoginPasswordlessSmsOtp(); // typed as LoginPasswordlessSmsOtpMembers

screen.submitOTP({ username: 'demo-user', otp: 'otp_value', captcha: 'abc123' });


screen.resendOTP({ /* args */ });
```

> View [`LoginPasswordlessSmsOtpMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessSmsOtpMembers.html) — this interface documents the full API for the `LoginPasswordlessSmsOtp` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/login-passwordless-sms-otp';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as LoginPasswordlessSmsOtpMembers
```

> View [`LoginPasswordlessSmsOtpMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessSmsOtpMembers.html) — this interface documents the full API for the `LoginPasswordlessSmsOtp` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  LoginPasswordlessSmsOtpMembers,
  SubmitOTPOptions,
  ScreenMembersOnLoginPasswordlessSmsOtp,
  TransactionMembersOnLoginPasswordlessSmsOtp,
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
} from '@auth0/auth0-acul-react/login-passwordless-sms-otp';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`LoginPasswordlessSmsOtpMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessSmsOtpMembers.html) — documents all methods and properties available on the `LoginPasswordlessSmsOtp` screen.

📃 **Interfaces:**
- [`LoginPasswordlessSmsOtpMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessSmsOtpMembers.html)
- [`SubmitOTPOptions`](https://auth0.github.io/universal-login/interfaces/Classes.SubmitOTPOptions.html)
- [`ScreenMembersOnLoginPasswordlessSmsOtp`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnLoginPasswordlessSmsOtp.html)
- [`TransactionMembersOnLoginPasswordlessSmsOtp`](https://auth0.github.io/universal-login/interfaces/Classes.TransactionMembersOnLoginPasswordlessSmsOtp.html)
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
