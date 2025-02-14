import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaLoginOptionsMembers,
  ScreenMembersOnMfaLoginOptions as ScreenOptions,
  ContinueWithFactorOptions,
} from '../../../interfaces/screens/mfa-login-options';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-login-options screen functionality
 * This screen allows users to select which MFA factor they want to use for login
 */
export default class MfaLoginOptions extends BaseContext implements MfaLoginOptionsMembers {
  screen: ScreenOptions;

  /**
   * Creates an instance of MfaLoginOptions screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Continues the login process with the selected MFA factor
   * @param payload The options containing the selected factor
   * @example
   * ```typescript
   * const mfaLoginOptions = new MfaLoginOptions();
   * await mfaLoginOptions.continueWithFactor({
   *   action: 'push-notification'
   * });
   * ```
   */
  async continueWithFactor(payload: ContinueWithFactorOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<ContinueWithFactorOptions>(payload);
  }
}

export { MfaLoginOptionsMembers, ContinueWithFactorOptions, ScreenOptions as ScreenMembersOnMfaLoginOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
