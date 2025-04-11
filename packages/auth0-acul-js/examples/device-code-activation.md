import DeviceCodeActivation from '@auth0/auth0-acul-js/device-code-activation';

# Device Code Activation Screen

This screen is displayed when a user needs to enter a code on their device to activate it.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import DeviceCodeActivationScreen from './DeviceCodeActivationScreen';

const DeviceCodeActivationExample: React.FC = () => {
  return (
    <DeviceCodeActivationScreen />
  );
};

export default DeviceCodeActivationExample;
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