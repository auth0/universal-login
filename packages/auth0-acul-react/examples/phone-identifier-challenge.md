# `phone-identifier-challenge`

## ⚛️ React Example

This example demonstrates how to build a React component for the `phone-identifier-challenge` screen.

### 1. Create the Component

Create a component file (e.g., `PhoneIdentifierChallenge.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import {
  usePhoneIdentifierChallenge,
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} from '@auth0/auth0-acul-react/phone-identifier-challenge';

export const PhoneIdentifierChallenge: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main hook for screen logic
  const screen = usePhoneIdentifierChallenge();

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
      await screen.submitPhoneChallenge(payload);
      // On success, the core SDK handles redirection.
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>PhoneIdentifierChallenge</h1>

      {/* TODO: Add form inputs for the 'submitPhoneChallenge' payload */}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Continue'}
      </button>
    </form>
  );
};
```

### Example using utility hooks - useResend

```tsx
import React, { useState } from 'react';
import {
  submitPhoneChallenge,
  returnToPrevious,
  useResend
} from '@auth0/auth0-acul-react/phone-identifier-challenge';

const PhoneIdentifierChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [returned, setReturned] = useState(false);

  const { disabled, startResend } = useResend({ timeoutSeconds: 10 });

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
      await submitPhoneChallenge({ code });
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Phone Identifier Challenge
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
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
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Challenge
            </button>
          </form>
          <form className="space-y-6 mt-4" onSubmit={handleResend}>
            <button
              type="submit"
              disabled={disabled}
              className={`w-full py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${disabled
                ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed'
                : 'border-blue-600 text-blue-600 bg-white hover:bg-blue-50 focus:ring-blue-500'
                }`}
            >
              {disabled ? 'Resend Limit Reached' : 'Resend Code'}
            </button>
          </form>
          <form className="space-y-6 mt-4" onSubmit={handleReturn}>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-gray-400 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Return to Previous
            </button>
          </form>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-2">Challenge submitted successfully!</div>}
          {returned && <div className="text-blue-600 text-sm mt-2">Returned to previous step.</div>}
        </div>
      </div>
    </div>
  );
};

export default PhoneIdentifierChallengeScreen;
```
