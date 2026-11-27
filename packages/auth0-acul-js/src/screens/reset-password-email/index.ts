import { ScreenIds, FormActions } from '../../constants';
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
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD_EMAIL;
  screen: ScreenOptions;

  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }
  /**
   * Returns the user to the reset password request screen to request a new email.
   *
   * @remarks
   * Submits a form POST with `action: "resend-email-action"`. Auth0 doesn't send a
   * new email at this step. It renders the `reset-password-request` screen, where the
   * user submits their email or username again to receive a new email. The browser
   * loads a new page, and the current JavaScript context, including component state
   * and timers, is lost.
   *
   * @param payload - Optional custom parameters to send with the request.
   * @returns A promise that resolves once the form is submitted, before the new
   * page loads. It doesn't confirm that an email was sent.
   *
   * @example
   * import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
   *
   * const resetPasswordEmail = new ResetPasswordEmail();
   * resetPasswordEmail.resendEmail();
   */
  async resendEmail(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordEmail.screenIdentifier, 'resendEmail'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.RESEND_EMAIL });
  }
}
export { ResetPasswordEmailMembers, ResetPasswordEmailOptions, ScreenOptions as ScreenMembersOnResetPasswordEmail };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
