import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';

## Pick Country Code

```typescript
import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';

const mfaSmsEnrollment = new MfaSmsEnrollment();

// Call the pickCountryCode method
mfaSmsEnrollment.pickCountryCode();
```

## Continue Enrollment

```typescript
import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';

const mfaSmsEnrollment = new MfaSmsEnrollment();

// Call the continueEnrollment method with a phone number
mfaSmsEnrollment.continueEnrollment({
    phone: "1234567890"
});
```

## Try Another Method

```typescript
import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';

const mfaSmsEnrollment = new MfaSmsEnrollment();

// Call the tryAnotherMethod
mfaSmsEnrollment.tryAnotherMethod();
```

## React Component Example with TailwindCSS

```jsx
import React, { useState } from 'react';
import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';

const MFASmsEnrollmentScreen = () => {
  const [phone, setPhone] = useState('');
  const mfaSmsEnrollment = new MfaSmsEnrollment();

  const handlePickCountryCode = async () => {
    await mfaSmsEnrollment.pickCountryCode();
  };

  const handleContinueEnrollment = async () => {
    await mfaSmsEnrollment.continueEnrollment({ phone });
  };

  const handleTryAnotherMethod = async () => {
    await mfaSmsEnrollment.tryAnotherMethod();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">MFA SMS Enrollment</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleContinueEnrollment}
          >
            Continue Enrollment
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handlePickCountryCode}
          >
            Pick Country Code
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleTryAnotherMethod}
          >
            Try Another Method
          </button>
        </div>
      </div>
    </div>
  );
};

export default MFASmsEnrollmentScreen;
```