import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  MfaBeginEnrollOptionsMembers,
  ScreenMembersOnMfaBeginEnrollOptions as ScreenOptions,
  TransactionMembersOnMfaBeginEnrollOptions as TransactionOptions,
  ContinueWithFactorEnrollmentOptions,
} from '../../../interfaces/screens/mfa-begin-enroll-options';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * MFA Begin Enroll Options screen implementation class
 * Handles the selection and enrollment of MFA factors
 */
export default class MfaBeginEnrollOptions extends BaseContext implements MfaBeginEnrollOptionsMembers {
  screen: ScreenOptions;
  transaction: TransactionOptions;

  /**
   * Creates an instance of MFA Begin Enroll Options screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    const transactionContext = this.getContext('transaction') as TransactionContext;
    this.screen = new ScreenOverride(screenContext);
    this.transaction = new TransactionOverride(transactionContext);
  }

  /**
   * Continues the enrollment process with the selected factor
   * @param payload The enrollment options including the selected factor
   * @example
   * ```typescript
   * const mfaBeginEnrollOptions = new MfaBeginEnrollOptions();
   * await mfaBeginEnrollOptions.continueWithFactorEnrollment({
   *   action: 'push-notification'
   * });
   * ```
   */
  async continueWithFactorEnrollment(payload: ContinueWithFactorEnrollmentOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<ContinueWithFactorEnrollmentOptions>(payload);
  }
}

export {
  MfaBeginEnrollOptionsMembers,
  ContinueWithFactorEnrollmentOptions,
  ScreenOptions as ScreenMembersOnMfaBeginEnrollOptions,
  TransactionOptions as TransactionMembersOnMfaBeginEnrollOptions,
};

export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
