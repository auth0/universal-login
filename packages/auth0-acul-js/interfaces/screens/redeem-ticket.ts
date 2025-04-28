import type { CustomOptions } from '../../interfaces/common';
import type { BaseMembers } from '../models/base-context';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

/**
 * Interface describing the data available on the Redeem Ticket screen.
 */
export interface RedeemTicketMembers extends BaseMembers {
  client: ClientMembers;
  organization: OrganizationMembers;
  prompt: PromptMembers;
  screen: ScreenMembers;
  transaction: TransactionMembers;

  /**
   * Performs the default action on the redeem-ticket screen, which usually involves continuing the flow.
   * @param {CustomOptions} [payload] - Optional custom options to include with the request.
   * @returns {Promise<void>} A promise that resolves when the action is complete.
   * @throws {Error} If the operation fails.
   * @example
   * ```typescript
   * import RedeemTicket from '@auth0/auth0-acul-js/redeem-ticket';
   *
   * const redeemTicket = new RedeemTicket();
   * await redeemTicket.continue();
   * ```
   */
  continue(payload?: CustomOptions): Promise<void>;
}
