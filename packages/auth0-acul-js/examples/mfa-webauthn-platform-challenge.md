import MfaWebAuthnPlatformChallenge, {
  type VerifyPlatformAuthenticatorOptions,
  type ReportBrowserErrorOptions,
  type TryAnotherMethodOptions,
  type WebAuthnErrorDetails
} from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';

# MFA WebAuthn Platform Challenge Screen

This screen is presented when a user needs to authenticate using a platform authenticator (e.g., Touch ID, Windows Hello, Android screen lock) as part of a Multi-Factor Authentication (MFA) flow. The browser will prompt the user to interact with their device's built-in authenticator.

The SDK provides methods to:
- Initiate the platform authenticator verification (`verify`).
- Report any browser-side errors encountered during the WebAuthn API interaction (`reportBrowserError`).
- Allow the user to choose a different MFA method (`tryAnotherMethod`).

## React Component Example with TailwindCSS

This example demonstrates how to build a UI for the MFA WebAuthn Platform Challenge screen using React and TailwindCSS. It utilizes the `MfaWebAuthnPlatformChallenge` SDK class.

```tsx
import React, { useState, useMemo, useCallback } from 'react';
import MfaWebAuthnPlatformChallenge, {
  type VerifyPlatformAuthenticatorOptions} from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge'; // Adjust path as necessary

const MfaWebAuthnPlatformChallengeScreen: React.FC = () => {
  // Instantiate the SDK class. Memoized to avoid re-creation on re-renders.
  const sdk = useMemo(() => new MfaWebAuthnPlatformChallenge(), []);

  const { screen, transaction, client } = sdk;
  const texts = screen.texts ?? {};
  const { publicKey: publicKeyChallengeOptions, showRememberDevice } = screen;

  const [rememberDevice, setRememberDevice] = useState(false);

  const handleVerify = useCallback(() => {
    const opts: VerifyPlatformAuthenticatorOptions = {};
    if (showRememberDevice) {
      opts.rememberDevice = rememberDevice;
    }
    sdk.verify(opts);
  }, [sdk, rememberDevice, showRememberDevice]);

  const handleTryAnotherMethod = useCallback(() => {
    sdk.tryAnotherMethod();
  }, [sdk]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        {client.logoUrl && (
          <img src={client.logoUrl} alt={client.name ?? 'Client Logo'} className="mx-auto h-12 mb-6" />
        )}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {texts.title ?? 'Verify Your Identity'}
          </h1>
          <p className="mt-2 text-gray-600">
            {texts.description ?? 'Please use your device\'s screen lock (fingerprint, face, PIN) or a connected security key to continue.'}
          </p>
        </div>

        {/* Display transaction errors (e.g., from previous failed attempts, invalid state) */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            {transaction.errors.map((err, index) => (
              <p key={`tx-err-${index}`}>{err.message}</p>
            ))}
          </div>
        )}

        {/* Remember device checkbox */}
        {showRememberDevice && (
          <div className="flex items-center justify-center">
            <input
              id="rememberDevice"
              name="rememberDevice"
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberDevice" className="ml-2 block text-sm text-gray-900">
              {texts.rememberMeText ?? 'Remember this device for 30 days'}
            </label>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleVerify}
            disabled={!publicKeyChallengeOptions}
            className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {(texts.buttonText ?? 'Verify with Device')}
          </button>

          <button
            onClick={handleTryAnotherMethod}
            className="w-full flex justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {texts.pickAuthenticatorText ?? 'Try Another Method'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaWebAuthnPlatformChallengeScreen;
```

## Usage Examples

### Initialize the SDK Class

First, import and instantiate the class for the screen:

```typescript
import MfaWebAuthnPlatformChallenge from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';

const sdk = new MfaWebAuthnPlatformChallenge();

// Access screen data
const publicKeyOptions = sdk.screen.publicKey; // Contains the challenge for navigator.credentials.get()
const showRemember = sdk.screen.showRememberDevice;
const texts = sdk.screen.texts; // UI texts like title, button labels

if (!publicKeyOptions) {
  console.error("WebAuthn platform challenge options (publicKey) are not available.");
  // Handle this case, e.g., by showing an error or guiding the user.
}
```

### Verify with Platform Authenticator

This is the primary action. It will trigger the browser's WebAuthn API (`navigator.credentials.get()`) using the challenge options provided by Auth0 (`sdk.screen.publicKey`).

```typescript
import MfaWebAuthnPlatformChallenge, {
  type VerifyPlatformAuthenticatorOptions,
  type WebAuthnErrorDetails
} from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';

const sdk = new MfaWebAuthnPlatformChallenge();

async function verifyWithPlatform(shouldRememberDevice: boolean) {
  const options: VerifyPlatformAuthenticatorOptions = {};
  if (sdk.screen.showRememberDevice) {
    options.rememberDevice = shouldRememberDevice;
  }

  try {
    await sdk.verify(options);
    // On success, Auth0 handles redirection to the next step in the flow.
  } catch (error: any) {
    console.error('Platform authenticator verification process failed:', error.message);
    // If it's a WebAuthn API error (e.g., user cancellation, timeout), report it
    if (error.name && error.message) {
      try {
        await sdk.reportBrowserError({ error: { name: error.name, message: error.message } });
        // Auth0 may redirect or update UI based on the error report.
      } catch (reportError: any) {
        console.error("Failed to report browser error:", reportError.message);
      }
    }
    // Update UI to inform the user (e.g., "Verification failed. Please try again or use another method.")
    // Also check `sdk.transaction.errors` if the page reloads with an error message from the server.
  }
}

// Example usage, perhaps from a button click:
// const userWantsToRemember = document.getElementById('remember-device-checkbox').checked;
// verifyWithPlatform(userWantsToRemember);
```

### Report a WebAuthn Browser Error

If `sdk.verify()` fails due to a WebAuthn API error (e.g., `NotAllowedError` if the user cancels the prompt), you should catch this error and use `reportBrowserError` to inform Auth0.

```typescript
import MfaWebAuthnPlatformChallenge, {
  type ReportBrowserErrorOptions,
  type WebAuthnErrorDetails
} from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';

const sdk = new MfaWebAuthnPlatformChallenge();

async function handleWebAuthnApiError(errorFromWebAuthnApi: DOMException) {
  const errorDetails: WebAuthnErrorDetails = {
    name: errorFromWebAuthnApi.name,
    message: errorFromWebAuthnApi.message,
    // Optionally include other DOMException properties if relevant and allowed by WebAuthnErrorDetails
    // code: errorFromWebAuthnApi.code, // Example if 'code' were part of WebAuthnErrorDetails
  };

  const options: ReportBrowserErrorOptions = { error: errorDetails };

  try {
    await sdk.reportBrowserError(options);
    // Auth0 will process this error. The page might re-render with specific error messages
    // from `sdk.transaction.errors`, or redirect to an error screen.
  } catch (submitError: any) {
    console.error('Failed to submit the WebAuthn error report to Auth0:', submitError.message);
    // Handle failure to report the error - display a generic error message to the user.
  }
}

// Example: Catching an error from a manual navigator.credentials.get() call (less common with SDK's verify method)
// async function manualWebAuthnGetAttempt() {
//   try {
//     const cred = await navigator.credentials.get({ publicKey: sdk.screen.publicKey });
//     // ... process cred ...
//   } catch (e) {
//     if (e instanceof DOMException) {
//       handleWebAuthnApiError(e);
//     }
//   }
// }
```

### Try Another MFA Method

If the user cannot use their platform authenticator or wishes to use a different MFA factor:

```typescript
import MfaWebAuthnPlatformChallenge, { type TryAnotherMethodOptions } from '@auth0/auth0-acul-js/mfa-webauthn-platform-challenge';

const sdk = new MfaWebAuthnPlatformChallenge();

async function tryDifferentMfaMethod() {
  const options: TryAnotherMethodOptions = {
    // customParam: "someValue" // if any custom parameters are needed for this action
  };
  try {
    await sdk.tryAnotherMethod(options);
    // On success, Auth0 will redirect the user to the MFA factor selection screen.
  } catch (error: any) {
    console.error('Failed to switch to another MFA method:', error.message);
    // Update UI to inform the user.
  }
}

// Example usage from a "Try another way" button:
// tryDifferentMfaMethod();
```