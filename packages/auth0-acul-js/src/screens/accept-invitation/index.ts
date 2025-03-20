import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { AcceptInvitationMembers, ScreenMembersOnAcceptInvitation as ScreenOptions } from '../../../interfaces/screens/accept-invitation';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the accept-invitation screen functionality.
 * This screen is displayed when a user needs to accept an invitation to an organization.
 */
export default class AcceptInvitation extends BaseContext implements AcceptInvitationMembers {
  static screenIdentifier: string = ScreenIds.ACCEPT_INVITATION;
  screen: ScreenOptions;

  /**
   * Creates an instance of AcceptInvitation screen manager.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = screenContext as ScreenOptions;
  }

  /**
   * Accepts the invitation to the organization.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import AcceptInvitation from '@auth0/auth0-acul-js/accept-invitation';
   *
   * const acceptInvitation = new AcceptInvitation();
   * await acceptInvitation.acceptInvitation();
   * ```
   */
  async acceptInvitation(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [AcceptInvitation.screenIdentifier, 'acceptInvitation'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'default' });
  }
}

export { AcceptInvitationMembers, ScreenOptions as ScreenMembersOnAcceptInvitation };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
