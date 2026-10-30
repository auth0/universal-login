# `pending-consent`

The `pending-consent` screen is a waiting room shown during PAR, RAR, or CIBA flows when no customized-consent prompt is configured. The user approves or denies the request off-browser through the My Account experience, while this screen polls for the outcome and then continues the flow.

## ⚛️ React Example

This example demonstrates how to build a React component for the `pending-consent` screen.

### 1. Create the Component

Create a component file (e.g., `PendingConsent.tsx`) and add the following code:

```tsx
import React, { useEffect } from 'react';
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

  // Collect all SDK/server/developer errors
  const { hasError, errors } = useErrors();

  // Poll until the consent is approved or denied off-browser, then continue.
  // Auth0 applies the approve/deny outcome when the continue request is posted.
  const { isRunning, startPolling, stopPolling } = useMfaPolling({
    intervalMs: 5000,
    onCompleted: () => {
      continueMethod();
    },
    onError: (error) => {
      console.error('Polling error:', error);
    }
  });

  // Automatically start polling when the page loads
  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [startPolling, stopPolling]);

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

      {hasError && (
        <div style={{ color: 'red' }}>
          {errors.map((err, idx) => (
            <p key={`err-${idx}`}>{err.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};
```


