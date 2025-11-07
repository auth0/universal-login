# `signup-id`

The `signup-id` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `signup-id` screen.

### 1. Create the Component

Create a component file (e.g., `SignupId.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import {
  // Context hooks
  useScreen,
  useTransaction,
  // Utility hooks
  useSignupIdentifiers,
  useErrors,
  useUsernameValidation,
  // Submit functions
  signup,
  federatedSignup,
} from '@auth0/auth0-acul-react/signup-id';
import { Logo } from '../../components/Logo';

const SignupIdScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const identifiers = useSignupIdentifiers();
  const { hasError, errors, dismiss } = useErrors();
  const federatedConnections = transaction.alternateConnections ?? [];

  // Local form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [captcha, setCaptcha] = useState('');

  const { isValid: isUsernameValid, errors: usernameResults } =
    useUsernameValidation(username);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({
      username,
      email,
      phone,
      captcha: screen.isCaptchaAvailable ? captcha : ''
    });
  };

  const handleFederatedSignup = (connectionName: string) => {
    federatedSignup({ connection: connectionName });
  };

  // Precompute required flags to simplify JSX
  const usernameId = identifiers?.find((id) => id.type === 'username');
  const emailId = identifiers?.find((id) => id.type === 'email');
  const phoneId = identifiers?.find((id) => id.type === 'phone');

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title and Description */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {screen.texts?.title || 'Sign up for an account'}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {screen.texts?.description || 'Create your account'}
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="mt-6 space-y-6">
          {/* Username */}
          {usernameId && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username{' '}
                {usernameId.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={usernameId.required}
                placeholder="Enter your username"
                className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${username && !isUsernameValid ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {username.length > 0 && usernameResults.length > 0 && (
                <ul className="mt-1 text-sm text-red-500">
                  {usernameResults.map((err, i) => (
                    <li key={i}>{err.message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Email */}
          {emailId && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email{' '}
                {emailId.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={emailId.required}
                placeholder="Enter your email"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Phone */}
          {phoneId && (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone{' '}
                {phoneId.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={phoneId.required}
                placeholder="Enter your phone number"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Captcha */}
          {screen.isCaptchaAvailable && (
            <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                Captcha
              </label>
              {screen.captchaImage && (
                <img
                  src={screen.captchaImage}
                  alt="Captcha"
                  className="mb-2 m-auto w-[200px] rounded"
                />
              )}
              <input
                id="captcha"
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                placeholder="Enter the captcha"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Client-side ACUL errors */}
          {hasError && (
            <div className="text-sm mt-2 space-y-1">
              {errors.map((err) => (
                <p
                  key={err.id}
                  className="bg-red-500 text-white flex items-center justify-between px-3 py-2 rounded"
                >
                  <span>{err.message}</span>
                  <button
                    type="button"
                    onClick={() => dismiss(err.id)}
                    className="ml-2 font-bold hover:opacity-80"
                  >
                    &times;
                  </button>
                </p>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        {screen.links?.login && (
          <div className="mt-6 text-center text-sm">
            <a
              href={screen.links.login}
              className="text-indigo-600 hover:underline"
            >
              Already have an account? Log in
            </a>
          </div>
        )}

        {/* OR separator */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google login */}
        {federatedConnections.length > 0 && federatedConnections.map((conn: any) => (
          <button
            key={conn.name}
            onClick={() => handleFederatedSignup(conn.name)}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {/* <img src="/google-icon.svg" alt="" className="h-4 w-4" /> */}
            Continue with {conn.options?.display_name || conn.name}
          </button>
        ))}

        {/* Server-side transaction errors */}
        {transaction.hasErrors && transaction.errors && (
          <div className="mt-4 text-sm text-red-600 space-y-1">
            {transaction.errors.map((err, index) => (
              <p key={index}>{err.message}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupIdScreen;
```

### 2. How It Works

1.  **Imports**: We import `useSignupId` and various context hooks from the dedicated `@auth0/auth0-acul-react/signup-id` entry point.
2.  **Hooks**:
    *   `useSignupId()`: Provides the core screen object with methods like `signup()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.signup(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.


### Examaple using utility hooks - useUsernameValidation, useSignupIdentifiers, useErrors

```tsx

import React, { useState } from 'react';
import {
  // Context hooks
  useScreen,
  useTransaction,
  // Utility hooks
  useSignupIdentifiers,
  useErrors,
  useUsernameValidation,
  // Submit functions
  signup,
  federatedSignup,
} from '@auth0/auth0-acul-react/signup-id';
import { Logo } from '../../components/Logo';

const SignupIdScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();
  const identifiers = useSignupIdentifiers();
  const { hasError, errors, dismiss } = useErrors();
  const federatedConnections = transaction.alternateConnections ?? [];

  // Local form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [captcha, setCaptcha] = useState('');

  const { isValid: isUsernameValid, errors: usernameResults } =
    useUsernameValidation(username);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({
      username,
      email,
      phone,
      captcha: screen.isCaptchaAvailable ? captcha : ''
    });
  };

  const handleFederatedSignup = (connectionName: string) => {
    federatedSignup({ connection: connectionName });
  };

  // Precompute required flags to simplify JSX
  const usernameId = identifiers?.find((id) => id.type === 'username');
  const emailId = identifiers?.find((id) => id.type === 'email');
  const phoneId = identifiers?.find((id) => id.type === 'phone');

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title and Description */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {screen.texts?.title || 'Sign up for an account'}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {screen.texts?.description || 'Create your account'}
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="mt-6 space-y-6">
          {/* Username */}
          {usernameId && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username{' '}
                {usernameId.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={usernameId.required}
                placeholder="Enter your username"
                className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${username && !isUsernameValid ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {username.length > 0 && usernameResults.length > 0 && (
                <ul className="mt-1 text-sm text-red-500">
                  {usernameResults.map((err, i) => (
                    <li key={i}>{err.message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Email */}
          {emailId && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email{' '}
                {emailId.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={emailId.required}
                placeholder="Enter your email"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Phone */}
          {phoneId && (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone{' '}
                {phoneId.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={phoneId.required}
                placeholder="Enter your phone number"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Captcha */}
          {screen.isCaptchaAvailable && (
            <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                Captcha
              </label>
              {screen.captchaImage && (
                <img
                  src={screen.captchaImage}
                  alt="Captcha"
                  className="mb-2 m-auto w-[200px] rounded"
                />
              )}
              <input
                id="captcha"
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                placeholder="Enter the captcha"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Client-side ACUL errors */}
          {hasError && (
            <div className="text-sm mt-2 space-y-1">
              {errors.map((err) => (
                <p
                  key={err.id}
                  className="bg-red-500 text-white flex items-center justify-between px-3 py-2 rounded"
                >
                  <span>{err.message}</span>
                  <button
                    type="button"
                    onClick={() => dismiss(err.id)}
                    className="ml-2 font-bold hover:opacity-80"
                  >
                    &times;
                  </button>
                </p>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        {screen.links?.login && (
          <div className="mt-6 text-center text-sm">
            <a
              href={screen.links.login}
              className="text-indigo-600 hover:underline"
            >
              Already have an account? Log in
            </a>
          </div>
        )}

        {/* OR separator */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google login */}
        {federatedConnections.length > 0 && federatedConnections.map((conn: any) => (
          <button
            key={conn.name}
            onClick={() => handleFederatedSignup(conn.name)}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {/* <img src="/google-icon.svg" alt="" className="h-4 w-4" /> */}
            Continue with {conn.options?.display_name || conn.name}
          </button>
        ))}

        {/* Server-side transaction errors */}
        {transaction.hasErrors && transaction.errors && (
          <div className="mt-4 text-sm text-red-600 space-y-1">
            {transaction.errors.map((err, index) => (
              <p key={index}>{err.message}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupIdScreen;


```