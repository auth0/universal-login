import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Interface for the screen data specific to mfa-otp-enrollment-qr screen
 */
export interface ScreenMembersOnMfaOtpEnrollmentQr extends ScreenMembers {
  data: {
    qr_code: string;
  } | null;
}

/**
 * Interface for the payload of the continue method
 * @public
 */
export interface ContinueOptions extends CustomOptions {
  code: string;
}

/**
 * Interface defining the available methods and properties for the mfa-otp-enrollment-qr screen
 */
export interface MfaOtpEnrollmentQrMembers extends BaseMembers {
  screen: ScreenMembersOnMfaOtpEnrollmentQr;

  /**
   * Toggles the view.
   * @param payload Optional custom options to include with the request
   */
  toggleView(payload?: CustomOptions): Promise<void>;

  /**
   * Continues with the default action.
   * @param payload Payload containing code and optional custom options
   */
  continue(payload: ContinueOptions): Promise<void>;

  /**
   * Allows trying another authentication method
   * @param payload Optional custom options to include with the request
   */
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;
}
