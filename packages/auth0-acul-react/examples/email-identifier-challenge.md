# `email-identifier-challenge`

The `email-identifier-challenge` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `email-identifier-challenge` screen.

### 1. Create the Component

Create a component file (e.g., `EmailIdentifierChallenge.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import {
  // Context hooks
  useScreen,
  // Utility hooks
  useResend,
  // Submit functions
  submitEmailChallenge,
  returnToPrevious,
  useErrors
} from '@auth0/auth0-acul-react/email-identifier-challenge';
import { Logo } from '../../components/Logo';

const EmailIdentifierChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [returned, setReturned] = useState(false);
  const { texts } = useScreen();

  // Error handling
  const { hasError, errors } = useErrors();
  const { disabled, startResend } = useResend();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setReturned(false);
    if (!code) {
      setError('Code is required.');
      return;
    }
    try {
      await submitEmailChallenge({ code });
      setSuccess(true);
    } catch {
      setError('Invalid code. Please try again.');
    }
  };

  const handleResend = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setReturned(false);
    try {
      startResend(); // Start the resend timer
    } catch {
      setError('Failed to resend code. Please try again later.');
    }
  };

  const handleReturn = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setReturned(false);
    try {
      await returnToPrevious();
      setReturned(true);
    } catch {
      setError('Failed to return to previous step. Please try again later.');
    }
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
          Email Identifier Challenge
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {texts?.emailDescription || 'Enter the verification code sent to your email.'}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="code" className="block text-center text-sm font-medium text-gray-700 mb-2">
                {texts?.placeholder || 'Enter the 6-digit code'}
              </label>
              <input
                id="code"
                name="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={texts?.placeholder || 'Enter the 6-digit code'}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {texts?.buttonText || 'Continue'}
            </button>
          </div>
        </form>

        {/* Resend Text */}
        <p className="mt-4 text-center text-sm text-gray-500">
          {texts?.resendText || "Didn't receive a code?"}{' '}
        </p>

        {/* Resend Code */}
        <form onSubmit={handleResend} className="mb-3">
          <button
            type="submit"
            disabled={disabled}
            className={`w-full flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium ${disabled
              ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            {disabled ? 'Resend Limit Reached' : 'Resend Code'}
          </button>
        </form>

        {/* Return to Previous */}
        <form onSubmit={handleReturn}>
          <button
            type="submit"
            className="w-full rounded-md py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts?.backButtonText || 'Go back'}
          </button>
        </form>

        {/* Messages */}
        {error && (
          <div className="mt-4 text-red-600 text-center text-sm">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="mt-4 text-green-600 text-center text-sm">
            <p>Challenge submitted successfully!</p>
          </div>
        )}
        {returned && (
          <div className="mt-4 text-blue-600 text-center text-sm">
            <p>Returned to previous step.</p>
          </div>
        )}
      </div>

      {/* Display errors */}
      {hasError && (
        <div className="mt-4 text-red-600 text-center text-sm space-y-1">
          {errors.map((err, idx) => (
            <p key={`err-${idx}`}>{err.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailIdentifierChallengeScreen;
```

### 2. How It Works

1.  **Imports**: We import `useEmailIdentifierChallenge` and various context hooks from the dedicated `@auth0/auth0-acul-react/email-identifier-challenge` entry point.
2.  **Hooks**:
    *   `useEmailIdentifierChallenge()`: Provides the core screen object with methods like `submitEmailChallenge()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.submitEmailChallenge(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
