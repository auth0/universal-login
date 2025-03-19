import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordMfaOtpChallengeMembers,
  ContinueOptions,
  TryAnotherMethodOptions,
  ScreenMembersOnResetPasswordMfaOtpChallenge as ScreenOptions,
} from '../../../interfaces/screens/reset-password-mfa-otp-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the reset-password-mfa-otp-challenge screen functionality
 */
export default class ResetPasswordMfaOtpChallenge extends BaseContext implements ResetPasswordMfaOtpChallengeMembers {
  screen: ScreenOptions;

  /**
   * Creates an instance of ResetPasswordMfaOtpChallenge screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Continues with the OTP challenge using the provided code.
   * @param payload The options containing the code.
   * @example
   * ```typescript
   * import ResetPasswordMfaOtpChallenge from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';
   *
   * const resetPasswordMfaOtpChallenge = new ResetPasswordMfaOtpChallenge();
   * await resetPasswordMfaOtpChallenge.continue({
   *   code: '123456',
   * });
   * ```
   */
  async continue(payload: ContinueOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaOtpChallenge.screenIdentifier, 'continue'],
    };
    await new FormHandler(options).submitData<ContinueOptions>({
      ...payload,
      action: 'default',
    });
  }

  /**
   * Allows the user to try another MFA method.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import ResetPasswordMfaOtpChallenge from '@auth0/auth0-acul-js/reset-password-mfa-otp-challenge';
   *
   * const resetPasswordMfaOtpChallenge = new ResetPasswordMfaOtpChallenge();
   * await resetPasswordMfaOtpChallenge.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaOtpChallenge.screenIdentifier, 'continue'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'pick-authenticator',
    });
  }
}

export {
  ResetPasswordMfaOtpChallengeMembers,
  ContinueOptions,
  TryAnotherMethodOptions,
  ScreenOptions as ScreenMembersOnResetPasswordMfaOtpChallenge,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
