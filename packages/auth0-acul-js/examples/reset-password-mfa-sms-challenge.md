import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';

// Create a new instance of the ResetPasswordMfaSmsChallenge class
const resetPasswordMfaSmsChallenge = new ResetPasswordMfaSmsChallenge();

// Access screen data
const phoneNumber = resetPasswordMfaSmsChallenge.screen.data?.phone_number;
const rememberDevice = resetPasswordMfaSmsChallenge.screen.data?.remember_device;

// Example of submitting the MFA SMS challenge
resetPasswordMfaSmsChallenge.continueMfaSmsChallenge({
  code: '123456',
});

// Example of resending the code
resetPasswordMfaSmsChallenge.resendCode();

// Example of trying another method
resetPasswordMfaSmsChallenge.tryAnotherMethod();

// Example of getting a call
resetPasswordMfaSmsChallenge.getACall();

## React Component Example with TailwindCSS

```jsx
import React, { useState } from 'react';
import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';

const ResetPasswordMfaSmsChallengeScreen = () => {
  const resetPasswordMfaSmsChallenge = new ResetPasswordMfaSmsChallenge();
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPasswordMfaSmsChallenge.continueMfaSmsChallenge({
        code,
      });
    } catch (error) {
      console.error('MFA SMS Challenge failed:', error);
    }
  };

  const handleResendCode = async () => {
    try {
      await resetPasswordMfaSmsChallenge.resendCode();
    } catch (error) {
      console.error('Resend code failed:', error);
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await resetPasswordMfaSmsChallenge.tryAnotherMethod();
    } catch (error) {
      console.error('Try another method failed:', error);
    }
  };

  const handleGetACall = async () => {
    try {
      await resetPasswordMfaSmsChallenge.getACall();
    } catch (error) {
      console.error('Get a call failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Password MFA SMS Challenge
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Enter Code
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

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              onClick={handleResendCode}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mt-2"
            >
              Resend Code
            </button>
            <button
              onClick={handleTryAnotherMethod}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mt-2"
            >
              Try Another Method
            </button>
            <button
              onClick={handleGetACall}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mt-2"
            >
              Get a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaSmsChallengeScreen;
```