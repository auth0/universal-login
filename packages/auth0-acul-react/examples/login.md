# `login`

The `login` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `login` screen.

### 1. Create the Component

Create a component file (e.g., `Login.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import {
  useLogin,
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} from '@auth0/auth0-acul-react/login';

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main hook for screen logic
  const screen = useLogin();

  // Context hooks
  const userData = useUser();
  const tenantData = useTenant();
  const brandingData = useBranding();
  const clientData = useClient();
  const organizationData = useOrganization();
  const promptData = usePrompt();
  const untrusteddataData = useUntrustedData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Gather data from form inputs
      const payload = {};
      await screen.login(payload);
      // On success, the core SDK handles redirection.
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      {/* TODO: Add form inputs for the 'login' payload */}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Continue'}
      </button>
    </form>
  );
};
```

### 2. How It Works

1.  **Imports**: We import `useLogin` and various context hooks from the dedicated `@auth0/auth0-acul-react/login` entry point.
2.  **Hooks**:
    *   `useLogin()`: Provides the core screen object with methods like `login()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.login(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.

### Examaple using utility hooks - useLoginIdentifiers and error handling

``` tsx
import React, { useState, useMemo } from "react";
import { Logo } from "../../components/Logo";
import {
  useScreen,
  useTransaction,
  login,
  federatedLogin,
  useLoginIdentifiers,
  useErrors
} from "@auth0/auth0-acul-react/login";

const LoginScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
   // error-handling
  const { hasError, errors, dismiss } = useErrors();

  const [loading, setLoading] = useState(false);

  const activeIdentifiers = useLoginIdentifiers();
  const federatedConnections = transaction.alternateConnections ?? [];

  const identifierLabel = useMemo(() => {
    if (activeIdentifiers?.length === 1) return `Enter your ${activeIdentifiers[0]}`;
    return `Enter your ${activeIdentifiers?.join(" or ")}`;
  }, [activeIdentifiers]);

  const handleLogin = async () => {
    setLoading(true);

    try {
      await login({
        username,
        password,
        captcha: screen.isCaptchaAvailable ? captcha : "",
      });
    } catch (err: any) {
      console.log("Error")
    } finally {
      setLoading(false);
    }
  };

  const handleFederatedLogin = async (connection: string) => {
    try {
      await federatedLogin({ connection });
    } catch (err: any) {
      console.log([err?.message || "Federated login failed"]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-8">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {screen.texts?.title || "Welcome"}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {screen.texts?.description || "Log in to continue"}
        </p>

        {/* Form */}
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* Username / Email / Phone */}
          <div>
            <label htmlFor="username">
              {identifierLabel}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder={identifierLabel}
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Captcha (optional) */}
          {screen.isCaptchaAvailable && (
            <div>
              <img
                src={screen.captchaImage ?? ""}
                alt="Captcha"
                className="mb-2 w-full rounded"
              />
              <input
                id="captcha"
                name="captcha"
                type="text"
                placeholder="Enter captcha"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading
              ? screen.texts?.buttonText
                ? `${screen.texts.buttonText}...`
                : "Logging in..."
              : screen.texts?.buttonText || "Login"}
          </button>
        </form>

        {/* Federated Logins */}
        {federatedConnections.length > 0 && (
          <div className="mt-6">
            <p className="text-center text-gray-600 mb-2">Or continue with</p>
            {federatedConnections.map((connection) => (
              <button
                key={connection.name}
                onClick={() => handleFederatedLogin(connection.name)}
                className="w-full mb-2 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Continue with {connection.name}
              </button>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex justify-between mt-6 text-sm">
          {screen.signupLink && (
            <a
              href={screen.signupLink}
              className="text-indigo-600 hover:underline"
            >
              Sign up
            </a>
          )}
          {screen.resetPasswordLink && (
            <a
              href={screen.resetPasswordLink}
              className="text-indigo-600 hover:underline"
            >
              Forgot Password?
            </a>
          )}
        </div>

        {/* Errors */}
        { hasError && errors.length > 0 && (
          <div className="mt-4 text-sm text-red-600 text-center">
            {errors.map((error, idx) => (
              <p key={idx}>{error.message}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;

```