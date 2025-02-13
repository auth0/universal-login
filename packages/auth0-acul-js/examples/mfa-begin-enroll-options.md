## MFA Begin Enroll Options Screen

This screen allows users to select which MFA factor they want to enroll in. The available factors are determined by the tenant configuration.

### Basic Usage

```typescript
import MfaBeginEnrollOptions from '@auth0/auth0-acul-js/mfa-begin-enroll-options';

const mfaBeginEnrollOptions = new MfaBeginEnrollOptions();

// Get available factors from tenant configuration
const { tenant } = mfaBeginEnrollOptions;
const availableFactors = tenant.enabledFactors;

// Continue with selected factor enrollment
const handleFactorSelection = async (factor: string) => {
  try {
    await mfaBeginEnrollOptions.continueWithFactorEnrollment({
      action: factor // e.g. 'push-notification', 'otp', 'sms', etc.
    });
  } catch (error) {
    console.error('Error enrolling factor:', error);
  }
};
```

### React Component Example with TailwindCSS

```tsx
import React from 'react';
import MfaBeginEnrollOptions from '@auth0/auth0-acul-js/mfa-begin-enroll-options';

const MfaBeginEnrollOptionsScreen: React.FC = () => {
  const mfaBeginEnrollOptions = new MfaBeginEnrollOptions();
  const { tenant } = mfaBeginEnrollOptions;

  // Map factor IDs to display names
  const factorDisplayNames: Record<string, string> = {
    'push-notification': 'Push Notification (Auth0 Guardian)',
    'otp': 'One-Time Password (Google Authenticator)',
    'sms': 'SMS',
    'phone': 'Phone Call',
    'voice': 'Voice Call',
    'webauthn-roaming': 'Security Key'
  };

  const handleFactorSelection = async (factor: string) => {
    try {
      await mfaBeginEnrollOptions.continueWithFactorEnrollment({
        action: factor
      });
    } catch (error) {
      console.error('Error enrolling factor:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Choose a Multi-factor Authentication Method
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select how you want to verify your identity
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {tenant.enabledFactors?.map((factor) => (
              <button
                key={factor}
                onClick={() => handleFactorSelection(factor)}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {factorDisplayNames[factor] || factor}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfaBeginEnrollOptionsScreen;
```
