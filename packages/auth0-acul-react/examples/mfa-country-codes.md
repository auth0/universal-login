# `mfa-country-codes`

The `mfa-country-codes` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-country-codes` screen.

### 1. Create the Component

Create a component file (e.g., `MfaCountryCodes.tsx`) and add the following code:

```tsx
import React from 'react';
import { useMfaCountryCodes, selectCountryCode, goBack } from '@auth0/auth0-acul-react/mfa-country-codes';
import { Logo } from '../../components/Logo';

const MfaCountryCodesScreen: React.FC = () => {
  const { screen } = useMfaCountryCodes();
  const { phone_prefixes } = screen.data || {};
  const { texts } = screen;
  const title = texts?.title ?? 'Select Your Country Code';
  const description = texts?.description ?? 'Choose the country/region for your phone number.';

  const handleCountrySelect = async (countryCode: string, phonePrefix: string) => {
    try {
      await selectCountryCode({ country_code: countryCode, phone_prefix: phonePrefix });
    } catch (error) {
      console.error('Failed to select country code:', error);
    }
  };

  const handleGoBack = async () => {
    try {
      await goBack();
    } catch (error) {
      console.error('Failed to go back:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>
        <h2 className="text-center text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-center text-sm text-gray-500">{description}</p>

        <div className="mt-6 space-y-3 max-h-96 overflow-y-auto pr-1">
          {phone_prefixes?.map((prefix, index) => (
            <button
              key={`${prefix.country_code}${index}`}
              onClick={() => handleCountrySelect(prefix.country_code, prefix.phone_prefix)}
              className="w-full flex justify-between items-center py-2.5 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
              <span className="text-left truncate mr-2">{prefix.country}</span>
              <span className="text-indigo-600 text-xs font-semibold">{prefix.phone_prefix}</span>
            </button>
          ))}
          {!phone_prefixes?.length && (
            <div className="text-sm text-gray-500 text-center py-4">
              {texts?.noOptionsText ?? 'No country codes available.'}
            </div>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleGoBack}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {texts?.backButtonText ?? 'Go Back'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MfaCountryCodesScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaCountryCodes` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-country-codes` entry point.
2.  **Hooks**:
    *   `useMfaCountryCodes()`: Provides the core screen object with methods like `selectCountryCode()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.selectCountryCode(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
