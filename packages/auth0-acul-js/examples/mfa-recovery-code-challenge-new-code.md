import MfaRecoveryCodeChallengeNewCode from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';

# MFA Recovery Code Challenge - New Code Screen

This screen is displayed after successfully enrolling in MFA with a recovery code. It presents the **newly generated** recovery code. The user **must** save this code securely before proceeding, as it's essential for account recovery if other MFA factors become unavailable.

## React Component Example with TailwindCSS

This example demonstrates how to build a UI for the MFA Recovery Code Challenge New Code screen using React and TailwindCSS. It displays the new recovery code and requires the user to confirm they have saved it before continuing.

```tsx
import React, { useState, useCallback } from 'react';
import MfaRecoveryCodeChallengeNewCode from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';

const MfaRecoveryCodeChallengeNewCodeScreen: React.FC = () => {
  // Instantiate the SDK class for the screen
  const screenManager = new MfaRecoveryCodeChallengeNewCode();
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
      await screenManager.continue();
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
  }, [hasSavedCode, screenManager, transaction.errors]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          {texts.title ?? 'Save Your Recovery Code'}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {texts.description ?? 'Save this recovery code in a safe place. You will need it to log in if you lose access to your other multi-factor authentication methods.'}
        </p>

        {/* Display the Recovery Code */}
        <div className="bg-gray-100 border border-gray-300 rounded-md p-4 mb-6 text-center">
          <p className="text-lg font-mono font-semibold text-gray-800 tracking-wider break-all">
            {recoveryCode}
          </p>
        </div>

        {/* Confirmation Checkbox */}
        <div className="flex items-center justify-center mb-6">
          <input
            id="confirm-saved"
            type="checkbox"
            checked={hasSavedCode}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="confirm-saved" className="ml-2 block text-sm text-gray-700">
            {texts.confirmationText ?? 'I have saved this recovery code'}
          </label>
        </div>

        {/* Display errors (transaction errors or client-side errors) */}
        {(transaction.errors?.length || error) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error && <p>{error}</p>}
            {transaction.errors?.map((err, index) => (
              <p key={`tx-err-${index}`}>{err.message}</p>
            ))}
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!hasSavedCode || isLoading}
          className={`w-full px-4 py-2 text-white rounded-md transition duration-150 ease-in-out ${
            !hasSavedCode || isLoading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          }`}
        >
          {isLoading ? 'Continuing...' : (texts.buttonText ?? 'Continue')}
        </button>
      </div>
    </div>
  );
};

export default MfaRecoveryCodeChallengeNewCodeScreen;
```
## Usage Examples
### Confirm Saving the Code and Continue
This action confirms that the user has saved the displayed recovery code and proceeds to the next step in the authentication flow.

```jsx
import MfaRecoveryCodeChallengeNewCode from '@auth0/auth0-acul-js/mfa-recovery-code-challenge-new-code';

const screenManager = new MfaRecoveryCodeChallengeNewCode();

// This should typically be called after the user confirms saving the code,
// e.g., by checking a box and clicking a button.
async function confirmAndContinue() {
  try {
    // The SDK handles sending the required 'saved=on' parameter internally.
    await screenManager.continue();
    // If successful, the browser will redirect.
  } catch (error) {
    console.error("Failed to confirm saving the recovery code:", error);
    // Handle potential errors, e.g., display error messages from screenManager.transaction.errors
    if (screenManager.transaction.errors?.length) {
       screenManager.transaction.errors.forEach(err => console.log(err.message));
    }
  }
}

// Example trigger (replace with actual UI interaction)
// if (userConfirmedSavingCode) {
//   confirmAndContinue();
// }
```