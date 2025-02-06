
## [auth0-acul-js@0.1.0-beta.1](https://github.com/auth0/auth0-react/tree/v0.1.0) (2024-02-06)

**Added**

Support for the following screens:

1. [login](https://auth0.github.io/universal-login/classes/Classes.Login.html)
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

## [auth0-acul-js@0.0.1-beta.1](https://github.com/auth0/auth0-react/tree/v0.1.0) (2024-12-09)

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