# `reset-password-mfa-sms-challenge` Screen

> This screen represents the **ResetPasswordMfaSmsChallenge** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useResetPasswordMfaSmsChallenge()`

```tsx
import { useResetPasswordMfaSmsChallenge } from '@auth0/auth0-acul-react/reset-password-mfa-sms-challenge';

const screen = useResetPasswordMfaSmsChallenge(); // typed as ResetPasswordMfaSmsChallengeMembers
// Submits the MFA SMS challenge with the provided code.
screen.continueMfaSmsChallenge({ code: '123456' });

// Submits the action to resend the SMS code.
screen.resendCode({ /* args */ });

// Submits the action to try another MFA method.
screen.tryAnotherMethod({ /* args */ });

// Submits the action to switch to voice call verification.
screen.getACall({ /* args */ });
```

> View [`ResetPasswordMfaSmsChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMfaSmsChallengeMembers.html) — this interface documents the full API for the `ResetPasswordMfaSmsChallenge` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password-mfa-sms-challenge';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordMfaSmsChallengeMembers
```

> View [`ResetPasswordMfaSmsChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMfaSmsChallengeMembers.html) — this interface documents the full API for the `ResetPasswordMfaSmsChallenge` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  ResetPasswordMfaSmsChallengeMembers,
  MfaSmsChallengeOptions,
  ScreenMembersOnResetPasswordMfaSmsChallenge,
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
} from '@auth0/auth0-acul-react/reset-password-mfa-sms-challenge';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`ResetPasswordMfaSmsChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMfaSmsChallengeMembers.html) — documents all methods and properties available on the `ResetPasswordMfaSmsChallenge` screen.

📃 **Interfaces:**
- [`ResetPasswordMfaSmsChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMfaSmsChallengeMembers.html)
- [`MfaSmsChallengeOptions`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsChallengeOptions.html)
- [`ScreenMembersOnResetPasswordMfaSmsChallenge`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnResetPasswordMfaSmsChallenge.html)
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
