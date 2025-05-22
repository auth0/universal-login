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
  const publicKeyCreationOptions = screen.publicKey;

  const handleEnrollPasskey = () => {
    sdk.submitPasskeyCredential(); 
  };

  const handleSnooze = () => {
    sdk.snoozeEnrollment();
  };

  const handleRefuse = () => {
    sdk.refuseEnrollmentOnThisDevice();
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
            disabled={!publicKeyCreationOptions} // Use the direct accessor
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(texts.buttonText ?? 'Enroll Passkey')}
          </button>

          <button
            onClick={handleSnooze}
            className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {texts.snoozeEnrollmentButtonText ?? 'Remind Me Later'}
          </button>

          <button
            onClick={handleRefuse}
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