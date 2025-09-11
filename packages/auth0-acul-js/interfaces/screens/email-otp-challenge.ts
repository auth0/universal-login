import type { CustomOptions, StartResendOptions, ResendControl } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Represents the members of the Email OTP Challenge screen.
 * Extends the base ScreenMembers interface.
 */
export interface ScreenMembersOnEmailOTPChallenge extends ScreenMembers {
  // Add any specific members for this screen here
}

export interface OtpCodeOptions extends CustomOptions {
   /**
   * The OTP code that the user enters to submit.
   */
  code: string;
}

// test data*********
/**
 * Represents the Email OTP Challenge screen interface.
 */
export interface EmailOTPChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnEmailOTPChallenge;
  /**
   * Submits the OTP code entered by the user.
   * @param options Optional parameters to include in the submission.
   */
  submitCode(options: OtpCodeOptions): Promise<void>;
  /**
   * Requests a new OTP code to be sent to the user's email.
   * @param options Optional parameters to include in the resend request.
   */
  resendCode(options?: CustomOptions): Promise<void>;
  /**
   * Gets resend functionality with timeout management for this screen
   * @param options Configuration options for resend functionality
   */
  resendManager(options?: StartResendOptions): ResendControl;
}
