import { ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type {
  ConfirmLogoutOptions,
  LogoutMembers
} from '../../../interfaces/screens/logout';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the logout screen functionality.
 * This screen allows users to confirm or deny the logout action.
 */
export default class Logout extends BaseContext implements LogoutMembers {
  static screenIdentifier: string = ScreenIds.LOGOUT;

  /**
   * Creates an instance of the Logout screen manager.
   */
  constructor() {
    super();
  }

  /**
   * Confirms the logout action (accept or deny).
   * @param payload The options containing the action to perform.
   * @example
   * ```typescript
   * import Logout from '@auth0/auth0-acul-js/logout';
   *
   * const logout = new Logout();
   *
   * await logout.confirmLogout({ action: 'accept' });
   * ```
   */
  async confirmLogout(payload: ConfirmLogoutOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [Logout.screenIdentifier, 'confirmLogout'],
    };

    await new FormHandler(options).submitData<ConfirmLogoutOptions>({
      ...payload,
      action: payload.action,
    });
  }
}

export { LogoutMembers, ConfirmLogoutOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
