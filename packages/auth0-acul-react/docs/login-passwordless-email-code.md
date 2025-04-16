# `login-passwordless-email-code` Screen

> This screen represents the **LoginPasswordlessEmailCode** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useLoginPasswordlessEmailCode()`

```tsx
import { useLoginPasswordlessEmailCode } from '@auth0/auth0-acul-react/login-passwordless-email-code';

const screen = useLoginPasswordlessEmailCode(); // typed as LoginPasswordlessEmailCodeMembers

screen.submitCode({ code: '123456', captcha: 'abc123' });


screen.resendCode({ /* args */ });
```

> View [`LoginPasswordlessEmailCodeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessEmailCodeMembers.html) — this interface documents the full API for the `LoginPasswordlessEmailCode` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/login-passwordless-email-code';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as LoginPasswordlessEmailCodeMembers
```

> View [`LoginPasswordlessEmailCodeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessEmailCodeMembers.html) — this interface documents the full API for the `LoginPasswordlessEmailCode` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  LoginPasswordlessEmailCodeMembers,
  SubmitCodeOptions,
  ScreenMembersOnLoginPasswordlessEmailCode,
  TransactionMembersOnLoginPasswordlessEmailCode,
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
} from '@auth0/auth0-acul-react/login-passwordless-email-code';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`LoginPasswordlessEmailCodeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessEmailCodeMembers.html) — documents all methods and properties available on the `LoginPasswordlessEmailCode` screen.

📃 **Interfaces:**
- [`LoginPasswordlessEmailCodeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginPasswordlessEmailCodeMembers.html)
- [`SubmitCodeOptions`](https://auth0.github.io/universal-login/interfaces/Classes.SubmitCodeOptions.html)
- [`ScreenMembersOnLoginPasswordlessEmailCode`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnLoginPasswordlessEmailCode.html)
- [`TransactionMembersOnLoginPasswordlessEmailCode`](https://auth0.github.io/universal-login/interfaces/Classes.TransactionMembersOnLoginPasswordlessEmailCode.html)
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
