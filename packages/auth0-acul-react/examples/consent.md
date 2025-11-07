# `consent`

The `consent` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `consent` screen.

### 1. Create the Component

Create a component file (e.g., `Consent.tsx`) and add the following code:

```tsx
import React, { useMemo } from 'react';
import {useConsent} from '@auth0/auth0-acul-react/consent'; // Import the Consent SDK class
import type { Scope } from '@auth0/auth0-acul-react/types'; // Import Scope type

const ConsentScreen: React.FC = () => {
  // Instantiate the SDK class for the Consent screen.
  // useMemo ensures it's only created once per component instance.
  const consentManager = useMemo(() => useConsent(), []);

  const { client, organization, screen, transaction, user } = consentManager;
  const texts = screen.texts ?? {}; // UI texts from Auth0 dashboard

  const handleAccept = () => {
    consentManager.accept();
  };

  const handleDecline = () => {
   consentManager.deny();
  };

  const pageTitle = texts.title ?? 'Authorize Application';
  const description = texts.description ?? `${client.name || 'The application'} is requesting access to your account.`;
  const acceptButtonText = texts.acceptButtonText ?? 'Allow';
  const declineButtonText = texts.declineButtonText ?? 'Deny';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 antialiased">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 space-y-6">
        {/* Client Logo and Name */}
        <div className="flex flex-col items-center space-y-3">
          {client.logoUrl && (
            <img src={client.logoUrl} alt={`${client.name || 'Application'} logo`} className="h-16 w-16 rounded-full object-contain" />
          )}
          <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>
        </div>

        {/* User and Organization Info */}
        <div className="text-center text-gray-600">
          <p>{description}</p>
          {user.email && <p className="mt-1 text-sm">You are logged in as <span className="font-semibold">{user.email}</span>.</p>}
          {organization?.name && (
            <p className="mt-1 text-sm">
              This access is being requested on behalf of the organization: <span className="font-semibold">{organization.displayName || organization.name}</span>.
            </p>
          )}
        </div>

        {/* Scopes (Permissions) Section */}
        {!screen?.hideScopes && screen.scopes.length > 0 && (
          <div className="border-t border-b border-gray-200 py-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              {texts.scopesTitle ?? 'This application will be ableto:'}
            </h2>
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {screen.scopes.map((scope: Scope) => (
                <li key={scope.value} className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{scope.value}</p>
                    <p className="text-sm font-small text-gray-700">{scope.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {screen?.hideScopes && (
           <p className="text-sm text-gray-500 text-center italic">
             {texts.scopesHiddenMessage ?? 'This application is requesting standard permissions.'}
           </p>
        )}


        {/* Display transaction errors (e.g., from server validation) */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            <ul className="list-disc list-inside ml-4">
              {transaction.errors.map((err, index) => (
                <li key={`tx-err-${index}`}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={handleDecline}
            className="w-full sm:w-auto flex-1 px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {declineButtonText}
          </button>
          <button
            onClick={handleAccept}
            className="w-full sm:w-auto flex-1 px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {acceptButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentScreen;
```

### 2. How It Works

1.  **Imports**: We import `useConsent` and various context hooks from the dedicated `@auth0/auth0-acul-react/consent` entry point.
2.  **Hooks**:
    *   `useConsent()`: Provides the core screen object with methods like `accept()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.accept(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
