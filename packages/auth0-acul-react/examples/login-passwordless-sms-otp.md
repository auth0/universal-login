# `login-passwordless-sms-otp`

The `login-passwordless-sms-otp` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `login-passwordless-sms-otp` screen.

### 1. Create the Component

Create a component file (e.g., `LoginPasswordlessSmsOtp.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import {
  useLoginPasswordlessSmsOtp,
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} from '@auth0/auth0-acul-react/login-passwordless-sms-otp';

export const LoginPasswordlessSmsOtp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main hook for screen logic
  const screen = useLoginPasswordlessSmsOtp();

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
      await screen.submitOTP(payload);
      // On success, the core SDK handles redirection.
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>LoginPasswordlessSmsOtp</h1>

      {/* TODO: Add form inputs for the 'submitOTP' payload */}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Continue'}
      </button>
    </form>
  );
};
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
