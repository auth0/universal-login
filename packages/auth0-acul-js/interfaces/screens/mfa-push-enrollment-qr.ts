import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type {
  MfaPollingOptions,
  MfaPushPollingControl,
} from "../utils/polling-control.ts";


/**
 * Interface for the screen data specific to mfa-push-enrollment-qr screen
 */
export interface ScreenMembersOnMfaPushEnrollmentQr extends ScreenMembers {
  data: {
    qrCode: string;
    qrUri: string;
    showCodeCopy: boolean;
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

  pollingManager(options: MfaPollingOptions): MfaPushPollingControl;
  
}
