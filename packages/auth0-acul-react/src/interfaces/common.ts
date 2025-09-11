import type { StartResendOptions, ResendControl, OnTimeoutCallback } from '@auth0/auth0-acul-js';

/**
 * Return type for the useResend hook
 */
export interface UseResendReturn {
  remaining: number;
  disabled: boolean;
  startResend: () => void;
}

/**
 * Parameters for the useResend hook
 */
export interface UseResendParams {
  timeoutSeconds?: number;
  onTimeout?: OnTimeoutCallback;
}

/**
 * Generic interface for any screen that has a resendManager method
 */
export interface ScreenWithResendManager {
  resendManager(options?: StartResendOptions): ResendControl;
}
