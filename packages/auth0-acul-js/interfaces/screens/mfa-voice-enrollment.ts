import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

/**
 * Interface describing the members of the Mfa Voice Enrollment screen.
 */
export interface MfaVoiceEnrollmentMembers extends BaseMembers {
  client: ClientMembers;
  organization: OrganizationMembers;
  prompt: PromptMembers;
  screen: ScreenMembers;
  transaction: TransactionMembers;

  /**
   * Continues with the default action.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   */
  continue(payload: { phone: string } & CustomOptions): Promise<void>;

  /**
   * Allows trying another authentication method
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   */
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;

  /**
   * Allows picking a country code for the phone number
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   */
  selectPhoneCountryCode(payload?: CustomOptions): Promise<void>;
}
