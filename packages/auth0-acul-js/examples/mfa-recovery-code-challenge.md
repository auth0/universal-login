import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';

# MFA Recovery Code Challenge Screen

This screen is displayed when the user needs to enter a recovery code to log in.

## React Component Example with TailwindCSS

```tsx
import React, { useState } from 'react';
import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';

const MfaRecoveryCodeChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const mfaRecoveryCodeChallenge = new MfaRecoveryCodeChallenge();
  const { screen, transaction: { errors } } = mfaRecoveryCodeChallenge;
  const texts = screen.texts ?? {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mfaRecoveryCodeChallenge.continue(code);
  };

  const handleTryAnotherMethod = () => {
    mfaRecoveryCodeChallenge.tryAnotherMethod();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {texts.title ?? 'Verify Your Identity'}
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          {texts.description ?? 'Enter the recovery code you were provided during your initial enrollment.'}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
              {texts.placeholder ?? 'Enter your recovery code'}
            </label>
            <input
              id="code"
              name="code"
              type="text"
              placeholder={texts.placeholder ?? 'Enter your recovery code'}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors && errors?.length && (
              <div className="mt-2 space-y-1">
                {errors.map((error, idx) => (
                  <p key={idx} className="text-red-600 text-sm">
                    {error.message}
                  </p>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            {texts.buttonText ?? 'Continue'}
          </button>
        </form>

        <button
          type="button"
          onClick={handleTryAnotherMethod}
          className="text-sm text-blue-500 hover:underline focus:outline-none"
        >
          {texts.pickAuthenticatorText ?? 'Try another method'}
        </button>
      </div>
    </div>
  );
};

export default MfaRecoveryCodeChallengeScreen;

```

## Usage Examples

### Continue with Code

```typescript
import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';

const mfaRecoveryCodeChallenge = new MfaRecoveryCodeChallenge();

mfaRecoveryCodeChallenge.continue('PJVLZM6MS8DP6JYRT97XYZM2');
```

### Try Another Method

```typescript
import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';

const mfaRecoveryCodeChallenge = new MfaRecoveryCodeChallenge();

mfaRecoveryCodeChallenge.tryAnotherMethod();
```