import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';
import type { Scope, AuthorizationDetail } from '@auth0/auth0-acul-js/customized-consent'; // Import helper types

# Customized Consent Screen

The Customized Consent screen is displayed when an application requests permission to access certain parts of a user's account or data, potentially including fine-grained authorization details. The user can review the requested permissions (scopes) and specific authorization details, then decide whether to grant or deny access.

## React Component Example with TailwindCSS

This example demonstrates how to build a comprehensive UI for the Customized Consent screen using React and TailwindCSS. It displays information about the requesting application, the user, the organization (if applicable), the standard OAuth scopes, and any detailed authorization requests (like Rich Authorization Requests - RAR).

```tsx
import React, { useMemo } from 'react';
import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';
import type { Scope, AuthorizationDetail } from '@auth0/auth0-acul-js/customized-consent';

const CustomizedConsentScreen: React.FC = () => {
  // Instantiate the SDK class for the Customized Consent screen.
  // useMemo ensures it's only created once per component instance.
  const consentManager = useMemo(() => new CustomizedConsent(), []);

  const { client, organization, screen, transaction, user } = consentManager;
  const texts = screen.texts ?? {}; // UI texts from Auth0 dashboard
  const screenData = screen; // Access parsed scopes and authorizationDetails

  const handleAccept = () => {
    consentManager.accept();
  };

  const handleDecline = () => {
    consentManager.deny();
  };

  const pageTitle = texts.title ?? 'Authorize Application';
  const description = texts.description ?? `${client.name || 'The application'} is requesting access to your account and specific resources.`;
  const acceptButtonText = texts.acceptButtonText ?? 'Allow Access';
  const declineButtonText = texts.declineButtonText ?? 'Deny Access';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 antialiased">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 space-y-6">
        {/* Client Logo and Name */}
        <div className="flex flex-col items-center space-y-3">
          {client.logoUrl && (
            <img src={client.logoUrl} alt={`${client.name || 'Application'} logo`} className="h-16 w-16 rounded-full object-contain" />
          )}
          <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
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
        {screenData.scopes.length > 0 && (
          <div className="border-t border-gray-200 py-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {texts.scopesTitle ?? 'This application will be able to:'}
            </h2>
            <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {screenData.scopes.map((scope: Scope) => (
                <li key={scope.value} className="flex items-start p-3 bg-gray-50 rounded-lg shadow-sm">
                  <svg className="flex-shrink-0 h-6 w-6 text-blue-500 mt-0.5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

        {/* Authorization Details Section */}
        {screenData.authorizationDetails.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {texts.authorizationDetailsTitle ?? 'Specific Authorization Details:'}
            </h2>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {screenData.authorizationDetails.map((detail: AuthorizationDetail, index: number) => (
                <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-blue-700 capitalize mb-2">
                    {detail.type.replace(/_/g, ' ')}
                  </h3>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    {Object.entries(detail).map(([key, value]) => {
                      if (key === 'type') return null; // Skip the type, already displayed
                      return (
                        <li key={key} className="text-sm text-gray-600">
                          <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {value}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display transaction errors */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md mt-6" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            <ul className="list-disc list-inside ml-4">
              {transaction.errors.map((err, index) => (
                <li key={`tx-err-${index}`}>{err.message}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            onClick={handleDecline}
            className="w-full sm:w-auto flex-1 px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-md font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {declineButtonText}
          </button>
          <button
            onClick={handleAccept}
            className="w-full sm:w-auto flex-1 px-6 py-3 border border-transparent rounded-lg shadow-sm text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {acceptButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizedConsentScreen;
```

## Usage Examples

### Initialize the SDK Class

First, import and instantiate the class for the Customized Consent screen:

```typescript
import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';

const consentManager = new CustomizedConsent();

// Access client information
const clientName = consentManager.client.name;
const clientLogo = consentManager.client.logoUrl;

// Access user information
const userEmail = consentManager.user.email;

// Access organization information (if available)
const organizationName = consentManager.organization?.displayName || consentManager.organization?.name;

// Access screen-specific data
const requestedScopes = consentManager.screen.scopes;
const authorizationDetails = consentManager.screen.authorizationDetails;
const pageTitleFromTexts = consentManager.screen.texts?.title;

console.log(`${clientName} is requesting consent from ${userEmail}.`);
if (organizationName) {
  console.log(`This request is on behalf of ${organizationName}.`);
}

console.log("Requested Scopes:");
requestedScopes.forEach(scope => {
  console.log(`- ${scope.description || scope.name} (${scope.name})`);
  if (scope.values && scope.values.length > 0) {
    console.log(`  Values: ${scope.values.join(', ')}`);
  }
});

console.log("Authorization Details:");
authorizationDetails.forEach(detail => {
  console.log(`- Type: ${detail.type}`);
  Object.entries(detail).forEach(([key, value]) => {
    if (key !== 'type') {
      console.log(`  ${key}: ${value}`);
    }
  });
});

// Check for errors from a previous submission attempt:
const errors = consentManager.transaction.errors;
if (errors && errors.length > 0) {
  errors.forEach(err => console.error(`Error: ${err.message} (Code: ${err.code})`));
}
```

### Accept Consent

This action is used when the user agrees to grant the requested permissions and authorization details.
It sends `action: "accept"` to the `/u/customized-consent` endpoint.

```typescript
import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';
import type { CustomOptions } from '@auth0/auth0-acul-js'; // For payload type

const consentManager = new CustomizedConsent();

async function grantConsent() {
  // Optionally, provide custom parameters if your flow requires them
  const payload: CustomOptions = {
    // custom_param_on_accept: "value"
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

### Decline Consent

This action is used when the user decides not to grant the requested permissions and authorization details.
It sends `action: "deny"` to the `/u/customized-consent` endpoint.

```typescript
import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';
import type { CustomOptions } from '@auth0/auth0-acul-js'; // For payload type

const consentManager = new CustomizedConsent();

async function denyConsent() {
  // Optionally, provide custom parameters
  const payload: CustomOptions = {
    denial_reason_code: "user_rejected_specifics"
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