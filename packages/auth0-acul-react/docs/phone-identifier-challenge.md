# `phone-identifier-challenge` Screen

> This screen represents the **PhoneIdentifierChallenge** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `usePhoneIdentifierChallenge()`

```tsx
import { usePhoneIdentifierChallenge } from '@auth0/auth0-acul-react/phone-identifier-challenge';

const screen = usePhoneIdentifierChallenge(); // typed as PhoneIdentifierChallengeMembers

screen.submitPhoneChallenge({ code: '123456', captcha: 'abc123' });


screen.resendCode({ /* args */ });


screen.returnToPrevious({ /* args */ });
```

> View [`PhoneIdentifierChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.PhoneIdentifierChallengeMembers.html) — this interface documents the full API for the `PhoneIdentifierChallenge` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/phone-identifier-challenge';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as PhoneIdentifierChallengeMembers
```

> View [`PhoneIdentifierChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.PhoneIdentifierChallengeMembers.html) — this interface documents the full API for the `PhoneIdentifierChallenge` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  PhoneIdentifierChallengeMembers,
  PhoneChallengeOptions,
  ScreenMembersOnPhoneIdentifierChallenge,
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
} from '@auth0/auth0-acul-react/phone-identifier-challenge';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`PhoneIdentifierChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.PhoneIdentifierChallengeMembers.html) — documents all methods and properties available on the `PhoneIdentifierChallenge` screen.

📃 **Interfaces:**
- [`PhoneIdentifierChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.PhoneIdentifierChallengeMembers.html)
- [`PhoneChallengeOptions`](https://auth0.github.io/universal-login/interfaces/Classes.PhoneChallengeOptions.html)
- [`ScreenMembersOnPhoneIdentifierChallenge`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnPhoneIdentifierChallenge.html)
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
