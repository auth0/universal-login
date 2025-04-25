import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { UntrustedDataMembers } from '../models/untrusted-data';

/**
 * Interface for the screen data specific to mfa-otp-challenge screen
 */
export interface ScreenMembersOnMfaOtpChallenge extends ScreenMembers {
  data: {
    showRememberDevice?: boolean;
  } | null;
}

/**
 * Interface for untrusted data specific to mfa-otp-challenge screen
 */
export interface UntrustedDataMembersOnMfaOtpChallenge extends UntrustedDataMembers {
  submittedFormData: {
    rememberDevice?: boolean;
    [key: string]: string | number | boolean | undefined;
  } | null;
}

/**
 * Options for continuing with the OTP challenge
 */
export interface ContinueOptions {
  /** The code entered by the user */
  code: string;
  /** Indicates whether to remember the browser */
  rememberBrowser?: boolean;
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Options for trying another method
 */
export interface TryAnotherMethodOptions {
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Interface defining the available methods and properties for the mfa-otp-challenge screen
 */
export interface MfaOtpChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnMfaOtpChallenge;
  untrustedData: UntrustedDataMembersOnMfaOtpChallenge;

  /**
   * Continues with the OTP challenge using the provided code
   * @param payload The options containing the code and rememberBrowser flag
   */
  continue(payload: ContinueOptions): Promise<void>;

  /**
   * Allows the user to try another MFA method
   * @param payload Optional custom options to include with the request
   */
  tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void>;
}
