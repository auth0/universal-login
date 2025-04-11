import DeviceCodeActivationAllowed from '@auth0/auth0-acul-js/device-code-activation-allowed';

# Device Code Activation Allowed Screen

This screen is displayed when the device code activation is allowed.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import DeviceCodeActivationAllowed from '@auth0/auth0-acul-js/device-code-activation-allowed';

const DeviceCodeActivationAllowedScreen: React.FC = () => {
  const deviceCodeActivationAllowedManager = new DeviceCodeActivationAllowed();
  const { client, screen, organization, prompt, transaction } = deviceCodeActivationAllowedManager;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Device Code Activation Allowed</h2>
        <p className="mb-4">Client ID: {client.id}</p>
        <p className="mb-4">Client Name: {client.name}</p>
        {organization?.id && <p className="mb-4">Organization ID: {organization.id}</p>}
        <p className="mb-4">Prompt Name: {prompt.name}</p>
        <p className="mb-4">Transaction State: {transaction.state}</p>
        <p className="mb-4">Screen Name: {screen.name}</p>
      </div>
    </div>
  );
};

export default DeviceCodeActivationAllowedScreen;
```