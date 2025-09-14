import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createResendControl } from '../../utils/resend-utils';

import { ScreenOverride } from './screen-override';

import type { CustomOptions, StartResendOptions, ResendControl } from '../../../interfaces/common';
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

  /**
   * Creates a resend control manager for handling email resend operations.
   * 
   * @param options Configuration options for the resend control
   * @returns A ResendControl object with resend functionality and state management
   * 
   * @example
   * ```typescript
   * import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
   * 
   * const resetPasswordEmail = new ResetPasswordEmail();
   * const { startResend } = resetPasswordEmail.resendManager({
   *   timeoutSeconds: 60,
   *   onStatusChange: (remainingSeconds, isDisabled) => {
   *     console.log(`Resend available in ${remainingSeconds}s, disabled: ${isDisabled}`);
   *   },
   *   onTimeout: () => {
   *     console.log('Resend is now available');
   *   }
   * });
   * 
   * // Call startResend when user clicks resend button
   * startResend();
   * ```
   */
  resendManager(options?: StartResendOptions): ResendControl {
    return createResendControl(
      ResetPasswordEmail.screenIdentifier,
      () => this.resendEmail(),
      options
    );
  }
}
export { ResetPasswordEmailMembers, ResetPasswordEmailOptions, ScreenOptions as ScreenMembersOnResetPasswordEmail };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
