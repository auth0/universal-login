
## continuePasskeyEnrollment

```typescript

import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment-local';

// Create an instance of PasskeyEnrollment to handle the enrollment process
const passkeyEnrollment = new PasskeyEnrollment();

// Begin the passkey enrollment process for local authentication
// This will trigger the necessary flow for the user to enroll their passkey
passkeyEnrollment.continuePasskeyEnrollment();

```


## Abort local passkey enrolment

```typescript

import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment-local';

const passkeyEnrollment = new PasskeyEnrollmentLocal();
passkeyEnrollment.abortPasskeyEnrollment({
    doNotShowAgain: <boolean>
});

```

## PasskeyEnrollmentLocal React Example

```typescript
import React, { useState } from 'react';
import PasskeyEnrollmentLocal from '@auth0/auth0-acul-js/passkey-enrollment-local';

const PasskeyEnrollmentLocalScreen: React.FC = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [aborted, setAborted] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  const passkeyEnrollment = new PasskeyEnrollmentLocal();

  const handleContinue = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setAborted(false);
    try {
      await passkeyEnrollment.continuePasskeyEnrollment();
      setSuccess(true);
    } catch (err) {
      setError('Failed to enroll passkey. Please try again.');
    }
  };

  const handleAbort = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setAborted(false);
    try {
      await passkeyEnrollment.abortPasskeyEnrollment({ doNotShowAgain });
      setAborted(true);
    } catch (err) {
      setError('Failed to abort enrollment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Passkey Enrollment (Local)
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleContinue}>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue Passkey Enrollment
              </button>
            </div>
          </form>
          <form className="space-y-6 mt-4" onSubmit={handleAbort}>
            <div className="flex items-center">
              <input
                id="doNotShowAgain"
                name="doNotShowAgain"
                type="checkbox"
                checked={doNotShowAgain}
                onChange={(e) => setDoNotShowAgain(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="doNotShowAgain" className="ml-2 block text-sm text-gray-900">
                Do not show again
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Abort Enrollment
            </button>
          </form>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-2">Passkey enrollment successful!</div>}
          {aborted && <div className="text-blue-600 text-sm mt-2">Passkey enrollment aborted.</div>}
        </div>
      </div>
    </div>
  );
};

export default PasskeyEnrollmentLocalScreen;
```