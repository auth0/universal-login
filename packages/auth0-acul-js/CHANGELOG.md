
## [auth0-acul-js@0.1.0-beta.2](https://github.com/auth0/universal-login/tree/auth0-acul-js%400.1.0-beta.2) (2024-12-09)

**Added**

Support for the following screens:

1. [mfa-detect-browser-capabilities](https://auth0.github.io/universal-login/classes/Classes.MfaDetectBrowserCapabilities.html)
2. [mfa-enroll-result](https://auth0.github.io/universal-login/classes/Classes.MfaEnrollResult.html)
3. [mfa-begin-enroll-options](https://auth0.github.io/universal-login/classes/Classes.MfaBeginEnrollOptions.html)
4. [mfa-login-options](https://auth0.github.io/universal-login/classes/Classes.MfaLoginOptions.html)
5. [mfa-push-enrollment-qr](https://auth0.github.io/universal-login/classes/Classes.MfaPushEnrollmentQr.html)
6. [mfa-push-welcome](https://auth0.github.io/universal-login/classes/Classes.MfaPushWelcome.html)
7. [mfa-push-challenge-push](https://auth0.github.io/universal-login/classes/Classes.MfaPushChallengePush.html)
8. [mfa-push-list](https://auth0.github.io/universal-login/classes/Classes.MfaPushList.html)
9. [mfa-country-codes](https://auth0.github.io/universal-login/classes/Classes.MfaCountryCodes.html)
10. [mfa-sms-challenge](https://auth0.github.io/universal-login/classes/Classes.MfaSmsChallenge.html)
11. [mfa-sms-enrollment](https://auth0.github.io/universal-login/classes/Classes.MfaSmsEnrollment.html)
12. [mfa-sms-list](https://auth0.github.io/universal-login/classes/Classes.MfaSmsList.html)
13. [mfa-email-challenge](https://auth0.github.io/universal-login/classes/Classes.MfaEmailChallenge.html)
14. [mfa-email-list](https://auth0.github.io/universal-login/classes/Classes.MfaEmailList.html)


## [auth0-acul-js@0.1.0-beta.1](https://github.com/auth0/universal-login/tree/auth0-acul-js%400.1.0-beta.1) (2024-02-06)

**Added**

Support for the following screens:

1. [login](https://auth0.github.io/universal-login/classes/Classes.Login.html
2. [signup](https://auth0.github.io/universal-login/classes/Classes.Signup.html)
3. [reset-password-email](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordEmail.html)
4. [reset-password-request](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordRequest.html)
5. [reset-password](https://auth0.github.io/universal-login/classes/Classes.ResetPassword.html)
6. [reset-password-error](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordError.html)
7. [reset-password-success](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordSuccess.html)

**Breaking Changes**

- **Flattened Screen-Related Properties**: We have simplified the structure of screen-related properties by removing the methods and replacing them with direct properties.

  Example:
  - The previous `loginIdInstance.transaction.geErrors` method has been replaced with the new `loginIdInstance.transaction.errors` property.

  **Code Example:**
  ```javascript
  import LoginId from "@auth0/auth0-acul-js/login-id";
  const loginIdManager = new LoginId();
  // Old method
  loginIdInstance.transaction.geErrors(); 
  // New property
  loginIdInstance.transaction.errors;

## [auth0-acul-js@0.0.1-beta.1](https://github.com/auth0/universal-login/tree/auth0-acul-js%400.0.1-beta.1) (2024-12-09)

**Added**

Support for the following screens:

1. [login-id](https://auth0.github.io/universal-login/classes/Classes.LoginId.html)
2. [login-Password](https://auth0.github.io/universal-login/classes/Classes.LoginPassword.html)
3. [signup-id](https://auth0.github.io/universal-login/classes/Classes.SignupId.html)
4. [signup-password](https://auth0.github.io/universal-login/classes/Classes.SignupPassword.html)
5. [login-passwordless-email-code](https://auth0.github.io/universal-login/classes/Classes.LoginPasswordlessEmailCode.html)
6. [login-passwordless-sms-otp](https://auth0.github.io/universal-login/classes/Classes.LoginPasswordlessSmsOtp.html)
7. [passkey-enrollment](https://auth0.github.io/universal-login/classes/Classes.PasskeyEnrollment.html)
8. [passkey-enrollment-local](https://auth0.github.io/universal-login/classes/Classes.PasskeyEnrollmentLocal.html)
9. [phone-identifier-enrollment](https://auth0.github.io/universal-login/classes/Classes.PhoneIdentifierEnrollment.html)
10. [phone-identifier-challenge](https://auth0.github.io/universal-login/classes/Classes.PhoneIdentifierChallenge.html)
11. [email-identifier-challenge](https://auth0.github.io/universal-login/classes/Classes.EmailIdentifierChallenge.html)
12. [interstitial-captcha](https://auth0.github.io/universal-login/classes/Classes.InterstitialCaptcha.html)