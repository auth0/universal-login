# MFA Login Options Screen

This screen allows users to select which MFA factor they want to use for login from their enrolled factors.

## React Component Example with TailwindCSS

```tsx
import React, { useCallback } from 'react';
import MfaBeginEnrollOptions, { type LoginFactorType } from '@auth0/auth0-acul-js/mfa-login-options';

/** Enum for Factor Types */
enum FactorTypeEnum {
  PUSH_NOTIFICATION = 'push-notification',
  OTP = 'otp',
  SMS = 'sms',
  PHONE = 'phone',
  VOICE = 'voice',
  WEBAUTHN_ROAMING = 'webauthn-roaming'
}

const MfaLoginOptionsScreen: React.FC = () => {
  const mfaBeginEnrollOptions = new MfaBeginEnrollOptions();
  const { tenant, screen: { texts } } = mfaBeginEnrollOptions;

  /** Dynamically map factor IDs to display names */
  const factorDisplayNames: Record<FactorTypeEnum, string> = {
    [FactorTypeEnum.PUSH_NOTIFICATION]: texts?.authenticatorNamesPushNotification ?? 'Push Notification (Auth0 Guardian)',
    [FactorTypeEnum.OTP]: texts?.authenticatorNamesOTP ?? 'One-Time Password (Google Authenticator)',
    [FactorTypeEnum.SMS]: texts?.authenticatorNamesSMS ?? 'SMS',
    [FactorTypeEnum.PHONE]: texts?.authenticatorNamesPhone ?? 'Phone Call',
    [FactorTypeEnum.VOICE]: texts?.authenticatorNamesVoice ?? 'Voice Call',
    [FactorTypeEnum.WEBAUTHN_ROAMING]: texts?.authenticatorNamesWebauthnRoaming ?? 'Security Key'
  };

  /** Handles user selection of an MFA factor */
  const handleFactorSelection = useCallback(async (factor: FactorTypeEnum) => {
    try {
      await mfaBeginEnrollOptions.enroll({
        action: factor as LoginFactorType
      });
    } catch (error) {
      console.error(`Error enrolling factor [${factor}]:`, error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col flex-start py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {texts?.title ?? 'Multi-factor Authentication'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {texts?.description ?? 'Choose a Multi-factor Authentication Method'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {tenant.enabledFactors?.map((factor) => {
              const factorEnum = factor as FactorTypeEnum;
              return (
                <button
                  key={factor}
                  onClick={() => handleFactorSelection(factorEnum)}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {factorDisplayNames[factorEnum]}
                </button>
              );
            })}
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
await mfaLoginOptions.enroll({
  action: 'push-notification'
});

// Continue with SMS
await mfaLoginOptions.enroll({
  action: 'sms'
});

// Continue with OTP
await mfaLoginOptions.enroll({
  action: 'otp'
});
```