## continue

```typescript
import MfaOtpEnrollmentCode from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';

const mfaOtpEnrollmentCode = new MfaOtpEnrollmentCode();
mfaOtpEnrollmentCode.continue({
    code:"123546"
});
```

## tryAnotherMethod

```typescript
import MfaOtpEnrollmentCode from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';

const mfaOtpEnrollmentCode = new MfaOtpEnrollmentCode();
mfaOtpEnrollmentCode.tryAnotherMethod();
```

## React Component Example with TailwindCSS

```tsx
import React, { useState } from 'react';
import MfaOtpEnrollmentCode from '@auth0/auth0-acul-js/mfa-otp-enrollment-code';

const MfaOtpEnrollmentCodeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const mfaOtpEnrollmentCode = new MfaOtpEnrollmentCode();
  const { screen } = mfaOtpEnrollmentCode;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await mfaOtpEnrollmentCode.continue({
        code,
      });
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await mfaOtpEnrollmentCode.tryAnotherMethod();
    } catch (err) {
      setError('Failed to try another method. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Enter Authentication Code
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please enter the authentication code shown on the screen.
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          Code: {screen.data?.text_code}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Code
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify Code
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="flex justify-center">
              <button
                onClick={handleTryAnotherMethod}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Try Another Method
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfaOtpEnrollmentCodeScreen;
```