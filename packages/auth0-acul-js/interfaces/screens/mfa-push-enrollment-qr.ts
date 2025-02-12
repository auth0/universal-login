import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Interface for the screen data specific to mfa-push-enrollment-qr screen
 */
export interface ScreenMembersOnMfaPushEnrollmentQr extends ScreenMembers {
  data: {
    qr_code: string;
  } | null;
}

/**
 * Interface defining the available methods and properties for the mfa-push-enrollment-qr screen
 */
export interface MfaPushEnrollmentQrMembers extends BaseMembers {
  screen: ScreenMembersOnMfaPushEnrollmentQr;
  /**
   * Navigates to the authenticator selection screen.
   * @param payload Optional custom options to include with the request
   */
  pickAuthenticator(payload?: CustomOptions): Promise<void>;
}
