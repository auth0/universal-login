import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';

# Mfa Otp Enrollment QR Screen

This screen is displayed when the user needs to enroll with a OTP using a QR code.

## React Component Example with TailwindCSS

```tsx
import React, { useState } from 'react';
import MfaOtpEnrollmentQr from '@auth0/auth0-acul-js/mfa-otp-enrollment-qr';

const MfaOtpEnrollmentQrScreen: React.FC = () => {
  const mfaOtpEnrollmentQr = new MfaOtpEnrollmentQr();
  const { screen, transaction } = mfaOtpEnrollmentQr;
  const { qr_code } = screen.data || {};
  
  const [otpCode, setOtpCode] = useState('');

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

  const handleContinue = async () => {
    await mfaOtpEnrollmentQr.continue({ code: otpCode });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold">{screen.texts?.title ?? 'Secure Your Account'}</h2>
        <p className="mb-4">{screen.texts?.description ?? 'Scan the QR Code below using your preferred authenticator app and then enter the provided one-time code below.'}</p>

        {qr_code ? (
          <div className="mb-4">
            <img src={qr_code} alt="QR Code" className="mb-4 mx-auto" />
          </div>
        ) : (
          <p>Loading QR Code...</p>
        )}

        <div className="flex justify-center flex-col items-center">
          <input
            id="code"
            placeholder="Enter OTP code"
            type="text"
            required
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            className="w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className="w-64 mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            type="button"
            onClick={handleContinue}
          >
            { screen.texts?.buttonText ?? 'Continue' }
          </button>

          {transaction?.errors?.length && (
            <div className="mt-2 mb-4">
              {transaction?.errors.map((err, index) => (
                <p key={index} className="text-red-500">
                  {err.message}
                </p>
              ))}
            </div>
          )}
        </div>

        <hr className="my-4" />

        <div className="flex justify-center items-end">
          <button
            className="mx-auto block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            type="button"
            onClick={handleToggleView}
          >
            Toggle View
          </button>

          <button
            className="mx-auto block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            type="button"
            onClick={handleTryAnotherMethod}
          >
            { screen.texts?.tryAnotherMethodText ?? 'Try Another Method' }
          </button>
        </div>

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