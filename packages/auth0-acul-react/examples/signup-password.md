# `signup-password`

The `signup-password` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `signup-password` screen.

### 1. Create the Component

Create a component file (e.g., `SignupPassword.tsx`) and add the following code:

```tsx
import React, { useState } from 'react';
import {
  useSignupPassword,
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} from '@auth0/auth0-acul-react/signup-password';

export const SignupPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Main hook for screen logic
  const screen = useSignupPassword();

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
      <h1>SignupPassword</h1>

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

1.  **Imports**: We import `useSignupPassword` and various context hooks from the dedicated `@auth0/auth0-acul-react/signup-password` entry point.
2.  **Hooks**:
    *   `useSignupPassword()`: Provides the core screen object with methods like `signup()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.signup(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.


### Examaple using utility hooks - usePasswordValidation, useErrors

``` tsx
import React, { useState } from 'react';
import { Logo } from '../../components/Logo';
import {
    // Context hooks
    useScreen,
    useTransaction,
    // Submit functions
    signup as signupMethod,
    usePasswordValidation,
    // Common hooks
    useErrors
} from '@auth0/auth0-acul-react/signup-password';

const SignupPasswordScreen: React.FC = () => {
    const screen = useScreen();
    const transaction = useTransaction();
    const { hasError, errors, dismiss } = useErrors();

    // Local state
    const [email] = useState(screen.data?.email || '');
    const [username] = useState(screen.data?.username || '');
    const [phone] = useState(screen.data?.phoneNumber || '');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');

    // Validation hook – same style as signup.tsx
    const { isValid: isPasswordValid, results: passwordResults } =
        usePasswordValidation(password);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        await signupMethod({
            email,
            username,
            phone,
            password,
            captcha: screen.isCaptchaAvailable ? captcha : ''
        });
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
                    {screen.texts?.title || 'Sign up with password'}
                </h1>
                <p className="mt-2 text-sm text-center text-gray-600">
                    {screen.texts?.description || 'Create your account'}
                </p>

                {/* Form */}
                <form onSubmit={handleSignup} className="mt-6 space-y-6">
                    {/* Email */}

                    {email && (

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                disabled
                                placeholder="Enter your email"
                                className="block w-full px-3 py-2 border cursor-not-allowed border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    )}

                    {/* Username */}
                    {
                        username && (


                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Username <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    disabled
                                    placeholder="Enter your email"
                                    className="block w-full px-3 py-2 border cursor-not-allowed border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        )
                    }

                    {/* Phone */}
                    {
                        phone && (


                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Phone <span className="text-gray-500 text-sm">(optional)</span>
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    disabled
                                    placeholder="Enter your phone number"
                                    className="block w-full px-3 py-2 border cursor-not-allowed border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        )
                    }

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
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${password && !isPasswordValid ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />

                        {/* Inline password policy results (identical structure to signup.tsx) */}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Server-side / global errors */}
                {(transaction.hasErrors || hasError) && (
                    <div className="mt-4 text-sm text-white-900 text-left">
                        {errors.map((err, index) => (
                            <p
                                key={`client-${index}`}
                                className="bg-red-500 text-white flex p-2 mt-1 rounded flex-row items-center"
                            >
                                <span>{err.message}</span>
                                <span
                                    className="ml-auto cursor-pointer"
                                    onClick={() => dismiss(err.id)}
                                >
                                    &#x2715;
                                </span>
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignupPasswordScreen;

```