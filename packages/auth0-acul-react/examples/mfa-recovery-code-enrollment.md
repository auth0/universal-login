# `mfa-recovery-code-enrollment`

The `mfa-recovery-code-enrollment` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-recovery-code-enrollment` screen.

### 1. Create the Component

Create a component file (e.g., `MfaRecoveryCodeEnrollment.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import { useMfaRecoveryCodeEnrollment, continueMethod } from '@auth0/auth0-acul-react/mfa-recovery-code-enrollment';

const MfaRecoveryCodeEnrollmentScreen: React.FC = () => {
  const mfaRecoveryCodeEnrollment = useMfaRecoveryCodeEnrollment();
  const { screen, transaction } = mfaRecoveryCodeEnrollment;
  const texts = screen?.texts ?? {};

  const [isCodeCopied, setIsCodeCopied] = useState(false);

  const handleContinue = async () => {
    try {
      await continueMethod({ isCodeCopied });
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

        <label className="mb-4 flex items-center space-x-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={isCodeCopied}
            onChange={(e) => setIsCodeCopied(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span>I have saved the recovery code</span>
        </label>

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
          disabled={!isCodeCopied}
        >
          {texts.buttonText ?? 'I have saved the code'}
        </button>
      </div>
    </div>
  );
};

export default MfaRecoveryCodeEnrollmentScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaRecoveryCodeEnrollment` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-recovery-code-enrollment` entry point.
2.  **Hooks**:
    *   `useMfaRecoveryCodeEnrollment()`: Provides the core screen object with methods like `continueMethod()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.continueMethod(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
