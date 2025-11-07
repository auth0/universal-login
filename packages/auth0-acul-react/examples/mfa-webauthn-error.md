# `mfa-webauthn-error`

The `mfa-webauthn-error` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-webauthn-error` screen.

### 1. Create the Component

Create a component file (e.g., `MfaWebAuthnError.tsx`) and add the following code:

```tsx
import React from 'react';
import { 
  useScreen, 
  useTransaction,
  tryAgain,
  usePassword,
  tryAnotherMethod,
  noThanks
} from '@auth0/auth0-acul-react/mfa-webauthn-error';
import { Logo } from '../../components/Logo';

const MfaWebAuthnErrorScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const texts = screen.texts ?? {};
  const screenData = screen.data;

  const handleTryAgain = async () => {
    try {
      await tryAgain();
    } catch (error) {
      console.error('Try again failed:', error);
    }
  };

  const handleUsePassword = async () => {
    try {
      await usePassword();
    } catch (error) {
      console.error('Use password failed:', error);
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await tryAnotherMethod();
    } catch (error) {
      console.error('Try another method failed:', error);
    }
  };

  const handleNoThanks = async () => {
    try {
      await noThanks();
    } catch (error) {
      console.error('No thanks failed:', error);
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

        {/* Error Icon */}
        <div className="flex justify-center mt-6">
          <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-center text-xl font-semibold text-gray-900">
          {texts.title ?? 'Authentication Error'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {texts.description ?? 'There was an issue with your security key or built-in authenticator'}
        </p>

        {/* Error Details */}
        {screenData && (
          <div className="mt-6 bg-red-50 p-3 rounded-md border border-red-200 text-sm text-red-700">
            <p><strong>Error Type:</strong> {screenData.errorType}</p>
            <p><strong>Authenticator Type:</strong> {screenData.webAuthnType}</p>
          </div>
        )}

        {/* Transaction Errors */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Alerts'}</p>
            {transaction.errors.map((err, index) => (
              <p key={index}>{err.message}</p>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleTryAgain}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.tryAgainButtonText ?? 'Try Again'}
          </button>

          <button
            onClick={handleUsePassword}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.usePasswordButtonText ?? 'Use Password Instead'}
          </button>

          <button
            onClick={handleTryAnotherMethod}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.tryAnotherMethodButtonText ?? 'Try Another Method'}
          </button>
          
          <button
            onClick={handleNoThanks}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.noThanksButtonText ?? 'No Thanks / Decline'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaWebAuthnErrorScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaWebAuthnError` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-webauthn-error` entry point.
2.  **Hooks**:
    *   `useMfaWebAuthnError()`: Provides the core screen object with methods like `tryAgain()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.tryAgain(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
