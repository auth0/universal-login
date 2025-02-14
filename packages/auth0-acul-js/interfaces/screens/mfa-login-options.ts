import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

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
export interface ContinueWithFactorOptions {
  /** The action indicating which factor to use for login */
  action: 'sms' | 'phone' | 'voice' | 'otp' | 'email' | 'recovery-code' | 'push-notification' | 'webauthn-platform' | 'webauthn-roaming' | 'duo';
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Interface defining the available methods and properties for the mfa-login-options screen
 */
export interface MfaLoginOptionsMembers extends BaseMembers {
  screen: ScreenMembersOnMfaLoginOptions;
  transaction: TransactionMembers;
  /**
   * Continues the login process with the selected MFA factor
   * @param payload The options containing the selected factor
   * @example
   * ```typescript
   * const mfaLoginOptions = new MfaLoginOptions();
   * await mfaLoginOptions.continueWithFactor({
   *   action: 'push-notification'
   * });
   * ```
   */
  continueWithFactor(payload: ContinueWithFactorOptions): Promise<void>;
}
