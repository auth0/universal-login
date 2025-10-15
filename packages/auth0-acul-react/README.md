# Auth0 ACUL React SDK

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/@auth0/auth0-acul-react)](https://www.npmjs.com/package/@auth0/auth0-acul-react)
[![Downloads](https://img.shields.io/npm/dw/@auth0/auth0-acul-react)](https://www.npmjs.com/package/@auth0/auth0-acul-react)
[![codecov](https://codecov.io/gh/auth0/auth0-acul-react/branch/main/graph/badge.svg)](https://codecov.io/gh/auth0/auth0-acul-react)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

</div>

<div align='center'>

📚 [Documentation](#-documentation) | 🚀 [Getting Started](#-getting-started) | 💻 [API Reference](#-api-reference) | 💬 [Feedback](#-feedback)

</div>

Developers using Auth0’s Universal Login can use this React SDK to customize screens like login, signup, or reset password. It provides hooks, context, and utilities to build flexible, type-safe experiences that match your brand and deliver a seamless user experience.

---

> [!CAUTION]
>
> This feature is still in **Early Access**.

## Installation

```bash
npm install @auth0/auth0-acul-react
```

Peer dependency:
```bash
npm install react
```
---
## Importing the SDK
The SDK supports `partial imports` for each screen, allowing you to include only the code you need for your specific use case. This helps keep your bundle size small and improves performance.
Also, you can use a `root import` to load all screens from a single bundle if your app requires it.
### Partial Imports
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

### Root Imports

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

### Types / Interfaces
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

## Examples
Check out the [`examples/`](https://github.com/auth0/universal-login/tree/main/packages/auth0-acul-react/examples) directory for complete, working examples of how to use this SDK to build custom Universal Login screens.

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
