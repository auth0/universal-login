# `mfa-login-options`

The `mfa-login-options` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-login-options` screen.

### 1. Create the Component

Create a component file (e.g., `MfaLoginOptions.tsx`) and add the following code:

```tsx
import React, { useCallback } from 'react';
import { useMfaLoginOptions, enroll, useScreen } from '@auth0/auth0-acul-react/mfa-login-options';
import { Logo } from '../../components/Logo';

type MfaLoginFactorType = 'push-notification' | 'otp' | 'sms' | 'phone' | 'voice' | 'email' | 'recovery-code' | 'webauthn-roaming' | 'webauthn-platform' | 'duo';

const buildFactorDisplayNames = (texts: any): Record<MfaLoginFactorType, string> => ({
  'push-notification': texts?.authenticatorNamesPushNotification ?? 'Push Notification (Auth0 Guardian)',
  otp: texts?.authenticatorNamesOTP ?? 'One-Time Password (Authenticator App)',
  sms: texts?.authenticatorNamesSMS ?? 'SMS',
  phone: texts?.authenticatorNamesPhone ?? 'Phone Call',
  voice: texts?.authenticatorNamesVoice ?? 'Voice Call',
  email: texts?.authenticatorNamesEmail ?? 'Email',
  'recovery-code': texts?.authenticatorNamesRecoveryCode ?? 'Recovery Code',
  'webauthn-platform': texts?.authenticatorNamesWebauthnPlatform ?? 'Platform Authenticator',
  'webauthn-roaming': texts?.authenticatorNamesWebauthnRoaming ?? 'Security Key',
  duo: texts?.authenticatorNamesDuo ?? 'Notification via DUO app'
});

const MfaLoginOptionsScreen: React.FC = () => {
  const { tenant, screen: { texts } } = useMfaLoginOptions();
  const screen = useScreen();
  const factorDisplayNames = buildFactorDisplayNames(texts);

  const handleFactorSelection = useCallback(async (factor: MfaLoginFactorType) => {
    try {
      await enroll({ action: factor });
    } catch (error) {
      console.error(`Error selecting factor [${factor}]`, error);
    }
  }, []);

  const title = texts?.title ?? 'Multi-factor Authentication';
  const description = texts?.description ?? 'Choose a Multi-factor Authentication Method';
  const enrollLabel = texts?.enrollActionLabel ?? 'Use';
  const noFactors = texts?.noFactorsAvailable ?? 'No authenticators available.';

  const enabled = (tenant.enabledFactors ?? []) as string[];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-center text-sm text-gray-500">{description}</p>

        <div className="mt-6 space-y-3">
          {enabled.length === 0 && (
            <div className="text-sm text-gray-500 text-center py-6 border border-dashed border-gray-300 rounded">{noFactors}</div>
          )}
          {enabled.map((factor) => {
            const factorId = factor as MfaLoginFactorType;
            return (
              <button
                key={factor}
                onClick={() => handleFactorSelection(factorId)}
                className="w-full flex justify-between items-center py-2.5 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                <span className="truncate mr-2 text-left">{factorDisplayNames[factorId] ?? factorId}</span>
                <span className="text-indigo-600 text-xs font-semibold">{enrollLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MfaLoginOptionsScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaLoginOptions` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-login-options` entry point.
2.  **Hooks**:
    *   `useMfaLoginOptions()`: Provides the core screen object with methods like `enroll()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.enroll(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
