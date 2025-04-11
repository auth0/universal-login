import DeviceCodeActivationDenied from '@auth0/auth0-acul-js/device-code-activation-denied';

# Device Code Activation Denied Screen

This screen is displayed when the device code activation is denied.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import DeviceCodeActivationDenied from '@auth0/auth0-acul-js/device-code-activation-denied';

const DeviceCodeActivationDeniedScreen: React.FC = () => {
  const deviceCodeActivationDeniedManager = new DeviceCodeActivationDenied();
  const { client, screen, organization, prompt, transaction } = deviceCodeActivationDeniedManager;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Device Code Activation Denied</h2>
        <p className="mb-4">We are not able to activate your device.</p>
      </div>
    </div>
  );
};

export default DeviceCodeActivationDeniedScreen;
```