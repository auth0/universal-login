/**
 * @module Getting Started
 * @description
 * This module provides an overview of how to get started with the Auth0 React SDK.
 *
 * ## Installation
 *
 * Install the Auth0 React SDK using npm or yarn:
 *
 * ```bash
 * npm install @auth0/auth0-acul-react
 * # or
 * yarn add @auth0/auth0-acul-react
 * ```
 *
 * ## Basic Setup
 *
 * The Auth0 React SDK provides pre-built React components for Auth0 Universal Login screens.
 * Each screen corresponds to a specific step in the authentication flow.
 *
 * ### Import Components
 *
 * ```tsx
 * import { LoginId } from '@auth0/auth0-acul-react/login-id';
 * import { LoginPassword } from '@auth0/auth0-acul-react/login-password';
 * import { SignupId } from '@auth0/auth0-acul-react/signup-id';
 * ```
 *
 * ### Basic Usage Example
 *
 * ```tsx
 * import React from 'react';
 * import { LoginId } from '@auth0/auth0-acul-react/login-id';
 *
 * function MyLoginPage() {
 *   return (
 *     <div>
 *       <h1>Welcome to Our App</h1>
 *       <LoginId />
 *     </div>
 *   );
 * }
 *
 * export default MyLoginPage;
 * ```
 *
 * ## Available Components
 *
 * The SDK provides components for various authentication screens:
 *
 * - **Login Screens**: `LoginId`, `LoginPassword`, `Login`
 * - **Signup Screens**: `SignupId`, `SignupPassword`, `Signup`
 * - **Password Reset**: `ResetPassword`, `ResetPasswordRequest`, `ResetPasswordEmail`
 * - **MFA Screens**: `MfaOtpChallenge`, `MfaSmsChallenge`, `MfaEmailChallenge`
 * - **Passwordless**: `LoginPasswordlessEmailCode`, `LoginPasswordlessSmsOtp`
 * - **Organization**: `OrganizationSelection`, `OrganizationPicker`
 *
 * ## Peer Dependencies
 *
 * This package requires React 18.3.1 or higher as a peer dependency:
 *
 * ```json
 * {
 *   "peerDependencies": {
 *     "react": "^18.3.1"
 *   }
 * }
 * ```
 *
 * ## Next Steps
 *
 * - Explore individual component documentation for detailed usage examples
 * - Check the examples folder for complete implementation samples
 * - Refer to the Auth0 Universal Login documentation for flow configuration
 *
 * ---

* <p align="center">
*   <picture>
*     <source media="(prefers-color-scheme: light)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png"   width="150">
*     <source media="(prefers-color-scheme: dark)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_dark_mode.png" width="150">
*     <img alt="Auth0 Logo" src="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png" width="150">
*   </picture>
* </p>
* <p align="center">Auth0 is an easy to implement, adaptable authentication and authorization platform. To learn more checkout <a href="https://auth0.com/why-auth0">Why Auth0?</a></p>
* <p align="center">
 */
