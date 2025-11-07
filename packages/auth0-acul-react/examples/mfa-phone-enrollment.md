# `mfa-phone-enrollment`

The `mfa-phone-enrollment` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-phone-enrollment` screen.

### 1. Create the Component

Create a component file (e.g., `MfaPhoneEnrollment.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import { useMfaPhoneEnrollment, pickCountryCode, continueEnrollment, tryAnotherMethod } from '@auth0/auth0-acul-react/mfa-phone-enrollment';
import { Logo } from '../../components/Logo';

const MfaPhoneEnrollmentScreen: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [type, setType] = useState<'sms' | 'voice'>('sms');
  const mfaPhoneEnrollment = useMfaPhoneEnrollment();
  const { screen, transaction: { errors } } = mfaPhoneEnrollment;
  const texts = screen.texts ?? {};

  const handlePickCountryCode = async () => {
    await pickCountryCode();
  };

  const handleContinueEnrollment = async () => {
    await continueEnrollment({ phone, type });
  };

  const handleTryAnotherMethod = async () => {
    await tryAnotherMethod();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {texts.title ?? 'Secure Your Account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {texts.description ?? 'Enter your country code and phone number to which we can send a 6-digit code:'}
        </p>

        <div className="mt-6 space-y-4">
          <button
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            type="button"
            onClick={handlePickCountryCode}
          >
            {texts.pickCountryCodeButtonText ?? 'Pick Country Code'}
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
              {texts.placeholder ?? 'Enter your phone number'}
            </label>
            <input
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="phone"
              type="text"
              placeholder={texts.placeholder ?? 'Enter your phone number'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors?.length ? (
              <div className="mt-2 space-y-1" aria-live="polite">
                {errors.map((error, idx) => (
                  <p key={idx} className="text-red-600 text-xs">
                    {error.message}
                  </p>
                ))}
              </div>
            ) : null}
          </div>

          {/* Delivery Method */}
          <fieldset className="">
            <legend className="block text-sm font-medium text-gray-700 mb-2">
              {texts.chooseMessageTypeText ?? 'How do you want to receive the code?'}
            </legend>
            <div className="flex gap-4">
              <label className="flex items-center gap-1 text-sm text-gray-700">
                <input
                  type="radio"
                  value="sms"
                  checked={type === 'sms'}
                  onChange={() => setType('sms')}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                {texts.smsButtonText ?? 'Text message'}
              </label>
              <label className="flex items-center gap-1 text-sm text-gray-700">
                <input
                  type="radio"
                  value="voice"
                  checked={type === 'voice'}
                  onChange={() => setType('voice')}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                {texts.voiceButtonText ?? 'Voice call'}
              </label>
            </div>
          </fieldset>

          {/* Continue Button */}
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
            onClick={handleContinueEnrollment}
          >
            {texts.continueButtonText ?? 'Continue'}
          </button>

          {/* Try Another Method */}
          <button
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            type="button"
            onClick={handleTryAnotherMethod}
          >
            {texts.pickAuthenticatorText ?? 'Try Another Method'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaPhoneEnrollmentScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaPhoneEnrollment` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-phone-enrollment` entry point.
2.  **Hooks**:
    *   `useMfaPhoneEnrollment()`: Provides the core screen object with methods like `pickCountryCode()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.pickCountryCode(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
