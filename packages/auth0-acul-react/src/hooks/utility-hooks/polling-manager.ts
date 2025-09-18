// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import type {
//   StartMfaPushPollingOptions,
//   MfaPushPollingError,
//   MfaPushPollingControl,
// } from '@auth0/auth0-acul-js';
// import { getScreen } from '../../state/instance-store';

// export interface UseMfaPollingManagerReturn {
//   isRunning: boolean;
//   startPolling: () => void;
//   stopPolling: () => void;
// }

// /**
//  * Return type for {@link useMfaPollingManager}.
//  */
// export interface UseMfaPollingManagerReturn {
//   /** Whether polling is currently running. */
//   isRunning: boolean;
//   /** Start the polling process. */
//   startPolling: () => void;
//   /** Stop the polling process. */
//   stopPolling: () => void;
// }

// /**
//  * React hook to manage MFA push polling (e.g., waiting for a push notification approval)
//  * on an ACUL screen.
//  *
//  * This hook sets up a polling process that repeatedly checks the MFA push status at the
//  * given interval and reports completion or errors through callbacks.
//  *
//  * @param intervalMs - Polling interval in milliseconds.
//  * @param onResult - Callback fired when the polling completes successfully.
//  * @param onError - Optional callback fired if an error occurs during polling.
//  *
//  * @returns An object with:
//  * - `isRunning` — `true` while polling is active.
//  * - `startPolling` — call to start or restart polling.
//  * - `stopPolling` — call to cancel polling.
//  *
//  * @example
//  * ```tsx
//  * import { useMfaPollingManager } from '@auth0/auth0-acul-react';
//  *
//  * export function MfaPushStatus() {
//  *   const { isRunning, startPolling, stopPolling } = useMfaPollingManager(
//  *     5000,
//  *     () => console.log('Push approved!'),
//  *     (error) => console.error('Polling error:', error)
//  *   );
//  *
//  *   return (
//  *     <div>
//  *       <button onClick={startPolling} disabled={isRunning}>
//  *         {isRunning ? 'Waiting for approval…' : 'Start MFA Polling'}
//  *       </button>
//  *       {isRunning && <button onClick={stopPolling}>Cancel</button>}
//  *     </div>
//  *   );
//  * }
//  * ```
//  *
//  * @remarks
//  * - The hook automatically stops polling when the component unmounts.
//  * - The `onError` callback receives an {@link MfaPushPollingError} with
//  *   `status` and `responseText` describing the server response.
//  */
// export function useMfaPollingManager(
//   intervalMs: number,
//   onResult: () => void,
//   onError?: (error: MfaPushPollingError) => void
// ): UseMfaPollingManagerReturn {
//   const screen = useMemo(
//     () =>
//       getScreen<{
//         pollingManager: (opts: StartMfaPushPollingOptions) => MfaPushPollingControl;
//       }>(),
//     []
//   );

//   const controlRef = useRef<MfaPushPollingControl | null>(null);
//   const [isRunning, setIsRunning] = useState(false);

//   // store latest callbacks so effect doesn’t re-run
//   const resultRef = useRef(onResult);
//   const errorRef = useRef(onError);
//   resultRef.current = onResult;
//   errorRef.current = onError;

//   useEffect(() => {
//     controlRef.current = screen.pollingManager({
//       intervalMs,
//       onResult: () => {
//         setIsRunning(false);
//         resultRef.current();
//       },
//       onError: (err) => {
//         setIsRunning(false);
//         errorRef.current?.(err);
//       },
//     });

//     return () => {
//       controlRef.current?.stopPolling();
//     };
//   }, [screen, intervalMs]);

//   const startPolling = useCallback(() => {
//     controlRef.current?.startPolling();
//     setIsRunning(true);
//   }, []);

//   const stopPolling = useCallback(() => {
//     controlRef.current?.stopPolling();
//     setIsRunning(false);
//   }, []);

//   return { isRunning, startPolling, stopPolling };
// }

// export { MfaPushPollingError } from '@auth0/auth0-acul-js';
import { useState, useCallback, useRef, useEffect } from 'react';
import type { MfaPushPollingControl, MfaPushPollingOptions } from '@auth0/auth0-acul-js/mfa-push-challenge-push';

/**
 * React hook that wraps pollingManager method with React state management
 * 
 * @param pollingManager The pollingManager method from screen instance
 * @param options Polling configuration options
 * @returns Object with polling state and control methods
 */
export function usePollingControl(
  pollingManager: (options: MfaPushPollingOptions) => MfaPushPollingControl,
  options: MfaPushPollingOptions
) {
  const [isRunning, setIsRunning] = useState(false);
  const pollingControlRef = useRef<MfaPushPollingControl | null>(null);
  
  // Stable callback refs
  const onCompleteRef = useRef(options.onComplete);
  const onErrorRef = useRef(options.onError);
  
  useEffect(() => {
    onCompleteRef.current = options.onComplete;
  }, [options.onComplete]);
  
  useEffect(() => {
    onErrorRef.current = options.onError;
  }, [options.onError]);

  const startPolling = useCallback(() => {
    if (pollingControlRef.current?.isRunning()) {
      return;
    }

    pollingControlRef.current = pollingManager({
      intervalMs: options.intervalMs,
      onComplete: () => {
        setIsRunning(false);
        onCompleteRef.current?.();
      },
      onError: (error) => {
        setIsRunning(false);
        onErrorRef.current?.(error);
      }
    });

    pollingControlRef.current.startPolling();
    setIsRunning(true);
  }, [pollingManager, options.intervalMs]);

  const stopPolling = useCallback(() => {
    if (pollingControlRef.current) {
      pollingControlRef.current.stopPolling();
      setIsRunning(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (pollingControlRef.current) {
        pollingControlRef.current.stopPolling();
      }
    };
  }, []);

  return {
    isRunning,
    startPolling,
    stopPolling
  };
}