
## continueWithPasskeyEnrollmentLocal

```typescript

import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment-local';

// Create an instance of PasskeyEnrollment to handle the enrollment process
const passkeyEnrollment = new PasskeyEnrollment();

// Begin the passkey enrollment process for local authentication
// This will trigger the necessary flow for the user to enroll their passkey
passkeyEnrollment.continueWithPasskeyEnrollmentLocal();

```


## Abort local passkey enrolment

```typescript

import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment-local';

const passkeyEnrollment = new PasskeyEnrollmentLocal();
passkeyEnrollment.abortPasskeyEnrollmentLocal({
    doNotShowAgain: <boolean>
});

```