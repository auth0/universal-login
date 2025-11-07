# `login-id`

The `login-id` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `login-id` screen.

### 1. Create the Component

Create a component file (e.g., `LoginId.tsx`) and add the following code:

```tsx
import React, { useRef, useState, useMemo } from 'react';
import { useScreen, useTransaction, login, federatedLogin, passkeyLogin, useLoginIdentifiers } from '@auth0/auth0-acul-react/login-id';
import { Logo } from '../../components/Logo';

const LoginIdScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const activeIdentifiers = useLoginIdentifiers();

  const identifierLabel = useMemo(() => {
    if (activeIdentifiers?.length === 1) return `Enter your ${activeIdentifiers[0]}`;
    return `Enter your ${activeIdentifiers?.join(" or ")}`;
  }, [activeIdentifiers]);

  const handleLoginClick = async () => {
    const username = usernameRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';
    const captcha = captchaRef.current?.value ?? '';

    setIsLoading(true);
    setErrorMessages([]);

    try {
      await login({ username, password, captcha });
    } catch (err: any) {
      setErrorMessages([err?.message || 'Login failed']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFederatedLogin = async (connection: string) => {
    setErrorMessages([]);
    try {
      await federatedLogin({ connection });
    } catch (err: any) {
      setErrorMessages([err?.message || 'Federated login failed']);
    }
  };

  const handlePasskeyLogin = async () => {
    setErrorMessages([]);
    try {
      await passkeyLogin({});
    } catch (err: any) {
      setErrorMessages([err.message || 'Passkey login failed']);
    }
  };

  const isCaptchaAvailable = (screen as any).isCaptchaAvailable || false;
  const alternateConnections = transaction.alternateConnections || [];
  const passkeyEnabled = transaction.isPasskeyEnabled;

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
          {screen.texts?.title || 'Welcome'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {screen.texts?.description || 'Log in to continue to Test-react-app.'}
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLoginClick();
          }}
          className="mt-6 space-y-4"
        >
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="username">
                {identifierLabel}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder={identifierLabel}
                ref={usernameRef}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>



            {isCaptchaAvailable && (
              <div className="mt-4">
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-300">
                  {screen.texts?.captchaCodePlaceholder || 'Enter the code shown above'}
                </label>
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  placeholder={screen.texts?.captchaCodePlaceholder || 'Enter captcha'}
                  ref={captchaRef}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? (screen.texts?.buttonText ? `${screen.texts.buttonText}...` : 'Logging in...') : screen.texts?.buttonText || 'Login'}
            </button>
          </div>
        </form>

        {/* Sign up + reset password links */}
        {screen.links && (
          <>
            <p className="mt-4 text-center text-sm text-gray-500">
              {screen.texts?.footerText || "Don't have an account?"}{' '}
              {screen.links.signup && (
                <a
                  href={screen.signupLink || '#'}
                  className="text-indigo-500 hover:underline"
                >
                  {screen.texts?.signupActionLinkText || 'Sign up'}
                </a>
              )}
            </p>

            {screen.links.reset_password && (
              <p className="mt-2 text-center text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                <a href={screen.links.reset_password}>
                  {screen.texts?.forgotPasswordText || "Can't log in?"}
                </a>
              </p>
            )}
          </>
        )}


        {/* OR separator */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google login */}
        {alternateConnections.map((conn: any) => (
          <button
            key={conn.name}
            onClick={() => handleFederatedLogin(conn.name)}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {/* <img src="/google-icon.svg" alt="" className="h-4 w-4" /> */}
            Continue with {conn.options?.display_name || conn.name}
          </button>
        ))}

        {/* Passkey login */}
        {passkeyEnabled && (
          <button
            onClick={handlePasskeyLogin}
            className="mt-3 w-full rounded-md py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screen.texts?.passkeyButtonText || 'Continue with a passkey'}
          </button>
        )}


        {transaction.hasErrors && errorMessages.length > 0 && (
          <div className="mt-4 text-red-600 text-center text-sm">
            {errorMessages.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginIdScreen;
```

### 2. How It Works

1.  **Imports**: We import `useLoginId` and various context hooks from the dedicated `@auth0/auth0-acul-react/login-id` entry point.
2.  **Hooks**:
    *   `useLoginId()`: Provides the core screen object with methods like `login()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.login(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.

### Examaple using utility hooks - useLoginIdentifiers and error handling

``` tsx
import React, { useState, useMemo } from 'react';
import { useScreen, useTransaction, login, federatedLogin, passkeyLogin, useLoginIdentifiers, useErrors } from '@auth0/auth0-acul-react/login-id';
import { Logo } from '../../components/Logo';

// pickCountryCode
const LoginIdScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const [username, setUsername] = useState('');
  const [captcha, setCaptcha] = useState('');

  const {hasError, errors } = useErrors();

  const [isLoading, setIsLoading] = useState(false);
  const activeIdentifiers = useLoginIdentifiers();

  const identifierLabel = useMemo(() => {
    if (activeIdentifiers?.length === 1) return `Enter your ${activeIdentifiers[0]}`;
    return `Enter your ${activeIdentifiers?.join(" or ")}`;
  }, [activeIdentifiers]);

  const handleLoginClick = async () => {
    setIsLoading(true);

    try {
      await login({ username, captcha });
    } catch (err: any) {
      console.log([err?.message || 'Login failed']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFederatedLogin = async (connection: string) => {
    try {
      await federatedLogin({ connection });
    } catch (err: any) {
      console.log([err?.message || 'Federated login failed']);
    }
  };

  const handlePasskeyLogin = async () => {
    try {
      await passkeyLogin({});
    } catch (err: any) {
      console.log([err.message || 'Passkey login failed']);
    }
  };

  const isCaptchaAvailable = (screen as any).isCaptchaAvailable || false;
  const alternateConnections = transaction.alternateConnections || [];
  const passkeyEnabled = transaction.isPasskeyEnabled;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Title */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {screen.texts?.title || 'Welcome'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {screen.texts?.description || 'Log in to continue to Test-react-app.'}
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLoginClick();
          }}
          className="mt-6 space-y-4"
        >
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="username">
                {identifierLabel}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder={identifierLabel}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>



            {isCaptchaAvailable && (
              <div className="mt-4">
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-300">
                  {screen.texts?.captchaCodePlaceholder || 'Enter the code shown above'}
                </label>
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  placeholder={screen.texts?.captchaCodePlaceholder || 'Enter captcha'}
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? (screen.texts?.buttonText ? `${screen.texts.buttonText}...` : 'Logging in...') : screen.texts?.buttonText || 'Login'}
            </button>
          </div>
        </form>

        {/* Sign up + reset password links */}
        {screen.links && (
          <>
            <p className="mt-4 text-center text-sm text-gray-500">
              {screen.texts?.footerText || "Don't have an account?"}{' '}
              {screen.links.signup && (
                <a
                  href={screen.signupLink || '#'}
                  className="text-indigo-500 hover:underline"
                >
                  {screen.texts?.signupActionLinkText || 'Sign up'}
                </a>
              )}
            </p>

            {screen.links.reset_password && (
              <p className="mt-2 text-center text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                <a href={screen.links.reset_password}>
                  {screen.texts?.forgotPasswordText || "Can't log in?"}
                </a>
              </p>
            )}
          </>
        )}


        {/* OR separator */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google login */}
        {alternateConnections.map((conn: any) => (
          <button
            key={conn.name}
            onClick={() => handleFederatedLogin(conn.name)}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {/* <img src="/google-icon.svg" alt="" className="h-4 w-4" /> */}
            Continue with {conn.options?.display_name || conn.name}
          </button>
        ))}

        {/* Passkey login */}
        {passkeyEnabled && (
          <button
            onClick={handlePasskeyLogin}
            className="mt-3 w-full rounded-md py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screen.texts?.passkeyButtonText || 'Continue with a passkey'}
          </button>
        )}


        {hasErros && errors.length > 0 && (
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

export default LoginIdScreen;

```