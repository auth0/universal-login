# Frequently Asked Questions

Below are a number of questions or issues that have arisen from using the SDK.


## How do I  import different screens in my project?

```typescript
// Highlighting default import paths of different screens

import  LoginIdScreen  from '@auth0/auth0-acul-js/login-id';
import  LoginPasswordScreen  from '@auth0/auth0-acul-js/login-password';
import  SignupScreen  from '@auth0/auth0-acul-js/signup-id';
import  SignupPasswordScreen  from '@auth0/auth0-acul-js/signup-password';
import  LoginPasswordlessEmailCodeScreen  from '@auth0/auth0-acul-js/login-passwordless-email-code';
import  LoginPasswordlessEmailSMSOTP  from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
import  PasskeyEnrolmentScreen  from '@auth0/auth0-acul-js/passkey-enrollment';
import  PasskeyEnrolmentLocalScreen  from '@auth0/auth0-acul-js/passkey-enrollment-local';
import  PhoneIdentifierChallengeScreen  from '@auth0/auth0-acul-js/phone-identifier-challenge';
import  PhoneIdentifierEnrolmentScreen  from '@auth0/auth0-acul-js/phone-identifier-enrollment';
import  EmailIdentifierChallengeScreen  from '@auth0/auth0-acul-js/email-identifier-challenge';
import  InterstitialCaptchaScreen  from '@auth0/auth0-acul-js/interstitial-captcha';
import  Login  from '@auth0/auth0-acul-js/login';
import  Signup  from '@auth0/auth0-acul-js/signup';
import  ResetPassword from '@auth0/auth0-acul-js/reset-password';
import  ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
import  ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
import  ResetPasswordSuccess from '@auth0/auth0-acul-js/reset-password-success';
import  ResetPasswordError from '@auth0/auth0-acul-js/reset-password-error';

```

## Where can i see errors related to my screen

The SDK provides multiple ways to detect and view errors during the process:

1. **Screen-Specific Errors**  
   Each screen includes a `transaction.getErrors()` method, which returns a list of errors specific to that screen. These errors are generated after the final validation of the request, helping you identify issues that need attention.

2. **Submit Handler Errors**  
   The SDK may throw errors if invalid parameters are passed to the submit handler. These errors occur when validation fails and can be caught during the submission process.

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
