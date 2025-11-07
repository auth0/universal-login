# `mfa-recovery-code-challenge`

The `mfa-recovery-code-challenge` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-recovery-code-challenge` screen.

### 1. Create the Component

Create a component file (e.g., `MfaRecoveryCodeChallenge.tsx`) and add the following code:

```tsx
import React, { useState, useCallback } from 'react';
import { useMfaRecoveryCodeChallengeNewCode, continueMethod } from '@auth0/auth0-acul-react/mfa-recovery-code-challenge-new-code';
import { Logo } from '../../components/Logo';

const MfaRecoveryCodeChallengeNewCodeScreen: React.FC = () => {
  // Instantiate the SDK class for the screen
  const screenManager = useMfaRecoveryCodeChallengeNewCode();
  const { screen, transaction } = screenManager;

  // State to track if the user has confirmed saving the code
  const [hasSavedCode, setHasSavedCode] = useState<boolean>(false);
  // State for loading indicator during submission
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State for potential submission errors
  const [error, setError] = useState<string | null>(null);

  // Get the recovery code from the screen data, provide fallback
  const recoveryCode = screen?.data?.textCode ?? 'CODE-NOT-AVAILABLE';
  const texts = screen?.texts ?? {};

  // Handler for the checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setHasSavedCode(event.target.checked);
    setError(null); // Clear error when checkbox state changes
  };

  // Handler for the continue button click
  const handleContinue = useCallback(async () => {
    if (!hasSavedCode) {
      setError('Please confirm you have saved the recovery code.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // Call the continue method - no payload needed unless passing custom options
      await continueMethod();
      // On success, Auth0 handles the redirect automatically.
      // No need to set isLoading to false here.
    } catch (err: any) {
      // Check for specific server-side errors if needed
      const serverError = transaction.errors?.find(e => e.code === 'no-confirmation');
      if (serverError) {
        setError(serverError.message);
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
      setIsLoading(false); // Stop loading only on error
    }
  }, [hasSavedCode, transaction.errors]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>
        {/* Title */}
        <h1 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {texts.title ?? 'Save Your Recovery Code'}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          {texts.description ?? 'Save this recovery code in a safe place. You will need it if you lose access to your other MFA methods.'}
        </p>

        {/* Code Display */}
        <div className="mt-6">
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
            <p className="text-base font-mono font-semibold text-gray-800 tracking-widest break-all select-all">
              {recoveryCode}
            </p>
          </div>
          <p className="mt-2 text-[11px] text-center text-gray-500">
            {texts.copyHintText || 'Store this code somewhere safe. It can be used only once.'}
          </p>
        </div>

        {/* Confirmation Checkbox */}
        <div className="mt-6 flex items-start gap-2">
          <input
            id="confirm-saved"
            type="checkbox"
            checked={hasSavedCode}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-0.5"
          />
          <label htmlFor="confirm-saved" className="text-sm text-gray-700 leading-snug">
            {texts.confirmationText ?? 'I have securely saved this recovery code'}
          </label>
        </div>

        {/* Errors */}
        {(transaction.errors?.length || error) && (
          <div className="mt-4" aria-live="polite">
            <div className="rounded-md bg-red-50 p-3 border border-red-200">
              {error && <p className="text-xs text-red-600">{error}</p>}
              {transaction.errors?.map((err, i) => (
                <p key={i} className="text-xs text-red-600">{err.message}</p>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="mt-6">
          <button
            onClick={handleContinue}
            disabled={!hasSavedCode || isLoading}
            className={`w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              !hasSavedCode || isLoading
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? (texts.loadingButtonText || 'Continuing...') : (texts.buttonText ?? 'Continue')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaRecoveryCodeChallengeNewCodeScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaRecoveryCodeChallenge` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-recovery-code-challenge` entry point.
2.  **Hooks**:
    *   `useMfaRecoveryCodeChallenge()`: Provides the core screen object with methods like `continueMethod()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.continueMethod(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
