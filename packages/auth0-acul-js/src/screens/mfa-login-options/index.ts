import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { MfaLoginOptionsMembers, LoginEnrollOptions, LoginFactorType } from '../../../interfaces/screens/mfa-login-options';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-login-options screen functionality
 * This screen allows users to select which MFA factor they want to use for login
 */
export default class MfaLoginOptions extends BaseContext implements MfaLoginOptionsMembers {
  /**
   * Creates an instance of MfaLoginOptions screen manager
   */
  constructor() {
    super();
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
    };
    await new FormHandler(options).submitData<LoginEnrollOptions>(payload);
  }
}

export { MfaLoginOptionsMembers, LoginEnrollOptions, LoginFactorType };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
