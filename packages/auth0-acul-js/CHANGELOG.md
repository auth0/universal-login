# Change Log

## [auth0-acul-js@1.0.0-alpha.2](https://github.com/auth0/universal-login/tree/auth0-acul-js%401.0.0-alpha.2) (2025-11-03)

**Added**
- Update: Renamed custom errors in TS and React SDK [\#255](https://github.com/auth0/universal-login/pull/255) ([ankita10119](https://github.com/ankita10119))
- feat: flexible connection switching [\#250](https://github.com/auth0/universal-login/pull/250) ([amitsingh05667](https://github.com/amitsingh05667))
- Added support for passkey autofill on react SDK [\#249](https://github.com/auth0/universal-login/pull/249) ([nandan-bhat](https://github.com/nandan-bhat))
- Refactor: Rename Login Password Policy Methods [\#253](https://github.com/auth0/universal-login/pull/253) ([amitsingh05667](https://github.com/amitsingh05667))
- feat(mfa-login-options): add returnToPrevious for back navigation  [\#238](https://github.com/auth0/universal-login/pull/238) ([amitsingh05667](https://github.com/amitsingh05667))
- added: Polling for the mfa-push-enrollment-qr screen [\#240](https://github.com/auth0/universal-login/pull/240) ([aks96](https://github.com/aks96))

**Fixed**
- Refactor: Simplify reset password logic and enhance password  [\#254](https://github.com/auth0/universal-login/pull/254) ([amitsingh05667](https://github.com/amitsingh05667))

## [auth0-acul-js@1.0.0-alpha.1](https://github.com/auth0/universal-login/tree/auth0-acul-js%401.0.0-alpha.1) (2025-10-16)

**Added**
- Update: Updated examples and type doc [\#230](https://github.com/auth0/universal-login/pull/230) ([ankita10119](https://github.com/ankita10119))

**Fixed**
- fix: update peerDependencies for React compatibility [\#231](https://github.com/auth0/universal-login/pull/231) ([amitsingh05667](https://github.com/amitsingh05667))
- fix: Added `files` and `publishConfig` keys to the package.json [\#229](https://github.com/auth0/universal-login/pull/229) ([nandan-bhat](https://github.com/nandan-bhat))

## [auth0-acul-js@1.0.0-alpha.0](https://github.com/auth0/universal-login/tree/auth0-acul-js%401.0.0-alpha.0) (2025-10-13)

**Added**
- Adding `auth0-acul-react` package [\#218](https://github.com/auth0/universal-login/pull/218) ([nandan-bhat](https://github.com/nandan-bhat))
- chore: add dev script [\#213](https://github.com/auth0/universal-login/pull/213) ([joel-hamilton](https://github.com/joel-hamilton))
- feat: add Claude Code PR Review workflow [\#206](https://github.com/auth0/universal-login/pull/206) ([amitsingh05667](https://github.com/amitsingh05667))

## [auth0-acul-js@0.1.0-beta.9](https://github.com/auth0/universal-login/tree/auth0-acul-js%400.1.0-beta.9) (2025-09-26)

**Fixed**
- Fix “No access keys” and Android registration [\#196](https://github.com/auth0/universal-login/pull/196) ([nandan-bhat](https://github.com/nandan-bhat))
- Add pickCountryCode method to SignupId class [\#151](https://github.com/auth0/universal-login/pull/151) ([amitsingh05667](https://github.com/amitsingh05667))

## [auth0-acul-js@0.1.0-beta.8](https://github.com/auth0/universal-login/tree/auth0-acul-js%400.1.0-beta.8) (2025-08-01)

**Added**
- Fix login passwordless [\#142](https://github.com/auth0/universal-login/pull/142) ([amitsingh05667](https://github.com/amitsingh05667))
- Refactor: Update MFA-related interfaces and exports for consistency [\#143](https://github.com/auth0/universal-login/pull/143) ([amitsingh05667](https://github.com/amitsingh05667))
- Update: Update Readme of universal-login SDK about Auth0 ACUL JS SDK early access [\#141](https://github.com/auth0/universal-login/pull/141) ([ankita10119](https://github.com/ankita10119))
- Update: Error Handling on Advanced Customizations for Universal Login [\#137](https://github.com/auth0/universal-login/pull/137) ([ankita10119](https://github.com/ankita10119))
- Refactor: Introduce Branding interface and update UserMembers to use [\#140](https://github.com/auth0/universal-login/pull/140) ([amitsingh05667](https://github.com/amitsingh05667))
- Refactor browser capability detection and add passkey support to login and MFA flows 🔑 [\#121](https://github.com/auth0/universal-login/pull/121) ([subhankarmaiti](https://github.com/subhankarmaiti))
- Refactor: Update variable names in mfa-push-enrollment-qr to camelCas… [\#136](https://github.com/auth0/universal-login/pull/136) ([amitsingh05667](https://github.com/amitsingh05667))
- Refactor : Replaced inline interfaces with named ContinueOptions type… [\#135](https://github.com/auth0/universal-login/pull/135) ([amitsingh05667](https://github.com/amitsingh05667))

## [auth0-acul-js@0.1.0-beta.6](https://github.com/auth0/universal-login/tree/auth0-acul-js%400.1.0-beta.6) (2025-06-30)

### ⚠️ Breaking Changes

**Screen - Login, Login-Id**
- **Renamed** 
  1. `socialLogin` method to `federatedLogin`.
  2. `SocialLoginOptions` interface to `FederatedLoginOptions`.

**Screen - SignUp, Signup-ID**
- **Renamed** 
  1. `socialSignup` method to `federatedSignup`.
  2. `SocialSignupOptions` interface to `FederatedSignupOptions`.

### ✨ What’s new ?

- **Added** `getErrors` method to the SDK, allowing developers to retrieve detailed authentication errors in the sample app.
```javascript
  import Login from "@auth0/auth0-acul-js/login";

  const loginIdManager = new Login();

  const errors = loginIdManager.getErrors();
  if (errors) {
    console.error("Login failed:", errors);
  }
```

### 🚀 Added support for new screens

Added support for the following screens:

| #   | Screen Name                                | Documentation                                                                                              |
| --- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| 1   | consent                                    | [View](https://auth0.github.io/universal-login/classes/Classes.Consent.html)                               |
| 2   | customized-consent                         | [View](https://auth0.github.io/universal-login/classes/Classes.CustomizedConsent.html)                     |
| 3   | mfa-webauthn-not-available-error           | [View](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnNotAvailableError.html)          |
| 4   | email-otp-challenge                        | [View](https://auth0.github.io/universal-login/classes/Classes.EmailOTPChallenge.html)                     |
---

## [auth0-acul-js@0.1.0-beta.5](https://github.com/auth0/universal-login/tree/auth0-acul-js%400.1.0-beta.5) (2025-05-23)

### ✨ What’s new ?

- **Added** `screen.data.qr_uri` to `mfa-push-enrollment-qr` screen
- **Added** `screen.data.show_code_copy` to `mfa-push-enrollment-qr` screen

### 🚀 Added support for new screens

Added support for the following screens:

| No.    | Prompt                         | Screen Name                                      | Documentation Link                                                                                                                        |
|--------|--------------------------------|-------------------------------------------|-------------------------------------------------------------------------------------------------------|
| 1     | mfa-recovery-code              | mfa-recovery-code-challenge-new-code      | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaRecoveryCodeChallengeNewCode.html) |
| 2     | logout                         | logout                                    | [Link](https://auth0.github.io/universal-login/classes/Classes.Logout.html) |
| 3     | logout                         | logout-aborted                            | [Link](https://auth0.github.io/universal-login/classes/Classes.LogoutAborted.html) |
| 4     | logout                         | logout-complete                           | [Link](https://auth0.github.io/universal-login/classes/Classes.LogoutComplete.html) |
| 5     | email-verification             | email-verification-result                 | [Link](https://auth0.github.io/universal-login/classes/Classes.EmailVerificationResult.html) |
| 6     | login-email-verification       | login-email-verification                  | [Link](https://auth0.github.io/universal-login/classes/Classes.LoginEmailVerification.html) |
| 7     |mfa-webauthn                    | mfa-webauthn-platform-enrollment        | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnPlatformEnrollment.html)                        |
| 8     |mfa-webauthn                    | mfa-webauthn-error        | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnError.html)                        |
| 9     |mfa-webauthn                    | mfa-webauthn-roaming-enrollment          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnRoamingEnrollment.html)   |
| 10     |mfa-webauthn                    | mfa-webauthn-roaming-challenge          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnRoamingChallenge.html)   |
| 11     |mfa-webauthn                    | mfa-webauthn-platform-challenge          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnPlatformChallenge.html)   |
| 12     |mfa-webauthn                    | mfa-webauthn-enrollment-success          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnEnrollmentSuccess.html)   |
| 13     |mfa-webauthn                    | mfa-webauthn-change-key-nickname          | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaWebAuthnChangeKeyNickname.html)   |
| 14     |reset-password                    | reset-password-mfa-webauthn-platform-challenge | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaWebAuthnPlatformChallenge.html)                |
| 15     |reset-password                    | Reset Password MFA WebAuthn Roaming Challenge | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaWebAuthnRoamingChallenge.html)   |
---

## [auth0-acul-js@0.1.0-beta.4](https://github.com/auth0/universal-login/tree/auth0-acul-js%400.1.0-beta.4) (2025-04-28)

### ⚠️ Breaking Changes

- **Removed** `editIdentifierLink` under `SCREEN_INSTANCE.screen.links` on all `reset-password-mfa-*` screens as they are irrelevant.
- **Changed** `remember_device` to `showRememberDevice` under `SCREEN_INSTANCE.screen.data` for the following screens.
  - `mfa-email-challenge`
  - `mfa-sms-challenge`
  - `mfa-push-challenge-push`
  - `mfa-otp-challenge`
- **Changed** the payload to replace `rememberBrowser` with `rememberDevice` in the following screens:
  - `mfa-sms-challenge`
  - `mfa-otp-challenge`

### ✨ What’s new ?

- **Added** `rememberDevice` under `untrustedData.submittedFormData.rememberDevice`. This would contain user submitted `rememberDevice` value.
- **Added** `showLinkSms` under `SCREEN_INSTANCE.screen.data` on the following screens:
  - `mfa-voice-challenge`
  - `reset-password-mfa-voice-challenge`
- **Added** `showLinkVoice` under `SCREEN_INSTANCE.screen.data` on the following screens :
  - `mfa-sms-challenge`
  - `reset-password-mfa-sms-challenge`

### 🚀 Added support for new screens

Added support for the following screens:

| #   | Screen Name                                | Documentation                                                                                              |
| --- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| 1   | device-code-activation                     | [View](https://auth0.github.io/universal-login/classes/Classes.DeviceCodeActivation.html)                  |
| 2   | device-code-activation-allowed             | [View](https://auth0.github.io/universal-login/classes/Classes.DeviceCodeActivationAllowed.html)           |
| 3   | device-code-activation-denied              | [View](https://auth0.github.io/universal-login/classes/Classes.DeviceCodeActivationDenied.html)            |
| 4   | device-code-confirmation                   | [View](https://auth0.github.io/universal-login/classes/Classes.DeviceCodeConfirmation.html)                |
| 5   | mfa-phone-challenge                        | [View](https://auth0.github.io/universal-login/classes/Classes.MfaPhoneChallenge.html)                     |
| 6   | mfa-phone-enrollment                       | [View](https://auth0.github.io/universal-login/classes/Classes.MfaPhoneEnrollment.html)                    |
| 7   | mfa-voice-challenge                        | [View](https://auth0.github.io/universal-login/classes/Classes.MfaVoiceChallenge.html)                     |
| 8   | mfa-voice-enrollment                       | [View](https://auth0.github.io/universal-login/classes/Classes.MfaVoiceEnrollment.html)                    |
| 9   | reset-password-mfa-recovery-code-challenge | [View](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaRecoveryCodeChallenge.html) |
| 10  | reset-password-mfa-voice-challenge         | [View](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaVoiceChallenge.html)        |
| 11  | reset-password-mfa-phone-challenge         | [View](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaPhoneChallenge.html)        |
| 12  | mfa-recovery-code-challenge                | [View](https://auth0.github.io/universal-login/classes/Classes.MfaRecoveryCodeChallenge.html)              |
| 13  | mfa-recovery-code-enrollment               | [View](https://auth0.github.io/universal-login/classes/Classes.MfaRecoveryCodeEnrollment.html)             |
| 14  | redeem-ticket                              | [View](https://auth0.github.io/universal-login/classes/Classes.RedeemTicket.html)                          |

---

## [auth0-acul-js@0.1.0-beta.3](https://github.com/auth0/universal-login/tree/auth0-acul-js%400.1.0-beta.3) (2025-03-28)

### ⚠️ Breaking Changes

#### MFA Screen Property Update

The Enrollment factor list property for MFA screens has been updated from an array of strings to an array of objects to provide better structure and additional metadata support.

**Affected Components:**

- `mfa-begin-enroll-options`
- `mfa-login-options`
- `mfa-email-list`
- `mfa-sms-list`
- `mfa-push-list`

**Migration Example:**

```javascript
// Before (0.1.0-beta.2)
const phoneNumbers = mfaSmsList.user.enrolledPhoneNumbers;
// Returns: ['XXXXXXXXX4761', 'XXXX907856']

// After (0.1.0-beta.3)
const phoneNumbers = mfaSmsList.user.enrolledPhoneNumbers;
// Returns: [
//   { id: 0, phoneNumber: 'XXXXXXXXX4761' },
//   { id: 1, phoneNumber: 'XXXX907856' }
// ]
```

### ✨ New Features

#### Password Policy Enhancement

- Added password policy validation for enhanced security
- Added support in:

  - `signup` screen
  - `signup-password` screen

  It will be part of transaction property for above screens

  ```javascript
  const loginInstance = new Login();
  const { passwordPolicy } = loginInstance.transaction;
  ```

### 🚀 Added Screen Support

| #   | Screen Name                            | Documentation                                                                                          |
| --- | -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 1   | accept-invitation                      | [Link](https://auth0.github.io/universal-login/classes/Classes.AcceptInvitation.html)                  |
| 2   | organization-picker                    | [Link](https://auth0.github.io/universal-login/classes/Classes.OrganizationPicker.html)                |
| 3   | organization-selection                 | [Link](https://auth0.github.io/universal-login/classes/Classes.OrganizationSelection.html)             |
| 4   | mfa-otp-challenge                      | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaOtpChallenge.html)                   |
| 5   | mfa-otp-enrollment-code                | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaOtpEnrollmentCode.html)              |
| 6   | mfa-otp-enrollment-qr                  | [Link](https://auth0.github.io/universal-login/classes/Classes.MfaOtpEnrollmentQr.html)                |
| 7   | reset-password-mfa-email-challenge     | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaEmailChallenge.html)    |
| 8   | reset-password-mfa-push-challenge-push | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaPushChallengePush.html) |
| 9   | reset-password-mfa-sms-challenge       | [Link](https://auth0.github.io/universal-login/classes/Classes.ResetPasswordMfaSmsChallenge.html)      |
| 10  | reset-password-mfa-otp-challenge       | [Link](https://auth0.github.io/universal-login/classes/Classes.OrganizationSelection.html)             |

---

## [auth0-acul-js@0.1.0-beta.2](https://github.com/auth0/universal-login/tree/auth0-acul-js%400.1.0-beta.2) (2024-02-21)

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
  import LoginId from '@auth0/auth0-acul-js/login-id';
  const loginIdManager = new LoginId();
  // Old method
  loginIdInstance.transaction.geErrors();
  // New property
  loginIdInstance.transaction.errors;
  ```

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
