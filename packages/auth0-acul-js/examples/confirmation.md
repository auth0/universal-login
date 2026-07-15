# Confirmation Screen

This screen is displayed to let users confirm or decline account creation (auto-signup) after OTP verification.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import Confirmation from '@auth0/auth0-acul-js/confirmation';

const ConfirmationScreen: React.FC = () => {
  const confirmationManager = new Confirmation();
  const { screen, transaction: { errors } } = confirmationManager;
  const texts = screen?.texts || {};

  const handleProceedToSignup = async () => {
    await confirmationManager.proceedToSignup();
  };

  const handleGoBack = async () => {
    await confirmationManager.goBack();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">
          {texts.title ?? 'Confirm Account Creation'}
        </h1>

        {texts.description && (
          <p className="text-sm text-gray-600 text-center">
            {texts.description}
          </p>
        )}

        {errors?.length && (
          <div className="mt-2 space-y-1 text-left">
            {errors.map((error, idx) => (
              <p key={idx} className="text-red-600 text-sm">
                {error.message}
              </p>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg w-[45%]"
            onClick={handleGoBack}
          >
            {texts.backButtonText ?? 'Back'}
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-[45%]"
            onClick={handleProceedToSignup}
          >
            {texts.confirmButtonText ?? 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
```

## Usage Examples

### Proceed to Signup

```typescript
import Confirmation from '@auth0/auth0-acul-js/confirmation';

const confirmation = new Confirmation();

// Proceed with account creation after OTP verification
await confirmation.proceedToSignup();
```

### Go Back

```typescript
import Confirmation from '@auth0/auth0-acul-js/confirmation';

const confirmation = new Confirmation();

// Decline auto-signup and return to the login screen without creating an account
await confirmation.goBack();
```
