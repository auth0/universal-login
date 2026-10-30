import type { Error as ULError} from "../models/transaction";

/**
 * Configuration options for managing a polling process on a screen that waits for an
 * out-of-band decision, such as an MFA push challenge or a pending consent.
 *
 * Supply these options when starting a polling session to control how often
 * the screen is polled and how success or failure is handled.
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
   * Optional callback executed once the server reports the polled request as
   * completed, whether it was approved or denied (for example, an MFA push
   * challenge or a pending consent).
   *
   * - Called exactly **once**, after which polling stops automatically.
   * - Useful for advancing the login flow (e.g., calling `continue()`), which lets
   *   Auth0 apply the outcome.
   */
  onCompleted?: () => void;

  /**
   * Optional callback invoked if an error occurs while polling.
   *
   * Receives an {@link ULError} object containing:
   * - `code` — `polling_error_<status>` for a non-200/429 response, or
   *   `polling_network_error` for a network failure
   * - `message` — the message from the response body, or a generic message
   *
   * - Polling stops after an error and does not retry.
   * - HTTP 429 (rate limit) responses are not errors: polling waits until the rate
   *   limit resets and then retries.
   * - Use to surface error messages or offer a manual way to continue.
   */
  onError?: (error: ULError) => void;
};

/**
 * Control interface for managing a polling session.
 *
 * This interface provides imperative methods to start, stop, and inspect the status of a
 * long-running polling loop that checks whether the polled request, such as an MFA push
 * challenge or a pending consent, has been completed.
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
   * control.startPolling(); // Begin polling
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

