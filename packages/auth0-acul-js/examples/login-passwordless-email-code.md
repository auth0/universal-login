
## continueWithEmailCode

```typescript

//Creates an instance of LoginPasswordlessEmailCode and calls the method with sample data.
import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
const loginPasswordlessEmailCode = new LoginPasswordlessEmailCode();

loginPasswordlessEmailCode.submitCode({
    email: "test@domain.com";
    code: "testcode";
});

```


## resendCode

```typescript

import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';

const loginPasswordlessEmailCode = new LoginPasswordlessEmailCode();
loginPasswordlessEmailCode.resendCode();

```