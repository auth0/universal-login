# `interstitial-captcha`

The `interstitial-captcha` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `interstitial-captcha` screen.

### 1. Create the Component

Create a component file (e.g., `InterstitialCaptcha.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import { useInterstitialCaptcha } from '@auth0/auth0-acul-react/interstitial-captcha';

const InterstitialCaptchaScreen: React.FC = () => {
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const interstitialCaptcha = useInterstitialCaptcha();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!captcha) {
      setError('Captcha is required.');
      return;
    }
    try {
      await interstitialCaptcha.submitCaptcha({ captcha });
      setSuccess(true);
    } catch {
      setError('Invalid captcha. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Interstitial Captcha
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                Captcha
              </label>
              <div className="mt-1">
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  required
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Captcha
            </button>
          </form>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-2">Captcha submitted successfully!</div>}
        </div>
      </div>
    </div>
  );
};

export default InterstitialCaptchaScreen;
```

### 2. How It Works

1.  **Imports**: We import `useInterstitialCaptcha` and various context hooks from the dedicated `@auth0/auth0-acul-react/interstitial-captcha` entry point.
2.  **Hooks**:
    *   `useInterstitialCaptcha()`: Provides the core screen object with methods like `submit()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.submit(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
