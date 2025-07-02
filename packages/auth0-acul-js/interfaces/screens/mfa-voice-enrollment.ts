import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

/**
 * Payload for continuing the MFA Voice Enrollment flow.
 */
export interface ContinueOptions extends CustomOptions {
  phone: string;
}

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
   * Continues with the voice enrollment process.
   * @param payload - The phone number and optional custom options.
   * @returns Promise that resolves when enrollment continues.
   */
  continue(payload: ContinueOptions): Promise<void>;

  /**
   * Allows trying another authentication method.
   * @param payload - Optional custom options.
   * @returns Promise that resolves when the user switches method.
   */
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;

  /**
   * Allows picking a country code for the phone number.
   * @param payload - Optional custom options.
   * @returns Promise that resolves when the country code is selected.
   */
  selectPhoneCountryCode(payload?: CustomOptions): Promise<void>;
}
