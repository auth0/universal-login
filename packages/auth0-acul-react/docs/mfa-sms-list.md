# `mfa-sms-list` Screen

> This screen represents the **MfaSmsList** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useMfaSmsList()`

```tsx
import { useMfaSmsList } from '@auth0/auth0-acul-react/mfa-sms-list';

const screen = useMfaSmsList(); // typed as MfaSmsListMembers
// Selects a phone number from the list of enrolled phone numbers.
screen.selectPhoneNumber({ /* args */ });

// Navigates back to the previous screen.
screen.backAction({ /* args */ });
```

> View [`MfaSmsListMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsListMembers.html) — this interface documents the full API for the `MfaSmsList` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-sms-list';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as MfaSmsListMembers
```

> View [`MfaSmsListMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsListMembers.html) — this interface documents the full API for the `MfaSmsList` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  MfaSmsListMembers,
  MfaSmsListOptions,
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
} from '@auth0/auth0-acul-react/mfa-sms-list';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`MfaSmsListMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsListMembers.html) — documents all methods and properties available on the `MfaSmsList` screen.

📃 **Interfaces:**
- [`MfaSmsListMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsListMembers.html)
- [`MfaSmsListOptions`](https://auth0.github.io/universal-login/interfaces/Classes.MfaSmsListOptions.html)
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
