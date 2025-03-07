import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordOptions,
  ResetPasswordMembers,
  ScreenMembersOnResetPassword as ScreenOptions,
} from '../../../interfaces/screens/reset-password';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
export default class ResetPassword extends BaseContext implements ResetPasswordMembers {
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD;
  screen: ScreenOptions;

  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
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
    };
    await new FormHandler(options).submitData(payload);
  }
}
export { ResetPasswordMembers, ResetPasswordOptions, ScreenOptions as ScreenMembersOnResetPassword };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
