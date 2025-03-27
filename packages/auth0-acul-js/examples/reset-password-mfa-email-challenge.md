import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';

# Reset Password MFA Email Challenge Screen

This screen is displayed when the user needs to enter the code sent to their email to reset their password.

## React Component Example with TailwindCSS

```tsx
import React, { useState } from 'react';
import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';

const ResetPasswordMfaEmailChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');

  const resetPasswordMfaEmailChallenge = new ResetPasswordMfaEmailChallenge();
  const { screen, transaction } = resetPasswordMfaEmailChallenge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPasswordMfaEmailChallenge.continue({
      code
    });
  };

  const handleResendCode = async () => {
    await resetPasswordMfaEmailChallenge.resendCode();
  };

  const handleTryAnotherMethod = async () => {
    await resetPasswordMfaEmailChallenge.tryAnotherMethod();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          { screen?.texts?.title ?? 'Verify Your Identity' }
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          { (screen?.texts?.description ?? 'We\'ve sent an email with your code to') + screen.data?.email }
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                { screen?.texts?.placeholder ?? 'Enter the code' }
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  placeholder={ screen?.texts?.placeholder ?? 'Enter the code' }
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
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
            </div>

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
            <div className="flex justify-between">
              <button
                onClick={handleResendCode}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                { screen?.texts?.resendActionText ?? 'Resend Code' }
              </button>
              <button
                onClick={handleTryAnotherMethod}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                { screen?.texts?.pickAuthenticatorText ?? 'Try another method' }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaEmailChallengeScreen;
```

## Usage Examples

### Continue with Code

```typescript
import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';

const resetPasswordMfaEmailChallenge = new ResetPasswordMfaEmailChallenge();

resetPasswordMfaEmailChallenge.continue({
  code: '123456',
  rememberDevice: true,
});
```

### Resend Code

```typescript
import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';

const resetPasswordMfaEmailChallenge = new ResetPasswordMfaEmailChallenge();

resetPasswordMfaEmailChallenge.resendCode();
```

### Try Another Method

```typescript
import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';

const resetPasswordMfaEmailChallenge = new ResetPasswordMfaEmailChallenge();

resetPasswordMfaEmailChallenge.tryAnotherMethod();
```