# `email-otp-challenge`

The `email-otp-challenge` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `email-otp-challenge` screen.

### 1. Create the Component

Create a component file (e.g., `EmailOTPChallenge.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import { useEmailOTPChallenge, submitCode, useResend, useErrors } from '@auth0/auth0-acul-react/email-otp-challenge';
import { Logo } from '../../components/Logo';

const EmailOTPChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const emailOTPChallengeManager = useEmailOTPChallenge();

  // Error handling
  const { hasError, errors } = useErrors();
  const { disabled, remaining, startResend } = useResend();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      await submitCode({ code });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    setError('');
    setSuccess(false);
    try {
      await startResend();
    } catch (err: any) {
      setError(err.message || 'Failed to resend code. Please try again.');
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
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">Email OTP Challenge</h2>
        <p className="mt-2 text-center text-sm text-gray-500">Enter the verification code sent to your email.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Code
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-xs text-gray-400">Need a new code?</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Resend */}
        <button
          type="button"
          onClick={handleResendCode}
          disabled={disabled}
          className={`w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${disabled ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
        >
          {disabled ? `Resend in ${remaining}s` : 'Resend Code'}
        </button>

        {/* Messages */}
        <div className="mt-4 min-h-[20px]" aria-live="polite">
          {error && <p className="text-xs text-red-600 text-center">{error}</p>}
          {success && !error && <p className="text-xs text-green-600 text-center">Code submitted successfully!</p>}
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
    </div>
  );
};

export default EmailOTPChallengeScreen;
```

### 2. How It Works

1.  **Imports**: We import `useEmailOTPChallenge` and various context hooks from the dedicated `@auth0/auth0-acul-react/email-otp-challenge` entry point.
2.  **Hooks**:
    *   `useEmailOTPChallenge()`: Provides the core screen object with methods like `submitCode()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.submitCode(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
