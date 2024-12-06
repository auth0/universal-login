
![ACUL JS SDK](https://d1ywy7uwj7mp98.cloudfront.net/banner/auth0-acul-js%20banner.png)

![Release](https://img.shields.io/npm/v/auth0-acul-js)
[![Codecov](https://img.shields.io/codecov/c/github/auth0/auth0-acul-js)](https://codecov.io/gh/auth0/auth0-acul-js)
![Downloads](https://img.shields.io/npm/dw/auth0-acul-js)
[![License](https://img.shields.io/:license-mit-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

📚 [Documentation](#documentation) - 🚀 [Getting Started](#getting-started) - 💻 [API Reference](#api-reference) - 💬 [Feedback](#feedback)

The **Auth0 ACUL JS SDK** enables you to work with Advanced Customization for Universal Login.

It simplifies integrating authentication screens (login, signup, passwordless, passkey enrollment, etc.) into your web applications, providing the necessary tools for seamless implementation.

This feature is still in **Limited EA**. Please contact your Account Manager to get this feature enabled on your Auth0 tenant.

## 📚 Documentation

- [Quickstart](https://auth0.com/docs/customize) - our guide for setting up the SDK on your app.
- [Guides](https://auth0.com/docs/customize) - more guides for common use cases
- [Examples](examples/) - code snippets for different customization use cases.
- [FAQs](FAQ.md) - Find answers to frequently asked questions about the Auth0 ACUL JS SDK.

### Architecture Overview

- SDK features a modular architecture for integrating various authentication screens.
- The **Login ID screen** is used as an example to explain the architecture.
- This structure can be applied to other screens across the project, such as **signup**, **passwordless login**, and **passkey enrollment**.
- Each screen can be treated as an independent module that can be **easily integrated** into the project.

![ACUL SDK](https://d1ywy7uwj7mp98.cloudfront.net/assets/ACUL-SDK-Architecture.png)




## 🚀 Getting started

### Prerequisites
Before starting, ensure that you have the following setup:

1. **Custom Domain**: Ensure that a custom domain is configured for your Auth0 tenant.
2. **Screen Configuration**: Set up the required authentication screens within your Auth0 flow.  
   For detailed steps, refer to the [Management API documentation](#) (TBD).

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
import  Screens  from '@auth0/auth0-acul-js'; 

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
    username: <USERNAME_FIELD_VALUE>
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
loginIdManager.continueWithFederatedLogin({
  connection: selectedConnection.name,
})
```
For more examples, visit our [examples](https://github.com/atko-cic/universal-login/blob/development/packages/auth0-acul-js/examples/login-id.md).



## 💻 API reference
### Screens

1. [login-id](https://d1ywy7uwj7mp98.cloudfront.net/docs/classes/Classes.LoginId.html)
2. [login-Password](https://d1ywy7uwj7mp98.cloudfront.net/docs/classes/Classes.LoginPassword.html)
3. [signup-id](https://d1ywy7uwj7mp98.cloudfront.net/docs/classes/Classes.SignupId.html)
4. [signup-password](https://d1ywy7uwj7mp98.cloudfront.net/docs/classes/Classes.SignupPassword.html)
<details>
  <summary>See more</summary>

  5. [login-passwordless-email-code](https://d1ywy7uwj7mp98.cloudfront.net/docs/classes/Classes.LoginPasswordlessEmailCode.html)
  6. [login-passwordless-sms-otp](https://d1ywy7uwj7mp98.cloudfront.net/docs/classes/Classes.LoginPasswordlessSmsOtp.html)
  7. [passkey-enrollment](https://d1ywy7uwj7mp98.cloudfront.net/docs/classes/Classes.PasskeyEnrollment.html)
  8. [passkey-enrollment-local](https://d1ywy7uwj7mp98.cloudfront.net/docs/classes/Classes.PasskeyEnrollmentLocal.html)
  9. [phone-identifier-enrollment](https://d1ywy7uwj7mp98.cloudfront.net/docs/classes/Classes.PhoneIdentifierEnrollment.html)
  10. [phone-identifier-challenge](https://d1ywy7uwj7mp98.cloudfront.net/docs/classes/Classes.PhoneIdentifierChallenge.html)
  11. [email-identifier-challenge](https://d1ywy7uwj7mp98.cloudfront.net/docs/classes/Classes.EmailIdentifierChallenge.html)
  12. [interstitial-captcha](https://d1ywy7uwj7mp98.cloudfront.net/docs/classes/Classes.InterstitialCaptcha.html)
</details>






## 💬 Feedback

### Contributing

We appreciate feedback and contribution to this repo! Before you get started, please see the following:

- [Auth0's general contribution guidelines](https://github.com/auth0/open-source-template/blob/master/GENERAL-CONTRIBUTING.md)
- [Auth0's code of conduct guidelines](https://github.com/auth0/open-source-template/blob/master/CODE-OF-CONDUCT.md)

### Raise an issue

To provide feedback or report a bug, please [raise an issue on our issue tracker](#TBD).

### Vulnerability Reporting

Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/responsible-disclosure-policy) details the procedure for disclosing security issues.

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