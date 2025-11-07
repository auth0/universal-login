# `login-passwordless-sms-otp`

The `login-passwordless-sms-otp` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `login-passwordless-sms-otp` screen.

### 1. Create the Component

Create a component file (e.g., `LoginPasswordlessSmsOtp.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import { useScreen, submitOTP, useResend } from '@auth0/auth0-acul-react/login-passwordless-sms-otp';
import { Logo } from '../../components/Logo';

const LoginPasswordlessSmsOtpScreen: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const screen = useScreen();
  const phoneNumber = screen.data?.phone_number || '';

  const { remaining, disabled, startResend } = useResend({
    timeoutSeconds: 30,
    onTimeout: () => { },
  });

  const handleSubmit = async () => {
    setError('');
    setSuccess(false);

    if (!otp) {
      setError('OTP is required.');
      return;
    }

    try {
      await submitOTP({ code: otp });
      setSuccess(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid OTP. Please try again.';
      setError(errorMessage);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess(false);

    try {
      startResend(); // Start the countdown timer and trigger resend
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend OTP. Please try again later.';
      setError(errorMessage);
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
          Continue with SMS OTP
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Enter the OTP sent to {phoneNumber || 'your phone'}
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">
          {/* Phone Number (Read-only) */}
          {phoneNumber && (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  readOnly
                  value={phoneNumber}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-700 sm:text-sm cursor-not-allowed"
                />
              </div>
            </div>
          )}

          {/* OTP Input */}
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <div className="mt-1">
              <input
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the OTP"
              />
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">Login successful!</div>}

          {/* Submit Button */}
          <div>
            <button
              onClick={handleSubmit}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </div>

          {/* Resend Button */}
          <div>
            <button
              type="button"
              onClick={handleResend}
              disabled={disabled}
              className={`w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              {disabled ? `Resend in ${remaining}s` : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPasswordlessSmsOtpScreen;
```

### 2. How It Works

1.  **Imports**: We import `useLoginPasswordlessSmsOtp` and various context hooks from the dedicated `@auth0/auth0-acul-react/login-passwordless-sms-otp` entry point.
2.  **Hooks**:
    *   `useLoginPasswordlessSmsOtp()`: Provides the core screen object with methods like `submitOTP()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.submitOTP(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
