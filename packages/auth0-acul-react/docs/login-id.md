# `login-id` Screen

> This screen represents the **LoginId** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useLoginId()`

```tsx
import { useLoginId } from '@auth0/auth0-acul-react/login-id';

const screen = useLoginId(); // typed as LoginIdMembers

screen.login({ username: 'demo-user', captcha: 'abc123' });


screen.socialLogin({ connection: 'google-oauth2' });


screen.passkeyLogin({ /* args */ });


screen.pickCountryCode({ /* args */ });
```

> View [`LoginIdMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginIdMembers.html) — this interface documents the full API for the `LoginId` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/login-id';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as LoginIdMembers
```

> View [`LoginIdMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginIdMembers.html) — this interface documents the full API for the `LoginId` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  LoginIdMembers,
  LoginOptions,
  SocialLoginOptions,
  ScreenMembersOnLoginId,
  TransactionMembersOnLoginId,
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
} from '@auth0/auth0-acul-react/login-id';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`LoginIdMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginIdMembers.html) — documents all methods and properties available on the `LoginId` screen.

📃 **Interfaces:**
- [`LoginIdMembers`](https://auth0.github.io/universal-login/interfaces/Classes.LoginIdMembers.html)
- [`LoginOptions`](https://auth0.github.io/universal-login/interfaces/Classes.LoginOptions.html)
- [`SocialLoginOptions`](https://auth0.github.io/universal-login/interfaces/Classes.SocialLoginOptions.html)
- [`ScreenMembersOnLoginId`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnLoginId.html)
- [`TransactionMembersOnLoginId`](https://auth0.github.io/universal-login/interfaces/Classes.TransactionMembersOnLoginId.html)
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
