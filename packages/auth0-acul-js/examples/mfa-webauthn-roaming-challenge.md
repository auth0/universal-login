import MfaWebAuthnRoamingChallenge from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';
import type { VerifySecurityKeyOptions, ReportWebAuthnErrorOptions, TryAnotherMethodOptions } from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';

# MFA WebAuthn Roaming Challenge Screen

This screen is presented when a user needs to authenticate using a roaming WebAuthn authenticator, such as a FIDO2 security key, as part of a Multi-Factor Authentication (MFA) flow. The user will be prompted by their browser to interact with their security key.

The SDK provides methods to initiate this verification, report any browser-side errors encountered during the WebAuthn API interaction, or allow the user to choose a different MFA method.

## React Component Example with TailwindCSS

This example demonstrates how to build a UI for the MFA WebAuthn Roaming Challenge screen using React and TailwindCSS. It utilizes the `MfaWebAuthnRoamingChallenge` SDK class to handle the screen's logic.

```tsx
import React, { useState, useMemo, useCallback } from 'react';
import MfaWebAuthnRoamingChallenge, {
  type VerifySecurityKeyOptions,
  type WebAuthnErrorDetails
} from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge'; // Adjust path as necessary

const MfaWebAuthnRoamingChallengeScreen: React.FC = () => {
  // Instantiate the SDK class. It's memoized to avoid re-creation on re-renders.
  const sdk = useMemo(() => new MfaWebAuthnRoamingChallenge(), []);

  const { screen, transaction } = sdk;
  const texts = screen.texts ?? {};


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberDevice, setRememberDevice] = useState(false);

  // Callback to handle the primary verification action
  const handleVerifyWithSecurityKey = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const opts: VerifySecurityKeyOptions = {};
      if (screen?.showRememberDevice) {
        opts.rememberDevice = rememberDevice;
      }
      await sdk.verify(opts);
      // On successful verification, Auth0 typically handles redirection.
      // setIsLoading(false) might not be reached if redirection occurs.
    } catch (err: any) {
      // This catch block handles errors not automatically reported by sdk.verify()
      // (e.g., if publicKeyChallengeOptions were missing, or unexpected FormHandler issues).
      // Errors from navigator.credentials.get() like NotAllowedError are often handled internally
      // by sdk.verify() which calls sdk.reportWebAuthnError().
      // If sdk.verify() re-throws an error after reporting, or if it's an unhandled error:
      setError(`Verification failed: ${err.message || 'Please try again.'}`);
      setIsLoading(false);
    }
  }, [sdk, rememberDevice, screen?.showRememberDevice]);

  // Callback for trying another MFA method
  const handleTryAnotherMethod = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await sdk.tryAnotherMethod();
      // Auth0 handles redirection.
    } catch (err: any) {
      setError(`Could not switch methods: ${err.message}`);
      setIsLoading(false);
    }
  }, [sdk]);

  // For explicitly reporting an error (less common if verify handles it)
//   const handleReportError = async (webAuthnError: WebAuthnErrorDetails) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       await sdk.reportWebAuthnError({ error: webAuthnError });
//     } catch (err: any) {
//       setError(`Failed to report error: ${err.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <div className="text-center">
          {/* You can add an icon here, e.g., a security key icon */}
          <h1 className="text-2xl font-bold text-gray-800">
            {texts.title ?? 'Verify with Security Key'}
          </h1>
          <p className="mt-2 text-gray-600">
            {texts.description ?? 'Please insert your security key and follow the browser prompts to continue.'}
          </p>
          {screen?.webauthnType && (
            <p className="mt-1 text-sm text-gray-500">
              (Authenticator type: {screen.webauthnType})
            </p>
          )}
        </div>

        {/* Display transaction errors (e.g., from previous failed attempts, invalid state) */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            {transaction.errors.map((err, index) => (
              <p key={index}>{err.message}</p>
            ))}
          </div>
        )}

        {/* Display UI-specific errors (e.g., from failed SDK calls) */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Remember device checkbox */}
        {screen?.showRememberDevice && (
          <div className="flex items-center">
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
            onClick={handleVerifyWithSecurityKey}
            disabled={isLoading || !screen?.publicKey}
            className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (texts.buttonText ?? 'Verify with Security Key')}
          </button>

          <button
            onClick={handleTryAnotherMethod}
            disabled={isLoading}
            className="w-full flex justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {texts.pickAuthenticatorText ?? 'Try Another Method'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaWebAuthnRoamingChallengeScreen;
```

## Usage Examples

### Initialize the SDK

First, import and instantiate the class for the screen:

```typescript
import MfaWebAuthnRoamingChallenge from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';

const mfaRoamingSdk = new MfaWebAuthnRoamingChallenge();

// Access screen data
const publicKeyOptions = mfaRoamingSdk.screen.data?.publicKeyChallengeOptions;
const showRemember = mfaRoamingSdk.screen.data?.showRememberDevice;
const texts = mfaRoamingSdk.screen.texts;

if (!publicKeyOptions) {
  console.error("WebAuthn challenge options are not available.");
  // Handle this case, e.g., by showing an error or guiding the user.
}
```

### Verify with Security Key

This is the primary action. It will trigger the browser's WebAuthn API (`navigator.credentials.get()`) using the challenge options provided by Auth0.

```typescript
import MfaWebAuthnRoamingChallenge, { type VerifySecurityKeyOptions } from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';

const mfaRoamingSdk = new MfaWebAuthnRoamingChallenge();

async function verifyKey(shouldRememberDevice: boolean) {
  const options: VerifySecurityKeyOptions = {};
  if (mfaRoamingSdk.screen.data?.showRememberDevice) {
    options.rememberDevice = shouldRememberDevice;
  }

  try {
    await mfaRoamingSdk.verify(options);
    // On success, Auth0 handles redirection to the next step in the flow.
  } catch (error: any) {
    // The `sdk.verify()` method attempts to handle common WebAuthn API errors internally
    // by calling `reportWebAuthnError`. If an error is caught here, it might be
    // an unexpected issue or an error re-thrown after reporting.
    console.error('Security key verification process failed:', error.message);
    // You might want to check `mfaRoamingSdk.transaction.errors` if the page reloads
    // with an error message from the server.
    // Update UI to inform the user (e.g., "Verification failed. Please try again or use another method.")
  }
}

// Example usage, perhaps from a button click:
// verifyKey(true); // true if user checked "remember device"
```

### Report a WebAuthn Browser Error

If you manually handle the `navigator.credentials.get()` call or encounter a WebAuthn API error that `sdk.verify()` doesn't automatically report, you can use `reportWebAuthnError`.

```typescript
import MfaWebAuthnRoamingChallenge, { type ReportWebAuthnErrorOptions, type WebAuthnErrorDetails } from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';

const mfaRoamingSdk = new MfaWebAuthnRoamingChallenge();

async function reportError(errorFromWebAuthnApi: DOMException) {
  // Create error details object, including all available properties
  const errorDetails: WebAuthnErrorDetails = {
    name: errorFromWebAuthnApi.name,
    message: errorFromWebAuthnApi.message,
  };
  
  // Include optional properties if they exist on the error
  if ('code' in errorFromWebAuthnApi && errorFromWebAuthnApi.code !== undefined) {
    errorDetails.code = errorFromWebAuthnApi.code;
  }
  
  if ('type' in errorFromWebAuthnApi) {
    errorDetails.type = (errorFromWebAuthnApi as any).type;
  }

  const options: ReportWebAuthnErrorOptions = { error: errorDetails };

  try {
    await mfaRoamingSdk.reportWebAuthnError(options);
    // Auth0 will process this error and may redirect or update the UI accordingly
    // The server receives this with an action like: "showError::{JSON.stringify(errorDetails)}"
  } catch (submitError: any) {
    console.error('Failed to submit the WebAuthn error report:', submitError.message);
    // Handle failure to report the error - possibly show a fallback UI
  }
}

// Example: Handling errors when manually calling WebAuthn API
// This is less common as the sdk.verify() method usually handles this internally
async function manualWebAuthnExample() {
  try {
    // No need to explicitly pass publicKeyOpts - the SDK will use the ones from screen.data
    const credential = await navigator.credentials.get({
      // The SDK already handles publicKey options internally in the verify() method
      // which uses the challenge data from screen.data.publicKeyChallengeOptions
      publicKey: mfaRoamingSdk.screen.data?.publicKeyChallengeOptions
    });
    
    // If you get the credential manually, you'd need to submit it yourself
    // Usually you'd use sdk.verify() instead which handles all of this for you
    console.log('Credential obtained:', credential);
  } catch (webAuthnError: any) {
    if (webAuthnError instanceof DOMException) {
      // Common errors include:
      // - NotAllowedError: User declined the request or the operation timed out
      // - SecurityError: The origin is not secure or other security issues
      // - NotSupportedError: The method or operation is not supported
      reportError(webAuthnError);
    }
  }
}
```

### Try Another MFA Method

If the user cannot use their security key or wishes to use a different MFA factor:

```typescript
import MfaWebAuthnRoamingChallenge, { type TryAnotherMethodOptions } from '@auth0/auth0-acul-js/mfa-webauthn-roaming-challenge';

const mfaRoamingSdk = new MfaWebAuthnRoamingChallenge();

async function tryDifferentMethod() {
  const options: TryAnotherMethodOptions = {
    // customParam: "someValue" // if needed
  };
  try {
    await mfaRoamingSdk.tryAnotherMethod(options);
    // On success, Auth0 will redirect the user to the MFA factor selection screen.
  } catch (error: any) {
    console.error('Failed to switch to another MFA method:', error.message);
    // Update UI to inform the user.
  }
}

// Example usage from a "Try another way" button:
// tryDifferentMethod();
```