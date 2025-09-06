import { useCallback, useEffect, useState } from 'react';
import type { UseResendReturn, UseResendParams, ScreenWithResendManager } from '../../interfaces/common';

/**
 * Generic hook that works with any screen that has a resendManager method
 * @param screenInstance - Screen instance that has resendManager method
 * @param payload - Resend parameters
 * @returns Object with remaining seconds, disabled state, and startResend function
 */

export function useResendWithManager(
  screenInstance: ScreenWithResendManager,
  payload?: UseResendParams
): UseResendReturn {
  const { timeoutSeconds = 10, onResend, onComplete } = payload ?? {};
  const [remaining, setRemaining] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [resendCallback, setResendCallback] = useState<(() => Promise<void>) | null>(null);

  // Handle state changes from resendManager
  const handleStateChange = useCallback((remainingSeconds: number, isDisabled: boolean) => {
    setRemaining(remainingSeconds);
    setDisabled(isDisabled);
    
    // Call onComplete when timer hits 0 and is disabled
    if (remainingSeconds === 0 && isDisabled === true && onComplete) {
      onComplete();
    }
  }, [onComplete]);

  // Initialize resend manager
  useEffect(() => {
    const callback = screenInstance.resendManager({
      timeoutSeconds,
      onResend,
      onStateChange: handleStateChange,
    });
    setResendCallback(() => callback);
  }, [screenInstance, timeoutSeconds, onResend, handleStateChange]);

  // Memoize startResend function
  const startResend = useCallback(async () => {
    if (resendCallback) {
      await resendCallback();
    }
  }, [resendCallback]);

  return {
    remaining,
    disabled,
    startResend,
  };
}