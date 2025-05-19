# Auth0 ACUL JS SDK

![ACUL JS SDK](https://cdn.auth0.com/website/sdks/banners/auth0-acul-js-banner.png)

![Release](https://img.shields.io/npm/v/auth0-acul-js)
[![Codecov](https://img.shields.io/codecov/c/github/auth0/auth0-acul-js)](https://codecov.io/gh/auth0/auth0-acul-js)
![Downloads](https://img.shields.io/npm/dw/auth0-acul-js)
[![License](https://img.shields.io/:license-mit-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

📚 [Documentation](#documentation) - 🚀 [Getting Started](#getting-started) - 💻 [API Reference](#api-reference) - 💬 [Feedback](#feedback)

The **Auth0 ACUL JS SDK** enables you to work with Advanced Customization for Universal Login.

It simplifies integrating authentication screens (login, signup, passwordless, passkey enrollment, etc.) into your web applications, providing the necessary tools for seamless implementation.

⚠ This feature is still in **Early Access**. Please contact your Account Manager to get this feature enabled on your Auth0 tenant. [read more...](#legal)

##  Documentation

- [Quickstart](https://auth0.com/docs/customize/login-pages/advanced-customizations/getting-started/sdk-quickstart) - our guide for setting up the SDK on your app.
- [Guides](https://auth0.com/docs/customize/login-pages/advanced-customizations/screens) - more guides for common use cases
- [Examples](https://github.com/auth0/universal-login/tree/master/packages/auth0-acul-js/examples) - code snippets for different customization use cases.
- [FAQs](FAQ.md) - Find answers to frequently asked questions about the Auth0 ACUL JS SDK.

##  Getting started

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

## Usage

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
if (!loginIdManager.transaction.getAlternateConnections()) {
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
For more examples, visit our [examples](https://github.com/auth0/universal-login/blob/master/packages/auth0-acul-js/examples/login-id.md)

## Quick Start with Boilerplate App
Get up and running quickly with our boilerplate starter template: [Link](https://github.com/auth0/auth0-acul-react-boilerplate)

##  API reference
### Screens

| No. | Screen Name       | Documentation Link                                                                                      |
|--------|-------------------|-------------------------------------------------------------------------------------------|
| 1      | login             | [Link](https://auth0.github.io/universal-login/classes/Classes.Login.html)                 |
| 2      | login-id          | [Link](https://auth0.github.io/universal-login/classes/Classes.LoginId.html)              |
| 3      | login-password    | [Link](https://auth0.github.io/universal-login/classes/Classes.LoginPassword.html)         |
| 4      | signup-id         | [Link](https://auth0.github.io/universal-login/classes/Classes.SignupId.html)              |
| 5      | signup-password   | [Link](https://auth0.github.io/universal-login/classes/Classes.SignupPassword.html)        |

<details>
  <summary>Explore more screens...</summary>

| No. | Screen Name                                      | Documentation Link                                                                                                                        |
|--------|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| 6      | login-passwordless-email-code            | [Link](https://auth0.github.io/universal-login/classes/Classes.LoginPasswordlessEmailCode.html)                             |
| 7      | login-passwordless-sms-otp                | [Link](https://auth0.github.io/universal-login/classes/Classes.LoginPasswordlessSmsOtp.html)                                 |
| 8      | passkey-enrollment                        | [Link](https://auth0.github.io/universal-login/classes/Classes.PasskeyEnrollment.html)                                       |
| 9      | passkey-enrollment-local                  | [Link](https://auth0.github.io/universal-login/classes/Classes.PasskeyEnrollmentLocal.html)                                 |
| 10     | phone-identifier-enrollment               | [Link](https://auth0.github.io/universal-login/classes/Classes.PhoneIdentifierEnrollment.html)                               |
| 11     | phone-identifier-challenge                | [Link](https://auth0.github.io/universal-login/classes/Classes.PhoneIdentifierChallenge.html)                               |
| 12     | email-identifier-challenge                | [Link](https://auth0.github.io/universal-login/classes/Classes.EmailIdentifierChallenge.html)                               |
| 13     | interstitial-captcha                      | [Link](https://auth0.github.io/universal-login/classes/Classes.InterstitialCaptcha.html)                                     |
| 14     | reset-password-email                      | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordEmail.html)                                     |
| 15     | reset-password-request                    | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordRequest.html)                                   |
| 16     | reset-password                            | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPassword.html)                                         |
| 17     | reset-password-error                      | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordError.html)                                     |
| 18     | reset-password-success                    | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordSuccess.html)                                   |
| 19     | signup                                    | [Link](https://auth0.github.io/universal-login/classes/Classes.Signup.html)                                               |
| 20     | mfa-detect-browser-capabilities          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaDetectBrowserCapabilities.html)   |
| 21     | mfa-enroll-result          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaEnrollResult.html)   |
| 22     | mfa-begin-enroll-options                  | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaBeginEnrollOptions.html)                                 |
| 23     | mfa-login-options          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaLoginOptions.html)   |
| 24     | mfa-push-enrollment-qr                    | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaPushEnrollmentQr.html)                                  |
| 25     | mfa-push-welcome                          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaPushWelcome.html)                                        |
| 26     | mfa-push-challenge-push          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaPushChallengePush.html)   |
| 27     | mfa-push-list                             | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaPushList.html)                                           |
| 28     | mfa-country-codes                         | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaCountryCodes.html)                                       |
| 29     | mfa-sms-challenge                  |   [Link](https://auth0.github.io/universal-login/classes/Classes.MfaSmsChallenge.html)                                 |
| 30     | mfa-sms-enrollment                        | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaSmsEnrollment.html)                                        |
| 31     | mfa-sms-list                  |   [Link](https://auth0.github.io/universal-login/classes/Classes.MfaSmsList.html)                                 |
| 32     | mfa-email-challenge          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaEmailChallenge.html)   |
| 33     | mfa-email-list          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaEmailList.html)   |
| 34     | accept-invitation          | [Link](https://auth0.github.io/universal-login/classes/Classes.AcceptInvitation.html)   |
| 35     | organization-picker   | [Link](https://auth0.github.io/universal-login/classes/Classes.OrganizationPicker.html)        |
| 36     | organization-selection   | [Link](https://auth0.github.io/universal-login/classes/Classes.OrganizationSelection.html)        |
| 37     | mfa-otp-challenge          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaOtpChallenge.html)   |
| 38     | mfa-otp-enrollment-code          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaOtpEnrollmentCode.html)   |
| 39     | mfa-otp-enrollment-qr          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaOtpEnrollmentQr.html)   |
| 40     | reset-password-mfa-email-challenge          | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaEmailChallenge.html)   |
| 41     | reset-password-mfa-push-challenge-push          | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaPushChallengePush.html)   |
| 42     | reset-password-mfa-sms-challenge          | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaSmsChallenge.html)   |
| 43     | reset-password-mfa-otp-challenge          | [Link](https://auth0.github.io/universal-login/classes/Classes.OrganizationSelection.html)   |
| 44     | mfa-phone-enrollment          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaPhoneEnrollment.html)   |
| 45     | mfa-voice-enrollment          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaVoiceEnrollment.html)   |
| 46     | mfa-recovery-code-challenge          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaRecoveryCodeChallenge.html)   |
| 47     | device-code-activation-allowed          | [Link](https://auth0.github.io/universal-login/classes/Classes.DeviceCodeActivationAllowed.html)   |
| 48     | device-code-activation-denied          | [Link](https://auth0.github.io/universal-login/classes/Classes.DeviceCodeActivationDenied.html)   |
| 49     | device-code-activation          | [Link](https://auth0.github.io/universal-login/classes/Classes.DeviceCodeActivation.html)   |
| 50     | reset-password-mfa-recovery-code-challenge          | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaRecoveryCodeChallenge.html)   |
| 51     | reset-password-mfa-voice          | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaVoiceChallenge.html)   |
| 52     | redeem-ticket          | [Link](https://auth0.github.io/universal-login/classes/Classes.RedeemTicket.html)   |
| 53     | device-code-confirmation          | [Link](https://auth0.github.io/universal-login/classes/Classes.DeviceCodeConfirmation.html)   |
| 54     | mfa-phone-challenge | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaPhoneChallenge.html) |
| 55     | mfa-voice-challenge          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaVoiceChallenge.html)   |
| 56     | mfa-recovery-code-enrollment          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaRecoveryCodeEnrollment.html)   |
| 57     | reset-password-mfa-phone-challenge        | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaPhoneChallenge.html)                        |
| 58     | mfa-recovery-code-challenge-new-code | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaRecoveryCodeChallengeNewCode.html) |
| 59     | logout | [Link](https://auth0.github.io/universal-login/classes/Classes.Logout.html) |
| 60     | logout-aborted | [Link](https://auth0.github.io/universal-login/classes/Classes.LogoutAborted.html) |
| 61     | logout-complete | [Link](https://auth0.github.io/universal-login/classes/Classes.LogoutComplete.html) |
| 62     | Email Verification Result   | [Link](https://auth0.github.io/universal-login/classes/Classes.EmailVerificationResult.html)                     |
| 63     | login-email-verification    | [Link](https://auth0.github.io/universal-login/classes/Classes.LoginEmailVerification.html)                     |
| 64     | mfa-webauthn-platform-enrollment        | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnPlatformEnrollment.html)                        |
| 65     | mfa-webauthn-error        | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnError.html)                        |
| 60     | mfa-webauthn-not-available-error        | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnNotAvailableError.html)                        |
| 61     | mfa-webauthn-roaming-enrollment          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnRoamingEnrollment.html)   |
| 62     | mfa-webauthn-roaming-challenge          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnRoamingChallenge.html)   |
| 63     | mfa-webauthn-platform-challenge          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnPlatformChallenge.html)   |

</details>





##  Feedback

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