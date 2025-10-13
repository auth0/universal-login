/**
 * Callback function for status changes during resend countdown.
 * @param remainingSeconds - Number of seconds remaining in the countdown
 * @param isDisabled - Whether the resend functionality is currently disabled
 */
export type OnStatusChangeCallback = (remainingSeconds: number, isDisabled: boolean) => void;

/**
 * Options for configuring resend functionality
 */
export interface StartResendOptions {
  timeoutSeconds?: number;
  onStatusChange?: OnStatusChangeCallback;
  onTimeout?: () => void;
}

/**
 * Control object returned by resendManager method
 */
export interface ResendControl {
  startResend: () => void;
}