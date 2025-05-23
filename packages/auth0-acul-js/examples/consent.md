import Consent from '@auth0/auth0-acul-js/consent';

# Consent Screen

The Consent screen is displayed when an application requests permission to access certain parts of a user's account or data. The user can review the requested permissions (scopes) and decide whether to grant or deny access.

## React Component Example with TailwindCSS

This example demonstrates how to build a UI for the Consent screen using React and TailwindCSS. It displays information about the requesting application, the user, the organization (if applicable), and the specific permissions being requested.

```tsx
import React, { useMemo } from 'react';
import Consent from '@auth0/auth0-acul-js/consent';
import type { Scope } from '@auth0/auth0-acul-js/consent'; // Import Scope type

const ConsentScreen: React.FC = () => {
  // Instantiate the SDK class for the Consent screen.
  // useMemo ensures it's only created once per component instance.
  const consentManager = useMemo(() => new Consent(), []);

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
                <li key={scope.name} className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{scope.description || scope.name}</p>
                    {scope.values && scope.values.length > 0 && (
                      <p className="text-xs text-gray-500 pl-1">Details: {scope.values.join(', ')}</p>
                    )}
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

## Usage Examples

### Initialize the SDK Class

First, import and instantiate the class for the Consent screen:

```typescript
import Consent from '@auth0/auth0-acul-js/consent';

const consentManager = new Consent();

// You can now access screen, client information, user details, etc.
const clientName = consentManager.client.name;
const userEmail = consentManager.user.email;
const requestedScopes = consentManager.screen?.scopes;
const shouldHideScopes = consentManager.screen?.hideScopes;

console.log(`${clientName} is requesting consent from ${userEmail}.`);
if (shouldHideScopes) {
  console.log("Scope details are hidden.");
} else if (requestedScopes) {
  console.log("Requested permissions:");
  requestedScopes.forEach(scope => {
    console.log(`- ${scope.description} (${scope.name})`);
  });
}

// Check for errors from a previous submission attempt:
const errors = consentManager.transaction.errors;
if (errors && errors.length > 0) {
  errors.forEach(err => console.error(`Error: ${err.message}`));
}
```

### Accept Consent

This action is used when the user agrees to grant the requested permissions.
It sends `action: "accept"` to the `/u/consent` endpoint.

```typescript
import Consent from '@auth0/auth0-acul-js/consent';
import type { CustomOptions } from '@auth0/auth0-acul-js'; // For payload type

const consentManager = new Consent();

async function grantConsent() {
  // Optionally, provide custom parameters if your flow requires them
  const payload: CustomOptions = {
    // custom_param: "value"
  };

  try {
    await consentManager.accept(payload);
    // If successful, Auth0 will typically redirect the user.
  } catch (error: any) {
    // This catch block handles unexpected errors during the submission itself (e.g., network issues).
    // Specific validation errors from Auth0 will be available in
    // `consentManager.transaction.errors` after the promise resolves or the page reloads.
    console.error('Failed to accept consent:', error.message);
  }
}

// Call this function, for example, when the user clicks an "Allow" or "Accept" button.
// grantConsent();
```

### Deny Consent

This action is used when the user decides not to grant the requested permissions.
It sends `action: "deny"` to the `/u/consent` endpoint.

```typescript
import Consent from '@auth0/auth0-acul-js/consent';
import type { CustomOptions } from '@auth0/auth0-acul-js'; // For payload type

const consentManager = new Consent();

async function denyConsent() {
  // Optionally, provide custom parameters
  const payload: CustomOptions = {
    // denial_reason_code: "user_rejected"
  };

  try {
    await consentManager.deny(payload);
    // If successful, Auth0 will typically redirect the user,
    // possibly to an error page or back to the application with an access_denied error.
  } catch (error: any) {
    console.error('Failed to deny consent:', error.message);
  }
}

// Call this function, for example, when the user clicks a "Deny" or "Cancel" button.
// denyConsent();
```