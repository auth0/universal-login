# `mfa-voice-challenge`

The `mfa-voice-challenge` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-voice-challenge` screen.

### 1. Create the Component

Create a component file (e.g., `MfaVoiceChallenge.tsx`) and add the following code:

```tsx
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useMfaVoiceChallenge, useResend, continueMethod, useErrors} from '@auth0/auth0-acul-react/mfa-voice-challenge';

/**
 * MFA Voice Challenge Screen Component
 *
 * This component renders a form for users to submit their voice verification code
 * received during multi-factor authentication.
 */
const MfaVoiceChallengeScreen: React.FC = () => {
  // State for form inputs
  const [code, setCode] = useState<string>('');
  const [rememberDevice, setRememberDevice] = useState<boolean>(false);

  // Error handling
  const { hasError, errors } = useErrors();

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [showRememberDevice, setShowRememberDevice] = useState<boolean>(false);
  const [showLinkSms, setShowLinkSms] = useState<boolean>(false);

  // Initialize MFA Voice Challenge SDK
  const mfaVoiceChallenge = useMfaVoiceChallenge();
  // Add useResend hook usage (countdown for resend)
  const { remaining, disabled, startResend } = useResend({ timeoutSeconds: 12 });

  useEffect(() => {
    // Get data from the screen when component mounts
    if (mfaVoiceChallenge.screen.data) {
      if (mfaVoiceChallenge.screen.data.phoneNumber) {
        setPhoneNumber(mfaVoiceChallenge.screen.data.phoneNumber);
      }
      if (mfaVoiceChallenge.screen.data.showRememberDevice !== undefined) {
        setShowRememberDevice(mfaVoiceChallenge.screen.data.showRememberDevice);
      }
      if (mfaVoiceChallenge.screen.data.showLinkSms !== undefined) {
        setShowLinkSms(mfaVoiceChallenge.screen.data.showLinkSms);
      }
    }
    
    // Use untrustedData to prepopulate form fields if available
    const savedFormData = mfaVoiceChallenge.untrustedData.submittedFormData;
    if (savedFormData?.rememberDevice !== undefined) {
      setRememberDevice(savedFormData.rememberDevice);
    }
  }, []);

  /**
   * Handles the form submission to verify the voice code
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await continueMethod({
        code,
        rememberDevice,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the resend code action (now via useResend hook)
   */
  const handleResendCode = async (): Promise<void> => {
    setError(null);
    try {
      await startResend();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend code');
    }
  };

  /**
   * Handles the change event for the code input field
   */
  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCode(e.target.value);
  };

  /**
   * Handles the change event for the remember browser checkbox
   */
  const handleRememberDeviceChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setRememberDevice(e.target.checked);
  };

  /**
   * Handles switching to SMS verification
   */
  const handleSwitchToSms = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await mfaVoiceChallenge.switchToSms();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to switch to SMS');
      setIsLoading(false);
    }
  };

  /**
   * Handles navigating to pick a different phone number
   */
  const handlePickPhone = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await mfaVoiceChallenge.pickPhone();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to navigate to phone selection'
      );
      setIsLoading(false);
    }
  };

  /**
   * Handles navigating to try another MFA method
   */
  const handleTryAnotherMethod = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await mfaVoiceChallenge.tryAnotherMethod();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to navigate to method selection'
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Voice Verification
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {phoneNumber ? (
            <>
              We've called <span className="font-medium">{phoneNumber}</span>{' '}
              with your verification code.
            </>
          ) : (
            "We've called your phone with a verification code."
          )}
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
                Verification Code
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  value={code}
                  onChange={handleCodeChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter 6-digit code"
                />
              </div>
            </div>

            {showRememberDevice && (
              <div className="flex items-center">
                <input
                  id="remember-device"
                  name="remember-device"
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={handleRememberDeviceChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-device"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember this device for 30 days
                </label>
              </div>
            )}

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${
                    isLoading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Options</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                onClick={handleResendCode}
                disabled={disabled}
                type="button"
                className={`w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium ${disabled ? 'text-gray-500 cursor-not-allowed bg-gray-200' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {disabled ? `Resend in ${remaining}s` : 'Resend code'}
              </button>

              {showLinkSms && (
                <button
                  onClick={handleSwitchToSms}
                  disabled={isLoading}
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Send a text message instead
                </button>
              )}

              <button
                onClick={handlePickPhone}
                disabled={isLoading}
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Use a different phone
              </button>

              <button
                onClick={handleTryAnotherMethod}
                disabled={isLoading}
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Try another method
              </button>
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
      </div>
    </div>
  );
};

export default MfaVoiceChallengeScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaVoiceChallenge` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-voice-challenge` entry point.
2.  **Hooks**:
    *   `useMfaVoiceChallenge()`: Provides the core screen object with methods like `continueMethod()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.continueMethod(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
