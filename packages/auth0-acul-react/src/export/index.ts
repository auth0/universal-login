/**
 * @module Getting Started
 * @description
 * This module provides an overview of how to get started with the Auth0 SDK.
 *
 * # Auth0 ACUL React SDK
 *
 * ![ACUL React SDK](https://cdn.auth0.com/website/sdks/banners/auth0-acul-react-banner.png)
 *
 * [![NPM Version](https://img.shields.io/npm/v/@auth0/auth0-acul-react)](https://www.npmjs.com/package/@auth0/auth0-acul-react)
 * [![Downloads](https://img.shields.io/npm/dw/@auth0/auth0-acul-react)](https://www.npmjs.com/package/@auth0/auth0-acul-react)
 * [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)
 *
 * 📚 [Documentation](#documentation) - 🚀 [Getting Started](#getting-started) - 💻 [API Reference](#api-reference) - 💬 [Feedback](#feedback)
 *
 * The **Auth0 ACUL React SDK** provides React hooks for Advanced Customization of Universal Login.
 *
 * It simplifies integrating authentication screens (login, signup, passwordless, MFA, etc.) into your React applications with hooks-based architecture and TypeScript support.
 *
 * ## Features
 *
 * -  **React Hooks**: Custom hooks for all authentication screens
 * -  **TypeScript Support**: Full TypeScript definitions and IntelliSense
 * -  **Context Management**: Automatic screen context and state management
 * -  **Error Handling**: Built-in error boundaries and handling
 * -  **Polling Hooks**: MFA push notification polling with React state
 *
 * ## Installation
 *
 * You can install the React SDK via [npm](https://npmjs.org):
 *
 * ```bash
 * npm install @auth0/auth0-acul-react
 * ```
 *
 * Or using yarn:
 * ```bash
 * yarn add @auth0/auth0-acul-react
 * ```
 *
 * ## Quick Start
 *
 * ### Basic Login Screen with React Hooks
 *
 * ```tsx
 * import React from 'react';
 * import {
 *   useUser,
 *   useTenant,
 *   useScreen,
 *   loginMethod,
 *   continueWithFederatedLogin
 * } from '@auth0/auth0-acul-react/login-id';
 *
 * function LoginScreen() {
 *   const user = useUser();
 *   const tenant = useTenant();
 *   const screen = useScreen();
 *
 *   const handleLogin = async (username: string) => {
 *     try {
 *       await loginMethod({ username });
 *     } catch (error) {
 *       console.error('Login failed:', error);
 *     }
 *   };
 *
 *   const handleSocialLogin = async (connection: string) => {
 *     try {
 *       await continueWithFederatedLogin({ connection });
 *     } catch (error) {
 *       console.error('Social login failed:', error);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <h1>Welcome to {tenant.display_name}</h1>
 *       <form onSubmit={(e) => {
 *         e.preventDefault();
 *         const formData = new FormData(e.target);
 *         handleLogin(formData.get('username'));
 *       }}>
 *         <input name="username" placeholder="Email or Username" required />
 *         <button type="submit">Continue</button>
 *       </form>
 *
 *       {screen.alternate_connections?.map((conn) => (
 *         <button
 *           key={conn.name}
 *           onClick={() => handleSocialLogin(conn.name)}
 *         >
 *           Continue with {conn.display_name}
 *         </button>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 *
 * ### MFA Push Challenge with Polling
 *
 * ```tsx
 * import React, { useEffect, useState } from 'react';
 * import {
 *   useScreen,
 *   useTransaction,
 *   useMfaPollingManager,
 *   continueMethod,
 *   resendPushNotification
 * } from '@auth0/auth0-acul-react/mfa-push-challenge-push';
 *
 * function MfaPushScreen() {
 *   const screen = useScreen();
 *   const transaction = useTransaction();
 *   const [status, setStatus] = useState('waiting');
 *
 *   const { isRunning, startPolling, stopPolling } = useMfaPollingManager({
 *     intervalMs: 5000,
 *     onComplete: async () => {
 *       setStatus('approved');
 *       await continueMethod();
 *     },
 *     onError: (error) => {
 *       console.error('Polling failed:', error);
 *       setStatus('error');
 *     }
 *   });
 *
 *   useEffect(() => {
 *     // Auto-start polling when component mounts
 *     startPolling();
 *     return () => stopPolling();
 *   }, []);
 *
 *   const handleResend = async () => {
 *     try {
 *       await resendPushNotification();
 *       setStatus('resent');
 *       startPolling(); // Restart polling after resend
 *     } catch (error) {
 *       console.error('Resend failed:', error);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <h2>Push Notification Sent</h2>
 *       <p>Please approve the notification on your device</p>
 *
 *       {status === 'waiting' && isRunning && (
 *         <p>Waiting for approval...</p>
 *       )}
 *
 *       {status === 'approved' && (
 *         <p>Approved! Redirecting...</p>
 *       )}
 *
 *       {status === 'error' && (
 *         <p>Something went wrong. Please try again.</p>
 *       )}
 *
 *       <button onClick={handleResend} disabled={isRunning}>
 *         Resend Push Notification
 *       </button>
 *
 *       <button onClick={stopPolling} disabled={!isRunning}>
 *         Cancel
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * ## Available Hooks by Screen
 *
 * ### Context Hooks (Available in all screens)
 * - `useUser()` - Current user information
 * - `useTenant()` - Tenant configuration and branding
 * - `useClient()` - Application client information
 * - `useScreen()` - Current screen data and configuration
 * - `useTransaction()` - Transaction state and methods
 * - `useBranding()` - Tenant branding and theme
 * - `useOrganization()` - Organization context (if applicable)
 * - `usePrompt()` - Current authentication prompt
 * - `useUntrustedData()` - Untrusted data from the authentication flow
 *
 * ### Screen-Specific Action Methods
 * Each screen module exports methods for screen actions:
 *
 * ```tsx
 * // Login ID Screen
 * import {
 *   loginMethod,
 *   continueWithFederatedLogin,
 *   signupMethod
 * } from '@auth0/auth0-acul-react/login-id';
 *
 * // Password Screen
 * import {
 *   loginMethod,
 *   forgotPasswordMethod
 * } from '@auth0/auth0-acul-react/login-password';
 *
 * // MFA Push Challenge
 * import {
 *   continueMethod,
 *   resendPushNotification,
 *   useMfaPollingManager
 * } from '@auth0/auth0-acul-react/mfa-push-challenge-push';
 * ```
 *
 * ## Import Patterns
 *
 * ### Screen-Specific Imports (Recommended)
 * ```tsx
 * // Import from specific screen modules
 * import { useUser, loginMethod } from '@auth0/auth0-acul-react/login-id';
 * import { useMfaPollingManager } from '@auth0/auth0-acul-react/mfa-push-challenge-push';
 * ```
 * ## Available Screen Modules
 *
 * | Screen Module | Import Path | Description |
 * |---------------|-------------|-------------|
 * | Login ID | `@auth0/auth0-acul-react/login-id` | Username/email identification |
 * | Login Password | `@auth0/auth0-acul-react/login-password` | Password entry screen |
 * | MFA Push Challenge | `@auth0/auth0-acul-react/mfa-push-challenge-push` | Push notification MFA |
 * | Reset Password MFA Push | `@auth0/auth0-acul-react/reset-password-mfa-push-challenge-push` | Reset password with MFA |
 * | Signup ID | `@auth0/auth0-acul-react/signup-id` | User registration |
 * | Signup Password | `@auth0/auth0-acul-react/signup-password` | Password setup during registration |
 *
 * ## React-Specific Features
 *
 * ### 1. **State Management**
 * - Automatic React state synchronization
 * - Optimized re-renders with useMemo and useCallback
 * - Context-aware state updates
 *
 * ### 2. **Lifecycle Integration**
 * - Automatic cleanup on component unmount
 * - Effect hooks for side effects
 * - Proper dependency management
 *
 * ### 3. **Polling Management**
 * - React-aware polling with `useMfaPollingManager`
 * - Automatic pause/resume on tab visibility
 * - State-driven polling controls
 *
 * ### 4. **Error Boundaries**
 * - Built-in error handling for authentication flows
 * - React Error Boundary compatibility
 * - Graceful error recovery
 *
 * ## Best Practices
 *
 * ### 1. **Use Screen-Specific Imports**
 * ```tsx
 * // Good - only imports what you need
 * import { useUser, loginMethod } from '@auth0/auth0-acul-react/login-id';
 *
 * ```
 *
 * ### 2. **Handle Loading States**
 * ```tsx
 * function LoginForm() {
 *   const [isLoading, setIsLoading] = useState(false);
 *
 *   const handleSubmit = async (data) => {
 *     setIsLoading(true);
 *     try {
 *       await loginMethod(data);
 *     } finally {
 *       setIsLoading(false);
 *     }
 *   };
 *
 *   return (
 *     <button disabled={isLoading}>
 *       {isLoading ? 'Signing in...' : 'Sign In'}
 *     </button>
 *   );
 * }
 * ```
 *
 * ## Examples and Resources
 *
 * - [React Examples](https://github.com/auth0/universal-login/tree/master/packages/auth0-acul-react/examples) - Complete React component examples
 * - [TypeScript Examples](https://github.com/auth0/universal-login/tree/master/packages/auth0-acul-react/examples/typescript) - TypeScript integration examples
 * - [React Boilerplate](https://github.com/auth0/auth0-acul-react-boilerplate) - Full React application template
 * - [Hook Patterns](https://github.com/auth0/universal-login/tree/master/packages/auth0-acul-react/examples/hooks) - Custom hook patterns and utilities
 *
 * ## Feedback and Support
 *
 * ### Contributing
 *
 * We appreciate feedback and contribution to this repo! Before you get started, please see the following:
 *
 * - [Auth0's general contribution guidelines](https://github.com/auth0/open-source-template/blob/master/GENERAL-CONTRIBUTING.md)
 * - [Auth0's code of conduct guidelines](https://github.com/auth0/open-source-template/blob/master/CODE-OF-CONDUCT.md)
 *
 * ### Raise an Issue
 *
 * To provide feedback or report a bug, please [raise an issue on our issue tracker](https://github.com/auth0/universal-login/issues).
 *
 * ### Vulnerability Reporting
 *
 * Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/responsible-disclosure-policy) details the procedure for disclosing security issues.
 *
 * ---
 *
 * **Early Access Notice:** This SDK and its associated product are made available only in Early Access ("EA") format and are governed by the Free Trial terms of the [Okta Master Subscription Agreement](https://www.okta.com/agreements/#mastersubscriptionagreement).
 *
 * <p align="center">
 *  <picture>
 *    <source media="(prefers-color-scheme: light)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png"   width="150">
 *    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_dark_mode.png" width="150">
 *    <img alt="Auth0 Logo" src="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png" width="150">
 *  </picture>
 *</p>
 *
 * This project is licensed under the MIT license. See the [LICENSE](https://github.com/auth0/universal-login/blob/master/LICENSE) file for more info.
 */

/**
 * @module API Reference
 */
export * as Screens from './screens';
export * as Hooks from './hooks';
export type * as Types from '../types';
