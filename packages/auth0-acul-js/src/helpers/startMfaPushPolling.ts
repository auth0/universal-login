import type MfaPushChallengePush from '../screens/mfa-push-challenge-push';

/**
 * Polls MFA push challenge approval at a set interval.
 * Keeps polling until cancelled.
 *
 * @param intervalMs Polling interval in ms
 * @param transaction Instance of MfaPushChallengePush
 * @returns cancel function to stop polling
 */
export function startMfaPushPolling(
  intervalMs: number,
  transaction: MfaPushChallengePush,
  rememberDevice: boolean
): () => void {
  let cancelled = false;
  let pollStarted = false;

  const poll = async (): Promise<void> => {
    if (pollStarted) return;
    pollStarted = true;
    try {
      await transaction.resendPushNotification({ rememberDevice });
    } catch {
      throw new Error('Initial push notification failed');
    }
    while (!cancelled) {
      await new Promise(res => setTimeout(res, intervalMs));
      if (cancelled) break;
      try {
        await transaction.resendPushNotification({ rememberDevice });
      } catch {
         throw new Error('Resend push notification failed');
      }
    }
  };

  void poll();

  return () => { cancelled = true; };
}