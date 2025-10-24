# Auth0 ACUL JS SDK

![ACUL JS SDK](https://cdn.auth0.com/website/sdks/banners/auth0-acul-js-banner.png)

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/@auth0/auth0-acul-js)](https://www.npmjs.com/package/@auth0/auth0-acul-js)
[![Downloads](https://img.shields.io/npm/dw/@auth0/auth0-acul-js)](https://www.npmjs.com/package/@auth0/auth0-acul-js)
[![codecov](https://codecov.io/gh/auth0/auth0-acul-js/branch/main/graph/badge.svg)](https://codecov.io/gh/auth0/auth0-acul-js)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

</div>

<div align='center'>

📚 [Documentation](#documentation) - 🚀 [Getting Started](#getting-started) - 💻 [API Reference](#api-reference) - [Helper Functions](#helper-functions) - 💬 [Feedback](#feedback)

</div>

The **Auth0 ACUL JS SDK** enables you to work with Advanced Customization for Universal Login.

It simplifies integrating authentication screens (login, signup, passwordless, passkey enrollment, etc.) into your web applications, providing the necessary tools for seamless implementation.

> [!CAUTION]
>
> This feature is still in **Early Access**.

<a id="documentation"></a>
## 📚 Documentation

- [Quickstart](https://auth0.com/docs/customize/login-pages/advanced-customizations/getting-started/sdk-quickstart) - our guide for setting up the SDK on your app.
- [Guides](https://auth0.com/docs/customize/login-pages/advanced-customizations/screens) - more guides for common use cases
- [Examples](https://github.com/auth0/universal-login/tree/master/packages/auth0-acul-js/examples) - code snippets for different customization use cases.
- [FAQs](FAQ.md) - Find answers to frequently asked questions about the Auth0 ACUL JS SDK.

<a id="getting-started"></a>
## 🚀 Getting started

### Prerequisites
Before starting, ensure that you have the following setup:

1. **Custom Domain**: Ensure that a custom domain is configured for your Auth0 tenant.
2. **Screen Configuration**: Set up the required authentication screens within your Auth0 flow.  
   For detailed steps, refer to the [Configure ACUL Screens](https://auth0.com/docs/customize/login-pages/advanced-customizations/getting-started/configure-acul-screens).

### Installation

You can easily install the SDK via [npm](https://npmjs.org):

```sh
npm install @auth0/auth0-acul-js
```


After installing the SDK, you can import the relevant screen module, which you want to configure

### Importing Screens

```js
// Default import of any particular screen, eg: login-id screen
import  LoginId  from '@auth0/auth0-acul-js/login-id'; 

// Named import of any screen
import  { LoginId }  from '@auth0/auth0-acul-js'; 

// Default import of all screens
import  * as Screens  from '@auth0/auth0-acul-js'; 

```
Note: For more details on import paths for all screens, refer to the [FAQ's](FAQ.md).

## 👨‍💻 Usage

### Adding Functionality to Your Screens

Let’s look at an example for adding logic to the `login-id` screen.

#### Example: Add Logic to Login Button
```typescript
  import  LoginId  from '@auth0/auth0-acul-js/login-id';

  const loginIdManager = new LoginId();

  // Trigger the login method on button click
  loginIdManager.login({
    username: "testUser"
  });
``` 

#### Get List of Mandatory Fields for Login
 ```typescript
 const { transaction } = loginIdManager
 const requiredFields = transaction.getActiveIdentifiers();
 ```

 #### Integrating Social Connections for Login
To allow users to login via social connections (e.g., Google, Facebook), use the following snippet

```typescript
import  LoginId  from "@auth0/auth0-acul-js/login-id";
const loginIdManager = new LoginId();

// Check if alternateConnections is available and has at least one item
if (!loginIdManager.transaction.alternateConnections) {
  console.error('No alternate connections available.');
}

// Select the first available connection (users can select any available connection)
const selectedConnection = alternateConnections[0];

// Log the chosen connection for debugging or informational purposes
console.log(`Selected connection: ${selectedConnection.name}`);

// Proceed with social login using the selected connection
loginIdManager.socialLogin({
  connection: selectedConnection.name,
})
```

 #### Error handling for Login
A top-level getter function, `getErrors`, can be used to retrieve detailed authentication errors when backend validation fails.

```javascript
import Login from "@auth0/auth0-acul-js/login";

const loginIdManager = new Login();

const errors = loginIdManager.getErrors();
if (errors) {
  console.error("Login failed:", errors);
}
```

Same can also be achieved using the `transaction.errors` available directly on the screen context for each screen.
```javascript
import Login from "@auth0/auth0-acul-js/login";

const loginIdManager = new Login();

const errors = loginIdManager.transaction?.errors ?? [];
if (errors) {
  console.error("Login failed:", errors);
}
```

For more examples, visit our [examples](https://github.com/auth0/universal-login/blob/master/packages/auth0-acul-js/examples/login-id.md)

## Quick Start with Boilerplate App
Get up and running quickly with our boilerplate starter template: [Link](https://github.com/auth0/auth0-acul-react-boilerplate)

<a id="api-reference"></a>
## 💻 API reference
### Screens

| No.    | Prompt             | Screen Name       | Documentation Link                                                                                    |
|--------|--------------------|-------------------|--------------------------------------------------------------------------------------------|
| 1      | login              | login             | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.Login)                 |
| 2      | loginId            | login-id          | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.LoginId)               |
| 3      | login-password     | login-password    | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.LoginPassword)         |
| 4      | signup-id          | signup-id         | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.SignupId)              |
| 5      | signup-password    | signup-password   | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.SignupPassword)        |

<details>
  <summary>Explore more screens...</summary>

| No.    | Prompt                         | Screen Name                                      | Documentation Link                                                                                                                        |
|--------|--------------------------------|-------------------------------------------|-------------------------------------------------------------------------------------------------------|
| 6      | login-passwordless             | login-passwordless-email-code             | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.LoginPasswordlessEmailCode)   |
| 7      | login-passwordless             | login-passwordless-sms-otp                | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.LoginPasswordlessSmsOtp)      |
| 8      | passkeys                       | passkey-enrollment                        | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.PasskeyEnrollment)                |
| 9      | passkeys                       | passkey-enrollment-local                  | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.PasskeyEnrollmentLocal)           |
| 10     | phone-identifier-enrollment    | phone-identifier-enrollment               | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.PhoneIdentifierEnrollment)    |
| 11     | phone-identifier-challenge     | phone-identifier-challenge                | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.PhoneIdentifierChallenge)         |
| 12     | email-identifier-challenge     | email-identifier-challenge                | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.EmailIdentifierChallenge)     |
| 13     | captcha                        | interstitial-captcha                      | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.InterstitialCaptcha)      |
| 14     | reset-password                 | reset-password-email                      | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.ResetPasswordEmail)       |
| 15     | reset-password                 | reset-password-request                    | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.ResetPasswordRequest)        |
| 16     | reset-password                 | reset-password                            | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.ResetPassword)                |
| 17     | reset-password                 | reset-password-error                      | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.ResetPasswordError)            |
| 18     | reset-password                 | reset-password-success                    | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.ResetPasswordSuccess)         |
| 19     | signup                         | signup                                    | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.Signup)                        |
| 20     | mfa                            | mfa-detect-browser-capabilities           | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaDetectBrowserCapabilities)   |
| 21     | mfa                            | mfa-enroll-result                         | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaEnrollResult)   |
| 22     | mfa                            | mfa-begin-enroll-options                  | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaBeginEnrollOptions)       |
| 23     | mfa                            | mfa-login-options                         | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaLoginOptions)   |
| 24     | mfa-push                       | mfa-push-enrollment-qr                    | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaPushEnrollmentQr)            |
| 25     | mfa-push                       | mfa-push-welcome                          | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaPushWelcome)            |
| 26     | mfa-push                       | mfa-push-challenge-push                   | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaPushChallengePush)   |
| 27     | mfa-push                       | mfa-push-list                             | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaPushList)                   |
| 28     | mfa-sms                        | mfa-country-codes                         | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaCountryCodes)              |
| 29     | mfa-sms                        | mfa-sms-challenge                         |   [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaSmsChallenge)                 |
| 30     | mfa-sms                        | mfa-sms-enrollment                        | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaSmsEnrollment)           |
| 31     | mfa-sms                        | mfa-sms-list                              |  [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaSmsList)                  |
| 32     | mfa-email                      | mfa-email-challenge                       | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaEmailChallenge)   |
| 33     | mfa-email                      | mfa-email-list                            | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaEmailList)   |
| 34     | invitatino                     | accept-invitation                         | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.AcceptInvitation)   |
| 35     | organizations                  | organization-picker                       | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.OrganizationPicker)        |
| 36     | organizations                  | organization-selection                    | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.OrganizationSelection)        |
| 37     | reset-password                 | mfa-otp-challenge                         | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaOtpChallenge)   |
| 38     | mfa-otp                        | mfa-otp-enrollment-code                   | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaOtpEnrollmentCode)   |
| 39     | mfa-otp                        | mfa-otp-enrollment-qr                     | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaOtpEnrollmentQr)   |
| 40     | reset-password                 | reset-password-mfa-email-challenge        | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.ResetPasswordMfaEmailChallenge)  |
| 41     | reset-password                 | reset-password-mfa-push-challenge-push    | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.ResetPasswordMfaPushChallengePush)|
| 42     | reset-password                 | mfa-sms-challenge                         | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.ResetPasswordMfaSmsChallenge)   |
| 43     | reset-password                 | reset-password-mfa-otp-challenge          | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.OrganizationSelection)   |
| 44     | mfa-phone                      | mfa-phone-enrollment                      | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaPhoneEnrollment)   |
| 45     | mfa-voice                      | mfa-voice-enrollment                      | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaVoiceEnrollment)   |
| 46     | mfa-recovery-code              | mfa-recovery-code-challenge               | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaRecoveryCodeChallenge)   |
| 47     | device-flow                    | device-code-activation-allowed            | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.DeviceCodeActivationAllowed)   |
| 48     | device-flow                    | device-code-activation-denied             | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.DeviceCodeActivationDenied)   |
| 49     | device-flow                    | device-code-activation                    | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.DeviceCodeActivation)   |
| 50     | reset-password             | reset-password-mfa-recovery-code-challenge | [Link](https://auth0.github.io/universallogin/classes/Classes.ResetPasswordMfaRecoveryCodeChallenge) |
| 51     | reset-password                 | reset-password-mfa-voice                  | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.ResetPasswordMfaVoiceChallenge)   |
| 52     | common                         | redeem-ticket                             | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.RedeemTicket)   |
| 53     | device-flow                    | device-code-confirmation                  | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.DeviceCodeConfirmation)   |
| 54     | mfa-phone                      | mfa-phone-challenge                       | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaPhoneChallenge) |
| 55     | mfa-voice                      | mfa-voice-challenge                       | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaVoiceChallenge)   |
| 56     | mfa-recovery-code              | mfa-recovery-code-enrollment              | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaRecoveryCodeEnrollment)   |
| 57     | reset-password                 | reset-password-mfa-phone-challenge        | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.ResetPasswordMfaPhoneChallenge)   |
| 58     | mfa-recovery-code              | mfa-recovery-code-challenge-new-code      | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaRecoveryCodeChallengeNewCode) |
| 59     | logout                         | logout                                    | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.Logout) |
| 60     | logout                         | logout-aborted                            | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.LogoutAborted) |
| 61     | logout                         | logout-complete                           | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.LogoutComplete) |
| 62     | email-verification             | email-verification-result                 | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.EmailVerificationResult) |
| 63     | login-email-verification       | login-email-verification                  | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.LoginEmailVerification) |
| 64     |mfa-webauthn                    | mfa-webauthn-platform-enrollment        | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaWebAuthnPlatformEnrollment)                        |
| 65     |mfa-webauthn                    | mfa-webauthn-error        | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaWebAuthnError)                        |
| 66     |mfa-webauthn                    | mfa-webauthn-roaming-enrollment         | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaWebAuthnRoamingEnrollment)   |
| 67     |mfa-webauthn                    | mfa-webauthn-roaming-challenge          | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaWebAuthnRoamingChallenge)    |
| 68     |mfa-webauthn                    | mfa-webauthn-platform-challenge         | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaWebAuthnPlatformChallenge)   |
| 69     |mfa-webauthn                    | mfa-webauthn-enrollment-success         | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaWebAuthnEnrollmentSuccess)   |
| 70     |mfa-webauthn                    | mfa-webauthn-change-key-nickname        | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaWebAuthnChangeKeyNickname)   |
| 71     |mfa-webauthn                    | mfa-webauthn-not-available-error        | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.MfaWebAuthnNotAvailableError)   |
| 72     |reset-password                    | reset-password-mfa-webauthn-platform-challenge | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.ResetPasswordMfaWebAuthnPlatformChallenge)                |
| 73     |reset-password                    | reset-password-mfa-webauthn-roaming-challenge | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.ResetPasswordMfaWebAuthnRoamingChallenge)   |
| 74     |consent                   | consent | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.consent)   |
| 75     |customized-consent        | customized-consent | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.CustomizedConsent)   |
| 76     |email-otp-challenge                   | email-otp-challenge | [Link](https://acul-docs.netlify.app/auth0-acul-js/classes/screens.EmailOTPChallenge)   |
</details>


## Helper Functions
This section documents the helper methods and properties exposed by the screen instance in auth0-acul-js.

### Context properties
- `user`- Current user/profile data for the active transaction.

- `tenant`- Tenant configuration and metadata (domain, region, settings).

- `branding`- Branding/theme config (colors, logos, fonts, visual tokens).

- `client`- Application client metadata and settings.

- `organization`- Organization context when applicable.

- `prompt`- Current prompt / flow configuration.

- `untrustedData`- Untrusted inputs (URL params, prefilled form values).

- `screen`- Current screen metadata and configuration.

- `transaction`- Transaction / flow state, session identifiers and related data.

### Identifier management
- `getLoginIdentifiers()`: 
  Get available login identifier types (email, phone, username)

- `getSignupIdentifiers()`: Get available signup identifier types, each with its `required` status

### Form validation
- `validatePassword(password: string)`: 
  Real-time password strength validation
- `validateUsername(username: string)`: Username format and availability validation

### MFA / Push polling & resend
- `pollingManager()`: Starts and manages polling for an MFA push challenge.

- `resendManager()` 
  Gets resend functionality with timeout management for this screen.
 
### Common helpers
- `getCurrentScreen()`  
  Return the current screen context data.

- `getCurrentThemeOptions()` 
  Gets the current theme options with flattened configuration from branding context.

- `getErrors()`
   Gets the current errors from the transaction context


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
