import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';

# Mfa Phone Enrollment Screen

This screen is displayed when the user needs to enroll with a phone number for MFA.

## React Component Example with TailwindCSS

```tsx
import React, { useState } from 'react';
import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';

const MfaPhoneEnrollmentScreen: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<'sms' | 'voice'>('sms');
  const mfaPhoneEnrollment = new MfaPhoneEnrollment();
  const { screen, transaction: { errors } } = mfaPhoneEnrollment;
  const texts = screen.texts ?? {};

  const handlePickCountryCode = async () => {
    await mfaPhoneEnrollment.pickCountryCode();
  };

  const handleContinueEnrollment = async () => {
    await mfaPhoneEnrollment.continueEnrollment({ phone, type });
  };

  const handleTryAnotherMethod = async () => {
    await mfaPhoneEnrollment.tryAnotherMethod();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {texts.title ?? 'Secure Your Account'}
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          {texts.description ?? 'Enter your country code and phone number to which we can send a 6-digit code:'}
        </p>

        <button
          className="w-full mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handlePickCountryCode}
        >
          {texts.pickCountryCodeButtonText ?? 'Pick Country Code'}
        </button>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            {texts.placeholder ?? 'Enter your phone number'}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            placeholder={texts.placeholder ?? 'Enter your phone number'}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors?.length && (
            <div className="mt-2 space-y-1">
              {errors.map((error, idx) => (
                <p key={idx} className="text-red-600 text-sm">
                  {error.message}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {texts.chooseMessageTypeText ?? 'How do you want to receive the code?'}
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="sms"
                checked={type === 'sms'}
                onChange={() => setType('sms')}
              />
              {texts.smsButtonText ?? 'Text message'}
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="voice"
                checked={type === 'voice'}
                onChange={() => setType('voice')}
              />
              {texts.voiceButtonText ?? 'Voice call'}
            </label>
          </div>
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          type="button"
          onClick={handleContinueEnrollment}
        >
          {texts.continueButtonText ?? 'Continue'}
        </button>

        <button
          className="text-sm text-blue-500 hover:underline focus:outline-none"
          type="button"
          onClick={handleTryAnotherMethod}
        >
          {texts.pickAuthenticatorText ?? 'Try another method'}
        </button>
      </div>
    </div>
  );
};

export default MfaPhoneEnrollmentScreen;
```

## Usage Examples

### Pick Country Code

```typescript
import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';

const mfaPhoneEnrollment = new MfaPhoneEnrollment();

// Call the pickCountryCode method
mfaPhoneEnrollment.pickCountryCode();
```

## Continue Enrollment

```typescript
import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';

const mfaPhoneEnrollment = new MfaPhoneEnrollment();

// Call the continueEnrollment method with a phone number and type
mfaPhoneEnrollment.continueEnrollment({
    phone: "1234567890",
    type: "sms" // or "voice"
});
```

## Try Another Method

```typescript
import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';

const mfaPhoneEnrollment = new MfaPhoneEnrollment();

// Call the tryAnotherMethod
mfaPhoneEnrollment.tryAnotherMethod();
```