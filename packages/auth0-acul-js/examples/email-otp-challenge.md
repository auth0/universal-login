import EmailOTPChallenge from '@auth0/auth0-acul-js/email-otp-challenge';

## submitCode

```typescript

//Creates an instance of EmailOTPChallenge and calls the method with sample data.
import EmailOTPChallenge from '@auth0/auth0-acul-js/email-otp-challenge';
const emailOTPChallenge = new EmailOTPChallenge();

emailOTPChallenge.submitCode("123456");

```


## resendCode

```typescript

import EmailOTPChallenge from '@auth0/auth0-acul-js/email-otp-challenge';

const emailOTPChallenge = new EmailOTPChallenge();
emailOTPChallenge.resendCode();

```

## React Component Example with TailwindCSS

```tsx
import React, { useState } from 'react';
import EmailOTPChallenge from '@auth0/auth0-acul-js/email-otp-challenge';

const EmailOTPChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const emailOTPChallengeManager = new EmailOTPChallenge();
  const { screen } = emailOTPChallengeManager;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await emailOTPChallengeManager.submitCode({ code });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    setError('');
    setSuccess(false);

    try {
      await emailOTPChallengeManager.resendCode();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to resend code. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Email OTP Challenge
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Verification Code
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

            {success && (
              <div className="text-green-600 text-sm">
                Code submitted successfully!
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Code
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Need a new code?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleResendCode}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Resend Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailOTPChallengeScreen;
```