# `mfa-email-challenge`

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-email-challenge` screen.

### 1. Create the Component

Create a component file (e.g., `MfaEmailChallenge.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import {
  useMfaEmailChallenge,
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} from '@auth0/auth0-acul-react/mfa-email-challenge';

export const MfaEmailChallenge: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main hook for screen logic
  const screen = useMfaEmailChallenge();

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
      await screen.continueMethod(payload);
      // On success, the core SDK handles redirection.
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>MfaEmailChallenge</h1>

      {/* TODO: Add form inputs for the 'continueMethod' payload */}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Continue'}
      </button>
    </form>
  );
};
```

### Example using utility hooks - useResend, useScreen, useUntrustedData

```tsx
import { useState, useEffect } from 'react';
import { useResend, continueMethod, tryAnotherMethod, useScreen, useUntrustedData } from '@auth0/auth0-acul-react/mfa-email-challenge';
import { Logo } from '../../components/Logo';

const MfaEmailChallengeScreen = () => {
  const [code, setCode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { email, showRememberDevice } = useScreen().data || {};
  const { remaining, disabled, startResend } = useResend({
    timeoutSeconds: 12,
    onTimeout: () => console.log('MFA Email resend available')
  });

  useEffect(() => {
    const savedFormData = useUntrustedData().submittedFormData;
    if (savedFormData?.rememberDevice !== undefined) {
      setRememberDevice(savedFormData.rememberDevice);
    }
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await continueMethod({ code, rememberDevice });
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    try {
      await startResend();
    } catch (err) {
      setError('Failed to resend code. Please try again.');
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
          MFA Email Challenge
        </h2>
        {email && (
          <p className="mt-2 text-center text-sm text-gray-500">
            Enter the code sent to {email}
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

          {error && (
            <div className="text-red-600 text-sm mb-2">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60"
            >
              {isSubmitting ? 'Verifying...' : 'Continue'}
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
            onClick={handleTryAnotherMethod}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Try Another Method
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaEmailChallengeScreen;
```
