import type { BaseMembers } from '../../interfaces/models/base-context';
import type { ScreenMembers } from '../../interfaces/models/screen';

/**
 * Options for continuing with the MFA OTP enrollment code.
 */
export interface ContinueOptions {
  /**
   * The OTP code entered by the user.
   */
  code: string;

  /**
   * Any additional custom options.
   */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Options for trying another MFA method.
 */
export interface TryAnotherMethodOptions {
  /**
   * Any additional custom options.
   */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Interface for the screen data specific to the mfa-otp-enrollment-code screen.
 */
export interface ScreenMembersOnMfaOtpEnrollmentCode extends ScreenMembers {
  data: {
    /**
     * The text code to display to the user.
     */
    text_code: string;
  } | null;
}

/**
 * Interface defining the available methods and properties for the mfa-otp-enrollment-code screen.
 */
export interface MfaOtpEnrollmentCodeMembers extends BaseMembers {
  /**
   * The screen properties for the mfa-otp-enrollment-code screen.
   */
  screen: ScreenMembersOnMfaOtpEnrollmentCode;

  /**
   * Continues the MFA OTP enrollment process by submitting the OTP code.
   * @param payload The options containing the OTP code.
   */
  continue(payload: ContinueOptions): Promise<void>;

  /**
   * Allows the user to try another MFA method.
   * @param payload Optional custom options to include with the request.
   */
  tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void>;
}
