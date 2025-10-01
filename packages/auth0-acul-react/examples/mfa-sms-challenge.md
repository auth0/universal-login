# `mfa-sms-challenge`

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-sms-challenge` screen.

### 1. Create the Component

Create a component file (e.g., `MfaSmsChallenge.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import {
  useMfaSmsChallenge,
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} from '@auth0/auth0-acul-react/mfa-sms-challenge';

export const MfaSmsChallenge: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main hook for screen logic
  const screen = useMfaSmsChallenge();

  // Context hooks
  const userData = useUser();
  const tenantData = useTenant();
  const brandingData = useBranding();
  const clientData = useClient();
  const organizationData = useOrganization();
  const promptData = usePrompt();
  const untrusteddataData = useUntrustedData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Gather data from form inputs
      const payload = {};
      await screen.continueMfaSmsChallenge(payload);
      // On success, the core SDK handles redirection.
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>MfaSmsChallenge</h1>

      {/* TODO: Add form inputs for the 'continueMfaSmsChallenge' payload */}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Continue'}
      </button>
    </form>
  );
};
```

### Example using utility hooks - useMfaSmsChallenge, useResend

```tsx
import { useState, useEffect } from 'react';
import { useMfaSmsChallenge, useResend } from '@auth0/auth0-acul-react/mfa-sms-challenge';
import { Logo } from '../../components/Logo';

const MfaSmsChallengeScreen = () => {
  const mfaSmsChallenge = useMfaSmsChallenge();
  const [code, setCode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const { phoneNumber, showRememberDevice, showLinkVoice } = mfaSmsChallenge.screen.data || {};
  const { remaining, disabled, startResend } = useResend({
    timeoutSeconds: 12,
    onTimeout: () => console.log('MFA SMS resend available')
  });
  // Initialize form values from untrustedData
  useEffect(() => {
    // Use untrustedData to prepopulate form fields if available
    const savedFormData = mfaSmsChallenge.untrustedData.submittedFormData;
    if (savedFormData?.rememberDevice !== undefined) {
      setRememberDevice(savedFormData.rememberDevice);
    }
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await mfaSmsChallenge.continueMfaSmsChallenge({
        code,
        rememberDevice,
      });
    } catch (error) {
      console.error('MFA SMS Challenge failed:', error);
    }
  };

  const handlePickSms = async () => {
    try {
      await mfaSmsChallenge.pickSms();
    } catch (error) {
      console.error('Pick SMS failed:', error);
    }
  };

  const handleResendCode = async () => {
    try {
      await startResend();
    } catch (error) {
      console.error('Resend code failed:', error);
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await mfaSmsChallenge.tryAnotherMethod();
    } catch (error) {
      console.error('Try another method failed:', error);
    }
  };

  const handleGetACall = async () => {
    try {
      await mfaSmsChallenge.getACall();
    } catch (error) {
      console.error('Get a call failed:', error);
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
          MFA SMS Challenge
        </h2>
        {phoneNumber && (
          <p className="mt-2 text-center text-sm text-gray-500">
            Enter the code sent to {phoneNumber}
          </p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Enter Code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {showRememberDevice && (
              <div className="flex items-center mb-4">
                <input
                  id="rememberDevice"
                  name="rememberDevice"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
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
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </div>
        </form>

        {/* OR separator */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Alternative Actions */}
        <div className="space-y-3">
          <button
            onClick={handleResendCode}
            disabled={disabled}
            className={`w-full flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium ${disabled
              ? 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            {disabled ? `Resend in ${remaining}s` : 'Resend Code'}
          </button>

          <button
            onClick={handlePickSms}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Pick SMS
          </button>

          <button
            onClick={handleTryAnotherMethod}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Try Another Method
          </button>

          {showLinkVoice && (
            <button
              onClick={handleGetACall}
              className="w-full rounded-md py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get a Call
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MfaSmsChallengeScreen;
```
