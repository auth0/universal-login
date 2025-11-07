# `mfa-webauthn-platform-challenge`

The `mfa-webauthn-platform-challenge` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-webauthn-platform-challenge` screen.

### 1. Create the Component

Create a component file (e.g., `MfaWebAuthnPlatformChallenge.tsx`) and add the following code:

```tsx
import React, { useState, useMemo } from 'react';
import { Logo } from '../../components/Logo';

import {
  useMfaWebAuthnPlatformChallenge,
  useScreen,
  useClient,
  useTransaction,
  verify,
  tryAnotherMethod,
} from '@auth0/auth0-acul-react/mfa-webauthn-platform-challenge'; 
import { VerifyPlatformAuthenticatorOptions } from "@auth0/auth0-acul-react/types";

const MfaWebAuthnPlatformChallengeScreen: React.FC = () => {
  // Main singleton instance (if needed)
  useMfaWebAuthnPlatformChallenge();

  const screen = useScreen();
  const client = useClient();
  const transaction = useTransaction();

  const texts = screen?.texts ?? {};
  const { publicKey: publicKeyChallengeOptions, showRememberDevice } = screen ?? {};

  const [rememberDevice, setRememberDevice] = useState(false);

  const authenticatorOptions: VerifyPlatformAuthenticatorOptions = useMemo(() => {
    const options: VerifyPlatformAuthenticatorOptions = {};
    if (showRememberDevice) {
      options.rememberDevice = rememberDevice;
    }
    return options;
  }, [rememberDevice, showRememberDevice]);


  const handleVerify = () => {
    verify(authenticatorOptions);
  };

  const handleTryAnotherMethod = () => {
    tryAnotherMethod();
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
          {texts.title ?? 'Verify Your Identity'}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {texts.description ?? 'Please use your device\'s screen lock (fingerprint, face, PIN) or a connected security key to continue.'}
        </p>

        {/* Remember Device Checkbox */}
        {showRememberDevice && (
          <div className="mt-4 flex items-center justify-center">
            <input
              id="rememberDevice"
              name="rememberDevice"
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberDevice" className="ml-2 text-sm text-gray-700">
              {texts.rememberMeText ?? 'Remember this device for 30 days'}
            </label>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleVerify}
            disabled={!publicKeyChallengeOptions}
            className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              !publicKeyChallengeOptions ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {texts.buttonText ?? 'Verify with Device'}
          </button>

          <button
            onClick={handleTryAnotherMethod}
            className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.pickAuthenticatorText ?? 'Try Another Method'}
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

export default MfaWebAuthnPlatformChallengeScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaWebAuthnPlatformChallenge` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-webauthn-platform-challenge` entry point.
2.  **Hooks**:
    *   `useMfaWebAuthnPlatformChallenge()`: Provides the core screen object with methods like `verify()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.verify(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
