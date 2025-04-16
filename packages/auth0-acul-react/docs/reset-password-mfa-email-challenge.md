# `reset-password-mfa-email-challenge` Screen

> This screen represents the **ResetPasswordMfaEmailChallenge** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useResetPasswordMfaEmailChallenge()`

```tsx
import { useResetPasswordMfaEmailChallenge } from '@auth0/auth0-acul-react/reset-password-mfa-email-challenge';

const screen = useResetPasswordMfaEmailChallenge(); // typed as ResetPasswordMfaEmailChallengeMembers
// Continues with the email challenge using the provided code.
screen.continue({ code: '123456', rememberDevice: 'rememberDevice_value' });

// Resends the email code.
screen.resendCode({ /* args */ });

// Allows the user to try another MFA method.
screen.tryAnotherMethod({ /* args */ });
```

> View [`ResetPasswordMfaEmailChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMfaEmailChallengeMembers.html) — this interface documents the full API for the `ResetPasswordMfaEmailChallenge` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password-mfa-email-challenge';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordMfaEmailChallengeMembers
```

> View [`ResetPasswordMfaEmailChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMfaEmailChallengeMembers.html) — this interface documents the full API for the `ResetPasswordMfaEmailChallenge` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  ResetPasswordMfaEmailChallengeMembers,
  ContinueOptions,
  ResendCodeOptions,
  TryAnotherMethodOptions,
  ScreenMembersOnResetPasswordMfaEmailChallenge,
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
} from '@auth0/auth0-acul-react/reset-password-mfa-email-challenge';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`ResetPasswordMfaEmailChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMfaEmailChallengeMembers.html) — documents all methods and properties available on the `ResetPasswordMfaEmailChallenge` screen.

📃 **Interfaces:**
- [`ResetPasswordMfaEmailChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMfaEmailChallengeMembers.html)
- [`ContinueOptions`](https://auth0.github.io/universal-login/interfaces/Classes.ContinueOptions.html)
- [`ResendCodeOptions`](https://auth0.github.io/universal-login/interfaces/Classes.ResendCodeOptions.html)
- [`TryAnotherMethodOptions`](https://auth0.github.io/universal-login/interfaces/Classes.TryAnotherMethodOptions.html)
- [`ScreenMembersOnResetPasswordMfaEmailChallenge`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnResetPasswordMfaEmailChallenge.html)
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
