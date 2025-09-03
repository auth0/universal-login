import type { StartResendOptions, ResendControl } from '../../interfaces/common';

/**
 * Utility function to create resend functionality with timeout management
 * @param screenIdentifier - The screen identifier for storage key uniqueness
 * @param resendMethod - The resend method to call when callback is executed
 * @param options - Configuration options for resend functionality
 * @returns Object containing disabled state, remaining time, and callback function
 */
export function createResendControl(
  screenIdentifier: string,
  resendMethod: () => Promise<void>,
  options?: StartResendOptions
): ResendControl {
  const { timeoutSeconds = 10, resendCallback } = options || {};
  const storageKey = `auth0_resend_timeout_${screenIdentifier}`;
  let remaining = 0;
  let disabled = false;
  let intervalId: NodeJS.Timeout | null = null;

  const calculateState = (): void => {
    const lastResendTime = parseInt(localStorage.getItem(storageKey) || '0', 10);
    const currentTime = Date.now();
    const timeoutMs = timeoutSeconds * 1000;
    const timeElapsed = currentTime - lastResendTime;

    remaining = Math.max(0, Math.ceil((timeoutMs - timeElapsed) / 1000));
    disabled = remaining > 0;
  };

  const startTimer = (): void => {
    // Save the current time
    localStorage.setItem(storageKey, Date.now().toString());

    // Recalculate immediately
    calculateState();

    // Clear old timer
    if (intervalId) clearInterval(intervalId);

    // Start new countdown
    intervalId = setInterval(() => {
      calculateState();
      if (remaining <= 0 && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }, 1000);
  };

  const callback = async (): Promise<void> => {
    calculateState();
    if (disabled) {
      throw new Error(`Please wait ${remaining}s before resending`);
    }
    startTimer();

    if (resendCallback) {
      await resendCallback();
    } else {
      await resendMethod();
    }
  };

  // Calculate state on init
  calculateState();

  return {
    get disabled(): boolean {
      return disabled; // ✅ always returns the latest value
    },
    get remaining(): number {
      return remaining; // ✅ always returns the latest countdown
    },
    callback,
  };
}
