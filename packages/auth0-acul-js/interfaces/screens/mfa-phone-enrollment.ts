import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

/**
 * Options for continuing with the MFA phone enrollment.
 */
export interface MfaPhoneEnrollmentMembers extends BaseMembers {
  client: ClientMembers;
  organization: OrganizationMembers;
  prompt: PromptMembers;
  screen: ScreenMembers;
  transaction: TransactionMembers;
  /**
   * Selects the country code for the phone number.
   * @param payload Optional custom options to include with the request.
   */
  pickCountryCode(payload?: CustomOptions): Promise<void>;

  /**
   * Continues the enrollment process with the provided phone number and type (SMS or voice).
   * @param payload The phone number and type (SMS or voice).
   */
  continueEnrollment(payload: { phone: string; type: 'sms' | 'voice' }): Promise<void>;

  /**
   * Allows the user to try another MFA method.
   * @param payload Optional custom options to include with the request.
   */
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;
}
