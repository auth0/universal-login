import { MfaEnrollFactorType } from '../../../src/constants';
import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import type { MfaBeginEnrollOptionsMembers, MfaEnrollOptions } from '../../../interfaces/screens/mfa-begin-enroll-options';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * MFA Begin Enroll Options screen implementation class
 * Handles the selection and enrollment of MFA factors
 */
export default class MfaBeginEnrollOptions extends BaseContext implements MfaBeginEnrollOptionsMembers {
  static screenIdentifier: string = ScreenIds.MFA_BEGIN_ENROLL_OPTIONS;
  /**
   * Creates an instance of MFA Begin Enroll Options screen manager
   */
  constructor() {
    super();
  }

  /**
   * Continues the enrollment process with the selected factor
   * @param payload The enrollment options including the selected factor
   * @example
   * ```typescript
   * const mfaBeginEnrollOptions = new MfaBeginEnrollOptions();
   * await mfaBeginEnrollOptions.enroll({
   *   action: 'push-notification'
   * });
   * ```
   */
  async enroll(payload: MfaEnrollOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaBeginEnrollOptions.screenIdentifier, 'enroll'],
    };
    await new FormHandler(options).submitData<MfaEnrollOptions>(payload);
  }
}

export { MfaBeginEnrollOptionsMembers, MfaEnrollOptions, MfaEnrollFactorType };

export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
