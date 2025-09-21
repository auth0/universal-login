import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getScreen } from '../../state/instance-store';
import { errorManager } from '../common/errors';

import type {
  MfaPollingOptions,
  MfaPushPollingControl,
  Error as ULError,
} from '@auth0/auth0-acul-js';

/**
 * Result object returned by {@link useMfaPolling}.
 *
 * @public
 */
export interface MfaPollingResult {
  /**
   * Indicates whether the MFA push polling process is currently active.
   *
   * - `true` — Polling is running and awaiting completion.
   * - `false` — Polling has stopped, either due to completion,
   *   manual cancellation, or component unmount.
   */
  isRunning: boolean;

  /**
   * Starts or resumes the polling process.
   *
   * - If polling is already active, this call has no effect.
   * - If previously stopped, calling this restarts the polling loop.
   */
  startPolling: () => void;

  /**
   * Stops the polling process immediately.
   *
   * - Cancels any scheduled timers or in-flight requests.
   * - Safe to call multiple times; subsequent calls have no effect.
   */
  stopPolling: () => void;
}

/**
 * React hook to manage MFA push polling (e.g., waiting for a push notification approval)
 * on an Auth0 Advanced Customization of Universal Login (ACUL) screen.
 *
 * This hook sets up and controls a long-running polling loop that repeatedly checks
 * the MFA push challenge endpoint until one of the following occurs:
 *
 * - The challenge is **approved** by the user, triggering `options.onCompleted`.
 * - An **error** occurs (network error, non-200/429 response), triggering `options.onError`.
 * - The **component unmounts** or `stopPolling()` is called, which cancels polling.
 *
 * ### Key Features
 * - `isRunning` is **reactive** — it updates automatically if the polling loop
 *   stops internally or is canceled.
 * - Uses a **stable single polling instance** (`useRef`) to prevent
 *   duplicate network calls and unintended restarts during React re-renders.
 * - **Automatic cleanup** on unmount: no orphan timers or leaked XHR requests.
 *
 * @param options - {@link MfaPollingOptions} specifying the polling interval,
 *                  success callback (`onCompleted`), and optional error handler (`onError`).
 *
 * @returns {@link MfaPollingResult} containing:
 * - `isRunning` — `true` while polling is active.
 * - `startPolling()` — starts or resumes polling.
 * - `stopPolling()` — stops polling immediately.
 *
 * @example
 * ```tsx
 * import { useMfaPolling } from '@auth0/auth0-acul-react';
 *
 * export function MfaPushStatus() {
 *   const { isRunning, startPolling, stopPolling } = useMfaPolling({
 *     intervalMs: 5000,
 *     onCompleted: () => console.log('Push approved!/denied'),
 *     onError: (error) => console.error('Polling error:', error)
 *   });
 *
 *   return (
 *     <div>
 *       <button onClick={startPolling} disabled={isRunning}>
 *         {isRunning ? 'Waiting for approval…' : 'Start MFA Polling'}
 *       </button>
 *       {isRunning && <button onClick={stopPolling}>Cancel</button>}
 *     </div>
 *   );
 * }
 * ```
 *
 * @remarks
 * - The `onError` callback receives an {@link ULError} object
 *   with `status` and `responseText` describing the server response.
 * - Internal rate-limit responses (`429`) are automatically handled:
 *   polling waits for the reset window before retrying.
 * - Calling `startPolling()` repeatedly while running is safe and idempotent.
 *
 * @public
 */
export function useMfaPolling(options?: MfaPollingOptions): MfaPollingResult {
  const [isRunning, setIsRunning] = useState(false);

  // Wrap callbacks safely to immediately update `isRunning` on completion/error.
  const wrappedOptions: MfaPollingOptions = useMemo(() => {
    const safe = options ?? {};
    return {
      ...safe,
      onCompleted: () => {
        setIsRunning(false);
        safe.onCompleted?.();
      },
      onError: (error: ULError) => {
        setIsRunning(false);
        errorManager.pushServerErrors([error]);
        safe.onError?.(error);
      },
    };
  }, [options]);

  // Stable screen instance
  const screen = useMemo(
    () => getScreen<{ pollingManager: (o: MfaPollingOptions) => MfaPushPollingControl }>(),
    []
  );

  // Single polling control instance per component
  const pollingControlRef = useRef<MfaPushPollingControl | null>(null);
  if (pollingControlRef.current === null) {
    pollingControlRef.current = screen.pollingManager(wrappedOptions);
  }
  const pollingControl = pollingControlRef.current;

  const startPolling = useCallback(() => {
    pollingControl.startPolling();
    setIsRunning(true);
  }, [pollingControl]);

  const stopPolling = useCallback(() => {
    pollingControl.stopPolling();
    setIsRunning(false);
  }, [pollingControl]);

  // One effect handles cleanup and state sync
  useEffect(() => {
    let mounted = true;

    const tick = () => {
      if (!mounted) {
        return;
      }
      const running = pollingControl.isRunning();
      setIsRunning(running);
      if (running) {
        requestAnimationFrame(tick);
      }
    };
    tick();

    return () => {
      mounted = false;
      pollingControl.stopPolling();
    };
  }, [pollingControl]);

  return { isRunning, startPolling, stopPolling };
}

export type { MfaPollingOptions, ULError };
