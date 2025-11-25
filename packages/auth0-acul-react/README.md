# Auth0 ACUL React SDK

![ACUL React SDK](https://cdn.auth0.com/website/sdks/banners/auth0-acul-react-banner.png)

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/@auth0/auth0-acul-react)](https://www.npmjs.com/package/@auth0/auth0-acul-react)
[![Downloads](https://img.shields.io/npm/dw/@auth0/auth0-acul-react)](https://www.npmjs.com/package/@auth0/auth0-acul-react)
[![codecov](https://codecov.io/gh/auth0/auth0-acul-react/branch/main/graph/badge.svg)](https://codecov.io/gh/auth0/auth0-acul-react)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

</div>

<div align='center'>

📚 [Documentation](#documentation) | 🚀 [Getting Started](#getting-started) | 💻 [API Reference](#api-reference) | 🪝 [Hooks](#hooks) | [Examples](#examples) | 💬 [Feedback](#feedback)

</div>

Developers using Auth0's Universal Login can use this React SDK to customize screens like login, signup, or reset password. It provides hooks, context, and utilities to build flexible, type-safe experiences that match your brand and deliver a seamless user experience.

---

<a id="documentation"></a>
## 📚 Documentation

- [Quickstart](https://auth0.com/docs/customize/login-pages/advanced-customizations/getting-started/sdk-quickstart) - our guide for setting up the SDK on your app.
- [Guides](https://auth0.com/docs/customize/login-pages/advanced-customizations/screens) - more guides for common use cases
- [Examples](https://github.com/auth0/universal-login/tree/master/packages/auth0-acul-react/examples) - code snippets for different customization use cases.

<a id="getting-started"></a>
## 🚀 Getting started

### Prerequisites
Before starting, ensure that you have the following setup:

1. **Custom Domain**: Ensure that a custom domain is configured for your Auth0 tenant.
2. **Screen Configuration**: Set up the required authentication screens within your Auth0 flow.  
   For detailed steps, refer to the [Configure ACUL Screens](https://auth0.com/docs/customize/login-pages/advanced-customizations/getting-started/configure-acul-screens).

### Installation

```bash
npm install @auth0/auth0-acul-react
```

Peer dependency:
```bash
npm install react
```

### Importing the SDK
The SDK supports `partial imports` for each screen, allowing you to include only the code you need for your specific use case. This helps keep your bundle size small and improves performance. 

Also, you can use a `root import` to load all screens from a single bundle if your app requires it. 

#### Partial Imports
Each screen has its own set of hooks and methods. You can import only what you need for the screen you're building.

The following example shows how to import and use SDK to build `login-id` screen.
```tsx
import { 
  // Context hooks
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useScreen,
  useTenant,
  useTransaction,
  useUser,
  useUntrustedData,
  // Common hooks
  useErrors,
  useTexts,
  // Utility hooks
  useUsernameValidation,
  usePasswordValidation,
  useLoginIdentifiers,
  // Submit methods
  login,
  passkeyLogin,
  federatedLogin,
} from '@auth0/auth0-acul-react/login-id';
```

---

#### Root Imports

The SDK also supports a root import, which lets you load all screens from a single bundle.
This is useful if your app dynamically renders different screens at runtime based on the current Auth0 flow, for example, when you want one unified build that can handle all possible screens.

However, root imports aren’t ideal for most projects since they can increase bundle size.
If you only need specific screens, use partial imports instead for better performance.

```ts
import {
  // Common hooks
  useCurrentScreen,
  useAuth0Themes,
  useErrors,

  // Screen-specific hooks for multiple screens
  useLoginId,
  useSignupId,
  useResetPassword
} from '@auth0/auth0-acul-react';
```
---

#### Types / Interfaces
Typescript types and interfaces can be imported from `@auth0/auth0-acul-react/types` for type safety and better DX.
```tsx
import type {
  Connection,
  CustomOptions,
  IdentifierType,
  Organizations,
  EnrolledDevice
  // ...other types
} from '@auth0/auth0-acul-react/types';
```
Refer to our [API Reference](#api-reference) for the full list of available types and interfaces.

---

<a id="api-reference"></a>
## 💻 API Reference
### Screens

| No.    | Prompt             | Screen Name       | Documentation Link                                                                                    |
|--------|--------------------|-------------------|--------------------------------------------------------------------------------------------|
| 1      | login              | login             | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.login.html)                 |
| 2      | login-id            | login-id          | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.login-id.html)               |
| 3      | login-password     | login-password    | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.login-password.html)         |
| 4      | signup-id          | signup-id         | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.signup-id.html)              |
| 5      | signup-password    | signup-password   | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.signup-password.html)        |

<details>
  <summary>Explore more screens...</summary>

| No.    | Prompt                         | Screen Name                                      | Documentation Link                                                                                                                        |
|--------|--------------------------------|-------------------------------------------|-------------------------------------------------------------------------------------------------------|
| 6      | login-passwordless             | login-passwordless-email-code             | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.login-passwordless-email-code.html)   |
| 7      | login-passwordless             | login-passwordless-sms-otp                | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.login-passwordless-sms-otp.html)      |
| 8      | passkeys                       | passkey-enrollment                        | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.passkey-enrollment.html)                |
| 9      | passkeys                       | passkey-enrollment-local                  | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.passkey-enrollment-local.html)           |
| 10     | phone-identifier-enrollment    | phone-identifier-enrollment               | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.phone-identifier-enrollment.html)    |
| 11     | phone-identifier-challenge     | phone-identifier-challenge                | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.phone-identifier-challenge.html)         |
| 12     | email-identifier-challenge     | email-identifier-challenge                | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.email-identifier-challenge.html)     |
| 13     | captcha                        | interstitial-captcha                      | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.interstitial-captcha.html)      |
| 14     | reset-password                 | reset-password-email                      | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password-email.html)       |
| 15     | reset-password                 | reset-password-request                    | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password-request.html)        |
| 16     | reset-password                 | reset-password                            | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password.html)                |
| 17     | reset-password                 | reset-password-error                      | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password-error.html)            |
| 18     | reset-password                 | reset-password-success                    | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password-success.html)         |
| 19     | signup                         | signup                                    | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.signup.html)                        |
| 20     | mfa                            | mfa-detect-browser-capabilities           | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-detect-browser-capabilities.html)   |
| 21     | mfa                            | mfa-enroll-result                         | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-enroll-result.html)   |
| 22     | mfa                            | mfa-begin-enroll-options                  | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-begin-enroll-options.html)       |
| 23     | mfa                            | mfa-login-options                         | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-login-options.html)   |
| 24     | mfa-push                       | mfa-push-enrollment-qr                    | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-push-enrollment-qr.html)            |
| 25     | mfa-push                       | mfa-push-welcome                          | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-push-welcome.html)            |
| 26     | mfa-push                       | mfa-push-challenge-push                   | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-push-challenge-push.html)   |
| 27     | mfa-push                       | mfa-push-list                             | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-push-list.html)                   |
| 28     | mfa-sms                        | mfa-country-codes                         | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-country-codes.html)              |
| 29     | mfa-sms                        | mfa-sms-challenge                         |   [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-sms-challenge.html)                 |
| 30     | mfa-sms                        | mfa-sms-enrollment                        | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-sms-enrollment.html)           |
| 31     | mfa-sms                        | mfa-sms-list                              |  [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-sms-list.html)                  |
| 32     | mfa-email                      | mfa-email-challenge                       | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-email-challenge.html)   |
| 33     | mfa-email                      | mfa-email-list                            | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-email-list.html)   |
| 34     | invitatino                     | accept-invitation                         | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.accept-invitation.html)   |
| 35     | organizations                  | organization-picker                       | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.organization-picker.html)        |
| 36     | organizations                  | organization-selection                    | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.organization-selection.html)        |
| 37     | reset-password                 | mfa-otp-challenge                         | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-otp-challenge.html)   |
| 38     | mfa-otp                        | mfa-otp-enrollment-code                   | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-otp-enrollment-code.html)   |
| 39     | mfa-otp                        | mfa-otp-enrollment-qr                     | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-otp-enrollment-qr.html)   |
| 40     | reset-password                 | reset-password-mfa-email-challenge        | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password-mfa-email-challenge.html)  |
| 41     | reset-password                 | reset-password-mfa-push-challenge-push    | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password-mfa-push-challenge-push.html)|
| 42     | reset-password                 | mfa-sms-challenge                         | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password-mfa-sms-challenge.html)   |
| 43     | reset-password                 | reset-password-mfa-otp-challenge          | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.organization-selection.html)   |
| 44     | mfa-phone                      | mfa-phone-enrollment                      | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-phone-enrollment.html)   |
| 45     | mfa-voice                      | mfa-voice-enrollment                      | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-voice-enrollment.html)   |
| 46     | mfa-recovery-code              | mfa-recovery-code-challenge               | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-recovery-code-challenge.html)   |
| 47     | device-flow                    | device-code-activation-allowed            | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.device-code-activation-allowed.html)   |
| 48     | device-flow                    | device-code-activation-denied             | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.device-code-activation-denied.html)   |
| 49     | device-flow                    | device-code-activation                    | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.device-code-activation.html)   |
| 50     | reset-password             | reset-password-mfa-recovery-code-challenge | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password-mfa-recovery-code-challenge.html) |
| 51     | reset-password                 | reset-password-mfa-voice                  | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password-mfa-voice-challenge.html)   |
| 52     | common                         | redeem-ticket                             | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.redeem-ticket.html)   |
| 53     | device-flow                    | device-code-confirmation                  | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.device-code-confirmation.html)   |
| 54     | mfa-phone                      | mfa-phone-challenge                       | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-phone-challenge.html) |
| 55     | mfa-voice                      | mfa-voice-challenge                       | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-voice-challenge.html)   |
| 56     | mfa-recovery-code              | mfa-recovery-code-enrollment              | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-recovery-code-enrollment.html)   |
| 57     | reset-password                 | reset-password-mfa-phone-challenge        | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password-mfa-phone-challenge.html)   |
| 58     | mfa-recovery-code              | mfa-recovery-code-challenge-new-code      | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-recovery-code-challenge-new-code.html) |
| 59     | logout                         | logout                                    | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.logout.html) |
| 60     | logout                         | logout-aborted                            | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.logout-aborted.html) |
| 61     | logout                         | logout-complete                           | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.logout-complete.html) |
| 62     | email-verification             | email-verification-result                 | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.email-verification-result.html) |
| 63     | login-email-verification       | login-email-verification                  | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.login-email-verification.html) |
| 64     |mfa-webauthn                    | mfa-webauthn-platform-enrollment        | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-webauthn-platform-enrollment.html)                        |
| 65     |mfa-webauthn                    | mfa-webauthn-error        | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-webauthn-error.html)                        |
| 66     |mfa-webauthn                    | mfa-webauthn-roaming-enrollment         | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-webauthn-roaming-enrollment.html)   |
| 67     |mfa-webauthn                    | mfa-webauthn-roaming-challenge          | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-webauthn-roaming-challenge.html)    |
| 68     |mfa-webauthn                    | mfa-webauthn-platform-challenge         | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-webauthn-platform-challenge.html)   |
| 69     |mfa-webauthn                    | mfa-webauthn-enrollment-success         | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-webauthn-enrollment-success.html)   |
| 70     |mfa-webauthn                    | mfa-webauthn-change-key-nickname        | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-webauthn-change-key-nickname.html)   |
| 71     |mfa-webauthn                    | mfa-webauthn-not-available-error        | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.mfa-webauthn-not-available-error.html)   |
| 72     |reset-password                    | reset-password-mfa-webauthn-platform-challenge | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password-mfa-webauthn-platform-challenge.html)                |
| 73     |reset-password                    | reset-password-mfa-webauthn-roaming-challenge | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.reset-password-mfa-webauthn-roaming-challenge.html)   |
| 74     |consent                   | consent | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.consent.html)   |
| 75     |customized-consent        | customized-consent | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.customized-consent.html)   |
| 76     |email-otp-challenge                   | email-otp-challenge | [Link](https://auth0.github.io/universal-login/auth0-acul-react/modules/Screens.email-otp-challenge.html)   |
</details>

---

## Hooks
### Context Hooks (Available in all screens)
- `useUser()` - Current user information
- `useTenant()` - Tenant configuration
- `useClient()` - Application client information
- `useScreen()` - Current screen data and configuration
- `useTransaction()` - Transaction state and methods
- `useBranding()` - Tenant branding and theme
- `useOrganization()` - Organization context (if applicable)
- `usePrompt()` - Current authentication prompt
- `useUntrustedData()` - Untrusted data from the authentication flow
 
### Utility Hooks
Specialized hooks for form validation, polling, and identifier management:

#### Identifier Management
- `useLoginIdentifiers()` - Get available login identifier types (email, phone, username)
- `useSignupIdentifiers()` - Get available signup identifier types, each with its `required` status

#### Form Validation
- `usePasswordValidation(password, rules)` - Real-time password strength validation
- `useUsernameValidation(username)` - Username format and availability validation

#### MFA & Polling
- `useMfaPolling(options)` - Manage MFA push notification polling lifecycle
- `useResend(options)` - Handle resend operations with cooldown timers

### Common Hooks
General-purpose hooks available across all screens:

#### Screen Management
- `useCurrentScreen()` - Get complete current screen context data
- `useAuth0Themes()` - Access tenant branding and theme configuration

#### Error Handling
- `useErrors(options)` - Comprehensive error management with categorization
  - Filter by error kind: `'validation'`, `'auth0'`, `'configuration'`
  - Filter by field name for form-specific errors
  - Dismiss individual or all errors

### Screen-Specific Action Methods
Each screen module exports methods for screen actions:

```tsx
// Login ID Screen
import {
  loginMethod,
  continueWithFederatedLogin
} from '@auth0/auth0-acul-react/login-id';

// Password Screen
import {
  loginMethod,
  forgotPasswordMethod
} from '@auth0/auth0-acul-react/login-password';

// MFA Push Challenge
import {
  continueMethod,
  resendPushNotification,
  useMfaPolling
} from '@auth0/auth0-acul-react/mfa-push-challenge-push';
```

## Examples
- [React Examples](https://github.com/auth0/universal-login/tree/master/packages/auth0-acul-react/examples) - Complete React component examples
- [React Boilerplate](https://github.com/auth0/auth0-acul-react-boilerplate) - Full React application template

---

<a id="feedback"></a>
## 💬 Feedback

### Contributing

We appreciate feedback and contribution to this repo! Before you get started, please see the following:

- [Auth0's general contribution guidelines](https://github.com/auth0/open-source-template/blob/master/GENERAL-CONTRIBUTING.md)
- [Auth0's code of conduct guidelines](https://github.com/auth0/open-source-template/blob/master/CODE-OF-CONDUCT.md)

### Raise an issue

To provide feedback or report a bug, please [raise an issue on our issue tracker](https://github.com/auth0/universal-login/issues).

### Vulnerability Reporting

Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/responsible-disclosure-policy) details the procedure for disclosing security issues.

---

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png"   width="150">
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_dark_mode.png" width="150">
    <img alt="Auth0 Logo" src="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png" width="150">
  </picture>
</p>
<p align="center">Auth0 is an easy to implement, adaptable authentication and authorization platform. To learn more checkout <a href="https://auth0.com/why-auth0">Why Auth0?</a></p>
<p align="center">
This project is licensed under the MIT license. See the <a href="https://github.com/auth0/auth0.js/blob/master/LICENSE"> LICENSE</a> file for more info.</p>
