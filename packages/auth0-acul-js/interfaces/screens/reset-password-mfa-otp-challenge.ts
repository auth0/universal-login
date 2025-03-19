import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Interface for the screen data specific to reset-password-mfa-otp-challenge screen
 */
export interface ScreenMembersOnResetPasswordMfaOtpChallenge extends ScreenMembers {
  data: {
    remember_device?: boolean;
  } | null;
}

/**
 * Options for continuing with the OTP challenge.
 */
export interface ContinueOptions {
  /** The code entered by the user. */
  code: string;
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Options for trying another method.
 */
export interface TryAnotherMethodOptions {
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Interface defining the available methods and properties for the reset-password-mfa-otp-challenge screen
 */
export interface ResetPasswordMfaOtpChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordMfaOtpChallenge;
  /**
   * Continues with the OTP challenge using the provided code.
   * @param payload The options containing the code.
   */
  continue(payload: ContinueOptions): Promise<void>;
  /**
   * Allows the user to try another MFA method.
   * @param payload Optional custom options to include with the request.
   */
  tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void>;
}
