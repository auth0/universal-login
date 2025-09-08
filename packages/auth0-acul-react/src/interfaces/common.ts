import type { StartResendOptions, ResendControl } from '@auth0/auth0-acul-js';

/**
 * Return type for the useResend hook
 */
export interface UseResendReturn {
  remaining: number;
  disabled: boolean;
  startResend: () => Promise<void>;
}

/**
 * Parameters for the useResend hook
 */
export interface UseResendParams {
  timeoutSeconds?: number;
  onTimeout?: () => void; // Called when timer hits 0
}

/**
 * Generic interface for any screen that has a resendManager method
 */
export interface ScreenWithResendManager {
  resendManager(options?: StartResendOptions): ResendControl;
}
