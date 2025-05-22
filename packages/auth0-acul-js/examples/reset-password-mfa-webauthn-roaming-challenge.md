import ResetPasswordMfaWebAuthnRoamingChallenge from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';
import type { UseSecurityKeyOptions, ShowErrorOptions, TryAnotherMethodOptions, WebAuthnErrorDetails } from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';

# Reset Password MFA WebAuthn Roaming Challenge Screen

This screen is part of the multi-factor authentication (MFA) process during password reset, specifically when a WebAuthn roaming authenticator (like a FIDO2 security key) is required. The user will be prompted by their browser to interact with their security key.

The SDK provides methods to:
- Initiate the security key verification (`useSecurityKey`).
- Report client-side WebAuthn API errors (`showError`).
- Allow the user to choose a different MFA method (`tryAnotherMethod`).

## React Component Example with TailwindCSS

This example demonstrates a React component for the "Reset Password MFA WebAuthn Roaming Challenge" screen, styled with TailwindCSS. It allows users to trigger the security key interaction and provides options for alternative actions.

```tsx
import React, { useState, useMemo, useCallback } from 'react';
import ResetPasswordMfaWebAuthnRoamingChallenge, {
  type UseSecurityKeyOptions,
  type TryAnotherMethodOptions,
  type WebAuthnErrorDetails,
  type ResetPasswordMfaWebAuthnRoamingChallengeMembers
} from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';

const ResetPasswordMfaWebAuthnRoamingChallengeComponent: React.FC = () => {
  // Instantiate the SDK class. Memoized to avoid re-creation on re-renders.
  const sdk = useMemo(() => new ResetPasswordMfaWebAuthnRoamingChallenge(), []);

  const { screen, transaction, client, organization }: ResetPasswordMfaWebAuthnRoamingChallengeMembers = sdk;
  const texts = screen?.texts ?? {};
  const publicKeyChallenge = screen?.publicKey?.challenge; // Challenge string for WebAuthn API

  const [rememberDevice, setRememberDevice] = useState(false);

  const handleUseSecurityKey = useCallback(async () => {
    const opts: UseSecurityKeyOptions = {};
    if (sdk.screen.showRememberDevice) {
      opts.rememberDevice = rememberDevice;
    }
    sdk.useSecurityKey(opts);
  }, [sdk, rememberDevice]);

  const handleTryAnotherMethod = useCallback(async () => {
    const opts: TryAnotherMethodOptions = {};
    if (sdk.screen.showRememberDevice) {
      opts.rememberDevice = rememberDevice;
    }
    sdk.tryAnotherMethod(opts);
  }, [sdk, rememberDevice]);

  // Example: Simulate a client-side error to demonstrate showError
  const handleSimulateWebAuthnError = async () => {
    const simulatedError: WebAuthnErrorDetails = {
      name: "NotSupportedError",
      message: "The browser does not support the requested WebAuthn operation on this device (simulated)."
    };
    sdk.showError({ error: simulatedError, rememberDevice: sdk.screen.showRememberDevice && rememberDevice });
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        {client?.logoUrl && (
          <img src={client.logoUrl} alt={client.name ?? 'Client Logo'} className="mx-auto h-12 mb-6" />
        )}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {texts.title ?? 'Verify with Security Key'}
          </h1>
          <p className="mt-2 text-gray-600">
            {texts.description ?? 'Please insert your security key and follow the browser prompts to continue resetting your password.'}
          </p>
          {organization?.name && (
            <p className="mt-1 text-sm text-gray-500">
              Organization: {organization.displayName || organization.name}
            </p>
          )}
           {publicKeyChallenge && (
            <p className="mt-1 text-xs text-gray-400 break-all">
              Challenge: {typeof publicKeyChallenge === 'string' ? publicKeyChallenge : JSON.stringify(publicKeyChallenge)}
            </p>
          )}
        </div>

        {/* Display transaction errors (e.g., from previous failed attempts, invalid state) */}
        {transaction?.errors && transaction.errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            {transaction.errors.map((err, index) => (
              <p key={`tx-err-${index}`}>{err.message}</p>
            ))}
          </div>
        )}

        {/* Remember device checkbox */}
        {sdk.screen.showRememberDevice && (
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
            onClick={handleUseSecurityKey}
            disabled={!publicKeyChallenge}
            className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {(texts.buttonText ?? 'Use Security Key')}
          </button>

          <button
            onClick={handleTryAnotherMethod}
            className="w-full flex justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {texts.pickAuthenticatorText ?? 'Try Another Method'}
          </button>

          <button
            onClick={handleSimulateWebAuthnError}
            className="w-full flex justify-center px-4 py-2.5 border border-amber-500 rounded-md shadow-sm text-sm font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {texts.simulateErrorButtonText ?? 'Simulate WebAuthn Error & Report'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaWebAuthnRoamingChallengeComponent;
```

## Usage Examples

### Initialize the SDK Class

First, import and instantiate the class for the screen:

```typescript
import ResetPasswordMfaWebAuthnRoamingChallenge from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';

const sdk = new ResetPasswordMfaWebAuthnRoamingChallenge();

// Access screen data
const publicKeyChallengeOptions = sdk.screen.publicKey; // Contains the challenge for navigator.credentials.get()
const shouldShowRememberDeviceOption = sdk.screen.showRememberDevice;
const uiTexts = sdk.screen.texts; // For UI labels, titles, button texts

if (!publicKeyChallengeOptions) {
  console.error("WebAuthn challenge options (publicKey) are not available from the server.");
  // Handle this case, e.g., by showing an error message to the user.
}
```

### Use Security Key (Verify Identity)

This is the primary action. It triggers the browser's WebAuthn API (`navigator.credentials.get()`) using the challenge options provided by Auth0 (`sdk.screen.publicKey`). The SDK handles the API call and submits the resulting credential.

```typescript
import ResetPasswordMfaWebAuthnRoamingChallenge, {
  type UseSecurityKeyOptions,
  type WebAuthnErrorDetails
} from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';

const sdk = new ResetPasswordMfaWebAuthnRoamingChallenge();

async function verifyWithSecurityKey(userWantsToRememberDevice: boolean) {
  if (!sdk.screen.publicKey) {
    alert("Security key challenge options are not available.");
    return;
  }

  const options: UseSecurityKeyOptions = {};
  if (sdk.screen.showRememberDevice) {
    options.rememberDevice = userWantsToRememberDevice;
  }

  try {
    await sdk.useSecurityKey(options);
    // On success, Auth0 handles redirection to the next step (e.g., password reset form).
  } catch (error: any) {
    console.error('Security key verification process failed:', error.message);

    // If it's a WebAuthn API error (e.g., user cancellation, timeout), report it to Auth0 server
    if (error.name && error.message) { // Basic check for DOMException-like error
      try {
        const errorToReport: WebAuthnErrorDetails = { name: error.name, message: error.message };
        // Add other properties if relevant, e.g., error.code
        if (error.code) errorToReport.code = error.code;
        await sdk.showError({ error: errorToReport, rememberDevice: sdk.screen.showRememberDevice && userWantsToRememberDevice });
        // Auth0 may redirect or update UI based on the error report.
        // The page might re-render with specific error messages from `sdk.transaction.errors`.
      } catch (reportError: any) {
        console.error("Failed to report the WebAuthn browser error to Auth0:", reportError.message);
        // Display a fallback error message if reporting also fails.
        alert(`Verification failed: ${error.message}. Reporting this error also failed.`);
      }
    } else {
      // Handle other types of errors (e.g., network issues before WebAuthn call, SDK internal errors)
      alert(`Verification process failed: ${error.message || 'Please try again.'}`);
    }
    // You might also want to check `sdk.transaction.errors` if the page reloads
    // as Auth0 might return specific errors on the transaction object.
  }
}

// Example usage, perhaps from a button click in your UI:
// const rememberMeCheckbox = document.getElementById('remember-me') as HTMLInputElement;
// verifyWithSecurityKey(rememberMeCheckbox?.checked || false);
```

### Report a Client-Side WebAuthn Error

If you need to manually report a WebAuthn API error that occurred (perhaps from a custom `navigator.credentials.get()` call, though `sdk.useSecurityKey()` handles this), you can use `sdk.showError()`.

```typescript
import ResetPasswordMfaWebAuthnRoamingChallenge, {
  type ShowErrorOptions,
  type WebAuthnErrorDetails
} from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';

const sdk = new ResetPasswordMfaWebAuthnRoamingChallenge();

async function handleWebAuthnApiError(errorFromWebAuthnApi: DOMException, userWantsToRememberDevice: boolean) {
  const errorDetails: WebAuthnErrorDetails = {
    name: errorFromWebAuthnApi.name,
    message: errorFromWebAuthnApi.message,
  };
  if ('code' in errorFromWebAuthnApi && errorFromWebAuthnApi.code !== undefined) {
    errorDetails.code = errorFromWebAuthnApi.code;
  }
  // You can add other relevant properties from DOMException if your WebAuthnErrorDetails interface supports them.

  const options: ShowErrorOptions = {
    error: errorDetails
  };
  if (sdk.screen.showRememberDevice) {
    options.rememberDevice = userWantsToRememberDevice;
  }

  try {
    await sdk.showError(options);
    // Auth0 will process this error. The page might re-render with specific error messages
    // from `sdk.transaction.errors`, or redirect to an error screen.
  } catch (submitError: any) {
    console.error('Failed to submit the WebAuthn error report to Auth0:', submitError.message);
    // Handle failure to report the error - display a generic error message to the user.
  }
}

// Example: Catching an error from a manual navigator.credentials.get() call
// async function manualSecurityKeyAttempt(userWantsToRemember: boolean) {
//   try {
//     const cred = await navigator.credentials.get({ publicKey: sdk.screen.publicKey });
//     // ... process cred and submit manually ...
//   } catch (e) {
//     if (e instanceof DOMException) {
//       handleWebAuthnApiError(e, userWantsToRemember);
//     }
//   }
// }
```

### Try Another MFA Method

If the user cannot use their security key or wishes to use a different MFA factor:

```typescript
import ResetPasswordMfaWebAuthnRoamingChallenge, { type TryAnotherMethodOptions } from '@auth0/auth0-acul-js/reset-password-mfa-webauthn-roaming-challenge';

const sdk = new ResetPasswordMfaWebAuthnRoamingChallenge();

async function tryDifferentMfaMethod(userWantsToRememberDevice: boolean) {
  const options: TryAnotherMethodOptions = {};
  if (sdk.screen.showRememberDevice) {
    options.rememberDevice = userWantsToRememberDevice;
  }

  try {
    await sdk.tryAnotherMethod(options);
    // On success, Auth0 will redirect the user to the MFA factor selection screen.
  } catch (error: any) {
    console.error('Failed to switch to another MFA method:', error.message);
    // Update UI to inform the user.
  }
}

// Example usage from a "Try another way" button in your UI:
// const rememberMeCheckbox = document.getElementById('remember-me') as HTMLInputElement;
// tryDifferentMfaMethod(rememberMeCheckbox?.checked || false);
```