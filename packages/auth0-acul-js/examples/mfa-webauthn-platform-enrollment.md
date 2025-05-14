import MfaWebAuthnPlatformEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';
// createPasskeyCredentials is used internally by the SDK.

# MFA WebAuthn Platform Enrollment Screen

This screen guides the user through enrolling a platform authenticator (like Touch ID, Windows Hello, or a phone's screen lock) as a Multi-Factor Authentication (MFA) method. It leverages the WebAuthn API for secure authentication.

The SDK's `screen.publicKey` property provides the necessary options for the WebAuthn `navigator.credentials.create()` API call. The `submitPasskeyCredential` method handles calling this API internally and submitting the result.

Available actions:
-   **Enroll Passkey**: Initiates the WebAuthn enrollment process.
-   **Report Browser Error**: Sends details of a browser-side WebAuthn error to Auth0.
-   **Snooze Enrollment**: Allows the user to postpone enrollment.
-   **Refuse Enrollment on This Device**: Allows the user to decline enrollment on the current device.

## React Component Example with TailwindCSS

This example demonstrates building a UI for the MFA WebAuthn Platform Enrollment screen using React and TailwindCSS.

```tsx
import React, { useState } from 'react';
import MfaWebAuthnPlatformEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';

const MfaWebAuthnPlatformEnrollmentScreen: React.FC = () => {
  const [sdk] = useState(() => new MfaWebAuthnPlatformEnrollment());
  const { screen, transaction } = sdk;
  const texts = screen.texts ?? {};
  // publicKey options are now conveniently on sdk.screen.publicKey
  const publicKeyCreationOptions = screen.publicKey;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnrollPasskey = async () => {
    if (!publicKeyCreationOptions) { // Check the direct accessor
      setError('Passkey enrollment options (public_key) are not available.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // The SDK's submitPasskeyCredential method now internally calls createPasskeyCredentials.
      // No need to pass publicKey explicitly if using this simplified approach.
      await sdk.submitPasskeyCredential(); 
      // On success, Auth0 will typically redirect.
    } catch (err: any) {
      setIsLoading(false);
      setError(`Enrollment failed: ${err.message}`);
      // Report browser-specific WebAuthn errors to Auth0
      if (err.name && (err.name === 'NotAllowedError' || err.name === 'AbortError' || err.message.includes('timed out') || err.name === 'InvalidStateError')) {
        try {
          await sdk.reportBrowserError({ error: { name: err.name, message: err.message } });
        } catch (reportError: any) {
          console.error('Failed to report browser error:', reportError.message);
        }
      }
    }
  };

  const handleSnooze = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await sdk.snoozeEnrollment();
    } catch (err: any) {
      setIsLoading(false);
      setError(`Failed to snooze enrollment: ${err.message}`);
    }
  };

  const handleRefuse = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await sdk.refuseEnrollmentOnThisDevice();
    } catch (err: any) {
      setIsLoading(false);
      setError(`Failed to refuse enrollment: ${err.message}`);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {texts.title ?? 'Set up Passkey'}
          </h1>
          <p className="mt-2 text-gray-600">
            {texts.description ?? 'Secure your account by adding a passkey. This lets you sign in with your device’s screen lock, like fingerprint or face ID.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
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

        <div className="space-y-4">
          <button
            onClick={handleEnrollPasskey}
            disabled={isLoading || !publicKeyCreationOptions} // Use the direct accessor
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (texts.buttonText ?? 'Enroll Passkey')}
          </button>

          <button
            onClick={handleSnooze}
            disabled={isLoading}
            className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {texts.snoozeEnrollmentButtonText ?? 'Remind Me Later'}
          </button>

          <button
            onClick={handleRefuse}
            disabled={isLoading}
            className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {texts.refuseEnrollmentButtonText ?? 'Not on This Device'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaWebAuthnPlatformEnrollmentScreen;
```

## Usage Examples

### Initialize the SDK

```typescript
import MfaWebAuthnPlatformEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';

const sdk = new MfaWebAuthnPlatformEnrollment();

// Access passkey creation options via the convenient screen.publicKey
const publicKeyCreationOptions = sdk.screen.publicKey;
if (publicKeyCreationOptions) {
  console.log('Public Key Creation Options for WebAuthn:', publicKeyCreationOptions);
} else {
  console.log('Passkey creation options not available.');
}
```

### Enroll with Platform Passkey

The SDK now handles the call to `createPasskeyCredentials` internally when you use `submitPasskeyCredential`. You no longer need to pass the `publicKey` options to the method.

```typescript
import MfaWebAuthnPlatformEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';

const sdk = new MfaWebAuthnPlatformEnrollment();

async function enrollPasskey() {
  if (!sdk.screen.publicKey) {
    console.error('Passkey creation options (publicKey) not available on the screen context.');
    // Update UI to inform the user
    return;
  }

  try {
    // Call submitPasskeyCredential without arguments (or with custom options if needed)
    // The SDK will use sdk.screen.publicKey internally.
    await sdk.submitPasskeyCredential(); 
    // On success, Auth0 handles redirection.
  } catch (error: any) {
    console.error('Passkey enrollment failed:', error.message);
    // If it's a WebAuthn API error (e.g., user cancellation), report it
    if (error.name && error.message) {
      try {
        await sdk.reportBrowserError({ error: { name: error.name, message: error.message } });
      } catch (reportError: any) {
        console.error('Failed to report browser error:', reportError.message);
      }
    }
    // Update UI to show error message to the user
  }
}

// Call enrollPasskey() when the user clicks the enroll button.
```

### Report a Browser Error During Enrollment

If `submitPasskeyCredential` (which internally calls `createPasskeyCredentials`) fails due to a WebAuthn API error, you should catch this error and use `reportBrowserError`.

```typescript
import MfaWebAuthnPlatformEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-platform-enrollment';

const sdk = new MfaWebAuthnPlatformEnrollment();

async function attemptEnrollment() {
  if (!sdk.screen.publicKey) {
    console.error('Passkey creation options unavailable.');
    return;
  }
  try {
    await sdk.submitPasskeyCredential(); // No arguments needed here
  } catch (error: any) {
    // Check if it's a WebAuthn API error (they usually have a 'name' property)
    if (error.name && error.message) {
      await sdk.reportBrowserError({ 
        error: { name: error.name, message: error.message } 
      });
    } else {
      console.error("An unexpected error occurred during enrollment:", error);
    }
    // Update UI to show error message to the user
  }
}
```

### Snooze Enrollment
```typescript
// ... (sdk initialization)
await sdk.snoozeEnrollment();
```

### Refuse Enrollment on This Device
```typescript
// ... (sdk initialization)
await sdk.refuseEnrollmentOnThisDevice();
```