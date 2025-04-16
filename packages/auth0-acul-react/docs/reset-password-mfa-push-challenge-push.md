# `reset-password-mfa-push-challenge-push` Screen

> This screen represents the **ResetPasswordMfaPushChallengePush** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useResetPasswordMfaPushChallengePush()`

```tsx
import { useResetPasswordMfaPushChallengePush } from '@auth0/auth0-acul-react/reset-password-mfa-push-challenge-push';

const screen = useResetPasswordMfaPushChallengePush(); // typed as ResetPasswordMfaPushChallengePushMembers
// Continues with the push notification challenge
screen.continue({ /* args */ });

// Resends the push notification
screen.resendPushNotification({ /* args */ });

// Switches to entering the verification code manually
screen.enterCodeManually({ /* args */ });

// Allows trying another authentication method
screen.tryAnotherMethod({ /* args */ });
```

> View [`ResetPasswordMfaPushChallengePushMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMfaPushChallengePushMembers.html) — this interface documents the full API for the `ResetPasswordMfaPushChallengePush` hook.

---

## 🔹 Provider Usage

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/reset-password-mfa-push-challenge-push';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance via context:

```tsx
const screen = useCurrentScreen(); // typed as ResetPasswordMfaPushChallengePushMembers
```

> View [`ResetPasswordMfaPushChallengePushMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMfaPushChallengePushMembers.html) — this interface documents the full API for the `ResetPasswordMfaPushChallengePush` context.

---

## 🔹 Interface Usage

**Import:**

```ts
import type {
  default,
  ResetPasswordMfaPushChallengePushMembers,
  ScreenMembersOnResetPasswordMfaPushChallengePush,
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
} from '@auth0/auth0-acul-react/reset-password-mfa-push-challenge-push';
```

---

## 🔸 API References

📝 **Documentation:**  
- [`ResetPasswordMfaPushChallengePushMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMfaPushChallengePushMembers.html) — documents all methods and properties available on the `ResetPasswordMfaPushChallengePush` screen.

📃 **Interfaces:**
- [`ResetPasswordMfaPushChallengePushMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ResetPasswordMfaPushChallengePushMembers.html)
- [`ScreenMembersOnResetPasswordMfaPushChallengePush`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnResetPasswordMfaPushChallengePush.html)
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
