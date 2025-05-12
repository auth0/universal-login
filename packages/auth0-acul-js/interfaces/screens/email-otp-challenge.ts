import type { ScreenMembers } from '../../interfaces/models/screen';

/**
 * Represents the members of the Email OTP Challenge screen.
 * Extends the base ScreenMembers interface.
 */
export interface ScreenMembersOnEmailOTPChallenge extends ScreenMembers {
  // Add any specific members for this screen here
}

/**
 * Represents the Email OTP Challenge screen interface.
 */
export interface EmailOTPChallengeMembers {
  /**
   * Submits the OTP code entered by the user.
   * @param code The OTP code to submit.
   * @param options Optional parameters to include in the submission.
   */
  submitCode(code: string, options?: { [key: string]: string | number | boolean }): Promise<void>;
  /**
   * Requests a new OTP code to be sent to the user's email.
   * @param options Optional parameters to include in the resend request.
   */
  resendCode(options?: { [key: string]: string | number | boolean }): Promise<void>;
}
