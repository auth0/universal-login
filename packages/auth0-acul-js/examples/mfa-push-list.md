# MFA Push List Screen

This screen is displayed when the user has multiple enrolled devices for MFA push authentication and needs to select one.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';

const MfaPushListScreen: React.FC = () => {
  const mfaPushList = new MfaPushList();
  const { screen, user } = mfaPushList;
  const { enrolledDevices } = user || {};

  const handleSelectDevice = async (deviceIndex: number) => {
    try {
      await mfaPushList.selectMfaPushDevice({ deviceIndex });
    } catch (error) {
      console.error('Failed to select device:', error);
    }
  };

  const handleGoBack = async () => {
    try {
      await mfaPushList.goBack();
    } catch (error) {
      console.error('Failed to go back:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">{ screen.texts?.title ?? 'Select a Device for MFA Push' } </h2>
        <p className="mb-4"> { screen.texts?.description } </p>
        {
          enrolledDevices && enrolledDevices.length > 0 ? (
            <ul className="mb-4">
              {enrolledDevices.map((device, index) => (
                <li key={index} className="mb-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleSelectDevice(index)}
                  >
                    {device}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No enrolled devices found.</p>
          )
        }
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MfaPushListScreen;
```

## Usage Examples

### Select MFA Push Device

```typescript
import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';

const mfaPushList = new MfaPushList();

const enrolledDevices = mfaSmsList.user.enrolledDevices;
// select any device from list, for demonstration we will pick up first device
const selectedEmail = enrolledDevices[0]

// Select the first device (index 0)
await mfaPushList.selectMfaPushDevice({ deviceIndex: 0 });
```

### Go Back

```typescript
import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';

const mfaPushList = new MfaPushList();

// Navigate back to the previous screen
await mfaPushList.goBack();
```
