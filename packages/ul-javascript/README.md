

## Getting started

### Installation



From [npm](https://npmjs.org): [TBD]

```sh
npm install @auth0/ul-javascript
```

After installing the `@auth0/ul-javascript` module using [npm](https://npmjs.org), you'll need to bundle it up along with all of its dependencies, or import it using:

```js
import { LoginId } from '@auth0/ul-javascript'; // currently only supports local installs
```



## Import Example

You can import the module and instantiate the `LoginIdScreen` class as follows:

```javascript
import { LoginId, LoginPasssord } from '@auth0/ul-javascript';

// Create an instance of LoginIdScreen from the ulScreens module
const { screen, transaction } = new LoginId();
const loginPasswordInstance = new LoginPassword()

// Now you can use the screen and transaction variables as needed
console.log(screen);      
console.log(transaction); 
console.log(loginPasswordInstance.screen)
```




## Using modular Imports

For more granular control, you can utilize named imports to specifically import the classes or functions you need from the `@auth0/ul-javascript` module. Below is an example of how to work with the `LoginIdScreen` class.

### Example of Named Import

To import and instantiate the `LoginIdScreen`, you can use the following code:

```javascript
import { LoginId } from '@auth0/ul-javascript/login-id'; // Default export Work in Progress

// Create an instance of LoginIdScreen
const loginIdInstance = new LoginId();

// Destructure the instance to access methods and properties
const { submitData, screen, transaction } = loginIdInstance;
```

## Adding logic to your User Interface via SDK methods

### Handling form submit

```js 
  import { LoginId } from "ul-javascript";

  const loginIdManager = new LoginId();

  loginIdManager.submitData({
    username: <USERNAME_FIELD_VALUE>
  });
```


### Handling fedrated login
```js

import { LoginId } from "ul-javascript"

const loginIdManager = new LoginId();
const { connections } = loginIdManager.transaction;

// Let's assume that user selects 3rd connection, i.e GOOGLE
const connectionName = connections?.map(conn => conn.name)[2];

loginIdManager.submitFederatedLoginData({
  connection: connectionName // eg: "google-oauth2"
});
```





## API reference

### Screens

- [loginId](#)
- [loginPassword](#)
- [signupId](#)
- [signupPassword](#)




## Feedback

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