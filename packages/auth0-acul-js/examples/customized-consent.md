import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';

# Customized Consent Screen

This screen is displayed when a user needs to consent to specific scopes.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';

const CustomizedConsentScreen: React.FC = () => {
  const customizedConsentManager = new CustomizedConsent();
  const { screen } = customizedConsentManager;

  const handleAccept = async () => {
    try {
      await customizedConsentManager.accept();
    } catch (error) {
      console.error('Failed to accept consent:', error);
    }
  };

  const handleDeny = async () => {
    try {
      await customizedConsentManager.deny();
    } catch (error) {
      console.error('Failed to deny consent:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Consent to the following scopes:</h2>
        {
          screen.data?.scopes && Object.entries(screen.data.scopes).map(([scope, description]) => (
            <div key={scope} className="mb-4">
              <h3 className="text-xl font-semibold">{scope}</h3>
              <ul>
                {description.map((desc, index) => (
                  <li key={index} className="text-gray-700">{desc}</li>
                ))}
              </ul>
            </div>
          ))
        }
        <div className="flex justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleDeny}
          >
            Decline
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizedConsentScreen;
```

## Usage Examples

### Accept Consent

```typescript
import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';

const customizedConsent = new CustomizedConsent();

// Accept the consent
await customizedConsent.accept();
```

### Decline Consent

```typescript
import CustomizedConsent from '@auth0/auth0-acul-js/customized-consent';

const customizedConsent = new CustomizedConsent();

// Decline the consent
await customizedConsent.deny();
```
