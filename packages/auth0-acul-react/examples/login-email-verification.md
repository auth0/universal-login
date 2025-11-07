# `login-email-verification`

The `login-email-verification` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `login-email-verification` screen.

### 1. Create the Component

Create a component file (e.g., `LoginEmailVerification.tsx`) and add the following code:

```tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';
import type  { ContinueWithCodeOptionPayload, ResendCodeOptions } from '@auth0/auth0-acul-react/types'; // Adjust path as necessary
import { continueWithCode, resendCode, useLoginEmailVerification} from '@auth0/auth0-acul-react/login-email-verification';

const LoginEmailVerificationScreen: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uiMessages, setUiMessages] = useState<{ type: 'error' | 'success', text: string }[]>([]);

  // Instantiate the SDK class for the Login Email Verification screen
  // This should be done once per component instance.
  const { screen, transaction, client } = useLoginEmailVerification();

  /**
   * Handles the change in the code input field.
   */
  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value);
  };

  /**
   * Handles the submission of the verification code.
   */
  const handleSubmitCode = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!code.trim()) {
      setUiMessages([{ type: 'error', text: screen.texts?.noCodeError || 'Please enter a code.' }]);
      return;
    }
    setIsSubmitting(true);
    setUiMessages([]); // Clear previous messages

    try {
      const payload: ContinueWithCodeOptionPayload = { code };
      await continueWithCode(payload);
      // On successful submission, Auth0 typically handles redirection.
      // If the page reloads with errors (e.g., invalid code), the useEffect hook will update uiMessages.
    } catch (error: any) {
      // Handles unexpected errors (e.g., network issues during form submission)
      setUiMessages([{ type: 'error', text: error.message || 'An unexpected error occurred. Please try again.' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles the request to resend the verification code.
   */
  const handleResendCode = async (): Promise<void> => {
    setIsSubmitting(true);
    setUiMessages([]); // Clear previous messages

    try {
      const payload: ResendCodeOptions = {}; // Add custom options if needed
      await resendCode(payload);
      // UI can show a confirmation that the code has been resent.
      setUiMessages([{type: 'success', text: screen.texts?.codeResentMessage || 'A new verification code has been sent to your email.'}]);
    } catch (error: any) {
      setUiMessages([{ type: 'error', text: error.message || 'Failed to resend code. Please try again.' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extract texts for UI elements, providing default fallbacks
  const texts = screen?.texts ?? {};
  const title = texts.title ?? 'Verify Your Email';
  const description = texts.description ?? `We've sent a verification code to your email address. Please enter it below to continue.`;
  const codeLabel = texts.codeLabel ?? 'Verification Code';
  const codePlaceholder = texts.codePlaceholder ?? 'Enter 6-digit code';
  const continueButtonText = texts.buttonText ?? 'Continue';
  const resendButtonText = texts.resendActionText ?? 'Resend Code';
  const submittingText = texts.submittingText ?? 'Processing...';


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        {client.logoUrl && (
          <img 
            src={client.logoUrl} 
            alt={client.name || 'Client Logo'} 
            className="mx-auto h-12 w-auto mb-6" // Adjusted size
          />
        )}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {description}
          </p>
        </div>

        <form onSubmit={handleSubmitCode} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              {codeLabel}
            </label>
            <input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={code}
              onChange={handleCodeChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                         sm:text-sm transition duration-150 ease-in-out"
              placeholder={codePlaceholder}
              disabled={isSubmitting}
            />
          </div>

          {/* Display errors from the transaction object (e.g., invalid state) */}
          {transaction.errors && transaction.errors.length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              {transaction.errors.map((err, index) => (
                <p key={`tx-error-${index}`}>{err.message}</p>
              ))}
            </div>
          )}

          {/* Display errors/success caught during form submission */}
          {uiMessages.length > 0 && (
            <div className="space-y-2">
              {uiMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  role="alert"
                  className={`p-4 rounded-md text-sm ${
                    msg.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 
                                           'bg-green-50 text-green-700 border border-green-200'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting || !code.trim()}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm 
                         text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                         disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            >
              {isSubmitting ? submittingText : continueButtonText}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isSubmitting}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 
                       disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            {isSubmitting ? submittingText : resendButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginEmailVerificationScreen;
```

### 2. How It Works

1.  **Imports**: We import `useLoginEmailVerification` and various context hooks from the dedicated `@auth0/auth0-acul-react/login-email-verification` entry point.
2.  **Hooks**:
    *   `useLoginEmailVerification()`: Provides the core screen object with methods like `continueWithCode()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.continueWithCode(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
