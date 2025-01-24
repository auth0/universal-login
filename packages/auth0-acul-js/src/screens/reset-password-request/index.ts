import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordRequestOptions,
  ResetPasswordRequestMembers,
  ScreenMembersOnResetPasswordRequest as ScreenOptions,
} from '../../../interfaces/screens/reset-password-request';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class ResetPasswordRequest extends BaseContext implements ResetPasswordRequestMembers {
  screen: ScreenOptions;
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * @example
   * import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
   *
   * const resetPasswordRequest = new ResetPasswordRequest();
   * resetPasswordRequest.continueWithIdentifier({ username: 'testuser' });
   */
  async continueWithIdentifier(payload: ResetPasswordRequestOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData(payload);
  }

  /**
   * @example
   * import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
   *
   * const resetPasswordRequest = new ResetPasswordRequest();
   * resetPasswordRequest.backToLogin();
   */
  async backToLogin(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'back-to-login' });
  }
}

export { ResetPasswordRequestMembers, ResetPasswordRequestOptions, ScreenOptions };
