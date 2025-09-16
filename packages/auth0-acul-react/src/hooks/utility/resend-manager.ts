import { useCallback, useEffect, useState } from 'react';
import type { UseResendReturn, UseResendParams, ScreenWithResendManager } from '../../interfaces/common';
import type { ResendControl } from '@auth0/auth0-acul-js';

/**
 * Generic hook that works with any screen that has a resendManager method
 * @param screenInstance - Screen instance that has resendManager method
 * @param payload - Resend parameters
 * @returns Object with remaining seconds, disabled state, and startResend function
 */
export function resendManager(
  screenInstance: ScreenWithResendManager,
  payload?: UseResendParams
): UseResendReturn {
  const { timeoutSeconds = 10, onTimeout } = payload ?? {};
  const [remaining, setRemaining] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [resendControl, setResendControl] = useState<ResendControl | null>(null);

  // Handle state changes from resendManager
  const handleStateChange = useCallback((remainingSeconds: number, isDisabled: boolean) => {
    setRemaining(remainingSeconds);
    setDisabled(isDisabled);
  }, []);

  // Initialize resend manager
  useEffect(() => {
    const control = screenInstance.resendManager({
      timeoutSeconds,
      onStatusChange: handleStateChange,
      ...(onTimeout && { onTimeout }),
    });
    setResendControl(control);
  }, [screenInstance, timeoutSeconds, handleStateChange]);

  // Memoize startResend function
  const startResend = useCallback(() => {
    if (resendControl) {
      resendControl.startResend();
    }
  }, [resendControl]);

  return {
    remaining,
    disabled,
    startResend,
  };
}
