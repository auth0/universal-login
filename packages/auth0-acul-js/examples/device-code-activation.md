import DeviceCodeActivation from '@auth0/auth0-acul-js/device-code-activation';

# Device Code Activation Screen

This screen is displayed when a user needs to enter a code on their device to activate it.

## React Component Example with TailwindCSS

```tsx
import React, { useState } from 'react';
import DeviceCodeActivation from '@auth0/auth0-acul-js/device-code-activation';

const DeviceCodeActivationScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const deviceCodeActivationManager = new DeviceCodeActivation();
  const { screen, transaction: { errors } } = deviceCodeActivationManager;
  const texts = screen.texts ?? {};

  const handleContinue = () => {
    deviceCodeActivationManager.continue({ code });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {texts.title ?? 'Device Activation'}
        </h2>
        <p className="text-sm text-gray-700 mb-4 text-center">
          {texts.description ?? 'Enter the code displayed on your device'}
        </p>

        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
          id="code"
          type="text"
          placeholder={texts.placeholder ?? 'Enter your one-time code'}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {errors?.length && (
          <div className="mb-4 space-y-1">
            {errors.map((err, index) => (
              <p key={index} className="text-red-600 text-sm">
                {err.message}
              </p>
            ))}
          </div>
        )}

        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleContinue}
        >
          {texts.buttonText ?? 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default DeviceCodeActivationScreen;
```

## Usage Examples

### Continue with Code

```typescript
import DeviceCodeActivation from '@auth0/auth0-acul-js/device-code-activation';

const deviceCodeActivation = new DeviceCodeActivation();

deviceCodeActivation.continue({
  code: 'HXNL-XWMT',
});
```