import { FormActions, ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { EmailOTPChallengeMembers, OtpCodeOptions, ScreenMembersOnEmailOTPChallenge as ScreenOptions } from '../../../interfaces/screens/email-otp-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Represents the Email OTP Challenge screen.
 */
export default class EmailOTPChallenge extends BaseContext implements EmailOTPChallengeMembers {
  static screenIdentifier: string = ScreenIds.EMAIL_OTP_CHALLENGE;

  constructor() {
    super();
  }

  /**
   * Submits the OTP code entered by the user.
   * @param options Optional parameters to include in the submission.
   * @example
   * ```typescript
   * import EmailOTPChallenge from '@auth0/auth0-acul-js/email-otp-challenge';
   *
   * const emailOTPChallenge = new EmailOTPChallenge();
   * emailOTPChallenge.submitCode({
   *   code: '123456',
   * });
   * ```
   */
  async submitCode(options: OtpCodeOptions): Promise<void> {
    const formOptions: FormOptions = {
      state: this.transaction.state,
      telemetry: [EmailOTPChallenge.screenIdentifier, 'submitCode'],
    };
    const payload = {
      ...options,
      action: FormActions.DEFAULT,
    };

    await new FormHandler(formOptions).submitData(payload);
  }

  /**
   * Requests a new OTP code to be sent to the user's email.
   * @param options Optional parameters to include in the resend request.
   * @example
   * ```typescript
   * import EmailOTPChallenge from '@auth0/auth0-acul-js/email-otp-challenge';
   *
   * const emailOTPChallenge = new EmailOTPChallenge();
   * emailOTPChallenge.resendCode();
   * ```
   */
  async resendCode(options?: CustomOptions): Promise<void> {
    const formOptions: FormOptions = {
      state: this.transaction.state,
      telemetry: [EmailOTPChallenge.screenIdentifier, 'resendCode'],
    };

    const payload = {
      ...options,
      action: FormActions.RESEND_CODE,
    };

    await new FormHandler(formOptions).submitData(payload);
  }
}

export { EmailOTPChallengeMembers, ScreenOptions as ScreenMembersOnEmailOTPChallenge, OtpCodeOptions };

export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
