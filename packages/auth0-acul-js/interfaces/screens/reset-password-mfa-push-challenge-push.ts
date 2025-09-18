import type { CustomOptions } from "../common";
import type { BaseMembers } from "../models/base-context";
import type { ScreenMembers } from "../models/screen";
import type {
  MfaPollingOptions,
  MfaPushPollingControl,
} from "../utils/polling-control.ts";

/**
 * Interface for the screen data specific to reset-password-mfa-push-challenge-push screen
 */
export interface ScreenMembersOnResetPasswordMfaPushChallengePush
  extends ScreenMembers {
  data: {
    deviceName: string;
    rememberDevice?: boolean;
  } | null;
}

/**
 * Interface defining the available methods and properties for the reset-password-mfa-push-challenge-push screen
 */
export interface ResetPasswordMfaPushChallengePushMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordMfaPushChallengePush;

  /**
   * Continues with the push notification challenge
   * @param payload Optional custom options to include with the request
   */
  continue(payload?: CustomOptions): Promise<void>;

  /**
   * Resends the push notification
   * @param payload Optional custom options to include with the request
   */
  resendPushNotification(payload?: CustomOptions): Promise<void>;

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
   * @param options of type {@link MfaPollingOptions}
   */
  pollingManager(options?: MfaPollingOptions): MfaPushPollingControl;
}
