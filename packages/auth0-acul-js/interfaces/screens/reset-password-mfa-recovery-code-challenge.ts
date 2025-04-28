import type { CustomOptions } from '../../interfaces/common';
import type { BaseMembers } from '../models/base-context';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

/**
 * Interface describing the members of the Mfa Recovery Code Challenge screen.
 */
export interface ResetPasswordMfaRecoveryCodeChallengeMembers extends BaseMembers {
  client: ClientMembers;
  organization: OrganizationMembers;
  prompt: PromptMembers;
  screen: ScreenMembers;
  transaction: TransactionMembers;

  /**
   * Continues with the provided recovery code.
   * @param {string} code - The recovery code entered by the user.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   */
  continue(code: string, payload?: CustomOptions): Promise<void>;

  /**
   * Navigates to the screen where the user can pick another MFA method.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   */
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;
}
