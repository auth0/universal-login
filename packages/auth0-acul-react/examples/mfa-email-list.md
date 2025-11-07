# `mfa-email-list`

The `mfa-email-list` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-email-list` screen.

### 1. Create the Component

Create a component file (e.g., `MfaEmailList.tsx`) and add the following code:

```tsx
import React from 'react';
import { useMfaEmailList, selectMfaEmail, goBack } from '@auth0/auth0-acul-react/mfa-email-list';
import { Logo } from '../../components/Logo';

const MfaEmailListScreen: React.FC = () => {
  const { user, screen } = useMfaEmailList();
  const { texts } = screen || {};

  const title = texts?.title ?? 'Select an Email Address';
  const emptyText = texts?.noEmailsText ?? 'No email addresses enrolled.';
  const backText = texts?.backButtonText ?? 'Back';
  const selectActionText = texts?.selectActionText ?? 'Use';

  const handleSelectEmail = async (index: number) => {
    try {
      await selectMfaEmail({ index });
    } catch (error) {
      console.error('Failed to select email:', error);
    }
  };

  const handleGoBack = async () => {
    try {
      await goBack();
    } catch (error) {
      console.error('Failed to go back:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h2>

        {/* Email List */}
        <div className="mt-4 space-y-3 max-h-80 overflow-y-auto pr-1">
          {user.enrolledEmails && user.enrolledEmails.length > 0 ? (
            user.enrolledEmails.map(({ email, id }) => (
              <button
                key={id}
                onClick={() => handleSelectEmail(id)}
                className="w-full flex justify-between items-center py-2.5 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                <span className="truncate mr-2 text-left">{email}</span>
                <span className="text-indigo-600 text-xs font-semibold">{selectActionText}</span>
              </button>
            ))
          ) : (
            <div className="text-sm text-gray-500 text-center py-6 border border-dashed border-gray-300 rounded">
              {emptyText}
            </div>
          )}
        </div>

        {/* Back button */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleGoBack}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {backText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaEmailListScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaEmailList` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-email-list` entry point.
2.  **Hooks**:
    *   `useMfaEmailList()`: Provides the core screen object with methods like `selectMfaEmail()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.selectMfaEmail(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
