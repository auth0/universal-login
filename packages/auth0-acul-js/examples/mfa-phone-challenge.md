import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';

# MFA Phone Challenge Screen

This screen allows the user to choose whether to receive their Multi-Factor Authentication (MFA) code via SMS text message or a voice call to their registered phone number.

## React Component Example with TailwindCSS

This example demonstrates how to build a simple UI for the MFA Phone Challenge screen using React and TailwindCSS. It displays the masked phone number and provides buttons for the user to select SMS or Voice Call, or to try a different MFA method.

```tsx
import React, { useState } from 'react';
import MfaPhoneChallenge, { type ContinueOptions } from '@auth0/auth0-acul-js/mfa-phone-challenge';

const MfaPhoneChallengeScreen: React.FC = () => {
  // Instantiate the SDK class for the MFA Phone Challenge screen
  const mfaPhoneChallenge = new MfaPhoneChallenge();
  const { screen, transaction } = mfaPhoneChallenge;

  // State to handle potential errors during submission
  const [error, setError] = useState<string | null>(null);
  // State to manage loading state during submission
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Handles the submission when the user selects SMS or Voice Call.
   * @param {'sms' | 'voice'} type - The selected delivery method.
   */
  const handleContinue = async (type: ContinueOptions['type']) => {
    setIsLoading(true);
    setError(null);
    try {
      await mfaPhoneChallenge.continue({ type });
      // On success, the page will typically redirect automatically.
      // No need to set loading to false here.
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  /**
   * Handles the submission when the user wants to try a different MFA method.
   */
  const handleTryAnotherMethod = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await mfaPhoneChallenge.tryAnotherMethod();
      // On success, the page will typically redirect automatically.
    } catch (err: any) {
      setError(err.message || 'Failed to switch methods. Please try again.');
      setIsLoading(false);
    }
  };

  // Extract texts for UI elements, providing default fallbacks
  const texts = screen?.texts ?? {};
  const title = texts.title ?? 'Verify Your Identity';
  const description = texts.description ?? `How would you like to get the verification code sent to ${screen.data?.phone_number ?? 'your phone'}?`;
  const smsButtonText = texts.smsButtonText ?? 'Send code via SMS';
  const voiceButtonText = texts.voiceButtonText ?? 'Send code via Voice Call';
  const tryAnotherMethodText = texts.pickAuthenticatorText ?? 'Try Another Method';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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
            {transaction.errors.map((err, index) => (
              <p key={`tx-error-${index}`}>{err.message}</p>
            ))}
          </div>
        )}

        {/* Display errors caught during form submission */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* SMS Button */}
          <button
            onClick={() => handleContinue('sms')}
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            {isLoading ? 'Sending...' : smsButtonText}
          </button>

          {/* Voice Call Button */}
          <button
            onClick={() => handleContinue('voice')}
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            {isLoading ? 'Calling...' : voiceButtonText}
          </button>
        </div>

        {/* Separator */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Try Another Method Button */}
        <button
          onClick={handleTryAnotherMethod}
          disabled={isLoading}
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        >
          {isLoading ? 'Switching...' : tryAnotherMethodText}
        </button>

        {/* Note: The 'pickPhone' action is less common for this specific screen */}
        {/* but could be added similarly if needed: */}
        {/*
        <button
          onClick={async () => {
            setIsLoading(true);
            setError(null);
            try {
              await mfaPhoneChallenge.pickPhone();
            } catch (err: any) {
              setError(err.message || 'Failed to switch phones.');
              setIsLoading(false);
            }
          }}
          disabled={isLoading}
          className="mt-4 w-full text-sm text-blue-600 hover:underline focus:outline-none"
        >
          Use a different phone number
        </button>
        */}
      </div>
    </div>
  );
};

export default MfaPhoneChallengeScreen;
```

## Usage Examples

### Initialize the SDK Class

```typescript
import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';

const mfaPhoneChallenge = new MfaPhoneChallenge();

// You can access screen data like the phone number
const phoneNumber = mfaPhoneChallenge.screen.data?.phone_number;
console.log('Phone number for challenge:', phoneNumber);

// Access transaction details like errors
const errors = mfaPhoneChallenge.transaction.errors;
if (errors) {
  console.error('Transaction errors:', errors);
}
```

## Send Code via SMS

```typescript
import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';

const mfaPhoneChallenge = new MfaPhoneChallenge();

try {
  await mfaPhoneChallenge.continue({ type: 'sms' });
  // If successful, the user will be redirected to the code entry screen.
} catch (error) {
  console.error('Failed to request SMS code:', error);
  // Handle the error, e.g., display a message to the user.
}
```

## Send Code via Voice Call

```typescript
import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';

const mfaPhoneChallenge = new MfaPhoneChallenge();

try {
  await mfaPhoneChallenge.continue({ type: 'voice' });
  // If successful, the user will be redirected to the code entry screen.
} catch (error) {
  console.error('Failed to request voice call:', error);
  // Handle the error.
}
```

## Try Another MFA Method

```typescript
import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';

const mfaPhoneChallenge = new MfaPhoneChallenge();

try {
  await mfaPhoneChallenge.tryAnotherMethod();
  // If successful, the user will be redirected to the authenticator selection screen.
} catch (error) {
  console.error('Failed to switch MFA method:', error);
  // Handle the error.
}
```

## Pick a Different Phone (Less Common)

```typescript
import MfaPhoneChallenge from '@auth0/auth0-acul-js/mfa-phone-challenge';

const mfaPhoneChallenge = new MfaPhoneChallenge();

try {
  await mfaPhoneChallenge.pickPhone();
  // If successful, the user will be redirected to a phone selection screen.
} catch (error) {
  console.error('Failed to initiate picking a different phone:', error);
  // Handle the error.
}
```