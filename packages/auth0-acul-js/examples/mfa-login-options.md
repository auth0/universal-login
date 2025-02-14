# MFA Login Options Screen

This screen allows users to select which MFA factor they want to use for login from their enrolled factors.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import MfaLoginOptions from '@auth0/auth0-acul-js/mfa-login-options';

const MfaLoginOptionsScreen: React.FC = () => {
  const mfaLoginOptions = new MfaLoginOptions();
  const { screen } = mfaLoginOptions;

  const factorDisplayNames: Record<string, string> = {
    'push-notification': 'Push Notification (Auth0 Guardian)',
    'otp': 'One-Time Password (Google Authenticator)',
    'sms': 'SMS',
    'phone': 'Phone Call',
    'voice': 'Voice Call',
    'email': 'Email',
    'recovery-code': 'Recovery Code',
    'webauthn-platform': 'Device Biometrics',
    'webauthn-roaming': 'Security Key',
    'duo': 'Duo Security'
  };

  const handleFactorSelection = async (factor: string) => {
    try {
      await mfaLoginOptions.continueWithFactor({
        action: factor
      });
    } catch (error) {
      console.error('Error selecting factor:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Choose a Verification Method
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select how you want to verify your identity
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {screen.data?.enrolled_factors?.map((factor) => (
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

export default MfaLoginOptionsScreen;
```

## Individual Method Examples

### Continue with Selected Factor

```typescript
import MfaLoginOptions from '@auth0/auth0-acul-js/mfa-login-options';

const mfaLoginOptions = new MfaLoginOptions();

// Continue with push notification
await mfaLoginOptions.continueWithFactor({
  action: 'push-notification'
});

// Continue with SMS
await mfaLoginOptions.continueWithFactor({
  action: 'sms'
});

// Continue with OTP
await mfaLoginOptions.continueWithFactor({
  action: 'otp'
});
```