import MfaWebAuthnEnrollmentSuccess, {
  type ContinueOptions
} from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';

# MFA WebAuthn Enrollment Success Screen

This screen is displayed after a user successfully enrolls a WebAuthn authenticator (like a security key or device biometrics such as Touch ID/Windows Hello). It confirms the successful enrollment and allows the user to proceed with the authentication flow.

The SDK provides:
- Access to the `nickname` of the newly enrolled authenticator.
- Access to the `webauthnType` ('webauthn-roaming' or 'webauthn-platform') of the authenticator.
- A `continue()` method to proceed to the next step.

## React Component Example with TailwindCSS

This example demonstrates a simple UI for the "MFA WebAuthn Enrollment Success" screen, showing the enrollment details and a button to continue.

```tsx
import React, { useState, useMemo, useCallback } from 'react';
import MfaWebAuthnEnrollmentSuccess, {
  type ContinueOptions
} from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success'; // Adjust path as necessary

const MfaWebAuthnEnrollmentSuccessScreen: React.FC = () => {
  // Instantiate the SDK class for the screen. Memoized to avoid re-creation on re-renders.
  const sdk = useMemo(() => new MfaWebAuthnEnrollmentSuccess(), []);

  const { screen, transaction, client } = sdk;
  const texts = screen.texts ?? {};
  const screenData = screen.data; // Contains nickname and webauthnType

  const [isLoading, setIsLoading] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const authenticatorTypeFriendlyName = useMemo(() => {
    if (screenData?.webauthnType === 'webauthn-platform') {
      return texts.platformAuthenticatorName ?? 'Device Authenticator';
    }
    if (screenData?.webauthnType === 'webauthn-roaming') {
      return texts.roamingAuthenticatorName ?? 'Security Key';
    }
    return 'Authenticator';
  }, [screenData?.webauthnType, texts]);

  const handleContinue = useCallback(async () => {
    setIsLoading(true);
    setUiError(null);
    try {
      const opts: ContinueOptions = {}; // Add any custom options if needed
      await sdk.continue(opts);
      // On successful submission, Auth0 typically handles redirection.
      // setIsLoading(false) might not be reached if redirection occurs immediately.
    } catch (err: any) {
      setIsLoading(false);
      setUiError(`Failed to continue: ${err.message || 'Please try again.'}`);
    }
  }, [sdk]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6 text-center">
        {client.logoUrl && (
          <img src={client.logoUrl} alt={client.name ?? 'Client Logo'} className="mx-auto h-12 mb-6" />
        )}
        
        <svg className="mx-auto h-16 w-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        <h1 className="text-2xl font-bold text-gray-800">
          {texts.title ?? 'Authenticator Added!'}
        </h1>
        
        {screenData ? (
          <p className="text-gray-600">
            {texts.description?.replace('{authenticatorNickname}', screenData.nickname).replace('{authenticatorType}', authenticatorTypeFriendlyName) 
             ?? `Your ${authenticatorTypeFriendlyName} "${screenData.nickname}" has been successfully added to your account.`}
          </p>
        ) : (
          <p className="text-gray-600">
            {texts.descriptionGeneric ?? 'Your authenticator has been successfully added.'}
          </p>
        )}

        {/* Display transaction errors (e.g., from a previous step if redirected back) */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md text-left" role="alert">
            <p className="font-bold">{texts.alertListTitle ?? 'Errors:'}</p>
            {transaction.errors.map((err, index) => (
              <p key={`tx-err-${index}`}>{err.message}</p>
            ))}
          </div>
        )}

        {/* Display UI-specific errors */}
        {uiError && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative text-left" role="alert">
            <span className="block sm:inline">{uiError}</span>
          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={isLoading}
          className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (texts.buttonText ?? 'Continue')}
        </button>
      </div>
    </div>
  );
};

export default MfaWebAuthnEnrollmentSuccessScreen;
```

## Usage Examples

### Initialize the SDK Class

First, import and instantiate the class for the screen:

```typescript
import MfaWebAuthnEnrollmentSuccess from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';

const sdk = new MfaWebAuthnEnrollmentSuccess();

// Access screen data
const nickname = sdk.screen.data?.nickname;
const authenticatorType = sdk.screen.data?.webauthnType;
const pageTitle = sdk.screen.texts?.title;

console.log(`Successfully enrolled "${nickname}" (${authenticatorType})`);
```

### Continue the Flow

This is the primary action on this screen. It allows the user to proceed after acknowledging the successful enrollment.

```typescript
import MfaWebAuthnEnrollmentSuccess, { type ContinueOptions } from '@auth0/auth0-acul-js/mfa-webauthn-enrollment-success';

const sdk = new MfaWebAuthnEnrollmentSuccess();

async function proceedAfterEnrollment() {
  const options: ContinueOptions = {
    // customParam: "anyValue" // if needed for your specific flow
  };

  try {
    await sdk.continue(options);
    // On successful submission, Auth0 will redirect the user to the next step in the flow.
  } catch (error: any) {
    console.error('Failed to continue after WebAuthn enrollment:', error.message);
    // Display an error message to the user in the UI.
    // Check `sdk.transaction.errors` if the page might have reloaded with a server error.
  }
}

// Call this function when the user clicks the "Continue" button.
// proceedAfterEnrollment();
```