import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import {MfaLoginFactorType} from '../../src/constants/index'

/**
 * Interface for the screen data specific to mfa-login-options screen
 */
export interface ScreenMembersOnMfaLoginOptions extends ScreenMembers {
  data: {
    /** List of enrolled MFA factors for the user */
    enrolled_factors: string[];
  } | null;
}

/**
 * Options for continuing with a selected MFA factor
 */
export interface LoginEnrollOptions {
  /** The action indicating which factor to use for login */
  action: MfaLoginFactorType;
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
