# Pending Consent Screen

This screen is a waiting room shown during Rich Authorization Requests (RAR) flows when no customized-consent prompt is configured. The user approves or denies the request off-browser through the My Account experience, while this screen polls for the outcome and continues the flow once the consent is resolved.

## React Component Example with TailwindCSS

```tsx
import React, { useEffect, useRef, useState } from 'react';
import PendingConsent from '@auth0/auth0-acul-js/pending-consent';

const pendingConsentManager = new PendingConsent();

const PendingConsentScreen: React.FC = () => {
  const { screen, transaction: { errors } } = pendingConsentManager;
  const texts = screen?.texts || {};
  const pollingControl = useRef<ReturnType<typeof pendingConsentManager.pollingManager> | null>(null);
  const [pollingFailed, setPollingFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Poll until the consent is approved or denied off-browser, then continue the flow.
    // Auth0 applies the approve/deny outcome when `continue()` is posted.
    pollingControl.current = pendingConsentManager.pollingManager({
      intervalMs: 5000,
      onCompleted: () => pendingConsentManager.continue(),
      // Polling stops after an error. The message can be raw response text, so log it
      // and show a fixed message with a manual way to continue instead.
      onError: (error) => {
        console.error('Polling error:', error);
        setPollingFailed(true);
      },
    });
    pollingControl.current.startPolling();

    return () => pollingControl.current?.stopPolling();
  }, []);

  // Asks Auth0 to check the consent status again: it continues if the consent was approved
  // or denied, or renders this screen again (and polling restarts) if it is still pending.
  const handleTryAgain = async () => {
    setIsSubmitting(true);
    try {
      await pendingConsentManager.continue();
    } catch (err) {
      console.error('Failed to continue:', err);
      setIsSubmitting(false); // only clear on error; on success the page navigates away
    }
  };

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

        {!pollingFailed && (
          <div className="my-6 flex justify-center">
            <div
              role="status"
              aria-label={texts.spinnerAltText ?? 'Waiting for approval'}
              className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
            />
          </div>
        )}

        {errors?.length ? (
          <div className="mt-2 space-y-1 text-left">
            {errors.map((error, idx) => (
              <p key={idx} className="text-red-600 text-sm">
                {error.message}
              </p>
            ))}
          </div>
        ) : null}

        {/* Shown only after polling fails, so it can't race the automatic continue().
            This screen has no localized text for these strings, so localize them yourself. */}
        {pollingFailed && (
          <>
            <p role="alert" className="text-red-600 text-sm text-center">
              We couldn't check the status of your request.
            </p>
            <button
              type="button"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
              onClick={handleTryAgain}
            >
              Try again
            </button>
          </>
        )}
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

// Posts the transaction state with no action. If the consent is still pending,
// Auth0 renders this screen again instead of redirecting.
await pendingConsent.continue();
```
