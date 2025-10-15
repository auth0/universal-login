# `login-password`

The `login-password` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `login-password` screen.

### 1. Create the Component

Create a component file (e.g., `LoginPassword.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import { useScreen, useTransaction, login, useErrors } from '@auth0/auth0-acul-react/login-password';
import { Logo } from '../../components/Logo';

const LoginPasswordScreen: React.FC = () => {
  const screen = useScreen();
  
  const transaction = useTransaction();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {hasError, errors} = useErrors();
  const username = screen.data?.username || '';

  const handleLoginClick = async () => {
    setIsLoading(true);

    try {
      await login({ username, password });
    } catch (err: any) {
      console.log([err?.message || 'Login failed']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Title */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {screen.texts?.title || 'Enter Your Password'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {screen.texts?.description || `Enter your password for ${username}`}
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLoginClick();
          }}
          className="mt-6 space-y-4"
        >
          {/* Username (prefilled, read-only) */}
          <div>
            <input
              type="text"
              value={username}
              readOnly
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">
              {screen.texts?.passwordPlaceholder || 'Password'}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder={screen.texts?.passwordPlaceholder || 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Continue Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading
                ? (screen.texts?.buttonText ? `${screen.texts.buttonText}...` : 'Continuing...')
                : screen.texts?.buttonText || 'Continue'}
            </button>
          </div>
        </form>

        {/* Links */}
        {screen.links && (
          <>
            {/* Signup */}
            {screen.links.signup && (
              <p className="mt-4 text-center text-sm text-gray-500">
                {screen.texts?.footerText || "Don't have an account?"}{' '}
                <a href={screen.links.signup} className="text-indigo-500 hover:underline">
                  {screen.texts?.signupActionLinkText || 'Sign up'}
                </a>
              </p>
            )}

            {/* Reset Password */}
            {screen.links.reset_password && (
              <p className="mt-2 text-center text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                <a href={screen.links.reset_password}>
                  {screen.texts?.forgotPasswordText || 'Forgot password?'}
                </a>
              </p>
            )}
          </>
        )}

        {/* Errors */}
        {hasError && errors.length > 0 && (
          <div className="mt-4 text-red-600 text-center text-sm">
            {errors.map((error, i) => (
              <p key={i}>{error.message}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPasswordScreen;
```

### 2. How It Works

1.  **Imports**: We import `useLoginPassword` and various context hooks from the dedicated `@auth0/auth0-acul-react/login-password` entry point.
2.  **Hooks**:
    *   `useLoginPassword()`: Provides the core screen object with methods like `login()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.login(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
