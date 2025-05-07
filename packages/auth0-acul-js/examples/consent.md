import Consent from '@auth0/auth0-acul-js/consent';
import type { Scope } from '@auth0/auth0-acul-js/consent'; // Import Scope type

# Consent Screen

This screen is displayed when a user needs to grant or deny permissions (scopes) requested by a client application for accessing a specific API (resource server).

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import Consent from '@auth0/auth0-acul-js/consent';
// Import the Scope type directly from the consent screen export
import type { Scope, ResourceServerMembers } from '@auth0/auth0-acul-js/consent';

const ConsentScreen: React.FC = () => {
  // Instantiate the Consent screen manager
  const consentManager = new Consent();
  // Destructure properties for easier access
  const { screen, transaction, resourceServers, user, client, organization } = consentManager;
  // Safely access scopes from screen.data
  const scopes = screen.data?.scopes ?? [];

  // Handler for the Accept button
  const handleAccept = async () => {
    try {
      await consentManager.accept();
      // On success, Auth0 handles redirection automatically.
    } catch (error) {
      console.error('Failed to accept consent:', error);
      // TODO: Display an user-friendly error message
    }
  };

  // Handler for the Deny button
  const handleDeny = async () => {
    try {
      await consentManager.deny();
      // On success, Auth0 handles redirection automatically (usually back to app with error).
    } catch (error) {
      console.error('Failed to deny consent:', error);
      // TODO: Display an user-friendly error message
    }
  };

  // Get the primary resource server (API) information, if available
  const primaryResourceServer = resourceServers && resourceServers.length > 0 ? resourceServers[0] : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        {/* Client Information Header */}
        <div className="flex items-center mb-6 border-b border-gray-200 pb-4">
          {client?.logoUrl && (
            <img
              src={client.logoUrl}
              alt={`${client.name || 'Application'} logo`}
              className="h-12 w-12 mr-4 rounded-full object-cover flex-shrink-0"
            />
          )}
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              {client?.name || 'This Application'} wants access to your account
            </h1>
            {client?.description && (
              <p className="text-sm text-gray-600 mt-1">{client.description}</p>
            )}
          </div>
        </div>

        {/* User Information */}
        <div className="mb-6 text-sm text-gray-600 flex items-center">
          <img
            src={user?.picture || 'https://cdn.auth0.com/avatars/default.png'} // Provide a default avatar
            alt="User avatar"
            className="h-8 w-8 rounded-full mr-3"
          />
          <span>
            Logged in as <strong className="text-gray-800">{user?.email || user?.username || 'user'}</strong>
          </span>
        </div>

        {/* Organization Information (Optional) */}
        {organization?.id && (
          <div className="mb-6 text-sm text-gray-600">
            <span>
              Using organization: <strong className="text-gray-800">{organization.displayName || organization.name}</strong>
            </span>
          </div>
        )}

        {/* Resource Server Information */}
        {primaryResourceServer && (
          <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
            <h2 className="text-base font-semibold text-gray-700 mb-1">To access the following API:</h2>
            <p className="text-gray-900 font-medium">{primaryResourceServer.name}</p>
            <p className="text-xs text-gray-500 mt-1">Identifier: {primaryResourceServer.audience}</p>
          </div>
        )}

        {/* Requested Permissions (Scopes) List */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">This will allow the application to:</h2>
          {scopes.length > 0 ? (
            <ul className="list-none space-y-3">
              {scopes.map((scope: Scope) => (
                <li key={scope.name} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <strong className="block text-gray-800">{scope.description || scope.name}</strong>
                    <span className="text-xs text-gray-500">({scope.name})</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Review the requested permissions.</p> // Placeholder if scopes are empty
          )}
        </div>

        {/* Transaction Error Display */}
        {transaction?.errors && transaction.errors.length > 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold block sm:inline">Error:</strong>
            {transaction.errors.map((err, index) => (
              <span key={index} className="block sm:inline ml-1">{err.message}</span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-8">
          <button
            onClick={handleDeny}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            type="button"
          >
            Deny Access
          </button>
          <button
            onClick={handleAccept}
            className="w-full sm:w-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            type="button"
          >
            Allow Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentScreen;
```
## Usage Examples

### Accept Consent

This action signals that the user grants the permissions requested by the application. The SDK automatically determines the required scope and audience values from the context.

```jsx
import Consent from '@auth0/auth0-acul-js/consent';

const consentManager = new Consent();

// Accept the requested permissions
try {
  // No need to pass scope/audience manually, the SDK handles it.
  await consentManager.accept();
  // User will be redirected
} catch (error) {
  console.error('Error accepting consent:', error);
  // Handle error appropriately, e.g., show a message
}
```

### Deny Consent

This action signals that the user denies the permissions requested by the application. The SDK automatically determines the required scope and audience values from the context to include in the denial request.

```jsx
import Consent from '@auth0/auth0-acul-js/consent';

const consentManager = new Consent();

// Deny the requested permissions
try {
  // No need to pass scope/audience manually, the SDK handles it.
  await consentManager.deny();
  // User will be redirected (likely back to the app with an error)
} catch (error) {
  console.error('Error denying consent:', error);
  // Handle error appropriately, e.g., show a message
}
```

#### Passing Custom Data (Optional):

If you need to send extra data along with the accept/deny action (e.g., for custom rules or logging), you can pass it in the optional payload:

```jsx
// Example for accept
await consentManager.accept({ custom_reason: "User approved specific feature" });

// Example for deny
await consentManager.deny({ denial_feedback: "Too many permissions requested" });
```