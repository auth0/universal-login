import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getScreen } from '../../state/instance-store';

import type { StartResendOptions, ResendControl } from '@auth0/auth0-acul-js';

/** Return type for {@link useResend}. */
export interface UseResendReturn {
  /** Seconds remaining until the next resend attempt is allowed. */
  remaining: number;
  /** Whether the resend action is currently disabled. */
  disabled: boolean;
  /** Start a resend attempt immediately, if allowed. */
  startResend: () => void;
}

/** Optional configuration for {@link useResend}. */
export interface UseResendOptions {
  /**
   * Countdown duration (in seconds) before another resend is allowed.
   * Defaults to `10`.
   */
  timeoutSeconds?: number;
  /**
   * Callback fired when the countdown finishes and the resend
   * action becomes available again.
   */
  onTimeout?: () => void;
}

/** Screens that support resend operations expose a `resendManager` method. */
interface WithResendManager {
  resendManager(options?: StartResendOptions): ResendControl;
}

/**
 * This React hook manages "resend" actions (e.g., resending a verification code) on ACUL screens.
 *
 * This hook:
 * - Tracks the remaining cooldown time.
 * - Tells you whether the resend button should be disabled.
 * - Provides a `startResend` function to trigger a resend immediately.
 *
 * @SupportedScreens
 * - `email-identifier-challenge`
 * - `email-otp-challenge`
 * - `login-email-verification`
 * - `login-passwordless-email-code`
 * - `login-passwordless-sms-otp`
 * - `mfa-email-challenge`
 * - `mfa-sms-challenge`
 * - `mfa-voice-challenge`
 * - `phone-identifier-challenge`
 * - `reset-password-mfa-email-challenge`
 * - `reset-password-mfa-sms-challenge`
 * - `reset-password-mfa-voice-challenge`
 *
 * @param options - Optional configuration such as `timeoutSeconds` and `onTimeout`.
 *
 * @returns An object with:
 * - `remaining` — seconds left until the next resend is permitted.
 * - `disabled` — `true` if resending is currently blocked.
 * - `startResend` — call to initiate a resend immediately (if allowed).
 *
 * @example
 * ```tsx
 * import { useResend } from '@auth0/auth0-acul-react';
 *
 * export function ResendButton() {
 *   const { remaining, disabled, startResend } = useResend({
 *     timeoutSeconds: 30,
 *     onTimeout: () => console.log('You can resend again'),
 *   });
 *
 *   return (
 *     <button onClick={startResend} disabled={disabled}>
 *       {disabled ? `Resend in ${remaining}s` : 'Resend Code'}
 *     </button>
 *   );
 * }
 * ```
 *
 * @remarks
 * - The underlying `ResendControl` has no explicit teardown method; the hook does not require manual cleanup.
 * - The hook re-initializes the resend manager if `timeoutSeconds` or `onTimeout` change.
 */
export function useResend(options?: UseResendOptions): UseResendReturn {
  const { timeoutSeconds = 10, onTimeout } = options ?? {};
  const screen = useMemo(() => getScreen<WithResendManager>(), []);

  const [remaining, setRemaining] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const controlRef = useRef<ResendControl | null>(null);

  // Update state whenever the manager reports a change
  const handleStatusChange = useCallback((secs: number, isDisabled: boolean) => {
    setRemaining(secs);
    setDisabled(isDisabled);
  }, []);

  // Initialize the resend manager; re-run if options that affect its behavior change
  useEffect(() => {
    controlRef.current = screen.resendManager({
      timeoutSeconds,
      onStatusChange: handleStatusChange,
      ...(onTimeout && { onTimeout }),
    });
  }, [screen, timeoutSeconds, handleStatusChange, onTimeout]);

  const startResend = useCallback(() => {
    controlRef.current?.startResend();
  }, []);

  return { remaining, disabled, startResend };
}
