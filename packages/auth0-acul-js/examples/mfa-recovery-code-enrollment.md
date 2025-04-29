import MfaRecoveryCodeEnrollment from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';

# MFA Recovery Code Enrollment Screen

This screen is displayed when the user needs to enroll with a recovery code for MFA.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import MfaRecoveryCodeEnrollment from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';

const MfaRecoveryCodeEnrollmentScreen: React.FC = () => {
  const mfaRecoveryCodeEnrollment = new MfaRecoveryCodeEnrollment();
  const { screen, transaction } = mfaRecoveryCodeEnrollment;
  const texts = screen?.texts ?? {};

  const handleContinue = async () => {
    try {
      await mfaRecoveryCodeEnrollment.continue();
    } catch (error) {
      console.error('Failed to continue:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {texts.title ?? 'MFA Recovery Code Enrollment'}
        </h2>

        <p className="mb-4 text-sm text-gray-700 text-center">
          {texts.description ?? 'Please save this recovery code in a safe place:'}
        </p>

        <p className="mb-6 text-center font-mono text-lg bg-gray-100 p-3 rounded">
          {screen?.data?.textCode ?? '******-******'}
        </p>

        {transaction?.errors?.length && (
          <div className="mb-4 space-y-1">
            {transaction.errors.map((err, index) => (
              <p key={index} className="text-red-600 text-sm text-center">
                {err.message}
              </p>
            ))}
          </div>
        )}

        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleContinue}
        >
          {texts.buttonText ?? 'I have saved the code'}
        </button>
      </div>
    </div>
  );
};

export default MfaRecoveryCodeEnrollmentScreen;
```

## Usage Examples

### Continue

```typescript
import MfaRecoveryCodeEnrollment from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';

const mfaRecoveryCodeEnrollment = new MfaRecoveryCodeEnrollment();

// Declare that the user saved the recovery code
await mfaRecoveryCodeEnrollment.continue();
```
