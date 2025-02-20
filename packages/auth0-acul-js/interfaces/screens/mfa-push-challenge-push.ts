import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Interface for the screen data specific to mfa-push-challenge-push screen
 */
export interface ScreenMembersOnMfaPushChallengePush extends ScreenMembers {
  data: {
    /** The name of the device receiving the push notification */
    deviceName: string;
    /** Whether to remember this device for future authentications */
    rememberDevice?: boolean;
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
}
