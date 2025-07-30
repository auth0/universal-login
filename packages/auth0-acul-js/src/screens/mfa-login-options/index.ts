import { type MfaLoginFactorType, ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { MfaLoginOptionsMembers, LoginEnrollOptions, ScreenMembersOnMfaLoginOptions } from '../../../interfaces/screens/mfa-login-options';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-login-options screen functionality
 * This screen allows users to select which MFA factor they want to use for login
 */
export default class MfaLoginOptions extends BaseContext implements MfaLoginOptionsMembers {
  static screenIdentifier: string = ScreenIds.MFA_LOGIN_OPTIONS;

  /**
    * The screen object for the mfa-login-options screen
    */
  public screen: ScreenMembersOnMfaLoginOptions;
  /**
   * Creates an instance of MfaLoginOptions screen manager
   */
  constructor() {
    super(); // Calls BaseContext constructor for global context initialization and validation.
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Continues the login process with the selected MFA factor
   * @param payload The options containing the selected factor
   * @example
   * ```typescript
   * const mfaLoginOptions = new MfaLoginOptions();
   * await mfaLoginOptions.enroll({
   *   action: 'push-notification'
   * });
   * ```
   */
  async enroll(payload: LoginEnrollOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaLoginOptions.screenIdentifier, 'enroll'],
    };
    await new FormHandler(options).submitData<LoginEnrollOptions>(payload);
  }
}

export { MfaLoginOptionsMembers, LoginEnrollOptions, MfaLoginFactorType, ScreenMembersOnMfaLoginOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
