# Pending Consent Screen

This screen is a waiting room shown during PAR, RAR, or CIBA flows when no customized-consent prompt is configured. The user approves or denies the request off-browser through the My Account experience, while this screen polls for the outcome and continues the flow once the consent is resolved.

## React Component Example with TailwindCSS

```tsx
import React, { useEffect, useRef } from 'react';
import PendingConsent from '@auth0/auth0-acul-js/pending-consent';

const pendingConsentManager = new PendingConsent();

const PendingConsentScreen: React.FC = () => {
  const { screen, transaction: { errors } } = pendingConsentManager;
  const texts = screen?.texts || {};
  const pollingControl = useRef<ReturnType<typeof pendingConsentManager.pollingManager> | null>(null);

  useEffect(() => {
    // Poll until the consent is approved or denied off-browser, then continue the flow.
    // Auth0 applies the approve/deny outcome when `continue()` is posted.
    pollingControl.current = pendingConsentManager.pollingManager({
      intervalMs: 5000,
      onCompleted: () => pendingConsentManager.continue(),
      onError: (error) => console.error('Polling error:', error),
    });
    pollingControl.current.startPolling();

    return () => pollingControl.current?.stopPolling();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">
          {texts.title ?? 'Waiting for your approval'}
        </h1>

        <p className="text-sm text-gray-600 text-center">
          {texts.description ??
            "We're waiting for you to review and approve this request to continue."}
        </p>

        <div className="my-6 flex justify-center">
          <div
            role="status"
            aria-label={texts.spinnerAltText ?? 'Waiting for approval'}
            className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
          />
        </div>

        {errors?.length ? (
          <div className="mt-2 space-y-1 text-left">
            {errors.map((error, idx) => (
              <p key={idx} className="text-red-600 text-sm">
                {error.message}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PendingConsentScreen;
```

## Usage Examples

### Poll for the consent outcome

```typescript
import PendingConsent from '@auth0/auth0-acul-js/pending-consent';

const pendingConsent = new PendingConsent();

const control = pendingConsent.pollingManager({
  intervalMs: 5000,
  // Fires once the consent has been approved or denied off-browser
  onCompleted: () => pendingConsent.continue(),
  onError: (error) => console.error('Polling error:', error),
});

control.startPolling();

// Stop polling, e.g. when the component unmounts
control.stopPolling();
```

### Continue

```typescript
import PendingConsent from '@auth0/auth0-acul-js/pending-consent';

const pendingConsent = new PendingConsent();

// Posts only the transaction state. If the consent is still pending,
// Auth0 renders this screen again instead of redirecting.
await pendingConsent.continue();
```
