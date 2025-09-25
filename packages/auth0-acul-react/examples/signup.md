# `signup`

The `signup` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `signup` screen.

### 1. Create the Component

Create a component file (e.g., `Signup.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import {
  useSignup,
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} from '@auth0/auth0-acul-react/signup';

export const Signup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main hook for screen logic
  const screen = useSignup();

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
      await screen.signup(payload);
      // On success, the core SDK handles redirection.
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>

      {/* TODO: Add form inputs for the 'signup' payload */}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Continue'}
      </button>
    </form>
  );
};
```

### 2. How It Works

1.  **Imports**: We import `useSignup` and various context hooks from the dedicated `@auth0/auth0-acul-react/signup` entry point.
2.  **Hooks**:
    *   `useSignup()`: Provides the core screen object with methods like `signup()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.signup(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.

### Examaple using utility hooks - usePasswordValidation, useUsernameValidation, useSignupIdentifiers, useErrors

``` tsx
import React, { useState } from 'react';
import {
  // Context hooks
  useScreen,
  useTransaction,
  // Submit functions
  signup as signupMethod,
  federatedSignup,
  // Utility hooks
  usePasswordValidation,
  useSignupIdentifiers,
  useUsernameValidation,
  useErrors
} from '@auth0/auth0-acul-react/signup';
import { Logo } from '../../components/Logo';

const SignupScreen: React.FC = () => {
  const screen = useScreen();
  const transaction = useTransaction();

  const identifiers = useSignupIdentifiers();
  const federatedConnections = transaction.alternateConnections ?? [];

  // Local state
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');

  const [touched, setTouched] = useState(false);

  // Validation hooks
  const { isValid: isPasswordValid, results: passwordResults } =
    usePasswordValidation(password, { includeInErrors: true });
  const { isValid: isUsernameValid, errors: usernameResults } =
    useUsernameValidation(username, { includeInErrors: true });
  const { hasError, errors, dismiss } = useErrors();

  const handleSignup = () => {
    if (!isPasswordValid || !isUsernameValid) {
      return;
    }
    signupMethod({
      username,
      email,
      phoneNumber,
      password,
      captcha: screen.isCaptchaAvailable ? captcha : ''
    });
  };

  const handleFederatedSignup = (connectionName: string) => {
    federatedSignup({ connection: connectionName });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {screen.texts?.title || 'Sign up'}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {screen.texts?.description || 'Create your account'}
        </p>

        {/* Form */}
        <div className="mt-6 space-y-6">
          {/* Email */}
          {identifiers?.find((id) => id.type === 'email') && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email{' '}
                {identifiers.find((id) => id.type === 'email')?.required ? (
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
                required={identifiers.find((id) => id.type === 'email')?.required}
                placeholder="Enter your email"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Username */}
          {identifiers?.find((id) => id.type === 'username') && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username{' '}
                {identifiers.find((id) => id.type === 'username')?.required ? (
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
                required={identifiers.find((id) => id.type === 'username')?.required}
                placeholder="Enter your username"
                onFocus={() => setTouched(true)}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${username && !isUsernameValid ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {/* Inline username validation messages */}
              {username.length > 0 && usernameResults.length > 0 && (
                <ul className="mt-1 text-sm text-red-500">
                  {usernameResults.map((err, i) => (
                    <li key={i}>{err.message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Phone */}
          {identifiers?.find((id) => id.type === 'phone') && (
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone number{' '}
                {identifiers.find((id) => id.type === 'phone')?.required ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-gray-500 text-sm">(optional)</span>
                )}
              </label>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required={identifiers.find((id) => id.type === 'phone')?.required}
                placeholder="Enter your phone number"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              onFocus={() => setTouched(true)}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${password && !isPasswordValid ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {/* Show checklist only when user types - from usePasswordValidation */}
            {password.length > 0 && passwordResults.length > 0 && (
              <div className="mt-2 border border-gray-300 rounded p-3 text-sm">
                <p className="mb-1 text-gray-700">Your password must contain:</p>
                <ul className="list-disc list-inside space-y-1">
                  {passwordResults.map((rule) => (
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

          {/* Captcha */}
          {screen.isCaptchaAvailable && (
            <div>
              <label
                htmlFor="captcha"
                className="block text-sm font-medium text-gray-700"
              >
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

          {/* Continue Button */}
          <button
            onClick={handleSignup}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue
          </button>
        </div>

        {/* Federated Signup */}
        {federatedConnections.length > 0 && (
          <div className="mt-5">
            <p className="text-left text-gray-600 mb-3">Or continue with</p>
            {federatedConnections.map((connection) => (
              <button
                key={connection.name}
                onClick={() => handleFederatedSignup(connection.name)}
                className="w-full mb-2 py-2 px-4 border border-gray-300 rounded-md text-sm text-center font-medium text-gray-700 hover:bg-gray-100"
              >
                Continue with {connection.name}
              </button>
            ))}
          </div>
        )}

        {/* Login Link */}
        {screen.links?.loginLink && (
          <div className="mt-6 text-center text-sm">
            <a
              href={screen.links.loginLink}
              className="text-indigo-600 hover:underline"
            >
              Already have an account? Log in
            </a>
          </div>
        )}

        {hasError && touched && (
          <div className="mt-2 text-sm text-red-600 space-y-3">
            {errors.map((error, index) => (
              <div
                key={index}
                className="border border-red-300 bg-red-50 p-3 rounded relative"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-red-800 mb-1">{error.message}</p>

                    {error.rules && (
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        {error.rules.map(
                          (rule, idx) =>
                            !rule.isValid && (
                              <li key={idx}>
                                {rule.label}

                                {rule.items && rule.items.length > 0 && (
                                  <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                    {rule.items.map(
                                      (item, itemIdx) =>
                                        item.status !== 'valid' && (
                                          <li key={itemIdx}>{item.label}</li>
                                        )
                                    )}
                                  </ul>
                                )}
                              </li>
                            )
                        )}
                      </ul>
                    )}
                  </div>

                  <button
                    onClick={() => dismiss(error.id)}
                    className="ml-4 text-red-500 hover:text-red-700 text-lg leading-none"
                    aria-label="Dismiss error"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SignupScreen;
```