## Usage Examples

### Enroll

```typescript
import React, { useCallback } from 'react';
import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';

const MfaPushWelcomeScreen: React.FC = () => {
  const mfaPushWelcome = new MfaPushWelcome();
  const { screen } = mfaPushWelcome;

  /** Button Styles */
  const buttonBase =
    "py-2 px-4 font-bold rounded focus:outline-none focus:shadow-outline transition";
  const primaryButton = `${buttonBase} bg-blue-500 hover:bg-blue-700 text-white`;
  const secondaryButton = `${buttonBase} bg-gray-500 hover:bg-gray-700 text-white`;
  const linkStyle = "text-blue-600 hover:text-blue-800 hover:underline transition";

  /** Handle Enroll */
  const handleEnroll = useCallback(async () => {
    try {
      await mfaPushWelcome.enroll();
    } catch (error) {
      console.error('Failed to enroll:', error);
    }
  }, []);

  /** Handle Pick Authenticator */
  const handlePickAuthenticator = useCallback(async () => {
    try {
      await mfaPushWelcome.pickAuthenticator();
    } catch (error) {
      console.error('Failed to pick authenticator:', error);
    }
  }, []);

  return (
    <div className="flex flex-col items-center flex-start min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {screen.texts?.title ?? 'Secure Your Account'}
        </h2>
        <p className="text-gray-700 mb-4">
          {screen.texts?.description ??
            'To continue, install the Auth0 Guardian app from your mobile device’s app store.'}
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button type="button" className={primaryButton} onClick={handleEnroll}>
            {screen.texts?.buttonText ?? 'Continue'}
          </button>
          <button type="button" className={secondaryButton} onClick={handlePickAuthenticator}>
            {screen.texts?.pickAuthenticatorText ?? 'Try Another Method'}
          </button>
        </div>

        {/* App Download Links */}
        <div className="mt-5 text-left">
          {screen.links?.ios && (
            <p>
              <a href={screen.links.ios} className={linkStyle}>
                Download iOS App
              </a>
            </p>
          )}
          {screen.links?.android && (
            <p>
              <a href={screen.links.android} className={linkStyle}>
                Download Android App
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MfaPushWelcomeScreen;

```
