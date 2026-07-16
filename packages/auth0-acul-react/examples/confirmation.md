# `confirmation`

The `confirmation` screen is used to let users confirm or decline account creation (auto-signup) after OTP verification.

## ⚛️ React Example

This example demonstrates how to build a React component for the `confirmation` screen.

### 1. Create the Component

Create a component file (e.g., `Confirmation.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import {
  useConfirmation,
  proceedToSignup,
  goBack,
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} from '@auth0/auth0-acul-react/confirmation';

export const Confirmation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main hook for screen logic
  const screen = useConfirmation();

  // Context hooks
  const userData = useUser();
  const tenantData = useTenant();
  const brandingData = useBranding();
  const clientData = useClient();
  const organizationData = useOrganization();
  const promptData = usePrompt();
  const untrustedData = useUntrustedData();

  const handleProceedToSignup = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await proceedToSignup();
      // On success, the core SDK handles redirection.
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await goBack();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Confirmation</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleGoBack} disabled={isLoading}>
        Back
      </button>
      <button onClick={handleProceedToSignup} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Confirm'}
      </button>
    </div>
  );
};
```

### 2. How It Works

1.  **Imports**: We import `useConfirmation` and the `proceedToSignup`/`goBack` action functions, plus various context hooks from the dedicated `@auth0/auth0-acul-react/confirmation` entry point.
2.  **Hooks**:
    *   `useConfirmation()`: Provides the core screen instance for reading screen/transaction data.
    *   `proceedToSignup()` / `goBack()`: Error-managed action functions that submit the corresponding action to the server.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage loading indicators and error messages.
4.  **Actions**:
    *   `handleProceedToSignup` calls `proceedToSignup()` to confirm account creation.
    *   `handleGoBack` calls `goBack()` to decline auto-signup and return to the login screen without creating an account.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
