import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordEmailMembers,
  ResetPasswordEmailOptions,
  ScreenMembersOnResetPasswordEmail as ScreenOptions,
} from '../../../interfaces/screens/reset-password-email';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class ResetPasswordEmail extends BaseContext implements ResetPasswordEmailMembers {
  screen: ScreenOptions;
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }
  /**
   * @example
   * import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
   *
   * const resetPasswordEmail = new ResetPasswordEmail();
   * resetPasswordEmail.resendEmail();
   */
  async resendEmail(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'resend-email-action' });
  }
}
export { ResetPasswordEmailMembers, ResetPasswordEmailOptions, ScreenOptions as ScreenMembersOnResetPasswordEmail };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
