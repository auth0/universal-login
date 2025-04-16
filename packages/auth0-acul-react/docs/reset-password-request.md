# `reset-password-request` Screen

> This screen represents the **ResetPasswordRequest** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useResetPasswordRequest()`

```tsx
import { useResetPasswordRequest } from '@auth0/auth0-acul-react/reset-password-request';

const screen = useResetPasswordRequest(); // typed as ResetPasswordRequestMembers

screen.resetPassword({ username: 'demo-user', captcha: 'abc123' });


screen.backToLogin({ /* args */ });
```

> View [`ResetPasswordRequestMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordRequestMembers.html) — this interface documents the full API for the `ResetPasswordRequest` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password-request';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordRequestMembers
```

> View [`ResetPasswordRequestMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordRequestMembers.html) — this interface documents the full API for the `ResetPasswordRequest` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  ResetPasswordRequestMembers,
  ResetPasswordRequestOptions,
  ScreenMembersOnResetPasswordRequest,
  TransactionMembersOnResetPasswordRequest,
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
} from '@auth0/auth0-acul-react/reset-password-request';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`ResetPasswordRequestMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordRequestMembers.html) — documents all methods and properties available on the `ResetPasswordRequest` screen.

📃 **Interfaces:**
- [`ResetPasswordRequestMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordRequestMembers.html)
- [`ResetPasswordRequestOptions`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordRequestOptions.html)
- [`ScreenMembersOnResetPasswordRequest`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnResetPasswordRequest.html)
- [`TransactionMembersOnResetPasswordRequest`](https://auth0.github.io/universal-login/interfaces/Classes.TransactionMembersOnResetPasswordRequest.html)
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
