# MFA Detect Browser Capabilities Screen

This screen is used to detect browser capabilities for MFA authentication methods.

## React Component Example with TailwindCSS

```tsx
import React, { useEffect, useState } from 'react';
import MfaDetectBrowserCapabilities from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';
import { isBrave, isWebAuthAvailable, isJsAvailable, isWebAuthPlatformAvailable } from '@auth0/auth0-acul-js/utils/browser-capabilities';

const MfaDetectBrowserCapabilitiesScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mfaDetectBrowserCapabilities = new MfaDetectBrowserCapabilities();

  useEffect(() => {
    const detectCapabilities = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const braveDetected = await isBrave();
        const webAuthSupported = isWebAuthAvailable();
        const jsEnabled = isJsAvailable();
        const webAuthPlatformSupported = await isWebAuthPlatformAvailable();

        await mfaDetectBrowserCapabilities.pickAuthenticator({
          'js-available': jsEnabled,
          'is-brave': braveDetected,
          'webauthn-available': webAuthSupported,
          'webauthn-platform-available': webAuthPlatformSupported
        });
      } catch (err) {
        setError('Failed to detect browser capabilities. Please try again.');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    detectCapabilities();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
            <p className="mt-4 text-center text-sm text-gray-600">
              Detecting browser capabilities...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // The screen will automatically redirect after successful capability detection
};

export default MfaDetectBrowserCapabilitiesScreen;
```

## Individual Method Examples

### Pick Authenticator

```typescript
import MfaDetectBrowserCapabilities from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';
import { isBrave, isWebAuthAvailable, isJsAvailable, isWebAuthPlatformAvailable } from '@auth0/auth0-acul-js/utils/browser-capabilities';

const detectBrowserCapabilities = async () => {
  const mfaDetectBrowserCapabilities = new MfaDetectBrowserCapabilities();
  
  // Detect browser capabilities
  const braveDetected = await isBrave();
  const webAuthSupported = isWebAuthAvailable();
  const jsEnabled = isJsAvailable();
  const webAuthPlatformSupported = await isWebAuthPlatformAvailable();

  // Submit capabilities
  await mfaDetectBrowserCapabilities.pickAuthenticator({
    'js-available': jsEnabled,
    'is-brave': braveDetected,
    'webauthn-available': webAuthSupported,
    'webauthn-platform-available': webAuthPlatformSupported
  });
};
```