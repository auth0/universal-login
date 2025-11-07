# `reset-password-mfa-push-challenge-push`

The `reset-password-mfa-push-challenge-push` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `reset-password-mfa-push-challenge-push` screen.

### 1. Create the Component

Create a component file (e.g., `ResetPasswordMfaPushChallengePush.tsx`) and add the following code:

```tsx
import React, { useEffect, useState } from 'react';
import {
  useScreen,
  useTransaction,
  useUntrustedData,
  useErrors,
  useMfaPolling,
  continueMethod,
  resendPushNotification,
  enterCodeManually,
  tryAnotherMethod
} from '@auth0/auth0-acul-react/reset-password-mfa-push-challenge-push';
import { Logo } from '../../components/Logo';

const ResetPasswordMfaPushChallengePushScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const screen = useScreen();
  const transaction = useTransaction();
  const untrustedData = useUntrustedData();
  const { hasError, errors } = useErrors();

  const { deviceName } = screen.data || {};
  const { texts } = screen;

  const screenText = {
    title: texts?.title ?? 'Push Notification Sent',
    description: texts?.description ?? "We've sent a push notification to your device",
    resend: texts?.resendActionText ?? 'Resend Push Notification',
    enterCode: texts?.enterOtpCode ?? 'Enter Code Manually',
    tryAnother: texts?.pickAuthenticatorText ?? 'Try Another Method',
    waiting: texts?.spinner_push_notification_label ?? 'Waiting for you to accept the push notification…',
    errorResend: 'Failed to resend push notification. Please try again.',
    errorManualCode: 'Failed to switch to manual code entry. Please try again.',
    errorAnotherMethod: 'Failed to switch authentication method. Please try again.',
    continueText: texts?.continueTextB2C ?? "I've responded on my device"
  };

  // Polling for push approval
  const { isRunning, startPolling, stopPolling } = useMfaPolling({
    intervalMs: 3000,
    onCompleted: () => {
      continueMethod({});
    },
    onError: (error) => {
      // Optionally handle polling errors
      // console.error('Polling error:', error);
    }
  });

  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      await continueMethod({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await resendPushNotification({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterCodeManually = async () => {
    setIsLoading(true);
    try {
      await enterCodeManually({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAnotherMethod = async () => {
    setIsLoading(true);
    try {
      await tryAnotherMethod({});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          {screenText.title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          {screenText.description}
          {deviceName && <span className="font-medium"> ({deviceName})</span>}
        </p>

        {/* Loader shown only while polling is active */}
        {isRunning && (
          <>
            <div className="flex justify-start align-center mt-6 p-2 bg-gray-200">
              <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-indigo-600" />
              <div className="ml-4 flex items-center">
                <span>Waiting for approval | <b className="text-gray-800">{deviceName}</b></span>
              </div>
            </div>
            <p className="flex items-center mt-2 text-center text-sm text-gray-500">
              {screenText.waiting}
            </p>
          </>
        )}

        {/* Display errors */}
        {hasError && (
          <div className="mt-4 text-red-600 text-center text-sm space-y-1">
            {errors.map((err, idx) => (
              <p key={`err-${idx}`}>{err.message}</p>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screenText.continueText}
          </button>

          <button
            onClick={handleResend}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screenText.resend}
          </button>

          <button
            onClick={handleEnterCodeManually}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screenText.enterCode}
          </button>

          <button
            onClick={handleTryAnotherMethod}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {screenText.tryAnother}
          </button>
        </div>

        {transaction?.errors?.length && (
            <div className="mt-2 mb-4">
              {transaction?.errors.map((err, index) => (
                <p key={index} className="text-red-500">
                  {err.message}
                </p>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default ResetPasswordMfaPushChallengePushScreen;
```

### 2. How It Works

1.  **Imports**: We import `useResetPasswordMfaPushChallengePush` and various context hooks from the dedicated `@auth0/auth0-acul-react/reset-password-mfa-push-challenge-push` entry point.
2.  **Hooks**:
    *   `useResetPasswordMfaPushChallengePush()`: Provides the core screen object with methods like `continueMethod()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.continueMethod(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
