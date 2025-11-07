# `logout-complete`

The `logout-complete` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `logout-complete` screen.

### 1. Create the Component

Create a component file (e.g., `LogoutComplete.tsx`) and add the following code:

```tsx
import React, { useEffect } from 'react';
import { useLogoutComplete } from '@auth0/auth0-acul-react/logout-complete';

const LogoutCompleteScreen: React.FC = () => {
  const logoutComplete = useLogoutComplete();
  const { screen, transaction: { errors } } = logoutComplete;
  const texts = screen.texts ?? {};

  // Update the document title if provided by the spec
  useEffect(() => {
    if (texts.pageTitle) {
      document.title = texts.pageTitle;
    }
  }, [texts.pageTitle]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full h-[300px] max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {texts.eventTitle ?? 'You have successfully logged out.'}
        </h1>

        {texts.userSalute && (
          <p className="text-sm text-gray-600 mb-2">
            {texts.userSalute}
          </p>
        )}

        {errors?.length && (
          <div className="mt-2 space-y-1 text-left">
            {errors.map((error, idx) => (
              <p key={idx} className="text-red-600 text-sm">
                {error.message}
              </p>
            ))}
          </div>
        )}

        {/* Auth0 badge/link */}
        {texts.badgeUrl && (
          <div className="mt-6">
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

export default LogoutCompleteScreen;
```

### 2. How It Works

1.  **Imports**: We import `useLogoutComplete` and various context hooks from the dedicated `@auth0/auth0-acul-react/logout-complete` entry point.
2.  **Hooks**:
    *   `useLogoutComplete()`: Provides the core screen object with methods like `submit()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.submit(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
