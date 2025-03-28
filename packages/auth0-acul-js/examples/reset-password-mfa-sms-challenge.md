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
import { useState } from 'react';
import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';

const ResetPasswordMfaSmsChallengeScreen = () => {
  const resetPasswordMfaSmsChallenge = new ResetPasswordMfaSmsChallenge();
  const [code, setCode] = useState('');

  const { screen, transaction } = resetPasswordMfaSmsChallenge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPasswordMfaSmsChallenge.continueMfaSmsChallenge({
      code,
    });
  };

  const handleResendCode = async () => {
    await resetPasswordMfaSmsChallenge.resendCode();
  };

  const handleTryAnotherMethod = async () => {
    await resetPasswordMfaSmsChallenge.tryAnotherMethod();
  };

  const handleGetACall = async () => {
    try {
      await resetPasswordMfaSmsChallenge.getACall();
    } catch (error) {
      console.error('Get a call failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          { screen?.texts?.title ?? 'Verify Your Identity' }
        </h2>
        <p className="mt-4">
          { screen?.texts?.description ?? 'Enter the code sent to your phone number' + screen.data?.phoneNumber }
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                { screen?.texts?.placeholder ?? 'Enter the 6-digit code' }
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  placeholder={ screen?.texts?.placeholder ?? 'Enter the 6-digit code' }
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
               { screen?.texts?.buttonText ?? 'Continue' }
              </button>
            </div>
            
            {transaction?.errors?.length && (
              <div className="mt-2 mb-4">
                {transaction?.errors.map((err, index) => (
                  <p key={index} className="text-red-500">
                    {err.message}
                  </p>
                ))}
              </div>
            )}
          </form>

          <div className="mt-6">
            <button
              onClick={handleResendCode}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mt-2"
            >
              { screen?.texts?.resendActionText ?? 'Resend Code' }
            </button>
            <button
              onClick={handleTryAnotherMethod}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mt-2"
            >
              { screen?.texts?.pickAuthenticatorText ?? 'Try Another Method' }
            </button>
            { screen.data?.isVoiceEnabled && (
              <button
                onClick={handleGetACall}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mt-2"
              >
                { screen?.texts?.resendVoiceActionText ?? 'Get a Call' }
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaSmsChallengeScreen;
```