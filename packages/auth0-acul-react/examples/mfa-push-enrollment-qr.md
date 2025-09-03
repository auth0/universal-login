# `mfa-push-enrollment-qr`

The `mfa-push-enrollment-qr` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-push-enrollment-qr` screen.

### 1. Create the Component

Create a component file (e.g., `MfaPushEnrollmentQr.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import {
  useMfaPushEnrollmentQr,
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} from '@auth0/auth0-acul-react/mfa-push-enrollment-qr';

export const MfaPushEnrollmentQr: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main hook for screen logic
  const screen = useMfaPushEnrollmentQr();

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
      await screen.pickAuthenticator(payload);
      // On success, the core SDK handles redirection.
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>MfaPushEnrollmentQr</h1>

      {/* TODO: Add form inputs for the 'pickAuthenticator' payload */}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Continue'}
      </button>
    </form>
  );
};
```

### 2. How It Works

1.  **Imports**: We import `useMfaPushEnrollmentQr` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-push-enrollment-qr` entry point.
2.  **Hooks**:
    *   `useMfaPushEnrollmentQr()`: Provides the core screen object with methods like `pickAuthenticator()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.pickAuthenticator(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
