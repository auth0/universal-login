# `pending-consent`

The `pending-consent` screen is a waiting room shown during Rich Authorization Requests (RAR) flows when no customized-consent prompt is configured. The user approves or denies the request off-browser through the My Account experience, while this screen polls for the outcome and then continues the flow.

## ⚛️ React Example

This example demonstrates how to build a React component for the `pending-consent` screen.

### 1. Create the Component

Create a component file (e.g., `PendingConsent.tsx`) and add the following code:

```tsx
import React, { useEffect, useState } from 'react';
import {
  // Context hooks
  useScreen,

  // Utility hooks
  useMfaPolling,
  useErrors,

  // Submit functions
  continueMethod
} from '@auth0/auth0-acul-react/pending-consent';

export const PendingConsent: React.FC = () => {
  const screen = useScreen();
  const { texts } = screen;

  // Collect all SDK/server/developer errors. useMfaPolling also adds polling errors here,
  // and their message can be raw response text, so leave those out and show a fixed message.
  const { errors } = useErrors();
  const displayErrors = errors.filter((err) => !err.code.startsWith('polling_'));
  const [pollingFailed, setPollingFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Poll until the consent is approved or denied off-browser, then continue.
  // Auth0 applies the approve/deny outcome when the continue request is posted.
  const { isRunning, startPolling, stopPolling } = useMfaPolling({
    intervalMs: 5000,
    onCompleted: () => {
      continueMethod();
    },
    onError: (error) => {
      // Polling stops after an error
      console.error('Polling error:', error);
      setPollingFailed(true);
    }
  });

  // Automatically start polling when the page loads
  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  // Asks Auth0 to check the consent status again: it continues if the consent was approved
  // or denied, or renders this screen again (and polling restarts) if it is still pending.
  const handleTryAgain = async () => {
    setIsSubmitting(true);
    try {
      await continueMethod();
    } catch (err) {
      console.error('Failed to continue:', err);
      setIsSubmitting(false); // only clear on error; on success the page navigates away
    }
  };

  return (
    <div>
      <h1>{texts?.title ?? 'Waiting for your approval'}</h1>
      <p>
        {texts?.description ??
          "We're waiting for you to review and approve this request to continue."}
      </p>

      {isRunning && (
        <div role="status" aria-label={texts?.spinnerAltText ?? 'Waiting for approval'}>
          Waiting for approval…
        </div>
      )}

      {displayErrors.length > 0 && (
        <div style={{ color: 'red' }}>
          {displayErrors.map((err, idx) => (
            <p key={`err-${idx}`}>{err.message}</p>
          ))}
        </div>
      )}

      {/* Shown only after polling fails, so it can't race the automatic continueMethod().
          This screen has no localized text for these strings, so localize them yourself. */}
      {pollingFailed && (
        <>
          <p role="alert" style={{ color: 'red' }}>We couldn't check the status of your request.</p>
          <button type="button" disabled={isSubmitting} onClick={handleTryAgain}>
            Try again
          </button>
        </>
      )}
    </div>
  );
};
```


