import ResetPasswordMfaWebAuthnPlatformChallenge, {
  type ContinueWithPasskeyOptions, // No longer contains 'response' directly
  type ReportBrowserErrorOptions,
  type TryAnotherMethodOptions,
  type WebAuthnErrorDetails,
} from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge';
// getPasskeyCredentials is now an internal detail of the SDK's continueWithPasskey method.

# Reset Password - MFA with Platform Authenticator Challenge Screen

This screen is presented during a password reset flow when the user must verify their identity using a platform authenticator (e.g., Touch ID, Windows Hello, Android screen lock) as a Multi-Factor Authentication (MFA) method. The SDK's `continueWithPasskey` method will trigger the browser to prompt the user to interact with their device's built-in authenticator.

The SDK provides methods to:
- Initiate the platform authenticator verification and submit the resulting credential (`continueWithPasskey`). The SDK handles calling `navigator.credentials.get()` using the challenge options from `sdk.screen.publicKey`.
- Report any browser-side errors encountered during the WebAuthn API interaction (`reportBrowserError`).
- Allow the user to choose a different MFA method (`tryAnotherMethod`).

## React Component Example with TailwindCSS

This example demonstrates how to build a UI for the Reset Password MFA WebAuthn Platform Challenge screen using React and TailwindCSS. It utilizes the `ResetPasswordMfaWebAuthnPlatformChallenge` SDK class.

```tsx
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import ResetPasswordMfaWebAuthnPlatformChallenge, {
  type ContinueWithPasskeyOptions,
  type TryAnotherMethodOptions,
} from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge';

const ResetPasswordMfaWebAuthnPlatformChallengeComponent: React.FC = () => {
  const sdk = useMemo(() => new ResetPasswordMfaWebAuthnPlatformChallenge(), []);
  const { screen, transaction, client } = sdk;
  const texts = screen.texts ?? {};
  const { publicKey: publicKeyChallengeOptions, showRememberDevice } = screen;

  const [rememberDevice, setRememberDevice] = useState(false);

  const handleVerify = useCallback(() => {
    const opts: ContinueWithPasskeyOptions = {};
      if (showRememberDevice) {
        opts.rememberDevice = rememberDevice;
      }
    sdk.continueWithPasskey(opts);
  }, [sdk, rememberDevice, showRememberDevice]);

  const handleTryAnotherMethod = useCallback(() => {
    const opts: TryAnotherMethodOptions = {}; // Add custom options if needed
    sdk.tryAnotherMethod(opts);
  }, [sdk]);

  // Effect to automatically trigger verification if publicKeyChallengeOptions are available.
  // This provides a more seamless UX, prompting the user immediately.
  useEffect(() => {
    if (publicKeyChallengeOptions) { // Check !isLoading to prevent re-triggering if already in process
      console.log("WebAuthn platform challenge options available. Automatically attempting verification.");
      handleVerify();
    }
  }, [handleVerify, publicKeyChallengeOptions]);

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
            {texts.description ?? 'Please use your device\'s screen lock (fingerprint, face, PIN) or a connected security key to continue resetting your password.'}
          </p>
        </div>

        {transaction.errors && transaction.errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            {transaction.errors.map((err, index) => (
              <p key={`tx-err-${index}`}>{err.message}</p>
            ))}
          </div>
        )}

        {showRememberDevice && (
          <div className="flex items-center justify-center mt-4">
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

        <div className="space-y-4 mt-6">
          {/* Button to manually trigger verification if auto-trigger fails or as a retry option */}
          {/* This might only be shown if publicKeyChallengeOptions exist but initial auto-verify failed */}
          {publicKeyChallengeOptions && (
             <button
                onClick={handleVerify}
                disabled={!publicKeyChallengeOptions}
                className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {(texts.retryButtonText ?? 'Retry Verification')}
              </button>
          )}

          <button
            onClick={handleTryAnotherMethod}
            className="w-full flex justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {texts.pickAuthenticatorText ?? 'Try Another Method'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaWebAuthnPlatformChallengeComponent;
```

## Usage Examples

### Initialize the SDK Class

First, import and instantiate the class for the screen:

```typescript
import ResetPasswordMfaWebAuthnPlatformChallenge from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge';

const sdk = new ResetPasswordMfaWebAuthnPlatformChallenge();

// Access screen data:
// The challenge options for navigator.credentials.get() are in sdk.screen.publicKey
const publicKeyOptions = sdk.screen.publicKey;
const showRemember = sdk.screen.showRememberDevice;
const texts = sdk.screen.texts;

if (!publicKeyOptions) {
  console.error("WebAuthn platform authenticator challenge options (publicKey) are not available.");
}
```

### Initiate Verification and Submit Credential

The `sdk.continueWithPasskey()` method now handles the `navigator.credentials.get()` call internally using `sdk.screen.publicKey`.

```typescript
import ResetPasswordMfaWebAuthnPlatformChallenge, {
  type ContinueWithPasskeyOptions, // This interface no longer has 'response'
  type ReportBrowserErrorOptions,
  type WebAuthnErrorDetails
} from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge';

const sdk = new ResetPasswordMfaWebAuthnPlatformChallenge();

async function verifyAndContinue(shouldRememberDevice: boolean) {
  if (!sdk.screen.publicKey) {
    console.error("Cannot verify: WebAuthn challenge (publicKey options) is missing.");
    // Update UI to show an error.
    return;
  }

  try {
    const submissionOptions: ContinueWithPasskeyOptions = {};
    if (sdk.screen.showRememberDevice) {
      submissionOptions.rememberDevice = shouldRememberDevice;
    }

    // The SDK now internally calls navigator.credentials.get() using sdk.screen.publicKey
    // and then submits the result.
    await sdk.continueWithPasskey(submissionOptions);
    // On success, Auth0 handles redirection to the next step.

  } catch (error: any) {
    console.error('Platform authenticator verification process failed:', error);

    if (error instanceof DOMException && error.name && error.message) {
      // If it's a known WebAuthn API error (DOMException), report it to Auth0.
      const errorDetails: WebAuthnErrorDetails = {
        name: error.name,
        message: error.message,
      };
      try {
        await sdk.reportBrowserError({ error: errorDetails });
      } catch (reportSubmitError: any) {
        console.error("Failed to submit the WebAuthn browser error report to Auth0:", reportSubmitError.message);
      }
    }
    // Update UI to inform the user (e.g., "Verification failed. Please try again or use another method.")
    // Check sdk.transaction.errors for any server-side messages if the page reloads.
  }
}

// Example usage, perhaps from a button click or useEffect hook:
// const userWantsToRemember = document.getElementById('remember-device-checkbox')?.checked || false;
// verifyAndContinue(userWantsToRemember);
```

### Report a WebAuthn Browser Error

This remains the same. If `sdk.continueWithPasskey()` (which now wraps `navigator.credentials.get()`) throws a `DOMException`, you should catch it and report it.

```typescript
// (sdk instance as above)

async function handleWebAuthnApiError(webAuthnDomException: DOMException) {
  const errorDetails: WebAuthnErrorDetails = {
    name: webAuthnDomException.name,
    message: webAuthnDomException.message,
  };
  const options: ReportBrowserErrorOptions = { error: errorDetails };

  try {
    await sdk.reportBrowserError(options);
  } catch (submitError: any) {
    console.error('Failed to submit the WebAuthn error report to Auth0:', submitError.message);
  }
}

// Example: Catching an error from the SDK's continueWithPasskey if it re-throws a DOMException
// (This logic would be part of your verifyAndContinue function's catch block)
// catch (error) {
//   if (error instanceof DOMException) {
//     handleWebAuthnApiError(error);
//   } else {
//     // Handle other non-DOMException errors
//   }
// }
```

### Try Another MFA Method

This method's usage remains the same.

```typescript
import ResetPasswordMfaWebAuthnPlatformChallenge, { type TryAnotherMethodOptions } from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-platform-challenge';

const sdk = new ResetPasswordMfaWebAuthnPlatformChallenge();

async function tryDifferentMfaMethodForPasswordReset() {
  const options: TryAnotherMethodOptions = {};
  try {
    await sdk.tryAnotherMethod(options);
  } catch (error: any) {
    console.error('Failed to switch to another MFA method during password reset:', error.message);
  }
}
```