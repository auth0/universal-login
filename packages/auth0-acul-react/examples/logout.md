# `logout`

The `logout` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `logout` screen.

### 1. Create the Component

Create a component file (e.g., `Logout.tsx`) and add the following code:

```tsx
import React, {useEffect } from 'react';
import type { ConfirmLogoutOptions} from '@auth0/auth0-acul-react/types';
import { useLogout, confirmLogout } from '@auth0/auth0-acul-react/logout'

const LogoutScreen: React.FC = () => {
  const logout = useLogout();
  const { screen, transaction: { errors } } = logout;
  const texts = screen.texts ?? {};

  // Update the document title if provided
  useEffect(() => {
    if (texts.pageTitle) {
      document.title = texts.pageTitle;
    }
  }, [texts.pageTitle]);

  const handleAction = async (action: ConfirmLogoutOptions['action']) => {
    await confirmLogout({ action } as ConfirmLogoutOptions);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col px-4">
      <div className="mx-auto w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {texts.title ?? 'Logout'}
        </h1>

        {texts.userSalute && (
          <p className="text-sm text-gray-600 mb-2">
            {texts.userSalute}
          </p>
        )}

        <p className="text-sm text-gray-700 mb-6">
          {texts.description ?? 'Are you sure you want to log out?'}
        </p>

        {errors?.length && (
          <div className="mt-2 space-y-1 text-left">
            {errors.map((error, idx) => (
              <p key={idx} className="text-red-600 text-sm">
                {error.message}
              </p>
            ))}
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => handleAction('deny')}
            className="w-[150px] py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {texts.declineButtonText ?? 'No'}
          </button>

          <button
            onClick={() => handleAction('accept')}
            className="w-[150px] px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {texts.acceptButtonText ?? 'Yes'}
          </button>
        </div>

        {/* Auth0 badge/link */}
        {texts.badgeUrl && (
          <div className="mt-6 text-center">
            <a
              href={texts.badgeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:underline"
            >
              {texts.badgeAltText ?? 'Auth0'}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoutScreen;
```

### 2. How It Works

1.  **Imports**: We import `useLogout` and various context hooks from the dedicated `@auth0/auth0-acul-react/logout` entry point.
2.  **Hooks**:
    *   `useLogout()`: Provides the core screen object with methods like `confirmLogout()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.confirmLogout(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
