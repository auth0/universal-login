# MFA Push Challenge Push Screen

This screen is displayed when a push notification has been sent to the user's device during MFA verification.

## React Component Example with TailwindCSS

```tsx
import React, { useState, useEffect } from 'react';
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';

const MfaPushChallengePushScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [pollingError, setPollingError] = useState<string | null>(null);

  const mfaPushChallengePush = new MfaPushChallengePush();
  const { screen } = mfaPushChallengePush;
  const { deviceName } = mfaPushChallengePush.screen.data || {};

  const screenText = {
    title: screen.texts?.title ?? 'Push Notification Sent',
    description: screen.texts?.description ?? 'We\'ve sent a push notification to your device',
    rememberMe: screen.texts?.rememberMeText ?? 'Remember this device for 30 days',
    resend: screen.texts?.resendActionText ?? 'Resend Push Notification',
    enterCode: screen.texts?.enterOtpCode ?? 'Enter Code Manually',
    tryAnother: screen.texts?.pickAuthenticatorText ?? 'Try Another Method',
    waiting: screen.texts?.spinner_push_notification_label ?? 'Waiting for you to accept the push notification...',
    errorResend: 'Failed to resend push notification. Please try again.',
    errorManualCode: 'Failed to switch to manual code entry. Please try again.',
    errorAnotherMethod: 'Failed to switch authentication method. Please try again.',
  };

  useEffect(() => {
    let pollInterval: ReturnType<typeof setTimeout> | null = null;

    const startPolling = async () => {
      try {
        await mfaPushChallengePush.continue({ rememberDevice });
        setPollingError(null);
      } catch (error) {
        console.error('Polling error:', error);
        setPollingError('Error contacting server. Please try again later.');
      }
    };

    pollInterval = setInterval(startPolling, 5000);
    startPolling();

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [rememberDevice]);

  const handleResend = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await mfaPushChallengePush.resendPushNotification({ rememberDevice });
    } catch (err) {
      console.log(err);
      setError(screenText.errorResend);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterCodeManually = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await mfaPushChallengePush.enterCodeManually({ rememberDevice });
    } catch (err) {
      console.log(err);
      setError(screenText.errorManualCode);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAnotherMethod = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await mfaPushChallengePush.tryAnotherMethod({ rememberDevice });
    } catch (err) {
      console.log(err);
      setError(screenText.errorAnotherMethod);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {screenText.title}
        </h2>
        <p className="mt-2 text-left text-sm text-gray-600">
          {screenText.description}
          {deviceName && <span className="font-medium"> ({deviceName})</span>}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <div className="mb-4 text-sm text-red-600" role="alert">{error}</div>}
          {pollingError && <div className="mb-4 text-sm text-red-600" role="alert">{pollingError}</div>}

          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>

            <p className="text-center text-sm text-gray-500">
              {screenText.waiting}
            </p>

            <div className="flex items-center flex-start">
              <input
                id="rememberDevice"
                type="checkbox"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="rememberDevice" className="ml-2 block text-sm text-left text-gray-700">
                {screenText.rememberMe}
              </label>
            </div>

            <button
              onClick={handleResend}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {screenText.resend}
            </button>

            <button
              onClick={handleEnterCodeManually}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {screenText.enterCode}
            </button>

            <button
              onClick={handleTryAnotherMethod}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {screenText.tryAnother}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfaPushChallengePushScreen;
```

## Individual Method Examples

### Continue (Poll for Push Notification Acceptance)

```typescript
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';

const mfaPushChallengePush = new MfaPushChallengePush();

// Poll for push notification acceptance
const pollInterval = setInterval(async () => {
  try {
    await mfaPushChallengePush.continue();
    // If successful, the page will redirect
    clearInterval(pollInterval);
  } catch (error) {
    // Ignore polling errors
  }
}, 5000);
```

### Resend Push Notification

```typescript
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';

const mfaPushChallengePush = new MfaPushChallengePush();
mfaPushChallengePush.resendPushNotification();
```

### Enter Code Manually

```typescript
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';

const mfaPushChallengePush = new MfaPushChallengePush();
mfaPushChallengePush.enterCodeManually();
```

### Try Another Method

```typescript
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';

const mfaPushChallengePush = new MfaPushChallengePush();
mfaPushChallengePush.tryAnotherMethod();
```
