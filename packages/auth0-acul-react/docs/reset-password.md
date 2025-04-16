# `reset-password` Screen

> This screen represents the **ResetPassword** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useResetPassword()`

```tsx
import { useResetPassword } from '@auth0/auth0-acul-react/reset-password';

const screen = useResetPassword(); // typed as ResetPasswordMembers

screen.resetPassword({ 'password-reset': '<password>', 're-enter-password': '<password>' });
```

> View [`ResetPasswordMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMembers.html) — this interface documents the full API for the `ResetPassword` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordMembers
```

> View [`ResetPasswordMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMembers.html) — this interface documents the full API for the `ResetPassword` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  ResetPasswordMembers,
  ResetPasswordOptions,
  ScreenMembersOnResetPassword,
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
} from '@auth0/auth0-acul-react/reset-password';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`ResetPasswordMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMembers.html) — documents all methods and properties available on the `ResetPassword` screen.

📃 **Interfaces:**
- [`ResetPasswordMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMembers.html)
- [`ResetPasswordOptions`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordOptions.html)
- [`ScreenMembersOnResetPassword`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnResetPassword.html)
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
