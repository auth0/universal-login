import MfaPushEnrollmentQr from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';

# Mfa Push Enrollment QR Screen

This screen is displayed when the user needs to enroll with a push notification using a QR code.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import MfaPushEnrollmentQr from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';

const MfaPushEnrollmentQrScreen: React.FC = () => {
  const mfaPushEnrollmentQr = new MfaPushEnrollmentQr();
  const { screen } = mfaPushEnrollmentQr;
  const { qr_code, qr_uri, show_code_copy } = screen.data || {};

  const handlePickAuthenticator = async () => {
    try {
      await mfaPushEnrollmentQr.pickAuthenticator();
    } catch (error) {
      console.error('Failed to pick authenticator:', error);
    }
  };

  const handleCopyCode = () => {
    if (qr_uri) {
      navigator.clipboard.writeText(qr_uri)
        .then(() => {
          alert('Code copied to clipboard');
        })
        .catch((error) => {
          console.error('Failed to copy code:', error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center flex-start min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold">{ screen.texts?.title ?? 'Enroll with Push Notification' }</h2>
        <p className="mb-4">{ screen.texts?.description ?? '' }</p>
        {
          qr_code ? (
            <div className="mb-4">
              <img src={qr_code} alt="QR Code" className="mb-4 mx-auto" />
              
              {show_code_copy && qr_uri && (
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600 mb-2">Or copy this code to your authenticator app:</p>
                  <div className="flex items-center justify-center">
                    <code className="bg-gray-100 p-2 rounded mr-2 text-xs overflow-hidden text-ellipsis max-w-xs">
                      {qr_uri}
                    </code>
                    <button
                      onClick={handleCopyCode}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-1 px-2 rounded"
                      aria-label="Copy code"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>Loading QR Code...</p>
          )
        }
        <button
          className="mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handlePickAuthenticator}
        >
          Try Another Method
        </button>
      </div>
    </div>
  );
};

export default MfaPushEnrollmentQrScreen;
```

## Usage Examples

### Pick Authenticator

```typescript
import MfaPushEnrollmentQr from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';

const mfaPushEnrollmentQr = new MfaPushEnrollmentQr();

mfaPushEnrollmentQr.pickAuthenticator();
```
