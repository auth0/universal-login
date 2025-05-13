import LoginEmailVerification from '@auth0/auth0-acul-js/login-email-verification';

# Login Email Verification Screen

This screen is displayed during the login flow when a user's email address requires verification. The user is prompted to enter a one-time code that has been sent to their registered email. This SDK provides methods to submit the entered code or to request a new code.

## React Component Example with TailwindCSS

Below is an example of a React component for the Login Email Verification screen, styled with TailwindCSS. It includes:
- An input field for the verification code.
- A "Continue" button to submit the code.
- A "Resend Code" button to request a new code.
- Display of error messages from `transaction.errors`.

```tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';
import LoginEmailVerification, { ContinueWithCodeOptions, ResendCodeOptions } from '@auth0/auth0-acul-js/login-email-verification'; // Adjust path as necessary

const LoginEmailVerificationScreen: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uiMessages, setUiMessages] = useState<{ type: 'error' | 'success', text: string }[]>([]);

  // Instantiate the SDK class for the Login Email Verification screen
  // This should be done once per component instance.
  const [loginEmailVerificationManager] = useState(() => new LoginEmailVerification());
  const { screen, transaction, client } = loginEmailVerificationManager;

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
      const payload: ContinueWithCodeOptions = { code };
      await loginEmailVerificationManager.continueWithCode(payload);
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
      await loginEmailVerificationManager.resendCode(payload);
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

## Usage Examples
### Initialize the SDK Class

First, import and instantiate the class for the screen:

```jsx
import LoginEmailVerification from '@auth0/auth0-acul-js/login-email-verification';

const loginEmailVerificationManager = new LoginEmailVerification();

// You can now access screen data, transaction details, etc.
// For example, to get the page title defined in Auth0 dashboard:
const pageTitle = loginEmailVerificationManager.screen.texts?.title;

// To check for errors from a previous submission attempt:
const errors = loginEmailVerificationManager.transaction.errors;
if (errors && errors.length > 0) {
  errors.forEach(err => console.log(`Error: ${err.message}`));
}
```

### Submit Verification Code

This action is used when the user enters the verification code they received and attempts to continue.
```jsx
import LoginEmailVerification, { ContinueWithCodeOptions } from '@auth0/auth0-acul-js/login-email-verification';

const loginEmailVerificationManager = new LoginEmailVerification();
const userEnteredCode = "123456"; // Example code from user input

const payload: ContinueWithCodeOptions = {
  code: userEnteredCode,
  // You can add any custom options here if needed
  // customParam: "customValue" 
};

async function submitCode() {
  try {
    await loginEmailVerificationManager.continueWithCode(payload);
    // If the submission is successful and the code is valid,
    // Auth0 will typically redirect the user to the next step in the flow.
  } catch (error) {
    // This catch block handles unexpected errors during the submission itself (e.g., network issues).
    // Specific validation errors from Auth0 (like "invalid-code") will be available in
    // `loginEmailVerificationManager.transaction.errors` after the promise resolves or the page reloads.
    console.error('Failed to submit verification code:', error);
  }
}

submitCode();
```

### Resend Verification Code

This action is used when the user requests a new verification code to be sent to their email.

```jsx
import LoginEmailVerification, { ResendCodeOptions } from '@auth0/auth0-acul-js/login-email-verification';

const loginEmailVerificationManager = new LoginEmailVerification();

// Optional: Define any custom options for the resend request
const payload: ResendCodeOptions = {
  // customParam: "anotherCustomValue"
};

async function resendVerificationCode() {
  try {
    await loginEmailVerificationManager.resendCode(payload);
    // A new code will be sent to the user's email.
    // The UI should ideally provide feedback to the user (e.g., "A new code has been sent.").
    // If Auth0 encounters an issue (e.g., "too-many-emails"), it will be reflected in
    // `loginEmailVerificationManager.transaction.errors` after the page re-renders or the promise resolves.
  } catch (error) {
    // Handles unexpected errors during the resend request (e.g., network issues).
    console.error('Failed to resend verification code:', error);
  }
}

resendVerificationCode();
```