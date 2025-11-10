# `mfa-push-welcome`

The `mfa-push-welcome` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-push-welcome` screen.

### 1. Create the Component

Create a component file (e.g., `MfaPushWelcome.tsx`) and add the following code:

```tsx
import React, { useCallback } from 'react';
import { useMfaPushWelcome, pickAuthenticator, enroll } from '@auth0/auth0-acul-react/mfa-push-welcome';
import { Logo } from '../../components/Logo';

const MfaPushWelcomeScreen: React.FC = () => {
  const mfaPushWelcome = useMfaPushWelcome();
  const { screen } = mfaPushWelcome;

  /** Handle Enroll */
  const handleEnroll = useCallback(async () => {
    try {
      await enroll();
    } catch (error) {
      console.error('Failed to enroll:', error);
    }
  }, []);

  /** Handle Pick Authenticator */
  const handlePickAuthenticator = useCallback(async () => {
    try {
      await pickAuthenticator();
    } catch (error) {
      console.error('Failed to pick authenticator:', error);
    }
  }, []);

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
          {screen.texts?.title ?? 'Secure Your Account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {screen.texts?.description ??
            'To continue, install the Auth0 Guardian app from your mobile device\'s app store.'}
        </p>

        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <button
            type="button"
            onClick={handleEnroll}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screen.texts?.buttonText ?? 'Continue'}
          </button>
          
          <button
            type="button"
            onClick={handlePickAuthenticator}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screen.texts?.pickAuthenticatorText ?? 'Try Another Method'}
          </button>
        </div>

        {/* App Download Links */}
        {(screen.links?.ios || screen.links?.android) && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-3">Download the app</p>
            <div className="space-y-2">
              {screen.links?.ios && (
                <a
                  href={screen.links.ios}
                  className="block text-center text-sm text-indigo-600 hover:underline"
                >
                  Download for iOS
                </a>
              )}
              {screen.links?.android && (
                <a
                  href={screen.links.android}
                  className="block text-center text-sm text-indigo-600 hover:underline"
                >
                  Download for Android
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MfaPushWelcomeScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaPushWelcome` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-push-welcome` entry point.
2.  **Hooks**:
    *   `useMfaPushWelcome()`: Provides the core screen object with methods like `enroll()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.enroll(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
