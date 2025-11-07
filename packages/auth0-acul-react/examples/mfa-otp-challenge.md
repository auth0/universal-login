# `mfa-otp-challenge`

The `mfa-otp-challenge` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-otp-challenge` screen.

### 1. Create the Component

Create a component file (e.g., `MfaOtpChallenge.tsx`) and add the following code:

```tsx
import React, { useState, useEffect } from 'react';
import { useMfaOtpChallenge, useUntrustedData, continueMethod, tryAnotherMethod } from '@auth0/auth0-acul-react/mfa-otp-challenge';
import { Logo } from '../../components/Logo';

const MfaOtpChallengeScreen: React.FC = () => {
  const mfaOtpChallenge = useMfaOtpChallenge();
  const [code, setCode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [error, setError] = useState('');
  const { screen: { texts, data }, transaction } = mfaOtpChallenge;

  useEffect(() => {
    const savedFormData = useUntrustedData().submittedFormData;
    if (savedFormData?.rememberDevice !== undefined) {
      setRememberDevice(savedFormData.rememberDevice);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await continueMethod({ code, rememberDevice });
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    }
  };

  const handleTryAnotherMethod = async () => {
    setError('');
    try {
      await tryAnotherMethod();
    } catch (err) {
      setError('Failed to try another method. Please try again.');
    }
  };

  const title = texts?.title ?? 'Verify Your Identity';
  const description = texts?.description ?? 'Check your one-time password application for a code.';
  const codePlaceholder = texts?.codePlaceholder ?? 'Enter your one-time code';
  const rememberMeLabel = texts?.rememberMeText ?? 'Remember this device for 30 days';
  const tryAnother = texts?.pickAuthenticatorText ?? 'Try Another Method';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-center text-sm text-gray-500">{description}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">{codePlaceholder}</label>
            <input
              id="code"
              name="code"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={codePlaceholder}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

            {transaction?.errors?.length && (
              <div className="text-red-600 text-sm space-y-1">
                {transaction.errors.map((err, index) => (
                  <p key={index}>{err.message}</p>
                ))}
              </div>
            )}

            {data?.showRememberDevice && (
              <div className="flex items-center">
                <input
                  id="rememberDevice"
                  name="rememberDevice"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                />
                <label htmlFor="rememberDevice" className="ml-2 block text-sm text-gray-900">{rememberMeLabel}</label>
              </div>
            )}

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {texts?.buttonText ?? 'Verify Code'}
            </button>
        </form>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleTryAnotherMethod}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {tryAnother}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaOtpChallengeScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaOtpChallenge` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-otp-challenge` entry point.
2.  **Hooks**:
    *   `useMfaOtpChallenge()`: Provides the core screen object with methods like `continueMethod()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.continueMethod(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
