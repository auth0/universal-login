# `mfa-recovery-code-challenge`

The `mfa-recovery-code-challenge` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-recovery-code-challenge` screen.

### 1. Create the Component

Create a component file (e.g., `MfaRecoveryCodeChallenge.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import { useMfaRecoveryCodeChallenge, continueMethod, tryAnotherMethod, useErrors } from '@auth0/auth0-acul-react/mfa-recovery-code-challenge';
import { Logo } from '../../components/Logo';

const MfaRecoveryCodeChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const mfaRecoveryCodeChallenge = useMfaRecoveryCodeChallenge();

  // Error handling
  const { hasError, errors: hookErrors } = useErrors();
  const { screen, transaction: { errors } } = mfaRecoveryCodeChallenge;
  const texts = screen.texts ?? {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    continueMethod({ code });
  };

  const handleTryAnotherMethod = () => {
    tryAnotherMethod();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>
        {/* Title */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {texts.title ?? 'Verify Your Identity'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {texts.description ?? 'Enter the recovery code you were provided during your initial enrollment.'}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              {texts.placeholder ?? 'Enter your recovery code'}
            </label>
            <input
              id="code"
              name="code"
              type="text"
              placeholder={texts.placeholder ?? 'Enter your recovery code'}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors?.length ? (
              <div className="mt-2 space-y-1" aria-live="polite">
                {errors.map((error, idx) => (
                  <p key={idx} className="text-red-600 text-xs">
                    {error.message}
                  </p>
                ))}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.buttonText ?? 'Continue'}
          </button>
        </form>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleTryAnotherMethod}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {texts.pickAuthenticatorText ?? 'Try Another Method'}
          </button>
        </div>

        {/* Display errors */}
        {hasError && (
          <div className="mt-4 text-red-600 text-center text-sm space-y-1">
            {hookErrors.map((err, idx) => (
              <p key={`err-${idx}`}>{err.message}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MfaRecoveryCodeChallengeScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaRecoveryCodeChallenge` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-recovery-code-challenge` entry point.
2.  **Hooks**:
    *   `useMfaRecoveryCodeChallenge()`: Provides the core screen object with methods like `continueMethod()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.continueMethod(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
