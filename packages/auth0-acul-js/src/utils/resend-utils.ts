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
  
  // Get last resend time from storage
  const lastResendTime = parseInt(localStorage.getItem(storageKey) || '0', 10);
  const currentTime = Date.now();
  const timeoutMs = timeoutSeconds * 1000;
  const timeElapsed = currentTime - lastResendTime;
  const remaining = Math.max(0, Math.ceil((timeoutMs - timeElapsed) / 1000));
  const disabled = remaining > 0;

  const callback = async (): Promise<void> => {
    // Check if resend is currently allowed (recalculate at execution time)
    const currentLastResendTime = parseInt(localStorage.getItem(storageKey) || '0', 10);
    const currentTimeNow = Date.now();
    const currentTimeElapsed = currentTimeNow - currentLastResendTime;
    const currentRemaining = Math.max(0, Math.ceil((timeoutMs - currentTimeElapsed) / 1000));
    const currentlyDisabled = currentRemaining > 0;
      
    if (currentlyDisabled) {
      throw new Error(`Please wait ${currentRemaining} seconds before resending`);
    }
    
    // Store current time as last resend time
    localStorage.setItem(storageKey, Date.now().toString());
    
    if (resendCallback) {
      // Use provided callback
      await resendCallback();
    } else {
      // Use the screen's own resend method
      await resendMethod();
    }
  };

  return {
    disabled,
    remaining,
    callback,
  };
}
