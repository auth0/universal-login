# MFA Push Challenge Push Screen

This screen is displayed when a push notification has been sent to the user's device during MFA verification.

## React Component Example with TailwindCSS

```tsx
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';

const MfaPushChallengePushScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const mfaPushChallengePush = useMemo(() => new MfaPushChallengePush(), []);
  const cancelPollingRef = useRef<() => void>();
  const { screen, transaction } = mfaPushChallengePush;
  const { deviceName, showRememberDevice } =
    mfaPushChallengePush.screen.data || {};
    
  // Initialize form values from untrustedData
  useEffect(() => {
    // Use untrustedData to prepopulate form fields if available
    const savedFormData = mfaPushChallengePush.untrustedData.submittedFormData;
    if (savedFormData?.rememberDevice !== undefined) {
      setRememberDevice(savedFormData.rememberDevice);
    }
  }, []);

  const screenText = {
    title: screen.texts?.title ?? 'Push Notification Sent',
    description:
      screen.texts?.description ??
      "We've sent a push notification to your device",
    rememberMe:
      screen.texts?.rememberMeText ?? 'Remember this device for 30 days',
    resend: screen.texts?.resendActionText ?? 'Resend Push Notification',
    enterCode: screen.texts?.enterOtpCode ?? 'Enter Code Manually',
    tryAnother: screen.texts?.pickAuthenticatorText ?? 'Try Another Method',
    waiting:
      screen.texts?.spinner_push_notification_label ??
      'Waiting for you to accept the push notification...',
    errorResend: 'Failed to resend push notification. Please try again.',
    errorManualCode: 'Failed to switch to manual code entry. Please try again.',
    errorAnotherMethod:
      'Failed to switch authentication method. Please try again.',
  };

  const startPolling = useCallback(async () => {
    mfaPushChallengePush.continue({ rememberDevice });
  }, [mfaPushChallengePush, rememberDevice]);

  const startPolling = useCallback(async () => {
    mfaPushChallengePush.continue({ rememberDevice });
  }, [mfaPushChallengePush, rememberDevice]);
  useEffect(() => {
    if (cancelPollingRef.current) cancelPollingRef.current();
\    const cancelFn = mfaPushChallengePush.startMfaPushPolling(
      5000,
      startPolling
    );
    if (typeof cancelFn === 'function') {
      cancelPollingRef.current = cancelFn;
    } else {
      cancelPollingRef.current = undefined;
    }
    return () => {
      if (cancelPollingRef.current) cancelPollingRef.current();
    };
  }, [mfaPushChallengePush, rememberDevice]);

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await mfaPushChallengePush.resendPushNotification({ rememberDevice });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterCodeManually = async () => {
    setIsLoading(true);
    try {
      await mfaPushChallengePush.enterCodeManually({ rememberDevice });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAnotherMethod = async () => {
    setIsLoading(true);
    try {
      await mfaPushChallengePush.tryAnotherMethod({ rememberDevice });
    } catch (err) {
      console.log(err);
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
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>

            <p className="text-center text-sm text-gray-500">
              {screenText.waiting}
            </p>

            {showRememberDevice && (
              <div className="flex items-center flex-start">
                <input
                  id="rememberDevice"
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="rememberDevice"
                  className="ml-2 block text-sm text-left text-gray-700"
                >
                  {screenText.rememberMe}
                </label>
              </div>
            )}

            {transaction?.errors?.length && (
              <div className="mb-4 space-y-1">
                {transaction.errors.map((err, index) => (
                  <p key={index} className="text-red-600 text-sm text-center">
                    {err.message}
                  </p>
                ))}
              </div>
            )}

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
