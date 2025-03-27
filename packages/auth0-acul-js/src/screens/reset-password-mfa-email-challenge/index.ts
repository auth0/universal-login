import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordMfaEmailChallengeMembers,
  ScreenMembersOnResetPasswordMfaEmailChallenge as ScreenOptions,
  ContinueOptions,
  ResendCodeOptions,
  TryAnotherMethodOptions,
} from '../../../interfaces/screens/reset-password-mfa-email-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the reset-password-mfa-email-challenge screen functionality
 */
export default class ResetPasswordMfaEmailChallenge extends BaseContext implements ResetPasswordMfaEmailChallengeMembers {
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD_MFA_EMAIL_CHALLENGE;
  screen: ScreenOptions;

  /**
   * Creates an instance of ResetPasswordMfaEmailChallenge screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Continues with the email challenge using the provided code.
   * @param payload The options containing the code and rememberDevice flag.
   * @example
   * ```typescript
   * import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
   *
   * const resetPasswordMfaEmailChallenge = new ResetPasswordMfaEmailChallenge();
   * await resetPasswordMfaEmailChallenge.continue({
   *   code: '123456',
   * });
   * ```
   */
  async continue(payload: ContinueOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaEmailChallenge.screenIdentifier, 'continue'],
    };
    const submitPayload: Record<string, string | number | boolean> = { ...payload, action: 'default' };

    await new FormHandler(options).submitData(submitPayload);
  }

  /**
   * Resends the email code.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
   *
   * const resetPasswordMfaEmailChallenge = new ResetPasswordMfaEmailChallenge();
   * await resetPasswordMfaEmailChallenge.resendCode();
   * ```
   */
  async resendCode(payload?: ResendCodeOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaEmailChallenge.screenIdentifier, 'resendCode'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'resend-code' });
  }

  /**
   * Allows the user to try another MFA method.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
   *
   * const resetPasswordMfaEmailChallenge = new ResetPasswordMfaEmailChallenge();
   * await resetPasswordMfaEmailChallenge.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaEmailChallenge.screenIdentifier, 'tryAnotherMethod'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'pick-authenticator' });
  }
}

export {
  ResetPasswordMfaEmailChallengeMembers,
  ContinueOptions,
  ResendCodeOptions,
  TryAnotherMethodOptions,
  ScreenOptions as ScreenMembersOnResetPasswordMfaEmailChallenge,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
