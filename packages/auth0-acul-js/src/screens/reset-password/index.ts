import { ScreenIds } from '../../constants';
import coreValidatePassword from '../../helpers/validatePassword';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { ScreenContext, PasswordValidationResult } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  ResetPasswordOptions,
  ResetPasswordMembers,
  ScreenMembersOnResetPassword as ScreenOptions,
  TransactionMembersOnResetPassword as TransactionOptions
} from '../../../interfaces/screens/reset-password';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
export default class ResetPassword extends BaseContext implements ResetPasswordMembers {
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD;
  screen: ScreenOptions;
  transaction: TransactionOptions;

  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
    const transactionContext = this.getContext('transaction') as TransactionContext;

    this.transaction = new TransactionOverride(transactionContext);
  }
  /**
   * @example
   * import ResetPassword from '@auth0/auth0-acul-js/reset-password';
   *
   * const resetPassword = new ResetPassword();
   * resetPassword.resetPassword({
   *    'password-reset': 'Test@123!',
   *    're-enter-password': 'Test@123!',
   * });
   */
  async resetPassword(payload: ResetPasswordOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPassword.screenIdentifier, 'resetPassword'],
    };
    await new FormHandler(options).submitData(payload);
  }

  /**
   * Validates a given password against the current password policy
   * defined in the transaction context.
   *
   * @param password - The password string to validate.
   * @returns Result object indicating whether the password is valid and why.
   *
   * @example
   * const resetPassword = new ResetPassword();
   * const result = resetPassword.validatePassword('MyP@ssw0rd');
   * // result => { valid: true, errors: [] }
   */
  validatePassword(password: string): PasswordValidationResult {
    const passwordPolicy = this.transaction?.passwordPolicy;
    return coreValidatePassword(password, passwordPolicy);
  }
}
export { ResetPasswordMembers, ResetPasswordOptions, ScreenOptions as ScreenMembersOnResetPassword };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
