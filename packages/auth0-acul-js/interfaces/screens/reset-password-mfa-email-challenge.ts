import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { StartResendOptions, ResendControl } from '../utils/resend-control';

/**
 * Interface for the screen data specific to reset-password-mfa-email-challenge screen
 */
export interface ScreenMembersOnResetPasswordMfaEmailChallenge extends ScreenMembers {
  data: {
    email: string;
  } | null;
}

/**
 * Options for continuing with the email challenge.
 */
export interface ContinueOptions {
  /** The code entered by the user. */
  code: string;
  /** Indicates whether to remember the device. */
  rememberDevice?: boolean;
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Options for resending the email code.
 */
export interface ResendCodeOptions {
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
 * Interface defining the available methods and properties for the reset-password-mfa-email-challenge screen
 */
export interface ResetPasswordMfaEmailChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordMfaEmailChallenge;

  /**
   * Continues with the email challenge using the provided code.
   * @param payload The options containing the code and rememberDevice flag.
   */
  continue(payload: ContinueOptions): Promise<void>;

  /**
   * Resends the email code.
   * @param payload Optional custom options to include with the request.
   */
  resendCode(payload?: ResendCodeOptions): Promise<void>;

  /**
   * Allows the user to try another MFA method.
   * @param payload Optional custom options to include with the request.
   */
  tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void>;

  /**
   * Gets resend functionality with timeout management for this screen
   * @param options Configuration options for resend functionality
   */
  resendManager(options?: StartResendOptions): ResendControl;
}
