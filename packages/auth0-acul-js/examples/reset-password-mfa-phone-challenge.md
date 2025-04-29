import ResetPasswordMfaPhoneChallenge from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';

# Reset Password MFA Phone Challenge Screen

This screen is displayed during the password reset process when Multi-Factor Authentication (MFA) using a phone (SMS or Voice call) is required to verify the user's identity before allowing the password change. It prompts the user to choose how they want to receive the verification code.

## React Component Example with TailwindCSS

This example demonstrates how to build a UI for the Reset Password MFA Phone Challenge screen using React and TailwindCSS. It shows the masked phone number and provides buttons for the user to select SMS or Voice Call delivery, or to try a different MFA method altogether.

```tsx
import React, { useState } from 'react';
import ResetPasswordMfaPhoneChallenge, {
  type ContinueOptions,
  type TryAnotherMethodOptions
} from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';

const ResetPasswordMfaPhoneChallengeScreen: React.FC = () => {
  // Instantiate the SDK class for the screen
  const screenManager = new ResetPasswordMfaPhoneChallenge();
  const { screen, transaction } = screenManager;

  // State to manage loading indicators and potential errors
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // State to track the user's choice (needed for tryAnotherMethod)
  // Default to 'sms' or 'voice' based on initial view, or let user select first
  const [currentChallengeType, setCurrentChallengeType] = useState<'sms' | 'voice'>('sms'); // Example default

  /**
   * Handles the action when the user chooses SMS or Voice Call.
   * @param {'sms' | 'voice'} type - The selected delivery method.
   */
  const handleContinue = async (type: ContinueOptions['type']) => {
    setIsLoading(true);
    setError(null);
    setCurrentChallengeType(type); // Update the current type
    try {
      await screenManager.continue({ type });
      // On success, Auth0 usually handles the redirect to the next step (code entry).
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code. Please try again.');
      setIsLoading(false); // Only stop loading on error
    }
  };

  /**
   * Handles the action when the user wants to try a different MFA method.
   */
  const handleTryAnotherMethod = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Pass the current challenge type the user was viewing
      await screenManager.tryAnotherMethod({ type: currentChallengeType });
      // On success, Auth0 usually handles the redirect to the authenticator selection screen.
    } catch (err: any) {
      setError(err.message || 'Failed to switch MFA methods. Please try again.');
      setIsLoading(false); // Only stop loading on error
    }
  };

  // Extract texts for UI elements, providing default fallbacks
  const texts = screen?.texts ?? {};
  const title = texts.title ?? 'Verify Your Identity';
  // Example: Modify description to include phone number securely
  const description = texts.description ?? `To continue resetting your password, please verify your identity. How would you like to get the verification code sent to ${screen.data?.phoneNumber ?? 'your phone'}?`;
  const smsButtonText = texts.smsButtonText ?? 'Send code via SMS';
  const voiceButtonText = texts.voiceButtonText ?? 'Send code via Voice Call';
  const tryAnotherMethodText = texts.pickAuthenticatorText ?? 'Try Another Method'; // Assuming this text key exists

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          {title}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {description}
        </p>

        {/* Display errors from the transaction object (e.g., invalid state) */}
        {transaction.errors && transaction.errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            {transaction.errors.map((err, index) => (
              <span key={`tx-error-${index}`} className="block sm:inline">{err.message}</span>
            ))}
          </div>
        )}

        {/* Display errors caught during form submission */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* SMS Button */}
          <button
            onClick={() => handleContinue('sms')}
            disabled={isLoading}
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md transition duration-150 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'}`}
          >
            {isLoading && currentChallengeType === 'sms' ? 'Sending SMS...' : smsButtonText}
          </button>

          {/* Voice Call Button */}
          <button
            onClick={() => handleContinue('voice')}
            disabled={isLoading}
            className={`w-full px-4 py-2 text-white bg-green-600 rounded-md transition duration-150 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'}`}
          >
            {isLoading && currentChallengeType === 'voice' ? 'Initiating Call...' : voiceButtonText}
          </button>
        </div>

        {/* Separator */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Try Another Method Button */}
        <button
          onClick={handleTryAnotherMethod}
          disabled={isLoading}
          className={`w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md transition duration-150 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50'}`}
        >
          {isLoading ? 'Loading...' : tryAnotherMethodText}
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordMfaPhoneChallengeScreen;

```

## Usage Examples

### Initialize the SDK Class

First, import and instantiate the class for the screen:

```typescript
import ResetPasswordMfaPhoneChallenge from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';

const screenManager = new ResetPasswordMfaPhoneChallenge();

// Access screen data like the phone number
const phoneNumber = screenManager.screen.data?.phoneNumber;
console.log('Phone number for challenge:', phoneNumber); // e.g., "+1******7890"

// Access transaction details like errors
const errors = screenManager.transaction.errors;
if (errors) {
  console.error('Transaction errors:', errors);
}
```

### Send Code via SMS

To trigger sending the verification code via SMS:

```typescript
import ResetPasswordMfaPhoneChallenge from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';

const screenManager = new ResetPasswordMfaPhoneChallenge();

try {
  await screenManager.continue({ type: 'sms' });
  // On success, the user will typically be redirected to the code entry screen.
} catch (error) {
  console.error('Failed to request SMS code:', error);
  // Handle the error, e.g., display a message to the user.
}
```

### Send Code via Voice Call

To trigger sending the verification code via a voice call:

```typescript
import ResetPasswordMfaPhoneChallenge from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';

const screenManager = new ResetPasswordMfaPhoneChallenge();

try {
  await screenManager.continue({ type: 'voice' });
  // On success, the user will typically be redirected to the code entry screen.
} catch (error) {
  console.error('Failed to request voice call:', error);
  // Handle the error.
}
```

### Try Another MFA Method

To allow the user to choose a different MFA method instead of phone verification:

```typescript
import ResetPasswordMfaPhoneChallenge from '@auth0/auth0-acul-js/reset-password-mfa-phone-challenge';

const screenManager = new ResetPasswordMfaPhoneChallenge();

// You need to know which option ('sms' or 'voice') was presented or last selected by the user.
// Let's assume 'sms' was the context.
const currentType: 'sms' | 'voice' = 'sms';

try {
  await screenManager.tryAnotherMethod({ type: currentType });
  // On success, the user will be redirected to the authenticator selection screen.
} catch (error) {
  console.error('Failed to switch MFA method:', error);
  // Handle the error.
}
```