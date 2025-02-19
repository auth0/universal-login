import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type {
  MfaEmailListMembers,
  ScreenMembersOnMfaEmailList as ScreenOptions,
  SelectMfaEmailOptions,
} from '../../../interfaces/screens/mfa-email-list';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-email-list screen functionality
 * This screen allows users to select an enrolled email address for MFA
 */
export default class MfaEmailList extends BaseContext implements MfaEmailListMembers {
  /**
   * Creates an instance of MfaEmailList screen manager
   */
  constructor() {
    super();
  }

  /**
   * Selects an enrolled email address from the list
   * @param payload The options containing the selection action
   * @example
   * ```typescript
   * import MfaEmailList from '@auth0/auth0-acul-js/mfa-email-list';
   *
   * const mfaEmailList = new MfaEmailList();
   * await mfaEmailList.selectMfaEmail({
   *   index: 0 // for demonstration we are selecting the first index
   * });
   * ```
   */
  async selectMfaEmail(payload: SelectMfaEmailOptions): Promise<void> {
    const index = payload?.index;
    if (index === undefined || index < 0 || index >= (this.user?.enrolledEmails?.length ?? 0)) {
      throw new Error('Index out of bounds.');
    }

    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: `selection-action::${index}`,
    });
  }

  /**
   * Navigates back to the previous screen
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * import MfaEmailList from '@auth0/auth0-acul-js/mfa-email-list';
   *
   * const mfaEmailList = new MfaEmailList();
   * await mfaEmailList.goBack();
   * ```
   */
  async goBack(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'back-action',
    });
  }
}

export { MfaEmailListMembers, ScreenOptions as ScreenMembersOnMfaEmailList };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
