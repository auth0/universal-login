# MFA Email List Screen

This screen allows users to select an email address from a list of enrolled email addresses for MFA.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import MfaEmailList from '@auth0/auth0-acul-js/mfa-email-list';

const MfaEmailListScreen: React.FC = () => {
  const mfaEmailList = new MfaEmailList();
  const { screen } = mfaEmailList;

  const handleSelectEmail = async (index: number) => {
    try {
      await mfaEmailList.selectMfaEmail({
        action: `selection-action::${index}`,
      });
    } catch (error) {
      console.error('Failed to select email:', error);
    }
  };

  const handleGoBack = async () => {
    try {
      await mfaEmailList.goBack();
    } catch (error) {
      console.error('Failed to go back:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Select an Email Address</h2>
        {
          screen.data?.enrolled_emails ? (
            <ul className="mb-4">
              {screen.data.enrolled_emails.map((email, index) => (
                <li key={index} className="py-2">
                  <button
                    onClick={() => handleSelectEmail(index)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {email}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No email addresses enrolled.</p>
          )
        }
        <button
          onClick={handleGoBack}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MfaEmailListScreen;
```

## Individual Method Examples

### Select MFA Email

```typescript
import MfaEmailList from '@auth0/auth0-acul-js/mfa-email-list';

const mfaEmailList = new MfaEmailList();

// Select the first email address (index 0)
await mfaEmailList.selectMfaEmail({
  action: 'selection-action::0'
});
```

### Go Back

```typescript
import MfaEmailList from '@auth0/auth0-acul-js/mfa-email-list';

const mfaEmailList = new MfaEmailList();

// Navigate back to the previous screen
await mfaEmailList.goBack();
```
