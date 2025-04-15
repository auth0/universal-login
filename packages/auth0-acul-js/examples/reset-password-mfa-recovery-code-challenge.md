import ResetPasswordMfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';

# Reset Password MFA Recovery Code Challenge Screen

This screen is displayed when the user needs to enter a recovery code to reset their password.

## React Component Example with TailwindCSS

```tsx
import React, { useState } from 'react';
import ResetPasswordMfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';

const ResetPasswordMfaRecoveryCodeChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const resetPasswordMfaRecoveryCodeChallengeManager = new ResetPasswordMfaRecoveryCodeChallenge();
  const { screen, transaction: { errors } } = resetPasswordMfaRecoveryCodeChallengeManager;
  const texts = screen.texts ?? {};

  const handleSubmit = async () => {
    try {
      await resetPasswordMfaRecoveryCodeChallengeManager.continue(code);
    } catch (error) {
      console.error('Failed to submit recovery code:', error);
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await resetPasswordMfaRecoveryCodeChallengeManager.tryAnotherMethod();
    } catch (error) {
      console.error('Failed to try another method:', error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {texts.title ?? 'Enter Recovery Code'}
        </h2>
        <p className="text-sm text-gray-700 mb-4 text-center">
          {texts.description ?? 'Please enter the recovery code from your authenticator app.'}
        </p>

        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
          id="code"
          type="text"
          placeholder={texts.placeholder ?? 'Enter your recovery code'}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {errors?.length && (
          <div className="mb-4 space-y-1">
            {errors.map((err, index) => (
              <p key={index} className="text-red-600 text-sm">
                {err.message}
              </p>
            ))}
          </div>
        )}

        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
          type="button"
          onClick={handleSubmit}
        >
          {texts.buttonText ?? 'Continue'}
        </button>

        <button
          className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleTryAnotherMethod}
        >
          {texts.tryAnotherMethodText ?? 'Try Another Method'}
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordMfaRecoveryCodeChallengeScreen;
```

## Usage Examples

### Continue with Code

```typescript
import ResetPasswordMfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';

const resetPasswordMfaRecoveryCodeChallenge = new ResetPasswordMfaRecoveryCodeChallenge();

resetPasswordMfaRecoveryCodeChallenge.continue('PJVLZM6MS8DP6JYRT97XYZM2');
```

### Try Another Method

```typescript
import ResetPasswordMfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';

const resetPasswordMfaRecoveryCodeChallenge = new ResetPasswordMfaRecoveryCodeChallenge();

resetPasswordMfaRecoveryCodeChallenge.tryAnotherMethod();
```
