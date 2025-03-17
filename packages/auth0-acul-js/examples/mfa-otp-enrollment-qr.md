import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';

# Mfa Otp Enrollment QR Screen

This screen is displayed when the user needs to enroll with a OTP using a QR code.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';

const MfaOtpEnrollmentQrScreen: React.FC = () => {
  const mfaOtpEnrollmentQr = new MfaOtpEnrollmentQr();
  const { screen } = mfaOtpEnrollmentQr;
  const { qr_code } = screen.data || {};

  const handleToggleView = async () => {
    try {
      await mfaOtpEnrollmentQr.toggleView();
    } catch (error) {
      console.error('Failed to toggle view:', error);
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await mfaOtpEnrollmentQr.tryAnotherMethod();
    } catch (error) {
      console.error('Failed to pick authenticator:', error);
    }
  };

  return (
    <div className="flex flex-col items-center flex-start min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold">{ screen.texts?.title ?? 'Enroll with OTP' }</h2>
        <p className="mb-4">{ screen.texts?.description ?? '' }</p>
        {
          qr_code ? (
            <div className="mb-4">
              <img src={qr_code} alt="QR Code" className="mb-4 mx-auto" />
            </div>
          ) : (
            <p>Loading QR Code...</p>
          )
        }
        <button
          className="mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleToggleView}
        >
          Toggle View
        </button>
                <button
          className="mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleTryAnotherMethod}
        >
          Try Another Method
        </button>
      </div>
    </div>
  );
};

export default MfaOtpEnrollmentQrScreen;
```

## Usage Examples

### Toggle View

```typescript
import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';

const mfaOtpEnrollmentQr = new MfaOtpEnrollmentQr();

mfaOtpEnrollmentQr.toggleView();
```

### Try Another Method

```typescript
import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';

const mfaOtpEnrollmentQr = new MfaOtpEnrollmentQr();

mfaOtpEnrollmentQr.tryAnotherMethod();
```