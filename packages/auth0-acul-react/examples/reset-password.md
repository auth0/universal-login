# `reset-password`

The `reset-password` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `reset-password` screen.

### 1. Create the Component

Create a component file (e.g., `ResetPassword.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import {
  useScreen,
  useTransaction,
  resetPassword as resetPasswordMethod,
  useErrors,
  usePasswordValidation
} from '@auth0/auth0-acul-react/reset-password';

import { Logo } from '../../components/Logo';

const ResetPasswordScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();

  const [captcha, setCaptcha] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { isValid, results } = usePasswordValidation(password);
  const { errors, hasError, dismiss } = useErrors();

  const handleResetPassword = () => {
    if (!isValid || password !== confirmPassword) {
      return;
    }

    resetPasswordMethod({
      'password-reset': password,
      're-enter-password': confirmPassword,
      ...(screen.isCaptchaAvailable && { captcha })
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-8">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {screen.texts?.title || 'Reset Password'}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {screen.texts?.description || 'Enter your new password below'}
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">
          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Enter your new password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="newPassword"
              value={password}
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!isValid}
              required
              className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${!isValid ? 'border-red-500' : 'border-gray-300'
                }`}
            />

            {password.length > 0 && (
              <div className="mt-2 border border-gray-300 rounded p-3 text-sm">
                <p className="mb-1 text-gray-700">Your password must contain:</p>
                <ul className="list-disc list-inside space-y-1">
                  {results.map((rule) => (
                    <li
                      key={rule.code}
                      className={rule.status === 'valid' ? 'text-green-600' : 'text-gray-700'}
                    >
                      {rule.label}
                      {rule.items && rule.items.length > 0 && (
                        <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                          {rule.items.map((subRule) => (
                            <li
                              key={subRule.code}
                              className={subRule.status === 'valid' ? 'text-green-600' : 'text-gray-700'}
                            >
                              {subRule.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm your new password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {
           hasError && (
             <div className="mt-2 text-sm text-red-600">
               {errors.byField('password').map((error, index) => (
                 <p key={index}>
                  {error.rules && (
                    <ul className="ml-4 list-disc space-y-1">
                      {error.rules.map((rule, idx) => (
                        rule.items && rule.items.length > 0 &&
                        <li key={idx}>
                          {rule.items ? rule.items.map((item, itemIdx) => (
                            item.status !== 'valid' && (
                              <li key={itemIdx}>{ item.label}</li>
                            )
                          )) : rule.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </p>
               ))}
             </div>
           )
          }

          {/* Captcha */}
          {screen.isCaptchaAvailable && (
            <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                Enter the captcha
              </label>
              <img src={screen.captchaImage ?? ''} alt="Captcha" className="mb-2 w-full rounded" />
              <input
                type="text"
                id="captcha"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                placeholder="Enter the captcha"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Continue Button */}
          <div>
            <button
              onClick={handleResetPassword}
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Errors */}
        {transaction.hasErrors && transaction.errors && (
          <div className="mt-4 text-sm text-red-600 text-center">
            {transaction.errors.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
```

### 2. How It Works

1.  **Imports**: We import `useResetPassword` and various context hooks from the dedicated `@auth0/auth0-acul-react/reset-password` entry point.
2.  **Hooks**:
    *   `useResetPassword()`: Provides the core screen object with methods like `resetPassword()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.resetPassword(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
