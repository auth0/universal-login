import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
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
  screen: ScreenOptions;

  /**
   * Creates an instance of MfaEmailList screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
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
   *   action: 'selection-action::0'
   * });
   * ```
   */
  async selectMfaEmail(payload: SelectMfaEmailOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<SelectMfaEmailOptions>(payload);
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
