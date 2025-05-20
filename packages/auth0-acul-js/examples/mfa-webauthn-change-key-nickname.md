import MfaWebAuthnChangeKeyNickname, {
  type ContinueOptions,
  type ScreenMembersOnMfaWebAuthnChangeKeyNickname
} from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname';

# MFA WebAuthn Change Key Nickname Screen

This screen allows users to change the nickname of an existing WebAuthn (FIDO) security key. This is useful for users to better identify their keys if they have multiple registered.

The SDK provides:
- Access to the `screen.data.nickname` which holds the *current* nickname of the key.
- A method `continueWithNewNickname({ nickname: newNickname })` to submit the *new* desired nickname.
- Access to `transaction.errors` which will contain any validation errors from the server (e.g., nickname too short, too long, or required).

## React Component Example with TailwindCSS

This example demonstrates a React component for the "MFA WebAuthn Change Key Nickname" screen, styled with TailwindCSS. It allows users to view the current nickname and input a new one.

```tsx
import React, { useState, useMemo, useCallback, FormEvent, ChangeEvent } from 'react';
import MfaWebAuthnChangeKeyNickname, {
  type ContinueOptions,
  type ScreenMembersOnMfaWebAuthnChangeKeyNickname
} from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname'; // Adjust path as necessary

const MfaWebAuthnChangeKeyNicknameComponent: React.FC = () => {
  // Instantiate the SDK class for the screen. Memoized to avoid re-creation on re-renders.
  const sdk = useMemo(() => new MfaWebAuthnChangeKeyNickname(), []);

  const { client, screen, transaction } = sdk;
  const currentNickname = screen.data?.nickname ?? 'Unknown Key';
  const texts = screen.texts ?? {};

  const [newNickname, setNewNickname] = useState<string>(screen.data?.nickname ?? '');
  const [isLoading, setIsLoading] = useState(false);
  // Use transaction.errors directly for server-side errors.
  // Local UI errors can be handled separately if needed (e.g., before submission).
  const [uiError, setUiError] = useState<string | null>(null);


  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewNickname(event.target.value);
    // Clear UI error when user types
    if (uiError) setUiError(null);
  };

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setUiError(null); // Clear previous UI errors

    if (!newNickname.trim()) {
        setUiError(texts.noNicknameError ?? 'Nickname cannot be empty.');
        setIsLoading(false);
        return;
    }

    try {
      const opts: ContinueOptions = { nickname: newNickname };
      await sdk.continueWithNewNickname(opts);
      // On successful submission, Auth0 typically handles redirection.
      // If the page reloads due to an error (e.g. validation error from server),
      // the `transaction.errors` object will be populated.
    } catch (err: any) {
      // This catch block is for unexpected errors during the SDK call itself (e.g. network error)
      // not for server-side validation errors which are in `transaction.errors`.
      setUiError(`Failed to update nickname: ${err.message || 'Please try again.'}`);
    } finally {
      // Only set isLoading to false if no redirect is expected or on error.
      // If a redirect happens, this component might unmount.
      // If the page re-renders with errors, transaction.errors will be updated.
      setIsLoading(false);
    }
  }, [sdk, newNickname, texts]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 antialiased">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        {client.logoUrl && (
          <img src={client.logoUrl} alt={client.name ?? 'Client Logo'} className="mx-auto h-12 mb-6" />
        )}

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {texts.title ?? 'Change Security Key Nickname'}
          </h1>
          <p className="mt-2 text-gray-600">
            {texts.description ?? `Update the nickname for your security key. The current nickname is "${currentNickname}".`}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="current-nickname" className="block text-sm font-medium text-gray-700">
              {texts.currentNicknameLabel ?? 'Current Nickname'}
            </label>
            <input
              id="current-nickname"
              type="text"
              value={currentNickname}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         bg-gray-100 text-gray-500 cursor-not-allowed
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="new-nickname" className="block text-sm font-medium text-gray-700">
              {texts.newNicknameLabel ?? 'New Nickname'}
            </label>
            <input
              id="new-nickname"
              name="nickname" // Important for form submission if not using JS for everything
              type="text"
              value={newNickname}
              onChange={handleNicknameChange}
              required
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm 
                         placeholder-gray-400 focus:outline-none focus:ring-indigo-500 
                         focus:border-indigo-500 sm:text-sm 
                         ${(transaction.errors?.some(e => e.field === 'nickname') || uiError) ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={texts.newNicknamePlaceholder ?? 'Enter new nickname'}
              aria-describedby="nickname-error"
            />
          </div>

          {/* Display transaction errors (e.g., from server validation) */}
          {transaction.errors && transaction.errors.length > 0 && (
            <div id="nickname-error" className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md text-left" role="alert">
              <p className="font-bold">{texts.alertListTitle ?? 'Please correct the following errors:'}</p>
              <ul className="list-disc list-inside">
                {transaction.errors.map((err, index) => (
                  <li key={`tx-err-${index}`}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Display UI-specific errors (e.g., client-side validation, unexpected SDK errors) */}
          {uiError && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative text-left" role="alert">
              <span className="block sm:inline">{uiError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || newNickname === currentNickname}
            className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent 
                       rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                       disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (texts.buttonText ?? 'Save Nickname')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MfaWebAuthnChangeKeyNicknameComponent;
```

## Usage Examples

### Initialize the SDK Class

First, import and instantiate the class for the screen:

```typescript
import MfaWebAuthnChangeKeyNickname from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname';

const sdk = new MfaWebAuthnChangeKeyNickname();

// Access the current nickname
const currentNickname = sdk.screen.data?.nickname;
console.log('Current security key nickname:', currentNickname);

// Access any server-side validation errors from a previous attempt
if (sdk.transaction.errors) {
  sdk.transaction.errors.forEach(error => {
    console.error(`Error: ${error.message} (Field: ${error.field}, Code: ${error.code})`);
  });
}
```

### Submit the New Nickname

This action is used when the user enters a new nickname and attempts to save it.

```typescript
import MfaWebAuthnChangeKeyNickname, { type ContinueOptions } from '@auth0/auth0-acul-js/mfa-webauthn-change-key-nickname';

const sdk = new MfaWebAuthnChangeKeyNickname();
const userEnteredNewNickname = "My Main Security Key"; // Example from user input

async function updateNickname() {
  const options: ContinueOptions = {
    nickname: userEnteredNewNickname,
    // customParam: "anyValue" // if needed for your specific flow
  };

  try {
    await sdk.continueWithNewNickname(options);
    // If the submission is successful and the nickname is valid,
    // Auth0 will typically redirect the user.
  } catch (error: any) {
    // This catch block handles unexpected errors during the submission itself (e.g., network issues).
    // Specific validation errors from Auth0 (like "nickname-too-long") will be available in
    // `sdk.transaction.errors` after the promise resolves or the page reloads.
    console.error('Failed to submit new nickname:', error.message);
    // Display a generic error message to the user in the UI.
  }
}

// Call this function when the user clicks the "Save" or "Continue" button.
// updateNickname();
```