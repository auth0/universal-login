import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { RedeemTicketMembers } from '../../../interfaces/screens/redeem-ticket';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Implements the redeem-ticket screen functionality.
 */
export default class RedeemTicket extends BaseContext implements RedeemTicketMembers {
  static screenIdentifier: string = ScreenIds.REDEEM_TICKET;

  /**
   * Initializes a new instance of the RedeemTicket class.
   */
  constructor() {
    super();
  }

  /**
   * Performs the default action on the redeem-ticket screen, usually continuing the flow.
   *
   * @param payload - Optional custom options to include with the request.
   * @returns A promise that resolves when the action is complete.
   * @throws {Error} If the operation fails.
   *
   * @example
   * ```ts
   * import RedeemTicket from '@auth0/auth0-acul-js/redeem-ticket';
   *
   * const redeemTicket = new RedeemTicket();
   * await redeemTicket.continue();
   * ```
   */
  async continue(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [RedeemTicket.screenIdentifier, 'continue'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.DEFAULT,
    });
  }
}

export { RedeemTicketMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
