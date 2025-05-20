import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';

# MFA WebAuthn Roaming Enrollment Screen

This screen is displayed when a user needs to enroll a WebAuthn roaming authenticator, such as a security key, during the Multi-Factor Authentication (MFA) flow.

It provides the necessary data (like the `PasskeyCreate` options) to initiate the browser's WebAuthn API for credential creation and methods to submit the result or handle alternative actions.

## React Component Example with TailwindCSS

```tsx
import React, { useState, useCallback } from 'react';
import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';

const MfaWebAuthnRoamingEnrollmentScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const webauthnEnrollmentManager = new MfaWebAuthnRoamingEnrollment();
  const { screen, transaction } = webauthnEnrollmentManager;

  const publicKey = screen.publicKey;

  const handleEnroll = useCallback(async () => {
    if (!publicKey) {
      setError('publicKey data is missing.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {

      // Submit the credential response to the server
      await webauthnEnrollmentManager.enroll({});

      setSuccess('Passkey enrolled successfully!');
      // The page will typically redirect automatically on success

    } catch (err: any) {
      console.error('WebAuthn enrollment failed:', err);
      setError(`Enrollment failed: ${err.message || 'Unknown error'}`);

      // Optionally, submit the error details to the server
      // await webauthnEnrollmentManager.showError({ error: { name: err.name, message: err.message } });
    } finally {
      setIsLoading(false);
    }
  }, [webauthnEnrollmentManager]);

  const handleShowError = useCallback(async (errorDetails: { name: string; message: string }) => {
     setIsLoading(true);
     setError(null);
     setSuccess(null);

     try {
        await webauthnEnrollmentManager.showError({ error: errorDetails });
        // The page will typically redirect or update with the error
     } catch (err: any) {
        console.error('Failed to submit error details:', err);
        setError(`Failed to submit error: ${err.message || 'Unknown error'}`);
     } finally {
        setIsLoading(false);
     }

  }, [webauthnEnrollmentManager]);

  const handleTryAnotherMethod = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await webauthnEnrollmentManager.tryAnotherMethod();
      // The page will typically redirect to the authenticator selection screen
    } catch (err: any) {
      console.error('Failed to try another method:', err);
      setError(`Failed to switch method: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [webauthnEnrollmentManager]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {screen.texts?.title ?? 'Enroll Security Key'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {screen.texts?.description ?? 'Enroll your security key to enhance your account security.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLoading && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="mb-4 text-sm text-red-600" role="alert">
              {error}
            </div>
          )}

           {success && (
            <div className="mb-4 text-sm text-green-600" role="alert">
              {success}
            </div>
          )}

          {transaction?.errors?.length && ( // Display transaction errors if any
              <div className="mt-2 mb-4">
                {transaction?.errors.map((err, index) => (
                  <p key={index} className="text-red-500">
                    {err.message}
                  </p>
                ))}
              </div>
            )}

          <div className="space-y-4">
            <button
              onClick={handleEnroll}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {screen.texts?.buttonText ?? 'Enroll Security Key'}
            </button>

            <button
              onClick={handleTryAnotherMethod}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {screen.texts?.tryAnotherMethodText ?? 'Try Another Method'}
            </button>

             {/* Example of how you might trigger showError from a specific UI element or catch block */}
             <button
              onClick={() => handleShowError({ name: 'UserCancelled', message: 'User cancelled the WebAuthn prompt.' })}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Report WebAuthn Error (Example)
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MfaWebAuthnRoamingEnrollmentScreen;
```

## Usage Examples

### Enroll Security Key

```typescript
import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';

const webauthnEnrollment = new MfaWebAuthnRoamingEnrollment();

const enrollPasskey = async () => {
  // The public key is now directly accessible via screen.publicKey
  const publicKey = webauthnEnrollment.screen.publicKey;

  if (!publicKey) {
    console.error('Public key data is not available.');
    return;
  }

  try {
    // The SDK now handles calling createPasskeyCredentials internally
    // Simply call enroll with any custom options you want to include
    await webauthnEnrollment.enroll({ 
      // You can add custom options here if needed
      customOption: 'value' 
    });
    console.log('Passkey enrolled successfully!');

  } catch (error: any) {
    console.error('WebAuthn enrollment failed:', error);
    // Handle the error, e.g., show an error message to the user
    // Optionally, submit the error details to the server
    // await webauthnEnrollment.showError({ error: { name: error.name, message: error.message } });
  }
};

enrollPasskey();
```

### Report WebAuthn Error

```typescript
import MfaWebAuthnRoamingEnrollment, { WebAuthnErrorDetails } from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';

const webauthnEnrollment = new MfaWebAuthnRoamingEnrollment();

const reportError = async (errorDetails: WebAuthnErrorDetails) => {
  try {
    await webauthnEnrollment.showError({ error: errorDetails });
    console.log('WebAuthn error reported.');
  } catch (error) {
    console.error('Failed to report WebAuthn error:', error);
  }
};

// Example usage (e.g., in a catch block of a WebAuthn API call)
// reportError({ name: 'NotAllowedError', message: 'User cancelled.' });
```

### Try Another Method

```typescript
import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';

const webauthnEnrollment = new MfaWebAuthnRoamingEnrollment();

// Navigate to the authenticator selection screen
await webauthnEnrollment.tryAnotherMethod();
```
