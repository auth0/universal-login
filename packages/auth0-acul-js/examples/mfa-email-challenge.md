# MFA Email Challenge Screen

This screen is displayed when a user needs to verify their email during MFA.

## React Component Example with TailwindCSS

```tsx
import React, { useState, useEffect, useMemo } from 'react';
import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';

const MfaEmailChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const mfaEmailChallenge = useMemo(() => new MfaEmailChallenge(), []);
  const { screen } = mfaEmailChallenge;

  function handleStatusChange(remainingSeconds: number, isDisabled: boolean) {
    setDisabled(isDisabled);
    setRemainingSeconds(remainingSeconds);
  }

  function handleTimeout() {
    console.log('Resend timeout completed');
  }

  const resendManager = useMemo(
    () =>
      mfaEmailChallenge.resendManager({
        timeoutSeconds: 15,
        onStatusChange: handleStatusChange,
        onTimeout: handleTimeout,
      }),
    [mfaEmailChallenge]
  );

  const { startResend } = resendManager;
  
  // Initialize form values from untrustedData
  useEffect(() => {
    // Use untrustedData to prepopulate form fields if available
    const savedFormData = mfaEmailChallenge.untrustedData.submittedFormData;
    if (savedFormData?.rememberDevice !== undefined) {
      setRememberDevice(savedFormData.rememberDevice);
    }
  }, [mfaEmailChallenge]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await mfaEmailChallenge.continue({
        code,
        rememberDevice,
      });
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    try {
      await startResend();
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    }
  };
  const handlePickEmail = async () => {
    try {
      await mfaEmailChallenge.pickEmail();
    } catch (err) {
      setError('Failed pick email. Please try again.');
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await mfaEmailChallenge.tryAnotherMethod();
    } catch (err) {
      setError('Failed to try another method. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify Your Email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the code sent to {screen.data?.email}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Code
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {screen.data?.showRememberDevice && (
              <div className="flex items-center">
                <input
                  id="rememberDevice"
                  name="rememberDevice"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                />
                <label
                  htmlFor="rememberDevice"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember this device
                </label>
              </div>
            )}



            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify Code
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="flex justify-between">
              <button
                onClick={handleResendCode}
                disabled={disabled}
                className={`text-sm ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-500'}`}
              >
                {disabled ? `Resend code in ${remainingSeconds}s` : 'Resend Code'}
              </button>
              <button
                onClick={handlePickEmail}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Pick Email
              </button>
              <button
                onClick={handleTryAnotherMethod}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Try Another Method
              </button>
            </div>
          </div>

          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default MfaEmailChallengeScreen;

```

## resendManager

```typescript
import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';

const mfaEmailChallenge = new MfaEmailChallenge();

function handleStatusChange(remainingSeconds: number, isDisabled: boolean) {
  console.log(`Resend available in ${remainingSeconds}s, disabled: ${isDisabled}`);
}

function handleTimeout() {
  console.log('Resend timeout completed');
}

const resendManager = mfaEmailChallenge.resendManager({
  timeoutSeconds: 15,
  onStatusChange: handleStatusChange,
  onTimeout: handleTimeout,
});

const { startResend } = resendManager;

// Use startResend() to initiate the resend with cooldown
startResend();

```

## Usage Examples

### Continue with Code

```typescript
import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';

const mfaEmailChallenge = new MfaEmailChallenge();

// Access untrustedData to prepopulate form fields
const { rememberDevice } = mfaEmailChallenge.untrustedData.submittedFormData || {};

mfaEmailChallenge.continue({
  code: '123456',
  rememberDevice: rememberDevice || false,
});
```

### Resend Code

```typescript
import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';

const mfaEmailChallenge = new MfaEmailChallenge();

mfaEmailChallenge.resendCode();
```

### Try Another Method

```typescript
import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';

const mfaEmailChallenge = new MfaEmailChallenge();

mfaEmailChallenge.tryAnotherMethod();
```