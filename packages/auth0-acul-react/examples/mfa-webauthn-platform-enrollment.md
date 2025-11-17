# `mfa-webauthn-platform-enrollment`

The `mfa-webauthn-platform-enrollment` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-webauthn-platform-enrollment` screen.

### 1. Create the Component

Create a component file (e.g., `MfaWebAuthnPlatformEnrollment.tsx`) and add the following code:

```tsx
import React from 'react';
import {
  useScreen,
  useTransaction,
  submitPasskeyCredential,
  snoozeEnrollment,
  refuseEnrollmentOnThisDevice,
  useErrors
} from '@auth0/auth0-acul-react/mfa-webauthn-platform-enrollment';
import { Logo } from '../../components/Logo';

const MfaWebAuthnPlatformEnrollmentScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const texts = screen?.texts ?? {};
  const publicKeyCreationOptions = screen?.publicKey;

  // Error handling
  const { hasError, errors } = useErrors();

  const handleEnrollPasskey = () => {
    submitPasskeyCredential();
  };

  const handleSnooze = () => {
    snoozeEnrollment();
  };

  const handleRefuse = () => {
    refuseEnrollmentOnThisDevice();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {texts.title ?? 'Set up Passkey'}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {texts.description ?? 'Secure your account by adding a passkey.'}
        </p>

        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleEnrollPasskey}
            disabled={!publicKeyCreationOptions}
            className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              !publicKeyCreationOptions ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {texts.buttonText ?? 'Enroll Passkey'}
          </button>

          <button
            onClick={handleSnooze}
            className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.snoozeEnrollmentButtonText ?? 'Remind Me Later'}
          </button>

          <button
            onClick={handleRefuse}
            className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.refuseEnrollmentButtonText ?? 'Not on This Device'}
          </button>
        </div>

        {/* Errors */}
        {transaction?.hasErrors && Array.isArray(transaction.errors) && transaction.errors.length > 0 && (
          <div className="mt-4 text-sm text-red-600 text-center">
            {transaction.errors.map((error, index) => (
              <p key={index}>{error?.message}</p>
            ))}
          </div>
        )}

      </div>
    </div>

    {/* Display errors */}
    {hasError && (
      <div className="mt-4 text-red-600 text-center text-sm space-y-1">
        {errors.map((err, idx) => (
          <p key={`err-${idx}`}>{err.message}</p>
        ))}
      </div>
    )}
  );
};

export default MfaWebAuthnPlatformEnrollmentScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaWebAuthnPlatformEnrollment` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-webauthn-platform-enrollment` entry point.
2.  **Hooks**:
    *   `useMfaWebAuthnPlatformEnrollment()`: Provides the core screen object with methods like `submitPasskeyCredential()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.submitPasskeyCredential(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
