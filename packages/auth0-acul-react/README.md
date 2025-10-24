# Auth0 ACUL React SDK

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/@auth0/auth0-acul-react)](https://www.npmjs.com/package/@auth0/auth0-acul-react)
[![Downloads](https://img.shields.io/npm/dw/@auth0/auth0-acul-react)](https://www.npmjs.com/package/@auth0/auth0-acul-react)
[![codecov](https://codecov.io/gh/auth0/auth0-acul-react/branch/main/graph/badge.svg)](https://codecov.io/gh/auth0/auth0-acul-react)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

</div>

<div align='center'>

📚 [Documentation](#documentation) | 🚀 [Getting Started](#getting-started) | 💻 [API Reference](#api-reference) | 🪝 [Hooks](#hooks) | [Examples](#examples) | 💬 [Feedback](#feedback)

</div>

Developers using Auth0’s Universal Login can use this React SDK to customize screens like login, signup, or reset password. It provides hooks, context, and utilities to build flexible, type-safe experiences that match your brand and deliver a seamless user experience.

---

> [!CAUTION]
>
> This feature is still in **Early Access**.

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
Refer to our [API Reference](#-api-reference) for the full list of available types and interfaces.

---

<a id="api-reference"></a>
## 💻 API Reference

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
  - Filter by error kind: `'client'`, `'server'`, `'dev'`
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

### Legal

**Early Access.** This SDK and its associated product are made available only in Early Access ("EA") format and are governed by the Free Trial terms of the [Okta Master Subscription Agreement](https://www.okta.com/agreements/#mastersubscriptionagreement). If Okta elects to make a version of this SDK and its associated product Generally Available ("GA"), such GA version may have different pricing, product and feature configurations, and use of the GA product and SDK will be subject to the standard terms of the Agreement (or other such titled written or electronic agreement addressing the same subject matter) between Okta and Customer."

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
