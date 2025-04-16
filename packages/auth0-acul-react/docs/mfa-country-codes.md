# `mfa-country-codes` Screen

> This screen represents the **MfaCountryCodes** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useMfaCountryCodes()`

```tsx
import { useMfaCountryCodes } from '@auth0/auth0-acul-react/mfa-country-codes';

const screen = useMfaCountryCodes(); // typed as MfaCountryCodesMembers
// Selects a country code from the available options
screen.selectCountryCode({ country_code: '123456', phone_prefix: 'phone_prefix_value' });

// Navigates back to the previous screen
screen.goBack({ /* args */ });
```

> View [`MfaCountryCodesMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaCountryCodesMembers.html) — this interface documents the full API for the `MfaCountryCodes` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/mfa-country-codes';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as MfaCountryCodesMembers
```

> View [`MfaCountryCodesMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaCountryCodesMembers.html) — this interface documents the full API for the `MfaCountryCodes` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  MfaCountryCodesMembers,
  ScreenMembersOnMfaCountryCodes,
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
} from '@auth0/auth0-acul-react/mfa-country-codes';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`MfaCountryCodesMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaCountryCodesMembers.html) — documents all methods and properties available on the `MfaCountryCodes` screen.

📃 **Interfaces:**
- [`MfaCountryCodesMembers`](https://auth0.github.io/universal-login/interfaces/Classes.MfaCountryCodesMembers.html)
- [`ScreenMembersOnMfaCountryCodes`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnMfaCountryCodes.html)
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
