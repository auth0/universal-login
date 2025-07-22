
## submitOTP

```typescript

//Creates an instance of LoginPasswordlessSmsOtp and calls the method with sample data.
import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
const loginPasswordlessSmsOtp = new LoginPasswordlessSmsOtp();

loginPasswordlessSmsOtp.submitOTP({
    username: "test@domain.com";
    otp: "testOTP";
});

```


## resendOTP

```typescript

import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';

const loginPasswordlessSmsOtp = new LoginPasswordlessSmsOtp();
loginPasswordlessSmsOtp.resendOTP();

```