# `email-verification-result`

The `email-verification-result` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `email-verification-result` screen.

### 1. Create the Component

Create a component file (e.g., `EmailVerificationResult.tsx`) and add the following code:

```tsx
import React from 'react';
import { useEmailVerificationResult } from '@auth0/auth0-acul-react/email-verification-result';
import { Logo } from '../../components/Logo';

const EmailVerificationResultScreen: React.FC = () => {
  const emailVerificationResultManager = useEmailVerificationResult();
  const { screen, transaction, organization } = emailVerificationResultManager;

  const verificationStatus = screen.data?.status;
  const loginLink = screen.loginLink;


  let statusMessage = 'An unexpected error occurred.';
  let statusColor = 'text-gray-700'; // Default color
  let title = screen.texts?.title ?? 'Email Verification'; // Default title

  if (verificationStatus === 'success') {
    statusMessage = screen.texts?.descriptionSuccess ?? 'Your email has been successfully verified.';
    statusColor = 'text-green-600';
    title = screen.texts?.titleSuccess ?? 'Verification Successful';
  } else if (verificationStatus === 'failure') {
    statusMessage = screen.texts?.descriptionFailure ?? 'There was an issue verifying your email. Please try again or contact support.';
    statusColor = 'text-red-600';
    title = screen.texts?.titleFailure ?? 'Verification Failed';
  } else if (verificationStatus === 'already-verified') {
    statusMessage = screen.texts?.descriptionAlreadyVerified ?? 'This email address has already been verified.';
    statusColor = 'text-blue-600';
    title = screen.texts?.titleAlreadyVerified ?? 'Email Already Verified';
  } else {
    // Handle unknown status
    statusMessage = screen.texts?.description ?? `Email verification status: ${verificationStatus || 'unknown'}`;
    statusColor = 'text-gray-700';
    console.warn('Unknown verification status:', verificationStatus);
  }

  const handleGoToLogin = (): void => {
    if (loginLink) {
      window.location.href = loginLink;
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

        {/* Title */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {title}
        </h2>
        
        {/* Status Message */}
        <p className={`mt-2 text-center text-sm ${statusColor}`}>
          {statusMessage}
        </p>

        {/* Organization Info */}
        {organization?.name && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Organization: {organization.displayName || organization.name}
          </p>
        )}

        {/* Error Messages */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-left" role="alert">
            <strong className="font-bold">Error(s):</strong>
            {transaction.errors.map((err, index) => (
              <p key={`tx-error-${index}`} className="block sm:inline ml-2">{err.message}</p>
            ))}
          </div>
        )}

        {/* Login Button */}
        {loginLink && (
          <div className="mt-6">
            <button
              onClick={handleGoToLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {screen.texts?.buttonText ?? 'Proceed to Login'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationResultScreen;
```

### 2. How It Works

1.  **Imports**: We import `useEmailVerificationResult` and various context hooks from the dedicated `@auth0/auth0-acul-react/email-verification-result` entry point.
2.  **Hooks**:
    *   `useEmailVerificationResult()`: Provides the core screen object with methods like `submit()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.submit(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
