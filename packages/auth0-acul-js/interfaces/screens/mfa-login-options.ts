import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Interface for the screen data specific to mfa-login-options screen
 */
export interface ScreenMembersOnMfaLoginOptions extends ScreenMembers {
  data: {
    /** List of enrolled MFA factors for the user */
    enrolled_factors: string[];
  } | null;
}

export type LoginFactorType =
  | 'sms'
  | 'phone'
  | 'voice'
  | 'otp'
  | 'email'
  | 'recovery-code'
  | 'push-notification'
  | 'webauthn-platform'
  | 'webauthn-roaming'
  | 'duo';

/**
 * Options for continuing with a selected MFA factor
 */
export interface LoginEnrollOptions {
  /** The action indicating which factor to use for login */
  action: LoginFactorType;
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Interface defining the available methods and properties for the mfa-login-options screen
 */
export interface MfaLoginOptionsMembers extends BaseMembers {
  /**
   * Continues the login process with the selected MFA factor
   * @param payload The options containing the selected factor
   * @example
   * ```typescript
   * const mfaLoginOptions = new MfaLoginOptions();
   * await mfaLoginOptions.enroll({
   *   action: 'push-notification'
   * });
   * ```
   */
  enroll(payload: LoginEnrollOptions): Promise<void>;
}
