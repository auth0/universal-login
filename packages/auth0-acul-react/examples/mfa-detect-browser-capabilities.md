# `mfa-detect-browser-capabilities`

The `mfa-detect-browser-capabilities` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-detect-browser-capabilities` screen.

### 1. Create the Component

Create a component file (e.g., `MfaDetectBrowserCapabilities.tsx`) and add the following code:

```tsx
import React, { useEffect, useState } from 'react';
import { useMfaDetectBrowserCapabilities, detectCapabilities } from '@auth0/auth0-acul-react/mfa-detect-browser-capabilities';

const MfaDetectBrowserCapabilitiesScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useMfaDetectBrowserCapabilities();

  useEffect(() => {
    const runDetectCapabilities = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await detectCapabilities({});
      } catch (err) {
        setError('Failed to detect browser capabilities. Please try again.');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    runDetectCapabilities();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
            <p className="mt-4 text-center text-sm text-gray-600">
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MfaDetectBrowserCapabilitiesScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaDetectBrowserCapabilities` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-detect-browser-capabilities` entry point.
2.  **Hooks**:
    *   `useMfaDetectBrowserCapabilities()`: Provides the core screen object with methods like `detectCapabilities()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.detectCapabilities(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
