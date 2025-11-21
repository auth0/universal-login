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
| 1      | login              | login             | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.Login.html)                 |
| 2      | login-id            | login-id          | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.LoginId.html)               |
| 3      | login-password     | login-password    | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.LoginPassword.html)         |
| 4      | signup-id          | signup-id         | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.SignupId.html)              |
| 5      | signup-password    | signup-password   | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.SignupPassword.html)        |

<details>
  <summary>Explore more Screens...</summary>

| No.    | Prompt                         | Screen Name                                      | Documentation Link                                                                                                                        |
|--------|--------------------------------|-------------------------------------------|-------------------------------------------------------------------------------------------------------|
| 6      | login-passwordless             | login-passwordless-email-code             | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.LoginPasswordlessEmailCode.html)   |
| 7      | login-passwordless             | login-passwordless-sms-otp                | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.LoginPasswordlessSmsOtp.html)      |
| 8      | passkeys                       | passkey-enrollment                        | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.PasskeyEnrollment.html)                |
| 9      | passkeys                       | passkey-enrollment-local                  | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.PasskeyEnrollmentLocal.html)           |
| 10     | phone-identifier-enrollment    | phone-identifier-enrollment               | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.PhoneIdentifierEnrollment.html)    |
| 11     | phone-identifier-challenge     | phone-identifier-challenge                | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.PhoneIdentifierChallenge.html)         |
| 12     | email-identifier-challenge     | email-identifier-challenge                | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.EmailIdentifierChallenge.html)     |
| 13     | captcha                        | interstitial-captcha                      | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.InterstitialCaptcha.html)      |
| 14     | reset-password                 | reset-password-email                      | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPasswordEmail.html)       |
| 15     | reset-password                 | reset-password-request                    | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPasswordRequest.html)        |
| 16     | reset-password                 | reset-password                            | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPassword.html)                |
| 17     | reset-password                 | reset-password-error                      | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPasswordError.html)            |
| 18     | reset-password                 | reset-password-success                    | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPasswordSuccess.html)         |
| 19     | signup                         | signup                                    | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.Signup.html)                        |
| 20     | mfa                            | mfa-detect-browser-capabilities           | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaDetectBrowserCapabilities.html)   |
| 21     | mfa                            | mfa-enroll-result                         | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaEnrollResult.html)   |
| 22     | mfa                            | mfa-begin-enroll-options                  | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaBeginEnrollOptions.html)       |
| 23     | mfa                            | mfa-login-options                         | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaLoginOptions.html)   |
| 24     | mfa-push                       | mfa-push-enrollment-qr                    | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaPushEnrollmentQr.html)            |
| 25     | mfa-push                       | mfa-push-welcome                          | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaPushWelcome.html)            |
| 26     | mfa-push                       | mfa-push-challenge-push                   | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaPushChallengePush.html)   |
| 27     | mfa-push                       | mfa-push-list                             | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaPushList.html)                   |
| 28     | mfa-sms                        | mfa-country-codes                         | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaCountryCodes.html)              |
| 29     | mfa-sms                        | mfa-sms-challenge                         |   [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaSmsChallenge.html)                 |
| 30     | mfa-sms                        | mfa-sms-enrollment                        | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaSmsEnrollment.html)           |
| 31     | mfa-sms                        | mfa-sms-list                              |  [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaSmsList.html)                  |
| 32     | mfa-email                      | mfa-email-challenge                       | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaEmailChallenge.html)   |
| 33     | mfa-email                      | mfa-email-list                            | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaEmailList.html)   |
| 34     | invitatino                     | accept-invitation                         | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.AcceptInvitation.html)   |
| 35     | organizations                  | organization-picker                       | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.OrganizationPicker.html)        |
| 36     | organizations                  | organization-selection                    | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.OrganizationSelection.html)        |
| 37     | reset-password                 | mfa-otp-challenge                         | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaOtpChallenge.html)   |
| 38     | mfa-otp                        | mfa-otp-enrollment-code                   | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaOtpEnrollmentCode.html)   |
| 39     | mfa-otp                        | mfa-otp-enrollment-qr                     | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaOtpEnrollmentQr.html)   |
| 40     | reset-password                 | reset-password-mfa-email-challenge        | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPasswordMfaEmailChallenge.html)  |
| 41     | reset-password                 | reset-password-mfa-push-challenge-push    | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPasswordMfaPushChallengePush.html)|
| 42     | reset-password                 | mfa-sms-challenge                         | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPasswordMfaSmsChallenge.html)   |
| 43     | reset-password                 | reset-password-mfa-otp-challenge          | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.OrganizationSelection.html)   |
| 44     | mfa-phone                      | mfa-phone-enrollment                      | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaPhoneEnrollment.html)   |
| 45     | mfa-voice                      | mfa-voice-enrollment                      | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaVoiceEnrollment.html)   |
| 46     | mfa-recovery-code              | mfa-recovery-code-challenge               | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaRecoveryCodeChallenge.html)   |
| 47     | device-flow                    | device-code-activation-allowed            | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.DeviceCodeActivationAllowed.html)   |
| 48     | device-flow                    | device-code-activation-denied             | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.DeviceCodeActivationDenied.html)   |
| 49     | device-flow                    | device-code-activation                    | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.DeviceCodeActivation.html)   |
| 50     | reset-password             | reset-password-mfa-recovery-code-challenge | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPasswordMfaRecoveryCodeChallenge.html) |
| 51     | reset-password                 | reset-password-mfa-voice                  | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPasswordMfaVoiceChallenge.html)   |
| 52     | common                         | redeem-ticket                             | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.RedeemTicket.html)   |
| 53     | device-flow                    | device-code-confirmation                  | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.DeviceCodeConfirmation.html)   |
| 54     | mfa-phone                      | mfa-phone-challenge                       | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaPhoneChallenge.html) |
| 55     | mfa-voice                      | mfa-voice-challenge                       | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaVoiceChallenge.html)   |
| 56     | mfa-recovery-code              | mfa-recovery-code-enrollment              | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaRecoveryCodeEnrollment.html)   |
| 57     | reset-password                 | reset-password-mfa-phone-challenge        | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPasswordMfaPhoneChallenge.html)   |
| 58     | mfa-recovery-code              | mfa-recovery-code-challenge-new-code      | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaRecoveryCodeChallengeNewCode.html) |
| 59     | logout                         | logout                                    | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.Logout.html) |
| 60     | logout                         | logout-aborted                            | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.LogoutAborted.html) |
| 61     | logout                         | logout-complete                           | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.LogoutComplete.html) |
| 62     | email-verification             | email-verification-result                 | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.EmailVerificationResult.html) |
| 63     | login-email-verification       | login-email-verification                  | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.LoginEmailVerification.html) |
| 64     |mfa-webauthn                    | mfa-webauthn-platform-enrollment        | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaWebAuthnPlatformEnrollment.html)                        |
| 65     |mfa-webauthn                    | mfa-webauthn-error        | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaWebAuthnError.html)                        |
| 66     |mfa-webauthn                    | mfa-webauthn-roaming-enrollment         | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaWebAuthnRoamingEnrollment.html)   |
| 67     |mfa-webauthn                    | mfa-webauthn-roaming-challenge          | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaWebAuthnRoamingChallenge.html)    |
| 68     |mfa-webauthn                    | mfa-webauthn-platform-challenge         | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaWebAuthnPlatformChallenge.html)   |
| 69     |mfa-webauthn                    | mfa-webauthn-enrollment-success         | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaWebAuthnEnrollmentSuccess.html)   |
| 70     |mfa-webauthn                    | mfa-webauthn-change-key-nickname        | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaWebAuthnChangeKeyNickname.html)   |
| 71     |mfa-webauthn                    | mfa-webauthn-not-available-error        | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.MfaWebAuthnNotAvailableError.html)   |
| 72     |reset-password                    | reset-password-mfa-webauthn-platform-challenge | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPasswordMfaWebAuthnPlatformChallenge.html)                |
| 73     |reset-password                    | reset-password-mfa-webauthn-roaming-challenge | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.ResetPasswordMfaWebAuthnRoamingChallenge.html)   |
| 74     |consent                   | consent | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.consent.html)   |
| 75     |customized-consent        | customized-consent | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.CustomizedConsent.html)   |
| 76     |email-otp-challenge                   | email-otp-challenge | [Link](https://auth0.github.io/universal-login/auth0-acul-js/classes/Screens.EmailOTPChallenge.html)   |
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
