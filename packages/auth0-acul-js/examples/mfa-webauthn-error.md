import MfaWebAuthnError from '@auth0/auth0-acul-js/mfa-webauthn-error';

# MFA WebAuthn Error Screen

This screen is displayed when an error occurs during a WebAuthn (platform or roaming) authentication or enrollment attempt within an MFA flow. It provides the user with several options to proceed.

The SDK exposes data about the error, such as `errorType` and `webauthnType` (indicating if it was a 'webauthn-roaming' or 'webauthn-platform' authenticator).

Available actions:
-   **Try Again**: Attempts the previous WebAuthn operation again.
-   **Use Password**: Allows the user to use password-based authentication (if applicable to the flow).
-   **Try Another Method**: Navigates to a screen to select a different MFA factor.
-   **No Thanks / Decline**: Allows the user to refuse or cancel the WebAuthn operation, often relevant during enrollment.

## React Component Example with TailwindCSS

This example demonstrates building a UI for the MFA WebAuthn Error screen using React and TailwindCSS, utilizing the `MfaWebAuthnError` SDK class.

```tsx
import React, { useMemo } from 'react';
import MfaWebAuthnError from '@auth0/auth0-acul-js/mfa-webauthn-error';

const MfaWebAuthnErrorScreen: React.FC = () => {
  const sdk = useMemo(() => new MfaWebAuthnError(), []);
  const { screen, transaction } = sdk;
  const texts = screen.texts ?? {};
  const screenData = screen.data;

  const handleAction = (action: () => Promise<void>) => {
    action();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            {texts.title ?? 'Authentication Error'}
          </h1>
          <p className="mt-2 text-gray-600">
            {texts.description ?? 'There was an issue with your security key or built-in authenticator.'}
          </p>
        </div>

        {screenData && (
          <div className="bg-red-50 p-3 rounded-md border border-red-200 text-sm text-red-700">
            <p><strong>Error Type:</strong> {screenData.errorType}</p>
            <p><strong>Authenticator Type:</strong> {screenData.webauthnType}</p>
          </div>
        )}
         {transaction.errors && transaction.errors.length > 0 && (
           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mt-4" role="alert">
             <p className="font-bold">{texts.alertListTitle ?? 'Alerts'}</p>
             {transaction.errors.map((err, index) => (
               <p key={index}>{err.message}</p>
             ))}
           </div>
         )}

        <div className="space-y-3">
          <button
            onClick={() => handleAction(() => sdk.tryAgain())}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {texts.tryAgainButtonText ?? 'Try Again'}
          </button>

          {/* Conditionally render other options based on flow, or always show if applicable */}
          <button
            onClick={() => handleAction(() => sdk.usePassword())}
            className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {texts.usePasswordButtonText ?? 'Use Password Instead'}
          </button>

          <button
            onClick={() => handleAction(() => sdk.tryAnotherMethod())}
            className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {texts.tryAnotherMethodButtonText ?? 'Try Another Method'}
          </button>
          
          <button
            onClick={() => handleAction(() => sdk.noThanks())}
            className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {texts.noThanksButtonText ?? 'No Thanks / Decline'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaWebAuthnErrorScreen;
```

## Usage Examples

### Initialize the SDK

```typescript
import MfaWebAuthnError from '@auth0/auth0-acul-js/mfa-webauthn-error';

const sdk = new MfaWebAuthnError();

// Access screen data
const errorType = sdk.screen.data?.errorType;
const webauthnType = sdk.screen.data?.webauthnType;
console.log(`WebAuthn Error: ${errorType}, Type: ${webauthnType}`);
```

### Try Again

Allows the user to re-attempt the failed WebAuthn operation.

```typescript
import MfaWebAuthnError from '@auth0/auth0-acul-js/mfa-webauthn-error';
const sdk = new MfaWebAuthnError();

async function handleTryAgain() {
  try {
    await sdk.tryAgain();
    // Auth0 handles redirection.
  } catch (error: any) {
    console.error('Failed to "try again":', error.message);
  }
}
```

### Use Password

If applicable, allows the user to fall back to password authentication.

```typescript
import MfaWebAuthnError from '@auth0/auth0-acul-js/mfa-webauthn-error';
const sdk = new MfaWebAuthnError();

async function handleUsePassword() {
  try {
    await sdk.usePassword();
    // Auth0 handles redirection.
  } catch (error: any) {
    console.error('Failed to "use password":', error.message);
  }
}
```

### Try Another Method

Navigates the user to select a different MFA factor.

```typescript
import MfaWebAuthnError from '@auth0/auth0-acul-js/mfa-webauthn-error';
const sdk = new MfaWebAuthnError();

async function handleTryAnother() {
  try {
    await sdk.tryAnotherMethod();
    // Auth0 handles redirection.
  } catch (error: any) {
    console.error('Failed to "try another method":', error.message);
  }
}
```

### No Thanks / Decline

Allows the user to cancel or refuse the WebAuthn operation (e.g., decline enrollment).

```typescript
import MfaWebAuthnError from '@auth0/auth0-acul-js/mfa-webauthn-error';
const sdk = new MfaWebAuthnError();

async function handleNoThanks() {
  try {
    await sdk.noThanks();
    // Auth0 handles redirection.
  } catch (error: any) {
    console.error('Failed to "decline":', error.message);
  }
}
```