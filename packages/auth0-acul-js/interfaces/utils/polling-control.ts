import type { Error as ULError} from "../models/transaction";

/**
 * Configuration options for managing an MFA push-notification polling process.
 *
 * Supply these options when starting a polling session to control how often
 * the challenge endpoint is queried and how success or failure is handled.
 *
 * @public
 */
export type MfaPollingOptions = {
  /**
   * Optional interval, in **milliseconds**, between consecutive polling requests.
   *
   * - If omitted, the SDK’s internal default interval is used (typically 5000 ms).
   * - Choose a value that balances responsiveness with rate-limit considerations.
   *
   * @defaultValue Implementation-specific (commonly 5000 ms)
   */
  intervalMs?: number;

  /**
   * Optional callback executed once the MFA push challenge is successfully
   * approved and polling completes.
   *
   * - Called exactly **once**, after which polling stops automatically.
   * - Useful for advancing the login flow (e.g., calling `continue()`).
   */
  onCompleted?: () => void;

  /**
   * Optional callback invoked if an error occurs while polling.
   *
   * Receives an {@link ULError} object containing:
   * - `status` — the HTTP status code from the failed request
   * - `responseText` — the raw response body, if available
   *
   * - Called once per error event; polling may retry depending on error type.
   * - Use to surface error messages or trigger custom retry/abort logic.
   */
  onError?: (error: ULError) => void;
};

/**
 * Control interface for managing an MFA push-notification polling session.
 *
 * This interface provides imperative methods to start, stop, and inspect the status of a
 * long-running polling loop that checks whether an MFA push challenge has been
 * approved.
 *
 * @public
 */
export interface MfaPushPollingControl {
  /**
   * Stops the polling process immediately.
   *
   * - Cancels any scheduled timer or pending request.
   * - Once stopped, `isRunning()` returns `false`.
   * - Safe to call multiple times; subsequent calls have no effect.
   *
   * @example
   * ```ts
   * const control = mfaPushChallengePush.pollingManager({ intervalMs: 5000 });
   * control.startPolling();
   *
   * // Later, if the user cancels:
   * control.stopPolling();
   * ```
   */
  stopPolling: () => void;

  /**
   * Starts or resumes the polling process.
   *
   * - If polling is already active, calling this again has no effect.
   * - If previously stopped, calling this restarts the polling loop.
   *
   * @example
   * ```ts
   * control.startPolling(); // Begin checking the MFA push challenge
   * ```
   */
  startPolling: () => void;

  /**
   * Indicates whether the polling process is currently running.
   *
   * - Returns `true` if polling is active and not cancelled.
   * - Returns `false` if polling has been stopped or has completed.
   *
   * @example
   * ```ts
   * if (control.isRunning()) {
   *   console.log('Polling in progress...');
   * } else {
   *   console.log('Polling is stopped or completed.');
   * }
   * ```
   */
  isRunning: () => boolean;
}

