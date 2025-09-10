import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { UntrustedDataMembers } from '../models/untrusted-data';

/**
 * Interface for the screen data specific to mfa-push-challenge-push screen
 */
export interface ScreenMembersOnMfaPushChallengePush extends ScreenMembers {
  data: {
    /** The name of the device receiving the push notification */
    deviceName: string;
    /** Whether to show the remember device option */
    showRememberDevice?: boolean;
  } | null;
}

/**
 * Interface for untrusted data specific to mfa-push-challenge-push screen
 */
export interface UntrustedDataMembersOnMfaPushChallengePush extends UntrustedDataMembers {
  submittedFormData: {
    rememberDevice: boolean;
  } | null;
}

export interface WithRememberOptions extends CustomOptions {
  rememberDevice?: boolean;
}

/**
 * Interface defining the available methods and properties for the mfa-push-challenge-push screen
 */
export interface MfaPushChallengePushMembers extends BaseMembers {
  screen: ScreenMembersOnMfaPushChallengePush;
  untrustedData: UntrustedDataMembersOnMfaPushChallengePush;

  /**
   * Continues with the push notification challenge
   * @param payload Optional custom options to include with the request
   */
  continue(payload?: WithRememberOptions): Promise<void>;

  /**
   * Resends the push notification
   * @param payload Optional custom options to include with the request
   */
  resendPushNotification(payload?: WithRememberOptions): Promise<void>;

  /**
   * Switches to entering the verification code manually
   * @param payload Optional custom options to include with the request
   */
  enterCodeManually(payload?: CustomOptions): Promise<void>;

  /**
   * Allows trying another authentication method
   * @param payload Optional custom options to include with the request
   */
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;

   /**
   * Allows polling for the push notification challenge to be approved.
   * @param intervalMs Polling interval in milliseconds
   * @param onComplete Callback function to be called when polling is completed
   */
  pollingManager(intervalMs: number, onComplete: () => void, onError?: (error: MfaPushPollingError) => void): MfaPushPollingControl;
}

/**
 * Options for starting the MFA push polling
 * @public 
 */
export type StartMfaPushPollingOptions = {
  intervalMs: number;
  onResult?: () => void;
  onError?: (error: MfaPushPollingError) => void;
};

/**
 * Control interface for the MFA push polling
 *
 * This interface is returned by {@link MfaPushChallengePushMembers.pollingManager} and allows you to start, stop, and check the status of polling for MFA push challenges.
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
 * This interface is used by the {@link MfaPushChallengePushMembers.pollingManager} method's onError callback to provide error details.
 *
 * @public
 */
export interface MfaPushPollingError {
  status: number;
  responseText: string;
}