# `mfa-sms-enrollment`

The `mfa-sms-enrollment` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-sms-enrollment` screen.

### 1. Create the Component

Create a component file (e.g., `MfaSmsEnrollment.tsx`) and add the following code:

```tsx
import { useState } from 'react';
import { useScreen, useTransaction, tryAnotherMethod, continueEnrollment, pickCountryCode } from '@auth0/auth0-acul-react/mfa-sms-enrollment';
import { Logo } from '../../components/Logo';

const MFASmsEnrollmentScreen = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  
  const transaction = useTransaction();
  const screen = useScreen();
  const texts = screen?.texts || {};
  
  // Get country data from transaction
  const countryCodeStr = transaction.countryCode
  const countryPrefix = transaction.countryPrefix 
  
  const countryCode = `+${countryPrefix}`;
  const displayName = `${countryCodeStr} ${countryCode}`;
  


  const handlePickCountryCode = async () => {
    setError('');
    try {
      await pickCountryCode();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to pick country code.';
      setError(errorMessage);
    }
  };

  const handleContinueEnrollment = async () => {
    setError('');
    if (!phone) {
      setError('Phone number is required.');
      return;
    }
    
    try {
      await continueEnrollment({ phone });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to continue enrollment.';
      setError(errorMessage);
    }
  };

  const handleTryAnotherMethod = async () => {
    setError('');
    try {
      await tryAnotherMethod();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to try another method.';
      setError(errorMessage);
    }
  };

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
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {texts.title || 'Secure Your Account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {texts.description || 'Enter your phone number below. An SMS will be sent to that number with a code to enter on the next screen.'}
        </p>

        <div className="mt-6 space-y-4">
          {/* Country Selector */}
          <button
            type="button"
            onClick={handlePickCountryCode}
            className="w-full flex items-center justify-between px-4 py-3 border-2 border-indigo-500 rounded-md bg-white text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{displayName}</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Phone Number Input */}
          <div>
            <input
              id="phone"
              type="tel"
              placeholder={texts.placeholder || 'Enter your phone number*'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Error Messages */}
          {error && (
            <div className="text-red-600 text-sm text-center" role="alert">
              {error}
            </div>
          )}
          
          {transaction.errors && transaction.errors.length > 0 && (
            <div className="text-red-600 text-sm text-center" role="alert">
              {transaction.errors.map((err, i) => (
                <p key={i}>{err.message}</p>
              ))}
            </div>
          )}

          {/* Continue Button */}
          <button
            type="button"
            onClick={handleContinueEnrollment}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts.continueButtonText || 'Continue'}
          </button>

          {/* Try Another Method Link */}
          {texts.pickAuthenticatorText && (
            <button
              type="button"
              onClick={handleTryAnotherMethod}
              className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              {texts.pickAuthenticatorText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MFASmsEnrollmentScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaSmsEnrollment` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-sms-enrollment` entry point.
2.  **Hooks**:
    *   `useMfaSmsEnrollment()`: Provides the core screen object with methods like `pickCountryCode()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.pickCountryCode(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
