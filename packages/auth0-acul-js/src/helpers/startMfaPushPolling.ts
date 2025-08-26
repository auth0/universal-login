import type MfaPushChallengePush from '../screens/mfa-push-challenge-push';

type StartMfaPushPollingOptions = {
  intervalMs: number;
  transaction: MfaPushChallengePush;
  rememberDevice?: boolean;
  onResult?: (result: unknown) => void;
  onError?: (error: unknown) => void;
};

/**
 * Starts polling for MFA push challenge approval.
 * Sends the initial push, then polls at the given interval using transaction.continue.
 * Calls onResult when approved, onError on error.
 * Returns a cancel function.
 */
export function startMfaPushPolling({
  intervalMs,
  transaction,
  rememberDevice = false,
  onResult,
  onError,
}: StartMfaPushPollingOptions): () => void {
  let cancelled = false;
  let timer: NodeJS.Timeout | null = null;

  transaction.resendPushNotification({ rememberDevice })
    .catch(err => {
      if (onError) onError(err);
    });

  type MfaPushPollingResult = {
    approved: boolean;
    [key: string]: unknown;
  };

  const poll = async (): Promise<void> => {
    if (cancelled) return;
    try {
      const payload = { action: 'CONTINUE', ...(rememberDevice ? { rememberDevice: true } : {}) };
      const result = await transaction.continue(payload) as unknown as MfaPushPollingResult;
      if (result.approved) {
        if (onResult) onResult(result);
        cancel();
      }
    } catch (err) {
      if (onError) onError(err);
    }
  };

  timer = setInterval(poll, intervalMs);

  function cancel(): void {
    cancelled = true;
    if (timer) clearInterval(timer);
  }

  return cancel;
}