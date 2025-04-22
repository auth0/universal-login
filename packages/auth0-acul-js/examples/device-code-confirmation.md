import DeviceCodeConfirmation from '@auth0/auth0-acul-js/device-code-confirmation';

# Device Code Confirmation Screen

This screen is displayed when a user needs to confirm the device code.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import DeviceCodeConfirmation from '@auth0/auth0-acul-js/device-code-confirmation';

const DeviceCodeConfirmationScreen: React.FC = () => {
  const deviceCodeConfirmationManager = new DeviceCodeConfirmation();
  const { screen, transaction: { errors } } = deviceCodeConfirmationManager;
  const texts = screen?.texts || {};

  const handleConfirm = async () => {
    await deviceCodeConfirmationManager.confirm();
  };

  const handleCancel = async () => {
    await deviceCodeConfirmationManager.cancel();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">
          {texts.title ?? 'Device Confirmation'}
        </h1>

        {texts.description && (
          <p className="text-sm text-gray-600 text-center">
            {texts.description}
          </p>
        )}

        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            {texts.inputCodeLabel ?? 'Secure code'}
          </label>
          <input
            type="text"
            disabled
            value={screen?.data?.textCode ?? ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        {texts.confirmationText && (
          <p className="text-xs text-gray-500 text-center mt-2">
            {texts.confirmationText}
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
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg w-[45%]"
            onClick={handleCancel}
          >
            {texts.cancelButtonText ?? 'Cancel'}
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-[45%]"
            onClick={handleConfirm}
          >
            {texts.confirmButtonText ?? 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceCodeConfirmationScreen;
```

## Usage Examples

### Confirm Device Code

```typescript
import DeviceCodeConfirmation from '@auth0/auth0-acul-js/device-code-confirmation';

const deviceCodeConfirmation = new DeviceCodeConfirmation();

// Confirm the device code
await deviceCodeConfirmation.confirm();
```

### Cancel Device Code

```typescript
import DeviceCodeConfirmation from '@auth0/auth0-acul-js/device-code-confirmation';

const deviceCodeConfirmation = new DeviceCodeConfirmation();

// Cancel the device code flow
await deviceCodeConfirmation.cancel();
```
