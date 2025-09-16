/**
 * Control interface for the MFA push polling
 *
 * This interface allows you to start, stop, and check the status of polling for MFA push challenges.
 *
 * @public
 */
export interface MfaPushPollingControl {
  stopPolling: () => void;
  startPolling: () => void;
  isRunning: () => boolean;
}

/**
 * Error interface for the MFA push polling
 *
 * This interface provides error details when MFA push polling encounters an error.
 *
 * @public
 */
export interface MfaPushPollingError {
  status: number;
  responseText: string;
}

/**
 * Callback function type for polling completion
 */
export type MfaPushPollingCompleteCallback = () => void;

/**
 * Callback function type for polling errors
 */
export type MfaPushPollingErrorCallback = (error: MfaPushPollingError) => void;

/**
 * Options interface for configuring MFA push polling
 *
 * @public
 */
export interface MfaPushPollingOptions {
  /** Polling interval in milliseconds */
  intervalMs: number;
  /** Callback function to be called when polling is completed */
  onComplete: () => void;
  /** Optional callback function to handle polling errors */
  onError?: (error: MfaPushPollingError) => void;
}

/**
 * Internal options interface for the polling control utility
 * Used by createPollingControl function
 *
 * @internal
 */
export interface StartMfaPushPollingOptions {
  /** Polling interval in milliseconds */
  intervalMs: number;
  /** Callback function called when polling condition is met */
  onResult?: () => void;
  /** Optional callback function called on polling error */
  onError?: (error: MfaPushPollingError) => void;
}
