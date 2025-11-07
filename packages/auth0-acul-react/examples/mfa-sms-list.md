# `mfa-sms-list`

The `mfa-sms-list` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-sms-list` screen.

### 1. Create the Component

Create a component file (e.g., `MfaSmsList.tsx`) and add the following code:

```tsx
import React from 'react';
import { useMfaSmsList, selectPhoneNumber, backAction } from '@auth0/auth0-acul-react/mfa-sms-list';

const MFASmsListScreen: React.FC = () => {
  const mfaSmsList = useMfaSmsList();
  const { user } = mfaSmsList;

  const handleSelectPhoneNumber = async (index: number) => {
    try {
      await selectPhoneNumber({ index });
    } catch (error) {
      console.error('Failed to select phone number:', error);
    }
  };

  const handleBackAction = async () => {
    try {
      await backAction();
    } catch (error) {
      console.error('Failed to go back:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Select a Phone Number</h2>
        {
          user.enrolledPhoneNumbers ? (
            <ul className="mb-4">
              {user.enrolledPhoneNumbers?.map(({phoneNumber, id}) => (
                <li key={id} className="py-2">
                  <button
                    onClick={() => handleSelectPhoneNumber(id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {phoneNumber}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No phone numbers enrolled.</p>
          )
        }
        <button
          onClick={handleBackAction}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MFASmsListScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaSmsList` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-sms-list` entry point.
2.  **Hooks**:
    *   `useMfaSmsList()`: Provides the core screen object with methods like `selectPhoneNumber()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.selectPhoneNumber(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
