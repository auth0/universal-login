# `mfa-otp-enrollment-qr`

The `mfa-otp-enrollment-qr` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-otp-enrollment-qr` screen.

### 1. Create the Component

Create a component file (e.g., `MfaOtpEnrollmentQr.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import { useMfaOtpEnrollmentQr, toggleView, tryAnotherMethod, continueMethod } from '@auth0/auth0-acul-react/mfa-otp-enrollment-qr';
import { Logo } from '../../components/Logo';

const MfaOtpEnrollmentQrScreen: React.FC = () => {
  const mfaOtpEnrollmentQr = useMfaOtpEnrollmentQr();
  const { screen, transaction } = mfaOtpEnrollmentQr;
  const { qr_code } = screen.data || {};
  const texts = screen.texts || {};

  const [otpCode, setOtpCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const title = texts.title ?? 'Secure Your Account';
  const description = texts.description ?? 'Scan this QR code with your authenticator app, then enter the generated one-time code.';
  const toggleText = texts.codeEnrollmentText ?? 'Can\'t scan the code?';
  const buttonText = texts.buttonText ?? 'Continue';
  const tryAnother = texts.tryAnotherMethodText ?? 'Try Another Method';
  const placeholder = texts.placeholder ?? 'Enter OTP code';

  const handleToggleView = async () => {
    try {
      await toggleView();
    } catch (err) {
      console.error('Failed to toggle view:', err);
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await tryAnotherMethod();
    } catch (err) {
      console.error('Failed to pick authenticator:', err);
    }
  };

  const handleContinue = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await continueMethod({ code: otpCode });
    } catch (err: any) {
      setError(err?.message || 'Failed to continue. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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

        <div className="mt-6 flex flex-col items-center">
          {qr_code ? (
            <div className="p-3 border border-gray-200 rounded-md bg-white shadow-sm">
              <img src={qr_code} alt="Authenticator QR Code" className="h-48 w-48 object-contain" />
            </div>
          ) : (
            <div className="h-48 w-48 flex items-center justify-center border border-dashed border-gray-300 rounded-md text-xs text-gray-500">
              Loading QR Code...
            </div>
          )}
          <button
            type="button"
            onClick={handleToggleView}
            className="mt-3 text-xs font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none focus:underline"
          >
            {toggleText}
          </button>
        </div>

        <form onSubmit={handleContinue} className="mt-6 space-y-5">
          <div>
            <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700 mb-1">{placeholder}</label>
            <input
              id="otpCode"
              type="text"
              required
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder={placeholder}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          {transaction?.errors?.length && (
            <div className="text-red-600 text-sm space-y-1">
              {transaction.errors.map((err, index) => (
                <p key={index}>{err.message}</p>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60"
          >
            {submitting ? 'Processing…' : buttonText}
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

export default MfaOtpEnrollmentQrScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaOtpEnrollmentQr` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-otp-enrollment-qr` entry point.
2.  **Hooks**:
    *   `useMfaOtpEnrollmentQr()`: Provides the core screen object with methods like `continueMethod()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.continueMethod(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
