import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

export interface SubmitOTPCodeOptions {
  otp: string;
  mfa_token: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ResendCodeOptions {
  mfa_token: string;
  [key: string]: string | number | boolean | undefined;
}

export interface CancelMFAOptions {
  mfa_token: string;
  [key: string]: string | number | boolean | undefined;
}

export interface BruteForceProtectionUnblockSuccessMembers extends BaseMembers {
  screen: ScreenMembers;
  /**
   * Submits the OTP code to complete the MFA challenge.
   * @param payload The payload containing the OTP code and MFA token.
   * @throws {Error} If the OTP code or MFA token is missing.
   * @example
   * ```typescript
   * import { BruteForceProtectionUnblockSuccess } from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';
   *
   * const bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
   * bruteForceProtectionUnblockSuccess.submitOTPCode({
   *   otp: '123456',
   *   mfa_token: 'some_mfa_token',
   * });
   * ```
   */
  submitOTPCode(payload: SubmitOTPCodeOptions): Promise<void>;
  /**
   * Resends the OTP code to the user's phone number.
   * @param payload The payload containing the MFA token.
   * @throws {Error} If the MFA token is missing.
   * @example
   * ```typescript
   * import { BruteForceProtectionUnblockSuccess } from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';
   *
   * const bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
   * bruteForceProtectionUnblockSuccess.resendCode({
   *   mfa_token: 'some_mfa_token',
   * });
   * ```
   */
  resendCode(payload: ResendCodeOptions): Promise<void>;
  /**
   * Cancels the MFA process and returns to the previous screen.
   * @param payload The payload containing the MFA token.
   * @throws {Error} If the MFA token is missing.
   * @example
   * ```typescript
   * import { BruteForceProtectionUnblockSuccess } from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';
   *
   * const bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
   * bruteForceProtectionUnblockSuccess.cancelMFA({
   *   mfa_token: 'some_mfa_token',
   * });
   * ```
   */
  cancelMFA(payload: CancelMFAOptions, options?: CustomOptions): Promise<void>;
}
