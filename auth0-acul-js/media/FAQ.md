# Frequently Asked Questions

Below are a number of questions or issues that have arisen from using the SDK.

## How do I import different screens in my project?

```typescript
// Highlighting default import paths of different screens

import LoginIdScreen from '@auth0/auth0-acul-js/login-id';
import LoginPasswordScreen from '@auth0/auth0-acul-js/login-password';
import SignupScreen from '@auth0/auth0-acul-js/signup-id';
import SignupPasswordScreen from '@auth0/auth0-acul-js/signup-password';
```

<details>
  <summary>Import of all other screens</summary>

```javascript
import LoginPasswordlessEmailCodeScreen from '@auth0/auth0-acul-js/login-passwordless-email-code';
import LoginPasswordlessEmailSMSOTP from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
import PasskeyEnrolmentScreen from '@auth0/auth0-acul-js/passkey-enrollment';
import PasskeyEnrolmentLocalScreen from '@auth0/auth0-acul-js/passkey-enrollment-local';
import PhoneIdentifierChallengeScreen from '@auth0/auth0-acul-js/phone-identifier-challenge';
import PhoneIdentifierEnrolmentScreen from '@auth0/auth0-acul-js/phone-identifier-enrollment';
import EmailIdentifierChallengeScreen from '@auth0/auth0-acul-js/email-identifier-challenge';
import InterstitialCaptchaScreen from '@auth0/auth0-acul-js/interstitial-captcha';
import Login from '@auth0/auth0-acul-js/login';
import Signup from '@auth0/auth0-acul-js/signup';
import ResetPassword from '@auth0/auth0-acul-js/reset-password';
import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
import ResetPasswordSuccess from '@auth0/auth0-acul-js/reset-password-success';
import ResetPasswordError from '@auth0/auth0-acul-js/reset-password-error';

// MFA related screens
import MfaDetectBrowserCapabilities from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';
import MfaEnrollResult from '@auth0/auth0-acul-js/mfa-enroll-result';
import MfaBeginEnrollOptions from '@auth0/auth0-acul-js/mfa-begin-enroll-options';
import MfaLoginOptions from '@auth0/auth0-acul-js/mfa-login-options';
import MfaPushEnrollmentQr from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';
import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';
import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';
import MfaCountryCodes from '@auth0/auth0-acul-js/mfa-country-codes';
import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';
import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';
import MfaSmsList from '@auth0/auth0-acul-js/mfa-sms-list';
import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';
import MfaEmailList from '@auth0/auth0-acul-js/mfa-email-list';
```

</details>

## Where can I see errors related to my screen and how to handle them

The SDK provides multiple ways to detect and view errors during the process:

1. **`getErrors` method for screen specofic error**  
   A top-level getter function, `getErrors`, can be used to retrieve detailed authentication errors when backend validation fails.
   ```javascript
      import Login from "@auth0/auth0-acul-js/login";

      const loginIdManager = new Login();

      const errors = loginIdManager.getErrors();
      if (errors) {
      console.error("Login failed:", errors);
   }
   ```
1. **Screen-Specific Errors**  
   Each screen includes a `transaction.errors` property, which returns a list of errors specific to that screen. These errors are generated after the final validation of the request, helping you identify issues that need attention.


By using these methods, you can easily track and resolve errors throughout the SDK flow.

## Can I Use this SDK from a CDN?

Currently, this SDK is only available for installation via the npm registry and cannot be used directly from a CDN.

To install the SDK, run the following command:

```sh
npm install @auth0/auth0-acul-js
```

Once installed, you can import and use it in your JavaScript or TypeScript or ReactJS projects.

## Can I Build a ReactJS Application with This SDK?

Yes, this SDK can be easily integrated into a ReactJS application.

Although the SDK is written in Vanilla JavaScript, it is fully compatible with all JavaScript-based frameworks, including React, Angular, Vue, and others. You can seamlessly use the SDK within your React components or hooks.
