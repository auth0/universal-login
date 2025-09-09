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
  resendLimitReached?: boolean
): ResendControl {
  const storageKey = `resend-timer-${screenIdentifier}`;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const stopTimer = (): void => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const startTimer = (endTime: number): void => {
    stopTimer();

    intervalId = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.round((endTime - now) / 1000));

      options?.onStatusChange?.(remaining, true);

      if (remaining <= 0) {
        stopTimer();
        localStorage.removeItem(storageKey);
        options?.onTimeout?.();
      }
    }, 1000);
  };

  // Check for existing timer on initialization
  const storedEndTime = localStorage.getItem(storageKey);
  if (storedEndTime) {
    const endTime = parseInt(storedEndTime, 10);
    if (Date.now() < endTime) {
      startTimer(endTime);
    } else {
      localStorage.removeItem(storageKey);
    }
  } else {
    options?.onStatusChange?.(0, false);
  }

  if (resendLimitReached) {
    options?.onStatusChange?.(0, true);
  }

  const startResend = (): void => {
    if (resendLimitReached) {
      return;
    }

    const stored = localStorage.getItem(storageKey);
    if (stored && Date.now() < parseInt(stored, 10)) {
      // Timer is already running
      return;
    }
    
    const timeout = options?.timeoutSeconds ?? 60;
    options?.onStatusChange?.(timeout, true);    
    const endTime = Date.now() + timeout * 1000;
    localStorage.setItem(storageKey, endTime.toString());
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    resendMethod();
    startTimer(endTime);
  };

  const getDisabled = () => {
    return disabl
  }

  return { startResend };
}