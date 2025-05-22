import MfaWebAuthnNotAvailableError from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';

# MFA WebAuthn Not Available Error Screen

This screen is shown when a user attempts to use a WebAuthn authenticator (like a security key or device biometrics) for Multi-Factor Authentication (MFA), but it's determined that WebAuthn is not available or not supported by their browser or device.

The primary purpose of this screen is to inform the user about the issue and allow them to choose an alternative MFA method to complete their authentication.

The SDK provides:
- Access to standard screen information (title, description via `sdk.screen.texts`).
- A method `tryAnotherMethod()` to navigate the user to a screen where they can select a different MFA factor.

## React Component Example with TailwindCSS

This example demonstrates a simple UI for the "MFA WebAuthn Not Available" error screen.

```tsx
import React, { useState } from 'react';
import MfaWebAuthnNotAvailableError from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';

const MfaWebAuthnNotAvailableErrorScreen: React.FC = () => {
  const [sdk] = useState(() => new MfaWebAuthnNotAvailableError());
  const { screen, transaction } = sdk;
  const texts = screen.texts ?? {};

  const handleTryAnotherMethod = () => {
   sdk.tryAnotherMethod();
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6 text-center">
        <svg className="mx-auto h-12 w-12 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6H3.598M21 12a9 9 0 11-18 0 9 9 0 0118 0zM21 12H3.598m17.402 0A11.959 11.959 0 003.598 18H3.598m17.402 0A11.959 11.959 0 0120.402 6H20.402m-6.388 0A11.959 11.959 0 0012 2.064M12 2.064V6.5m6.388-4.436A11.959 11.959 0 0112 21.936V17.5m-6.388 4.436A11.959 11.959 0 0012 21.936V17.5m0-10.964A11.959 11.959 0 0120.402 6H20.402" />
        </svg>

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          {texts.title ?? 'Security Key or Biometrics Not Available'}
        </h1>
        <p className="mt-2 text-gray-600">
          {texts.description ?? 'Your browser or device doesn’t support security keys or built-in biometrics for this site, or no compatible authenticator was found. Please try a different way to sign in.'}
        </p>
        {transaction.errors && transaction.errors.length > 0 && (
           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mt-4" role="alert">
             <p className="font-bold">{texts.alertListTitle ?? 'Alerts'}</p>
             {transaction.errors.map((err, index) => (
               <p key={index}>{err.message}</p>
             ))}
           </div>
         )}

        <button
          onClick={handleTryAnotherMethod}
          className="w-full mt-6 flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {(texts.pickAuthenticatorText ?? 'Try Another Method')}
        </button>
      </div>
    </div>
  );
};

export default MfaWebAuthnNotAvailableErrorScreen;
```

## Usage Examples

### Initialize the SDK

```typescript
import MfaWebAuthnNotAvailableError from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';

const sdk = new MfaWebAuthnNotAvailableError();

// Access screen texts (title, description, button labels)
const pageTitle = sdk.screen.texts?.title;
const description = sdk.screen.texts?.description;
console.log(pageTitle, description);
```

### Try Another Method

This is the primary action on this screen. It allows the user to navigate to a different screen where they can choose another MFA factor.

```typescript
import MfaWebAuthnNotAvailableError from '@auth0/auth0-acul-js/mfa-webauthn-not-available-error';
const sdk = new MfaWebAuthnNotAvailableError();

async function handleTryAnotherMethod() {
  try {
    await sdk.tryAnotherMethod();
    // On successful submission, Auth0 will redirect the user to the MFA factor selection screen.
  } catch (error: any) {
    console.error('Failed to initiate "try another method":', error.message);
    // Display an error message to the user in the UI.
  }
}

// Call this function when the user clicks the "Try Another Method" button.
```