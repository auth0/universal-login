import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { getScreen } from '../../state/instance-store';
import type { MfaPushPollingControl, MfaPushPollingOptions } from '@auth0/auth0-acul-js/mfa-push-challenge-push';

/**
 * React hook that uses screen's pollingManager method with React state management
 * 
 * @param options Polling configuration options
 * @returns Object with polling state and control methods
 * 
 * @example
 * ```tsx
 * import { usePollingControl } from '@auth0/auth0-acul-react';
 * 
 * function MyComponent() {
 *   const { isRunning, startPolling, stopPolling } = usePollingControl({
 *     intervalMs: 5000,
 *     onComplete: () => console.log('Polling completed!'),
 *     onError: (error) => console.error('Polling error:', error)
 *   });
 * 
 *   return (
 *     <div>
 *       <button onClick={startPolling} disabled={isRunning}>
 *         {isRunning ? 'Polling...' : 'Start Polling'}
 *       </button>
 *       {isRunning && <button onClick={stopPolling}>Stop</button>}
 *     </div>
 *   );
 * }
 * ```
 */
export function usePollingControl(options: MfaPushPollingOptions) {
  const [isRunning, setIsRunning] = useState(false);
  const pollingControlRef = useRef<MfaPushPollingControl | null>(null);
  
  const screen = useMemo(
    () => getScreen<{ pollingManager: (opts: MfaPushPollingOptions) => MfaPushPollingControl }>(),
    []
  );
  
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

    pollingControlRef.current = screen.pollingManager({
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
  }, [screen, options.intervalMs]);

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