import type { StartResendOptions } from '../../interfaces/common';

/**
 * Utility function to create resend functionality with timeout management
 * @param screenIdentifier - The screen identifier for storage key uniqueness
 * @param resendMethod - The resend method to call when callback is executed
 * @param options - Configuration options for resend functionality
 * @param resendLimitReached - Optional server-side limit indicator (only for phone/email identifier challenge screens)
 * @returns Callback function for resend functionality
 */
export function createResendControl(
  screenIdentifier: string,
  resendMethod: () => Promise<void>,
  options?: StartResendOptions,
  resendLimitReached?: boolean
): () => Promise<void> {
  const { timeoutSeconds = 10, onResend, onStateChange } = options || {};
  const storageKey = `acul_resend_timeout_${screenIdentifier}`;

  let remaining = 0;
  let disabled = false;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const cleanup = (): void => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const calculateState = (): void => {
    const lastResendTime = parseInt(localStorage.getItem(storageKey) || '0', 10);
    const currentTime = Date.now();
    const timeoutMs = timeoutSeconds * 1000;
    const timeElapsed = currentTime - lastResendTime;

    remaining = Math.max(0, Math.ceil((timeoutMs - timeElapsed) / 1000));
    // Disabled if either there's a timeout remaining OR server-side limit is reached
    disabled = remaining > 0 || !!resendLimitReached;

    // Always call onStateChange if it exists
    if (onStateChange) {
      onStateChange(remaining, disabled);
    }
  };

  const startTimer = (): void => {

    localStorage.setItem(storageKey, Date.now().toString());

    cleanup();
    calculateState();
    intervalId = setInterval(() => {
      calculateState();
      if (remaining <= 0) {
        cleanup();
      }
    }, 1000);
  };

  const callback = async (): Promise<void> => {
    calculateState();

    if (onResend) {
      await onResend();
    } else {
      await resendMethod();
    }

    startTimer();
  };

  calculateState();

  if (remaining > 0) {
    intervalId = setInterval(() => {
      calculateState();
      if (remaining <= 0) {
        cleanup();
      }
    }, 1000);
  }

  return callback;
}