import React from 'react';
import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';

const MfaPushWelcomeScreen: React.FC = () => {
  const mfaPushWelcome = new MfaPushWelcome();
  const { screen } = mfaPushWelcome;

  const handleEnroll = async () => {
    try {
      await mfaPushWelcome.enroll();
    } catch (error) {
      console.error('Failed to enroll:', error);
    }
  };

  const handlePickAuthenticator = async () => {
    try {
      await mfaPushWelcome.pickAuthenticator();
    } catch (error) {
      console.error('Failed to pick authenticator:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to MFA Push!</h2>
        <p className="mb-4">Ready to enroll with push notifications?</p>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleEnroll}
          >
            Enroll
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handlePickAuthenticator}
          >
            Try Another Method
          </button>
        </div>
        {screen.data?.screen?.links?.ios && (
          <p>Download iOS App: <a href={screen.data?.screen?.links?.ios}>{screen.data?.screen?.links?.ios}</a></p>
        )}
        {screen.data?.screen?.links?.android && (
          <p>Download Android App: <a href={screen.data?.screen?.links?.android}>{screen.data?.screen?.links?.android}</a></p>
        )}
      </div>
    </div>
  );
};

export default MfaPushWelcomeScreen;


## Usage Examples

### Enroll

```typescript
import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';

const mfaPushWelcome = new MfaPushWelcome();

await mfaPushWelcome.enroll();
```

### Pick Authenticator

```typescript
import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';

const mfaPushWelcome = new MfaPushWelcome();

await mfaPushWelcome.pickAuthenticator();
```