# `reset-password-request`

The `reset-password-request` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `reset-password-request` screen.

### 1. Create the Component

Create a component file (e.g., `ResetPasswordRequest.tsx`) and add the following code:

```tsx
import React, { useState, useMemo } from 'react';
import {
  useScreen,
  useErrors,
  useLoginIdentifiers,
  resetPassword,
  backToLogin
} from '@auth0/auth0-acul-react/reset-password-request';
import type { ResetPasswordRequestOptions } from "@auth0/auth0-acul-react/types";
import { Logo } from '../../components/Logo';

const ResetPasswordRequestScreen: React.FC = () => {
  const screen = useScreen();
  const { hasError, errors, dismiss } = useErrors();
  const identifiers = useLoginIdentifiers();

  const [username, setUsername] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = () => {
    const payload: ResetPasswordRequestOptions = {
      username
    }
    resetPassword(payload);
  };

 const identifierLabel = useMemo(() => {
     if (identifiers?.length === 1) return `Enter your ${identifiers[0]}`;
     return `Enter your ${identifiers?.join(" or ")}`;
   }, [identifiers]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {screen.texts?.title || 'Reset your password'}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {screen.texts?.description || 'Enter your username to continue'}
        </p>

        {/* Form */}
        <div className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                {identifierLabel}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setTouched(true)}
                required
                placeholder={identifierLabel}
                className="block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

          <button
            onClick={handleSubmit}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue
          </button>

          <button
            onClick={() => backToLogin()}
            className="w-full mt-2 flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
          >
            Back to My App
          </button>
        </div>

        {/* Login Link */}
        {screen.links?.loginLink && (
          <div className="mt-6 text-center text-sm">
            <a
              href={screen.links.loginLink}
              className="text-indigo-600 hover:underline"
            >
              Back to login
            </a>
          </div>
        )}

        {/* Error messages */}
        {hasError && touched && (
          <div className="mt-4 text-sm text-red-600 space-y-3">
            {errors.map((error, index) => (
              <div
                key={index}
                className="border border-red-300 bg-red-50 p-3 rounded relative"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-red-800 mb-1">{error.message}</p>
                    {error.rules && (
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        {error.rules.map(
                          (rule, idx) =>
                            !rule.isValid && (
                              <li key={idx}>
                                {rule.label}
                                {rule.items && (
                                  <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                    {rule.items.map(
                                      (item, itemIdx) =>
                                        item.status !== 'valid' && (
                                          <li key={itemIdx}>{item.label}</li>
                                        )
                                    )}
                                  </ul>
                                )}
                              </li>
                            )
                        )}
                      </ul>
                    )}
                  </div>
                  <button
                    onClick={() => dismiss(error.id)}
                    className="ml-4 text-red-500 hover:text-red-700 text-lg leading-none"
                    aria-label="Dismiss error"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordRequestScreen;
```

### 2. How It Works

1.  **Imports**: We import `useResetPasswordRequest` and various context hooks from the dedicated `@auth0/auth0-acul-react/reset-password-request` entry point.
2.  **Hooks**:
    *   `useResetPasswordRequest()`: Provides the core screen object with methods like `resetPassword()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.resetPassword(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
