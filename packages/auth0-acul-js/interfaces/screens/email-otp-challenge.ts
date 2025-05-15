import type { ScreenMembers } from '../../interfaces/models/screen';
import type { CustomOptions } from '../common';

/**
 * Represents the members of the Email OTP Challenge screen.
 * Extends the base ScreenMembers interface.
 */
export interface ScreenMembersOnEmailOTPChallenge extends ScreenMembers {
  // Add any specific members for this screen here
}

export interface OTPCodeOptions extends CustomOptions {
   /**
   * The OTP code that the user enters to submit.
   */
  code: string;
}
// test data*********
/**
 * Represents the Email OTP Challenge screen interface.
 */
export interface EmailOTPChallengeMembers {
  /**
   * Submits the OTP code entered by the user.
   * @param options Optional parameters to include in the submission.
   */
  submitCode(options: OTPCodeOptions): Promise<void>;
  /**
   * Requests a new OTP code to be sent to the user's email.
   * @param options Optional parameters to include in the resend request.
   */
  resendCode(options?: CustomOptions): Promise<void>;
}
