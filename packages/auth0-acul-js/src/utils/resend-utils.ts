import type { StartResendOptions, ResendControl } from '../../interfaces/common';

/**
 * Utility function to create resend functionality with timeout management
 * @param screenIdentifier - The screen identifier for storage key uniqueness
 * @param resendMethod - The resend method to call when callback is executed
 * @param options - Configuration options for resend functionality
 * @param resendLimitReached - Optional server-side limit indicator (only for phone/email identifier challenge screens)
 * @returns ResendControl object with startResend method
 */
export function createResendControl(
  screenIdentifier: string,
  resendMethod: () => Promise<void>,
  options?: StartResendOptions,
  resendLimitReached?: boolean,
): ResendControl {
  const { timeoutSeconds = 10, onStatusChange, onTimeout } = options || {};
  const storageKey = `acul_resend_timeout_${screenIdentifier}`;

  let remaining = 0;
  let disabled = false;
  let hasCalledOnTimeout = false; // Track if onTimeout has been called
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

    const previousRemaining = remaining;
    remaining = Math.max(0, Math.ceil((timeoutMs - timeElapsed) / 1000));
    disabled = remaining > 0 || !!resendLimitReached;

    // Call onTimeout when countdown reaches 0
    if (onTimeout && previousRemaining > 0 && remaining === 0 && !hasCalledOnTimeout) {
      hasCalledOnTimeout = true;
      onTimeout();
    }

    // Always call onStatusChange if it exists
    if (onStatusChange) {
      onStatusChange(remaining, disabled);
    }
  };

  const startTimer = (): void => {
    // Don't start timer if resend limit is reached
    if (resendLimitReached) {
      return;
    }
    
    localStorage.setItem(storageKey, Date.now().toString());
    hasCalledOnTimeout = false; // Reset for new timer
    cleanup();
    // Immediate update so UI reflects disabled state right away
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
    if (disabled) return;

    await resendMethod();
    startTimer();
  };

  // Initial state calculation without triggering onStatusChange
  calculateState();

  // Resume countdown if there's time remaining from previous session and resend limit not reached
  if (remaining > 0 && !resendLimitReached) {
    intervalId = setInterval(() => {
      calculateState();
      if (remaining <= 0) {
        cleanup();
      }
    }, 1000);
  }

  return {
    startResend: callback
  };
}