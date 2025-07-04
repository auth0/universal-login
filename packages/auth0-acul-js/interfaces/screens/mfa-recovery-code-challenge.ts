import type { CustomOptions } from '../../interfaces/common';
import type { BaseMembers } from '../models/base-context';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

/**
 * Options for continuing with the MFA Recovery Code Challenge.
 */
export interface ContinueOptions extends CustomOptions {
  code: string;
}

/**
 * Interface describing the members of the Mfa Recovery Code Challenge screen.
 */
export interface MfaRecoveryCodeChallengeMembers extends BaseMembers {
  client: ClientMembers;
  organization: OrganizationMembers;
  prompt: PromptMembers;
  screen: ScreenMembers;
  transaction: TransactionMembers;

  /**
   * Continues with the provided recovery code.
   * @param payload - The continue options containing the recovery code and optional custom options.
   * @returns A promise that resolves when the continuation is successful.
   */
  continue(payload: ContinueOptions): Promise<void>;

  /**
   * Navigates to the screen where the user can pick another MFA method.
   * @param payload Optional payload.
   * @returns A promise that resolves when the navigation is complete.
   */
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;
}
