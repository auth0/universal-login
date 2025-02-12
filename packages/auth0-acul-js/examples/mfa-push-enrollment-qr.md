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
  const { qr_code } = screen.data || {};

  const handlePickAuthenticator = async () => {
    try {
      await mfaPushEnrollmentQr.pickAuthenticator();
    } catch (error) {
      console.error('Failed to pick authenticator:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Enroll with Push Notification</h2>
        {
          qr_code ? (
            <img src={qr_code} alt="QR Code" className="mb-4" />
          ) : (
            <p>Loading QR Code...</p>
          )
        }
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
