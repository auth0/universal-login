# `mfa-push-list`

The `mfa-push-list` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-push-list` screen.

### 1. Create the Component

Create a component file (e.g., `MfaPushList.tsx`) and add the following code:

```tsx
import React from 'react';
import { useMfaPushList, selectMfaPushDevice, goBack } from '@auth0/auth0-acul-react/mfa-push-list';

const MfaPushListScreen: React.FC = () => {
  const mfaPushList = useMfaPushList();
  const { screen, user } = mfaPushList;
  const { enrolledDevices } = user || {};

  const handleSelectDevice = async (deviceIndex: number) => {
    try {
      await selectMfaPushDevice({ deviceIndex });
    } catch (error) {
      console.error('Failed to select device:', error);
    }
  };

  const handleGoBack = async () => {
    try {
      await goBack();
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
              {enrolledDevices.map(({device, id}) => (
                <li key={id} className="mb-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleSelectDevice(id)}
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

### 2. How It Works

1.  **Imports**: We import `useMfaPushList` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-push-list` entry point.
2.  **Hooks**:
    *   `useMfaPushList()`: Provides the core screen object with methods like `selectMfaPushDevice()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.selectMfaPushDevice(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
