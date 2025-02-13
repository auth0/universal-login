import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

/**
 * Options for continuing with factor enrollment
 */
export interface ContinueWithFactorEnrollmentOptions {
  /** The action indicating which factor to enroll */
  action: 'push-notification' | 'otp' | 'sms' | 'phone' | 'voice' | 'webauthn-roaming';
  /** Any additional custom options */
  [key: string]: string | number | boolean | undefined;
}

/**
 * Screen members specific to MFA Begin Enroll Options screen
 */
export interface ScreenMembersOnMfaBeginEnrollOptions extends ScreenMembers {}

/**
 * Transaction members specific to MFA Begin Enroll Options screen
 */
export interface TransactionMembersOnMfaBeginEnrollOptions extends TransactionMembers {}

/**
 * MFA Begin Enroll Options screen members interface
 */
export interface MfaBeginEnrollOptionsMembers extends BaseMembers {
  screen: ScreenMembersOnMfaBeginEnrollOptions;
  transaction: TransactionMembersOnMfaBeginEnrollOptions;
  /**
   * Continues the enrollment process with the selected factor
   * @param payload The enrollment options including the selected factor
   */
  continueWithFactorEnrollment(payload: ContinueWithFactorEnrollmentOptions): Promise<void>;
}
