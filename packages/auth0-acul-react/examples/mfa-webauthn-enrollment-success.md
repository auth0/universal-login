# `mfa-webauthn-enrollment-success`

The `mfa-webauthn-enrollment-success` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-webauthn-enrollment-success` screen.

### 1. Create the Component

Create a component file (e.g., `MfaWebAuthnEnrollmentSuccess.tsx`) and add the following code:

```tsx
import React, { useMemo } from 'react';
import { Logo } from '../../components/Logo';

import {
  useMfaWebAuthnEnrollmentSuccess,
  useScreen,
  useClient,
  useTransaction,
  continueMethod
} from '@auth0/auth0-acul-react/mfa-webauthn-enrollment-success'; 

const MfaWebAuthnEnrollmentSuccessScreen: React.FC = () => {
  const sdk = useMfaWebAuthnEnrollmentSuccess();
  const screen = useScreen();
  const client = useClient();
  const transaction = useTransaction();

  const texts = screen?.texts ?? {};
  const screenData = screen?.data;

  const authenticatorTypeFriendlyName = useMemo(() => {
    if (screenData?.webAuthnType === 'webauthn-platform') {
      return texts.platformAuthenticatorName ?? 'Device Authenticator';
    }
    if (screenData?.webAuthnType === 'webauthn-roaming') {
      return texts.roamingAuthenticatorName ?? 'Security Key';
    }
    return 'Authenticator';
  }, [screenData?.webAuthnType, texts]);

  const handleContinue = () => {
    continueMethod();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-8">
        {/* Client Logo (if available) */}
        {client.logoUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={client.logoUrl}
              alt={client.name ?? 'Client Logo'}
              className="h-12"
            />
          </div>
        )}

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {texts.title ?? 'Authenticator Added!'}
        </h1>

        {/* Description and Nickname */}
        {screenData ? (
          <>
            <p className="mt-2 text-sm text-center text-gray-600">
              Your {authenticatorTypeFriendlyName} has been successfully added to your account.
            </p>
            <div className="mt-4">
              <input
                type="text"
                value={screenData.nickname}
                readOnly
                disabled
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-center bg-gray-50 text-gray-500 cursor-not-allowed sm:text-sm"
              />
            </div>
          </>
        ) : (
          <p className="mt-2 text-sm text-center text-gray-600">
            {texts.descriptionGeneric ?? 'Your authenticator has been successfully added.'}
          </p>
        )}

        {/* Continue Button */}
        <div className="mt-6">
          <button
            onClick={handleContinue}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue
          </button>
        </div>

        {/* Errors */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="mt-4 text-sm text-red-600 text-center">
            {transaction.errors.map((err, index) => (
              <p key={`tx-err-${index}`}>{err.message}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MfaWebAuthnEnrollmentSuccessScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaWebAuthnEnrollmentSuccess` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-webauthn-enrollment-success` entry point.
2.  **Hooks**:
    *   `useMfaWebAuthnEnrollmentSuccess()`: Provides the core screen object with methods like `continueMethod()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.continueMethod(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
