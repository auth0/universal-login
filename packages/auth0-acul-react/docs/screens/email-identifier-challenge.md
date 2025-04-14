---
title: email-identifier-challenge
sidebar_label: EmailIdentifierChallenge
---

# `email-identifier-challenge` Screen

> This screen represents the **EmailIdentifierChallenge** flow in the Auth0 Universal Login.

---

## 🔹 Hook Usage: `useEmailIdentifierChallenge()`

This creates a new `EmailIdentifierChallenge` instance:

```tsx
import { useEmailIdentifierChallenge } from '@auth0/auth0-acul-react/email-identifier-challenge';

const screen = useEmailIdentifierChallenge();
screen.login({ identifier: 'user@example.com', password: '***' });
```

---

## 🔹 Provider Usage

Wrap your component tree using the screen-specific provider:

```tsx
import {
  Auth0AculProvider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/email-identifier-challenge';

<Auth0AculProvider>
  <YourScreenComponent />
</Auth0AculProvider>
```

Then access the screen instance anywhere via context:

```tsx
const screen = useCurrentScreen(); // typed as EmailIdentifierChallengeMembers
```

> View [`EmailIdentifierChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.EmailIdentifierChallengeMembers.html) — provides all contextual properties for this screen.

---

## 🔹 Interface Usage

The following interfaces are supported by `EmailIdentifierChallenge` and are useful for typing inputs, outputs, and screen properties.

```ts
import type { EmailIdentifierChallengeMembers, ScreenMembersOnEmailIdentifierChallenge, EmailChallengeOptions, CaptchaContext, PhonePrefix, Connection, EnterpriseConnection, PasswordPolicy, UsernamePolicy, Error, PasswordComplexityRule, BrandingSettings, BrandingThemes, CustomOptions, ShortEntity, ClientMembers, BrandingMembers, PromptMembers, UserMembers, OrganizationMembers, ScreenMembers, TenantMembers, TransactionMembers, UntrustedDataMembers } from '@auth0/auth0-acul-react/email-identifier-challenge';
```

### 🔸 Interface Documentation
  
  You can find detailed documentation for the available interfaces below.  
  These types help with typing screen inputs, properties, and screen-specific data models:

- [`EmailIdentifierChallengeMembers`](https://auth0.github.io/universal-login/interfaces/Classes.EmailIdentifierChallengeMembers.html)
- [`ScreenMembersOnEmailIdentifierChallenge`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembersOnEmailIdentifierChallenge.html)
- [`EmailChallengeOptions`](https://auth0.github.io/universal-login/interfaces/Classes.EmailChallengeOptions.html)
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
- [`ShortEntity`](https://auth0.github.io/universal-login/interfaces/Classes.ShortEntity.html)
- [`ClientMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ClientMembers.html)
- [`BrandingMembers`](https://auth0.github.io/universal-login/interfaces/Classes.BrandingMembers.html)
- [`PromptMembers`](https://auth0.github.io/universal-login/interfaces/Classes.PromptMembers.html)
- [`UserMembers`](https://auth0.github.io/universal-login/interfaces/Classes.UserMembers.html)
- [`OrganizationMembers`](https://auth0.github.io/universal-login/interfaces/Classes.OrganizationMembers.html)
- [`ScreenMembers`](https://auth0.github.io/universal-login/interfaces/Classes.ScreenMembers.html)
- [`TenantMembers`](https://auth0.github.io/universal-login/interfaces/Classes.TenantMembers.html)
- [`TransactionMembers`](https://auth0.github.io/universal-login/interfaces/Classes.TransactionMembers.html)
- [`UntrustedDataMembers`](https://auth0.github.io/universal-login/interfaces/Classes.UntrustedDataMembers.html)
